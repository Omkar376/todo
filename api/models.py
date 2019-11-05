from django.db import models

# Create your models here.
class Todo(models.Model):
    #owner = models.ForeignKey(User)
    user = models.CharField(max_length=30)
    bucket = models.CharField(max_length=30, default = "default")
    description = models.CharField(max_length=30)
    done = models.BooleanField()
    updated = models.DateTimeField(auto_now_add=True)