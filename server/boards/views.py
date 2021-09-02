from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, ListCreateAPIView, get_object_or_404, GenericAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets, status
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404

#Repatch
# class BoardsListView(ModelViewSet):
#     queryset = Board.objects.all()
#     serializer_class = BoardListSerializer
#     action_to_serializer = {
#         "retrieve": BoardDetailSerializer
#     }
#
#     def get_serializer_class(self):
#         return self.action_to_serializer.get(
#             self.action,
#             self.serializer_class
#         )


class BoardsListView(viewsets.ViewSet):
    def list(self, request):
        queryset = Board.objects.all()
        serializer = BoardListSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        data = request.data
        serializer = BoardSerializer(data=data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    def retrieve(self, request, pk=None):
        queryset = get_object_or_404(Board, pk=pk)
        serializer = BoardListSerializer(queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["get", "post", "delete"])
    def topics(self, request, pk=None):
        queryset = Topic.objects.filter(board__pk=pk)
        serializer = TopicsListSerializer(queryset, many=True)
        #
        # if request.method == 'POST':
        #     data = request.data
        #     Topic.objects.create(**data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True,
            methods=["get", "delete"],
            url_path='topics/(?P<topic_pk>[^/.]+)')
    def retrieve_topic(self, request, pk=None, topic_pk=None):
        queryset = get_object_or_404(Topic, pk=topic_pk)
        serializer = TopicDetailSerializer(queryset)
        if request.method == "DELETE":
            queryset.delete()
            return Response(status=status.HTTP_200_OK)

        return Response(serializer.data, status=status.HTTP_200_OK)


class TopicListView(ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicsListSerializer
    action_to_serializer = {
        "retrieve": TopicDetailSerializer
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get(
            self.action,
            self.serializer_class
        )


# class PostsView(APIView):
#     def post(self, request, pk, topic_pk):
#         topic = get_object_or_404(Topic, board__pk=pk, pk=topic_pk)
#         serializer = PostsListSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             article_saved = serializer.save()
#         return Response({"success": "Post '{}' created successfully".format(topic.subject)})