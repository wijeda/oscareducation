# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib.postgres.fields import JSONField
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from rating.models import Star_rating
from django.utils import timezone
from users.models import Professor,Student
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

"""resources models"""


#main resource Model
class Resource(models.Model):

    #@todo section is resource added from where (example : excercie, lesson ...)
    section = models.CharField(max_length=255,null=True,blank=True)
    #json fromat describe resource item
    content = JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    added_by = models.ForeignKey(User, null=True)


    def add_star(self, rate, user):
        """Add stars to a resource"""
        f = Star_rating.objects.create(resource=self,star=rate,rated_by=user,rated_on=timezone.now())
        return f

    def average(self):
        """Returns a tuple containing the average stars for student and professors of this resource"""
        all = Star_rating.objects.filter(resource=self)
        prof_nb = 0
        student_nb = 0
        star_prof = 0
        star_student = 0
        for e in all:
            try:
                prof = Professor.objects.get(user=e.rated_by)
            except Professor.DoesNotExist:
                prof = None
            try:
                student = Student.objects.get(user=e.rated_by)
            except Student.DoesNotExist:
                student = None
            if prof != None:
                prof_nb = prof_nb + 1
                star_prof = star_prof + e.star
            if student != None:
                student_nb = student_nb + 1
                star_student = star_student + e.star

        if student_nb==0:
            if prof_nb==0:
                return (-1,-1)
            else:
                return (-1, star_prof / prof_nb)
        else:
            if prof_nb==0:
                return (star_student / student_nb,-1)
            else:
                return (star_student / student_nb, star_prof / prof_nb)


#khanAcademy video reference data parsed from source url

class KhanAcademy(models.Model):
    #subject
    subject = models.CharField(max_length=255)
    topic = models.CharField(max_length=255, blank=True, null=True)
    tutorial = models.CharField(max_length=255)
    #youtube id
    youtube_id = models.CharField(max_length=25, unique=True)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=100)
    duration = models.PositiveSmallIntegerField()
    fr_date_added = models.DateField(null=True, blank=True)
    class Meta:
        ordering = ['subject', 'topic', 'title']



#ressource refrence from Sesamath
class Sesamath(models.Model):
    classe_int = models.PositiveSmallIntegerField()
    classe = models.CharField(max_length=255)
    # cahier, manuel
    ressource_kind = models.CharField(max_length=255)
    chapitre = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    # "Fiche/Page"
    section_kind = models.CharField(max_length=255)
    year = models.PositiveSmallIntegerField(blank=True, null=True)
    file_name = models.CharField(max_length=255)
    on_oscar = models.URLField(unique=True)

    def ressource_kind_with_year(self):
        if self.year:
            return u"%s - %s" % (self.year, self.ressource_kind)
        return self.ressource_kind

    class Meta:
        ordering = [
            'classe_int',
            'year',
            'ressource_kind',
            'chapitre',
            'section_kind',
        ]