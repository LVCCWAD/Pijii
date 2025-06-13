<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Task;
use App\Models\User;
use App\Models\Media;
use App\Models\Stage;
use App\Models\Project;
use App\Models\Category;
use App\Models\TaskReminder;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class TaskController extends Controller
{
    public function showTasks()
    {
        $tasks = Task::with(['project', 'category', 'createdBy', 'media', 'taskCollaborators'])
            ->where('created_by', Auth::id())
            ->orderBy('scheduled_at')
            ->get();

        return view('tasks.index', ['tasks' => $tasks]);
    }

    public function show($taskId)
    {
        $task = Task::with([
            'project.stage',
            'stage',
            'category',
            'createdBy',
            'project.parent',   
        ])->findOrFail($taskId);

        $getAncestors = app('get_project_ancestors');
        $ancestors = $getAncestors($task->project?->parent);
        
        $categories = Category::all();

        return view('tasks.show', compact('task', 'ancestors', 'categories'));
    }


    public function create()
    {
        $projects = Project::all();
        $categories = Category::all();
        $users = User::all();
        $stages = Stage::all();

        return view('tasks.create', compact('projects', 'categories', 'users', 'stages'));
    }
    
    public function store(Request $request)
    {
        $user = Auth::user();
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'project_id' => 'required|exists:projects,id',
            'stage_id' => 'required|exists:stages,id',
            'priority_level' => ['required', Rule::in(['low', 'medium', 'high'])],
            'scheduled_at' => 'nullable|date',
            'is_collaborative' => 'nullable|boolean',
            'minutes_before' => ['nullable', Rule::in([30, 60, 180, 1440, 2880])],
        ]);

        $task = Task::create(attributes: [
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'project_id' => $validated['project_id'],
            'stage_id' => $validated['stage_id'],
            'priority_level' => $validated['priority_level'],
            'scheduled_at' => $validated['scheduled_at'] ?? null,
            'is_collaborative' => $request->boolean('is_collaborative'),
            'created_by' => Auth::id(), 
        ]);

        if ($validated['scheduled_at'] && $request->filled('reminder_offset')) 
        {
            $reminderOffset = (int) $request->input('reminder_offset');

            $reminder = TaskReminder::create([
                'task_id' => $task->id,
                'user_id' => Auth::id(), 
                'minutes_before' => $reminderOffset,
                'remind_at' => Carbon::parse($validated['scheduled_at'])->subMinutes($reminderOffset),
            ]);
            
            
        }   

        return redirect()->route('tasks.show',compact('task'))->with('success', 'Task created with reminder.');
    }

    public function edit(Task $task)
    {
        $projects = Project::all();
        $categories = Category::all();
        $users = User::all();
        return view('tasks.edit', compact('task', 'projects', 'categories', 'users'));
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'project_id' => 'nullable|exists:projects,id',
            'stage' => 'required|in:to_do,in_progress,completed,on_hold',
            'priority_level' => 'required|in:low,medium,high',
            'scheduled_at' => 'nullable|date',
            'is_collaborative' => 'nullable|boolean',
        ]);

        $task->update([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'project_id' => $validated['project_id'] ?? null,
            'stage' => $validated['stage'],
            'priority_level' => $validated['priority_level'],
            'scheduled_at' => $validated['scheduled_at'] ? Carbon::parse($validated['scheduled_at']) : null,
            'is_collaborative' => $request->boolean('is_collaborative'),
        ]);

        return redirect()->route('showTasks')->with('success', 'Task updated successfully.');
    }

    public function delete(Task $task)
    {
        $task->delete();
        return redirect()->route('showTasks')->with('success', 'Task deleted successfully.');
    }

    // public function addMedia(Task $task, Request $request)
    // {
    //     $validated = $request->validate([
    //         'media_file' => 'required|file|mimes:jpeg,png,jpg,pdf,docx,txt|max:10240',
    //     ]);

    //     $mediaPath = $request->file('media_file')->store('task_media');

    //     $media = new Media([
    //         'file_path' => $mediaPath,
    //         'task_id' => $task->id,
    //     ]);

    //     $media->save();

    //     return redirect()->route('showTasks')->with('success', 'Media added to task.');
    // }


    // public function addCollaborator(Task $task, Request $request)
    // {
    //     $validated = $request->validate([
    //         'user_id' => 'required|exists:users,id',
    //         'access_level' => 'required|in:viewer,commenter,editor',
    //     ]);

    //     $userToAdd = User::findOrFail($validated['user_id']);
    //     $project = $task->project;

    //     if (!Gate::allows('can-be-task-collaborator', [$userToAdd, $project])) {
    //         return redirect()->back()->withErrors([
    //             'user_id' => 'This user is not a collaborator on the associated project.'
    //         ]);
    //     }

    //     TaskCollaborator::updateOrCreate(
    //         [
    //             'task_id' => $task->id,
    //             'user_id' => $userToAdd->id,
    //         ],
    //         [
    //             'access_level' => $validated['access_level'],
    //             'granted_by' => Auth::id(),
    //             'granted_at' => now(),
    //         ]
    //     );

    //     return redirect()->route('showTasks')->with('success', 'Collaborator added to task.');
    // }

    // public function removeCollaborator(Task $task, User $user)
    // {
    //     $task->taskCollaborators()->detach($user->id);

    //     return redirect()->route('showTasks')->with('success', 'Collaborator removed from task.');
    // }
}
