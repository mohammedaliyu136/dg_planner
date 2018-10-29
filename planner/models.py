from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save

#from autoslug import AutoSlugField

class Course(models.Model):
    name = models.CharField(max_length = 150)
    #courseSlug = AutoSlugField(populate_from='name', unique=True)

    # ordering
    corequisites = models.ManyToManyField('Course', related_name = 'prereqField', blank=True)
    prerequisites = models.ManyToManyField('Course', related_name = 'coreqField', blank=True)

    # basic course information
    department = models.CharField(max_length = 150)
    departmentAbbr = models.CharField(max_length = 5)
    courseNumber = models.CharField(max_length = 3)
    courseDescription = models.TextField()
    credits = models.IntegerField()

    # catalog year for the course
    catalogYear = models.DateField()

    def isUpperClass(coursenumber):
      if courseNumber > 300:
          return True
      else:
          return False

    # available next semester?
    # CRN
    # section number
    # professor

    # Course may need program-specific information

    # default sorting order in admin
    class Meta:
        ordering = ('name',)

    def __unicode__(self):
        return self.name+" - "+self.departmentAbbr+self.courseNumber

    #def get_absolute_url(self):
     #   return '/courses/%s/' % self.slug

# gen eds are coursecollections in programs
class CourseCollection(models.Model):
    name = models.CharField(max_length = 150)

    # a number of courses
    courses = models.ManyToManyField('Course', related_name='courses', blank=True)

    # how many of those are required
    numReq = models.IntegerField()

    # function to determine if there is a difference between this and last year
    # not everything changes-- should be able to multiple reference to one thing

    # catalog year for the coursecollection
    catalogYear = models.DateField()

    # if the course collection's numreq is met
    isCompleted = models.BooleanField(False)

    def __unicode__(self):
        return self.name

class Program(models.Model):
    name = models.CharField(max_length = 150)
    # change populate_from
    #slug = AutoSlugField(populate_from='name',unique=True)

    # courseCollections
    courseReqs =  models.ManyToManyField('CourseCollection',related_name = 'courseCollections', blank=True)

    # catalog year for the Program
    catalogYear = models.DateField()

    # if all coursecollections and gened requirements are satisfied, then the
    # program is completed
    # FINISH THIS
    def isCompleted(courseReqs):
        return True

    isCompleted = models.BooleanField(False)

    class Meta:
        ordering = ('name',)

    def __unicode__(self):
        return self.name

    # def get_absolute_url(self):
        # return 'my-trajectories/%s/' % self.slug
class Major(Program):
    degreeType = models.ForeignKey('GenEd')

    class Meta:
        pass

class Minor(Program):
    #major = models.ForeignKey('Major')
    class Meta:
        pass

class GenEd(Program):
    # set to B.A. or B.S. by default
    # Options
    # B.A.
    # B.S.
    # Honors Science
    # Honors Liberal Arts
    pass

class Trajectory(models.Model):
    # This should be generated automatically, e.g. Daniel's Music Theory
    # and Biology Minor v. 4 Trajectory
    name = models.CharField(max_length = 150)
    #slug = AutoSlugField(populate_from='name',unique=True)
    owner = models.ForeignKey(User)

    # Takes courses, CAN BE EMPTY- FIX
    completedCourses = models.ManyToManyField('Trajectory',)

    # the newly added courses for that trajectory, CAN BE EMPTY-- FIX
    courses = models.ManyToManyField('Course',)

    # def getPreviousTrajectory(Trajectory):
        # return Trajectory

    # the program(s) that this trajectory is completing
    whichPrograms = models.ManyToManyField('Program',)

    # whether or not the trajectory can be seen by others
    isPublic = models.BooleanField()

    # semesters since entering college
    semester = models.IntegerField()

    class Meta:
        ordering = ('name',)
        verbose_name_plural = "trajectories"

    def get_absolute_url(self):
        return 'my-trajectories/%s/' % self.slug

class Major_r(models.Model):
    name = models.CharField(max_length = 150)

    # a number of courses
    courses = models.ManyToManyField('Course', related_name='major_courses', blank=True)
    specialization = models.ManyToManyField('Specialization_r', related_name='specialization', blank=True)
    # how many of those are required
    numReq = models.IntegerField()

    # function to determine if there is a difference between this and last year
    # not everything changes-- should be able to multiple reference to one thing

    # catalog year for the coursecollection
    catalogYear = models.DateField()

    # if the course collection's numreq is met
    isCompleted = models.BooleanField(False)

    def __unicode__(self):
        return self.name
class Specialization_r(models.Model):
    name = models.CharField(max_length = 150)

    # a number of courses
    courses = models.ManyToManyField('Course', related_name='specialization_courses', blank=True)

    # how many of those are required
    numReq = models.IntegerField()

    # function to determine if there is a difference between this and last year
    # not everything changes-- should be able to multiple reference to one thing

    # catalog year for the coursecollection
    catalogYear = models.DateField()

    # if the course collection's numreq is met
    isCompleted = models.BooleanField(False)

    def __unicode__(self):
        return self.name

class Gened_r(models.Model):
    name = models.CharField(max_length = 150)

    # a number of courses
    courses = models.ManyToManyField('Course', related_name='gened_courses', blank=True)

    # how many of those are required
    numReq = models.IntegerField()

    # function to determine if there is a difference between this and last year
    # not everything changes-- should be able to multiple reference to one thing

    # catalog year for the coursecollection
    catalogYear = models.DateField()

    # if the course collection's numreq is met
    isCompleted = models.BooleanField(False)

    def __unicode__(self):
        return self.name

class Minor_r(models.Model):
    name = models.CharField(max_length = 150)

    # a number of courses
    courses = models.ManyToManyField('Course', related_name='minor_courses', blank=True)

    # how many of those are required
    numReq = models.IntegerField()

    # function to determine if there is a difference between this and last year
    # not everything changes-- should be able to multiple reference to one thing

    # catalog year for the coursecollection
    catalogYear = models.DateField()

    # if the course collection's numreq is met
    isCompleted = models.BooleanField(False)

    def __unicode__(self):
        return self.name

class Program_r(models.Model):
    name = models.CharField(max_length = 150)

    # a number of courses
    gened = models.ManyToManyField('Gened_r', related_name='gened_r_courses', blank=True)
    specialization = models.ManyToManyField('Specialization_r', related_name='specialization_r_courses', blank=True)
    major = models.ManyToManyField('Major_r', related_name='major_r_courses', blank=True)

    # how many of those are required
    numReq = models.IntegerField()

    # function to determine if there is a difference between this and last year
    # not everything changes-- should be able to multiple reference to one thing

    # catalog year for the coursecollection
    catalogYear = models.DateField()

    # if the course collection's numreq is met
    isCompleted = models.BooleanField(False)

    def __unicode__(self):
        return self.name

class Gened_rr(models.Model):
    name = models.CharField(max_length = 150)
    course_group_1 = models.ManyToManyField('Gened_collection', related_name='course_group_1', blank=True)
    course_group_2 = models.ManyToManyField('Gened_collection', related_name='course_group_2', blank=True)
    course_group_3 = models.ManyToManyField('Gened_collection', related_name='course_group_3', blank=True)
    creadits = models.CharField(max_length = 150)

    def __unicode__(self):
        return self.name

class Gened_collection(models.Model):
    name = models.CharField(max_length = 150)
    is_group = models.BooleanField()
    courses = models.ManyToManyField('Course', related_name='Gened_collection_courses', blank=True)
    group_courses = models.ManyToManyField('Collections_r', related_name='group_collection_courses', blank=True)

    def __unicode__(self):
        return self.name

class Collections_r(models.Model):
    name = models.CharField(max_length = 150)
    course = models.ManyToManyField('Course', related_name='collection_courses', blank=True)

    def __unicode__(self):
        return self.name
# should inherit from the standard Django User Model
#class Student(models.Model):
    #user = models.OneToOneField(User)
    # aka username, etc should all be here
    # does User have a slug field?

    # all of the student's trajectories
#    trajectories = models.ManyToManyField('Trajectory', blank=True)

    # a big ol' list of courses the student has already completed
#    completedCourses = models.ManyToManyField('Course', blank=True)

#    isHonors = models.BooleanField(False),

#    semester = models.IntegerField()

    #class Meta:
    #    ordering = ('user',)

    #def __unicode__(self):
    #    return self.name

    #def get_absolute_url(self):
    #    return self.name

#def create_user_profile(sender, instance, created, **kwargs):
#    if created:
#        Student.objects.create(user=instance)

#post_save.connect(create_user_profile, sender=User)

class Plans(models.Model):
    # This should be generated automatically, e.g. Daniel's Music Theory
    # and Biology Minor v. 4 Trajectory
    user_name = models.CharField(max_length = 150)
    #slug = AutoSlugField(populate_from='name',unique=True)

    # Takes courses, CAN BE EMPTY- FIX
    completedCourses = models.ManyToManyField('Course', related_name='completed_courses_set', blank=True)
    notCompletedCourses = models.ManyToManyField('Course', related_name='not_completed_courses_set', blank=True)

    major = models.CharField(max_length=25)

    # the newly added courses for that trajectory, CAN BE EMPTY-- FIX
    courses = models.ManyToManyField('Course', related_name='courses_set', blank=True)

    semester_1 = models.ManyToManyField('Course', related_name='semester_1_set', blank=True)
    semester_2 = models.ManyToManyField('Course', related_name='semester_2_set', blank=True)

    option_1 = models.ManyToManyField('Course', related_name='option_1_set', blank=True)
    option_2 = models.ManyToManyField('Course', related_name='option_2_set', blank=True)


    class Meta:
        ordering = ('user_name',)

    def __str__(self):
        return self.user_name



class Profile(models.Model):
    user_name = models.CharField(max_length = 150)

    # a number of courses
    major = models.CharField(max_length = 150, default="not set")

    def __str__(self):
        return self.user_name
