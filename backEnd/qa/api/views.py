from qa.models import Question, Answer
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    DestroyAPIView,
    CreateAPIView,
    RetrieveUpdateAPIView
)
from qa.api.permissions import IsNormal, IsOwner, AnswerIsOwner
from qa.api.paginations import QuestionPagination, AnswerPagination
from qa.api.serializers import (
    QuestionListSerializer,
    QuestionDetailSerializer,
    QuestionUpdateCreateSerializer,
    AnswerListSerializer,
    AnswerUpdateDeleteSerializer,
    AnswerCreateSerializer
)

from django_filters.rest_framework import DjangoFilterBackend


class QuestionListAPIView(ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionListSerializer
    pagination_class = QuestionPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['tags__name']


class QuestionDetailAPIView(RetrieveAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionDetailSerializer
    lookup_field = 'slug'


class QuestionUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionUpdateCreateSerializer
    lookup_field = 'slug'
    permission_classes = [IsOwner]


class QuestionDeleteAPIView(DestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionListSerializer
    lookup_field = 'slug'
    permission_classes = [IsOwner]


class QuestionCreateAPIView(CreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionUpdateCreateSerializer
    permission_classes = [IsNormal]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user.normaluser)
        print(self.request.user)


# ANSWER
class AnswerListAPIView(ListAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerListSerializer
    pagination_class = AnswerPagination


class AnswerUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerUpdateDeleteSerializer
    lookup_field = '_id'
    permission_classes = [AnswerIsOwner]


class AnswerDeleteAPIView(DestroyAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerUpdateDeleteSerializer
    lookup_field = '_id'
    permission_classes = [AnswerIsOwner]


class AnswerCreateAPIView(CreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerCreateSerializer

    permission_classes = [AnswerIsOwner]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user.lawyeruser)
