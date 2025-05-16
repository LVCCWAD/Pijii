@extends('layouts.app')

@section('content')
    <div class="flex items-center justify-center min-h-screen bg-amber-50 py-10">
        <div class="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
            <h1 class="text-2xl font-bold text-amber-700 mb-6">Category: {{ $category->name }}</h1>

            <div class="mb-6">
                <h2 class="text-xl font-semibold text-gray-700 mb-4">Projects in this Category</h2>

                @if ($projects->isEmpty())
                    <p class="text-gray-500 italic">No projects in this category yet.</p>
                @else
                    <ul class="space-y-4">
                        @foreach ($projects as $project)
                            <li class="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow transition">
                                <a href="{{ route('projects.show', $project->id) }}" class="text-amber-700 font-semibold hover:underline">
                                    {{ $project->project_name }}
                                </a>
                                <div class="text-sm text-gray-600">Priority: {{ $project->priority_level }}</div>
                            </li>
                        @endforeach
                    </ul>
                @endif
            </div>

            <a href="{{ route('categories.index') }}" class="text-sm text-blue-600 hover:underline">← Back to Categories</a>
        </div>
    </div>
@endsection
