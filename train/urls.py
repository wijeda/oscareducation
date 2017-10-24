from django.conf.urls import url
from django.views.generic import TemplateView

#from utils import user_is_student

from . import views
from . import viewsStu

urlpatterns = [
    url(r'^scenario/(?P<id>\d+)', views.create_scenario, name='student_dashboard'),
    url(r'^data/', views.home),
    url(r'^create_scenario', views.create_scenario, name='student_dashboard'),
    url(r'^edit_scenario/', viewsStu.dashboard, name='student_dashboard'),
    url(r'^list_scenario/', viewsStu.dashboard, name='student_dashboard'),
]
