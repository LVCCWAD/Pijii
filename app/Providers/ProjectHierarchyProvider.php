<?php

namespace App\Providers;

use App\Models\Project;
use Illuminate\Support\ServiceProvider;

class ProjectHierarchyProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind('get_project_ancestors', function () {
            return function (?Project $project): array {
                $ancestors = [];

                while ($project) {
                    $ancestors[] = $project;
                    $project = $project->parent;
                }

                return array_reverse($ancestors);
            };
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
