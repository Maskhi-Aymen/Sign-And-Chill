from asyncio.windows_events import NULL
from email.policy import default
from pickle import TRUE
from pyexpat import model
from statistics import mode
from django.db import models
from datetime import date

# Create your models here.

class Admin(models.Model):
    admin_mail = models.CharField(max_length=500,unique=True) 
    admin_password = models.CharField(max_length=500)
class User(models.Model):
    user_id=models.BigAutoField(primary_key=True)
    user_mail = models.EmailField(max_length=254,unique=True)
    user_password = models.CharField(max_length=500)
    user_name = models.CharField(max_length=50)
    user_Lastname=models.CharField(max_length=50)
    user_date_birth=models.DateField()
    user_dateOfJoin=models.DateField()
    user_avatar=models.TextField(max_length=10000,default='')
    user_type=models.CharField(max_length=40,blank=True)
    user_num=models.CharField(max_length=500,blank=True)
    user_address=models.CharField(max_length=500,blank=True)
    admin=models.BooleanField(default=False) 


class Notes (models.Model):
    note_id=models.BigAutoField(primary_key=True)
    note_content=models.TextField(max_length=2500)
    note_date=models.DateField(auto_now=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE)

class Activity(models.Model):
    activity_id  = models.BigAutoField(primary_key=True)
    activity_name = models.CharField(max_length=100,unique=True)
    activity_type = models.CharField(max_length=100)
    activity_date = models.DateField()
    activity_time = models.CharField(max_length=100)
    activity_duration = models.CharField(max_length=100)
    label= models.CharField(max_length=100,blank=True)

class Plan(models.Model):
    plan_id=models.BigAutoField(primary_key=True)
    plan_name =models.CharField(max_length=100)
    plan_type =models.CharField(max_length=500)
    plan_activity=models.ManyToManyField(Activity,related_name='plan_activity')

class Message(models.Model):
    message_id = models.BigAutoField(primary_key=True)
    message_user = models.ForeignKey(User,on_delete=models.CASCADE)
    message_content = models.TextField(max_length=500,unique=True)
    message_date=models.DateField(auto_now=True)

class Statistics(models.Model):
    st_id = models.BigAutoField(primary_key=True)
    st_date = models.DateField()
    st_nb_user= models.IntegerField()
    st_nb_pub= models.IntegerField()
    st_nb_sugg= models.IntegerField()


class Notification(models.Model):
    id=models.BigAutoField(primary_key=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    date=models.DateField(auto_now=True)
    notification=models.TextField(max_length=500)
    is_seen=models.BooleanField(default=False)

class ResetPassword(models.Model):
    id=models.BigAutoField(primary_key=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    token=models.TextField(max_length=500)