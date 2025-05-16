@extends('layouts.app')

@section('content')
<div class="max-w-md mx-auto bg-white p-8 rounded shadow text-center">

    <h1 class="text-3xl font-bold mb-6">My Profile</h1>

    <img src="{{ asset($user->avatar) }}" alt="Avatar" class="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-2 border-gray-300">

    <p class="text-2xl font-semibold mb-1">{{ $user->name }}</p>
    <p class="text-gray-600 mb-2">{{ $user->email }}</p>

    @if ($user->email_verified_at)
        <p class="text-green-600 font-medium mb-6">Email Verified on {{ $user->email_verified_at->format('M d, Y') }}</p>
    @else
        <p class="text-red-600 font-medium mb-6">Email not verified</p>
    @endif

    <div class="mb-8 text-gray-700 space-y-2">
        <p><strong>Joined:</strong> {{ $user->created_at->format('M d, Y') }}</p>
        <p><strong>Last Updated:</strong> {{ $user->updated_at->format('M d, Y H:i') }}</p>
        
    </div>

    <div class="flex flex-col space-y-4">
        <a href="{{ route('user.edit') }}" 
           class="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Edit Profile
        </a>

        <form method="POST" action="{{ route('user.destroy') }}">
            @csrf
            @method('DELETE')
            <button 
                class="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onclick="return confirm('Are you sure you want to delete your account? This action is irreversible.')"
            >
                Delete Account
            </button>
        </form>
    </div>
</div>
@endsection
