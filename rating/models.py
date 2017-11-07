from __future__ import unicode_literals

from django.db import models
from datetime import datetime
from django.contrib.auth.models import User


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
        self.date = datetime.date
        self.save()
        return


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

    def add_rating(self,resource,user,stars):
        """Add rating to a resource

            :param Resource: current resource to rate
            :param User: current user rating the resource
            :param stars: number of stars the user add to resource

        """
        if isinstance(user, Professor):
            resource.star_prof = resource.star_prof + stars
            resource.nbr_prof = resource.nbr_prof + 1
            if stars >= 4:
                author = User.objects.get(id=resource.added_by)
                author.inc()

        elif isinstance(user, Student):
            resource.star_student = resource.star_student + stars
            resource.nbr_student = resource.nbr_student + 1
        else:
            pass

        answer = Answer.objects.get(answer_statement=stars)
        question = Question.objects.get(id=0)

        self.resource = resource
        self.question = question
        self.answer = answer
        self.user = user
        self.rated_on = datetime.date

        '''We should implement a inc() function in Resource that increments and saves'''
        resource.save()
        self.save()

    def number_votes_answer(self,resource,question,answer):
        """Get the number of votes for answer at a question from a resource"""
        r = Rating.objects.get(resource=resource,question=question,answer=answer)
        return r.entry_set.count()




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