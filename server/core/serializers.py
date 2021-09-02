from rest_framework import serializers

from accounts.models import User
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    assigned_to_user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='assigned_to', write_only=True
    )

    class Meta:
        model = Task
        depth = 1
        fields = ('id', 'name', 'description', 'status',
                  'due_date', 'estimated_time', 'assigned_to',
                  "assigned_to_user"
                  )
