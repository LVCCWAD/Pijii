@extends('layouts.app')

@section('content')
<div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Edit Task</h1>

    <!-- Breadcrumb -->
    <p class="text-sm text-gray-500 mb-4">
        <a href="{{ route('categories.show', $task->project->category_id) }}" class="text-indigo-600 hover:underline">
            {{ $task->project->category->name }}
        </a>
        &raquo;
        <a href="{{ route('projects.show', ['category' => $task->project->category_id, 'project' => $task->project_id]) }}" class="text-indigo-600 hover:underline">
            {{ $task->project->project_name }}
        </a>
    </p>

    @if ($errors->any())
        <div class="mb-6 p-4 bg-red-100 text-red-700 rounded">
            <ul class="list-disc pl-5">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('tasks.update', ['category' => $task->project->category_id, 'project' => $task->project_id, 'task' => $task->id]) }}" method="POST" class="space-y-6 bg-white p-6 rounded shadow">
        @csrf
        @method('PUT')

        <!-- Title -->
        <div>
            <label for="title" class="block font-medium mb-1">Title <span class="text-red-600">*</span></label>
            <input
                type="text"
                name="title"
                id="title"
                value="{{ old('title', $task->title) }}"
                required
                maxlength="255"
                aria-invalid="{{ $errors->has('title') ? 'true' : 'false' }}"
                class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 @error('title') border-red-500 @enderror"
            >
            @error('title')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <!-- Description -->
        <div>
            <label for="description" class="block font-medium mb-1">Description</label>
            <textarea
                name="description"
                id="description"
                rows="4"
                class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 @error('description') border-red-500 @enderror"
            >{{ old('description', $task->description) }}</textarea>
            @error('description')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <!-- Stage -->
        <div>
            <label for="stage_id" class="block font-medium mb-1">Stage <span class="text-red-600">*</span></label>
            <select
                name="stage_id"
                id="stage_id"
                required
                aria-invalid="{{ $errors->has('stage_id') ? 'true' : 'false' }}"
                class="w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:ring-indigo-200 @error('stage_id') border-red-500 @enderror"
            >
                <option value="" disabled {{ old('stage_id', $task->stage_id) ? '' : 'selected' }}>-- Select Stage --</option>
                @foreach ($stages as $stage)
                    <option value="{{ $stage->id }}" {{ old('stage_id', $task->stage_id) == $stage->id ? 'selected' : '' }}>
                        {{ ucfirst(str_replace('_', ' ', $stage->stage_name)) }}
                    </option>
                @endforeach
            </select>
            @error('stage_id')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <!-- Priority Level -->
        <div>
            <label for="priority_level" class="block font-medium mb-1">Priority Level <span class="text-red-600">*</span></label>
            <select
                name="priority_level"
                id="priority_level"
                required
                aria-invalid="{{ $errors->has('priority_level') ? 'true' : 'false' }}"
                class="w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:ring-indigo-200 @error('priority_level') border-red-500 @enderror"
            >
                @foreach (['low', 'medium', 'high'] as $level)
                    <option value="{{ $level }}" {{ old('priority_level', $task->priority_level) === $level ? 'selected' : '' }}>
                        {{ ucfirst($level) }}
                    </option>
                @endforeach
            </select>
            @error('priority_level')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <!-- Scheduled At -->
        <div>
            <label for="scheduled_at" class="block font-medium mb-1">Scheduled At</label>
            <input
                type="datetime-local"
                name="scheduled_at"
                id="scheduled_at"
                value="{{ old('scheduled_at', optional($task->scheduled_at)->format('Y-m-d\TH:i')) }}"
                class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 @error('scheduled_at') border-red-500 @enderror"
            >
            @error('scheduled_at')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <!-- Is Collaborative -->
        <div class="flex items-center space-x-2">
            <input
                type="checkbox"
                name="is_collaborative"
                id="is_collaborative"
                value="1"
                {{ old('is_collaborative', $task->is_collaborative) ? 'checked' : '' }}
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-500 rounded"
            >
            <label for="is_collaborative" class="font-medium select-none">Is Collaborative</label>
        </div>

        <!-- Submit Buttons -->
        <div class="flex items-center space-x-4">
            <button type="submit" class="bg-indigo-600 text-white font-semibold px-6 py-2 rounded hover:bg-indigo-700 transition">
                Update Task
            </button>
            <a href="{{ route('tasks.show', ['category' => $task->project->category_id, 'project' => $task->project_id, 'task' => $task->id]) }}" class="text-gray-600 hover:text-gray-900">Cancel</a>
        </div>
    </form>
</div>
@endsection
