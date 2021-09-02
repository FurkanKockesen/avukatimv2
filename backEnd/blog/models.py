from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import FileExtensionValidator
from django.utils.text import slugify
from django.utils.crypto import get_random_string


def upload_article_image(instance, filename):
    filebase, extension = filename.split('.')
    return '{}/{}.{}'.format('articles', instance.title, extension)


def upload_category_image(instance, filename):
    filebase, extension = filename.split('.')
    return '{}/{}.{}'.format('categories', instance.title, extension)


STATUS = (
    (0, "Draft"),
    (1, "Publish"),
)


class Category(models.Model):
    title = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to=upload_article_image,
                              validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])], blank=True)

    content = models.TextField()

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.title

    def number_of_articles(self):
        return self.category_articles.all().count()

    @property
    def get_category_articles(self):
        return self.category_articles.all()

    class Meta:
        ordering = ('title',)
        verbose_name = _('Category')
        verbose_name_plural = _('Categories')


class Article(models.Model):
    user = models.ForeignKey('accounts.LawyerUser', on_delete=models.CASCADE, related_name='articles')
    title = models.CharField(max_length=255)

    article_id = models.CharField(max_length=10)
    slug = models.SlugField(unique=True)

    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='category_articles')
    image = models.ImageField(upload_to=upload_article_image,
                              validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])], blank=True)
    content = models.TextField()
    liked = models.ManyToManyField('accounts.CustomUser', blank=True, related_name='liked')
    status = models.IntegerField(choices=STATUS, default=0)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.title

    def number_of_likes(self):
        return self.liked.all().count()

    def number_of_comments(self):
        return self.article_comments.all().count()

    def number_of_favorites(self):
        return self.favorite.all().count()

    @property
    def get_article_comments(self):
        return self.article_comments.all()

    def save(self, *args, **kwargs):
        if self.article_id == "":
            ex = False
            ex = Article.objects.filter(article_id=self.article_id).exists()
            while ex:
                self.article_id = get_random_string(9, '0123456789')
                ex = Article.objects.filter(article_id=self.article_id).exists()

            slug = slugify(self.title.replace("ı", "i"))
            unique_slug = '{}-{}'.format(self.article_id, slug)
            self.slug = unique_slug
        else:
            slug = slugify(self.title.replace("ı", "i"))
            unique_slug = '{}-{}'.format(self.article_id, slug)
            self.slug = unique_slug

        super(Article, self).save(*args, **kwargs)

    class Meta:
        ordering = ('created_date',)
        verbose_name = _('Article')
        verbose_name_plural = _('Articles')


class Comment(models.Model):
    user = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE, related_name='user_comments')
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='article_comments')
    content = models.TextField(max_length=255)

    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return '{} - {}...'.format(self.article, str(self.content[:20]))

    class Meta:
        ordering = ('created_date',)
        verbose_name = _('Comment')
        verbose_name_plural = _('Comments')


LIKE_CHOICES = (
    (0, "Unlike"),
    (1, "Like"),
)


class Like(models.Model):
    user = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE, related_name='likes')
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='like')
    value = models.IntegerField(choices=LIKE_CHOICES, default=0)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return "{}-{}-{}".format(self.user, self.article, self.value)

    class Meta:
        ordering = ('created_date',)
        verbose_name = _('Like')
        verbose_name_plural = _('Likes')


FAVORITE_CHOICES = (
    (0, "Not Favorite"),
    (1, "Favorite"),
)


class Favorite(models.Model):
    user = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE, related_name='favorites')
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='favorite')
    value = models.IntegerField(choices=FAVORITE_CHOICES, default=0)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return "{}-{}-{}".format(self.user, self.article, self.value)

    class Meta:
        ordering = ('created_date',)
        verbose_name = _('Favorite')
        verbose_name_plural = _('Favorites')
