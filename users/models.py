# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import random
from django.db.models import Count
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from interface import *

class AuthUserManager(models.Manager):
    def get_queryset(self):
        return super(AuthUserManager, self).get_queryset().select_related('user')



class Professor(models.Model):

    objects = AuthUserManager()
    user = models.OneToOneField(User)
    is_pending = models.BooleanField(default=True)
    code = models.BigIntegerField(null=True,blank=True)
    nbr_4_star_res = models.IntegerField()
    status = JSONField()
    status_changed = models.BooleanField(default=False)
    #user_id = models.IntegerField()

    def print_something(self):
        print(self.nbr_4_star_res)

    def addRating(self, Resource):
        pass

    def __unicode__(self):
        return ("%s %s" % (
        self.user.first_name, self.user.last_name)) if self.user.first_name or self.user.last_name else self.user.username

    def update_status(self):
        top = Top_contributor.objects.get()
        top_prof = Professor.objects.get(user_id=top.prof_id)
        if top_prof.nbr_4_star_res < self.nbr_4_star_res:
            self.status = Status("Top Contributor", "icon.png")
            #top.prof_id = self.user_id
            top_prof.update_status()
            top_prof.status_changed = True
        else:
            if self.nbr_4_star_res >= 1 and self.nbr_4_star_res < 4:
                self.status = Status("Contributor", "icon.png")
            elif self.nbr_4_star_res >= 4 and self.nbr_4_star_res < 9:
                self.status = Status("Motivated Contributor", "icon.png")
            elif self.nbr_4_star_res >= 9 and self.nbr_4_star_res < 19:
                self.status = Status("Advanced Contributor", "icon.png")
            elif self.nbr_4_star_res >= 19:
                self.status = Status("Super Contributor", "icon.png")
        self.save()

    # augments the number of 4-5 star ratings
    def inc(self):
        self.nbr_4_star_res += 1
        self.save()

    class Meta:
        ordering = ['user__last_name', 'user__first_name']



class Student(models.Model):

    objects = AuthUserManager()

    user = models.OneToOneField(User)
    is_pending = models.BooleanField(default=True)
    code = models.IntegerField(null=True, blank=True)
    code_created_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return ("%s %s" % (
        self.user.first_name, self.user.last_name)) if self.user.first_name or self.user.last_name else self.user.username


    def generate_new_code(self):
        """Generate studenty password"""
        new_code = "%s" % (random.randint(1000, 9999))
        self.code = new_code
        self.is_pending = True
        self.save()
        return new_code

    def addRating(self, Resource):
        pass

    class Meta:
        ordering = ['user__last_name']

    def get_email(self):
        if self.user.email.endswith("@example.com"):
            return ""
        return self.user.email

    def done_tests(self):
        return self.teststudent_set.filter(finished_at__isnull=False)

    def todo_tests(self):
        return self.teststudent_set.filter(finished_at__isnull=True)

    def get_last_test(self):
        return self.teststudent_set.order_by('-test__created_at').first()

    def has_recommended_skills(self):
        for student_skill in self.studentskill_set.all():
            if student_skill.recommended_to_learn():
                return True

        return False
