# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rating.models import *
from django.test import TestCase
from resources.models import *
from django.utils import timezone
from users.models import Student
from users.interface import Status
import json


# Create your tests here.

class ProfessorTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create(first_name="Bib",last_name="my",username='user1')
        self.user1 = User.objects.create(first_name="Bfeib", last_name="mfey", username='user2')
        self.status = json.dumps(Status("Contributor", "icon.png").__dict__)
        self.prof = Professor.objects.create(status_changed=False,status=self.status,user=self.user, nbr_4_star_res=0,is_pending=False)
        self.prof1 = Professor.objects.create(status_changed=False,user=self.user1, nbr_4_star_res=0,is_pending=False)

    def test_create_professor(self):
        proff = Professor.objects.get(id =self.prof1.id)
        print(proff.status)
        self.assertTrue(proff.id,1)