@extends('layouts.app')

@section('content')
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold text-amber-700">All Projects</h2>

        <!-- Create Project Button -->
        <a href="{{ route('projects.create') }}"
            class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 whitespace-nowrap">
            + Create Project
        </a>
    </div>

    <!-- Display Projects grouped by category -->
    <div class="space-y-10">
        @foreach ($categories as $category)
            <div>
                <h3 class="text-xl font-semibold text-amber-700 mb-4">{{ $category->name }}</h3>

                @php
                    $categoryProjects = $projects->where('category_id', $category->id);
                @endphp

                @if ($categoryProjects->isEmpty())
                    <p class="text-gray-500 italic">No projects in this category yet.</p>
                @else
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        @foreach ($categoryProjects as $project)
                            <div class="bg-white shadow-lg rounded-lg p-4">
                                <h4 class="text-lg font-semibold text-gray-900">{{ $project->project_name }}</h4>
                                
                                <p class="text-sm text-gray-600">
                                    Scheduled at: 
                                    @if ($project->scheduled_at)
                                        {{ $project->scheduled_at->format('Y-m-d H:i') }}
                                    @else
                                        <span class="italic text-gray-400">Not scheduled</span>
                                    @endif
                                </p>

                                <p class="text-xs text-gray-500">Created by: {{ $project->createdBy->name }}</p>
                                <p class="text-xs text-gray-500">Last updated: {{ $project->updated_at->format('Y-m-d H:i') }}</p>
                                <p class="text-xs text-gray-500">Stage: {{ $project->stage->stage_name }}</p>

                                @if ($project->parent)
                                    <p class="text-xs text-gray-500">
                                        Parent: 
                                        <a href="{{ route('projects.show', $project->parent->id) }}" class="text-amber-600 hover:text-amber-800">
                                            {{ $project->parent->project_name }}
                                        </a>
                                    </p>
                                @endif

                                @if ($project->children && $project->children->count())
                                    <div class="ml-4 mt-2">
                                        <strong class="text-sm text-gray-600">Subprojects:</strong>
                                        <ul class="list-disc pl-4">
                                            @foreach ($project->children as $child)
                                                <li>
                                                    <a href="{{ route('projects.show', $child->id) }}" class="text-amber-600 hover:text-amber-800">
                                                        {{ $child->project_name }}
                                                    </a>
                                                </li>
                                            @endforeach
                                        </ul>
                                    </div>
                                @endif

                                <div class="mt-4 flex items-center gap-4">
                                    <a href="{{ route('projects.show', $project->id) }}" class="text-amber-600 hover:text-amber-800 text-sm">
                                        View Details
                                    </a>

                                    <form action="{{ route('projects.destroy', $project->id) }}" method="POST" onsubmit="return confirm('Are you sure you want to delete this project?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="text-red-600 hover:text-red-800 text-sm">
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </div>
                        @endforeach
                    </div>
                @endif
            </div>
        @endforeach
    </div>
@endsection
