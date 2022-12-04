from django.urls import re_path,path 
from django.conf.urls import include
from pcd import views_login,views_Admin,views_User
from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static
from django.conf import settings


router=  DefaultRouter()
router.register("messageadmin",views_Admin.MessageAPI,basename="message")
router.register("useradmin",views_Admin.UserAPI,basename="user")
urlpatterns = [

    path('login/<str:id>', views_login.login),

    path("",include(router.urls)),
    re_path(r'^getuser/([0-9]+)$',views_Admin.GetUser),
    re_path(r'^notes$',views_User.NotesApi),
    re_path(r'^notes/([0-9]+)$',views_User.NotesApi),
    re_path(r'^notification$',views_User.NotificationApi),
    re_path(r'^notification/([0-9]+)$',views_User.NotificationApi),
    re_path(r'^useractivity$',views_User.UserActivityApi),
    re_path(r'^savefile/([0-9]+)$',views_User.SaveFileApi),

    re_path(r'^user$',views_Admin.UserApi),
    re_path(r'^user/([0-9]+)$',views_Admin.UserApi),
    re_path(r'^plan$',views_Admin.PlanApi),
    re_path(r'^plan/([0-9]+)$',views_Admin.PlanApi),
    re_path(r'^activity$',views_Admin.ActivityApi),
    re_path(r'^activity/([0-9]+)$',views_Admin.ActivityApi),
    re_path(r'^planactivity$',views_Admin.Plan_ActivityApi),
    re_path(r'^planactivity/([0-9]+)$',views_Admin.Plan_ActivityApi),
    re_path(r'^statistics$',views_Admin.StatisticsApi),
    re_path(r'^statistics/([0-9]+)$',views_Admin.StatisticsApi),
    re_path(r'^messages$',views_Admin.MessageApi),
    re_path(r'^messages/([0-9]+)$',views_Admin.MessageApi),


    re_path(r'^mail$',views_login.SendMailApi),
    re_path(r'^reset$',views_login.ResetApi),


    
    
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT) 
