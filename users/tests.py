# -*- coding: utf-8 -*-

from __future__ import unicode_literals
from django.test import TestCase
from resources.models import *
from users.interface import Status
import json



class ProfessorTestCase(TestCase):
    def setUp(self):
        self.user1 = User.objects.create(first_name="Bob",last_name="Fisher",username='Fishy')
        self.user2 = User.objects.create(first_name="Rick", last_name="Rocked", username='Stoned')
        self.status = json.dumps(Status("Contributor", "icon.png").__dict__)
        self.prof1 = Professor.objects.create(
            status_changed=False,
            user=self.user1,
            nbr_4_star_res=0,
            is_pending=False
        )
        self.prof2 = Professor.objects.create(
            status_changed=False,
            user=self.user2,
            nbr_4_star_res=10,
            is_pending=False
        )

    def test_inc(self):
        prof = Professor.objects.get(pk=self.prof1.id)
        self.assertEqual(prof.nbr_4_star_res, 0)
        prof.inc()
        prof = Professor.objects.get(pk=self.prof1.id)
        self.assertEqual(prof.nbr_4_star_res,1)
        prof.inc()
        prof.inc()
        prof.inc()
        prof = Professor.objects.get(pk=self.prof1.id)
        self.assertEqual(prof.nbr_4_star_res, 4)

    def test_update_status(self):
        top = json.dumps(Status("Top Contributor", "icon.png").__dict__)
        low = json.dumps(Status("Contributor", "icon.png").__dict__)
        mid = json.dumps(Status("Motivated Contributor", "icon.png").__dict__)
        prof1 = Professor.objects.get(pk=self.prof1.id)
        prof2 = Professor.objects.get(pk=self.prof2.id)
        prof1.inc()
        self.assertEqual(prof1.status,None)
        prof1.update_status()
        self.assertEqual(prof1.status, low)
        prof1.inc()
        prof1.inc()
        prof1.inc()
        prof1.inc()
        prof1.update_status()
        self.assertEqual(prof1.status, top)
        self.assertEqual(prof1.nbr_4_star_res,5)
        prof2.nbr_4_star_res = 10
        prof2.save()
        prof2.update_status()
        prof1.update_status() # IF not update done, prof1 keeps top contrib like the prof2 => BUG?
        self.assertEqual(prof1.status, mid)
        self.assertEqual(prof2.status, top)