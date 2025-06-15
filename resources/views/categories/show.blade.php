@extends('layouts.app')

@section('content')
<div class="flex items-center justify-center min-h-screen bg-amber-50 py-10">
    <div class="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">

        {{-- Category Title --}}
        <h1 class="text-2xl font-bold text-amber-700 mb-6">Category: {{ $category->name }}</h1>

        {{-- Projects Section --}}
        <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Projects in this Category</h2>

            @if ($projects->isEmpty())
                <p class="text-gray-500 italic">No projects in this category yet.</p>
            @else
                <ul class="space-y-4">
                    @foreach ($projects as $project)
                        <li class="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow transition flex justify-between items-center">
                            <div>
                                <a href="{{ route('projects.show', ['category' => $category, 'project' => $project]) }}" 
                                   class="text-amber-700 font-semibold hover:underline">
                                    {{ $project->project_name }}
                                </a>
                                <div class="text-sm text-gray-600">
                                    Priority: {{ ucfirst($project->priority_level) }}
                                </div>
                            </div>

                            {{-- Action Buttons --}}
                            <div class="flex items-center space-x-2">
                                {{-- Edit --}}
                                <a href="{{ route('projects.edit', ['category' => $category, 'project' => $project]) }}"
                                   class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                                    Edit
                                </a>

                                {{-- Delete --}}
                                <form action="{{ route('projects.destroy', ['category' => $category, 'project' => $project]) }}" method="POST"
                                      onsubmit="return confirm('Are you sure you want to delete this project?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                                        Delete
                                    </button>
                                </form>
                            </div>
                        </li>
                    @endforeach
                </ul>
            @endif
        </div>

        {{-- Back Link --}}
        <div class="text-center mt-6">
            <a href="{{ route('categories.index') }}" 
               class="text-sm text-blue-600 hover:underline">
                ← Back to Categories
            </a>
        </div>
    </div>
</div>
@endsection
