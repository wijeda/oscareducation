from django import forms

class scenario(forms.Form):
    name = forms.CharField(max_length=100)
    private = forms.BooleanField(help_text="Cochez si vous voulez rendre le scénario privé")
