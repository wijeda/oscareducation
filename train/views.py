from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.template.response import TemplateResponse



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
