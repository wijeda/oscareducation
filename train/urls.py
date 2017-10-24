from django.conf.urls import url
from django.views.generic import TemplateView

#from utils import user_is_student

from . import views
from . import viewsProf

urlpatterns = [
    url(r'^scenario/(?P<id>\d+)', viewsProf.home, name='student_dashboard'),
    url(r'^data/', viewsProf.home),
    url(r'^create_scenario', viewsProf.home, name='student_dashboard'),
    url(r'^edit_scenario/', views.dashboard, name='student_dashboard'),
    url(r'^list_scenario/', views.dashboard, name='student_dashboard'),
]
