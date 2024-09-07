#!/bin/bash

#rsync -av . root@softdev.ppls.ed.ac.uk:/var/www/deploy/online_experiments
cp example_src/nasa_proxima.png _build/html/
rsync -av _build/html/ softdevppls001@softdev.ppls.ed.ac.uk:/home/softdevppls001/public_html/online_experiments/
