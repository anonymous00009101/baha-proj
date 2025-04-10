from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ExerciseViewSet,
    UserProfileViewSet,
    TextGenerationAPIView,
    ExampleAPIView,
    ProtectedAPIView,
)

# Создаём маршруты для ViewSet'ов
router = DefaultRouter()
router.register(r'exercises', ExerciseViewSet, basename='exercise')
router.register(r'user-profiles', UserProfileViewSet, basename='userprofile')

# Определяем URL-паттерны
urlpatterns = [
    path('', include(router.urls)),  # Включаем маршруты из DefaultRouter
    path('generate-text/', TextGenerationAPIView.as_view(), name='generate-text'),  # Генерация текста
    path('example/', ExampleAPIView.as_view(), name='example'),  # Пример API
    path('protected/', ProtectedAPIView.as_view(), name='protected'),  # Защищённый API
]