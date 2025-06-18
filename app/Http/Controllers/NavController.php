<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NavController extends Controller
{
    public function archived()
    {
        $projects = Project::whereNotNull('archived_at')
            ->with('category', 'stage')
            ->where('created_by', Auth::id())
            ->orderBy('archived_at', 'desc')
            ->get();

        return inertia('Archived', [
            'projects' => $projects
        ]);
    }

    public function recentlyDeleted()
    {
        $projects = Project::onlyTrashed()
            ->with('category', 'stage')
            ->where('created_by', Auth::id())
            ->orderBy('deleted_at', 'desc')
            ->get();

        return inertia('Deleted', [
            'projects' => $projects
        ]);
    }
    public function urgent()
    {
        $userId = Auth::id();

        $urgentProjects = Project::where('created_by', $userId)
            ->whereNotNull('scheduled_at')
            ->whereHas('stage', function ($query) {
                $query->whereNotIn('stage_name', ['completed', 'on_hold']);
            })
            ->with(['category', 'stage'])
            ->orderBy('scheduled_at', 'asc')
            ->get();

        $urgentTasks = Task::where('created_by', $userId)
            ->whereNotNull('scheduled_at')
            ->whereHas('stage', function ($query) {
                $query->whereNotIn('stage_name', ['completed', 'on_hold']);
            })
            ->with(['project.category', 'stage'])
            ->orderBy('scheduled_at', 'asc')
            ->get();

        return inertia('Urgent', [
            'urgentProjects' => $urgentProjects,
            'urgentTasks' => $urgentTasks,
        ]);
    }

    public function settings()
    {
        return inertia('Settings', [
            'user' => Auth::user()
        ]);
    }

    public function landing()
    {
        return Inertia::render('Landing');
    }

    public function search(Request $request)
    {
        $search = $request->input('search', '');
        $userId = Auth::id();

        $categories = [];
        $projects = [];
        $tasks = [];

        if ($search !== '') {
            $categories = Category::where('name', 'like', "%{$search}%")->get();

            $projects = Project::where('created_by', $userId)
                ->where(function ($query) use ($search) {
                    $query->where('project_name', 'like', "%{$search}%");
                })
                ->with(['category', 'stage'])
                ->get();

           $tasks = Task::whereHas('project', function ($query) use ($userId) {
                $query->where('created_by', $userId);
            })
            ->where(function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('body', 'like', "%{$search}%");
            })
            ->with(['stage', 'project'])
            ->get();
        }

        return inertia('Search', [
            'search' => $search,
            'categories' => $categories,
            'projects' => $projects,
            'tasks' => $tasks,
        ]);
    }
}
