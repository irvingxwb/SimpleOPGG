import os
import json
import requests

from django.http import HttpResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.parsers import FormParser, MultiPartParser
from .serializer import UserSerializer, AccountSerializer
from .models import User, Account
# Create your views here.


class UserLoginView(APIView):
    parser_classes = [FormParser, MultiPartParser]

    def post(self, request):
        response = {}
        Username = request.POST.get('username')
        Password = request.POST.get('password')

        if User.objects.filter(username=Username).count() == 0:
            response['result'] = 'failed'
            response['message'] = 'username not exist'
            return Response(response, status=status.HTTP_200_OK)

        verified = User.objects.get(username=Username).password
        if verified == Password:
            response['result'] = 'success'
            response['message'] = 'login succeed'
        else:
            response['result'] = 'failed'
            response['message'] = 'incorrect password'

        return Response(response, status=status.HTTP_200_OK)

class UserRegisterView(APIView):
    parser_classes = [FormParser, MultiPartParser]

    def post(self, request):
        response = {}
        Username = request.POST.get('username')
        Password = request.POST.get('password')
        Email = request.POST.get('email')
        if User.objects.filter(username=Username).count() != 0:
            response['result'] = 'failed'
            response['message'] = 'username already exist'
            return Response(response, status=status.HTTP_200_OK)

        if User.objects.filter(email=Email).count() != 0:
            response['result'] = 'failed'
            response['message'] = 'email already used'
            return Response(response, status=status.HTTP_200_OK)

        newuser = User.objects.create(username=Username, password=Password, email=Email)
        newuser.save()

        response['result'] = 'success'
        response['message'] = 'register succeed'

        return Response(response, status=status.HTTP_200_OK)

class UserAddAccountView(APIView):
    parser_classes = [FormParser, MultiPartParser]
    root_dir = ""

    def __init__(self):
        settings_dir = os.path.dirname(__file__)
        self.root_dir = os.path.abspath(os.path.dirname(settings_dir))

    def post(self, request):
        response = {}
        Username = request.POST.get('username')
        summonername = request.POST.get('summonername')

        with open(self.root_dir + '/user/Config/Riot.json') as json_data_file:
            config = json.load(json_data_file)

        myUrl = 'https://' + config['region'] + config['summonerid_url'] + summonername
        Riotresponse = requests.get(url=myUrl, params={'api_key' : config['api_key']})

        if Riotresponse.status_code != 200:
            response['result'] = 'failed'
            response['message'] = 'summoner did not find'
        else:
            in_user = User.objects.get(username=Username)
            new_account = Account.objects.create(user=in_user, accountid=summonername)
            new_account.save()
            response['result'] = 'success'
            response['message'] = 'register account succeed'

        return Response(response, status=status.HTTP_200_OK)


class GetMatchListDataView(APIView):
    parser_classes = [FormParser, MultiPartParser]
    root_dir = ""

    def __init__(self):
        settings_dir = os.path.dirname(__file__)
        self.root_dir = os.path.abspath(os.path.dirname(settings_dir))

    def post(self, request):
        response = {}
        summoner_name = request.POST.get('summonername')
        region = request.POST.get('region')

        with open(self.root_dir + '/user/Config/Riot.json') as json_data_file:
            config = json.load(json_data_file)

        myUrl = 'https://' + region + config['summonerid_url'] + summoner_name
        Riotresponse = requests.get(url=myUrl, params={'api_key' : config['api_key']})
        response_data = json.loads(Riotresponse.text)
        accountid = response_data['accountId']

        matchlistUrl = 'https://' + region + config['matchlist_url'] + accountid
        Riotresponse = requests.get(url=matchlistUrl, params={'api_key' : config['api_key']})
        response_data = json.loads(Riotresponse.text)

        print(response_data)

        response['result'] = 'success'
        response['data'] = response_data

        return Response(response, status=status.HTTP_200_OK)


class GetMatchRecordDataView(APIView):
    parser_classes = [FormParser, MultiPartParser]
    root_dit = ""

    def __init__(self):
        settings_dir = os.path.dirname(__file__)
        self.root_dir = os.path.abspath(os.path.dirname(settings_dir))


    def post(self, request):
        response = {}
        matchid = request.POST.get('matchid')
        region = request.POST.get('region')

        with open(self.root_dir + '/user/Config/Riot.json') as json_data_file:
            config = json.load(json_data_file)

        myUrl = 'https://' + region + config['match_url'] + matchid
        Riotresponse = requests.get(url=myUrl, params={'api_key': config['api_key']})
        response_data = json.loads(Riotresponse.text)
        response['result'] = 'success'
        response['data'] = response_data

        return Response(response, status=status.HTTP_200_OK)


class GetMatchDataView(APIView):
    parser_classes = [FormParser, MultiPartParser]
    root_dit = ""

    def __init__(self):
        settings_dir = os.path.dirname(__file__)
        self.root_dir = os.path.abspath(os.path.dirname(settings_dir))


    def post(self, request):
        response = {}
        match_data = []
        summonername = request.POST.get('summonername')
        region = request.POST.get('region')

        with open(self.root_dir + '/user/Config/Riot.json') as json_data_file:
            config = json.load(json_data_file)

        Url = 'https://' + region + config['summonerid_url'] + summonername
        Riotresponse = requests.get(url=Url, params={'api_key': config['api_key']})
        response_data = json.loads(Riotresponse.text)

        accountId = response_data['accountId']
        Url = 'https://' + region + config['matchlist_url'] + accountId
        Riotresponse = requests.get(url=Url, params={'api_key': config['api_key'], 'endIndex': 5, 'beginIndex': 0})
        response_matchlist = json.loads(Riotresponse.text)

        for match in response_matchlist['matches']:
            gameId = match['gameId']
            Url = 'https://' + region + config['matchrecord_url'] + str(gameId)
            Riotresponse = requests.get(url=Url, params={'api_key': config['api_key']})
            response_matchdata = json.loads(Riotresponse.text)
            match_data.append(response_matchdata)

        response['result'] = 'success'
        response['data'] = match_data

        return Response(response, status=status.HTTP_200_OK)



