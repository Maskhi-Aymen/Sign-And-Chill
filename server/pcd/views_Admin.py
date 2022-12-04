from email import message
from functools import partial
from pickle import FALSE, TRUE
from django.core.mail import send_mail 
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import viewsets
from django.http.response import JsonResponse
from pcd.models import User,Plan,Activity,Message,Statistics,ResetPassword
from bson import ObjectId
from django.http import HttpResponse
from pcd.serializers import UserSerializer,ActivitySerializer,ResetPasswordSerializer,StatisticSerializer,MessageSerializer,PlanSerializer
from datetime import datetime , date

@csrf_exempt 
def UserApi(request,id=0):
    if request.method=='GET':
        user = User.objects.all()
        user_serializer=UserSerializer(user,many=True)
        return JsonResponse(user_serializer.data,safe=False)
    elif request.method=='POST':
        user_data=JSONParser().parse(request)
        user_serializer=UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            send_mail('Sign and Chill : Reset Password',
            'Hello '+user_serializer.data['user_name']+' \n Welcome to Chillin\'!  Thanks for opening your account on the chillin.com.\n We hope you enjoy your experience!' ,'chillin.pcd@gmail',
        [user_serializer.data['email']],fail_silently=False)
            return JsonResponse("added succefully",safe=False)
        print(user_serializer.errors)
        return JsonResponse(user_serializer.errors,safe=False)
    elif request.method=='PUT':
        user_data=JSONParser().parse(request)
        user=User.objects.get(user_id = user_data['user_id'] )
        user_serializer=UserSerializer(user,data=user_data,partial=True)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Update Successfully",safe=False,status=201)
        print(user_serializer.errors)
        return JsonResponse("Failed to update",status=400,safe=False)
    elif request.method=='DELETE':
        user=User.objects.get(user_id = id)
        user.delete()
        return JsonResponse("Deleted Successfully",safe=False)
   
@csrf_exempt
def GetUser(request,id=0):
        user=User.objects.get(user_id = id)
        user_serializer=UserSerializer(user) 
        return JsonResponse(user_serializer.data,safe=False)


class MessageAPI(viewsets.ModelViewSet):
    serializer_class=MessageSerializer 
    queryset=Message.objects.all()
 
class UserAPI(viewsets.ModelViewSet):
    serializer_class=UserSerializer
    def get_queryset(self):
        Users=User.objects.all()
        return Users
@csrf_exempt
def MessageApi(request,id=0):
    if request.method=='GET':
        message = Message.objects.all()
        message_serializer=MessageSerializer(message,many=True)
        return JsonResponse(message_serializer.data,safe=False)
    elif request.method=='POST':
        message_data=JSONParser().parse(request)
        message_serializer=MessageSerializer(data=message_data)
        if message_serializer.is_valid():
            message_serializer.save()
            return JsonResponse("message sent successfully",safe=False)
        print(message_serializer.errors)
        return JsonResponse("Operation Failed",safe=False)
    elif request.method=='DELETE':
        message=Message.objects.get(message_id = id)
        message.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def ActivityApi(request,id=0):
    if request.method=='GET':
        activity = Activity.objects.all()
        activity_serializer=ActivitySerializer(activity,many=True)
        return JsonResponse(activity_serializer.data,safe=False)
    elif request.method=='POST':
        activity_data=JSONParser().parse(request) 
        try:   
            activity=Activity.objects.get(plan_activity= id,activity_name = activity_data["activity_name"])
            activity_serializer=ActivitySerializer(activity,data=activity_data,partial=True)
            if activity_serializer.is_valid():
                activity_serializer.save()
                return JsonResponse("Update Successfully",safe=False)
            return JsonResponse("Failed to update",safe=False)
        except Activity.DoesNotExist:
            activity_serializer=ActivitySerializer(data=activity_data)
            if activity_serializer.is_valid():
               activity_serializer.save()
            newactivity=Activity.objects.order_by('activity_id').reverse()[:1]
            newAct =ActivitySerializer(data=newactivity,many=True)        
            newAct.is_valid();
            plan=Plan.objects.get(plan_id=id)
            plan_serializer=PlanSerializer(plan,partial=True)
            PlanActivity=plan_serializer.data.get('plan_activity')
            idAct=newAct.data[0].get('activity_id')
            PlanActivity.append(idAct)
            plan_serializer.data.update({"plan_activity":PlanActivity})
            p=PlanSerializer(plan,data=plan_serializer.data)
            if p.is_valid():
               p.save()
               return JsonResponse("added succefully",safe=False)
            print(p.errors)
            return JsonResponse("Faield to add",safe=False)
    elif request.method=='DELETE':
        activity_data=JSONParser().parse(request) 
        try:   
            activity=Activity.objects.get(activity_name = activity_data["activity_name"], plan_activity= id)
            activity.delete()
            return JsonResponse("Deleted Successfully",safe=False)
        except Activity.DoesNotExist:
            return JsonResponse("Deleted ",safe=False)
    elif request.method=='PATCH':
        activity=Activity.objects.get(activity_id = id)
        activity_serializer=ActivitySerializer(activity)
        return JsonResponse(activity_serializer.data,safe=False)
@csrf_exempt
def PlanApi(request,id=0):
    if request.method=='GET':
        plan = Plan.objects.all()
        plan_serializer=PlanSerializer(plan,many=True)
        return JsonResponse(plan_serializer.data,safe=False)
    elif request.method=='POST':
        plan_data=JSONParser().parse(request)
        plan_serializer=PlanSerializer(data=plan_data)
        if plan_serializer.is_valid():
            plan_serializer.save()
            return JsonResponse("added succefully",safe=False)
        return JsonResponse(plan_data,safe=False)
    elif request.method=='PUT':
        plan_data=JSONParser().parse(request)
        plan=Plan.objects.get(plan_id = plan_data['plan_id'] )
        plan_serializer=PlanSerializer(plan,data=plan_data)
        if plan_serializer.is_valid():
            plan_serializer.save()
            return JsonResponse("Update Successfully",safe=False)
        return JsonResponse("Failed to update")
    elif request.method=='DELETE':
        plan=Plan.objects.get(plan_id = id)
        plan.delete()
        return JsonResponse("Deleted Successfully",safe=False)
    elif request.method=='PATCH':
        plan=Plan.objects.get(plan_id = id)
        plan_serializer=PlanSerializer(plan)
        return JsonResponse(plan_serializer.data,safe=False)

@csrf_exempt
def Plan_ActivityApi(request,id=0):
    if request.method=='GET':
        plan=Activity.objects.filter(plan_activity=id)
        plan_serializer=ActivitySerializer(plan,many=True)
        return JsonResponse(plan_serializer.data,safe=False)
    elif request.method=='POST':
        plan_data=JSONParser().parse(request)
        plan=Plan.objects.get(plan_id=plan_data['plan_id'])
        plan_serializer=PlanSerializer(plan,partial=True)
        PlanActivity=plan_serializer.data.get('plan_activity')
        PlanActivity.append(id) 
        plan_serializer.data.update({'plan_activity':PlanActivity})
        p=PlanSerializer(plan,data=plan_serializer.data)
        if p.is_valid():
            p.save()
            return JsonResponse(p.data)
        return JsonResponse(p.errors)
    elif request.method=='OPTIONS':
        plan_data=JSONParser().parse(request)
        plan=Plan.objects.get(plan_name=plan_data['plan_name'])
        plan_serializer=PlanSerializer(plan)
        activitys=Activity.objects.filter(plan_activity=plan_serializer.data['plan_id'])
        activity_serializer=ActivitySerializer(activitys,many=True)
        return JsonResponse(activity_serializer.data,safe=False)
    elif request.method=='DELETE':
        #il faut ajouter cette operation au activity
        plan_data=JSONParser().parse(request)
        plan=Plan.objects.get(plan_id=plan_data['plan_id'])
        plan_serializer=PlanSerializer(plan,partial=True)
        activity=plan_serializer.data.get('plan_activity')
        activity.remove(int(id))
        plan_serializer.data.update({'plan_activity':activity})
        p=PlanSerializer(plan,data=plan_serializer.data)
        if p.is_valid():
            p.save()
            return JsonResponse(p.data)
        return JsonResponse(p.errors)

@csrf_exempt
def StatisticsApi(request,id=0):
    if request.method=='GET':
           user = Statistics.objects.all().order_by('st_date').reverse()[:12]
           user_serializer=StatisticSerializer(user,many=True)
           return JsonResponse(user_serializer.data,safe=False)
    elif request.method=='POST':
        try :
            stat_last_month=Statistics.objects.get(st_date = date(datetime.now().year,datetime.now().month-1, 28))
            serializer=StatisticSerializer(stat_last_month)
            return JsonResponse(serializer.data,safe=False)
        except Statistics.DoesNotExist:
            nb_Pub=Publication.objects.filter(pub_date__gt = date(datetime.now().year,datetime.now().month-1, 1)).filter(pub_date__lt = date(datetime.now().year,datetime.now().month-1, 28)).count()
            nb_user=User.objects.filter(user_dateOfJoin__gt = date(datetime.now().year,datetime.now().month-1, 1)).filter(user_dateOfJoin__lt = date(datetime.now().year,datetime.now().month-1,28)).count()
            nb_sugg=Publication.objects.filter(pub_date__gt = date(datetime.now().year,datetime.now().month-1, 1)).filter(suggestion=True).filter(pub_date__lt = date(datetime.now().year,datetime.now().month-1,28)).count()
            info={"st_date": date(datetime.now().year,datetime.now().month-1, 28),"st_nb_user": nb_user,"st_nb_pub": nb_Pub,"st_nb_sugg": nb_sugg}
            stat=StatisticSerializer(data=info)
            stat.is_valid()
            stat.save()
            return JsonResponse(stat.data,safe=False)
    elif request.method=='PUT':
        nb_Pub=Publication.objects.filter(pub_date__gt = date(datetime.now().year,datetime.now().month-1, 28)).count()
        nb_user=User.objects.filter(user_dateOfJoin__gt = date(datetime.now().year,datetime.now().month-1, 28)).count()
        nb_sugg=Publication.objects.filter(pub_date__gt = date(datetime.now().year,datetime.now().month-1, 27)).filter(suggestion=True).filter(pub_date__lt = date(datetime.now().year,datetime.now().month,28)).count()
        info={"st_nb_user": nb_user,"st_nb_pub": nb_Pub,"st_nb_sugg": nb_sugg}
        return JsonResponse(info,safe=False)
