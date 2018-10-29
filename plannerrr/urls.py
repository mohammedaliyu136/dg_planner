from plannerrr import views
from django.conf.urls import include, url
from django.contrib import admin
from plannerrr.advisor.views import edit_default_plan


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^login/', views.login_user, name='login'),
    url(r'^login_out/', views.logout_user, name='login'),
    url(r'^profile/', views.profile, name='profile'),
    url(r'^register/', views.register, name='register'),
    url(r'^enroll_profile/', views.enroll_profile, name='profile'),
    url(r'^indexx/', views.indexx, name='get_info'),
    url(r'^degree_req/', views.degree_req, name='free_elective_req'),
    url(r'^my_view/', views.my_view, name='my_view'),
    url(r'^show_schedule/', views.show_schedule, name='planner'),
    url(r'^search/', views.search, name='search'),

    url(r'^student/(?P<pk>\d+)$', views.search_click, name='student'),
    url(r'^students/$', views.search, name='students'),
    url(r'^team/$', views.team, name='team'),
    url(r'^plan/edit/$', views.edit_plan, name='team'),
    url(r'^plan/generated/pdf/$', views.generate_pdf, name='pdf'),


    url(r'^dashboard/', views.dashboard, name='dashboard'),
    url(r'^getcourse/', views.get_course, name='get_course'),
]
