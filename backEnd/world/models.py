from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MaxValueValidator, MinValueValidator


class Currency(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=3)
    symbol = models.CharField(max_length=255)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Currency')
        verbose_name_plural = _('Currencies')


class Country(models.Model):
    name = models.CharField(max_length=255, unique=True)
    phone_code = models.CharField(max_length=16)
    capital = models.CharField(max_length=255)
    currency = models.ForeignKey(Currency, on_delete=models.SET_NULL, blank=True, null=True)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Country')
        verbose_name_plural = _('Countries')


class City(models.Model):
    name = models.CharField(max_length=255, unique=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['_id']
        verbose_name = _('City')
        verbose_name_plural = _('Cities')


class College(models.Model):
    name = models.CharField(max_length=255, unique=True)
    city = models.ForeignKey(City, null=True, blank=True, on_delete=models.SET_NULL)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('College')
        verbose_name_plural = _('Colleges')


class School(models.Model):
    name = models.CharField(max_length=255, unique=True)
    city = models.ForeignKey(City, null=True, blank=True, on_delete=models.SET_NULL)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('School')
        verbose_name_plural = _('Schools')


class Language(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=255, unique=True)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Language')
        verbose_name_plural = _('Languages')


EDUCATION_CHOICES = (
    (0, "University"),
    (1, "High School"),
)


class Education(models.Model):
    lawyer_user = models.ForeignKey('accounts.LawyerUser', on_delete=models.CASCADE, related_name='educ')
    education_value = models.IntegerField(choices=EDUCATION_CHOICES, default=0)
    name = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    beginning = models.IntegerField(validators=[MaxValueValidator(2018), MinValueValidator(1950)])
    ending = models.IntegerField(validators=[MaxValueValidator(2022), MinValueValidator(1950)])
    sorting = models.IntegerField()

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return "{} -> {}".format(self.lawyer_user, self.name)

    class Meta:
        ordering = ('sorting',)
        verbose_name = _('Education')
        verbose_name_plural = _('Educations')


class Experience(models.Model):
    lawyer_user = models.ForeignKey('accounts.LawyerUser', on_delete=models.CASCADE, related_name='exps')
    name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    beginning = models.IntegerField(validators=[MaxValueValidator(2022)])
    ending = models.IntegerField(validators=[MaxValueValidator(2022)])
    sorting = models.IntegerField()

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return "{} -> {}".format(self.lawyer_user, self.name)

    class Meta:
        ordering = ('sorting',)
        verbose_name = _('Experience')
        verbose_name_plural = _('Experiences')


