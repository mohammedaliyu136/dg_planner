from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.shortcuts import render, redirect

from plannerrr.forms import LoginForm, UserForm
from plannerrr.models import Profile


def index(request):
    return render(request, 'accounts/index.html')


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
                    return redirect("/advisor/students")
                else:
                    return redirect("/student/plan/edit/")
            else:
                return render(request, 'accounts/login.html', {'form': form})
    # if a GET (or any other method) we'll create a blank form
    else:
        form = LoginForm()

    return render(request, 'accounts/ashraf.html', {'form': form})


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
                return redirect("/student/enroll_profile")

    context = {
        "form": form,
    }

    return render(request, 'accounts/register.html', {'form': form})


def logout_user(request):
    logout(request)
    return login_user(request)


def profile(request):
    return HttpResponse('your profile ')
