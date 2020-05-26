# Medilibre 

Application libre de droit sous licence MIT crée par Martin Brunel (martinbrunel@hotmail.fr)
Vous êtes libre d'utiliser, réutiliser diffuser et vendre le produit si vous le souhaitez.

Enjoy.

l'application utilise la stack MERN (MongoDb, Express, React, NodeJs)

# The MIT License (MIT)

Copyright (c) 2020 Martin Brunel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


# instalation

ouvrir terminal

```
sudo ssh -i /var/www/html/ssh/medilibre.pem <user>@<votreServeur>
```

installer mongoDb
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 68818C72E52529D4

sudo echo "deb http://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list

sudo apt-get update
sudo apt-get install -y mongodb-org
```

autoriser l'acces à la bdd depuis l'exterieur

```
sudo nano /etc/mongod.conf
```
change  la ligne binIp: 127.0.0.1 en binIp: 0.0.0.0
lancer mongoDb
```
sudo service mongod start 
```



securiser mongodb

```
sudo mongo

use admin
db.createUser(
... {
... user: "admin",
... pwd: "<votre mot de passe",
... roles: ["userAdminAnyDatabase"]
... }
... )
quit()
```

on reedite le fichier de conf

```
sudo nano /etc/mongod.conf
```

et on décommente

```
security: 
  authorization: enabled
```

puis 

```
sudo service mongod restart
```
on se connect à mongodb en admin

```
sudo mongo
use admin
db.auth('admin', '<votre mot de passe>')
```

on cré la bdd de l'appli

```
use mediLibre
db.createUser(
 {
   user: "<votre pseudo>",
   pwd: "<votre mot de passe>",
   roles: [ "dbOwner" ],
 }
)
db.auth("<votre pseudo>", "<votre mot de passe>")
db.createCollection("doctors")
db.doctors.insert(
[
{
  firstname: "<prenom>",
  lastname: "<nom>",
  job: "<metier>",
  civility: "<civilité>"
  appointmentFrequency: <fréquence>,
  appointmentDuration: <durée>,
  appointmentDelay: <delai>,
  startPlanning: "Tue May 26 2020 08:00:29 GMT+0200 (heure d’été d’Europe centrale)",
  endPlanning: "Tue May 26 2020 20:00:29 GMT+0200 (heure d’été d’Europe centrale)",
  password: "<hash bcrypt du mot de passe >",
  email: "<votre email>",
  oppeningHours: [
  	[
  		["08:00","12:00"],
  		["14:00", "19:00"],
  	],
  	[
  		["08:00","12:00"],
  		["14:00", "19:00"],
  	],
  	[
  		["08:00","12:00"],
  		["14:00", "19:00"],
  	],
  	[
  		["08:00","12:00"],
  		["14:00", "19:00"],
  	],
  	[
  		["08:00","12:00"],
  		["14:00", "19:00"],
  	],
  	[
  		["08:00","12:00"],
  		["14:00", "19:00"],
  	],
  	[
  		["08:00","12:00"],
  		["14:00", "19:00"],
  	],
  ],
  oppeningDays: ["0", "1", "1", "1", "1", "1", "0"],
  adress: "<adresse>",
  zip: "<code postal>",
  city: "<ville>",
  publicEmail: "<emai public>",
  phone: "<n° de de telephone>",
  presentation: "<texte de presentation>",
  slug: "<slug de creation de la page unique>",
  superAdmin: true,
  avatar: "",
  onlineAppointment: false,
  groupSessions: false,
  groupSize: 1,
  appointmentPeriod: 7,
}
]
)
```

Préparation du serveur 

connection: 

```
sudo ssh <user>@<adresseIp>
```
installer nodeJs

```
wget -qO- https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install -y nodejs
```
instaler yarn

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

instaler la pile LAMP

```
sudo apt install apache2 php libapache2-mod-php mysql-server php-mysql
sudo apt install php-curl php-gd php-intl php-json php-mbstring php-xml php-zip

```
tester si apache fonctionne

on construit l'architecture des dossiers

```
cd /var/www/html
sudo git clone https://github.com/Martin-Brunel/Medilibre.git
sudo mv appointments-project back
cd back
sudo cp config-exemple.js config.js
sudo nano config.js
```

entrer les infos de la base de donnée

ex: 
```
const dbInfos = '<user>:<password>@<dbAdresse>:<dbPort>/<dbName>';

module.exports = dbInfos;

```

puis mise a jour des paquets

```
sudo rm -rf node-modules
sudo rm -rf yarn.lock
sudo rm -rf package-lock.json
sudo yarn
npm install -g nodemon
```

tester avec

```
yarn start
```

 installer pm2
 
 ```
 sudo npm install pm2 -g
 sudo pm2 start server.js
 ```
Normalement à cette étape, le backend est fonctionnel 

on retourne en arriere

```
cd ..
sudo mv appointment-project-front front
cd front
sudo yarn
sudo cp src/config.copy.js src/config.js
sudo nano src/config.js
sudo yarn build
sudo cp public/.htaccess dist/.htaccess
```

on retourne en arriere

```
cd ..
sudo mv appointment-project-backOffice backOffice
cd backOffice
sudo yarn
sudo cp src/config.copy.js src/config.js
sudo nano src/config.js
sudo cp src/index.copy.js src/index.js
sudo yarn build
sudo cp public/.htaccess dist/.htaccess
```

regler le fichier de conf d'appache comme tel

```                                                                        
<VirtualHost *:80>
        # The ServerName directive sets the request scheme, hostname and port that
        # the server uses to identify itself. This is used when creating
        # redirection URLs. In the context of virtual hosts, the ServerName
        # specifies what hostname must appear in the request's Host: header to
        # match this virtual host. For the default virtual host (this file) this
        # value is not decisive as it is used as a last resort host regardless.
        # However, you must set it for any further virtual host explicitly.
        ServerName <serveurName>
        ServerAlias <ServeurAlias>

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html/front/dist
        <Directory "/var/www/html/front/dist">
                 Options -Indexes +FollowSymLinks +MultiViews
                AllowOverride all
                Require all granted
        </Directory>
        # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
        # error, crit, alert, emerg.
        # It is also possible to configure the loglevel for particular
        # modules, e.g.
        #LogLevel info ssl:warn

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        # For most configuration files from conf-available/, which are
        # enabled or disabled at a global level, it is possible to
        # include a line for only one particular virtual host. For example the
        # following line enables the CGI configuration for this host only
        # after it has been globally disabled with "a2disconf".
        #Include conf-available/serve-cgi-bin.conf
</VirtualHost>

<VirtualHost *:443>
        # The ServerName directive sets the request scheme, hostname and port that
        # the server uses to identify itself. This is used when creating
        # redirection URLs. In the context of virtual hosts, the ServerName
        # specifies what hostname must appear in the request's Host: header to
        # match this virtual host. For the default virtual host (this file) this
        # value is not decisive as it is used as a last resort host regardless.
        # However, you must set it for any further virtual host explicitly.
        ServerName <serveurName>
        ServerAlias <ServeurAlias>

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html/front/dist
        <Directory "/var/www/html/front/dist">
                 Options -Indexes +FollowSymLinks +MultiViews
                AllowOverride all
                Require all granted
        </Directory>
        
	SSLEngine on
	SSLCertificateFile    /etc/letsencrypt/live/<domainName>/fullchain.pem
	SSLCertificateKeyFile   /etc/letsencrypt/live/<domainName>/privkey.pem
 
        # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
        # error, crit, alert, emerg.
        # It is also possible to configure the loglevel for particular
        # modules, e.g.
        #LogLevel info ssl:warn

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        # For most configuration files from conf-available/, which are
        # enabled or disabled at a global level, it is possible to
        # include a line for only one particular virtual host. For example the
        # following line enables the CGI configuration for this host only
        # after it has been globally disabled with "a2disconf".
        #Include conf-available/serve-cgi-bin.conf
</VirtualHost>

Alias "/admin" "/var/www/html/backOffice/dist"
        <Directory "/var/www/html/backOffice/dist">
                Options +FollowSymLinks
                AllowOverride all
                Require all granted
        </Directory>
        
Alias "/avatar" "/var/www/html/back/avatar"
        <Directory "/var/www/html/back/avatar">
                Options +FollowSymLinks
                AllowOverride all
                Require all granted
        </Directory>


# vim: syntax=apache ts=4 sw=4 sts=4 sr noet
```

puis recharger apache 

```
sudo systemctl reload apache2
```

activation du https

```
sudo a2enmod ssl
sudo systemctl restart apache2
sudo apt update
sudo apt install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt update
sudo apt install certbot
sudo certbot certonly --webroot -w /var/www/html/front/dist -d <domain> -d <domainAlias>

```

passez nodeJs en https


modifier le fichier app.js
```
sudo nano app.js
```

modifier http = require('http');
par https = require('htps');

puis ajouter: 
```
options = {
  key: '/etc/letsencrypt/live/medi-libre.fr/privkey.pem',
  cert: '/etc/letsencrypt/live/medi-libre.fr/fullchain.pem',
}

```
et tranformmer 
```
http.createServer(app);
```
en 
```
https.createServer(options, app);
```








