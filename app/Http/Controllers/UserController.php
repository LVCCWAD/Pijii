<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Events\EntityActionOccurred;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
     public function show()
    {
        return view('user.show', [
            'user' => Auth::user(),
        ]);
    }

    public function edit()
    {
        return view('user.edit', [
            'user' => Auth::user(),
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,' . Auth::id()],
            'avatar' => ['nullable', 'max:2048', 'image'],
            'password' => ['nullable', 'confirmed', Password::defaults()],
        ]);

        $data = [
            'name' => $validated['name'],
            'email' => $validated['email'],
        ];

        if ($request->hasFile('avatar')) 
        {            
            $file = $request->file('avatar');      
            $filename = time() . '_' . $file->getClientOriginalName(); 
            $file->move(public_path('images'), $filename);  
            $data['avatar'] = '/images/' . $filename; 
        }

        if (!empty($validated['password'])) {
            $data['password'] = Hash::make($validated['password']);
        }

        $user->update($data);

        EntityActionOccurred::dispatch(
            Auth::id(),
            'User',
            $user->id,
            'updated profile'
        );

        return redirect()->route('user.show')->with('status', 'Profile updated.');
    }

    public function destroy()
    {
        $userId = Auth::id();   
        
        Auth::logout();

        EntityActionOccurred::dispatch(
            $userId,
            'User',
            $userId,
            'deleted account'
        );

        User::destroy($userId);

        return redirect('/login')->with('status', value: 'Account deleted.');
    }
}
