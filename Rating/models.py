from __future__ import unicode_literals

from django.db import models
import datetime
from django.contrib.auth.models import User

class Rating(models.Model):
    resource = models.ManyToManyField('resources.Resource')
    """The Resources linked to this rating. A Resource can be linked to several ratings"""

    question = models.ForeignKey('Question')
    """The Question answered for this Rating"""

    answer = models.ForeignKey('Answer')
    """The Answer given to this rating"""

    user = models.ForeignKey(User)
    """The User who rated"""

    date = models.DateField()
    """Date of Rating"""

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

        self.resource = resource.id
        self.question = question.id
        self.answer = answer.id
        self.user = user.id
        self.date = datetime.date

        '''We should implement a inc() function in Resource that increments and saves'''
        resource.save()
        self.save()

    def number_votes_answer(self,resource,question,answer):
        """Get the number of votes for answer at a question from a resource"""
        r = Rating.objects.get(resource=resource.id,question=question.id,answer=answer.id)
        return r.entry_set.count()




class Answer(models.Model):
    answer_statement = models.CharField(max_length=300)
    """The Answer statement"""


class Question(models.Model):
    question_statement = models.CharField(max_length=300)
    """The Question statement"""

    type = models.IntegerField()
    """The type of question (user for prof vs student)"""

class Questionnaire(models.Model):
    question = models.ManyToManyField('Question', null=True)
    """The question"""

    answer = models.ManyToManyField('Answer', null=True)
    """The Answer"""