from django.urls import path
from blog.api.views import (
    CategoryListAPIView,
    CategoryDetailAPIView,
    ArticleListAPIView,
    ArticleDetailAPIView,
    ArticleUpdateAPIView,
    ArticleDeleteAPIView,
    ArticleCreateAPIView,
    CommentListAPIView,
    CommentUpdateAPIView,
    CommentDeleteAPIView,
    CommentCreateAPIView,
    LikeUpdateAPIView,
    FavoriteUpdateAPIView
)

app_name = 'blog'

urlpatterns = [
    path('categories', CategoryListAPIView.as_view(), name='category_list'),
    path('categories/detail/<slug>', CategoryDetailAPIView.as_view(), name='category_detail'),

    path('articles', ArticleListAPIView.as_view(), name='article_list'),
    path('articles/detail/<slug>', ArticleDetailAPIView.as_view(), name='article_detail'),
    path('articles/update/<slug>', ArticleUpdateAPIView.as_view(), name='article_update'),
    path('articles/delete/<slug>', ArticleDeleteAPIView.as_view(), name='article_delete'),
    path('articles/create/', ArticleCreateAPIView.as_view(), name='article_create'),

    path('comments', CommentListAPIView.as_view(), name='comment_list'),
    path('comments/update/<_id>', CommentUpdateAPIView.as_view(), name='comment_update'),
    path('comments/delete/<_id>', CommentDeleteAPIView.as_view(), name='comment_delete'),
    path('comments/create/', CommentCreateAPIView.as_view(), name='comment_create'),

    path('like/update/', LikeUpdateAPIView.as_view(), name='like_vote'),
    path('favorite/update/', FavoriteUpdateAPIView.as_view(), name='favorite_vote'),

]
