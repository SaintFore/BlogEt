from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth import login
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    RegisterSerializer, UserSerializer, ChangePasswordSerializer,
    PasswordResetSerializer, PasswordResetConfirmSerializer,
    LoginSerializer
)
from .tokens import account_activation_token


class RegisterView(generics.CreateAPIView):
    """用户注册视图"""
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer


class UserDetailView(generics.RetrieveUpdateAPIView):
    """用户详情视图"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class ChangePasswordView(generics.UpdateAPIView):
    """更改密码视图"""
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # 检查旧密码
            if not user.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["旧密码不正确"]}, status=status.HTTP_400_BAD_REQUEST)
            
            # 设置新密码
            user.set_password(serializer.data.get("new_password"))
            user.save()
            return Response({"detail": "密码已成功修改"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetView(generics.GenericAPIView):
    """发送密码重置邮件视图"""
    serializer_class = PasswordResetSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            try:
                user = User.objects.get(email=email)
                current_site = get_current_site(request)
                mail_subject = '重置您的密码'
                message = render_to_string('/password_reset_email.html', {
                    'user': user,
                    'domain': current_site.domain,
                    'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                    'token': account_activation_token.make_token(user),
                    'protocol': 'https' if request.is_secure() else 'http'
                })
                send_mail(mail_subject, message, 'noreply@example.com', [email])
                return Response({"detail": "密码重置邮件已发送"}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                pass  # 为了安全考虑，即使用户不存在也返回成功消息
            
            return Response({"detail": "如果该邮箱存在，密码重置邮件已发送"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirmView(generics.GenericAPIView):
    """确认密码重置视图"""
    serializer_class = PasswordResetConfirmSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                uid = force_str(urlsafe_base64_decode(serializer.validated_data['uid']))
                user = User.objects.get(pk=uid)
            except (TypeError, ValueError, OverflowError, User.DoesNotExist):
                user = None

            token = serializer.validated_data['token']
            if user is not None and account_activation_token.check_token(user, token):
                user.set_password(serializer.validated_data["new_password"])
                user.save()
                return Response({"detail": "密码已成功重置"}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "重置链接无效"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """用户登录视图"""
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        })


class LogoutView(APIView):
    """用户注销视图（黑名单刷新令牌）"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "成功注销"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response({"detail": "注销失败"}, status=status.HTTP_400_BAD_REQUEST)