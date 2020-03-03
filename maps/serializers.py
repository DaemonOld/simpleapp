from rest_framework import serializers
from .models import Object, ObjectType

class ObjectTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObjectType
        fields = '__all__'

class ObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Object
        fields = '__all__'