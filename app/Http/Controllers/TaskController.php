<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Project;
use App\Models\Category;
use App\Models\User;
use App\Models\Media;

class TaskController extends Controller
{
    public function showTasks()
    {
        $tasks = Task::with(['project', 'category', 'createdBy', 'media', 'taskCollaborators'])->get();
        return view('tasks', ['tasks' => $tasks]);
    }


    public function create()
    {
        $projects = Project::all();
        $categories = Category::all();
        $users = User::all();
        return view('task-create', compact('projects', 'categories', 'users'));
    }


    public function edit(Task $task)
    {
        $projects = Project::all();
        $categories = Category::all();
        $users = User::all();
        return view('task-edit', compact('task', 'projects', 'categories', 'users'));
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'project_id' => 'nullable|exists:projects,id',
            'category_id' => 'nullable|exists:categories,id',
            'stage' => 'required|in:to_do,in_progress,completed,on_hold',
            'priority_level' => 'required|in:low,medium,high',
            'scheduled_at' => 'nullable|date',
            'is_collaborative' => 'nullable|boolean',
            'created_by' => 'required|exists:users,id',
        ]);

        Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'project_id' => $validated['project_id'] ?? null,
            'category_id' => $validated['category_id'] ?? null,
            'stage' => $validated['stage'],
            'priority_level' => $validated['priority_level'],
            'scheduled_at' => $validated['scheduled_at'] ? \Carbon\Carbon::parse($validated['scheduled_at']) : null,
            'is_collaborative' => $validated['is_collaborative'] ?? null,
            'created_by' => $validated['created_by'],
            'created_at' => now(),
        ]);

        return redirect()->route('showTasks')->with('success', 'Task created successfully.');
    }


    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'project_id' => 'nullable|exists:projects,id',
            'category_id' => 'nullable|exists:categories,id',
            'stage' => 'required|in:to_do,in_progress,completed,on_hold',
            'priority_level' => 'required|in:low,medium,high',
            'scheduled_at' => 'nullable|date',
            'is_collaborative' => 'nullable|boolean',
            'created_by' => 'required|exists:users,id',
        ]);

        $task->update([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'project_id' => $validated['project_id'] ?? null,
            'category_id' => $validated['category_id'] ?? null,
            'stage' => $validated['stage'],
            'priority_level' => $validated['priority_level'],
            'scheduled_at' => $validated['scheduled_at'] ? \Carbon\Carbon::parse($validated['scheduled_at']) : null,
            'is_collaborative' => $validated['is_collaborative'] ?? null,
            'created_by' => $validated['created_by'],
        ]);

        return redirect()->route('showTasks')->with('success', 'Task updated successfully.');
    }


    public function delete(Task $task)
    {
        $task->delete();
        return redirect()->route('showTasks')->with('success', 'Task deleted successfully.');
    }


    public function addMedia(Task $task, Request $request)
    {
        $validated = $request->validate([
            'media_file' => 'required|file|mimes:jpeg,png,jpg,pdf,docx,txt|max:10240',
        ]);

        $mediaPath = $request->file('media_file')->store('task_media');

        $media = new Media([
            'file_path' => $mediaPath,
            'task_id' => $task->id,
        ]);

        $media->save();

        return redirect()->route('showTasks')->with('success', 'Media added to task.');
    }


    public function addCollaborator(Task $task, Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $task->taskCollaborators()->attach($validated['user_id']);

        return redirect()->route('showTasks')->with('success', 'Collaborator added to task.');
    }

    public function removeCollaborator(Task $task, User $user)
    {
        $task->taskCollaborators()->detach($user->id);

        return redirect()->route('showTasks')->with('success', 'Collaborator removed from task.');
    }
}
