@extends('layouts.app')

@section('content')
<div class="container mx-auto py-10 px-4">
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 class="text-3xl font-bold text-amber-700 mb-8">Edit Project</h1>

        {{-- Project Edit Form --}}
        <form action="{{ route('projects.update', ['category' => $category->id, 'project' => $project->id]) }}" method="POST" class="space-y-6">
            @csrf
            @method('PUT')

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                {{-- Project Name --}}
                <div>
                    <label for="project_name" class="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                    <input 
                        type="text" 
                        name="project_name" 
                        id="project_name" 
                        value="{{ old('project_name', $project->project_name) }}" 
                        required
                        class="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-amber-500"
                    >
                </div>

                {{-- Stage --}}
                <div>
                    <label for="stage_id" class="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                    <select 
                        name="stage_id" 
                        id="stage_id" 
                        required
                        class="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-amber-500"
                    >
                        <option value="">-- Select Stage --</option>
                        @foreach ($stages as $stage)
                            <option 
                                value="{{ $stage->id }}" 
                                @if(old('stage_id', $project->stage_id) == $stage->id) selected @endif
                            >
                                {{ ucfirst(str_replace('_', ' ', $stage->stage_name)) }}
                            </option>
                        @endforeach
                    </select>
                </div>

                {{-- Priority Level --}}
                <div>
                    <label for="priority_level" class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select 
                        name="priority_level" 
                        id="priority_level" 
                        required
                        class="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-amber-500"
                    >
                        @foreach (['low', 'medium', 'high'] as $level)
                            <option 
                                value="{{ $level }}" 
                                @if(old('priority_level', $project->priority_level) == $level) selected @endif
                            >
                                {{ ucfirst($level) }}
                            </option>
                        @endforeach
                    </select>
                </div>

                {{-- Scheduled At --}}
                <div>
                    <label for="scheduled_at" class="block text-sm font-medium text-gray-700 mb-1">Scheduled At</label>
                    <input 
                        type="datetime-local" 
                        name="scheduled_at" 
                        id="scheduled_at" 
                        value="{{ old('scheduled_at', optional($project->scheduled_at)->format('Y-m-d\TH:i')) }}" 
                        class="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-amber-500"
                    >
                </div>
            </div>

            {{-- Hidden Category --}}
            <input type="hidden" name="category_id" value="{{ $project->category_id }}">

            <div>
                <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded hover:bg-amber-700 transition">
                    Update Project
                </button>
            </div>
        </form>

        {{-- Subproject List --}}
        @if ($project->children->count())
            <div class="mt-12">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">Existing Subprojects</h2>
                <ul class="space-y-4">
                    @foreach ($project->children as $subproject)
                        <li class="bg-gray-50 border border-gray-200 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <h3 class="text-lg font-semibold text-amber-700">{{ $subproject->project_name }}</h3>
                                <p class="text-sm text-gray-600">
                                    Stage: {{ str_replace('_', ' ', $subproject->stage->stage_name ?? 'None') }}
                                </p>
                            </div>
                            <form 
                                action="{{ route('projects.destroy', ['category' => $category->id, 'project' => $subproject->id]) }}" 
                                method="POST" 
                                onsubmit="return confirm('Are you sure you want to delete this subproject?')"
                            >
                                @csrf
                                @method('DELETE')
                                <button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                                    Delete
                                </button>
                            </form>
                        </li>
                    @endforeach
                </ul>
            </div>
        @endif
    </div>
</div>
@endsection
    