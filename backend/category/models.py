from django.db import models
from django.core.validators import FileExtensionValidator

class Category(models.Model):
    #imageUrl = models.ImageField(upload_to='images/category')
    imageUrl = models.FileField(upload_to='images/category', validators=[FileExtensionValidator(['svg'])])
    text = models.CharField(max_length=20)
    link = models.CharField(max_length=20)

    def __str__(self):
        return self.text
