@extends('layouts.app')

@section('content')
<div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">My Tasks</h1>

    @php
        $stages = ['to_do', 'in_progress', 'completed', 'on_hold'];
        $stageLabels = [
            'to_do' => 'To Do',
            'in_progress' => 'In Progress',
            'completed' => 'Completed',
            'on_hold' => 'On Hold',
        ];
    @endphp

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        @foreach ($stages as $stage)
            <div class="bg-gray-100 p-4 rounded shadow">
                <h2 class="font-semibold mb-4">{{ $stageLabels[$stage] }}</h2>

                @php
                    $filteredTasks = $tasks->filter(function ($task) use ($stage) {
                        return optional($task->stage)->stage_name === $stage;
                    })->sortBy(function ($task) {
                        return $task->scheduled_at ?? now()->addYear();
                    });
                @endphp

                @forelse ($filteredTasks as $task)
                    <div class="bg-white p-3 mb-3 rounded shadow-sm">
                        <div class="font-medium text-lg">{{ $task->title }}</div>
                        <div class="text-gray-700 mb-1">{{ $task->description }}</div>
                        <div class="text-sm text-gray-600 font-semibold mb-1">
                            Project: {{ $task->project->project_name ?? 'No Project' }}
                        </div>
                        <div class="text-sm text-gray-600 font-semibold mb-1">
                            Category: {{ $task->project->category->name }}
                        </div>
                        <div class="text-xs text-gray-500 mb-2">
                            Scheduled: {{ $task->scheduled_at ? $task->scheduled_at->format('M d, Y') : 'No date' }}
                        </div>
                        <div class="flex space-x-3 text-sm">
                            <a href="{{ route('tasks.edit', $task) }}" class="text-blue-600 hover:underline">Edit</a>
                            <form action="{{ route('tasks.delete', $task) }}" method="POST" onsubmit="return confirm('Delete this task?')" class="inline">
                                @csrf
                                @method('DELETE')
                                <button class="text-red-600 hover:underline">Delete</button>
                            </form>
                        </div>
                    </div>
                @empty
                    <p class="text-gray-500 text-sm">No tasks here.</p>
                @endforelse
            </div>
        @endforeach
    </div>
</div>
@endsection
