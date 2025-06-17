<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'project_name', 
        'priority_level', 
        'scheduled_at', 
        'is_collaborative', 
        'created_by', 
        'parent_id', 
        'category_id', 
        'stage_id', 
        'archived_at'
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function stage(): BelongsTo
    {
        return $this->belongsTo(Stage::class, 'stage_id', 'id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    public function parent()
    {
        return $this->belongsTo(Project::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Project::class, 'parent_id');
    }

    public function projectCollaborators(): HasMany
    {
        return $this->hasMany(ProjectCollaborator::class);
    }

    public function logs(): MorphMany
    {
        return $this->morphMany(Log::class, 'entity');
    }
}
