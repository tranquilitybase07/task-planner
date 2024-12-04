from rest_framework import viewsets
from .models import Task, TimeSlot
from .serializers import TaskSerializer, TimeSlotSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from .utils import query_chatgpt


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Return only tasks for the logged-in user
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically assign the logged-in user to the task
        serializer.save(user=self.request.user)
        
class TimeSlotViewSet(viewsets.ModelViewSet):
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer

class TimeSlotViewSet(ModelViewSet):
    serializer_class = TimeSlotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return time slots for the logged-in user
        return TimeSlot.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically assign the logged-in user to the time slot
        serializer.save(user=self.request.user)

class ScheduleTasksView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        # Fetch tasks and time slots
        tasks = Task.objects.filter(user=user, is_completed=False).values(
            "name", "priority", "urgency", "duration"
        )
        time_slots = TimeSlot.objects.filter(user=user).values("day_of_week", "start_time", "end_time")

        if not tasks or not time_slots:
            return Response({"error": "No tasks or time slots available for scheduling"}, status=400)

        # Prepare the prompt for ChatGPT
        prompt = (
            "Schedule the following tasks into the available time slots:\n\n"
            "Tasks:\n"
            + "\n".join(
                f"{task['name']} (Priority: {task['priority']}, Urgency: {task['urgency']}, Duration: {task['duration']} minutes)"
                for task in tasks
            )
            + "\n\nTime Slots:\n"
            + "\n".join(
                f"{slot['day_of_week']} ({slot['start_time']} - {slot['end_time']})"
                for slot in time_slots
            )
            + "\n\nGenerate a schedule that fits all tasks into the available time slots while considering priority and urgency."
        )

        # Query ChatGPT
        try:
            schedule = query_chatgpt(prompt)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

        return Response({"schedule": schedule})
