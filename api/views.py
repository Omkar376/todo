from django.shortcuts import render

from datetime import datetime

# REST Framework
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

# Create your views here.

# Todo App
from api.serializers import TodoSerializer
from api.models import Todo


class TodosView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """ Get all todos """
        todos = Todo.objects.filter(user=request.user)
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)

    def post(self, request):
        " Adding a new todo."""
        data = request.data
        user = request.user
        t = Todo(user=user, bucket=data['bucket'] , description=data['description'], done=False)
        t.save()
        request.data['id'] = t.pk # return id
        return Response(request.data, status=status.HTTP_201_CREATED)

    def put(self, request):
        """ Update a todo """
        data = request.data
        todo_id = data['id']
        desc = data['description']
        done = data['done']
        bucket = data['bucket']
        t = Todo(id=todo_id, bucket= bucket, user=str(request.user), description=desc,\
                 done=done, updated=datetime.now())
        t.save()
        return Response(status=status.HTTP_200_OK)
    
class BucketView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """ Get all todos """
       # todos = Todo.objects.filter(user=request.user.id)
        todos = Todo.objects.filter(user=request.user)
        serializer = TodoSerializer(todos, many=True)
        unique_bucket = []
        for item in serializer.data:
            unique_bucket.append(list(item.values())[1])
        unique_bucket = set(list(unique_bucket))
        response = [{"value":b,"label":b} for b in unique_bucket]
        if len(response) == 0:
            response = [{"value":"default","label":"default"}]
        return Response(response)
    
class TodoDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """ Get a todo item """
        todos = Todo.objects.filter(id=request.GET.get('id'))
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
    
class TodoDeleteView(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request):
        """ Get a todo item """
        Todo.objects.filter(id=request.GET.get('id')).delete()
        return Response(True)
    
    



