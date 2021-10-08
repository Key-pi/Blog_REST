from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    def get_object(self):
        if self.kwargs.get('pk', None) == 'me':
            self.kwargs['pk'] = self.request.user.pk
        return super(UserViewSet, self).get_object()


class VerifyToken(APIView):
    def get(self, request):
        token_header = request.headers['Authorization'].split(' ')
        if len(token_header) == 2:
            token = token_header[1]
        else:
            token = None
        if token and Token.objects.filter(key=token).exists():
            return Response({'verified': True})
        return Response({'verified': False})



# User = get_user_model()
#
# class AuthViewSet(viewsets.GenericViewSet):
#
#     permission_classes = [AllowAny, ]
#     serializer_class = serializers.EmptySerializer
#     serializer_classes = {
#         'login': serializers.UserLoginSerializer,
#         'register': serializers.UserRegisterSerializer,
#         'password_change': serializers.PasswordChangeSerializer
#     }
#
#     @action(methods=['POST', ], detail=False)
#     def login(self, request):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = get_and_authenticate_user(**serializer.validated_data)
#         data = serializers.AuthUserSerializer(user).data
#         return Response(data=data, status=status.HTTP_200_OK)
#
#
#     @action(methods=['POST', ], detail=False)
#     def register(self, request):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = create_user_account(**serializer.validated_data)
#         data = serializers.AuthUserSerializer(user).data
#         return Response(data=data, status=status.HTTP_201_CREATED)
#
#
#     @action(methods=['POST', ], detail=False)
#     def logout(self, request):
#         logout(request)
#         data = {'success': 'Sucessfully logged out'}
#         return Response(data=data, status=status.HTTP_200_OK)
#
#
#     @action (methods = ['POST'], detail = False, permission_classes = [IsAuthenticated,])
#     def password_change(self, request):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         request.user.set_password(serializer.validated_data['new_password'])
#         request.user.save()
#         return Response(status=status.HTTP_204_NO_CONTENT)
#
#     def get_queryset(self):
#         return self.request.user
#
#
#     def get_serializer_class(self):
#         if not isinstance(self.serializer_classes, dict):
#             raise ImproperlyConfigured("serializer_classes should be a dict mapping.")
#
#         if self.action in self.serializer_classes.keys():
#             return self.serializer_classes[self.action]
#         return super().get_serializer_class()
# #
# class RegisterAPI(generics.GenericAPIView):
#     serializer_class = RegisterSerializer
#
#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         return Response({
#             'user': UserSerializer(user, context=self.get_serializer_context()).data,
#             'token':  AuthToken.objects.create(user)[1]
#         })
#
#
# class LoginAPI(KnoxLoginView):
#     permission_classes = (permissions.AllowAny,)
#
#     def post(self, request, format=None):
#         serializer = AuthTokenSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']
#         login(request, user)
#         return super(LoginAPI, self).post(request, format=None)
#
#




#
# class UserViewSet(viewsets.ModelViewSet):
#     serializer_class = UserSerializer
#     queryset = User.objects.all()
#     permission_classes = [IsAuthenticated]
#
#     def get_object(self):
#         if self.kwargs.get('pk', None) == 'me':
#             self.kwargs['pk'] = self.request.user.pk
#         return super(UserViewSet, self).get_object()
#
#
# class VerifyToken(APIView):
#     def get(self, request):
#         token_header = request.headers['Authorization'].split(' ')
#         if len(token_header) == 2:
#             token = token_header[1]
#         else:
#             token = None
#         if token and Token.objects.filter(key=token).exists():
#             return Response({'verified': True})
#         return Response({'verified': False})