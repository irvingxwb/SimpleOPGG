import json

with open('champion.json') as json_data_file:
    champion_data = json.load(json_data_file)

with open('summoner.json') as json_data_file:
    summoner_data = json.load(json_data_file)

champion_table = {}
summoner_table = {}

for (k, v) in champion_data['data'].items():
    champion_table[v['key']] = k

for (k, v) in summoner_data['data'].items():
    summoner_table[v['key']] = k

with open('champion_table.json', 'w') as outfile:
    json.dump(champion_table, outfile)

with open('summoner_table.json', 'w') as outfile:
    json.dump(summoner_table, outfile)