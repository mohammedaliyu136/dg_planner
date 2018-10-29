from django import forms
from django.contrib.auth.models import User

from plannerrr.models import Profile


class LoginForm(forms.Form):
    id_number = forms.CharField(max_length=100, widget=forms.TextInput(attrs={'placeholder': 'ID Number or Username'}))
    password = forms.CharField(max_length=25,widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))

class RegisterForm(forms.Form):
    firstname = forms.CharField(max_length=25)
    lastname = forms.CharField(max_length=25)
    email = forms.CharField(max_length=25)
    school = forms.CharField(max_length=25)
    password = forms.CharField(max_length=25,widget=forms.PasswordInput)

class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']

class Student_enroll_profile_Form(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ["semester_enrolled", "year_enrolled", "major", "school"]

class MyForm(forms.Form):
    checkbox = forms.BooleanField(required=False)
