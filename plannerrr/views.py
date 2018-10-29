import ast

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.http import HttpResponse

import datetime
from django.http import HttpResponse
from django.template.loader import get_template
from django.views.generic import View

# Create your views here.
import json
from plannerrr.forms import LoginForm, UserForm, Student_enroll_profile_Form, MyForm
from plannerrr.models import School_option, Major_option, Courses, Profile, Free_elective, Degree_req, Pre_req, Schedules
from django.http import JsonResponse
from django.contrib.auth.models import User

from plannerrr.utils import render_to_pdf


def index(request):
    form = LoginForm()
    return render(request, 'accounts/ashraf.html', {'form':form})


def login_user(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = LoginForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # redirect to a new URL:
            id_number = form.cleaned_data['id_number']
            password = form.cleaned_data['password']
            user = authenticate(username=id_number, password=password)
            if user is not None:
                login(request, user)
                check = Profile.objects.all().get(user=request.user)
                if check.is_advisor:
                    return redirect("/search")
                else:
                    return redirect("/plan/edit/")
            else:
                return render(request, 'login.html', {'form': form})
    # if a GET (or any other method) we'll create a blank form
    else:
        form = LoginForm()

    return render(request, 'login.html', {'form': form})


def register(request):
    form = UserForm(request.POST or None)
    if form.is_valid():
        user = form.save(commit=False)
        id_number = form.cleaned_data['username']
        password = form.cleaned_data['password']
        user.set_password(password)
        user.save()
        user = authenticate(username=id_number, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect("/enroll_profile")

    context = {
        "form": form,
    }

    return render(request, 'register.html', {'form': form})


def degree_req(request):
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

    if request.method == 'POST':
        form = request.POST.get('your_name')
        # free_elec = request.POST.getlist('degree_req')
        profile = Profile.objects.all().get(user=request.user)
        major = Degree_req.objects.all()

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
        course_list = []
        for i in major:
            course_list.append(str(i.course_id))

        context = {'course_list': course_list,
                   'profile_data': profile_data}
        # return redirect('/plan/edit/')
        return render(request, 'planner2.html', context)
    # if a GET (or any other method) we'll create a blank form
    else:
        degree_req = Degree_req.objects.all().filter(major_name='Computer Science')
        all_course = Courses.objects.all()
        name = request.user.first_name
        degree_req_arr = []
        for course in degree_req:
            code = course.course_id
            for ctitle in all_course:
                if ctitle.code == code:
                    degree_req_arr.append(Sched(code, ctitle.course_title, 'none', '3'))
        check = Profile.objects.all().get(user=request.user)
        context = {'degree_req': degree_req_arr,
                   'check': check}
    return render(request, 'select_courses_temp.html', context)


# dashboard
def dashboard(request):
    course = Courses.objects.all
    free_electivies = Free_elective.objects.all
    schedules = Schedules.objects.all
    context = {'courses': course,
               'free_electivies': free_electivies,
               'schedules': schedules,
               'profile_data': 'profile'}
    return render(request, 'dashboard/index.html', context)


def get_course(request):
    data = {
        'name': 'Vitor',
        'location': 'Finland',
        'is_active': True,
        'count': 28
    }
    return JsonResponse(data)


def enroll_profile(request):
    if not request.user.is_authenticated:
        form = LoginForm()
        return render(request, 'login.html', {'form': form})
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
            return redirect("/degree_req")
        context = {'form': form,
                   'school_results': school_results,
                   'major_results': major_results,
                   'check': False}
        return render(request, 'enroll_profile.html', context)


def my_view(request):
    form = MyForm(request.POST or None)
    if form.is_valid():
        check_values = request.POST.getlist('checks')
        data = str(check_values[0]) + ' - ' + str(check_values[1])
        return HttpResponse(data)
    context = {
        "form": form,
    }

    return render(request, 'test_check.html', {'form': form})


def logout_user(request):
    logout(request)
    return login_user(request)


def profile(request):
    return HttpResponse('your profile ')


def process_form(_form):
    firstname = _form.cleaned_data['firstname']
    lastname = _form.cleaned_data['lastname']
    major = _form.cleaned_data['choose_major']
    school = _form.cleaned_data['choose_school']
    semester = _form.cleaned_data['semester_enrolled']
    credit = _form.cleaned_data['credit_hours_earned']
    cgpa = _form.cleaned_data['current_cgpa']
    credit_intend = _form.cleaned_data['credit_hour_you_intend_to_take']
    year = _form.cleaned_data['year_enrolled']

    _data = {'firstname': firstname,
             'lastname': lastname,
             'major': major,
             'school': school,
             'semester': semester,
             'credit': credit,
             'cgpa': cgpa,
             'credit_intend': credit_intend,
             'year': year}

    return _data


def indexx(request):
    return render(request, 'index2.html')


def show_schedule(request):
    schedule = Schedules.objects.all().filter(user=request.user)
    print "############"
    print request.user
    print "###########"
    profile = Profile.objects.all().get(user=request.user)

    semester = profile.semester_enrolled
    year = profile.year_enrolled
    profile_data = []
    year_int = int(year)
    year_int -= 1
    if semester == 'Spring':
        for i in range(1, 5):
            year_int += 1
            profile_data.append('Spring_' + str(year_int))
            profile_data.append('Fall_' + str(year_int))
        else:
            for i in range(1, 5):
                year_int += 1
                profile_data.append('Fall_' + str(year_int))
                profile_data.append('Spring_' + str(year_int))

    name = request.user.first_name
    check = Profile.objects.all().get(user=request.user)
    context = {
        'schedules': schedule,
        'profile_data': profile_data,
        'name': name,
        'check': check
    }
    print '########################'
    print schedule
    return render(request, 'show_schedule.html', context)


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
            'check': check
        }
        print '########################'
        print schedule
        return render(request, 'show_schedule.html', context)

    u = User.objects.all()

    return render(request, 'search.html', {'u': u})


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
        'name': name,
        'check': check
    }
    print '########################'
    print schedule
    return render(request, 'show_schedule.html', context)


def team(request):
    check = Profile.objects.all().get(user=request.user)
    if check.is_advisor:
        advisor = True
    else:
        advisor = False
    return render(request, 'team.html', {'check': check})


def edit_plan(request):
    # A00016688
    u = User.objects.all().get(username=request.user.username)
    schedule = Schedules.objects.filter(user=u)
    arr = []
    for i in schedule:
        arr.append(i.course_id)
    course = Courses.objects.exclude(code__in=arr)
    # course = Courses.objects.all()
    # ++++++++++++++++++++++++++++++++++++++
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

    # print profile_data

    # print Courses.objects.all().get(code='CIE105')
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
    return render(request, 'edit_plan.html', context)


def generate_pdf(request):
    # A00016688
    u = User.objects.all().get(username=request.user.username)
    schedule = Schedules.objects.filter(user=u)
    arr = []
    for i in schedule:
        arr.append(i.course_id)
    course = Courses.objects.exclude(code__in=arr)
    # course = Courses.objects.all()
    # ++++++++++++++++++++++++++++++++++++++
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

    # print profile_data

    # print Courses.objects.all().get(code='CIE105')
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
    # end
    # template = get_template('generate/pdf.html')
    # html = template.render(context)
    pdf = render_to_pdf('generate/pdf.html', context)
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


class Sched:
    def __init__(self, code, title, semester, units):
        self.code = code
        self.title = title
        self.semester = semester
        self.units = units
