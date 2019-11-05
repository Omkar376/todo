from django.test import TestCase
'''
# Create your tests here.
import requests

BASE_URL = "http://127.0.0.1:8000/"
HEADERS = {}
HEADERS['Content-Type'] = "application/json"
HEADERS['Authorization'] = "Token 439b7f2095fcaa75bbbd4de214638f7bf3987cbf"

class UserSignUpInTest():
    
    def register(self):
        url = BASE_URL + "rest-auth/registration/"
        data = {}
        user = "test1"
        password = "test@123"
        data['username'] = user
        data['email'] = user + "@gmail.com"
        data['password1'] = password
        data['password2'] = password
        response = requests.post(url, data=data)
        
    def login(self):
        url = BASE_URL + "rest-auth/login/"
        data = {}
        user = "test1"
        password = "test@123"
        data['username'] = user
        data['password'] = password
        response = requests.post(url, data=data)
    
class UserActivityTest():
    
    def get_todos(self):
        url = BASE_URL + "todos/"
        response = requests.get(url, headers= HEADERS)
        self.assertEqual(response.status_code, 200)

    def get_bucket_list(self):
        url = BASE_URL + "buckets/"
        response = requests.get(url, headers= HEADERS)
        self.assertEqual(response.status_code, 200)

        
    def get_todo_details(self):
        url = BASE_URL + "details/?id=${todoid}"
        response = requests.get(url, headers= HEADERS)
        self.assertEqual(response.status_code, 200)

    def create_todo(self):
        url = BASE_URL + "todos/"
        response = requests.post(url, data=data, headers= HEADERS)
        self.assertEqual(response.status_code, 200)
     
    def delete_todo(self):
        response = requests.delete(url, headers= HEADERS)
        self.assertEqual(response.status_code, 200)
 
    def update_todo(self):
        url = BASE_URL + "todos/"
        response = requests.put(url, data=data, headers= HEADERS)
        self.assertEqual(response.status_code, 200)
'''
        
    