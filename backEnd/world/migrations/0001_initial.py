# Generated by Django 3.2.4 on 2021-09-02 18:57

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('name', models.CharField(max_length=255, unique=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
            options={
                'verbose_name': 'City',
                'verbose_name_plural': 'Cities',
                'ordering': ['_id'],
            },
        ),
        migrations.CreateModel(
            name='Currency',
            fields=[
                ('name', models.CharField(max_length=255)),
                ('code', models.CharField(max_length=3)),
                ('symbol', models.CharField(max_length=255)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
            options={
                'verbose_name': 'Currency',
                'verbose_name_plural': 'Currencies',
            },
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('name', models.CharField(max_length=255)),
                ('code', models.CharField(max_length=255, unique=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
            options={
                'verbose_name': 'Language',
                'verbose_name_plural': 'Languages',
            },
        ),
        migrations.CreateModel(
            name='School',
            fields=[
                ('name', models.CharField(max_length=255, unique=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('city', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='world.city')),
            ],
            options={
                'verbose_name': 'School',
                'verbose_name_plural': 'Schools',
            },
        ),
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('name', models.CharField(max_length=255)),
                ('position', models.CharField(max_length=255)),
                ('beginning', models.IntegerField(validators=[django.core.validators.MaxValueValidator(2022)])),
                ('ending', models.IntegerField(validators=[django.core.validators.MaxValueValidator(2022)])),
                ('sorting', models.IntegerField()),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('lawyer_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='exps', to='accounts.lawyeruser')),
            ],
            options={
                'verbose_name': 'Experience',
                'verbose_name_plural': 'Experiences',
                'ordering': ('sorting',),
            },
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('education_value', models.IntegerField(choices=[(0, 'University'), (1, 'High School')], default=0)),
                ('name', models.CharField(max_length=255)),
                ('department', models.CharField(max_length=255)),
                ('beginning', models.IntegerField(validators=[django.core.validators.MaxValueValidator(2018), django.core.validators.MinValueValidator(1950)])),
                ('ending', models.IntegerField(validators=[django.core.validators.MaxValueValidator(2022), django.core.validators.MinValueValidator(1950)])),
                ('sorting', models.IntegerField()),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('lawyer_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='educ', to='accounts.lawyeruser')),
            ],
            options={
                'verbose_name': 'Education',
                'verbose_name_plural': 'Educations',
                'ordering': ('sorting',),
            },
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('name', models.CharField(max_length=255, unique=True)),
                ('phone_code', models.CharField(max_length=16)),
                ('capital', models.CharField(max_length=255)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('currency', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='world.currency')),
            ],
            options={
                'verbose_name': 'Country',
                'verbose_name_plural': 'Countries',
            },
        ),
        migrations.CreateModel(
            name='College',
            fields=[
                ('name', models.CharField(max_length=255, unique=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('city', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='world.city')),
            ],
            options={
                'verbose_name': 'College',
                'verbose_name_plural': 'Colleges',
            },
        ),
        migrations.AddField(
            model_name='city',
            name='country',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='world.country'),
        ),
    ]
