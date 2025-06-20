<?php


namespace App\Http\Controllers;


use Carbon\Carbon;
use App\Models\Task;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Stage;
use App\Models\Project;
use App\Models\Category;
use App\Models\TaskReminder;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Events\EntityActionOccurred;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;


class TaskController extends Controller
{
    public function show(Category $category, Project $project, Task $task)
    {
        abort_unless($task->created_by === Auth::id(), 403);


        $task->load([
            'project.category',
            'project',
            'stage',
            'category',
            'createdBy',
            'project.parent',
        ]);


        $getAncestors = app('get_project_ancestors');
        $ancestors = $getAncestors($task->project?->parent);


        return inertia('Task_view', compact('task', 'ancestors', 'project', 'category'));
    }


    public function create(Category $category, Project $project)
    {
        abort_unless($project->created_by === Auth::id(),   403);
      
        $stages = Stage::all();
        $users = User::all();
        return inertia('Create/Task', compact('category', 'project', 'stages', 'users'));
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
            'minutes_before' => 'nullable|integer',
        ]);


        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'project_id' => $project->id,
            'stage_id' => $validated['stage_id'],
            'priority_level' => $validated['priority_level'],
            'scheduled_at' => $validated['scheduled_at'] ?? null,
            'created_by' => Auth::id(),
        ]);


        if (!empty($validated['scheduled_at']) && !empty($validated['minutes_before']))
        {
            info("Creating reminder: scheduled_at={$validated['scheduled_at']}, minutes_before={$validated['minutes_before']}");

            $scheduledAt = Carbon::parse($validated['scheduled_at']);
            $remindAt = $scheduledAt->copy()->subMinutes($validated['minutes_before']);


            if ($remindAt->greaterThan($scheduledAt)) {
                    info("Reminder invalid: remindAt > scheduledAt");

                return back()->withErrors(['minutes_before' => 'Reminder time cannot be after scheduled date'])->withInput();
            }


            $reminder = TaskReminder::create([
                'task_id' => $task->id,
                'user_id' => Auth::id(),
                'minutes_before' => $validated['minutes_before'],
                'remind_at' => $remindAt,
            ]);

            info("Reminder created: remind_at={$reminder->remind_at}");
        } else {
            info("No reminder created: scheduled_at=" . var_export($validated['scheduled_at'], true) . ", minutes_before=" . var_export($validated['minutes_before'], true));
        }


        EntityActionOccurred::dispatch(
            Auth::id(),
            'Task',
            $task->id,
            'created'
        );


        session()->flash('success', 'Task created successfully.');


        return Inertia::location(route('projects.show', ['category' => $category->id, 'project' => $project->id]));
    }

    public function edit(Category $category, Project $project, Task $task)
    {
        abort_unless($task->created_by === Auth::id(), 403);

        $stages = Stage::all();
        $users = User::all();
        $task->load(['project.category', 'project.parent', 'taskReminders']);

        return inertia('Edit/Task', compact('task', 'category', 'project', 'stages', 'users'));
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
            'minutes_before' => 'nullable|integer',


        ]);


        $task->update([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'stage_id' => $validated['stage_id'],
            'created_by' => Auth::id(),
            'priority_level' => $validated['priority_level'],
            'scheduled_at' => $validated['scheduled_at'] ?? null,
        ]);


        if (!empty($validated['scheduled_at']) && !empty($validated['minutes_before'])) {
            $scheduledAt = Carbon::parse($validated['scheduled_at']);
            $remindAt = $scheduledAt->copy()->subMinutes($validated['minutes_before']);

            if ($remindAt->greaterThan($scheduledAt)) {
                return back()->withErrors([
                    'minutes_before' => 'Reminder time cannot be after the scheduled date.',
                ])->withInput();
            }

            TaskReminder::create([
                'task_id' => $task->id,
                'user_id' => Auth::id(),
                'minutes_before' => $validated['minutes_before'],
                'remind_at' => $remindAt,
            ]);
        }

        EntityActionOccurred::dispatch(
            Auth::id(),
            'Task',
            $task->id,
            'updated'
        );


        session()->flash('success', 'Task updated.');


        return Inertia::location(route('tasks.show', ['category' => $category->id, 'project' => $project->id, 'task' => $task->id]));    
    }


    public function destroy(Category $category, Project $project, Task $task)
    {
        abort_unless($task->created_by === Auth::id(), 403);


        $taskId = $task->id;


        $task->delete();


        EntityActionOccurred::dispatch(
            Auth::id(),
            'Task',
            $taskId,
            'deleted'
        );


        session()->flash('success', 'Task deleted successfully.');


        return Inertia::location(route('projects.show', ['category' => $category, 'project' => $project]));
    }
}



