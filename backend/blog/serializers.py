from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Tag, Post


class UserSerializer(serializers.ModelSerializer):
    """用户序列化器"""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class CategorySerializer(serializers.ModelSerializer):
    """分类序列化器"""
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']


class TagSerializer(serializers.ModelSerializer):
    """标签序列化器"""
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']


class PostListSerializer(serializers.ModelSerializer):
    """文章列表序列化器 - 用于展示文章列表，不包含完整内容"""
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'author', 'summary', 'published_at', 
                  'category', 'tags', 'view_count']


class PostDetailSerializer(serializers.ModelSerializer):
    """文章详情序列化器 - 用于展示完整文章详情"""
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'author', 'content', 'summary',
                  'created_at', 'updated_at', 'published_at', 'status',
                  'category', 'tags', 'view_count']
        
class PostCreateUpdateSerializer(serializers.ModelSerializer):
    """文章创建和更新序列化器"""
    class Meta:
        model = Post
        fields = ['title', 'slug', 'content', 'summary', 'status', 'category', 
                  'tags', 'published_at']