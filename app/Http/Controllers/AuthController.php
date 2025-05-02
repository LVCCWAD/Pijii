<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
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

            return redirect()->intended(route('showDashboardPage'))->with('success', "Welcome back!");
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

    public function showDashboardPage()
    {
        return inertia('Dashboard');
    }

    public function logout()
    {
        Auth::logout();

        return redirect()->route('showLoginForm');
    }

}
