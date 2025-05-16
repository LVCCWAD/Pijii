<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class);
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'created_by');
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    public function taskReminders(): HasMany
    {
        return $this->hasMany(TaskReminder::class);
    }

    public function logs(): HasMany
    {
        return $this->hasMany(Log::class);
    }

   public function taskCollaborations(): HasMany
    {
        return $this->hasMany(TaskCollaborator::class, 'user_id');
    }
    public function grantedTaskCollaborations(): HasMany
    {
        return $this->hasMany(TaskCollaborator::class, 'granted_by');
    }

    public function projectCollaborations(): HasMany 
    {
        return $this->hasMany(ProjectCollaborator::class, 'user_id');
    }

    public function grantedProjectCollaborations(): HasMany 
    {
        return $this->hasMany(ProjectCollaborator::class, 'granted_by');
    }
}
