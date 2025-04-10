from django.db import models
from django.contrib.auth.models import User

class Exercise(models.Model):
    CATEGORY_CHOICES = [
        ('articulation', 'Артикуляция'),
        ('speed', 'Скорость'),
        ('complexity', 'Сложность'),
    ]

    title = models.CharField(max_length=255)  # Название упражнения
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)  # Категория
    content = models.TextField()  # Текст упражнения
    created_at = models.DateTimeField(auto_now_add=True)  # Дата создания
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='exercises')  # Связь с пользователем

    def __str__(self):
        return self.title

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Связь с моделью User
    bio = models.TextField(blank=True, null=True)  # Биография пользователя
    created_at = models.DateTimeField(auto_now_add=True)  # Дата создания профиля

    def __str__(self):
        return self.user.username

class ActionLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # Пользователь, совершивший действие
    action = models.CharField(max_length=255)  # Описание действия
    timestamp = models.DateTimeField(auto_now_add=True)  # Время действия
    ip_address = models.GenericIPAddressField(null=True, blank=True)  # IP-адрес клиента

    def __str__(self):
        return f"{self.user} - {self.action} - {self.timestamp}"
