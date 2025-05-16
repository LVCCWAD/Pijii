@extends('layouts.app')

@section('content')
<div class="max-w-3xl mx-auto p-6 bg-white rounded shadow">
    <h1 class="text-2xl font-semibold mb-6">Edit Task</h1>

    @if ($errors->any())
        <div class="mb-4 p-4 bg-red-100 text-red-700 rounded">
            <ul class="list-disc list-inside">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('tasks.update', $task) }}" method="POST" class="space-y-6">
        @csrf
        @method('PUT')

        <!-- Title -->
        <div>
            <label for="title" class="block font-medium text-gray-700 mb-1">Title <span class="text-red-600">*</span></label>
            <input type="text" name="title" id="title" 
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value="{{ old('title', $task->title) }}" required maxlength="255" />
        </div>

        <!-- Description -->
        <div>
            <label for="description" class="block font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" id="description" rows="4"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">{{ old('description', $task->description) }}</textarea>
        </div>

        <!-- Project -->
        <div>
            <label for="project_id" class="block font-medium text-gray-700 mb-1">Project</label>
            <select name="project_id" id="project_id"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">-- Select Project --</option>
                @foreach ($projects as $project)
                    <option value="{{ $project->id }}" {{ old('project_id', $task->project_id) == $project->id ? 'selected' : '' }}>
                        {{ $project->name }}
                    </option>
                @endforeach
            </select>
        </div>

        <!-- Category -->
        <div>
            <label for="category_id" class="block font-medium text-gray-700 mb-1">Category</label>
            <select name="category_id" id="category_id"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">-- Select Category --</option>
                @foreach ($categories as $category)
                    <option value="{{ $category->id }}" {{ old('category_id', $task->category_id) == $category->id ? 'selected' : '' }}>
                        {{ $category->name }}
                    </option>
                @endforeach
            </select>
        </div>

        <!-- Stage -->
        <div>
            <label for="stage" class="block font-medium text-gray-700 mb-1">Stage <span class="text-red-600">*</span></label>
            <select name="stage" id="stage" required
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                @foreach (['to_do', 'in_progress', 'completed', 'on_hold'] as $stageOption)
                    <option value="{{ $stageOption }}" {{ old('stage', $task->stage) === $stageOption ? 'selected' : '' }}>
                        {{ ucwords(str_replace('_', ' ', $stageOption)) }}
                    </option>
                @endforeach
            </select>
        </div>

        <!-- Priority Level -->
        <div>
            <label for="priority_level" class="block font-medium text-gray-700 mb-1">Priority Level <span class="text-red-600">*</span></label>
            <select name="priority_level" id="priority_level" required
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                @foreach (['low', 'medium', 'high'] as $priority)
                    <option value="{{ $priority }}" {{ old('priority_level', $task->priority_level) === $priority ? 'selected' : '' }}>
                        {{ ucfirst($priority) }}
                    </option>
                @endforeach
            </select>
        </div>

        <!-- Scheduled At -->
        <div>
            <label for="scheduled_at" class="block font-medium text-gray-700 mb-1">Scheduled At</label>
            <input type="date" name="scheduled_at" id="scheduled_at"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value="{{ old('scheduled_at', optional($task->scheduled_at)->format('Y-m-d')) }}" />
        </div>

        <!-- Is Collaborative -->
        <div class="flex items-center space-x-2">
            <input type="checkbox" name="is_collaborative" id="is_collaborative" value="1" 
                {{ old('is_collaborative', $task->is_collaborative) ? 'checked' : '' }}
                class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label for="is_collaborative" class="font-medium text-gray-700">Is Collaborative</label>
        </div>

        <!-- Submit Button -->
        <div>
            <button type="submit"
                class="px-6 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition">
                Update Task
            </button>
            <a href="{{ route('showTasks') }}" class="ml-4 text-gray-600 hover:text-gray-900">Cancel</a>
        </div>
    </form>
</div>
@endsection
