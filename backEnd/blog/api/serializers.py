from rest_framework import serializers
from blog.models import Article, Category, Like, Favorite, Comment
from django.contrib.auth import get_user_model
from accounts.models import LawyerUser

User = get_user_model()


class CategoryListSerializer(serializers.ModelSerializer):
    articles_count = serializers.SerializerMethodField()

    def get_articles_count(self, obj):
        return obj.number_of_articles()

    url = serializers.HyperlinkedIdentityField(
        view_name='blog:category_detail',
        lookup_field='slug'
    )

    class Meta:
        model = Category
        fields = [
            '_id',
            'title',
            'slug',
            'url',
            'image',
            'content',
            'articles_count',
        ]


class CategoryDetailSerializer(serializers.ModelSerializer):
    articles = serializers.SerializerMethodField()

    def get_articles(self, obj):
        return ArticleListSerializer(obj.get_category_articles, many=True).data

    class Meta:
        model = Category
        fields = [
            '_id',
            'title',
            'slug',
            'articles',
        ]


class ArticleCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('title', 'slug')


class ArticleUserSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    def get_username(self, obj):
        return obj.user.username

    class Meta:
        model = LawyerUser
        fields = ('first_name', 'last_name', 'email', 'username', 'image')


class ArticleListSerializer(serializers.ModelSerializer):
    # LawyerUser
    user = ArticleUserSerializer()
    category = ArticleCategorySerializer()
    content = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    favorites_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()

    def get_content(self, obj):
        return obj.content[:100]

    def get_likes_count(self, obj):
        return obj.number_of_likes()

    def get_favorites_count(self, obj):
        return obj.number_of_favorites()

    def get_comments_count(self, obj):
        return obj.number_of_comments()

    # url = serializers.HyperlinkedIdentityField(
    #     view_name='blog:article_detail',
    #     lookup_field='slug'
    # )

    class Meta:
        model = Article
        fields = [
            '_id',
            'title',
            'category',
            'slug',
            # 'url',
            'user',
            'image',
            'content',
            'likes_count',
            'favorites_count',
            'comments_count',
            'created_date',
            'updated_date',
        ]


class ArticleDetailSerializer(serializers.ModelSerializer):
    # LawyerUser
    user = ArticleUserSerializer()
    category = ArticleCategorySerializer()
    likes_count = serializers.SerializerMethodField()
    favorites_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    def get_likes_count(self, obj):
        return obj.number_of_likes()

    def get_favorites_count(self, obj):
        return obj.number_of_favorites()

    def get_comments_count(self, obj):
        return obj.number_of_comments()

    def get_comments(self, obj):
        return ArticleDetailCommentSerializer(obj.get_article_comments, many=True).data

    class Meta:
        model = Article
        fields = [
            '_id',
            'user',
            'title',
            'category',
            'image',
            'content',
            'likes_count',
            'favorites_count',
            'comments_count',
            'created_date',
            'updated_date',
            'comments',

        ]


class ArticleUpdateCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = [
            'title',
            'category',
            'image',
            'content'
        ]


# USER & COMMENT RELATION SERIALIZER
class CommentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username')


# ARTICLE & COMMENT RELATION SERIALIZER
class CommentArticelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('title', 'slug', '_id')


class ArticleDetailCommentSerializer(serializers.ModelSerializer):
    user = CommentUserSerializer()

    class Meta:
        model = Comment
        fields = ('user', 'content', 'created_date', 'updated_date')


# COMMENT
class CommentListSerializer(serializers.ModelSerializer):
    article = CommentArticelSerializer()
    user = CommentUserSerializer()

    class Meta:
        model = Comment
        fields = [
            '_id',
            'user',
            'article',
            'content',
            'created_date',
            'updated_date',

        ]


class CommentUpdateDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            'content'
        ]


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content', 'article']
