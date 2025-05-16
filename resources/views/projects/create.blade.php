@extends('layouts.app')

@section('content')
    <div class="max-w-3xl mx-auto">
        <h2 class="text-2xl font-semibold text-green-700 mb-6">Create New Project</h2>

        <form action="{{ route('projects.store') }}" method="POST">
            @csrf

            <div class="mb-4">
                <label for="project_name" class="block text-sm font-medium text-gray-700">Project Name</label>
                <input type="text" name="project_name" id="project_name" class="w-full border border-gray-300 rounded-md p-2" value="{{ old('project_name') }}" required>
                @error('project_name')
                    <div class="text-red-500 text-xs mt-1">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="category_id" class="block text-sm font-medium text-gray-700">Category</label>
                <select name="category_id" id="category_id" class="w-full border border-gray-300 rounded-md p-2" required>
                    <option value="">Select Category</option>
                    @foreach ($categories as $category)
                        <option value="{{ $category->id }}" {{ old('category_id') == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                    @endforeach
                </select>
                @error('category_id')
                    <div class="text-red-500 text-xs mt-1">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="stage_id" class="block text-sm font-medium text-gray-700">Stage</label>
                <select name="stage_id" id="stage_id" class="w-full border border-gray-300 rounded-md p-2" required>
                    <option value="">Select Stage</option>
                    @foreach ($stages as $stage)
                        <option value="{{ $stage->id }}" {{ old('stage_id') == $stage->id ? 'selected' : '' }}>{{ $stage->stage_name }}</option>
                    @endforeach
                </select>
                @error('stage_id')
                    <div class="text-red-500 text-xs mt-1">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="priority_level" class="block text-sm font-medium text-gray-700">Priority Level</label>
                <select name="priority_level" id="priority_level" class="w-full border border-gray-300 rounded-md p-2" required>
                    <option value="low" {{ old('priority_level') == 'low' ? 'selected' : '' }}>Low</option>
                    <option value="medium" {{ old('priority_level') == 'medium' ? 'selected' : '' }}>Medium</option>
                    <option value="high" {{ old('priority_level') == 'high' ? 'selected' : '' }}>High</option>
                </select>
                @error('priority_level')
                    <div class="text-red-500 text-xs mt-1">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="scheduled_at" class="block text-sm font-medium text-gray-700">Scheduled Date</label>
                <input type="date" name="scheduled_at" id="scheduled_at" class="w-full border border-gray-300 rounded-md p-2" value="{{ old('scheduled_at') }}">
                @error('scheduled_at')
                    <div class="text-red-500 text-xs mt-1">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-6">
                <button type="submit" class="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-700">
                    Create Project
                </button>
            </div>
        </form>
    </div>
@endsection
