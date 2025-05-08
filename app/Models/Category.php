<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = [
        'name',
    ];

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'category_id', 'category_id');
    }
    
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'category_id', 'category_id');
    }
}
