from rest_framework import serializers
from .models import Product
from category.serializers import CategorySerializer
from comment.serializers import CommentSerializer

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    comment_set = CommentSerializer(read_only=True, many=True)

    class Meta:
        model = Product
        fields = ['id', 'category', 'title', 'description', 'price', 'imageUrl', 'comment_set']