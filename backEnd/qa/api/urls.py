from django.urls import path
from qa.api.views import (
    QuestionListAPIView,
    QuestionDetailAPIView,
    QuestionUpdateAPIView,
    QuestionDeleteAPIView,
    QuestionCreateAPIView,
    AnswerListAPIView,
    AnswerUpdateAPIView,
    AnswerDeleteAPIView,
    AnswerCreateAPIView
)

app_name = 'qa'

urlpatterns = [
    path('questions', QuestionListAPIView.as_view(), name='question_list'),
    path('questions/detail/<slug>', QuestionDetailAPIView.as_view(), name='question_detail'),
    path('questions/update/<slug>', QuestionUpdateAPIView.as_view(), name='question_update'),
    path('questions/delete/<slug>', QuestionDeleteAPIView.as_view(), name='question_delete'),
    path('questions/create/', QuestionCreateAPIView.as_view(), name='question_create'),

    path('answers', AnswerListAPIView.as_view(), name='answer_list'),
    path('answers/update/<_id>', AnswerUpdateAPIView.as_view(), name='answer_update'),
    path('answers/delete/<_id>', AnswerDeleteAPIView.as_view(), name='answer_delete'),
    path('answers/create/', AnswerCreateAPIView.as_view(), name='answer_create'),
]
