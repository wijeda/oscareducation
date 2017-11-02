from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.template.response import TemplateResponse
from django.shortcuts import render, redirect
from django.views.generic.base import RedirectView
from django.http import HttpResponse

from promotions.models import Lesson, Stage
from skills.models import Skill, StudentSkill, CodeR, Section, Relations, CodeR_relations
from resources.models import KhanAcademy, Sesamath, Resource

from .models import Scenario
from .models import TextElem
from .models import ImgElem
from .models import VidElem
from .models import MCQElem

from .forms import ScenarioForm

import json

def root_redirection(request):

    return HttpResponseRedirect(reverse("username_login"))

def home(request):
    return TemplateResponse(request, "home.haml", {})

def create_scenario(request):

    # test d recup de date dans la db

    return render(request, "train/creationScenarion.haml")

def edit_scenario(request, id):

    s = Scenario.objects.get(id=id)

    dico = {}

    dico["scenario"] = {"creator":s.creator, "id":s.id, "title":s.title, "skill":s.skill, "topic":s.topic, "grade_level":s.grade_level, "instructions":s.instructions}

    return render(request, "train/editScenario.haml", dico)

def view_scenario(request, id):

    s = Scenario.objects.get(id=id)

    dico = {}

    dico["scenario"] = {"creator":s.creator, "id":s.id, "title":s.title, "skill":s.skill, "topic":s.topic, "grade_level":s.grade_level, "instructions":s.instructions}

    return render(request, "train/viewScenario.haml", dico)


def list_scenario(request):

    # "dico" is a dictionnary variable that will store the database information for the scenarios
    # the request need to ask the database for scenario's title, skill, topic and grade level
    # for now, the actions are represented by character e for "edit", d for "delete" and s for "see"
    dico = {}
    dico["scenarios"]=[]
    # test d recup de date dans la db
    for s in Scenario.objects.all():
        dico["scenarios"].append({"id":s.id,"sequence":s.title, "skill":s.instructions, "topic":s.topic, "grade":s.grade_level,"edit":"","delete":"","see":""})

    # old line = dico["headline"] = ["Title", "Type of exercice", "Topic", "Grade Level", "Actions"]
    dico["headline"] = ["Titre", "Competence", "Thematique", "Niveau Scolaire", "Actions"]
    # 2 examples to be replaced:
    # dico["scenarios"] = [{"sequence":"Calculer l'aire d'un triangle", "skill":"Aire d'un triangle", "topic":"Trigonometrie", "grade":"3e Primaire","edit":"e","delete":"d","see":"s"},
                        # {"sequence":"Decouverte des fractions", "skill":"Addition de fraction", "topic":"Algebre", "grade":"2e Primaire","edit":"e","delete":"d","see":"s"}]
    # to access the values passed to dico, you need to call the key not dico itself, here it is "scenarios" or "headlines"
    return render(request, "train/listScenario.haml", dico)

def student_list_scenario(request):
    # "dico" is a dictionnary variable that will store the database information for the scenarios
    # the request need to ask the database for scenario's title, skill, topic and grade level
    # for now, the actions are represented by character e for "edit", d for "delete" and s for "see"
    dico = {}
    dico["scenarios"]=[]
    # test d recup de date dans la db
    for s in Scenario.objects.all():
        dico["scenarios"].append({"id":s.id,"sequence":s.title, "skill":s.instructions, "topic":s.topic, "grade":s.grade_level})

    # old line = dico["headline"] = ["Title", "Type of exercice", "Topic", "Grade Level", "Actions"]
    dico["headline"] = ["Titre", "Competence", "Thematique", "Niveau Scolaire"]
    # 2 examples to be replaced:
    # dico["scenarios"] = [{"sequence":"Calculer l'aire d'un triangle", "skill":"Aire d'un triangle", "topic":"Trigonometrie", "grade":"3e Primaire","edit":"e","delete":"d","see":"s"},
                        # {"sequence":"Decouverte des fractions", "skill":"Addition de fraction", "topic":"Algebre", "grade":"2e Primaire","edit":"e","delete":"d","see":"s"}]
    # to access the values passed to dico, you need to call the key not dico itself, here it is "scenarios" or "headlines"
    return render(request, "train/studentListScenario.haml", dico)

def make_scenario(request, id):
    dico = {}
    dico["descriptif"]=["Titre d'un exo", " Autheur de l'exo", "Voici le descriptif d'un cours pris en random dans la liste", id]

    return render(request, "train/st_begin_scenario.haml", dico)

def save_scenario(request):
    if request.method == "POST":

        # loading the json
        parsed_json = json.loads(request.body)

        print('raw_data : "%s"' % request.body)

        # parsing the parameters of the json
        creator = parsed_json['creator']
        title = parsed_json['title']
        skill =parsed_json['skill']
        topic = parsed_json['topic']
        grade_level = parsed_json['grade_level']
        instructions = parsed_json['instructions']
        public = parsed_json['public']



        print("@@@@@@@@@@@@@@@@")
        print(public)

        # creating the object
        scena = Scenario(title = title, creator= creator, skill = skill, topic= topic, grade_level = grade_level, instructions= instructions, public = True)

        # saving the object
        scena.save()

        # parsing the elements of the json
        for i in range(0, len(parsed_json['elements'])):
            if parsed_json['elements'][i]['type'] == "TextElem":
                id_scenario = scena.id
                order = i
                print(parsed_json['elements'][i]['data'])
                title_elem = parsed_json['elements'][i]['data']['title']
                content_elem = parsed_json['elements'][i]['data']['content']

                elem = TextElem(id_scenario = id_scenario, order = i, title = title_elem, content = content_elem)

                elem.save()

            elif parsed_json['elements'][i]['type'] == "ImgElem":
                id_scenario = scena.id
                order = i
                title_elem = parsed_json['elements'][i]['data']['title']
                url_elem = parsed_json['elements'][i]['data']['url']
                description_elem = parsed_json['elements'][i]['data']['description']

                elem = ImgElem(id_scenario = id_scenario, order = i, title = title_elem, url = url_elem, description = description_elem)

                elem.save()

            elif parsed_json['elements'][i]['type'] == "VidElem":
                id_scenario = scena.id
                order = i
                title_elem = parsed_json['elements'][i]['data']['title']
                url_elem = parsed_json['elements'][i]['data']['url']
                description_elem = parsed_json['elements'][i]['data']['description']

                elem = VidElem(id_scenario = id_scenario, order = i, title = title_elem, url = url_elem, description = description_elem)

                elem.save()

            elif parsed_json['elements'][i]['type'] == "MCQElem":
                id_scenario = scena.id
                order = i
                consigne_elem = parsed_json['elements'][i]['data']['consigne']
                question_elem = parsed_json['elements'][i]['data']['question']
                reponse_elem = []
                for reponse in parsed_json['elements'][i]['data']['rep']:
                    reponse_elem.append(reponse)
                reponse1 = reponse_elem[0]
                reponse2 = reponse_elem[1]
                if len(reponse_elem) == 3 :
                    reponse3 = reponse_elem[2]
                else:
                    reponse3= ''
                if len(reponse_elem) == 4 :
                    reponse4 = reponse_elem[3]
                else:
                    reponse4 = ''

                elem = MCQElem(id_scenario = id_scenario, order = i, consigne = consigne_elem, question = question_elem, reponse1 = reponse1, reponse2 = reponse2, reponse3 = reponse3, reponse4 = reponse4)
                elem.save()


    return HttpResponse("OK")
    # return HttpResponseRedirect('/professor/train/list_scenario/')

def delete_scenario(request, id):
    # print("Voici mon print :D :",request)
    # print(id)
    # textelement = TextElem.objects.get(id_scenario = id)

    textes = TextElem.objects.filter(id_scenario=id)
    for t in textes:
        t.delete()

    videos = VidElem.objects.filter(id_scenario=id)
    for v in videos:
        v.delete()

    images = ImgElem.objects.filter(id_scenario=id)
    for i in images:
        i.delete()

    Scenario.objects.get(id=id).delete()

    return list_scenario(request)
    # return TemplateResponse(request, "train/listScenario.haml", {})

    '''return TemplateResponse(request, "home.haml", {})'''

def scenario(request, id):
    dico = {}
    dico["descriptif"]=["Titre d'un exo", " Autheur de l'exo", "Voici le descriptif d'un cours pris en random dans la liste", id]
    dico["scenario"]=[]
    return render(request, "train/scenario.haml", dico)
