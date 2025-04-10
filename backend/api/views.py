from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from transformers import pipeline
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Exercise, UserProfile
from .serializers import ExerciseSerializer, UserProfileSerializer

# Create your views here.

class TextGenerationAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Только для авторизованных пользователей

    def post(self, request):
        text = request.data.get('text', '')
        if not text:
            return Response({'error': 'Текст обязателен'}, status=400)

        # Используем более лёгкую модель distilgpt2
        generator = pipeline('text-generation', model='distilgpt2', device=-1)
        # Добавляем truncation=True для явного указания стратегии обрезки текста
        result = generator(text, max_length=50, num_return_sequences=1, truncation=True)

        return Response({'generated_text': result[0]['generated_text']})

class ExampleAPIView(APIView):
    def get(self, request):
        return Response({"message": "Пример API работает!"})

class ProtectedAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Вы успешно аутентифицированы!"})

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated]  # Только для авторизованных пользователей

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
