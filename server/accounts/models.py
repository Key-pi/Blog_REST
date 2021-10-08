#WORK V.1
from django.db import models
from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

from .managers import UserManager



# class Categories(models.Model):
#     name = models.CharField(max_length=50)
#
#     def __str__(self):
#         return self.name


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"), unique=True)
    username = models.CharField(_("full name"), max_length=64, blank=True)
    date_joined = models.DateTimeField(_("date joined"), auto_now_add=True)
    is_active = models.BooleanField(_("active"), default=True)
    is_staff = models.BooleanField(_("staff"), default=True)
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)
    phone_number = models.CharField(
        _("phone number"), max_length=16,  null=True,
        blank=True, unique=True
    )

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def email_user(self, subject, message, from_email=None, **kwargs):
        """
        Sends an email to this User.
        """
        send_mail(subject, message, from_email, [self.email], **kwargs)



# class Reader(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='reader_user', editable=False)
#     adult = models.BooleanField(default=False)
#     interests = models.ManyToManyField(Categories, related_name='interests', blank=True, null=True)
#     is_super_user = models.BooleanField(default=False, editable=False)
#     avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
#
#     def __str__(self):
#         return self.user.username
#
#
# class Blogger(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='blogger_user', editable=False)
#     birthday = models.DateField(default=timezone.now)
#     country = models.CharField('Country', max_length=100, null=False, blank=False)
#     city = models.CharField('City', max_length=100, null=False, blank=False)
#     categories = models.ManyToManyField(Categories, related_name='categories_set', blank=True, null=True, )
#     is_super_user = models.BooleanField(default=True, editable=False)
#     avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
#
#     def __str__(self):
#         return self.user.username



# class CustomUser(AbstractUser):
#     username = models.CharField('username', unique=True, max_length=255)
#     email = models.EmailField('email address', unique=True)
#     first_name = models.CharField('First Name', max_length=255, blank=True, null=False)
#     last_name = models.CharField('Last Name', max_length=255, blank=True, null=False)
#
#
#     def __str__(self):
#         return f"{self.email} - {self.first_name} {self.last_name}"
#
#




















# class User(AbstractBaseUser, PermissionsMixin):
#     email = models.EmailField(("email address"), unique=True)
#     username = models.CharField(("full name"), max_length=64, blank=True)
#     date_joined = models.DateTimeField(("date joined"), auto_now_add=True)
#     is_active = models.BooleanField(("active"), default=True)
#     is_staff = models.BooleanField(("staff"), default=True)
#     avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)
#
#
#     objects = UserManager()
#
#     USERNAME_FIELD = "email"
#     REQUIRED_FIELDS = []
#
#     class Meta:
#         verbose_name = ("user")
#         verbose_name_plural =("users")
#
#     def email_user(self, subject, message, from_email=None, **kwargs):
#         """
#         Sends an email to this User.
#         """
#         send_mail(subject, message, from_email, [self.email], **kwargs)
#




#
# class User(AbstractBaseUser, PermissionsMixin):
#     email = models.EmailField(("email address"), unique=True)
#     username = models.CharField(("full name"), max_length=64, blank=True)
#     date_joined = models.DateTimeField(("date joined"), auto_now_add=True)
#     is_active = models.BooleanField(("active"), default=True)
#     is_staff = models.BooleanField(("staff"), default=True)
#     avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)
#     phone_number = models.CharField(
#         ("phone number"), max_length=16,  null=True,
#         blank=True, unique=True
#     )
#
#     objects = UserManager()
#
#     USERNAME_FIELD = "email"
#     REQUIRED_FIELDS = []
#
#     class Meta:
#         verbose_name = ("user")
#         verbose_name_plural =("users")
#
#     def email_user(self, subject, message, from_email=None, **kwargs):
#         """
#         Sends an email to this User.
#         """
#         send_mail(subject, message, from_email, [self.email], **kwargs)
