<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::call(function () {
    DB::table('users')
        ->whereNull('email_verified_at')
        ->where('created_at', '<=', now()->subDays(7)) 
        ->delete();
})->cron('0 0 * * 0');
