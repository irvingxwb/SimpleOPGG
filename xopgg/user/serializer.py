from rest_framework import serializers
from .models import User, Account

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'