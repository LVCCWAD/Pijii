<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Stage extends Model
{
    protected $fillable = [
        'stage_name',
    ];

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'stage_id', 'stage_id');
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'stage_id', 'stage_id');
    }
}
