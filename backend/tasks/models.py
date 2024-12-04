from django.db import models
from django.contrib.auth.models import User

# Task Model
class Task(models.Model):
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]
    URGENCY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link task to a user
    name = models.CharField(max_length=255)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='low')
    urgency = models.CharField(max_length=10, choices=URGENCY_CHOICES, default='low')
    duration = models.PositiveIntegerField()  # Duration in minutes
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.name

# TimeSlot Model
class TimeSlot(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link slot to a user
    day_of_week = models.CharField(max_length=10)  # e.g., 'Monday'
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.day_of_week}: {self.start_time} - {self.end_time}"

# UserProfile Model (optional, extendable for future features)
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    preferences = models.TextField(blank=True, null=True)  # Optional for storing user preferences

    def __str__(self):
        return self.user.username
    
class TimeSlot(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to the user
    day_of_week = models.CharField(max_length=10)  # e.g., 'Monday'
    start_time = models.TimeField()  # Start time
    end_time = models.TimeField()  # End time

    def __str__(self):
        return f"{self.day_of_week} {self.start_time}-{self.end_time}"
