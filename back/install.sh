#!/bin/bash

sudo git clone https://github.com/Martin-Brunel/appointments-project.git
sudo mkdir images
sudo yarn
sudo pm2 start server.js
