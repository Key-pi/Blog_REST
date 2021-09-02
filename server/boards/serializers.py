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
        fields = ('message', 'topic', 'created_by')


class TopicsListSerializer(serializers.ModelSerializer):
    # board = serializers.SlugRelatedField(slug_field='name', read_only=True)
    # starter = serializers.SlugRelatedField(slug_field='email', read_only=True)
    class Meta:
        model = Topic
        fields = ('pk', 'board', 'subject', 'last_updated', 'views', 'starter')



class TopicDetailSerializer(serializers.ModelSerializer):
    posts = PostsListSerializer(many=True)
    class Meta:
        model = Topic
        fields = ('pk', 'subject', 'last_updated', 'board', 'starter', 'views', 'posts')


# class TopicDetailSerializer(serializers.ModelSerializer):
#     posts = PostsListSerializer(many=True)
#     board = serializers.SlugRelatedField(slug_field='name', read_only=True)
#     starter = serializers.SlugRelatedField(slug_field='email', read_only=True)
#     class Meta:
#         model = Topic
#         fields = ('pk', 'board', 'subject', 'last_updated', 'views', 'starter', 'posts',)


class BoardListSerializer(serializers.ModelSerializer):
    #topics = TopicsListSerializer(many=True)
    class Meta:

        model = Board
        fields = ('pk', "name", "description")
        #exclude = ("is_active",)


class BoardSerializer(serializers.ModelSerializer):
    #topics = TopicsListSerializer(many=True)
    class Meta:

        model = Board
        fields = ("name", "description")
        #exclude = ("is_active",)



class BoardDetailSerializer(serializers.ModelSerializer):
    topics = TopicsListSerializer(many=True)

    class Meta:
        model = Board
        exclude = ("is_active", )

    # @staticmethod
    # def get_posts(obj):
    #     return BoardDetailSerializer(Board.objects.all().prefetch_related('topic_set'), many=True).data


class TopicCreateSerializer(serializers.ModelSerializer):

    class Meta:

        model = Topic
        fields = ('last_update', 'board', 'starter')

