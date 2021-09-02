from django.contrib import admin
from django.urls import path, include
from django.conf.urls import  url
from django.conf.urls.static import static
from django.conf import settings
from .views import *
from rest_framework import routers
from server.urls import router
from boards import views as boards_views

#router = routers.DefaultRouter()
#router.register(r'boards', boards_views.BoardsListView)

# urlpatterns = [
#     path('boards/<int:pk>/topic', boards_views.TopicList.as_view())
# ]