from rest_framework import serializers
from accounts.models import CustomUser, NormalUser, LawyerUser, LawyerUserImages
from world.models import City, Country, College, School, Language, Education, Experience
from blog.models import Article, Category, Like
from qa.models import Answer, Question
from rest_framework_simplejwt.tokens import RefreshToken


# USER SERIALIZER
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_active', 'is_normal', 'is_lawyer')


class CustomUserSerializerWithToken(CustomUserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        # return str(token)
        return str(token.access_token)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_active', 'is_normal', 'is_lawyer', 'token')


# EXTRA
class LawyerCollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = ('name',)


class LawyerSchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ('name',)


class LawyerLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('name',)


class LawyerNormalUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NormalUser
        fields = ('email',)


class LawyerArticleSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField()

    def get_content(self, obj):
        return obj.content[:75]

    class Meta:
        model = Article
        fields = ('_id', 'title', 'slug', 'image', 'content')


class LawyerCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('title', 'slug')


class LawyerLikeSerializer(serializers.ModelSerializer):
    article = LawyerArticleSerializer()

    class Meta:
        model = Like
        fields = ('article',)


class AnswerQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('title', 'slug', 'description')


class LawyerAnswerSerializer(serializers.ModelSerializer):
    question = AnswerQuestionSerializer()

    class Meta:
        model = Answer
        fields = ('question', 'answer_text', 'total_points')


class LawyerEducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ('_id', 'education_value', 'name', 'department', 'beginning', 'ending', 'sorting')


class LawyerExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ('_id', 'name', 'position', 'beginning', 'ending', 'sorting')


class LawyerImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = LawyerUserImages
        fields = ('_id', 'title', 'image', 'sorting')


class LawyerCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('_id', 'name', 'country')


class LawyerUserListSerializer(serializers.ModelSerializer):
    main_specialty = LawyerCategorySerializer()
    city = LawyerCitySerializer()

    link = serializers.HyperlinkedIdentityField(
        view_name='accounts:lawyeruser_detail',
        lookup_field='username'
    )

    class Meta:
        model = LawyerUser
        fields = [
            'user',
            'username',
            'link',
            'email',
            'first_name',
            'last_name',
            'image',
            'profile_img',
            'description',
            'is_verified',
            'main_specialty',
            'city',
            'address',
            'phone_number',
            'fax_number',
            'url',
        ]


class LawyerUserDetailSerializer(serializers.ModelSerializer):
    main_specialty = LawyerCategorySerializer()
    specialty = LawyerCategorySerializer(read_only=True, many=True)
    # college = LawyerCollegeSerializer(read_only=True, many=True)
    # school = LawyerSchoolSerializer(read_only=True, many=True)
    language = LawyerLanguageSerializer(read_only=True, many=True)
    followers = LawyerNormalUserSerializer(read_only=True, many=True)
    followers_count = serializers.SerializerMethodField()
    articles = LawyerArticleSerializer(read_only=True, many=True)
    articles_count = serializers.SerializerMethodField()
    # city = serializers.SerializerMethodField()
    city = LawyerCitySerializer()
    likes = serializers.SerializerMethodField()
    liked_count = serializers.SerializerMethodField()
    favorites = serializers.SerializerMethodField()
    favorited_count = serializers.SerializerMethodField()
    answers = serializers.SerializerMethodField()
    correct_answers = serializers.SerializerMethodField()
    answered_count = serializers.SerializerMethodField()
    education = serializers.SerializerMethodField()
    experience = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()

    # def get_city(self, obj):
    #     return obj.city.name

    def get_followers_count(self, obj):
        return obj.get_followers_count()

    def get_articles(self, obj):
        return obj.get_articles

    def get_education(self, obj):
        return LawyerEducationSerializer(obj.get_educations, many=True).data

    def get_experience(self, obj):
        return LawyerExperienceSerializer(obj.get_experiences, many=True).data

    def get_images(self, obj):
        return LawyerImagesSerializer(obj.get_images, many=True).data

    def get_articles_count(self, obj):
        return obj.get_articles_count()

    def get_likes(self, obj):
        return LawyerLikeSerializer(obj.get_articles_liked_by_me, many=True).data

    def get_liked_count(self, obj):
        return obj.get_likes_count()

    def get_favorites(self, obj):
        return LawyerLikeSerializer(obj.get_articles_favorites_by_me, many=True).data

    def get_favorited_count(self, obj):
        return obj.get_favorites_count()

    def get_answers(self, obj):
        return LawyerAnswerSerializer(obj.get_answered_by_me, many=True).data

    def get_correct_answers(self, obj):
        return LawyerAnswerSerializer(obj.get_correct_answers_by_me, many=True).data

    def get_answered_count(self, obj):
        return obj.get_answers_count()

    class Meta:
        model = LawyerUser
        fields = [
            'user',
            'username',
            'email',
            'first_name',
            'last_name',
            'image',
            'profile_img',
            'description',
            'is_verified',
            'main_specialty',
            'specialty',
            'city',
            'address',
            'phone_number',
            'fax_number',
            'url',
            # 'college',
            # 'school',
            'education',
            'language',
            'experience',
            'followers_count',
            'followers',
            'followers_rank',
            'articles_count',
            'articles',
            'article_rank',
            'liked_count',
            'likes',
            'likes_rank',
            'favorited_count',
            'favorites',
            'favorites_rank',
            'answered_count',
            'answers',
            'correct_answers',
            'answers_rank',
            'images',

        ]


# EMAIL SERIALIZER
class CustomUserEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email',)


# USERNAME SERIALIZER
class CustomUserUsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username',)


class LawyerUserInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password')


class LawyerUserContactInformationSerializer(serializers.ModelSerializer):
    phone_number = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()
    city = serializers.SerializerMethodField()
    fax_number = serializers.SerializerMethodField()
    url = serializers.SerializerMethodField()

    def get_phone_number(self, obj):
        return obj.lawyeruser.phone_number

    def get_address(self, obj):
        return obj.lawyeruser.address

    def get_city(self, obj):
        return obj.lawyeruser.city.name

    def get_fax_number(self, obj):
        return obj.lawyeruser.fax_number

    def get_url(self, obj):
        return obj.lawyeruser.url

    class Meta:
        model = CustomUser
        fields = (
            'id', 'username', 'email', 'first_name', 'last_name', 'address', 'city', 'phone_number', 'fax_number',
            'url')
