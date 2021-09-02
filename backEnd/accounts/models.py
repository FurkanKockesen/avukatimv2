from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.validators import FileExtensionValidator
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.contrib.auth.hashers import make_password
from django.utils.crypto import get_random_string
from django.db import models
from django.utils.text import slugify

from world.models import City, Country, Currency, College, School, Language
from blog.models import Category, Article
from model_utils import FieldTracker


class CustomUserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email, and password.
        """

        if not email:
            raise ValueError(_('You must provide an email address'))

        if not password:
            raise ValueError(_('Users must have a password'))

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        # user.password = make_password(password)
        user.set_password(password)
        user.save(using=self._db)

    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        user = self._create_user(email, password=password, **extra_fields)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        user = self._create_user(email, password=password, **extra_fields)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username_validator = UnicodeUsernameValidator()
    # username deleted -*-> CustomUserManager
    username = models.CharField(
        _('username'),
        max_length=150,
        unique=True,
        help_text=_('Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[username_validator],
        error_messages={
            'unique': _("A user with that username already exists."),
        },
    )
    email = models.EmailField(
        _('email address'),
        unique=True,
        help_text=_('Required. 50 characters or fewer. Example: john.doe@gmail.com'),
        error_messages={
            'unique': _("A user with that email already exists."),
        },
    )
    first_name = models.CharField(_('first name'), max_length=150, blank=True)
    last_name = models.CharField(_('last name'), max_length=150, blank=True)

    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('staff status'), default=False)
    is_superuser = models.BooleanField(_('super user'), default=False)
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)
    last_login = models.DateTimeField(_('last login'), blank=True, null=True)

    #
    is_normal = models.BooleanField(default=False)
    is_lawyer = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.get_username()

    def get_full_name(self):
        """
        Return the first_name plus the last_name
        """
        full_name = '{} {}'.format(self.first_name, self.last_name)
        return full_name

    def get_short_name(self):
        """Return the short name for the user"""
        return self.first_name

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')


class NormalUser(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)

    # Interitance
    username = models.CharField(_('username'), max_length=150, blank=True)
    email = models.EmailField(_('email address'), blank=True)
    first_name = models.CharField(_('first name'), max_length=150, blank=True)
    last_name = models.CharField(_('last name'), max_length=150, blank=True)

    gender = models.CharField(_('gender'), max_length=50, null=True, blank=True)
    date_of_birth = models.CharField(_('date of birth'), max_length=50, null=True, blank=True)
    phone_number = models.CharField(_('phone number'), max_length=11, null=True, blank=True)

    def __str__(self):
        return self.user.email

    class Meta:
        verbose_name = _('Normal User')
        verbose_name_plural = _('Normal Users')


def upload_lawyer_image(instance, filename):
    filebase, extension = filename.rsplit('.', 1)
    return '{}/{}/{}.{}'.format('lawyers', instance.user, 'belge', extension)


def upload_lawyer_profile_img(instance, filename):
    filebase, extension = filename.rsplit('.', 1)
    return '{}/{}/{}.{}'.format('lawyers', instance.user, 'profile-image', extension)


class LawyerUser(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    description = models.TextField(null=True, blank=True)

    # Inheritance
    username = models.CharField(_('username'), max_length=150, blank=True)
    email = models.EmailField(_('email address'), blank=True)
    first_name = models.CharField(_('first name'), max_length=150, blank=True)
    last_name = models.CharField(_('last name'), max_length=150, blank=True)

    # Verify
    is_verified = models.BooleanField(default=False)

    # Image
    image = models.ImageField(upload_to=upload_lawyer_image,
                              validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])])

    profile_img = models.ImageField(upload_to=upload_lawyer_profile_img,
                                    default='default.png',
                                    null=True,
                                    blank=True,
                                    validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])])

    # Address Details
    address = models.CharField(max_length=255, blank=True)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, blank=True, null=True)
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, blank=True, null=True)

    # Contact Fields
    phone_number = models.CharField(max_length=11)
    fax_number = models.CharField(max_length=11, null=True, blank=True)
    url = models.CharField(max_length=100, null=True, blank=True)

    # Education Details
    college = models.ManyToManyField(College, related_name='colleges', blank=True)
    school = models.ManyToManyField(School, related_name='schools', blank=True)
    language = models.ManyToManyField(Language, blank=True)

    # Specialties
    main_specialty = models.ForeignKey(Category, on_delete=models.SET_NULL, related_name='main_spec', null=True, blank=True)
    specialty = models.ManyToManyField(Category, related_name='specialties', blank=True)

    # Follower
    followers = models.ManyToManyField(NormalUser, blank=True, related_name='followers')

    # Rank
    article_rank = models.IntegerField(default=0, null=True, blank=True)
    favorites_rank = models.IntegerField(default=0, null=True, blank=True)
    likes_rank = models.IntegerField(default=0, null=True, blank=True)
    followers_rank = models.IntegerField(default=0, null=True, blank=True)
    answers_rank = models.IntegerField(default=0, null=True, blank=True)

    # django-models-utils
    tracker = FieldTracker()

    def __str__(self):
        return self.user.email

    def get_colleges(self):
        return self.college.all()

    def get_schools(self):
        return self.school.all()

    def get_specialties(self):
        return self.specialty.all()

    def get_followers(self):
        return self.followers.all()

    def get_followers_count(self):
        return self.followers.all().count()

    def get_articles(self):
        return self.articles.all()

    def get_articles_count(self):
        return self.articles.all().count()

    # Like -> self.user
    # Beğendiğim Makaleler
    # Likelarımı çekiyorum ve bu likeların articleını gösteriyorum
    # Liked articles by me
    @property
    def get_articles_liked_by_me(self):
        return self.user.likes.all()

    # Likes count
    def get_likes_count(self):
        likes = self.user.likes.all()
        total_liked = 0
        for like in likes:
            if like.value == 'Like':
                total_liked += 1
        return total_liked

    # Favorite
    # Article favorite added by me
    @property
    def get_articles_favorites_by_me(self):
        return self.user.favorites.all()

    # Favorites count
    def get_favorites_count(self):
        favorites = self.user.favorites.all()
        total_favorites = 0
        for favorite in favorites:
            if favorite.value == 1:
                total_favorites += 1
        return total_favorites

    @property
    def get_answered_by_me(self):
        return self.answers.all()

    @property
    def get_correct_answers_by_me(self):
        answers = self.answers.all()
        correct_answers = []
        for answer in answers:
            if answer.answer_status:
                correct_answers.append(answer)

        return correct_answers

    def get_answers_count(self):
        return self.answers.all().count()

    @property
    def get_educations(self):
        return self.educ.all()

    @property
    def get_images(self):
        return self.lawyer_images.all()

    @property
    def get_experiences(self):
        return self.exps.all()

    # def save(self, *args, **kwargs):
    #     ex = False
    #     newname = slugify('{}{}'.format(self.first_name.replace("ı", "i"), self.last_name.replace("ı", "i")))
    #     ex = LawyerUser.objects.filter(username=newname).exists()
    #     while ex:
    #         newname = slugify(newname + " " + get_random_string(9, '0123456789'))
    #         ex = LawyerUser.objects.filter(username=newname).exists()
    #
    #     self.username = newname
    #     super(LawyerUser, self).save(*args, **kwargs)

    class Meta:
        verbose_name = _('Lawyer')
        verbose_name_plural = _('Lawyers')


def upload_lawyer_images(instance, filename):
    filebase, extension = filename.rsplit('.', 1)
    return '{}/{}/{}.{}'.format('lawyers', instance.lawyer, instance.title, extension)


class LawyerUserImages(models.Model):
    lawyer = models.ForeignKey(LawyerUser, on_delete=models.CASCADE, related_name='lawyer_images')
    title = models.CharField(max_length=64)
    image = models.ImageField(upload_to=upload_lawyer_images,
                              validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])])

    sorting = models.IntegerField()
    created_date = models.DateTimeField(auto_now_add=True)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return '{} - {}'.format(self.lawyer, self.created_date)

    class Meta:
        ordering = ('sorting',)
        verbose_name = _('Lawyer Image')
        verbose_name_plural = _('Lawyer Images')
