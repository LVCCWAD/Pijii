@extends('layouts.app')

@section('content')
<div class="max-w-4xl mx-auto p-6 bg-white rounded shadow">

    <nav class="mb-6 text-sm text-gray-600">
        <a href="{{ route('categories.index') }}" class="hover:underline">Categories</a> 
        @if ($task->project->category)
            <a href="{{ route('categories.show', $task->project->category->id) }}" class="hover:underline">
                {{ $task->project->category->name }}
            </a> 
        @endif
        @foreach ($ancestors as $ancestor)
            <a href="{{ route('projects.show', $ancestor->id) }}" class="hover:underline">{{ $ancestor->name }}</a> /
        @endforeach
        <a href="{{ route('projects.show', $task->project->id) }}" class="hover:underline">{{ $task->project->name }}</a> /
        <span class="font-semibold">{{ $task->title }}</span>
    </nav>

    <h1 class="text-3xl font-bold mb-4">{{ $task->title }}</h1>

    <div class="mb-4 text-gray-700">
        <strong>Description:</strong>
        <p class="mt-1 whitespace-pre-line">{{ $task->description ?? 'No description provided.' }}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
            <p><strong>Project:</strong> 
                <a href="{{ route('projects.show', $task->project->id) }}" class="text-blue-600 hover:underline">
                    {{ $task->project->project_name }}
                </a>
            </p>
            <p><strong>Category:</strong> {{ $task->category ? $task->category->name : 'None' }}</p>
            <p><strong>Stage:</strong> {{ $task->stage->stage_name ?? $task->stage }}</p>
            <p><strong>Priority:</strong> {{ ucfirst($task->priority_level) }}</p>
            <p><strong>Scheduled At:</strong> {{ $task->scheduled_at ? $task->scheduled_at->format('M d, Y H:i') : 'Not scheduled' }}</p>
        </div>

        <div>
            <p><strong>Collaborative:</strong> {{ $task->is_collaborative ? 'Yes' : 'No' }}</p>
            <p><strong>Created By:</strong> {{ $task->createdBy->name ?? 'Unknown' }}</p>
            <p><strong>Created At:</strong> {{ $task->created_at->format('M d, Y H:i') }}</p>
            <p><strong>Last Updated:</strong> {{ $task->updated_at->format('M d, Y H:i') }}</p>
        </div>
    </div>

    <div>
        <a href="{{ route('tasks.edit', $task->id) }}" 
           class="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
           Edit Task
        </a>
        <a href="{{ route('showTasks') }}" 
           class="inline-block ml-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">
           Back to Tasks
        </a>
    </div>
</div>
@endsection
