# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from .utils import *
from .models import *
from .utils import *

from django.contrib.auth.forms import UserCreationForm


@login_required
def select_major(request):
    major = Major_r.objects.all()
    context = {
        "major": major
    }
    return render(request, "plannner/select_major.html", context)


@login_required
def select_completed_courses(request, pk):
    if request.method == 'POST':
        major = Major_r.objects.get(id=pk)
        courses = major.courses.all()
        gened = Gened_rr.objects.all()
        course_r = merge_all(gened, courses)
        selected_courses = []
        for course in course_r:
            selected = request.POST.get((course.departmentAbbr + course.courseNumber))
            if selected:
                selected_courses.append(course)
        if len(selected_courses) == 0:
            messages.error(request, "please select the courses you took during your first semester")
            return redirect("")
        # Todo: filter btw gened and major to remove duplicates :::done
        # Todo: get all courses not in requirement but is prereq  :::done
        # g = getGenEdCourses_2(gened)
        # Todo: check if any course is selected
        # if not is_selected_courses:
        #    messages.error(request, "please select the courses you took during your first semester")
        #    return redirect("/select/completed/2/")
        courses_left = remainingReqCourses_r(course_r, selected_courses)
        courses_completed = []
        for course in selected_courses:
            courses_completed.append(course)

        first_sem_opt = []
        first_sem_courses = get_first_sem_courses(course_r, courses_completed, first_sem_opt)

        for course in first_sem_courses:
            courses_completed.append(course)

        courses_left_temp = []
        for course in courses_left:
            for c in first_sem_courses:
                if course.name != c.name:
                    courses_left_temp.append(course)

        courses_left = set(courses_left) - set(first_sem_courses)

        Plans(user_name=request.user.username, major=major.pk).save()
        pln = Plans.objects.filter(user_name=request.user.username)[0]
        pln.completedCourses.set(courses_completed)
        pln.notCompletedCourses.set(courses_left)
        pln.courses.set(course_r)
        pln.semester_1.set(first_sem_courses)
        pln.option_1.set(first_sem_opt)
        pln.save()

        return redirect("/plan/")
        # return redirect("/completed/2/")
    save_major(pk, request)
    major = Major_r.objects.get(id=pk)
    courses = major.courses.all()
    gened = Gened_rr.objects.all()
    course_r = merge_all(gened, courses)
    context = {"courses": course_r}
    return render(request, "plannner/select_completed_courses.html", context)


@login_required
def plan(request):
    pln = Plans.objects.filter(user_name=request.user.username)[0]
    completed = pln.completedCourses.all()
    completed_temp = []
    for com in completed:
        completed_temp.append(com)
    # sem_1 = []
    # for p in pln.semester_1.all():
    #    completed_temp.append(p)
    #    sem_1.append(p)
    # sem_2 = []
    # for p in pln.semester_2.all():
    #    completed_temp.append(p)
    #    sem_2.append(p)
    notCompleted = pln.notCompletedCourses.all()
    courses = pln.courses.all()
    # opt = []
    # schedule = []
    # if(len(sem_1)>0):
    #    schedule.append(sem_1)
    # if(len(sem_2)>0):
    #    schedule.append(sem_2)

    schedule = []
    opt = []
    schedule.append(pln.semester_1.all())
    opt.append(pln.option_1.all())
    schedule = plannner_final(schedule, notCompleted, completed_temp, opt)
    len_schedule = len(schedule)

    context = {
        "schedule": schedule,
        "courses_left": notCompleted,
        "courses_completed": completed,
        "opt": opt,
        "len_schedule": len_schedule,
        "all_courses": courses
    }
    return render(request, "plannner/dashboard/index.html", context)


@login_required
def mark_completed(request):
    data = []
    if request.method == "POST":
        pln = Plans.objects.filter(user_name=request.user.username)[0]
        ids = request.POST.get("ids").split(",")
        ids.pop()
        pass_courses = []
        failed_courses = []
        for i in ids:
            user_course = request.POST.get(i)
            if user_course:
                c = i.split("_")
                course = Course.objects.get(departmentAbbr=c[0], courseNumber=c[1])
                pass_courses.append(course)
            else:
                c = i.split("_")
                course = Course.objects.get(departmentAbbr=c[0], courseNumber=c[1])
                failed_courses.append(course)
        pln.completedCourses.remove(*failed_courses)

        pln.save()
        first_sem_opt = []
        #first_sem_courses = get_first_sem_courses(course_r, courses_completed, first_sem_opt)
        first_sem_courses = get_first_sem_courses(pln.courses.all(), pln.completedCourses.all(), first_sem_opt)
        pln.semester_1.clear()
        pln.option_1.clear()
        pln.completedCourses.add(*first_sem_courses)
        pln.notCompletedCourses.remove(*first_sem_courses)
        pln.semester_1.set(first_sem_courses)
        pln.option_1.set(first_sem_opt)
        pln.save()
        return redirect("/plan/")


@login_required
def edit_planner(request):
    if request.method == "POST":
        pln = Plans.objects.filter(user_name=request.user.username)[0]
        ids = request.POST.get("plan_editor_data").split(",")
        plan_editor(pln, ids)

        return redirect("/plan/")
    return redirect("/plan/")


def signup(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = request.POST.get("username")
            password = request.POST.get("password1")
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect("/major/")
    else:
        form = UserCreationForm()
    return render(request, "registration/signup.html", {"form": form})
