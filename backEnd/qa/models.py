from django.db import models
from django.utils.translation import gettext_lazy as _
from accounts.models import NormalUser, LawyerUser
from taggit.managers import TaggableManager
from django.utils.crypto import get_random_string
from django.utils.text import slugify


class Question(models.Model):
    user = models.ForeignKey(NormalUser, on_delete=models.CASCADE, related_name='questions')
    title = models.CharField(max_length=255)

    slug = models.SlugField(unique=True)
    tags = TaggableManager()
    question_id = models.CharField(max_length=10)

    description = models.TextField()
    closed = models.BooleanField(default=False)

    positive_votes = models.IntegerField(default=0)
    negative_votes = models.IntegerField(default=0)
    total_points = models.IntegerField(default=0)

    view_count = models.IntegerField(default=0)
    save_count = models.IntegerField(default=0)

    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.title

    @property
    def get_question_answers(self):
        return self.question_answers.all()

    def number_of_answers(self):
        return self.question_answers.all().count()

    def save(self, *args, **kwargs):
        if self.question_id == "":
            ex = False
            ex = Question.objects.filter(question_id=self.question_id).exists()
            while ex:
                self.question_id = get_random_string(9, '0123456789')
                ex = Question.objects.filter(question_id=self.question_id).exists()

            slug = slugify(self.title.replace("ı", "i"))
            unique_slug = '{}-{}'.format(self.question_id, slug)
            self.slug = unique_slug
        else:
            slug = slugify(self.title.replace("ı", "i"))
            unique_slug = '{}-{}'.format(self.question_id, slug)
            self.slug = unique_slug

        super(Question, self).save(*args, **kwargs)

    class Meta:
        ordering = ["-created_date"]
        verbose_name = _("Question")
        verbose_name_plural = _("Questions")


class Answer(models.Model):
    user = models.ForeignKey(LawyerUser, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question_answers')

    answer_id = models.CharField(max_length=10)

    answer_text = models.TextField()
    answer_status = models.BooleanField(default=False)

    positive_votes = models.IntegerField(default=0)
    negative_votes = models.IntegerField(default=0)
    total_points = models.IntegerField(default=0)

    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return '{} Answer'.format(self.answer_id)

    def save(self, *args, **kwargs):
        if self.answer_id == "":
            ex = False
            ex = Answer.objects.filter(answer_id=self.answer_id).exists()
            while ex:
                self.answer_id = get_random_string(9, '0123456789')
                ex = Answer.objects.filter(answer_id=self.answer_id).exists()

        super(Answer, self).save(*args, **kwargs)

    class Meta:
        ordering = ["-created_date"]
        verbose_name = _("Answer")
        verbose_name_plural = _("Answers")


VOTE_CHOICES = (
    ("upvote", "upvote"),
    ("downvote", "downvote"),
)


class AnswerVote(models.Model):
    user = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE, related_name='votes')
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='vote')
    value = models.CharField(max_length=10, choices=VOTE_CHOICES)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return "{} - {} - {}".format(self.user, self.answer, self.value)

    class Meta:
        ordering = ('-created_date',)
        verbose_name = _('Answer Vote')
        verbose_name_plural = _('Answer Votes')


class QuestionVote(models.Model):
    user = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE, related_name='q_votes')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='q_vote')
    value = models.CharField(max_length=10, choices=VOTE_CHOICES)

    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return "{} - {} - {}".format(self.user, self._id, self.value)

    class Meta:
        ordering = ('-created_date',)
        verbose_name = _('Question Vote')
        verbose_name_plural = _('Question Votes')
