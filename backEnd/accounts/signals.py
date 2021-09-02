from django.db.models.signals import post_save, pre_save, post_delete
from django.dispatch import receiver
from .models import LawyerUser, NormalUser, CustomUser
from blog.models import Article, Like, Favorite, Comment
from qa.models import Question, QuestionVote, Answer, AnswerVote
from notifications.models import Notification


# Article
@receiver(post_save, sender=Article)
def post_save_article_rank(sender, instance, created, **kwargs):
    user = LawyerUser.objects.get(user=instance.user)
    article_point = user.article_rank

    if created:
        new_article_point = article_point + 10
        user.article_rank = new_article_point
        user.save()


@receiver(post_delete, sender=Article)
def post_delete_article_rank(sender, instance, **kwargs):
    user = LawyerUser.objects.get(user=instance.user)
    article_point = user.article_rank

    new_article_point = article_point - 10
    user.article_rank = new_article_point
    user.save()

    print(sender)
    print(user.article_rank)


# Likes
@receiver(post_save, sender=Like)
def post_save_likes_rank(sender, instance, **kwargs):
    article = Article.objects.get(pk=instance.article.pk)
    user = article.user
    like_point = user.likes_rank

    if instance.value == 1:
        article.liked.add(instance.user)
        new_likes_point = like_point + 2
        user.likes_rank = new_likes_point
        user.save()

        # Notification
        from_user = instance.user
        to_user = user.user
        notify = Notification.objects.create(
            notification_type=1,
            to_user=to_user,
            from_user=from_user,
            article=article
        )
        

    else:
        article.liked.remove(instance.user)
        new_likes_point = like_point - 2
        user.likes_rank = new_likes_point
        user.save()

        # Notification
        from_user = instance.user
        to_user = user.user
        notify = Notification.objects.filter(notification_type=1, to_user=to_user, from_user=from_user, article=article)
        notify.delete()


@receiver(post_delete, sender=Like)
def post_delete_likes_rank(sender, instance, **kwargs):
    article = Article.objects.get(pk=instance.article.pk)
    user = article.user
    like_point = user.likes_rank

    if instance.value == 1:
        new_likes_point = like_point - 2
        user.likes_rank = new_likes_point
        user.save()

        # Notification
        from_user = instance.user
        to_user = user.user
        notify = Notification.objects.filter(notification_type=1, to_user=to_user, from_user=from_user, article=article)
        notify.delete()


# Favorites
@receiver(post_save, sender=Favorite)
def post_save_favorites_rank(sender, instance, **kwargs):
    article = Article.objects.get(pk=instance.article.pk)
    user = article.user
    favorite_point = user.favorites_rank

    if instance.value == 1:
        new_favorites_point = favorite_point + 5
        user.favorites_rank = new_favorites_point
        user.save()

    else:
        new_favorites_point = favorite_point - 5
        user.favorites_rank = new_favorites_point
        user.save()


@receiver(post_delete, sender=Favorite)
def post_delete_favorites_rank(sender, instance, **kwargs):
    article = Article.objects.get(pk=instance.article.pk)
    user = article.user
    favorite_point = user.favorites_rank

    if instance.value == 1:
        new_favorites_point = favorite_point - 5
        user.favorites_rank = new_favorites_point
        user.save()


# NormalUser
@receiver(pre_save, sender=NormalUser)
def pre_save_create_normaluser(sender, instance, **kwargs):
    custom_user = CustomUser.objects.get(pk=instance.user.pk)
    instance.first_name = custom_user.first_name
    instance.last_name = custom_user.last_name
    instance.email = custom_user.email


# LawyerUser
@receiver(pre_save, sender=LawyerUser)
def pre_save_create_lawyeruser(sender, instance, **kwargs):
    custom_user = CustomUser.objects.get(pk=instance.user.pk)
    # instance.username = custom_user.username
    instance.first_name = custom_user.first_name
    instance.last_name = custom_user.last_name
    instance.email = custom_user.email


# Question - Answer Section
# Answer
@receiver(post_save, sender=Answer)
def post_save_create_answer(sender, instance, created, **kwargs):
    user = LawyerUser.objects.get(user=instance.user)
    answer_point = user.answers_rank
    question = Question.objects.get(_id=instance.question._id)

    if created:
        new_answer_point = answer_point + 1
        user.answers_rank = new_answer_point
        user.save()

        # Notification
        from_user = instance.user.user
        to_user = question.user.user
        notify = Notification.objects.create(
            notification_type=3,
            to_user=to_user,
            from_user=from_user,
            question=question,
            answer=instance
        )

    if instance.answer_status:
        question.closed = True
        question.save()

        all_answers = Answer.objects.filter(question=question).exclude(_id=instance._id)
        for answer in all_answers:
            answer.answer_status = False
            answer.save()

        # Notification

        all_notifications = Notification.objects.filter(notification_type=4, question=question)
        for notification in all_notifications:
            notification.delete()

        # Ters Mantık
        from_user = question.user.user
        to_user = instance.user.user
        notify = Notification.objects.create(
            notification_type=4,
            to_user=to_user,
            from_user=from_user,
            question=question,
            answer=instance
        )
       


@receiver(post_delete, sender=Answer)
def post_delete_answer(sender, instance, **kwargs):
    user = LawyerUser.objects.get(user=instance.user)
    answer_point = user.answers_rank

    question = Question.objects.get(_id=instance.question._id)

    new_answer_point = answer_point - 1
    user.answers_rank = new_answer_point
    user.save()

    # Notification
    from_user = instance.user.user
    to_user = question.user.user
    notify = Notification.objects.filter(
        notification_type=3,
        to_user=to_user,
        from_user=from_user,
        question=question,
        answer=instance
    )
    notify.delete()


# AnswerVote
@receiver(post_save, sender=AnswerVote)
def post_save_answer_vote(sender, instance, **kwargs):
    answer = Answer.objects.get(pk=instance.answer.pk)
    up_votes = len(AnswerVote.objects.filter(answer=answer, value='upvote'))
    down_votes = len(AnswerVote.objects.filter(answer=answer, value='downvote'))
    total_points = (up_votes - down_votes)

    answer.total_points = total_points
    answer.positive_votes = up_votes
    answer.negative_votes = down_votes
    answer.save()

    user = answer.user
    answer_point = user.answers_rank

    if instance.value == 'upvote':
        new_answer_point = answer_point + 2
        user.answers_rank = new_answer_point
        user.save()

    else:
        new_answer_point = answer_point - 2
        user.answers_rank = new_answer_point
        user.save()


@receiver(post_delete, sender=AnswerVote)
def post_delete_answer_vote(sender, instance, **kwargs):
    answer = Answer.objects.get(pk=instance.answer.pk)
    up_votes = len(AnswerVote.objects.filter(answer=answer, value='upvote'))
    down_votes = len(AnswerVote.objects.filter(answer=answer, value='downvote'))
    total_points = (up_votes - down_votes)

    answer.total_points = total_points
    answer.positive_votes = up_votes
    answer.negative_votes = down_votes
    answer.save()

    user = answer.user
    answer_point = user.answers_rank

    if instance.value == 'upvote':
        new_answer_point = answer_point - 2
        user.answers_rank = new_answer_point
        user.save()


# QuestionVote
@receiver(post_save, sender=QuestionVote)
def post_save_question_vote(sender, instance, **kwargs):
    question = Question.objects.get(pk=instance.question.pk)
    up_votes = len(QuestionVote.objects.filter(question=question, value='upvote'))
    down_votes = len(QuestionVote.objects.filter(question=question, value='downvote'))
    total_points = (up_votes - down_votes)

    question.total_points = total_points
    question.positive_votes = up_votes
    question.negative_votes = down_votes
    question.save()


@receiver(post_delete, sender=QuestionVote)
def post_delete_question_vote(sender, instance, **kwargs):
    question = Question.objects.get(pk=instance.question.pk)
    up_votes = len(QuestionVote.objects.filter(question=question, value='upvote'))
    down_votes = len(QuestionVote.objects.filter(question=question, value='downvote'))
    total_points = (up_votes - down_votes)

    question.total_points = total_points
    question.positive_votes = up_votes
    question.negative_votes = down_votes
    question.save()


# Comment
@receiver(post_save, sender=Comment)
def post_save_comment(sender, created, instance, **kwargs):
    article = Article.objects.get(pk=instance.article.pk)
    user = article.user

    if created:
        # Notification
        from_user = instance.user
        to_user = user.user
        notify = Notification.objects.create(
            notification_type=2,
            to_user=to_user,
            from_user=from_user,
            article=article
        )


@receiver(post_delete, sender=Comment)
def post_delete_comment(sender, instance, **kwargs):
    article = Article.objects.get(pk=instance.article.pk)
    user = article.user

    # Notification
    from_user = instance.user
    to_user = user.user
    notify = Notification.objects.filter(notification_type=2, to_user=to_user, from_user=from_user, article=article)
    notify.delete()