from django.contrib import admin
from django.urls import path, include
from django.conf.urls import  url
from django.conf.urls.static import static
from django.conf import settings

from rest_framework import routers

from boards import views as boards_views
from accounts import views as account_views
from core import views as core_views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)








router = routers.DefaultRouter()
router.register(r'users', account_views.UserViewSet)
router.register(r'tasks', core_views.TaskViewSet)
router.register(r'boards', boards_views.BoardsListView, basename="boards")
# router.register(r'topic', boards_views.TopicListView)


urlpatterns = [
    # path('api/boards/<int:pk>/topics/<int:topic_pk>/reply', boards_views.PostsView.as_view(), name='reply_topic'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('auth/', include('accounts.urls')),
    # path('api/v1/', include('boards.urls')),
    path('api/users/me/', account_views.UserViewSet.as_view({'pk': 'me'})),
    url('api/token/verify-token/', account_views.VerifyToken.as_view())
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
