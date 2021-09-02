from django.urls import path, include, re_path
from rest_auth.views import PasswordResetConfirmView
from rest_framework.authtoken import views
from django.conf.urls import  url


urlpatterns = [
    path('', include('rest_auth.urls')),
    path('registration/', include('rest_auth.registration.urls')),
    re_path(r'^rest-auth/password/reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
            PasswordResetConfirmView.as_view(),
            name='password_reset_confirm'),
    url(r'^api-token-auth/', views.obtain_auth_token),
]
