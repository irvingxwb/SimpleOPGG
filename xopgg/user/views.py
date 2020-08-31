import os
import json
import requests

from .utils import config
from django.http import HttpResponse, JsonResponse
from django.views import View
from .models import User, Account

# Create your views here.

class UserLoginView(View):

    def post(self, request):
        response = {}
        Username = request.POST.get('username')
        Password = request.POST.get('password')

        if User.objects.filter(username=Username).count() == 0:
            response['result'] = 'failed'
            response['message'] = 'username not exist'
            return JsonResponse(response)

        verified = User.objects.get(username=Username).password
        if verified == Password:
            response['result'] = 'success'
            response['message'] = 'login succeed'
        else:
            response['result'] = 'failed'
            response['message'] = 'incorrect password'

        return JsonResponse(response)


class UserRegisterView(View):

    def post(self, request):
        response = {}
        Username = request.POST.get('username')
        Password = request.POST.get('password')
        Email = request.POST.get('email')
        if User.objects.filter(username=Username).count() != 0:
            response['result'] = 'failed'
            response['message'] = 'username already exist'
            return JsonResponse(response)

        if User.objects.filter(email=Email).count() != 0:
            response['result'] = 'failed'
            response['message'] = 'email already used'
            return JsonResponse(response)

        newuser = User.objects.create(username=Username, password=Password, email=Email)
        newuser.save()

        response['result'] = 'success'
        response['message'] = 'register succeed'

        return JsonResponse(response)


class UserAddAccountView(View):

    def post(self, request):
        response = {}
        Username = request.POST.get('username')
        summonername = request.POST.get('summonername')

        myUrl = 'https://' + config.region + config.summonerid_url + summonername
        Riotresponse = requests.get(url=myUrl, params={'api_key': config['api_key']})

        user = User.objects.get(username=Username)
        dbResult = Account.objects.filter(user=user)

        if Riotresponse.status_code != 200:
            response['result'] = 'failed'
            response['message'] = 'summoner did not find'
        elif dbResult.exists():
            response['result'] = 'failed'
            response['message'] = 'summoner already been added'
        else:
            in_user = User.objects.get(username=Username)
            new_account = Account.objects.create(user=in_user, accountid=summonername)
            new_account.save()
            response['result'] = 'success'
            response['message'] = 'register account succeed'

        return JsonResponse(response)


class UserGetAccountListView(View):
    root_dir = ""

    def post(self, request):
        response = {}

        Username = request.POST.get('username')

        user = User.objects.get(username=Username)
        dbResult = Account.objects.filter(user=user).values('accountid')

        response['result'] = "success"
        response['message'] = dbResult
        return JsonResponse(response)


class GetMatchListDataView(View):

    def post(self, request):
        response = {}
        summoner_name = request.POST.get('summonername')
        region = request.POST.get('region')

        myUrl = 'https://' + region + config.summonerid_url + summoner_name
        Riotresponse = requests.get(url=myUrl, params={'api_key': config.api_key})
        response_data = json.loads(Riotresponse.text)
        accountid = response_data['accountId']

        matchlistUrl = 'https://' + region + config.matchlist_url + accountid
        Riotresponse = requests.get(url=matchlistUrl, params={'api_key': config.api_key})
        response_data = json.loads(Riotresponse.text)

        response['result'] = 'success'
        response['data'] = response_data

        return JsonResponse(response)


class GetMatchRecordDataView(View):

    def post(self, request):
        response = {}
        matchid = request.POST.get('matchid')
        region = request.POST.get('region')

        myUrl = 'https://' + region + config.match_url + matchid
        Riotresponse = requests.get(url=myUrl, params={'api_key': config.api_key})
        response_data = json.loads(Riotresponse.text)
        response['result'] = 'success'
        response['data'] = response_data

        return JsonResponse(response)


class GetMatchDataView(View):

    def post(self, request):
        response = {}
        match_data = []
        summonername = request.POST.get('summonername')
        region = request.POST.get('region')

        Url = 'https://' + region + config.summonerid_url + summonername
        Riotresponse = requests.get(url=Url, params={'api_key': config.api_key})
        response_data = json.loads(Riotresponse.text)
        accountId = response_data['accountId']
        Url = 'https://' + region + config.matchlist_url + accountId
        Riotresponse = requests.get(url=Url, params={'api_key': config.api_key, 'endIndex': 5, 'beginIndex': 0})
        response_matchlist = json.loads(Riotresponse.text)

        for match in response_matchlist['matches']:
            gameId = match['gameId']
            Url = 'https://' + region + config.matchrecord_url + str(gameId)
            Riotresponse = requests.get(url=Url, params={'api_key': config.api_key})
            response_matchdata = json.loads(Riotresponse.text)
            match_data.append(response_matchdata)

        response['result'] = 'success'
        response['data'] = match_data

        return JsonResponse(response)
