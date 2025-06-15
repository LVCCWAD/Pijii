<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Task;
use App\Models\User;
use App\Models\Stage;
use App\Models\Project;
use App\Models\Category;
use App\Models\TaskReminder;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function show(Category $category, Project $project, Task $task)
    {
        abort_unless($task->created_by === Auth::id() || $task->is_collaborative, 403);

        $task->load([
            'project.stage',
            'stage',
            'category',
            'createdBy',
            'project.parent',
        ]);

        $getAncestors = app('get_project_ancestors');
        $ancestors = $getAncestors($task->project?->parent);

        return view('tasks.show', compact('task', 'ancestors'));
    }

    public function create(Category $category, Project $project)
    {
        abort_unless($project->created_by === Auth::id(), 403);

        $stages = Stage::all();
        $users = User::all(); 
        return view('tasks.create', compact('category', 'project', 'stages', 'users'));
    }

    public function store(Request $request, Category $category, Project $project)
    {
        abort_unless($project->created_by === Auth::id(), 403);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'stage_id' => 'required|exists:stages,id',
            'priority_level' => ['required', Rule::in(['low', 'medium', 'high'])],
            'scheduled_at' => 'nullable|date',
            'minutes_before' => ['nullable', Rule::in([30, 60, 180, 1440, 2880])],
        ]);

        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'project_id' => $project->id,
            'stage_id' => $validated['stage_id'],
            'priority_level' => $validated['priority_level'],
            'scheduled_at' => $validated['scheduled_at'] ?? null,
            'is_collaborative' => $request->boolean('is_collaborative'),
            'created_by' => Auth::id(),
        ]);

        if ($validated['scheduled_at'] && isset($validated['minutes_before'])) {
            TaskReminder::create([
                'task_id' => $task->id,
                'user_id' => Auth::id(),
                'minutes_before' => $validated['minutes_before'],
                'remind_at' => Carbon::parse($validated['scheduled_at'])->subMinutes($validated['minutes_before']),
            ]);
        }

        return redirect()->route('projects.show', ['category' => $category->id, 'project' => $project->id])
        ->with('success', 'Task created successfully.');
    }

    public function edit(Category $category, Project $project, Task $task)
    {
        abort_unless($task->created_by === Auth::id(), 403);

        $stages = Stage::all();
        return view('tasks.edit', compact('task', 'category', 'project', 'stages'));
    }

    public function update(Request $request, Category $category, Project $project, Task $task)
    {
        abort_unless($task->created_by === Auth::id(), 403);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'stage_id' => 'required|exists:stages,id',
            'priority_level' => ['required', Rule::in(['low', 'medium', 'high'])],
            'scheduled_at' => 'nullable|date',
            'is_collaborative' => 'nullable|boolean',
        ]);

        $task->update([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'stage_id' => $validated['stage_id'],
            'priority_level' => $validated['priority_level'],
            'scheduled_at' => $validated['scheduled_at'] ?? null,
            'is_collaborative' => $request->boolean('is_collaborative'),
        ]);

        return redirect()->route('projects.show', ['category' => $category->id, 'project' => $project->id])
        ->with('success', 'Task updated.');
    }

    public function destroy(Category $category, Project $project, Task $task)
    {
        abort_unless($task->created_by === Auth::id(), 403);

        $task->delete();
        return redirect()->route('projects.show', ['category' => $category, 'project' => $project, 'task' => $task])->with('success', 'Task deleted.');
    }
}
