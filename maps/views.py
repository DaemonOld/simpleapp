from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ObjectSerializer, ObjectTypeSerializer
from .models import Object, ObjectType
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response


class ObjectTypeViewSet(viewsets.ModelViewSet):
    queryset = ObjectType.objects.all()
    serializer_class = ObjectTypeSerializer

class ObjectViewSet(viewsets.ModelViewSet):
    queryset = Object.objects.all()
    serializer_class = ObjectSerializer

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if username is None or password is None:
            return Response({'error': 'Please provide both username and password'},
                            status=HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        
        if not user:
            return Response({'error': 'Invalid Credentials'}, status=HTTP_404_NOT_FOUND)
        
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({'token': token.key}, status=HTTP_200_OK)

class LogoutView(APIView):

    def get(self, request):
        user = request.user
        Token.objects.filter(user=user).delete()
        return Response(status=HTTP_200_OK)

class UserView(APIView):

    def get(self, request):
        user = request.user
        return Response({
            'user': {
                'id': user.id,
                'username': user.username
            }
        }, status=HTTP_200_OK)
