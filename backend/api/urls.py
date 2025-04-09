from django.urls import path
from .views import TextGenerationAPIView, ExampleAPIView, ProtectedAPIView

urlpatterns = [
    path('generate-text/', TextGenerationAPIView.as_view(), name='generate-text'),
    path('example/', ExampleAPIView.as_view(), name='example'),
    path('protected/', ProtectedAPIView.as_view(), name='protected'),
]