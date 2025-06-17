<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NavController extends Controller
{
    public function archived()
    {
        $projects = Project::whereNotNull('archived_at')
            ->with('category', 'stage')
            ->where('created_by', Auth::id())
            ->orderBy('archived_at', 'desc')
            ->get();

        return inertia('Archived', [
            'projects' => $projects
        ]);
    }

    public function recentlyDeleted()
    {
        $projects = Project::onlyTrashed()
            ->with('category', 'stage')
            ->where('created_by', Auth::id())
            ->orderBy('deleted_at', 'desc')
            ->get();

        return inertia('Deleted', [
            'projects' => $projects
        ]);
    }
}
