from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import City, Country, Currency, College, School, Language, Education, Experience


class CurrencyResource(resources.ModelResource):
    class Meta:
        model = Currency
        import_id_fields = ('_id',)


class CityResource(resources.ModelResource):
    class Meta:
        model = City
        import_id_fields = ('_id',)


class CountryResource(resources.ModelResource):
    class Meta:
        model = Country
        import_id_fields = ('_id',)


class CollegeResource(resources.ModelResource):
    class Meta:
        model = College
        import_id_fields = ('_id',)


class SchoolResource(resources.ModelResource):
    class Meta:
        model = School
        import_id_fields = ('_id',)


class LanguageResource(resources.ModelResource):
    class Meta:
        model = Language
        import_id_fields = ('_id',)


class CurrencyAdmin(ImportExportModelAdmin):
    resource_class = CurrencyResource


class CityAdmin(ImportExportModelAdmin):
    resource_class = CityResource


class CountryAdmin(ImportExportModelAdmin):
    resource_class = CountryResource


class CollegeAdmin(ImportExportModelAdmin):
    resource_class = CollegeResource


class SchoolAdmin(ImportExportModelAdmin):
    resource_class = SchoolResource


class LanguageAdmin(ImportExportModelAdmin):
    resource_class = LanguageResource


admin.site.register(Currency, CurrencyAdmin)
admin.site.register(City, CityAdmin)
admin.site.register(Country, CountryAdmin)
admin.site.register(College, CollegeAdmin)
admin.site.register(School, SchoolAdmin)
admin.site.register(Language, LanguageAdmin)
admin.site.register(Education)
admin.site.register(Experience)
