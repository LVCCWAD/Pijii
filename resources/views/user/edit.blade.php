@extends('layouts.app')

@section('content')
<div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div class="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <h1 class="text-3xl font-bold mb-6 text-center">Edit Profile</h1>

        @if(session('status'))
            <div class="mb-4 p-3 bg-green-100 text-green-700 rounded text-center">
                {{ session('status') }}
            </div>
        @endif

        <form method="POST" action="{{ route('user.update') }}" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <div class="mb-4">
                <label for="name" class="block font-semibold mb-1">Name</label>
                <input id="name" name="name" type="text"
                    value="{{ old('name', $user->name) }}"
                    class="w-full border rounded px-3 py-2 @error('name') border-red-500 @enderror"
                    required autofocus>
                @error('name')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-4">
                <label for="email" class="block font-semibold mb-1">Email</label>
                <input id="email" name="email" type="email"
                    value="{{ old('email', $user->email) }}"
                    class="w-full border rounded px-3 py-2 @error('email') border-red-500 @enderror"
                    required>
                @error('email')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-4">
                <label for="avatar" class="block font-semibold mb-1">Avatar Image</label>
                <input id="avatar" name="avatar" type="file"
                    accept="image/*"
                    class="w-full borderrounded px-3 py-2 @error('avatar') border-red-500 @enderror">
                @error('avatar')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <hr class="my-6">

            <div class="mb-4">
                <label for="password" class="block font-semibold mb-1">New Password</label>
                <input id="password" name="password" type="password"
                    class="w-full border rounded px-3 py-2 @error('password') border-red-500 @enderror"
                    autocomplete="new-password">
                @error('password')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-6">
                <label for="password_confirmation" class="block font-semibold mb-1">Confirm New Password</label>
                <input id="password_confirmation" name="password_confirmation" type="password"
                    class="w-full border border-gray-300 rounded px-3 py-2"
                    autocomplete="new-password">
            </div>

            <div class="flex justify-center space-x-4">
                <button type="submit"
                    class="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    Update Profile
                </button>
                <a href="{{ route('user.show') }}"
                    class="px-6 py-3 border border-gray-300 rounded hover:bg-gray-100 transition">
                    Cancel
                </a>
            </div>
        </form>
    </div>
</div>
@endsection
