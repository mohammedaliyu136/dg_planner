from django.contrib import admin
from .models import *
from .models import Specialization_r, Program_r, Gened_r, Major_r, Minor_r, Gened_rr, Gened_collection, Collections_r


from django.contrib.auth.models import User

from django.forms import CheckboxSelectMultiple

# Register your models here.
#admin.site.register(Course)
#admin.site.register(CourseCollection)
#admin.site.register(Program)
#admin.site.register(Trajectory)

#admin.site.register(Specialization_r)
#admin.site.register(Program_r)
#admin.site.register(Gened_r)
#admin.site.register(Major_r)
#admin.site.register(Minor_r)

#admin.site.register(Gened_rr)
#admin.site.register(Gened_collection)
#admin.site.register(Collections_r)
#admin.site.register(Plans)


from import_export.admin import ImportExportModelAdmin
from django.contrib import admin


@admin.register(Course)
@admin.register(CourseCollection)
@admin.register(Program)
@admin.register(Trajectory)
@admin.register(Specialization_r)
@admin.register(Program_r)
@admin.register(Gened_r)
@admin.register(Major_r)
@admin.register(Minor_r)
@admin.register(Gened_rr)
@admin.register(Gened_collection)
@admin.register(Collections_r)
@admin.register(Plans)
class ProfileAdmin(ImportExportModelAdmin):
    pass
