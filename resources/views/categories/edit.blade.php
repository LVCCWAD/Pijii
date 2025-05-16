@extends('layouts.app')

@section('content')
    <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 class="text-2xl font-semibold text-amber-700 mb-4">Edit Category</h1>

        <form action="{{ route('categories.update', $category->id) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="mb-4">
                <label for="name" class="block text-sm text-gray-700">Category Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value="{{ old('name', $category->name) }}" 
                    required 
                    class="w-full border rounded px-4 py-2 mt-1"
                >
            </div>

            <button type="submit" class="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg transition">
                Update Category
            </button>
        </form>

        <div class="mt-4 text-center">
            <a href="{{ route('categories.index') }}" class="text-sm text-blue-600 hover:underline">← Back to Categories</a>
        </div>
    </div>
@endsection
