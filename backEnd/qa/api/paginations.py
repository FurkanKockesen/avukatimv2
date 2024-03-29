from rest_framework.pagination import PageNumberPagination


class QuestionPagination(PageNumberPagination):
    page_size = 5


class AnswerPagination(PageNumberPagination):
    page_size = 5
