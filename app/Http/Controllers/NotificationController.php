<?php 

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Notification::with([
            'task.project.category:id,name',
            'project.category:id,name'
        ])
        ->where('user_id', Auth::id())
        ->orderByDesc('created_at')
        ->get();

        return inertia('Notifications', compact('notifications'));
    }


    public function markRead(Notification $notification)
    {
        $this->authorizeAccess($notification);

        $notification->update([
            'is_read' => true,
            'notified_at' => now(),
        ]);

        return redirect()->back()->with('status', 'Notification marked as read.');
    }

    public function markUnread(Notification $notification)
    {
        $this->authorizeAccess($notification);

        $notification->update([
            'is_read' => false,
            'notified_at' => null,
        ]);

        return redirect()->route('notifications.index')->with('status', 'Notification marked as unread.');
    }

    protected function authorizeAccess(Notification $notification)
    {
        abort_unless($notification->user_id === Auth::id(), 403);
    }
}
