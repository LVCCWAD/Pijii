<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Events\EntityActionOccurred;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('projects')
            ->where('user_id', Auth::id())
            ->get();

        return view('categories.index', compact('categories'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
        ]);

        $category = Category::create([
            'name' => $validated['name'],
            'user_id' => Auth::id(),
        ]);

        EntityActionOccurred::dispatch(
            Auth::id(),
            'Category',
            $category->id,
            'created'
        );

        return redirect()
            ->route('categories.index')
            ->with('success', 'Category created successfully.');
    }

    public function show(Category $category)
    {
        abort_unless($category->user_id === Auth::id(), 403);

        $projects = $category->projects()
            ->where('created_by', Auth::id())
            ->get();

        return view('categories.show', compact('category', 'projects'));
    }

    public function edit(Category $category)
    {
        abort_unless($category->user_id === Auth::id(), 403);

        return view('categories.edit', compact('category'));
    }

    public function update(Request $request, Category $category)
    {
        abort_unless($category->user_id === Auth::id(), 403);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
        ]);

        $category->update($validated);

        EntityActionOccurred::dispatch(
            Auth::id(),
            'Category',
            $category->id,
            'updated'
        );

        return redirect()
            ->route('categories.index')
            ->with('success', 'Category updated successfully.');
    }

    public function destroy(Category $category)
    {
        abort_unless($category->user_id === Auth::id(), 403);

        $categoryId = $category->id;

        foreach ($category->projects as $project) {
            $project->tasks()->delete();
            $project->delete();
        }

        $category->delete();

        EntityActionOccurred::dispatch(
            Auth::id(),
            'Category',
            $categoryId,
            'deleted'
        );
        return redirect()
            ->route('categories.index')
            ->with('success', 'Category deleted successfully.');
    }
}
