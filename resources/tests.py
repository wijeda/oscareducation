# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from resources.models import *
from rating.models import *
from django.utils import timezone

# Create your tests here.

class Resource_TestCase(TestCase):
    def setUp(self):
        self.r = Resource.objects.create(section="test",content='{"kind": "lesson", "title": "Fonctions de référence", "author": "Paul Robaux"}  ')
        self.u = User.objects.create(first_name="Bib",last_name="my",username='user1')
        self.u1 = User.objects.create(first_name="DBib",last_name="myD",username='user2')
        self.u2 = User.objects.create(first_name="DBiDb",last_name="myFD",username='user3')
        self.d = timezone.now()
        self.prof = Professor.objects.create(user=self.u,nbr_4_star_res=0,status= {'status':'ye'},id=1)
        self.prof2 = Professor.objects.create(user=self.u1,nbr_4_star_res=0,status= {'status':'ye'},id=2)
        self.stud = Student.objects.create(user=self.u2)
        self.q1 = Question.objects.create(question_statement="Did you like it?",type=1)
        self.a1 = Answer.objects.create(answer_statement="Yes, id did")

    def test_resource_add_rating(self):
        t = self.r.add_star(2,self.u)
        star_rating = Star_rating.objects.get(id=t.id)
        self.assertEqual(star_rating.star,2)
        self.assertEqual(star_rating.rated_by,self.u)

    def test_average_resource(self):
        self.r.add_star(5, self.prof.user)
        self.r.add_star(1, self.prof2.user)
        self.r.add_star(3,self.stud.user)
        self.assertEqual(self.r.average(),(3.0,3.0))

