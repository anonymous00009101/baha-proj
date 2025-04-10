# filepath: c:\Users\admin\Documents\projects\itdiction-main\backend\users\urls.py
from django.urls import path
from .views import RegisterAPIView, LoginAPIView

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),  # Маршрут для регистрации
    path('login/', LoginAPIView.as_view(), name='login'),
]