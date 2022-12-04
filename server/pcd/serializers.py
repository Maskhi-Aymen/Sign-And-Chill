from dataclasses import field
from email import message
from rest_framework import serializers
from pcd.models import Admin,User,Notes,Plan,Activity,Message,Statistics,Notification,ResetPassword

class AdminSerializer(serializers.ModelSerializer):
     class Meta:
         model=Admin
         fields=('admin_mail','admin_password')


class NoteSerializer(serializers.ModelSerializer):
     class Meta:
         model=Notes
         fields=('note_id','note_content','note_date','user')

class PlanSerializer(serializers.ModelSerializer):
     class Meta:
         model=Plan
         fields=('plan_id','plan_name','plan_type','plan_activity')

class ActivitySerializer(serializers.ModelSerializer):
     class Meta:
         model=Activity 
         fields=('activity_id','activity_name','activity_type','activity_date','activity_time','activity_duration','label')

class MessageSerializer(serializers.ModelSerializer):
     class Meta:
         model=Message
         fields=('message_id','message_user','message_content','message_date')


class StatisticSerializer(serializers.ModelSerializer):
     class Meta:
         model=Statistics
         fields=('st_id','st_date','st_nb_user','st_nb_pub','st_nb_sugg')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
         model=User
         fields=('user_id','user_mail','user_password','user_name','user_Lastname','user_num','user_address','user_date_birth','user_dateOfJoin','user_avatar','user_type','admin')
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
         model=Notification
         fields=('id','user','notification','date','is_seen')

class ResetPasswordSerializer(serializers.ModelSerializer):
    class Meta:
         model=ResetPassword
         fields=('id','user','token')
