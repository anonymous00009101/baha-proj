"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse, HttpResponseNotFound
from django.views.static import serve
from django.conf import settings

def home(request):
    return JsonResponse({"message": "Добро пожаловать в Backend DictionPro!"})

def favicon(request):
    return HttpResponseNotFound()

urlpatterns = [
    path('', home, name='home'),  # Добавляем маршрут для корневого пути
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Подключение маршрутов приложения api
    path('api/users/', include('users.urls')),  # Подключение маршрутов приложения users
]
