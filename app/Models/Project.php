<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Project extends Model
{
    protected $fillable = [
        'project_name', 
        'priority_level', 
        'scheduled_at', 
        'is_collaborative', 
        'created_by', 
        'parent_id', 
        'category_id', 
        'stage_id', 
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

    public function stage(): BelongsTo
    {
        return $this->belongsTo(Stage::class, 'stage_id', 'stage_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'project_id', 'project_id');
    }

    public function projectCollaborators(): HasMany
    {
        return $this->hasMany(ProjectCollaborator::class, 'project_id', 'project_id');
    }

    public function collaborators(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'project_collaborators', 'project_id', 'user_id')
                    ->withPivot('access_level', 'granted_by', 'granted_at')
                    ->withTimestamps();
    }
}
