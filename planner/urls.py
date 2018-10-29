from django.conf.urls import url, include
from django.contrib.auth import views as auth_views
from django.contrib.auth.views import logout
from degree_planner_final import settings
from .views import *


urlpatterns = [
    url(r'^major/$', select_major, name='select_major'),
    url(r'^completed/(?P<pk>\w+)/$', select_completed_courses, name='select_completed_courses'),
    url(r'^plan/$', plan, name='planner'),

    url(r'^plan/edit/$', edit_planner, name='plan_edit'),

    url(r'^mark/completed/$', mark_completed, name="mark_completed"),

    url(r'^signup/$', signup, name='signup'),
    url(r'^logout/$', logout, {'next_page': settings.LOGOUT_REDIRECT_URL}, name='logout'),

    url(r"^", include("django.contrib.auth.urls"))

]
