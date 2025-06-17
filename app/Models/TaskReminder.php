<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaskReminder extends Model
{
    protected $fillable = [
        'task_id', 
        'user_id', 
        'minutes_before', 
        'remind_at', 
        'notified_at',
    ];

    protected $casts = [
        'remind_at' => 'datetime',
        'notified_at' => 'datetime',
    ];

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
