from django.conf.urls import url

from webapp import views

urlpatterns = [
    url(r'^', views.homepage_view.as_view(), name='homepage'),
]
