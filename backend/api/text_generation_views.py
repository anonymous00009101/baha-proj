from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from transformers import pipeline

class TextGenerationAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Только для авторизованных пользователей

    def post(self, request):
        text = request.data.get('text', '')
        if not text:
            return Response({'error': 'Текст обязателен'}, status=400)

        generator = pipeline('text-generation', model='distilgpt2', device=-1)
        result = generator(text, max_length=50, num_return_sequences=1, truncation=True)

        return Response({'generated_text': result[0]['generated_text']})