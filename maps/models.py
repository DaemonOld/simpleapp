from django.db import models

# Create your models here.

class ObjectType(models.Model): 
    name = models.CharField(max_length=100, verbose_name="Наименование")

    class Meta:
        verbose_name = 'Тип объекта'
        verbose_name_plural = 'Типы объектов'

    def __str__(self):
        return self.name

class Object(models.Model):
    object_type = models.ForeignKey(ObjectType, on_delete=models.CASCADE, verbose_name="Тип объекта")
    description = models.TextField(max_length=1000, verbose_name="Описание")

    class Meta:
        verbose_name = 'Объект'
        verbose_name_plural = 'Объекты'
