@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-4xl font-bold text-green-700 text-center w-full">{{ $project->project_name }}</h1>
    </div>

    <div class="flex justify-end mb-6">
        <a href="{{ route('tasks.create', ['category' => $project->category_id, 'project' => $project->id]) }}"
           class="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded hover:bg-green-700 shadow transition duration-150 ease-in-out">
            + Create Task
        </a>
    </div>

    {{-- Breadcrumb Path --}}
    @if (!empty($ancestors) || $project->category)
        <div class="text-center text-sm text-gray-600 mb-6">
            <span class="font-medium">Path:</span>

            @if ($project->category)
                <a href="{{ route('categories.show', ['category' => $project->category_id]) }}"
                   class="text-green-600 hover:underline">
                    {{ $project->category->name }}
                </a>
            @endif

            @foreach ($ancestors as $parent)
                <span class="mx-1">→</span>
                <a href="{{ route('projects.show', ['category' => $parent->category_id, 'project' => $parent->id]) }}" class="text-green-600 hover:underline">
                    {{ $parent->project_name }}
                </a>
            @endforeach

            <span class="mx-1">→</span>
            <span class="font-semibold text-green-700">{{ $project->project_name }}</span>
        </div>
    @endif

    @php
        $stageColors = [
            'to_do' => 'bg-blue-500',
            'in_progress' => 'bg-yellow-500',
            'completed' => 'bg-green-600',
            'on_hold' => 'bg-gray-500',
        ];
    @endphp

    {{-- Subprojects --}}
    @if ($project->children->count())
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Subprojects</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            @foreach ($project->children as $child)
                <div class="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-xl font-semibold text-green-700">{{ $child->project_name }}</h3>
                        <div class="flex items-center gap-2">
                            <span class="w-3 h-3 rounded-full {{ $stageColors[$child->stage->stage_name] ?? 'bg-gray-400' }}"></span>
                            <span class="text-sm text-gray-600 capitalize">
                                {{ str_replace('_', ' ', $child->stage->stage_name) }}
                            </span>
                        </div>
                    </div>
                    <a href="{{ route('projects.show', ['category' => $child->category, 'project' => $child]) }}" class="text-sm text-green-600 hover:underline">
                        View Project →
                    </a>
                </div>
            @endforeach
        </div>
    @endif

    {{-- Tasks by Stage --}}
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">All Tasks</h2>
    <div class="flex flex-wrap gap-6">
        @foreach (['to_do', 'in_progress', 'completed', 'on_hold'] as $stage)
            <div class="flex-1 min-w-[250px] p-4 bg-white shadow rounded-lg">
                <h3 class="text-lg font-semibold text-center text-white {{ $stageColors[$stage] ?? 'bg-gray-400' }} p-2 rounded-md mb-4">
                    {{ ucwords(str_replace('_', ' ', $stage)) }}
                </h3>

                @forelse ($project->tasks->where('stage.stage_name', $stage) as $task)
                    <div class="bg-white border border-gray-200 rounded-md p-4 mb-4 shadow-sm">
                        <a href="{{ route('tasks.show', ['category' => $project->category_id, 'project' => $project->id, 'task' => $task->id]) }}"
                           class="text-lg font-semibold text-green-700 hover:underline">
                            {{ $task->title }}
                        </a>
                        <p class="text-sm text-gray-600 mt-1">{{ $task->description }}</p>

                        <div class="mt-2">
                            <span class="text-xs font-medium text-gray-500">Priority:</span>
                            <span class="inline-block bg-green-500 text-white rounded-full px-2 py-0.5 text-xs">
                                {{ ucfirst($task->priority_level) }}
                            </span>
                        </div>

                        <div class="mt-2 text-xs text-gray-400">
                            <p><strong>Created:</strong> {{ $task->created_at->format('Y-m-d H:i') }}</p>
                            <p><strong>Updated:</strong> {{ $task->updated_at->format('Y-m-d H:i') }}</p>
                        </div>

                        <div class="mt-4 flex gap-2">
                            <a href="{{ route('tasks.edit', ['category' => $project->category_id, 'project' => $project->id, 'task' => $task->id]) }}"
                               class="text-sm text-yellow-600 hover:underline font-medium">
                                ✏️ Edit
                            </a>

                            <form action="{{ route('tasks.destroy', ['category' => $project->category_id, 'project' => $project->id, 'task' => $task->id]) }}"
                                  method="POST" onsubmit="return confirm('Are you sure you want to delete this task?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-sm text-red-600 hover:underline font-medium">
                                    🗑️ Delete
                                </button>
                            </form>
                        </div>
                    </div>
                @empty
                    <p class="text-sm text-gray-400 italic">No tasks in this stage.</p>
                @endforelse
            </div>
        @endforeach
    </div>
</div>
@endsection
