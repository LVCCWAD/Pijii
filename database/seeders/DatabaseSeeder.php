<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::create([
            'name' => 'Demo User',
            'email' => 'demouser@gmail.com',
            'password' => Hash::make('password'),
            'avatar' => 'images/default-avatar.png',
            'email_verified_at' => now()
        ]);
        
        Category::create([
            'name' => 'Personal',
            'user_id' => $user->id
        ]);

        Category::create([
            'name' => 'School',
            'user_id' => $user->id
        ]);

        Category::create([
            'name' => 'Work',
            'user_id' => $user->id
        ]);

        if (DB::table('stages')->count() == 0) {
            DB::table('stages')->insert([
                ['stage_name' => 'to_do'],
                ['stage_name' => 'in_progress'],
                ['stage_name' => 'completed'],
                ['stage_name' => 'on_hold'],
            ]);
        }

    }
}
