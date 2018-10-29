from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class School_option(models.Model):
    name = models.CharField(max_length=25, null=True)
    description = models.CharField(max_length=300, null=True)

    def __str__(self):
        return self.name + ' - ' + self.description


class Major_option(models.Model):
    name = models.CharField(max_length=30, null=True)
    description = models.CharField(max_length=300, null=True)

    def __str__(self):
        return self.name + ' - ' + self.description

class Profile(models.Model):
    user = models.ForeignKey(to=User, related_name="profile", blank=True, null=True)
    semester_enrolled = models.CharField(max_length=30, null=True)
    year_enrolled = models.CharField(max_length=10, null=True)
    major = models.CharField(max_length=20, null=True)
    school = models.CharField(max_length=15, null=True)
    is_advisor = models.BooleanField(default=False)
    is_student = models.BooleanField(default=True)

    def __str__(self):
        return self.major + ' - ' + self.school


class Schedules(models.Model):
    user = models.ForeignKey(to=User, related_name="schedule", blank=True, null=True)
    course_id = models.CharField(max_length=10, null=True)
    course_title = models.CharField(max_length=50, null=True)
    semester = models.CharField(max_length=20, null=True)
    def __str__(self):
        return self.course_id + ' - ' + self.semester

class DefaultSchedules(models.Model):
    major = models.ForeignKey(to=Major_option, related_name="major_schedule", blank=True, null=True)
    course_id = models.CharField(max_length=10, null=True)
    course_title = models.CharField(max_length=50, null=True)
    semester = models.CharField(max_length=20, null=True)
    def __str__(self):
        return self.course_id + ' - ' + self.semester

class Free_elective(models.Model):
    course_id = models.CharField(max_length=20, null=True)
    major = models.CharField(max_length=20, null=True)

    def __str__(self):
        return self.course_id + ' - ' + self.school


class Courses(models.Model):
    code = models.CharField(max_length=10, primary_key=True)
    course_title = models.CharField(max_length=50, null=True)
    course_description = models.CharField(max_length=100, null=True)
    dept_name = models.CharField(max_length=30, null=True)
    course_credit = models.IntegerField(null=True)

    def __str__(self):
        return self.code + ' - ' + self.course_title

class Department(models.Model):
    dept_name = models.CharField(max_length=20, null=True)
    building = models.CharField(max_length=25, null=True)

class Pre_req(models.Model):
    course_id = models.CharField(max_length=20,null=True)
    pre_req_id = models.CharField(max_length=20,null=True)

    def __str__(self):
        return self.course_id + ' - ' + self.pre_req_id + ' - ' + ''


class Degree_req(models.Model):
    course_id = models.CharField(max_length=20,null=True)
    course_title = models.CharField(max_length=30, null=True)
    major_name = models.CharField(max_length=30, null=True)

    def __str__(self):
        return self.course_id + ' - ' + self.major_name + ' - ' + ''
