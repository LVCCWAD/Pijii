<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Stage;
use App\Models\Project;
use App\Models\Category;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Events\EntityActionOccurred;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
    public function showRegisterForm()
    {
        return inertia('Auth/Register');
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
    
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        event(new EntityActionOccurred(
            userId: $user->id,
            entityType: 'User',
            entityId: $user->id,
            action: 'User registered'
        ));

        event(new Registered($user));
        


        Auth::login($user);
    
        return redirect()->route(route: 'verification.notice')->with('success', 'Please verify your email address to complete registration.');
    }

    public function showLoginForm()
    {
        return inertia('Auth/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email',$credentials['email'])->first();

        if (Auth::attempt($credentials)) 
        {
            Auth::login($user);

            event(new EntityActionOccurred(
                userId: $user->id,
                entityType: 'User',
                entityId: $user->id,
                action: 'User logged in'
            ));

            return redirect()->intended(route('dashboard'))->with('success', "Welcome back!");
        }

        if (!$user)
        {
            return back()
            ->withInput($request->only('email'))
            ->withErrors([
                'email' => 'There is no existing account with this email address.'
            ]);
        }

        return back()
        ->withInput($request->only('email'))
        ->withErrors([
            'password' => 'Wrong password.'
        ]);
    }

    public function dashboard(Request $request)
    {

        $search = $request->input('search');
        $userId = Auth::id();

        if ($search) {
            $search = trim($search);

            $categories = Category::with(['projects' => function ($query) use ($search) {
                    $query->whereNull('deleted_at')
                        ->whereNull('parent_id')
                        ->whereNull('archived_at')
                        ->where(function ($q) use ($search) {
                            $q->where('name', 'LIKE', "%$search%")
                            ->orWhere('description', 'LIKE', "%$search%");
                        });
                }])
                ->where('user_id', $userId)
                ->where('name', 'LIKE', "%$search%")
                ->orderBy('scheduled_at')
                ->get();

            $matchedProjects = Project::where('user_id', $userId)
                ->where(function ($q) use ($search) {
                    $q->where('name', 'LIKE', "%$search%")
                    ->orWhere('description', 'LIKE', "%$search%");
                })
                ->whereNull('deleted_at')
                ->get();

            $matchedTasks = Task::where('user_id', $userId)
                ->where(function ($q) use ($search) {
                    $q->where('title', 'LIKE', "%$search%")
                    ->orWhere('description', 'LIKE', "%$search%");
                })
                ->get();
        } else {
            $categories = Category::with(['projects' => function ($query) {
                    $query->whereNull('deleted_at')
                        ->whereNull('parent_id')
                        ->whereNull('archived_at');
                }])
                ->where('user_id', $userId)
                ->orderBy('scheduled_at')
                ->get();

            $matchedProjects = collect(); 
            $matchedTasks = collect(); 
        }

        return Inertia::render('Dashboard', [
            'user' => Auth::user(),
            'categories' => $categories,
            'notifications' => Notification::where('user_id', $userId)
                ->where('is_read', false)
                ->latest('created_at')
                ->take(3)
                ->get(),
            'search' => $search,
            'matchedProjects' => $matchedProjects,
            'matchedTasks' => $matchedTasks,
        ]);

    }

    public function logout()
    {
        $userId = Auth::id();
        Auth::logout();

        event(new EntityActionOccurred(
            userId: $userId,
            entityType: 'User',
            entityId: $userId,
            action: 'User logged out'
        ));

        return redirect()->route('login');
    }
}
