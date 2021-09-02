from django.urls import path
from world.api.views import (
    CurrencyListAPIView,
    CountryListAPIView,
    CityListAPIView,
    CollegeListAPIView,
    SchoolListAPIView,
    LanguageListAPIView,

)

app_name = 'world'

urlpatterns = [
    path('currencies', CurrencyListAPIView.as_view(), name='currency_list'),
    path('countries', CountryListAPIView.as_view(), name='country_list'),
    path('cities', CityListAPIView.as_view(), name='city_list'),
    path('colleges', CollegeListAPIView.as_view(), name='college_list'),
    path('schools', SchoolListAPIView.as_view(), name='school_list'),
    path('languages', LanguageListAPIView.as_view(), name='language_list'),

]
