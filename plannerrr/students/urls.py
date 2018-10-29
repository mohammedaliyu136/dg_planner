from django.conf.urls import include, url
from django.contrib import admin
from plannerrr.students import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'plan/edit/$', views.edit_plan, name='edit_plan'),
    url(r'plan/generated/pdf/$', views.generate_pdf, name='pdf'),
    url(r'enroll_profile/', views.enroll_profile, name='profile'),
    url(r'plan/save/', views.save_plan, name='profile')

]
