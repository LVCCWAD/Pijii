@extends('layouts.app')

@section('content')
<div class="flex items-center justify-center min-h-screen bg-green-50 py-10">
    <div class="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">

        <h2 class="text-2xl font-semibold text-green-700 mb-6">Create New Project under {{ $category->name }} category</h2>

        <form method="POST" action="{{ route('projects.store', ['category' => $category->id]) }}">
            @csrf

            {{-- Hidden category_id --}}
            <input type="hidden" name="category_id" value="{{ $category->id }}">

            {{-- Project Name --}}
            <div class="mb-4">
                <label for="project_name" class="block text-sm font-medium text-gray-700">Project Name</label>
                <input 
                    type="text" 
                    name="project_name" 
                    id="project_name" 
                    value="{{ old('project_name') }}" 
                    required
                    class="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500"
                >
                @error('project_name')
                    <div class="text-red-500 text-xs mt-1">{{ $message }}</div>
                @enderror
            </div>

            {{-- Stage --}}
            <div class="mb-4">
                <label for="stage_id" class="block text-sm font-medium text-gray-700">Stage</label>
                <select 
                    name="stage_id" 
                    id="stage_id" 
                    required 
                    class="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500"
                >
                    <option value="">Select Stage</option>
                    @foreach ($stages as $stage)
                        <option 
                            value="{{ $stage->id }}" 
                            {{ old('stage_id') == $stage->id ? 'selected' : '' }}
                        >
                            {{ $stage->stage_name }}
                        </option>
                    @endforeach
                </select>
                @error('stage_id')
                    <div class="text-red-500 text-xs mt-1">{{ $message }}</div>
                @enderror
            </div>

            {{-- Priority Level --}}
            <div class="mb-4">
                <label for="priority_level" class="block text-sm font-medium text-gray-700">Priority Level</label>
                <select 
                    name="priority_level" 
                    id="priority_level" 
                    required 
                    class="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500"
                >
                    <option value="">Select Priority</option>
                    <option value="low" {{ old('priority_level') == 'low' ? 'selected' : '' }}>Low</option>
                    <option value="medium" {{ old('priority_level') == 'medium' ? 'selected' : '' }}>Medium</option>
                    <option value="high" {{ old('priority_level') == 'high' ? 'selected' : '' }}>High</option>
                </select>
                @error('priority_level')
                    <div class="text-red-500 text-xs mt-1">{{ $message }}</div>
                @enderror
            </div>

            {{-- Scheduled Date --}}
            <div class="mb-6">
                <label for="scheduled_at" class="block text-sm font-medium text-gray-700">Scheduled Date</label>
                <input 
                    type="date" 
                    name="scheduled_at" 
                    id="scheduled_at" 
                    value="{{ old('scheduled_at') }}" 
                    class="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500"
                >
                @error('scheduled_at')
                    <div class="text-red-500 text-xs mt-1">{{ $message }}</div>
                @enderror
            </div>

            {{-- Submit --}}
            <div>
                <button 
                    type="submit" 
                    class="w-full bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition"
                >
                    Create Project
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
