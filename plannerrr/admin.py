from django.contrib import admin

# Register your models here.
from plannerrr.models import School_option, Major_option, Schedules, Courses, Department, Pre_req, \
    Degree_req, Profile, Free_elective

admin.site.register(School_option)
admin.site.register(Major_option)
admin.site.register(Schedules)
admin.site.register(Courses)
admin.site.register(Department)
admin.site.register(Pre_req)
admin.site.register(Degree_req)
admin.site.register(Profile)
admin.site.register(Free_elective)

admin.site.site_header = 'Degree Planner Administration'
admin.site.index_title = 'Degree Planner'
admin.site.site_title = 'Degree Planner Administration'




