<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('project_collaborators', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('email', 255);
            $table->enum('access_level', ['viewer', 'commenter', 'editor'])->default('viewer');
            $table->foreignId('granted_by')->constrained('users')->onDelete('cascade');
            $table->timestamp('granted_at')->useCurrent();
            $table->unique(['project_id', 'email']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_collaborators');
    }
};
