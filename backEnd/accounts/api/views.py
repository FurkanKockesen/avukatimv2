from accounts.models import CustomUser, NormalUser, LawyerUser, LawyerUserImages
from world.models import City, College, School, Language, Education, Experience
from blog.models import Category
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    DestroyAPIView,
    CreateAPIView,
    RetrieveUpdateAPIView,
    GenericAPIView
)
from rest_framework.views import APIView
from accounts.api.serializers import (
    LawyerUserListSerializer,
    LawyerUserDetailSerializer,
    CustomUserSerializer,
    CustomUserSerializerWithToken,
    CustomUserEmailSerializer,
    CustomUserUsernameSerializer,
    LawyerUserInformationSerializer,
    LawyerUserContactInformationSerializer,

)

from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from accounts.api.permissions import IsSuperUser, IsLawyer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework import status

from django.utils.crypto import get_random_string
from django.utils.text import slugify
from rest_framework.parsers import FileUploadParser

# EMAIL
from django.core.mail import EmailMessage
from django.conf import settings
from django.template.loader import render_to_string

from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super(MyTokenObtainPairSerializer, self).validate(attrs)

        serializer = CustomUserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CustomUserListAPIView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsSuperUser]


class CustomUserDetailAPIView(RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'username'


# REGISTER
class NormalRegisterView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        data = request.data

        email = data.get('email')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        password = data.get('password')
        password2 = data.get('password2')
        # gender = data.get('gender')
        # date_of_birth = data.get('date_of_birth')
        # phone_number = data.get('phone_number')

        ex = False
        new_username = slugify('nu-{}{}'.format(first_name.replace("ı", "i"), last_name.replace("ı", "i")))
        ex = NormalUser.objects.filter(username=new_username).exists()
        while ex:
            new_username = slugify(new_username + " " + get_random_string(9, '0123456789'))
            ex = NormalUser.objects.filter(username=new_username).exists()

        username = new_username

        messages = {'errors': []}

        if email == None:
            messages['errors'].append('email cant be empty')
        if password == None:
            messages['errors'].append('password cant be empty')
        if password and password2 and password != password2:
            messages['errors'].append('passwords cant be match')
        if CustomUser.objects.filter(email=email).exists():
            messages['errors'].append('account already exists with this email')
        if CustomUser.objects.filter(username=username).exists():
            messages['errors'].append('account already exists with this username')
        if len(messages['errors']) > 0:
            return Response({'detail': messages['errors']}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = CustomUser.objects.create(
                username=username,
                email=email,
                password=make_password(password),
                first_name=first_name,
                last_name=last_name,
                is_normal=True

            )
            serializer = CustomUserSerializerWithToken(user, many=False)
            normal = NormalUser.objects.create(
                user=user,
                username=username,
                email=email,
                first_name=first_name,
                last_name=last_name,
                # gender=gender,
                # phone_number=phone_number,
                # date_of_birth=date_of_birth,
            )
        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)


# class SendActivationEmailView(APIView):
#
#     def post(self, request):
#         user = request.user
#
#         try:
#             message = render_to_string('verify-email.html', {
#                 'user': user,
#                 'uid': urlsafe_base64_encode(force_bytes(user.pk)),
#                 'token': default_token_generator.make_token(user),
#             })
#
#             to_email = user.email
#             email = EmailMessage(
#                 'Verify your account',
#                 message,
#                 to=[to_email]
#             )
#             email.send()
#             return Response('Mail sent Successfully', status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({'detail': f'{e}'}, status=status.HTTP_403_FORBIDDEN)


class ActivateView(APIView):

    def get(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = CustomUser.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            user = None
        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response("Email Verified")
        else:
            return Response('Something went wrong , please try again', status=status.HTTP_406_NOT_ACCEPTABLE)


class LawyerRegisterView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        data = request.data
        email = data.get('email')
        # username = data.get('username')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        password = data.get('password')
        password2 = data.get('password2')
        # city = data.get('city')
        phone_number = data.get('phone_number')
        # main_specialty = data.get('main_specialty')
        image = data.get('image')

        ex = False
        new_username = slugify('{}{}'.format(first_name.replace("ı", "i"), last_name.replace("ı", "i")))
        ex = LawyerUser.objects.filter(username=new_username).exists()
        while ex:
            new_username = slugify(new_username + " " + get_random_string(9, '0123456789'))
            ex = LawyerUser.objects.filter(username=new_username).exists()

        username = new_username

        messages = {'errors': []}
        # if username == None:
        #     messages['errors'].append('username cant be empty')
        if email == None:
            messages['errors'].append('email cant be empty')
        if password == None:
            messages['errors'].append('password cant be empty')
        if password and password2 and password != password2:
            messages['errors'].append('passwords cant be match')
        if first_name == None:
            messages['errors'].append('first name cant be empty')
        if last_name == None:
            messages['errors'].append('last name cant be empty')
        # if city == None:
        #     messages['errors'].append('city cant be empty')
        if phone_number == None:
            messages['errors'].append('phone number cant be empty')
        # if main_specialty == None:
        #     messages['errors'].append('main specialty cant be empty')
        if image == None:
            messages['errors'].append('image cant be empty')
        if CustomUser.objects.filter(email=email).exists():
            messages['errors'].append('account already exists with this email')
        if CustomUser.objects.filter(username=username).exists():
            messages['errors'].append('account already exists with this username')
        if len(messages['errors']) > 0:
            return Response({'detail': messages['errors']}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = CustomUser.objects.create(
                username=username,
                email=email,
                password=make_password(password),
                first_name=first_name,
                last_name=last_name,
                is_lawyer=True,
                is_active=False
            )
            serializer = CustomUserSerializerWithToken(user, many=False)
            lawyer = LawyerUser.objects.create(
                user=user,
                email=email,
                username=username,
                first_name=first_name,
                last_name=last_name,
                image=image,
                # city=City.objects.get(_id=city),
                phone_number=phone_number,
                # main_specialty=Category.objects.get(_id=main_specialty)
            )

            message = render_to_string('verify-email.html', {
                'user': user,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': default_token_generator.make_token(user),
            })

            to_email = user.email
            email = EmailMessage(
                'Verify your account',
                message,
                to=[to_email]
            )
            email.send()

        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)


# FORGOT PASSWORD - (EMAIL VERSION)
class PasswordResetEmailAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        email = data.get('email')
        messages = {'errors': []}

        if email == None:
            messages['errors'].append('email cant be empty')
        if len(messages['errors']) > 0:
            return Response({'detail': messages['errors']}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)

            if CustomUser.objects.filter(email=email).exists():
                message = render_to_string('password-reset-email.html', {
                    'user': user,
                    'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                    'token': PasswordResetTokenGenerator().make_token(user),
                })

                to_email = user.email
                email = EmailMessage(
                    'Password Reset',
                    message,
                    to=[to_email]
                )
                email.send()

        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)


class PasswordResetTokenCheckAPIView(GenericAPIView):

    def get(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = CustomUser.objects.get(pk=uid)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_400_BAD_REQUEST)

            return Response({'success': True, 'message': 'Credentials Valid', 'uidb64': uidb64, 'token': token}, status=status.HTTP_200_OK)
        except DjangoUnicodeDecodeError as idintifier:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = CustomUser.objects.get(pk=uid)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_400_BAD_REQUEST)


class SetNewPasswordAPIView(APIView):

    def put(self, request):
        data = request.data

        new_password = data.get('new_password')
        uidb64 = data.get('uidb64')
        token = data.get('token')

        messages = {'errors': []}

        if new_password is None:
            messages['errors'].append('Password cant be empty')
        if len(messages['errors']) > 0:
            return Response({'detail': messages['errors']}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = CustomUser.objects.get(pk=uid)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'detail': 'Token is not valid, please request a new one'}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.save()

        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Password reset successfully'}, status=status.HTTP_200_OK)


class LawyerUserListAPIView(ListAPIView):
    queryset = LawyerUser.objects.all()
    serializer_class = LawyerUserListSerializer


class LawyerUserDetailAPIView(RetrieveAPIView):
    queryset = LawyerUser.objects.all()
    serializer_class = LawyerUserDetailSerializer
    lookup_field = 'username'


class CustomUserEmailListAPIView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserEmailSerializer


class CustomUserUsernameListAPIView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserUsernameSerializer


class LawyerUserUsernameUpdateAPIView(APIView):
    permission_classes = [IsLawyer]

    def put(self, request):
        data = request.data
        user = request.user

        old_username = data['username']
        messages = {'errors': []}

        username = old_username.lower()

        if username == None:
            messages['errors'].append('username cant be empty')
        if CustomUser.objects.filter(username=username).exclude(username=user.username).exists():
            messages['errors'].append('account already exists with this username')
        if len(messages['errors']) > 0:
            return Response({'detail': messages['errors']}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user.username = username
            user.save()

            lawyer = LawyerUser.objects.get(user=user)
            lawyer.username = username
            lawyer.save()

            serializer = CustomUserUsernameSerializer(user, many=False)

        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        # return Response({'message': 'success', 'user': serializer.data}
        return Response(serializer.data)


class LawyerUserContactInformationUpdateAPIView(APIView):
    permission_classes = [IsLawyer]

    def put(self, request):
        data = request.data
        user = request.user

        first_name = data['first_name']
        last_name = data['last_name']
        address = data['address']
        city = data['city']
        phone_number = data['phone_number']
        fax_number = data['fax_number']
        url = data['url']

        try:

            user.first_name = first_name
            user.last_name = last_name
            user.save()

            lawyer = LawyerUser.objects.get(user=user)
            lawyer.first_name = first_name
            lawyer.last_name = last_name
            lawyer.address = address
            city_id = City.objects.get(_id=city)
            lawyer.city = city_id
            lawyer.phone_number = phone_number
            lawyer.fax_number = fax_number
            lawyer.url = url

            lawyer.save()

            serializer = LawyerUserContactInformationSerializer(user, many=False)
        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)


class LawyerUserDescriptionUpdateAPIView(APIView):
    permission_classes = [IsLawyer]

    def put(self, request):
        user = request.user
        data = request.data

        new_description = data['description']

        try:
            lawyer = LawyerUser.objects.get(user=user)
            lawyer.description = new_description

            lawyer.save()

        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Description changed successfully'}, status=status.HTTP_200_OK)


# PROFILE IMAGE CHANGE
class LawyerUserProfileImageUpdateAPIView(APIView):
    permission_classes = [IsLawyer]

    # parser_classes = [FileUploadParser]

    def put(self, request):
        data = request.data
        user = request.user

        new_image = request.FILES.get('profile_image')

        try:
            lawyer = LawyerUser.objects.get(user=user)
            lawyer.profile_img = new_image
            lawyer.save()
        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Profile image changed successfully'}, status=status.HTTP_200_OK)


# PASSWORD CHANGE
class PasswordUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        data = request.data
        user = request.user

        new_password = data.get('new_password')
        new_password_confirm = data.get('new_password_confirm')
        if new_password and new_password_confirm:
            if new_password == new_password_confirm:
                user.set_password(new_password)
                user.save()
                return Response({'detail': 'Password changed successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": 'Password doesn\'t match'})
        elif new_password is None:
            return Response({'detail': 'New password field required'})
        elif new_password_confirm is None:
            return Response({'detail': 'New password confirm field required'})


# EMAIL CHANGE
# Email değişikliğinde onay maili gönder eski maile
class EmailUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        data = request.data
        user = request.user

        new_email = data.get('new_email')

        messages = {'errors': []}

        if new_email == None:
            messages['errors'].append('email cant be empty')
        if CustomUser.objects.filter(email=new_email).exclude(email=user.email).exists():
            messages['errors'].append('account already exists with this email')
        if len(messages['errors']) > 0:
            return Response({'detail': messages['errors']}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user.email = new_email
            user.save()

            lawyer = LawyerUser.objects.get(user=user)
            lawyer.email = new_email
            lawyer.save()

        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Email changed successfully'}, status=status.HTTP_200_OK)


# MAIN SPECIALTY
class LawyerUserMainSpecialtyUpdateAPIView(APIView):
    permission_classes = [IsLawyer]

    def put(self, request):
        data = request.data
        user = request.user

        main_specialty = data['main_specialty']

        try:
            lawyer = LawyerUser.objects.get(user=user)
            main_specialty_id = Category.objects.get(_id=main_specialty)
            lawyer.main_specialty = main_specialty_id
            lawyer.specialty.add(main_specialty_id)
            lawyer.save()
        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Main Specialty changed successfully'}, status=status.HTTP_200_OK)


# SPECIALTY
class LawyerUserSpecialtyAPIView(APIView):
    permission_classes = [IsLawyer]

    def post(self, request):
        user = request.user
        data = request.data

        try:
            lawyer = LawyerUser.objects.get(user=user)

            specialty_id = data['specialty']
            specialty = Category.objects.get(_id=specialty_id)
            lawyer.specialty.add(specialty)

            lawyer.save()
        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Specialty added successfully'}, status=status.HTTP_200_OK)

    def delete(self, request):
        user = request.user
        data = request.data

        try:
            lawyer = LawyerUser.objects.get(user=user)

            specialty_id = data['specialty']
            specialty = Category.objects.get(_id=specialty_id)
            lawyer.specialty.remove(specialty)

            lawyer.save()
        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Specialty remove successfully'}, status=status.HTTP_204_NO_CONTENT)


# COLLEGE
class LawyerUserCollegeAPIView(APIView):
    permission_classes = [IsLawyer]

    def post(self, request):
        user = request.user
        data = request.data

        try:
            lawyer = LawyerUser.objects.get(user=user)

            college_id = data['college']
            college = College.objects.get(_id=college_id)
            lawyer.college.add(college)

            lawyer.save()
        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'College added successfully'}, status=status.HTTP_200_OK)

    def delete(self, request):
        user = request.user
        data = request.data

        try:
            lawyer = LawyerUser.objects.get(user=user)

            college_id = data['college']
            college = College.objects.get(_id=college_id)
            lawyer.college.remove(college)

            lawyer.save()
        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'College remove successfully'}, status=status.HTTP_204_NO_CONTENT)


# SCHOOL
class LawyerUserSchoolAPIView(APIView):
    permission_classes = [IsLawyer]

    def post(self, request):
        user = request.user
        data = request.data

        try:
            lawyer = LawyerUser.objects.get(user=user)

            school_id = data['school']
            school = School.objects.get(_id=school_id)
            lawyer.school.add(school)

            lawyer.save()
        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'School added successfully'}, status=status.HTTP_200_OK)

    def delete(self, request):
        user = request.user
        data = request.data

        try:
            lawyer = LawyerUser.objects.get(user=user)

            school_id = data['school']
            school = School.objects.get(_id=school_id)
            lawyer.school.remove(school)

            lawyer.save()
        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'School remove successfully'}, status=status.HTTP_204_NO_CONTENT)


# LANGUAGE
class LawyerUserLanguageAPIView(APIView):
    permission_classes = [IsLawyer]

    def post(self, request):
        user = request.user
        data = request.data

        try:
            lawyer = LawyerUser.objects.get(user=user)

            language_id = data['language']
            language = Language.objects.get(_id=language_id)
            lawyer.language.add(language)

            lawyer.save()
        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Language added successfully'}, status=status.HTTP_200_OK)

    def delete(self, request):
        user = request.user
        data = request.data

        try:
            lawyer = LawyerUser.objects.get(user=user)

            language_id = data['language']
            language = Language.objects.get(_id=language_id)
            lawyer.language.remove(language)

            lawyer.save()
        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Language remove successfully'}, status=status.HTTP_204_NO_CONTENT)


# EDUCATION
class LawyerUserEducationAPIView(APIView):
    permission_classes = [IsLawyer]

    def post(self, request):
        user = request.user
        data = request.data

        education_value = data['education_value']
        name = data['name']
        department = data['department']
        beginning = data['beginning']
        ending = data['ending']
        sorting = data['sorting']

        try:
            lawyer = LawyerUser.objects.get(user=user)
            education = Education.objects.create(
                lawyer_user=lawyer,
                education_value=education_value,
                name=name,
                department=department,
                beginning=beginning,
                ending=ending,
                sorting=sorting
            )
        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Education added successfully'}, status=status.HTTP_200_OK)

    def delete(self, request):
        # user = request.user
        data = request.data

        education_id = data['education']

        try:
            # lawyer = LawyerUser.objects.get(user=user)
            education = Education.objects.get(_id=education_id)
            education.delete()

        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Education remove successfully'}, status=status.HTTP_204_NO_CONTENT)


class LawyerUserExperienceAPIView(APIView):
    permission_classes = [IsLawyer]

    def post(self, request):
        user = request.user
        data = request.data

        name = data['name']
        position = data['position']
        beginning = data['beginning']
        ending = data['ending']
        sorting = data['sorting']

        try:
            lawyer = LawyerUser.objects.get(user=user)
            experience = Experience.objects.create(
                lawyer_user=lawyer,
                name=name,
                position=position,
                beginning=beginning,
                ending=ending,
                sorting=sorting
            )
        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Experience added successfully'}, status=status.HTTP_200_OK)

    def delete(self, request):
        data = request.data

        experience_id = data['experience']

        try:
            experience = Experience.objects.get(_id=experience_id)
            experience.delete()

        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Experience remove successfully'}, status=status.HTTP_204_NO_CONTENT)


class LawyerUserImagesAPIView(APIView):
    permission_classes = [IsLawyer]

    def post(self, request):
        user = request.user
        data = request.data

        title = data.get('title')
        image = data.get('image')
        sorting = data.get('sorting')

        try:
            lawyer = LawyerUser.objects.get(user=user)
            lawyer_image = LawyerUserImages.objects.create(
                lawyer=lawyer,
                title=title,
                image=image,
                sorting=sorting
            )
        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Image added successfully'}, status=status.HTTP_200_OK)

    def delete(self, request):
        data = request.data
        image_id = data['image']

        try:
            image = LawyerUserImages.objects.get(_id=image_id)
            image.delete()

        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Image remove successfully'}, status=status.HTTP_204_NO_CONTENT)
