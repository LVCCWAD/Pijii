<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectReminder extends Model
{
    protected $fillable = [
        'project_id', 
        'user_id', 
        'minutes_before', 
        'remind_at', 
        'notified_at',
    ];

    protected $casts = [
        'remind_at' => 'datetime',
        'notified_at' => 'datetime',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
