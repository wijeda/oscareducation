from django.conf.urls import url
from django.views.generic import TemplateView

from utils import user_is_student

from . import views

urlpatterns = [
    url(r'^scenario/(?P<id>\d+)/$', views.scenario, name='student_dashboard'),
    url(r'^data/', views.dashboard),
    url(r'^create_scenario/$', views.scenario, name='student_dashboard'),
    url(r'^edit_scenario/$', views.scenario, name='student_dashboard'),
    url(r'^list_scenario/$', views.scenario, name='student_dashboard'),
]
