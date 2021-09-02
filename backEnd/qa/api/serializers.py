from rest_framework import serializers
from qa.models import Question, Answer
from accounts.models import NormalUser, LawyerUser
from taggit.serializers import TagListSerializerField, TaggitSerializer


class QuestionUserSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    def get_username(self, obj):
        return obj.user.username

    class Meta:
        model = NormalUser
        fields = ('first_name', 'last_name', 'email', 'username')


class QuestionListSerializer(TaggitSerializer, serializers.ModelSerializer):
    user = QuestionUserSerializer()
    tags = TagListSerializerField()

    url = serializers.HyperlinkedIdentityField(
        view_name='qa:question_detail',
        lookup_field='slug',
    )

    class Meta:
        model = Question
        fields = [
            '_id',
            'title',
            'user',
            'slug',
            'url',
            'tags',
            'description',
            'positive_votes',
            'negative_votes',
            'total_points',
            'closed',
            'view_count',
            'save_count',
            'created_date',
            'updated_date',
        ]


class QuestionDetailSerializer(TaggitSerializer, serializers.ModelSerializer):
    user = QuestionUserSerializer()
    answers_count = serializers.SerializerMethodField()
    tags = TagListSerializerField()
    answers = serializers.SerializerMethodField()

    def get_answers_count(self, obj):
        return obj.number_of_answers()

    def get_answers(self, obj):
        return QuestionDetailAnswerSerializer(obj.get_question_answers, many=True).data

    class Meta:
        model = Question
        fields = [
            '_id',
            'title',
            'user',
            'tags',
            'description',
            'positive_votes',
            'negative_votes',
            'total_points',
            'closed',
            'view_count',
            'save_count',
            'created_date',
            'updated_date',
            'answers_count',
            'answers',

        ]


class QuestionUpdateCreateSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()

    class Meta:
        model = Question
        fields = ('title', 'description', 'tags')


# USER & ANSWER RELATION SERIALIZER
class AnswerUserSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    def get_username(self, obj):
        return obj.user.username

    class Meta:
        model = LawyerUser
        fields = ('first_name', 'last_name', 'email', 'username')


# QUESTION & ANSWER RELATION SERIALIZER
class AnswerQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('_id', 'title', 'slug', 'closed')


class QuestionDetailAnswerSerializer(serializers.ModelSerializer):
    user = AnswerUserSerializer()

    class Meta:
        model = Answer
        fields = (
            'user', 'answer_text', 'positive_votes', 'negative_votes', 'total_points', 'created_date', 'updated_date',
            'answer_status')


# ANSWER
class AnswerListSerializer(serializers.ModelSerializer):
    question = AnswerQuestionSerializer()
    user = AnswerUserSerializer()

    class Meta:
        model = Answer
        fields = [
            '_id',
            'user',
            'question',
            'answer_text',
            'positive_votes',
            'negative_votes',
            'total_points',
            'answer_status',
            'created_date',
            'updated_date',
        ]


class AnswerUpdateDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = [
            'answer_text'
        ]


class AnswerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = [
            'user',
            'question',
            'answer_text',
        ]
