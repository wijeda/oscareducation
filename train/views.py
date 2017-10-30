from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.template.response import TemplateResponse
from django.shortcuts import render, redirect
from promotions.models import Lesson, Stage
from skills.models import Skill, StudentSkill, CodeR, Section, Relations, CodeR_relations
from resources.models import KhanAcademy, Sesamath, Resource
from .models import Scenario
from .forms import ScenarioForm
def root_redirection(request):

    return HttpResponseRedirect(reverse("username_login"))

def home(request):
    return TemplateResponse(request, "home.haml", {})

def create_scenario(request):

    # test d recup de date dans la db
    for s in Scenario.objects.all():
        print(s)

    return render(request, "train/creationScenarion.haml")


def list_scenario(request):
    # "dico" is a dictionnary variable that will store the database information for the scenarios
    # the request need to ask the database for scenario's title, skill, topic and grade level
    # for now, the actions are represented by character e for "edit", d for "delete" and s for "see"
    dico = {}
    dico["scenarios"]=[]
    # test d recup de date dans la db
    for s in Scenario.objects.all():
        dico["scenarios"].append({"id":s.id,"sequence":s.title, "skill":s.instructions, "topic":"", "grade":"","edit":"","delete":"","see":""})

    # old line = dico["headline"] = ["Title", "Type of exercice", "Topic", "Grade Level", "Actions"]
    dico["headline"] = ["Titre", "Competence", "Thematique", "Niveau Scolaire", "Actions"]
    # 2 examples to be replaced:
    # dico["scenarios"] = [{"sequence":"Calculer l'aire d'un triangle", "skill":"Aire d'un triangle", "topic":"Trigonometrie", "grade":"3e Primaire","edit":"e","delete":"d","see":"s"},
                        # {"sequence":"Decouverte des fractions", "skill":"Addition de fraction", "topic":"Algebre", "grade":"2e Primaire","edit":"e","delete":"d","see":"s"}]
    # to access the values passed to dico, you need to call the key not dico itself, here it is "scenarios" or "headlines"
    return render(request, "train/listScenario.haml", dico)

def save_scenario(request):

    if request.method == "POST":
        form = ScenarioForm(request.POST)
        print(form.errors)
        print("form :")
        print(form)
        if form.is_valid():
            print("----form valid")
            creator = request.POST.get('creator', '')
            title = request.POST.get('title', '')
            skill = request.POST.get('skill', '')
            topic = request.POST.get('topic', '')
            grade_level = request.POST.get('grade_level', '')
            instructions = request.POST.get('instructions', '')
            public = request.POST.get('public', '')
            print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
            print(public)
            scena_obj = Scenario(title = title, creator= creator, skill = skill, topic= topic, grade_level = grade_level, instructions= instructions, public = public)
            scena_obj.save()
            print("end")
        else:
            print("----form non valid")


    # form = ScenarioForm(request.POST) if request.method == "POST" else ScenarioForm()
    # print("meth : "+ request.method)
    # print(request)
    # if form.is_valid():
    #     scenario = form.save()
    #     return redirect("creationScenarion.haml")
    #
    return render(request, "train/creationScenarion.haml")

def delete_scenario(request, id):
    # print("Voici mon print :D :",request)
    # print(id)
    Scenario.objects.get(id=id).delete()
    return TemplateResponse(request, "home.haml", {})

def scenario(request, id):
    
    return render(request, "train/scenario.haml")
