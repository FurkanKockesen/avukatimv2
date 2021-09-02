from django.contrib import admin
from .models import Question, QuestionVote, Answer, AnswerVote
from django.utils.translation import gettext_lazy as _


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    fieldsets = (
        (_('Information'), {'fields': ('user', 'title', 'slug', 'question_id')}),
        (_('Tags'), {'fields': ('tags',)}),
        (_('Status'), {'fields': ('closed',)}),
        (_('Content'), {'fields': ('description',)}),
        (_('Votes'), {'fields': ('total_points', 'positive_votes', 'negative_votes')}),
        (_('Counts'), {'fields': ('view_count', 'save_count')})

    )

    list_display = ('title', 'slug', 'question_id', 'total_points')
    list_display_links = ('title',)
    list_editable = ('slug',)
    list_filter = ('closed', 'tags')
    search_fields = ('title', 'question_id', 'tags')
    prepopulated_fields = {"slug": ("title",)}

    class Meta:
        model = Question


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    fieldsets = (
        (_('Information'), {'fields': ('user', 'question', 'answer_id')}),
        (_('Status'), {'fields': ('answer_status',)}),
        (_('Answer'), {'fields': ('answer_text',)}),
        (_('Votes'), {'fields': ('total_points', 'positive_votes', 'negative_votes')}),
    )


admin.site.register(QuestionVote)

admin.site.register(AnswerVote)
