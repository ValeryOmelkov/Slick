from django.urls import path

from .views import *

urlpatterns = [
    path('', main),
    path('pair/', pair),
    path('life/', life),
    path('snake/', snake),
    path('tanks/', tanks),
]