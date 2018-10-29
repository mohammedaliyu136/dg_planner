from django.conf.urls import include, url
from django.contrib import admin
from plannerrr.accounts import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^login/', views.login_user, name='login'),
    url(r'^logout/', views.logout_user, name='login'),
    url(r'^profile/', views.profile, name='profile'),
    url(r'^register/', views.register, name='register'),
]
