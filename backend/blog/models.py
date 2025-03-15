from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Category(models.Model):
    """文章分类模型"""
    name = models.CharField(max_length=100, verbose_name="分类名称")
    slug = models.SlugField(unique=True, verbose_name="URL别名")
    description = models.TextField(blank=True, verbose_name="分类描述")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")

    class Meta:
        verbose_name = "分类"
        verbose_name_plural = verbose_name
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class Tag(models.Model):
    """文章标签模型"""
    name = models.CharField(max_length=50, verbose_name="标签名称")
    slug = models.SlugField(unique=True, verbose_name="URL别名")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")

    class Meta:
        verbose_name = "标签"
        verbose_name_plural = verbose_name
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class Post(models.Model):
    """博客文章模型"""
    STATUS_CHOICES = (
        ('draft', '草稿'),
        ('published', '已发布'),
    )

    title = models.CharField(max_length=200, verbose_name="标题")
    slug = models.SlugField(unique=True, verbose_name="URL别名")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts', verbose_name="作者")
    content = models.TextField(verbose_name="内容")
    summary = models.TextField(blank=True, verbose_name="摘要")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新时间")
    published_at = models.DateTimeField(default=timezone.now, verbose_name="发布时间")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft', verbose_name="状态")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='posts', verbose_name="分类")
    tags = models.ManyToManyField(Tag, blank=True, related_name='posts', verbose_name="标签")
    view_count = models.PositiveIntegerField(default=0, verbose_name="浏览次数")
    
    class Meta:
        verbose_name = "文章"
        verbose_name_plural = verbose_name
        ordering = ['-published_at']

    def __str__(self):
        return self.title