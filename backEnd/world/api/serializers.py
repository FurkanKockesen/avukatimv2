from rest_framework import serializers
from world.models import Currency, Country, City, College, School, Language


class CurrencyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ('_id', 'name', 'code', 'symbol')


class CountryListSerializer(serializers.ModelSerializer):
    currency = CurrencyListSerializer()

    class Meta:
        model = Country
        fields = ('_id', 'name', 'phone_code', 'capital', 'currency')


class CityListSerializer(serializers.ModelSerializer):
    country = CountryListSerializer()

    class Meta:
        model = City
        fields = ('_id', 'name', 'country')


class CollegeListSerializer(serializers.ModelSerializer):
    city = CityListSerializer()

    class Meta:
        model = College
        fields = ('_id', 'name', 'city')


class SchoolListSerializer(serializers.ModelSerializer):
    city = CityListSerializer()

    class Meta:
        model = School
        fields = ('_id', 'name', 'city')


class LanguageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('_id', 'name', 'code')
