"""
URL configuration for task_planner project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from tasks.views import TaskViewSet, TimeSlotViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from tasks.views import ScheduleTasksView

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'time-slots', TimeSlotViewSet, basename='time-slots')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # API Routes
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/schedule-tasks/', ScheduleTasksView.as_view(), name='schedule-tasks'),
]
