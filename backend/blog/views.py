from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from django.shortcuts import get_object_or_404
from django.db import models
from .models import Category, Tag, Post
from .serializers import (
    CategorySerializer, TagSerializer, PostListSerializer,
    PostDetailSerializer, PostCreateUpdateSerializer
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """分类视图集"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    """标签视图集"""
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = 'slug'


class PostViewSet(viewsets.ModelViewSet):
    """博客文章视图集"""
    queryset = Post.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'summary']
    ordering_fields = ['published_at', 'view_count']
    lookup_field = 'slug'
    
    def get_queryset(self):
        # 普通用户只能看到已发布的文章
        # 作者可以看到自己的所有文章
        if self.request.user.is_staff:
            return Post.objects.all()
        elif self.request.user.is_authenticated:
            return Post.objects.filter(
                models.Q(status='published') | models.Q(author=self.request.user)
            )
        else:
            return Post.objects.filter(status='published')
    
    def get_permissions(self):
        """
        设置权限:
        - 列表和详情页允许所有人访问
        - 创建、更新和删除需要用户登录
        """
        if self.action in ['list', 'retrieve', 'latest', 'by_category', 'by_tag']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PostDetailSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return PostCreateUpdateSerializer
        return PostListSerializer
    
    def perform_create(self, serializer):
        # 创建文章时自动设置作者
        serializer.save(author=self.request.user)
    
    def retrieve(self, request, *args, **kwargs):
        """获取文章详情时增加访问量"""
        instance = self.get_object()
        # 只有在已发布状态下才增加浏览量
        if instance.status == 'published':
            instance.view_count += 1
            instance.save(update_fields=['view_count'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=False)
    def latest(self, request):
        """获取最新文章"""
        latest_posts = self.get_queryset().filter(status='published').order_by('-published_at')[:5]
        serializer = PostListSerializer(latest_posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, url_path='by-category/(?P<slug>[-\w]+)')
    def by_category(self, request, slug=None):
        """按分类获取文章"""
        category = get_object_or_404(Category, slug=slug)
        posts = self.get_queryset().filter(category=category)
        page = self.paginate_queryset(posts)
        
        if page is not None:
            serializer = PostListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
            
        serializer = PostListSerializer(posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, url_path='by-tag/(?P<slug>[-\w]+)')
    def by_tag(self, request, slug=None):
        """按标签获取文章"""
        tag = get_object_or_404(Tag, slug=slug)
        posts = self.get_queryset().filter(tags=tag)
        page = self.paginate_queryset(posts)
        
        if page is not None:
            serializer = PostListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
            
        serializer = PostListSerializer(posts, many=True)
        return Response(serializer.data)