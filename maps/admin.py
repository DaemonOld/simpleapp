from django.contrib import admin
from .models import Object, ObjectType

# Register your models here.

@admin.register(ObjectType)
class ObjectTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(Object)
class ObjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'object_type', 'description')