# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from Rating.models import *
from django.test import TestCase


class Star_rating_TestCase(TestCase):
    def setUp(self):
        Star_rating.objects.create(
            star=,
            resource=,
            rated_by=,
            rated_on=,
        )
        Star_rating.objects.create()

    def test_star_in_table(self):
        star_r = Star_rating.objects.get(user=)
        self.assertEqual(star_r.star,2)