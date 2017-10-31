# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import random
from django.db.models import Count
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class Scenario(models.Model):

    creator = models.CharField("Createur", max_length = 255)
    title = models.CharField("Titre", max_length = 255)
    skill = models.CharField("Compétences", max_length = 755)
    topic = models.CharField("Sujet", max_length = 755)
    grade_level = models.CharField("Niveau", max_length = 755)
    description = models.CharField("Description", max_length = 755)
    public = models.BooleanField("Visibilité")


    def __str__(self):
        return("titre:"+ self.title+" and description :" + self.description + "and public : " + str(self.public))


class TextElem(models.Model):

    title = models.CharField("Titre", max_length = 255)
    content = models.CharField("Content", max_length = 2000)
    order = models.IntegerField()

    scenario = models.ForeignKey(
        'Scenario',
    )


class VideoElem(models.Model):

    title = models.CharField("Titre", max_length = 255)
    link = models.CharField("Link", max_length = 500)
    order = models.IntegerField()

    scenario = models.ForeignKey(
        'Scenario',
    )

class McqElem(models.Model):

    title = models.CharField("Titre", max_length = 255)
    QA = models.CharField("Qa", max_length = 100)
    order = models.IntegerField()

    scenario = models.ForeignKey(
        'Scenario',
    )

class ImageElem(models.Model):

    title = models.CharField("Titre", max_length = 255)
    image = models.CharField("Image", max_length = 2000)
    order = models.IntegerField()

    scenario = models.ForeignKey(
        'Scenario',
    )
