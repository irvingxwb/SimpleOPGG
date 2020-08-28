from .views import *
from django.urls import path

urlpatterns = [
    path('register/', UserRegisterView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('addaccount/', UserAddAccountView.as_view()),
    path('matchlist/', GetMatchListDataView.as_view()),
    path('matchrecord/', GetMatchRecordDataView.as_view()),
    path('matchdata/', GetMatchDataView.as_view()),
    path('getaccountlist/', UserGetAccountListView.as_view())
]