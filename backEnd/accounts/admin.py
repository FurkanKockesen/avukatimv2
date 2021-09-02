from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from .forms import CustomUserCreationForm
from .models import NormalUser, LawyerUser, LawyerUserImages
from world.models import Education, Experience


# Register your models here.
@admin.register(get_user_model())
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    fieldsets = (
        (_('Login Information'), {'fields': ('username', 'email', 'password')}),
        (_('Personal Information'), {'fields': ('first_name', 'last_name')}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        (_('Status'), {'fields': ('is_normal', 'is_lawyer')}),
        (_('Dates'), {'fields': ('last_login', 'date_joined')}),
    )

    # ADD USER FIELD
    add_fieldsets = (
        (_('Login Information'), {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2'),
        }),
    )

    list_display = ('email', 'username', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'username', 'first_name', 'last_name')
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions',)


@admin.register(NormalUser)
class NormalUserAdmin(admin.ModelAdmin):
    fieldsets = (
        (_('Personal Information'), {'fields': ('user', 'email', 'username', 'first_name', 'last_name')}),
        (_('Main Information'), {'fields': ('gender', 'date_of_birth', 'phone_number')}),
    )

    list_display = ('user', 'phone_number')
    search_fields = ('user', 'gender')
    list_filter = ('gender',)
    ordering = ('user',)
    readonly_fields = ('email', 'first_name', 'last_name')

    class Meta:
        model = NormalUser


class LawyerUserImageInline(admin.TabularInline):
    model = LawyerUserImages
    extra = 3


class LawyerUserEducationInline(admin.TabularInline):
    model = Education
    extra = 3


class LawyerUserExperienceInline(admin.TabularInline):
    model = Experience
    extra = 3


@admin.register(LawyerUser)
class LawyerUserAdmin(admin.ModelAdmin):
    fieldsets = (
        (_('Personal Information'),
         {'fields': ('user', 'email', 'username', 'first_name', 'last_name', 'image', 'profile_img')}),
        (_('Address Information'), {'fields': ('address', 'city', 'country')}),
        (_('Contact Information'), {'fields': ('phone_number', 'fax_number', 'url')}),
        (_('Education Information'), {'fields': ('college', 'school', 'language')}),
        (_('Specialty Information'), {'fields': ('main_specialty', 'specialty')}),
        (_('Rank Information'),
         {'fields': ('followers_rank', 'article_rank', 'favorites_rank', 'likes_rank', 'answers_rank')}),
        (_('Description'), {'fields': ('description',)}),
        (_('Followers'), {'fields': ('followers',)}),

    )

    list_display = ('user', 'phone_number', 'main_specialty')
    search_fields = ('user', 'city', 'college', 'school', 'language', 'main_specialty')
    list_filter = ('specialty',)
    ordering = ('user',)
    readonly_fields = ('email', 'username', 'first_name', 'last_name')
    inlines = [LawyerUserImageInline, LawyerUserEducationInline, LawyerUserExperienceInline]

    class Meta:
        model = LawyerUser
