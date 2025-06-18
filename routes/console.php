<?php

use Carbon\Carbon;
use App\Models\Task;
use App\Models\Project;
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

// Clean up users who haven't verified their email
Schedule::call(function () {
    DB::table('users')
        ->whereNull('email_verified_at')
        ->where('created_at', '<=', now()->subDays(7)) 
        ->delete();
})->weekly();

// Clean up tasks that are soft deleted after 30 days
Schedule::call(function () {
    $thresholdDate = Carbon::now()->subDays(30);

    DB::table('projects')
        ->whereNotNull('deleted_at')
        ->where('deleted_at', '<=', $thresholdDate)
        ->forceDelete();
})->daily();


// Notify users of task reminders, run every minute
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

    // ⚠️ Overdue Project Notifications
    $overdueProjects = Project::whereHas('stage', fn($q) =>
        $q->whereNotIn('name', ['completed', 'on hold'])
    )
    ->whereNotNull('scheduled_at')
    ->whereNull('deleted_at')
    ->whereNull('archived_at')
    ->where('scheduled_at', '<=', $now)
    ->get();

    foreach ($overdueProjects as $project) {
        $alreadyNotified = Notification::where('project_id', $project->id)
            ->where('user_id', $project->created_by)
            ->where('message', 'like', '⚠️ Project "%')
            ->exists();

        if (!$alreadyNotified) {
            Notification::create([
                'user_id' => $project->created_by,
                'project_id' => $project->id,
                'message' => '⚠️ Project "' . $project->project_name . '" is overdue (was scheduled at ' . Carbon::parse($project->scheduled_at)->format('M j, Y g:i A') . ')',
                'is_read' => false,
                'notified_at' => now(),
            ]);
        }
    }
})->everyMinute();


use App\Models\ProjectReminder;

// Notify users of project reminders and overdue projects, run every minute
Schedule::call(function () {
    Log::info('⏰ Project reminder scheduler running at ' . now());

    $now = Carbon::now();

    // 🔔 Project Reminders
    $reminders = ProjectReminder::whereNull('notified_at')
        ->where('remind_at', '<=', $now)
        ->get();

    foreach ($reminders as $reminder) {
        $project = $reminder->project;

        if (!$project) {
            Log::warning("⚠️ No project found for reminder ID {$reminder->id}");
            continue;
        }

        $scheduled = Carbon::parse($project->scheduled_at);
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
            'project_id' => $reminder->project_id,
            'message' => '⏰ Project Reminder: "' . $project->project_name . '" is due ' . $whenText,
            'is_read' => false,
            'notified_at' => $now,
        ]);

        $reminder->update(['notified_at' => $now]);

        event(new EntityActionOccurred(
            userId: $reminder->user_id,
            entityType: 'ProjectReminder',
            entityId: $reminder->id,
            action: 'Sent notification for project reminder'
        ));
    }

    // ⚠️ Overdue Project Notifications
    $overdueProjects = Project::whereHas('stage', fn($q) =>
        $q->where('name', '!=', 'completed')
    )
    ->whereNotNull('scheduled_at')
    ->whereNull('deleted_at')
    ->whereNull('archived_at')
    ->where('scheduled_at', '<', $now)
    ->get();

    foreach ($overdueProjects as $project) {
        $alreadyNotified = Notification::where('project_id', $project->id)
            ->where('user_id', $project->created_by)
            ->where('message', 'like', '⚠️ Project "%')
            ->exists();

        if (!$alreadyNotified) {
            Notification::create([
                'user_id' => $project->created_by,
                'project_id' => $project->id,
                'message' => '⚠️ Project "' . $project->project_name . '" is overdue (was scheduled at ' . Carbon::parse($project->scheduled_at)->format('M j, Y g:i A') . ')',
                'is_read' => false,
                'notified_at' => now(),
            ]);
        }
    }
})->everyMinute();
