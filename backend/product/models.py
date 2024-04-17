from django.db import models
# from django.core.validators import FileExtensionValidator
from category.models import Category

class Product(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    price = models.IntegerField(default=0)
    imageUrl = models.ImageField(upload_to='images/product')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.title