# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase

from users.models import Professor


from users.models import Student


# Create your tests here.

class ProfessorTestCase(TestCase):
    def setUp(self):
        Professor.objects.create(name="profval", nbr_4_star_res=0, status="null")

    def test_animals_can_speak(self):
        prof = Professor.objects.get(name="profval")
        self.assertTrue(prof.isPending)


'''is_pending = models.BooleanField(default=True)
    code = models.BigIntegerField(null=True,blank=True)
    nbr_4_star_res = models.IntegerField()
    status = JSONField()
    status_changed = models.BooleanField(default=False)'''
