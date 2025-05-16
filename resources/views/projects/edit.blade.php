@extends('layouts.app')

@section('content')
<div class="container mx-auto p-6">
    <h1 class="text-3xl font-semibold text-amber-700 mb-6">Edit Project</h1>

    {{-- Main Project Edit Form --}}
    <form action="{{ route('projects.update', $project->id) }}" method="POST" class="mb-10">
        @csrf
        @method('PUT')

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block mb-1 text-sm font-medium">Project Name</label>
                <input type="text" name="project_name" value="{{ old('project_name', $project->project_name) }}"
                    class="w-full border rounded px-3 py-2" required>
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium">Stage</label>
                <select name="stage_id" class="w-full border rounded px-3 py-2" required>
                    <option value="">-- Select Stage --</option>
                    @foreach ($stages as $stage)
                        <option value="{{ $stage->id }}" @if(old('stage_id', $project->stage_id) == $stage->id) selected @endif>
                            {{ ucfirst(str_replace('_', ' ', $stage->stage_name)) }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium">Priority</label>
                <select name="priority_level" class="w-full border rounded px-3 py-2" required>
                    @foreach (['low', 'medium', 'high'] as $level)
                        <option value="{{ $level }}" @if(old('priority_level', $project->priority_level) == $level) selected @endif>
                            {{ ucfirst($level) }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium">Scheduled At</label>
                <input type="datetime-local" name="scheduled_at"
                    value="{{ old('scheduled_at', optional($project->scheduled_at)->format('Y-m-d\TH:i')) }}"
                    class="w-full border rounded px-3 py-2">
            </div>
        </div>

        {{-- Hidden category_id to satisfy validation --}}
        <input type="hidden" name="category_id" value="{{ $project->category_id }}">

        <button type="submit" class="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-amber-700">
            Update Project
        </button>
    </form>

    {{-- Subproject List --}}
    @if ($project->children->count())
        <div>
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Existing Subprojects</h2>
            <ul class="space-y-4">
                @foreach ($project->children as $subproject)
                    <li class="bg-white shadow p-4 rounded-md flex justify-between items-center">
                        <div>
                            <strong class="text-lg text-amber-700">{{ $subproject->project_name }}</strong>
                            <p class="text-sm text-gray-600">
                                Stage: {{ str_replace('_', ' ', $subproject->stage->stage_name ?? 'None') }}
                            </p>
                        </div>

                        <form action="{{ route('projects.destroy', $subproject->id) }}" method="POST"
                            onsubmit="return confirm('Are you sure you want to delete this subproject?')">
                            @csrf
                            @method('DELETE')
                            <button class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                                Delete
                            </button>
                        </form>
                    </li>
                @endforeach
            </ul>
        </div>
    @endif
</div>
@endsection
