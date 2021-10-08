from pyexpat import model

from rest_framework import serializers
from .models import *


class RecursiveSerializer(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


#Repatch
class PostsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('pk', 'message', 'topic', 'created_by', 'created_at')


class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class TopicsListSerializer(serializers.ModelSerializer):
    # board = serializers.SlugRelatedField(slug_field='name', read_only=True)
    # starter = serializers.SlugRelatedField(slug_field='email', read_only=True)

    class Meta:
        model = Topic
        fields = ('pk', 'board', 'subject', 'last_updated', 'views', 'starter')
        # depth = 1


class TopicDetailSerializer(serializers.ModelSerializer):
    posts = PostsListSerializer(many=True)
    images = GalleryImageSerializer(many=True)
    class Meta:
        model = Topic
        fields = ('pk', 'subject', 'last_updated', 'board', 'starter', 'views', 'posts', 'images')



class HistorySerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    history_type = serializers.CharField(max_length=1)
    history_date = serializers.DateTimeField()
    history_user = serializers.CharField(max_length=100)

    # class Meta:
    #     model = Board
    #     fields = ('__all__')

# class SerializerHistory(serializers.ModelSerializer):
#     history = serializers.SerializerMethodField()
#     # history_date = serializers.DateTimeField()
#     # history_type = serializers.CharField(max_length=1)
#
#     def get_history(self, obj):
#         print('1111', obj, flush=True)
#         instance = obj.history.all()[0]
#         print(123, type(instance), flush=True)
#         return instance


class BoardListSerializer(serializers.ModelSerializer):
    posts_count = serializers.SerializerMethodField()
    last_post = serializers.SerializerMethodField()
    # history = SerializerHistory()
    # history = serializers.SerializerMethodField()
    class Meta:

        model = Board
        fields = ('pk', "name", "description", "posts_count", "last_post")

    def get_posts_count(self, obj):
        return Post.objects.filter(topic__board=obj).all().count()

    def get_last_post(self, obj):
        queryset = Post.objects.filter(topic__board=obj).last()
        # print(queryset,'1111111', flush=True)
        # print(type(queryset),'22222222', flush=True)

        if queryset is not None:
            return {
                "message":queryset.message,
                "author": queryset.created_by.email
            }

    # def get_history(self, obj):
    #     instance = obj.history.all()
    #     print(instance, flush=True)
    #     data = {}
    #     if instance is not None:
    #         for i in instance:
    #             print('22222', i, '33333', dir(i))
    #             # data["author"] = i.history_user
    #             data["date"] = i.history_date
    #             data["type"] = i.history_type
    #         return data




class BoardSerializer(serializers.ModelSerializer):

    class Meta:

        model = Board
        fields = ("name", "description")



class BoardDetailSerializer(serializers.ModelSerializer):
    topics = TopicsListSerializer(many=True)

    class Meta:
        model = Board
        exclude = ("is_active", )


class TopicCreateSerializer(serializers.ModelSerializer):
    images = GalleryImageSerializer(many=True)
    class Meta:
        model = Topic
        fields = ('subject', 'board', 'starter', 'images')


class PostCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('pk', 'message', 'topic', 'created_by', 'created_at')

#########################################
# class TopicDetailSerializer(serializers.ModelSerializer):
#     posts = PostsListSerializer(many=True)
#     board = serializers.SlugRelatedField(slug_field='name', read_only=True)
#     starter = serializers.SlugRelatedField(slug_field='email', read_only=True)
#     class Meta:
#         model = Topic
#         fields = ('pk', 'board', 'subject', 'last_updated', 'views', 'starter', 'posts',)

