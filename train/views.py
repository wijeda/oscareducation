from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.template.response import TemplateResponse
from django.shortcuts import render
from promotions.models import Lesson, Stage
from skills.models import Skill, StudentSkill, CodeR, Section, Relations, CodeR_relations
from resources.models import KhanAcademy, Sesamath, Resource

def root_redirection(request):

    return HttpResponseRedirect(reverse("username_login"))

def home(request):
    return TemplateResponse(request, "home.haml", {})

def create_scenario(request):
    return TemplateResponse(request, "train/creationScenarion.haml",
    # {
    #     "lessons": Lesson.objects.filter(professors=request.user.professor).annotate(Count("students")).select_related(
    #         "stage"),
    #     "no_menu": True,
    # })
    {"no_menu": True,})

def list_scenario(request):
    # data = {1:"Title", 2:"Type of exercice", 3:"Topic", 4:"Grade Level", 5:"Actions"}
    # data = ["Title", "Type of exercice", "Topic", "Grade Level", "Actions"]
    dico = {}
    dico["headline"] = ["Title", "Type of exercice", "Topic", "Grade Level", "Actions"]
    # dico["scenario1"] = ["Sequence 1", "MCQ", "", "5",""]
    dico["scenarios"] = [{"sequence":"Sequence 1", "type":"MCQ", "topic":"", "grade":"5","edit":"e","delete":"d","see":"s"},
                        {"sequence":"Sequence 2", "type":"Fill-in", "topic":"Algebre", "grade":"2","edit":"e","delete":"d","see":"s"}]
    return render(request, "train/listScenario.haml", dico)
