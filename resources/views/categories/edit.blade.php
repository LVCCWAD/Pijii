@extends('layouts.app')

@section('content')
<div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
    <h1 class="text-2xl font-semibold text-amber-700 mb-6">Edit Category</h1>

    <form action="{{ route('categories.update', $category) }}" method="POST" novalidate>
        @csrf
        @method('PUT')

        {{-- Category Name --}}
        <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Category Name</label>
            <input 
                type="text" 
                name="name" 
                id="name" 
                value="{{ old('name', $category->name) }}" 
                required 
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            >
            @error('name')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        {{-- Submit Button --}}
        <div>
            <button type="submit" class="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md transition">
                Update Category
            </button>
        </div>
    </form>

    <div class="mt-6 text-center">
        <a href="{{ route('categories.index') }}" class="text-sm text-blue-600 hover:underline">← Back to Categories</a>
    </div>
</div>
@endsection
