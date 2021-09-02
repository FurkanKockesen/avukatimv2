from django.db import models
from django.utils.translation import gettext_lazy as _

NOTIFICATION_TYPES = (
    (1, 'Like'),
    (2, 'Comment'),
    (3, 'Answer'),
    (4, 'Correct Answer'),
)


class Notification(models.Model):
    notification_type = models.IntegerField(choices=NOTIFICATION_TYPES)
    to_user = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE, related_name='noti_to_user', null=True)
    from_user = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE, related_name='noti_from_user',
                                  null=True)
    article = models.ForeignKey('blog.Article', on_delete=models.CASCADE, related_name='noti_article', blank=True,
                                null=True)
    question = models.ForeignKey('qa.Question', on_delete=models.CASCADE, related_name='noti_question', blank=True,
                                 null=True)
    answer = models.ForeignKey('qa.Answer', on_delete=models.CASCADE, related_name='noti_answer', blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    is_seen = models.BooleanField(default=False)

    def __str__(self):
        result = '{} --> {} @{}'.format(self.from_user, self.to_user, self.notification_type)
        return result

    class Meta:
        ordering = ['-created_date']
        verbose_name = _('Notification')
        verbose_name_plural = _('Notifications')
