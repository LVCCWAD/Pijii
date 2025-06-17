<?php

use Carbon\Carbon;
use App\Models\Notification;
use App\Models\TaskReminder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Events\EntityActionOccurred;
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

Schedule::call(function () {
    $thresholdDate = Carbon::now()->subDays(30);

    DB::table('projects')
        ->whereNotNull('deleted_at')
        ->where('deleted_at', '<=', $thresholdDate)
        ->forceDelete();
})->daily();

Schedule::call(function () {

    Log::info(message: 'Task Reminding... ' . now());
    Log::info(message: 'Current time: ' . now()->toDateTimeString());

    $now = Carbon::now();

    Log::info(message: 'Current time: ' . $now->toDateTimeString());

    $reminders = TaskReminder::whereNull('notified_at')
    ->where('remind_at', '<=', $now)
    ->get();

    foreach ($reminders as $reminder) {
        Notification::create([
            'user_id' => $reminder->user_id,
            'task_id' => $reminder->task_id,
            'message' => '⏰ Task Reminder: ' . optional($reminder->task)->title,
            'is_read' => false,
            'notified_at' => now(),
        ]);

        $reminder->update(['notified_at' => now()]);

        event(new EntityActionOccurred(
            userId: $reminder->user_id,
            entityType: 'TaskReminder',
            entityId: $reminder->id,
            action: 'Sent notification for task reminder'
        ));
    }
})->everyMinute();
