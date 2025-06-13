@extends('layouts.app')

@section('content')
<div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Your Notifications</h1>

    @if(session('status'))
        <div class="mb-4 p-3 bg-green-100 text-green-800 rounded">
            {{ session('status') }}
        </div>
    @endif

    @if($notifications->isEmpty())
        <p class="text-gray-600">You have no notifications.</p>
    @else
        <ul class="space-y-4">
            @foreach ($notifications as $notification)
                <li class="p-4 border rounded shadow-sm {{ $notification->is_read ? 'bg-gray-100' : 'bg-white' }}">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-sm text-gray-500">
                                {{ $notification->created_at->diffForHumans() }}
                                @if($notification->is_read)
                                    · <span class="text-green-600">Read</span>
                                @else
                                    · <span class="text-red-600">Unread</span>
                                @endif
                            </p>
                            <p class="font-semibold">{{ $notification->message }}</p>
                        </div>
                        <form
                            action="{{ $notification->is_read ? route('notifications.markUnread', $notification) : route('notifications.markRead', $notification) }}"
                            method="POST"
                        >
                            @csrf
                            @method('PATCH')
                            <button
                                type="submit"
                                class="text-sm px-3 py-1 rounded 
                                    {{ $notification->is_read ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-blue-100 text-blue-800 hover:bg-blue-200' }}"
                            >
                                Mark as {{ $notification->is_read ? 'Unread' : 'Read' }}
                            </button>
                        </form>
                    </div>
                </li>
            @endforeach
        </ul>
    @endif
</div>
@endsection
