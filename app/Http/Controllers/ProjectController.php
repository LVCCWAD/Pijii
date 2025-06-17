<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Stage;
use App\Models\Project;
use App\Models\Category;
use App\Models\TaskReminder;
use Illuminate\Http\Request;
use App\Events\EntityActionOccurred;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function index()
    {
        abort(403); 
    }

    public function create(Category $category)
    {
        abort_unless($category->user_id === Auth::id(), 403);
        
        $stages = Stage::all();
        $parentProjects = $category->projects()->where('created_by', Auth::id())->get();
        return inertia('Create/Project', compact('category', 'stages', 'parentProjects'));
    }

    public function store(Request $request, Category $category)
    {
        abort_unless($category->user_id === Auth::id(), 403);

        $request->merge([
            'parent_id' => $request->input('parent_id') ?: null,
        ]);
        $validated = $request->validate([
            'project_name' => 'required|string|max:255',
            'stage_id' => 'required|exists:stages,id',
            'priority_level' => 'required|in:low,medium,high',
            'scheduled_at' => 'nullable|date',
            'parent_id' => 'nullable|exists:projects,id',
        ]);

        $validated['created_by'] = Auth::id();
        $validated['category_id'] = $category->id;
        $validated['archived_at']  = null;
        
        $project = Project::create($validated);

        EntityActionOccurred::dispatch(
            Auth::id(),
            'Project',
            $project->id,
            'created'
        );

        session()->flash('success', 'Project created successfully.');

        return Inertia::location(route('projects.show', [
            'category' => $category->id,
            'project' => $project->id,
        ]));
    }

    public function show(Category $category, Project $project)
    {
        abort_unless(
            $project->created_by === Auth::id() || $project->is_collaborative,
            403
        );

        $project->load([
            'tasks.stage',
            'children.tasks.stage',
            'children.stage',
            'stage',
            'category',
            'createdBy',
            'parent'
        ]);

        $subprojects = $project->children()
            ->whereNull('deleted_at')
            ->whereNull('archived_at')
            ->get();    

        $getAncestors = app('get_project_ancestors');
        $ancestors = $getAncestors($project->parent);

        return inertia('Project_view', compact('project', 'ancestors', 'subprojects', 'category'));
    }

    public function edit(Category $category, Project $project)
    {
        abort_unless(
            $project->created_by === Auth::id() || $project->is_collaborative,
            403
        );

        $stages = Stage::all();
        $parentProjects = Project::where('id', '!=', $project->id)
            ->where('category_id', $project->category_id)
            ->get();

        return inertia('Edit/Project', compact('project', 'stages', 'category', 'parentProjects'));
    }

    public function update(Request $request, Category $category, Project $project)
    {
        abort_unless(
            $project->created_by === Auth::id() || $project->is_collaborative,
            403
        );

        $validated = $request->validate([
            'project_name' => 'required|string|max:255',
            'stage_id' => 'required|exists:stages,id',
            'priority_level' => 'required|in:low,medium,high',
            'scheduled_at' => 'nullable|date',
            'parent_id' => 'nullable|exists:projects,id',
        ]);

        $validated['is_collaborative'] = $request->has('is_collaborative');

        $project->update($validated);

        EntityActionOccurred::dispatch(
            Auth::id(),
            'Project',
            $project->id,
            'updated'
        );
        
        session()->flash('success', 'Project updated successfully.');

        return Inertia::location(route('projects.show', [
            'category' => $category->id,
            'project' => $project->id,
        ]));
    }

    public function archive($categoryId, $projectId)
    {
        $project = Project::where('category_id', $categoryId)->findOrFail($projectId);

        abort_unless($project->created_by === Auth::id(), 403);

        $archiveProjectTree = function ($proj) use (&$archiveProjectTree) {
            $proj->update(['archived_at' => now()]);

            foreach ($proj->children as $child) {
                $child->loadMissing('children'); 
                $archiveProjectTree($child);
            }
        };

        $archiveProjectTree($project);

        EntityActionOccurred::dispatch(
            Auth::id(),
            'Project',
            $project->id,
            'archived'
        );

        return back()->with('success', 'Project archived successfully.');
    }   

    public function unarchive($categoryId, $projectId)
    {
        $project = Project::with('children')->where('category_id', $categoryId)->findOrFail($projectId);

        abort_unless($project->created_by === Auth::id(), 403);

        $unarchiveTree = function ($proj) use (&$unarchiveTree) {
            $proj->update(['archived_at' => null]);

            foreach ($proj->children as $child) {
                $child->loadMissing('children');
                $unarchiveTree($child);
            }
        };

        $unarchiveTree($project);

        EntityActionOccurred::dispatch(
            Auth::id(),
            'Project',
            $project->id,
            'unarchived'
        );

        return back()->with('success', 'Project and all its subprojects unarchived.');
    }

    public function destroy(Category $category, Project $project)
    {
        abort_unless($project->created_by === Auth::id(), 403);

        $projectId = $project->id;

        if ($project->trashed()) {
            $project->tasks()->forceDelete();
            $project->children()->forceDelete();
            $project->forceDelete();
        } else {
            $project->delete();
        }

        EntityActionOccurred::dispatch(
            Auth::id(),
            'Project',
            $projectId,
            'deleted'
        );

        return redirect()->route('categories.show', $project->category_id)
            ->with('success', 'Project deleted successfully.');
    }

    public function restore($categoryId, $projectId)
    {
        $project = Project::withTrashed()->with('children')->where('category_id', $categoryId)->findOrFail($projectId);

        abort_unless($project->created_by === Auth::id(), 403);

        // Recursive restore function
        $restoreTree = function ($proj) use (&$restoreTree) {
            $proj->restore(); // restore project
            $proj->tasks()->withTrashed()->restore(); // restore all its tasks

            foreach ($proj->children()->withTrashed()->get() as $child) {
                $restoreTree($child);
            }
        };

        $restoreTree($project);

        EntityActionOccurred::dispatch(
            Auth::id(),
            'Project',
            $project->id,
            'restored'
        );

        return redirect()->route('categories.show', $project->category_id)
            ->with('success', 'Project and all subprojects/tasks restored.');
    }
}
