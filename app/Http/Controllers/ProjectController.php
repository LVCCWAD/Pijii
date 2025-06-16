<?php

namespace App\Http\Controllers;

use App\Models\Stage;
use App\Models\Project;
use App\Models\Category;
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
        return view('projects.create', compact('category', 'stages', 'parentProjects'));
    }

    public function store(Request $request, Category $category)
    {
        abort_unless($category->user_id === Auth::id(), 403);
        $validated = $request->validate([
            'project_name' => 'required|string|max:255',
            'stage_id' => 'required|exists:stages,id',
            'priority_level' => 'required|in:low,medium,high',
            'scheduled_at' => 'nullable|date',
            'parent_id' => 'nullable|exists:projects,id',
        ]);

        $validated['created_by'] = Auth::id();
        $validated['category_id'] = $category->id;
        $validated['is_collaborative'] = $request->has('is_collaborative');

        $project = Project::create($validated);

        EntityActionOccurred::dispatch(
            Auth::id(),
            'Project',
            $project->id,
            'created'
        );

        return redirect()->route('categories.show', ['category' => $category, 'project_id' => $project->id])
            ->with('success', 'Project created successfully.');
    }

    public function show(Category $category, Project $project)
    {
        abort_unless(
            $project->created_by === Auth::id() || $project->is_collaborative,
            403
        );

        $project->load([
            'tasks.stage',
            'children.stage',
            'stage',
            'category',
            'createdBy',
            'parent'
        ]);

        $getAncestors = app('get_project_ancestors');
        $ancestors = $getAncestors($project->parent);

        return view('projects.show', compact('project', 'ancestors'));
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

        return view('projects.edit', compact('project', 'stages', 'category', 'parentProjects'));
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

        return redirect()->route('projects.show', [
            'category' => $category->id,
            'project' => $project->id,
        ])->with('success', 'Project updated successfully.');
    }

    public function destroy(Category $category, Project $project)
    {
        abort_unless($project->created_by === Auth::id(), 403);

        $projectId = $project->id;

        $project->tasks()->delete(); 
        $project->delete();

        EntityActionOccurred::dispatch(
            Auth::id(),
            'Project',
            $projectId,
            'deleted'
        );

        return redirect()->route('categories.show', $project->category_id)
            ->with('success', 'Project deleted successfully.');
    }
}
