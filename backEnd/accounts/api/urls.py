from django.urls import path
from accounts.api.views import (
    LawyerUserListAPIView,
    LawyerUserDetailAPIView,
    CustomUserDetailAPIView,
    CustomUserListAPIView,
    NormalRegisterView,
    LawyerRegisterView,
    CustomUserEmailListAPIView,
    CustomUserUsernameListAPIView,
    # REQUEST ( CREATE - UPDATE - DELETE )
    LawyerUserUsernameUpdateAPIView,
    LawyerUserContactInformationUpdateAPIView,
    LawyerUserDescriptionUpdateAPIView,
    PasswordUpdateAPIView,
    EmailUpdateAPIView,
    LawyerUserProfileImageUpdateAPIView,
    LawyerUserMainSpecialtyUpdateAPIView,
    LawyerUserSpecialtyAPIView,
    LawyerUserCollegeAPIView,
    LawyerUserSchoolAPIView,
    LawyerUserLanguageAPIView,
    LawyerUserEducationAPIView,
    LawyerUserExperienceAPIView,
    LawyerUserImagesAPIView,
    # SendActivationEmailView,
    ActivateView,
    PasswordResetEmailAPIView,
    PasswordResetTokenCheckAPIView,
    SetNewPasswordAPIView,

)

app_name = 'accounts'

urlpatterns = [
    path('profile/<username>', CustomUserDetailAPIView.as_view(), name='customuser_detail'),
    path('profiles/', CustomUserListAPIView.as_view(), name='customuser_list'),

    path('register/normal/', NormalRegisterView.as_view(), name='register'),
    path('register/lawyer/', LawyerRegisterView.as_view(), name='register-lawyer'),

    path('update/username/', LawyerUserUsernameUpdateAPIView.as_view(), name='lawyer-update-username'),
    path('update/contact/', LawyerUserContactInformationUpdateAPIView.as_view(), name='lawyer-update-contact'),
    path('update/description/', LawyerUserDescriptionUpdateAPIView.as_view(), name='lawyer-update-description'),
    path('update/email/', EmailUpdateAPIView.as_view(), name='email-change'),
    path('update/image/', LawyerUserProfileImageUpdateAPIView.as_view(), name='lawyer-update-profile-image'),
    path('update/mainspecialty/', LawyerUserMainSpecialtyUpdateAPIView.as_view(), name='lawyer-update-mainspecialty'),

    path('add/specialty/', LawyerUserSpecialtyAPIView.as_view(), name='lawyer-specialty'),
    path('add/college/', LawyerUserCollegeAPIView.as_view(), name='lawyer-college'),
    path('add/school/', LawyerUserSchoolAPIView.as_view(), name='lawyer-school'),
    path('add/language/', LawyerUserLanguageAPIView.as_view(), name='lawyer-language'),
    path('add/education/', LawyerUserEducationAPIView.as_view(), name='lawyer-education'),
    path('add/experience/', LawyerUserExperienceAPIView.as_view(), name='lawyer-experience'),
    path('add/images/', LawyerUserImagesAPIView.as_view(), name='lawyer-images'),

    path('password/change/', PasswordUpdateAPIView.as_view(), name='password-change'),

    path('lawyers/', LawyerUserListAPIView.as_view(), name='lawyeruser_list'),
    path('lawyers/detail/<username>', LawyerUserDetailAPIView.as_view(), name='lawyeruser_detail'),

    path('informations/emails/', CustomUserEmailListAPIView.as_view(), name='email_list'),
    path('informations/usernames/', CustomUserUsernameListAPIView.as_view(), name='username_list'),

    # path('email/send-email-activation/', SendActivationEmailView.as_view(), name='send-activation-email'),
    path('verify/<uidb64>/<token>/', ActivateView.as_view(), name='verify'),

    path('password-reset-email/', PasswordResetEmailAPIView.as_view(), name="password-reset-email"),
    path('password-reset/<uidb64>/<token>/', PasswordResetTokenCheckAPIView.as_view(), name="password-reset-check"),
    path('password-set-update/', SetNewPasswordAPIView.as_view(), name="password-set-update"),

]
