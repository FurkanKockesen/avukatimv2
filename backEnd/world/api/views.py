from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    DestroyAPIView,
    CreateAPIView,
    RetrieveUpdateAPIView
)
from world.api.serializers import (
    CurrencyListSerializer,
    CountryListSerializer,
    CityListSerializer,
    CollegeListSerializer,
    SchoolListSerializer,
    LanguageListSerializer,
)

from world.models import Currency, Country, City, College, School, Language


class CurrencyListAPIView(ListAPIView):
    queryset = Currency.objects.all()
    serializer_class = CurrencyListSerializer


class CountryListAPIView(ListAPIView):
    queryset = Country.objects.all()
    serializer_class = CountryListSerializer


class CityListAPIView(ListAPIView):
    queryset = City.objects.all()
    serializer_class = CityListSerializer


class CollegeListAPIView(ListAPIView):
    queryset = College.objects.all()
    serializer_class = CollegeListSerializer


class SchoolListAPIView(ListAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolListSerializer


class LanguageListAPIView(ListAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageListSerializer
