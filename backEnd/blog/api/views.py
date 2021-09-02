from blog.models import Category, Article, Comment, Like, Favorite
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    DestroyAPIView,
    CreateAPIView,
    RetrieveUpdateAPIView
)

from rest_framework.views import APIView

from blog.api.serializers import (
    CategoryListSerializer,
    CategoryDetailSerializer,
    ArticleListSerializer,
    ArticleDetailSerializer,
    ArticleUpdateCreateSerializer,
    CommentListSerializer,
    CommentUpdateDeleteSerializer,
    CommentCreateSerializer,
)

from blog.api.permissions import IsLawyer, IsOwner, CommentIsOwner
from django_filters.rest_framework import DjangoFilterBackend
from blog.api.paginations import ArticlePagination, CommentPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


class CategoryListAPIView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer


class CategoryDetailAPIView(RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryDetailSerializer
    lookup_field = 'slug'


class ArticleListAPIView(ListAPIView):
    serializer_class = ArticleListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']
    pagination_class = ArticlePagination

    def get_queryset(self):
        queryset = Article.objects.filter(status=1)
        return queryset


class ArticleDetailAPIView(RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleDetailSerializer
    lookup_field = 'slug'


class ArticleUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleUpdateCreateSerializer
    lookup_field = 'slug'
    permission_classes = [IsOwner]


class ArticleDeleteAPIView(DestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleListSerializer
    lookup_field = 'slug'
    permission_classes = [IsOwner]


class ArticleCreateAPIView(CreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleUpdateCreateSerializer
    permission_classes = [IsLawyer]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user.lawyeruser)
        print(self.request.user)


# COMMENT
class CommentListAPIView(ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentListSerializer
    pagination_class = CommentPagination


class CommentUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentUpdateDeleteSerializer
    lookup_field = '_id'
    permission_classes = [CommentIsOwner]


class CommentDeleteAPIView(DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentUpdateDeleteSerializer
    lookup_field = '_id'
    permission_classes = [CommentIsOwner]


class CommentCreateAPIView(CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# LIKE
class LikeUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data

        article_id = data['article_id']
        value = data['value']

        try:
            article = Article.objects.get(_id=article_id)
            like, created = Like.objects.get_or_create(article=article, user=user)

            if like.value == value:
                like.delete()
            else:
                like.value = value
                like.save()

        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Like update successfully'}, status=status.HTTP_200_OK)


# FAVORITE
class FavoriteUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data

        article_id = data['article_id']
        value = data['value']

        try:
            article = Article.objects.get(_id=article_id)
            favorite, created = Favorite.objects.get_or_create(article=article, user=user)

            if favorite.value == value:
                favorite.delete()
            else:
                favorite.value = value
                favorite.save()

        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Favorite update successfully'}, status=status.HTTP_200_OK)
