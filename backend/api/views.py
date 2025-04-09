from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from transformers import pipeline
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class TextGenerationAPIView(APIView):
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
