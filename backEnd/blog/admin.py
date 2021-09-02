from django.contrib import admin
from .models import Category, Article, Like, Favorite, Comment
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from django.utils.translation import gettext_lazy as _


class CategoryResource(resources.ModelResource):
    class Meta:
        model = Category


@admin.register(Category)
class CategoryAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    fieldsets = (
        (_('Information'), {'fields': ('title', 'slug')}),
        (_('Content'), {'fields': ('image', 'content')}),
    )
    list_display = ('title', 'slug')
    list_display_links = ('title',)
    list_editable = ('slug',)
    prepopulated_fields = {"slug": ("title",)}
    resource_class = CategoryResource

    class Meta:
        model = Category


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    fieldsets = (
        (_('Information'), {'fields': ('user', 'title', 'slug', 'category', 'article_id')}),
        (_('Content'), {'fields': ('image', 'content')}),
        (_('Likes'), {'fields': ('liked',)}),
        (_('Status'), {'fields': ('status',)})
    )
    list_display = ('title', 'slug', 'category', 'created_date', 'status', 'user')
    list_display_links = ('title',)
    list_editable = ('category', 'status')
    list_filter = ('category', 'status')
    search_fields = ('title', 'category', 'user')

    class Meta:
        model = Article


admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Favorite)
