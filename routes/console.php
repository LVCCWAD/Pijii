<?php

use Carbon\Carbon;
use App\Models\Task;
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
    Log::info('⏰ Task reminder scheduler running at ' . now());

    $now = Carbon::now();

    $reminders = TaskReminder::whereNull('notified_at')
        ->where('remind_at', '<=', $now)
        ->get();

    foreach ($reminders as $reminder) {
        $task = $reminder->task;

        if (!$task) {
            Log::warning("⚠️ No task found for reminder ID {$reminder->id}");
            continue;
        }

        $scheduled = Carbon::parse($task->scheduled_at);
        $diff = $scheduled->diffInDays($now, false);

        $whenText = match (true) {
            $diff === 0 => 'today',
            $diff === 1 => 'tomorrow',
            $diff > 1 => "in $diff days",
            $diff === -1 => 'yesterday',
            $diff < -1 => abs($diff) . ' days ago',
            default => $scheduled->format('M j, Y g:i A'),
        };

        Notification::create([
            'user_id' => $reminder->user_id,
            'task_id' => $reminder->task_id,
            'message' => '⏰ Task Reminder: "' . $task->title . '" is due ' . $whenText,
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

    $overdueTasks = Task::whereHas('stage', fn($q) =>
        $q->where('name', '!=', 'completed')
    )
    ->whereNotNull('scheduled_at')
    ->where('scheduled_at', '<', $now)
    ->get();

    foreach ($overdueTasks as $task) {
        Notification::firstOrCreate([
            'user_id' => $task->created_by,
            'task_id' => $task->id,
            'message' => '⚠️ Task "' . $task->title . '" is overdue (was scheduled at ' . Carbon::parse($task->scheduled_at)->format('M j, Y g:i A') . ')',
            'is_read' => false,
            'notified_at' => now(),
        ]);
    }
})->everyMinute();