from rest_framework import viewsets, permissions, generics, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Post, Category, Tag
from .serializers import (
    PostListSerializer, 
    PostDetailSerializer,
    CategorySerializer,
    TagSerializer
)


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    """博客文章视图集"""
    queryset = Post.objects.filter(status='published')
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'summary']
    ordering_fields = ['published_at', 'view_count']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PostDetailSerializer
        return PostListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        """获取文章详情时增加访问量"""
        instance = self.get_object()
        instance.view_count += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=False)
    def latest(self, request):
        """获取最新文章"""
        latest_posts = self.get_queryset()[:5]
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