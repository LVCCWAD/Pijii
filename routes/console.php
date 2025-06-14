<?php

use App\Models\Notification;
use App\Models\TaskReminder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
})->weekly();

Schedule::call(function() {

    Log::info('✅ Cron triggered at ' . now());
    
    Notification::create([
        'user_id' => 1, 
        'task_id' => 1, 
        'message' => 'This is a test notification',
        'is_read' => false,
        'notified_at' => now(),
    ]);
})->everyMinute();