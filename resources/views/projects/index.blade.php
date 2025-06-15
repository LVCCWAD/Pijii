@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-10">
    <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold text-amber-700">All Projects</h2>

        <a href="{{ route('projects.create') }}"
           class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
            + Create Project
        </a>
    </div>

    {{-- Projects grouped by Category --}}
    <div class="space-y-12">
        @foreach ($categories as $category)
            <div>
                <h3 class="text-2xl font-semibold text-amber-700 mb-4">{{ $category->name }}</h3>

                @php
                    $categoryProjects = $projects->where('category_id', $category->id);
                @endphp

                @if ($categoryProjects->isEmpty())
                    <p class="text-gray-500 italic">No projects in this category yet.</p>
                @else
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        @foreach ($categoryProjects as $project)
                            <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                                <h4 class="text-lg font-semibold text-gray-800 mb-1">
                                    {{ $project->project_name }}
                                </h4>

                                <p class="text-sm text-gray-600 mb-1">
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
                                        <a href="{{ route('projects.show', $project->parent->id) }}" class="text-amber-600 hover:text-amber-800 underline">
                                            {{ $project->parent->project_name }}
                                        </a>
                                    </p>
                                @endif

                                @if ($project->children && $project->children->count())
                                    <div class="mt-2">
                                        <p class="text-sm font-medium text-gray-700">Subprojects:</p>
                                        <ul class="list-disc pl-5 text-sm text-amber-700">
                                            @foreach ($project->children as $child)
                                                <li>
                                                    <a href="{{ route('projects.show', $child->id) }}" class="hover:underline">
                                                        {{ $child->project_name }}
                                                    </a>
                                                </li>
                                            @endforeach
                                        </ul>
                                    </div>
                                @endif

                                <div class="mt-4 flex justify-between items-center text-sm">
                                    <a href="{{ route('projects.show', $project) }}" class="text-amber-600 hover:underline">
                                        View Details
                                    </a>

                                    <form action="{{ route('projects.destroy', $project) }}" method="POST" 
                                          onsubmit="return confirm('Are you sure you want to delete this project?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="text-red-600 hover:underline">
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
</div>
@endsection
