<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;

class TaskPolicy
{
    /**
     * View any tasks (not used in your case).
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * View a task.
     * Anyone who:
     * - created it,
     * - is a direct task collaborator,
     * - or is a project collaborator (if the project is collaborative),
     * can view it.
     */
    public function view(User $user, Task $task): bool
    {
        if ($task->created_by === $user->id) {
            return true;
        }

        if ($task->taskCollaborators()->where('user_id', $user->id)->exists()) {
            return true;
        }

        if (
            $task->project &&
            $task->project->is_collaborative &&
            $task->project->projectCollaborators()->where('user_id', $user->id)->exists()
        ) {
            return true;
        }

        return false;
    }

    /**
     * Creating a task isn't restricted by this policy (handled by route/controller logic).
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * User can update a task if:
     * - they created it,
     * - or have editor access as a task or project collaborator.
     */
    public function update(User $user, Task $task): bool
    {
        if ($task->created_by === $user->id) {
            return true;
        }

        if (
            $task->taskCollaborators()
                ->where('user_id', $user->id)
                ->where('access_level', 'editor')
                ->exists()
        ) {
            return true;
        }

        if (
            $task->project &&
            $task->project->is_collaborative &&
            $task->project->projectCollaborators()
                ->where('user_id', $user->id)
                ->where('access_level', 'editor')
                ->exists()
        ) {
            return true;
        }

        return false;
    }

    /**
     * Delete permissions same as update.
     */
    public function delete(User $user, Task $task): bool
    {
        return $this->update($user, $task);
    }

    /**
     * Optional: if you plan to allow restoring soft-deleted tasks.
     */
    public function restore(User $user, Task $task): bool
    {
        return false;
    }

    /**
     * Optional: for force-deleting tasks.
     */
    public function forceDelete(User $user, Task $task): bool
    {
        return false;
    }

    /**
     * Optional: custom method if you want users to comment (viewer + commenter + editor).
     */
    public function comment(User $user, Task $task): bool
    {
        if ($task->created_by === $user->id) {
            return true;
        }

        if (
            $task->taskCollaborators()
                ->where('user_id', $user->id)
                ->whereIn('access_level', ['commenter', 'editor'])
                ->exists()
        ) {
            return true;
        }

        if (
            $task->project &&
            $task->project->is_collaborative &&
            $task->project->projectCollaborators()
                ->where('user_id', $user->id)
                ->whereIn('access_level', ['commenter', 'editor'])
                ->exists()
        ) {
            return true;
        }

        return false;
    }
}
