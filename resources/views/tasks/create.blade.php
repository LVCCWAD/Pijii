@extends('layouts.app')

@section('content')
<div class="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
    <h1 class="text-2xl font-bold mb-6">Create New Task</h1>

    <form action="{{ route('tasks.store', ['category' => $project->category_id, 'project' => $project->id]) }}" method="POST">
        @csrf

        <!-- Title -->
        <div class="mb-4">
            <label for="title" class="block font-medium text-gray-700">Title</label>
            <input type="text" name="title" id="title" value="{{ old('title') }}"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            @error('title')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <!-- Description -->
        <div class="mb-4">
            <label for="description" class="block font-medium text-gray-700">Description</label>
            <textarea name="description" id="description" rows="4"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">{{ old('description') }}</textarea>
            @error('description')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <!-- Stage -->
        <div class="mb-4">
            <label for="stage_id" class="block font-medium text-gray-700">Stage</label>
            <select name="stage_id" id="stage_id" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="">Select Stage</option>
                @foreach ($stages as $stage)
                    <option value="{{ $stage->id }}" {{ old('stage_id') == $stage->id ? 'selected' : '' }}>
                        {{ ucwords(str_replace('_', ' ', $stage->stage_name)) }}
                    </option>
                @endforeach
            </select>
            @error('stage_id')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <!-- Priority Level -->
        <div class="mb-4">
            <label for="priority_level" class="block font-medium text-gray-700">Priority Level</label>
            <select name="priority_level" id="priority_level" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="">Select Priority</option>
                @foreach (['low', 'medium', 'high'] as $level)
                    <option value="{{ $level }}" {{ old('priority_level') == $level ? 'selected' : '' }}>
                        {{ ucfirst($level) }}
                    </option>
                @endforeach
            </select>
            @error('priority_level')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <!-- Scheduled At -->
        <div class="mb-4">
            <label for="scheduled_at" class="block font-medium text-gray-700">Scheduled At</label>
            <input type="datetime-local" name="scheduled_at" id="scheduled_at" value="{{ old('scheduled_at') }}"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            @error('scheduled_at')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <!-- Submit -->
        <div class="mt-6">
            <button type="submit"
                    class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Create Task
            </button>
        </div>
    </form>
</div>
@endsection
