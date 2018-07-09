# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.template.context_processors import request
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.generic import (
    CreateView,
    DeleteView,
    TemplateView,
    UpdateView
)
from django.utils.translation import LANGUAGE_SESSION_KEY
from django.contrib.auth.decorators import login_required


class homepage_view(TemplateView):
    """
    View inbox thread list.
    """
    template_name = "webapp/worlds/homepage.html"

    #@method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(homepage_view, self).dispatch(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(homepage_view, self).get_context_data(**kwargs)
        if self.kwargs.get("deleted", None):
            #threads = Thread.ordered(Thread.deleted(self.request.account))
            folder = "deleted"
        else:
            #threads = Thread.ordered(Thread.inbox(self.request.account))
            folder = "inbox"

        if not 'LANGUAGE_SESSION_KEY' in self.request.session:
             self.request.session[LANGUAGE_SESSION_KEY] = 'es'
             
        context.update({
            'lang': self.request.session[LANGUAGE_SESSION_KEY],
        })
        return context



    