from django import forms
from .models import Scenario

class ScenarioForm(forms.Form):
        title = forms.CharField() #("Titre", max_length = 255)
        instructions = forms.CharField() # ("Instructions", max_length = 755)
