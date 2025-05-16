@extends('layouts.app')

@section('content')
    <div class="container mx-auto p-6">
        <h1 class="text-4xl font-semibold text-amber-700 text-center mb-6">{{ $project->project_name }}</h1>
        @if (!empty($ancestors) || $project->category)
            <div class="text-sm text-gray-600 text-center mb-4">
                <span class="font-semibold">Path:</span>

                @if ($project->category)
                    <span>{{ $project->category->name }}</span>
                @endif

                @foreach ($ancestors as $parent)
                    <span class="mx-1">→</span>
                    <a href="{{ route('projects.show', $parent->id) }}" class="text-amber-600 hover:underline">
                        {{ $parent->project_name }}
                    </a>
                @endforeach

                <span class="mx-1">→</span>
                <span class="font-semibold text-amber-700">{{ $project->project_name }}</span>
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

        @if ($project->children && $project->children->count())
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Sub-Projects:</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                @foreach ($project->children as $child)
                    <div class="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-xl font-semibold text-amber-700">{{ $child->project_name }}</h3>

                            {{-- Stage Indicator --}}
                            <div class="flex items-center space-x-2">
                                <span class="inline-block w-3 h-3 rounded-full {{ $stageColors[$child->stage->stage_name] ?? 'bg-gray-400' }}"></span>
                                <span class="text-sm text-gray-600 capitalize">
                                    {{ str_replace('_', ' ', $child->stage->stage_name) }}
                                </span>
                            </div>
                        </div>

                        <a href="{{ route('projects.show', $child->id) }}" class="inline-block mt-3 text-sm text-amber-600 hover:underline">
                            View Project →
                        </a>
                    </div>
                @endforeach
            </div>
        @endif

        <h2 class="text-2xl font-semibold text-gray-800 mb-4">All Tasks:</h2>
        <div class="flex gap-6 flex-wrap">
            @foreach (['to_do', 'in_progress', 'completed', 'on_hold'] as $stage)
                <div class="flex-1 min-w-[250px] p-4 bg-white shadow-lg rounded-lg">
                    <h3 class="text-lg font-semibold text-center text-white {{ $stageColors[$stage] ?? 'bg-gray-400' }} p-2 rounded-md mb-4">
                        {{ ucwords(str_replace('_', ' ', $stage)) }}
                    </h3>

                    @foreach ($project->tasks->where('stage.stage_name', $stage) as $task)
                        <div class="bg-white shadow-sm rounded-md p-4 mb-4 border border-gray-200">
                            <strong class="text-xl text-gray-800">{{ $task->title }}</strong>
                            <p class="text-sm text-gray-600 mt-2">{{ $task->description }}</p>
                            <p class="text-sm text-gray-500 mt-2"><strong>Priority:</strong> 
                                <span class="inline-block bg-amber-500 text-white rounded-full px-2 py-1 text-xs">
                                    {{ ucfirst($task->priority_level) }}
                                </span>
                            </p>
                            <div class="mt-2 text-xs text-gray-400">
                                <p><strong>Created:</strong> {{ $task->created_at->format('Y-m-d H:i') }}</p>
                                <p><strong>Last Updated:</strong> {{ $task->updated_at->format('Y-m-d H:i') }}</p>
                            </div>
                        </div>
                    @endforeach
                </div>
            @endforeach
        </div>
    </div>
@endsection
