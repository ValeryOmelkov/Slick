from django.contrib import admin
from django.urls import path, include
from main import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('games/', include('games.urls')),
    path('sorting/', include('sorts.urls')),
    path('', views.home),
]
