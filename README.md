# SimpleOPGG
simple version of op.gg website

need to add dragontail(#version)/(#version)/img folder into opggfrontend/data/ folder
dragontail is a data package provided by Riot, you can find it [here](https://riot-api-libraries.readthedocs.io/en/latest/ddragon.html)

need to update the API key generated by roit development at [config](https://github.com/irvingxwb/SimpleOPGG/blob/master/xopgg/user/utils/config.py)

this website has not been deployed since its a toy and it needs backend server been running

# Run demo version

start backend server:
enter xopgg file and run ```python manage.py runserver 0.0.0.0:8000``` \
start frontend server: ```npm start```

# Todo roadmap
this project is still in developing since I want to try different technologies on it and practice my web development skills more.
- [x] Add more detailed game information
- [x] Finish user block and searching based on account ( currently it will only return plain text and a welcome title)
- [ ] Add multipaged match history (currently it only return top five records) 
- [ ] use https for more secure request
- [ ] add api key to user request field for authentication
- [ ] Add player profile for specific account like rank, total matches, most played champions

# Outlook (initial version)
![alt text][outlook]

[outlook]: https://github.com/irvingxwb/SimpleOPGG/blob/master/outlook.png

