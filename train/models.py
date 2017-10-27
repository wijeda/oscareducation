# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import random
from django.db.models import Count
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class Scenario(models.Model):

    title = models.CharField("Titre", max_length = 255)
    instructions = models.CharField("Instructions", max_length = 755)

    def __str__(self):
        return("titre:"+ self.title+" and instructions :" + self.instructions)
