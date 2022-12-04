import os
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from pcd.models import Admin,User,Notes,Plan,Activity,Message,Statistics,Notification
from bson import ObjectId
from django.http import HttpResponse
from pcd.serializers import UserSerializer,NoteSerializer,NotificationSerializer,MessageSerializer,ActivitySerializer
from django.core.files.storage import default_storage
import pickle
import numpy as np 
from keras.preprocessing.sequence import pad_sequences
from keras.preprocessing.text import Tokenizer
import keras

def get_prediction(text):
    texts=[text]
    ml_mod=keras.models.load_model("new.h5")
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(texts)
    seq = tokenizer.texts_to_sequences(texts)
    padded = pad_sequences(seq, maxlen=250)
    pred = ml_mod.predict(padded)
    labels = ['Neutral', 'Anxiety', 'Depression', 'Insomnia','Trauma' ]
    return (labels[np.argmax(pred)])
   
@csrf_exempt
def NotesApi(request,id=0):
    if request.method=='GET':
        note = Notes.objects.filter(user=id)
        note_serializer=NoteSerializer(note,many=True)
        return JsonResponse(note_serializer.data,safe=False)
    elif request.method=='POST':
        note_data=JSONParser().parse(request)
        note_serializer=NoteSerializer(data=note_data)
        if note_serializer.is_valid():
            note_serializer.save()
            newtype=get_prediction(note_serializer.data['note_content'])
            user= User.objects.get(user_id=note_data["user"])
            user_serializer=UserSerializer(user,data={"user_type":newtype},partial=True)
            user_serializer.is_valid()
            user_serializer.save()
            return JsonResponse("added succefully",safe=False)
        print(note_serializer.errors)
        return JsonResponse("Failed to add",safe=False)
    elif request.method=='PUT':
        note_data=JSONParser().parse(request)
        note=Notes.objects.get(note_id = note_data['note_id'] )
        note_serializer=NoteSerializer(note,data=note_data)
        if note_serializer.is_valid():
            note_serializer.save()
            return JsonResponse("Update Successfully",safe=False)
        return JsonResponse("Failed to update")
    elif request.method=='DELETE':
        note=Notes.objects.get(note_id = id)
        note.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def UserActivityApi(request,id=0):
    if request.method=='GET':
        A_data=JSONParser().parse(request)
        activity=Activity.objects.get(plan_name = A_data['user_type'] )
        A_serializer=ActivitySerializer(activity,many=True)
        return JsonResponse(A_serializer.data,safe=False)

@csrf_exempt
def SaveFileApi(request,id=0): 
    file = request.FILES['image'] 
    file_name=default_storage.save(file.name,file) 
    return JsonResponse(file_name,safe=False)

@csrf_exempt
def NotificationApi(request,id=0):
    if request.method=='GET':
        notification = Notification.objects.filter(user= id)
        notification_serializer=NotificationSerializer(notification,many=True)
        return JsonResponse(notification_serializer.data,safe=False)
    elif request.method=='POST':
        notification_data=JSONParser().parse(request)
        notification_serializer=NotificationSerializer(data=notification_data)
        if notification_serializer.is_valid():
            notification_serializer.save()
            return JsonResponse("added succefully",safe=False)
        print(notification_serializer.errors)
        return JsonResponse(notification_serializer.errors,safe=False)
    elif request.method=='PUT':
        notification_data=JSONParser().parse(request)
        notification=Notification.objects.get(id = notification_data['id'],user=id )
        notification_serializer=NotificationSerializer(notification,data=notification_data,partial=True)
        if notification_serializer.is_valid():
            notification_serializer.save()
            return JsonResponse("Update Successfully",safe=False,status=201)
        print(notification_serializer.errors)
        return JsonResponse("Failed to update",status=400)
    elif request.method=='DELETE':
        notification=Notification.objects.get(id = id)
        notification.delete()
        return JsonResponse("Deleted Successfully",safe=False)
