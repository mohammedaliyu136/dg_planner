import ast
import json

from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import render

from plannerrr.advisor.Custom_Class import Sched
from plannerrr.models import Courses, Profile, Schedules, School_option, Major_option, DefaultSchedules


def edit_default_plan(request):
    return render(request, 'advisor/index.html')


def search(request):
    if request.method == 'POST':
        student_id = request.POST.get('student_id')
        print '########################'
        print student_id
        print '########################'
        u = User.objects.all().get(username=student_id)
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

        all_course = Courses.objects.all()
        sched_arr = []
        for course in schedule:
            code = course.course_id
            for ctitle in all_course:
                if ctitle.code == code:
                    sched_arr.append(Sched(code, ctitle.course_title, course.semester, '3'))

        check = Profile.objects.all().get(user=request.user)
        name = request.user.first_name
        context = {
            'schedules': sched_arr,
            'profile_data': profile_data,
            'name': name,
            'check': check,
            'u': u,
        }
        print '########################'
        print schedule
        return render(request, 'advisor/show_schedule.html', context)

    u = User.objects.all()
    check = Profile.objects.all().get(user=request.user)
    all_students = []
    for i in u:
        check = Profile.objects.all().get(user=i)
        if not check.is_advisor:
            all_students.append(i)

    return render(request, 'advisor/search.html', {'u': all_students})


def search_click(request, pk):
    u = User.objects.all().get(pk=pk)
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

    all_course = Courses.objects.all()
    sched_arr = []
    for course in schedule:
        code = course.course_id
        for ctitle in all_course:
            if ctitle.code == code:
                sched_arr.append(Sched(code, ctitle.course_title, course.semester, '3'))

    name = request.user.first_name
    check = Profile.objects.all().get(user=request.user)
    context = {
        'schedules': sched_arr,
        'profile_data': profile_data,
        'u': u,
        'check': check
    }
    print '########################'
    print schedule
    return render(request, 'advisor/show_schedule.html', context)

def default_plan(request):
    major = Major_option.objects.all().get(name='Computer Science')
    default_schedule = DefaultSchedules.objects.filter(major=major)
    print default_schedule
    arr = []
    courses = Courses.objects.all()

    profile_data = []

    for i in range(1,9):
        profile_data.append(['semester' + " " + str(i), 'semester' + "_" + str(i)])

    not_selected = []
    for i in courses:
        not_selected.append(str(i.code))
        print str(i.code)

    name = request.user.first_name
    majors = Major_option.objects.all()
    context = {
        'schedules': default_schedule,
        'profile_data': profile_data,
        'courses': courses,
        'not_selected': not_selected,
        'major':major
    }
    return render(request, 'advisor/default_plan.html', context)

def select_major(request):
    majors = Major_option.objects.all()
    context = {
        "majors": majors
    }
    return render(request, 'advisor/select_major.html', context )

def save_plan(request):
    if request.method == 'POST' and request.is_ajax():
        schedule_data = request.POST['schedule_data']
        schedule_data = ast.literal_eval(schedule_data)
        print schedule_data

        x = schedule_data
        print x[1][0]
        major = Major_option.objects.all().get(name='Computer Science')
        DefaultSchedules.objects.filter(major=major).delete()
        for i in range(0, len(x)):
            semester_n_s = str(x[i][0])
            for j in range(1, len(x[i])):
                course = x[i][j]
                b = DefaultSchedules(major=major, course_id=course, semester=semester_n_s)
                b.save()
        print "saved"

        return HttpResponse(json.dumps({'message': schedule_data}))

