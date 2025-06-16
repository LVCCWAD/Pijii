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
            'name' => 'Demo User 1',
            'email' => 'demouser1@gmail.com',
            'password' => Hash::make('password'),
            'avatar' => 'images/default-avatar.png',
            'email_verified_at' => now()  
        ]);

        User::create([
            'name' => 'Demo User 2',
            'email' => 'demouser2@gmail.com',
            'password' => Hash::make('password'),
            'avatar' => 'images/default-avatar.png',
            'email_verified_at' => now()  
        ]);


        $categoryId = DB::table('categories')->insertGetId([
            'name' => 'Personal',
            'user_id' => $user->id
        ]);

        Category::create([
            'name' => 'School',
            'user_id' => $user->id
        ]);

        Category::create([
            'name' => 'School',
            'user_id' => $user->id
        ]);

        Category::create([
            'name' => 'School',
            'user_id' => $user->id
        ]);

        Category::create([
            'name' => 'School',
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

        Category::create([
            'name' => 'Woasfdrk',
            'user_id' => $user->id
        ]);

        Category::create([
            'name' => 'Woafdrk',
            'user_id' => $user->id
        ]);

        Category::create([
            'name' => 'Worasdfk',
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

        $project = Project::create([
            'category_id' => $categoryId,
            'stage_id' => 1,  
            'project_name' => 'WAD',
            'priority_level' => 'medium',
            'scheduled_at' => now(),
            'is_collaborative' => true,
            'created_by' => $user->id,
        ]);

        Project::create([
            'category_id' => $categoryId,
            'stage_id' => 2,  
            'project_name' => 'Another Demo Project',
            'priority_level' => 'high',
            'scheduled_at' => now(),
            'is_collaborative' => true,
            'created_by' => $user->id,
        ]);

        Project::create([
            'parent_id' => 1,
            'category_id' => $categoryId,
            'stage_id' => 1,  
            'project_name' => 'asdfasdf',
            'priority_level' => 'high',
            'scheduled_at' => now(),
            'is_collaborative' => true,
            'created_by' => $user->id,
        ]);

        Project::create([
            'parent_id' => 1,
            'category_id' => $categoryId,
            'stage_id' => 1,  
            'project_name' => 'Reporting',
            'priority_level' => 'high',
            'scheduled_at' => now(),
            'is_collaborative' => true,
            'created_by' => $user->id,
        ]);

        Project::create([
            'parent_id' => 1,
            'category_id' => $categoryId,
            'stage_id' => 1,  
            'project_name' => 'Reportiasdfng',
            'priority_level' => 'high',
            'scheduled_at' => now(),
            'is_collaborative' => true,
            'created_by' => $user->id,
        ]);

        Project::create([
            'parent_id' => 1,
            'category_id' => $categoryId,
            'stage_id' => 1,  
            'project_name' => 'Reporting',
            'priority_level' => 'high',
            'scheduled_at' => now(),
            'is_collaborative' => false,
            'created_by' => $user->id,
        ]);

        foreach (['Task One', 'Task Two', 'Task Three'] as $title) {
            Task::create([
                'title' => $title,
                'description' => "$title description.",
                'project_id' => $project->id,
                'stage_id' => 1, 
                'priority_level' => 'high',
                'scheduled_at' => null,
                'created_by' => $user->id,
            ]);
        }
    }
}
