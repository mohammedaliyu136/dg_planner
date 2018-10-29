from django.conf.urls import include, url
from django.contrib import admin
from plannerrr.advisor import views

urlpatterns = [
    url(r'^$', views.edit_default_plan, name='pdf'),
    url(r'search/', views.search, name='search'),
    url(r'students/$', views.search, name='students'),
    url(r'^student/(?P<pk>\d+)$', views.search_click, name='student'),
    url(r'^plan/default/$', views.default_plan, name='default_plan'),
    url(r'^select/major/$', views.select_major, name='select_major'),
    url(r'^default/plan/save/$', views.save_plan, name='save_plan'),
]
