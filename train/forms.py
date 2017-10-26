from django import forms
from .models import Scenario

class ScenarioForm(forms.Form):
    class Meta:
        model = Scenario
        fields = ['titre', 'instructions']
