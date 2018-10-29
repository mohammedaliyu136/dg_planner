import ast
import json

from plannerrr.forms import LoginForm
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import render, redirect

from plannerrr.forms import Student_enroll_profile_Form
from plannerrr.models import Schedules, Profile, Courses, School_option, Major_option, DefaultSchedules
from plannerrr.utils import render_to_pdf


def index(request):
    return render(request, 'students/index.html')

def edit_plan(request):
    u = User.objects.all().get(username=request.user.username)
    schedule = Schedules.objects.filter(user=u)
    #if schedule.count() == 0:
    #    major = Major_option.objects.all().get(name='Computer Science')
    #    schedule = DefaultSchedules.objects.filter(major=major)
    #    print "========================="
    #    print schedule
    arr = []
    for i in schedule:
        arr.append(i.course_id)
    course = Courses.objects.exclude(code__in=arr)

    profile = Profile.objects.all().get(user=u)
    #schedule = Schedules.objects.all().filter(user=u)

    semester = profile.semester_enrolled
    year = profile.year_enrolled
    profile_data = []
    year_int = int(year)
    year_int -= 1
    if semester == 'Spring':
        for i in range(1, 5):
            year_int += 1
            profile_data.append(['Spring' + " " + str(year_int), 'Spring' + "_" + str(year_int)])
            profile_data.append(['Fall' + " " + str(year_int), 'Fall' + "_" + str(year_int)])
    else:
        for i in range(1, 5):
            year_int += 1
            profile_data.append(['Fall' + " " + str(year_int), 'Fall' + "_" + str(year_int)])
            profile_data.append(['Spring' + " " + str(year_int), 'Spring' + "_" + str(year_int)])

    not_selected = []
    for i in course:
        not_selected.append(str(i.code))
        print str(i.code)

    all_course = Courses.objects.all()
    name = request.user.first_name
    check = Profile.objects.all().get(user=request.user)
    context = {
        'schedules': schedule,
        'profile_data': profile_data,
        'name': name,
        'courses': course,
        'all_course': all_course,
        'not_selected': not_selected,
        'check': check
    }
    return render(request, 'students/edit_plan.html', context)

def generate_pdf(request):
    u = User.objects.all().get(username=request.user.username)
    schedule = Schedules.objects.filter(user=u)
    arr = []
    for i in schedule:
        arr.append(i.course_id)
    course = Courses.objects.exclude(code__in=arr)
    profile = Profile.objects.all().get(user=u)
    schedule = Schedules.objects.all().filter(user=u)

    semester = profile.semester_enrolled
    year = profile.year_enrolled
    profile_data = []
    year_int = int(year)
    year_int -= 1
    if semester == 'Spring':
        for i in range(1, 5):
            year_int += 1
            profile_data.append(['Spring' + " " + str(year_int), 'Spring' + "_" + str(year_int)])
            profile_data.append(['Fall' + " " + str(year_int), 'Fall' + "_" + str(year_int)])
    else:
        for i in range(1, 5):
            year_int += 1
            profile_data.append(['Fall' + " " + str(year_int), 'Fall' + "_" + str(year_int)])
            profile_data.append(['Spring' + " " + str(year_int), 'Spring' + "_" + str(year_int)])

    not_selected = []
    for i in course:
        not_selected.append(str(i.code))

    all_course = Courses.objects.all()
    name = request.user.first_name
    sched_arr = []
    for course in schedule:
        code = course.course_id
        for ctitle in all_course:
            if ctitle.code == code:
                sched_arr.append(Sched(code, ctitle.course_title, course.semester, '3'))
    context = {
        'schedules': sched_arr,
        'profile_data': profile_data,
        'person': u,
        'courses': course,
        'all_course': all_course,
        'not_selected': not_selected
    }
    pdf = render_to_pdf('students/generate/pdf.html', context)
    if pdf:
        response = HttpResponse(pdf, content_type='application/pdf')
        filename = "plan_for_%s.pdf" % (name)
        print name
        content = "inline; filename='%s'" % (filename)
        download = request.GET.get("download")
        if download:
            content = "attachment; filename='%s'" % (filename)
        response['Content-Disposition'] = content
        return response
    return HttpResponse("Not found")

def enroll_profile(request):
    if not request.user.is_authenticated:
        form = LoginForm()
        return render(request, 'accounts/login.html', {'form': form})
    else:
        school_results = School_option.objects.all()
        major_results = Major_option.objects.all()
        # if this is a POST request we need to process the form data
        form = Student_enroll_profile_Form(request.POST or None)
        if form.is_valid():
            profile = form.save(commit=False)
            # commit=False tells Django that "Don't send this to database yet.
            # I have more things I want to do with it."

            profile.user = request.user  # Set the user object here
            profile.save()  # Now you can send it to DB
            return redirect("/student/plan/edit/")
        context = {'form': form,
                   'school_results': school_results,
                   'major_results': major_results,
                   'check': False}
        return render(request, 'students/enroll_profile.html', context)

class Sched:
    def __init__(self, code, title, semester, units):
        self.code = code
        self.title = title
        self.semester = semester
        self.units = units


def save_plan(request):
    if request.method == 'POST' and request.is_ajax():
        schedule_data = request.POST['schedule_data']
        print '##############data###############'
        schedule_data = ast.literal_eval(schedule_data)
        print schedule_data

        x = schedule_data
        print x[1][0]
        Schedules.objects.filter(user=request.user).delete()
        for i in range(0, len(x)):
            semester_n_s = str(x[i][0])
            for j in range(1, len(x[i])):
                course = x[i][j]
                b = Schedules(user=request.user, course_id=course, semester=semester_n_s)
                b.save()
        print "saved"

        return HttpResponse(json.dumps({'message': schedule_data}))
