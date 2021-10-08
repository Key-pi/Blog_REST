from .base import *  # noqa

DEBUG = True
ALLOWED_HOSTS = ["*"]
CORS_ORIGIN_ALLOW_ALL = True

SITE_URL = "http://localhost:3000"

# email
# EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'kd0996253125@gmail.com'
EMAIL_HOST_PASSWORD = 'tecmiiwwuuaknmlq'
EMAIL_PORT = 587
