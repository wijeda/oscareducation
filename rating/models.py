from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Star_rating(models.Model):
    resource = models.ForeignKey('resources.Resource')
    """The resource linked to this star rating"""

    star = models.FloatField()
    """Number of stars given"""

    rated_by = models.ForeignKey(User)
    """The user that starred the resource"""

    rated_on = models.DateTimeField()
    """The date when the star rating was given"""

    def add_stars(self,stars,resource,user):
        """Add stars and saves all info to DB"""
        self.star = stars
        self.resource = resource
        self.rated_by = user
        self.rated_on = timezone.now()
        self.save()
        return

    class Meta:
        unique_together = ('resource','rated_by')


class Rating(models.Model):
    resource = models.ForeignKey('resources.Resource')
    """The Resources linked to this rating. A Resource can be linked to several ratings"""

    question = models.ForeignKey('Question')
    """The Question answered for this rating"""

    answer = models.ForeignKey('Answer')
    """The Answer given to this rating"""

    rated_by = models.ForeignKey(User)
    """The User who rated"""

    rated_on = models.DateTimeField()
    """Date of rating"""

    def number_votes_answer(self,resource,question,answer):
        """Get the number of votes for answer at a question from a resource"""
        r = Rating.objects.filter(resource=resource,question=question,answer=answer)
        return r.entry_set.count()

    class Meta:
        unique_together = ('resource','question','rated_by')


class Answer(models.Model):
    answer_statement = models.TextField()
    """The Answer statement"""


class Question(models.Model):
    question_statement = models.TextField()
    """The Question statement"""

    type = models.IntegerField()
    """The type of question (user for prof vs student)"""

class Questionnaire(models.Model):
    question = models.ForeignKey('Question', null=True)
    """The question"""

    answer = models.ForeignKey('Answer', null=True)
    """The Answer"""