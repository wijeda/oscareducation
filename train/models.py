# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import random
from django.db.models import Count
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class Scenario(Models.Model):

    name = models.CharField(max_length = 60)
    Creator = models.ForeignKeys(Professor, on_delete=models.CASCADE)
    public = models.BooleanField(default = True)

    def get_element(self):
        """get all the elements attached to this scenario"""
        elements = list()
        for element in Element.object.filter(id = self.id):
            elements.append(element)
        return elements


class Element(Models.Model):

    scenario = models.ForeignKeys(Scenario, on_delete=models.CASCADE)
    order = models.DecimalField(max_digits = 3, decimal_places = None)
    content_type = models.CharField()
    content = models.CharField(max_length = None)
