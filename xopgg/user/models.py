from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    email = models.CharField(max_length=50)

    def __str__(self):
        return self.username + "/" + self.password + "/" + self.email


class Account(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    accountid = models.CharField(max_length=30)

    def __str__(self):
        return self.accountid + "/" + self.user.username
