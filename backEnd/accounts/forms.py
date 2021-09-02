from django import forms
from django.contrib.auth import get_user_model, password_validation, authenticate
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.utils.text import capfirst
from django.db import transaction
from .models import LawyerUser, NormalUser
from world.models import City, Country, College, School, Language
from blog.models import Category

UserModel = get_user_model()


class CustomUserCreationForm(forms.ModelForm):
    email = forms.EmailField(widget=forms.EmailInput(
        attrs={'autofocus': True, 'placeholder': 'Email'}, ))

    error_messages = {
        'password_mismatch': _('The two password fields didn’t match.'),
    }

    password1 = forms.CharField(
        label=_("Password"),
        strip=False,
        widget=forms.PasswordInput(attrs={'autocomplete': 'new-password', 'placeholder': 'Password'}),
        help_text=password_validation.password_validators_help_text_html(),
    )
    password2 = forms.CharField(
        label=_("Password confirmation"),
        widget=forms.PasswordInput(attrs={'autocomplete': 'new-password', 'placeholder': 'Password Again'}),
        strip=False,
        help_text=_("Enter the same password as before, for verification."),
    )

    class Meta:
        model = get_user_model()
        fields = ('email', 'username', 'first_name', 'last_name')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # fields widget
        self.fields['username'].widget.attrs.update({'placeholder': 'Username'})

        if self._meta.model.USERNAME_FIELD in self.fields:
            self.fields[self._meta.model.USERNAME_FIELD].widget.attrs['autofocus'] = True

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError(
                self.error_messages['password_mismatch'],
                code='password_mismatch',
            )
        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class CustomAuthenticationForm(forms.ModelForm):
    email = forms.EmailField(widget=forms.EmailInput(
        attrs={'autofocus': True, 'placeholder': 'Email'}, ))
    password = forms.CharField(
        label=_("Password"),
        strip=False,
        widget=forms.PasswordInput(attrs={'autocomplete': 'current-password', 'placeholder': 'Password'}),
    )

    error_messages = {
        'invalid_login': _(
            "Please enter a correct %(email)s and password. Note that both "
            "fields may be case-sensitive."
        ),
        'inactive': _("This account is inactive."),
    }

    def __init__(self, request=None, *args, **kwargs):
        self.request = request
        self.user_cache = None
        super().__init__(*args, **kwargs)

        # Set the max length and label for the "email" field.
        self.username_field = UserModel._meta.get_field(UserModel.USERNAME_FIELD)
        username_max_length = self.username_field.max_length or 254
        self.fields['email'].max_length = username_max_length
        self.fields['email'].widget.attrs['maxlength'] = username_max_length
        if self.fields['email'].label is None:
            self.fields['email'].label = capfirst(self.username_field.verbose_name)

    def clean(self):
        email = self.cleaned_data.get('email')
        password = self.cleaned_data.get('password')

        if email is not None and password:
            self.user_cache = authenticate(self.request, email=email, password=password)
            if self.user_cache is None:
                raise self.get_invalid_login_error()
            else:
                self.confirm_login_allowed(self.user_cache)

        return self.cleaned_data

    def confirm_login_allowed(self, user):
        if not user.is_active:
            raise ValidationError(
                self.error_messages['inactive'],
                code='inactive',
            )

    def get_user(self):
        return self.user_cache

    def get_invalid_login_error(self):
        return ValidationError(
            self.error_messages['invalid_login'],
            code='invalid_login',
            params={'email': self.username_field.verbose_name},
        )

    class Meta:
        model = get_user_model()
        fields = ('email',)


# NORMAL
class NormalSignupForm(CustomUserCreationForm):
    gender = forms.CharField(label=_("Gender"), required=False)
    date_of_birth = forms.CharField(label=_("Date of Birth"), required=False)
    phone_number = forms.CharField(label=_("Phone"), required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['gender'].widget.attrs.update({'placeholder': 'Your gender'})
        self.fields['date_of_birth'].widget.attrs.update({'placeholder': 'Birthday'})
        self.fields['phone_number'].widget.attrs.update({'placeholder': '0539-123-12-12'})

    class Meta(CustomUserCreationForm.Meta):
        model = get_user_model()

    @transaction.atomic
    def save(self):
        user = super(NormalSignupForm, self).save(commit=False)
        user.is_normal = True
        user.save()
        normal = NormalUser.objects.create(user=user)
        normal.gender = self.cleaned_data.get('gender')
        normal.date_of_birth = self.cleaned_data.get('date_of_birth')
        normal.phone_number = self.cleaned_data.get('phone_number')
        normal.save()
        return user


# LAWYER
class LawyerSignupForm(CustomUserCreationForm):
    # address = forms.CharField(label=_("Address"))
    # city = forms.ModelChoiceField(queryset=City.objects.all(), empty_label="Choose City")
    # country = forms.ModelChoiceField(queryset=Country.objects.all(), empty_label="Choose Country")
    phone_number = forms.CharField(label=_("Phone"))
    image = forms.ImageField(label=_("Image"), widget=forms.FileInput)
    # college = forms.ModelMultipleChoiceField(queryset=College.objects.all())
    # school = forms.ModelMultipleChoiceField(queryset=School.objects.all())
    # language = forms.ModelMultipleChoiceField(queryset=Language.objects.all())
    # main_specialty = forms.ModelChoiceField(queryset=Category.objects.all(), empty_label="Choose Main Specialty")
    # specialty = forms.ModelMultipleChoiceField(queryset=Category.objects.all())

    def __init__(self, *args, **kwargs):
        super(LawyerSignupForm, self).__init__(*args, **kwargs)
        # self.fields['address'].widget.attrs.update({'placeholder': 'Address Information'})
        # self.fields['city'].widget.attrs.update({'placeholder': 'İstanbul'})
        # self.fields['country'].widget.attrs.update({'placeholder': 'Turkey'})
        self.fields['phone_number'].widget.attrs.update({'placeholder': '0539-123-12-12'})

    class Meta(CustomUserCreationForm.Meta):
        model = get_user_model()

    @transaction.atomic
    def save(self):
        user = super(LawyerSignupForm, self).save(commit=False)
        user.is_lawyer = True
        user.save()
        lawyer = LawyerUser.objects.create(user=user)
        # lawyer.address = self.cleaned_data.get('address')
        # lawyer.city = self.cleaned_data.get('city')
        # lawyer.country = self.cleaned_data.get('country')
        lawyer.phone_number = self.cleaned_data.get('phone_number')
        lawyer.image = self.cleaned_data.get('image')

        # colleges = self.cleaned_data.get('college')
        # if colleges:
        #     for college in colleges:
        #         lawyer.college.add(college)

        # schools = self.cleaned_data.get('school')
        # if schools:
        #     for school in schools:
        #         lawyer.school.add(school)

        # languages = self.cleaned_data.get('language')
        # if languages:
        #     for language in languages:
        #         lawyer.language.add(language)

        # lawyer.main_specialty = self.cleaned_data.get('main_specialty')

        # specialties = self.cleaned_data.get('specialty')
        # if specialties:
        #     for specialty in specialties:
        #         lawyer.specialty.add(specialty)

        lawyer.save()
        return user
