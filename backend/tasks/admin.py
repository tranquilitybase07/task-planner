from django.contrib import admin
from .models import Task, TimeSlot, UserProfile

admin.site.register(Task)
admin.site.register(TimeSlot)
admin.site.register(UserProfile)
