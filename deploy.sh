#!/bin/bash

#scp -r * root@softdev.ppls.ed.ac.uk:/var/www/deploy/online_experiments
rsync -av . root@tullo.co.uk:/var/www/deploy/online_experiments
