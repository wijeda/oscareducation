from django.conf.urls import url
from django.views.generic import TemplateView

#from utils import user_is_student

from . import views
from . import viewsStu

urlpatterns = [
    # url redirection for the view of a scenario
    url(r'^((?P<pk>[a-zA-Z0-9_-]+)/)?scenario/(?P<id>\d+)', views.scenario, name='student_dashboard'),
    # url redirection to get data from a scenario
    url(r'^data/(?P<id>\d+)', views.get_data),
    # url redirection for the creation of a scenario
    url(r'^lesson/(?P<pk>\d+)/create_scenario/(?P<id>\d+)?', views.create_scenario, name='student_dashboard'),
    url(r'^create_scenario/(?P<id>\d+)?', views.create_scenario, name='student_dashboard'),
    # url redirection for saving a scenario
    url(r'^save_scenario', views.save_scenario, name='student_dashboard'),
    # url redirection for the deletion of a scenario
    url(r'^delete_scenario/(?P<id>\d+)', views.delete_scenario, name='student_dashboard'),
    # url redirection for the display of the list of the scenarios for the teacher
    url(r'^list_scenario/', views.list_scenario, name='student_dashboard'),
    # url redirection for the view of a scenario
    url(r'^((?P<pk>[a-zA-Z0-9_-]+)/)?make_scenario/(?P<id>\d+)', views.make_scenario, name='student_dashboard'),
    url(r'^view_scenario/(?P<id>\d+)', views.view_scenario, name='student_dashboard'),
    # url redirection for the display of the list of the scenarios for the student
    url(r'^student_list_scenario/', views.redirect_dashboard, name='student_dashboard')
]
