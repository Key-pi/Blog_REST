from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, ListCreateAPIView, get_object_or_404, GenericAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets, status
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny


class BoardsListView(viewsets.ViewSet):

    @permission_classes([AllowAny, ])
    def list(self, request):

        queryset = Board.objects.all()
        all_board = BoardListSerializer(queryset, many=True)
        all_history = HistorySerializer(Board.history.all()[:10], many=True)
        return Response({
            "boards": all_board.data,
            'history': all_history.data,
        }, status=status.HTTP_200_OK)

    @permission_classes([IsAuthenticated])
    def create(self, request, pk=None):
        data = request.data
        serializer = BoardSerializer(data=data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        queryset = get_object_or_404(Board, pk=pk)
        queryset.delete()
        return Response(status=status.HTTP_200_OK)

    def update(self, request, pk):
        data = request.data
        instance = get_object_or_404(Board, pk=pk)
        serializer = BoardSerializer(instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        queryset = get_object_or_404(Board, pk=pk)
        serializer = BoardListSerializer(queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["get", "post"])
    def topics(self, request, pk=None):
        if request.method == "GET":
            queryset = Topic.objects.filter(board__pk=pk)
            serializer = TopicsListSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method == "POST":
            data = request.data
            files = request.FILES.getlist('images')
            topic = Topic.objects.filter(subject=data.get('subject'), board=Board.objects.get(pk=pk)).exists()
            if topic is not True:
                new_topic = Topic.objects.create(subject=data.get('subject'), board=Board.objects.get(pk=pk),
                                                 starter=User.objects.get(pk=1))
                if files:
                    for file in files:
                        Image.objects.create(file_field=file, topic=new_topic)
            else:
                return Response(status=status.HTTP_302_FOUND)
            return Response(status=status.HTTP_201_CREATED)


    @action(detail=True,
            methods=["get", "post"],
            url_path='topics/(?P<topic_pk>[^/.]+)')
    def retrieve_topic(self, request, pk=None, topic_pk=None):
        if request.method == "GET":
            queryset = get_object_or_404(Topic, pk=topic_pk, board__pk=pk)
            serializer = TopicDetailSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method == "POST":
            data = request.data
            data["topic"] = topic_pk
            serializer = PostCreateSerializer(data=data, many=False)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.data, status=status.HTTP_404_NOT_FOUND)





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



# class TopicListView(ModelViewSet):
#     queryset = Topic.objects.all()
#     serializer_class = TopicsListSerializer
#     action_to_serializer = {
#         "retrieve": TopicDetailSerializer
#     }
#
#     def get_serializer_class(self):
#         return self.action_to_serializer.get(
#             self.action,
#             self.serializer_class
#         )
#

# class PostsView(APIView):
#     def post(self, request, pk, topic_pk):
#         topic = get_object_or_404(Topic, board__pk=pk, pk=topic_pk)
#         serializer = PostsListSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             article_saved = serializer.save()
#         return Response({"success": "Post '{}' created successfully".format(topic.subject)})




 # data = request.data
            # data['board'] = pk
# serializers = TopicCreateSerializer(data=data, many=False)
            # if serializers.is_valid():
            #     serializers.save()
            # else:
            #     return Response(status=status.HTTP_400_BAD_REQUEST)