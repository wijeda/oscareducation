from django.conf.urls import url
from django.views.generic import TemplateView

#from utils import user_is_student

from . import views
from . import viewsStu

urlpatterns = [
    url(r'^scenario/(?P<id>\d+)', views.scenario, name='student_dashboard'),
    url(r'^data/(?P<id>\d+)', views.get_data),
    url(r'^edit_scenario/(?P<id>\d+)', views.edit_scenario, name='student_dashboard'),
    url(r'^create_scenario', views.create_scenario, name='student_dashboard'),
    url(r'^save_scenario', views.save_scenario, name='student_dashboard'),
    url(r'^delete_scenario/(?P<id>\d+)', views.delete_scenario, name='student_dashboard'),
    url(r'^list_scenario/', views.list_scenario, name='student_dashboard'),
    url(r'^student_list_scenario/', views.student_list_scenario, name='student_dashboard'),
    url(r'^make_scenario/(?P<id>\d+)', views.make_scenario, name='student_dashboard'),
    url(r'^view_scenario/(?P<id>\d+)', views.view_scenario, name='student_dashboard'),
]
