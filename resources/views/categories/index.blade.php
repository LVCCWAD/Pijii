@extends('layouts.app')

@section('content')
    <div class="flex items-center justify-center min-h-screen bg-green-50 py-10">
        <div class="w-full max-w-6xl bg-white p-8 rounded-lg shadow-md space-y-8">
            <div class="flex justify-between items-center mb-4">
                <h1 class="text-3xl font-bold text-green-700">Your Categories</h1>

                <!-- Minimal Create Category Toggle -->
                <button onclick="document.getElementById('category-form').classList.toggle('hidden')" 
                    class="bg-green-600 text-white px-4 py-2 rounded-xxl hover:bg-green-700 transition">
                    +
                </button>
            </div>

            @if (session('success'))
                <div class="p-4 bg-green-100 text-green-800 rounded">
                    {{ session('success') }}
                </div>
            @endif

            <!-- Hidden Create Category Form -->
            <div id="category-form" class="hidden mb-6">
                <form action="{{ route('categories.store') }}" method="POST" class="flex gap-4 items-center">
                    @csrf
                    <input type="text" name="name" placeholder="New Category Name" required
                        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <button type="submit"
                        class="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition">
                        Create
                    </button>
                </form>
            </div>

            @if ($categories->isEmpty())
                <p class="text-gray-500 text-center">No categories yet.</p>
            @else
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    @foreach ($categories as $category)
                        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between">
                            <div>
                                <div class="flex justify-between items-center mb-2">
                                    <a href="{{ route('categories.show', $category->id) }}"
                                        class="text-xl text-green-700 font-semibold hover:underline">
                                        {{ $category->name }}
                                    </a>
                                    <div class="space-x-3">
                                        <a href="{{ route('categories.edit', $category->id) }}"
                                            class="text-blue-600 hover:underline text-sm">Edit</a>
                                        <form action="{{ route('categories.destroy', $category->id) }}" method="POST"
                                            class="inline" onsubmit="return confirm('Are you sure?')">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit"
                                                class="text-red-600 hover:underline text-sm">Delete</button>
                                        </form>
                                    </div>
                                </div>

                                <div class="space-y-4">
                                    <h2 class="text-lg font-semibold text-gray-700">Projects in this Category:</h2>

                                    @if ($category->projects->isEmpty())
                                        <p class="text-gray-500 italic">No projects in this category yet.</p>
                                    @else
                                        <ul class="space-y-2">
                                            @foreach ($category->projects as $project)
                                                <li class="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow transition">
                                                    <a href="{{ route('projects.show', $project->id) }}"
                                                        class="text-green-700 font-semibold hover:underline">
                                                        {{ $project->project_name }}
                                                    </a>
                                                    <div class="text-sm text-gray-600">Priority: {{ $project->priority_level }}</div>
                                                </li>
                                            @endforeach
                                        </ul>
                                    @endif
                                </div>
                            </div>

                            <!-- Create Project Button -->
                            <div class="mt-6">
                                <a href="{{ route('projects.create', ['category_id' => $category->id]) }}"
                                    class="inline-block w-full text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                                    + Create Project
                                </a>
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </div>

    <script>
        // Optionally auto-hide category form after submit (could be enhanced if needed)
        if (window.location.hash === '#category-created') {
            document.getElementById('category-form')?.classList.remove('hidden');
        }
    </script>
@endsection
