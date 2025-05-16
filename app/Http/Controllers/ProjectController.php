<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Category;
use App\Models\Stage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $projects = Project::with(['category', 'stage', 'createdBy'])
            ->orderByRaw('scheduled_at IS NULL')
            ->orderBy('scheduled_at')
            ->get();
    
        $categories = Category::all();

        return view('projects.index', compact('projects', 'categories'));
    }

    public function create()
    {
        $categories = Category::all();
        $stages = Stage::all();
        $parentProjects = Project::all();

        return view('projects.create', compact('categories', 'stages', 'parentProjects'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'stage_id' => 'required|exists:stages,id',
            'priority_level' => 'required|in:low,medium,high',
            'scheduled_at' => 'nullable|date',
            'parent_id' => 'nullable|exists:projects,id',
        ]);

        $validated['created_by'] = Auth::id();
        $validated['is_collaborative'] = $request->has('is_collaborative');

        Project::create($validated);

        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    }

    public function show($projectId)
    {
        $project = Project::with([
            'tasks.stage',
            'children.stage',
            'stage',
            'category',
            'createdBy',
            'parent'
        ])->findOrFail($projectId);
        
        $ancestors = [];
        $current = $project->parent;

        while ($current) {
        $ancestors[] = $current;
        $current = $current->parent;
        }

        $ancestors = array_reverse($ancestors);
        $categories = Category::all();

        return view('projects.show', compact('project', 'ancestors', 'categories'));
    }

    public function edit($id)
    {
        $project = Project::with('children')->findOrFail($id);
        $categories = Category::all();
        $stages = Stage::all();
        $parentProjects = Project::where('id', '!=', $id)->get();

        return view('projects.edit', compact('project', 'categories', 'stages', 'parentProjects'));
    }


    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'project_name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'stage_id' => 'required|exists:stages,id',
            'priority_level' => 'required|in:low,medium,high',
            'scheduled_at' => 'nullable|date',
            'parent_id' => 'nullable|exists:projects,id',
        ]);

        $validated['is_collaborative'] = $request->has('is_collaborative');

        $project->update($validated);

        return redirect()->route('projects.show', $project->id)->with('success', 'Project updated successfully.');
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    }
}
