from django.apps import AppConfig


class BlogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend.blog' # 这里要与settings.py中的INSTALLED_APPS中的app名称一致
