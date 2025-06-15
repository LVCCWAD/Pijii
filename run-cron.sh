#!/bin/bash
# Make sure this file has executable permissions, run `chmod +x run-cron.sh`

# This block of code runs the Laravel scheduler every minute
while [ true ]
    do
        echo "Running the scheduler..."
        php artisan schedule:work --verbose --no-interaction 
    done