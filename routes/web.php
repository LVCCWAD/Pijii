<?php


use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NavController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\EmailVerificationController;


// Public Landing
Route::get('/', fn () => Inertia::render('Landing'));
Route::inertia('/Piji-App', 'Landing');


// Guest routes (login/register)
Route::middleware('guest')->group(function () {
    Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);


    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});


// Email verification
Route::middleware('auth')->group(function () {
    Route::get('/email/verify', [EmailVerificationController::class, 'showNotice'])->name('verification.notice');
    Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])->middleware('signed')->name('verification.verify');
    Route::post('/email/verification-notification', [EmailVerificationController::class, 'send'])->middleware('throttle:6,1')->name('verification.send');
});


// Authenticated and verified users
Route::middleware(['auth', 'verified'])->group(function () {


    Route::get('/', [AuthController::class, 'dashboard'])->name('dashboard');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/projects/archived', [NavController::class, 'archived'])->name('projects.archived');
    Route::get('/projects/recently-deleted', [NavController::class, 'recentlyDeleted'])->name('projects.recentlyDeleted');

    // Category routes (excluding 'create')
    Route::get('/categories', [CategoryController::class, 'index'])->name(name: 'categories.index');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::get('/categories/{category}', [CategoryController::class, 'show'])->name('categories.show');
    Route::get('/categories/{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');


    Route::get('/categories/{category}/projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('/categories/{category}/projects/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::post('/categories/{category}/projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::get('/categories/{category}/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
    Route::get('/categories/{category}/projects/{project}/edit', [ProjectController::class, 'edit'])->name(name: 'projects.edit');
    Route::put('/categories/{category}/projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('/categories/{category}/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');
    Route::patch('/categories/{category}/projects/{project}/restore', [ProjectController::class, 'restore'])->name('projects.restore');
    Route::post('/categories/{category}/projects/{project}/archive', [ProjectController::class, 'archive'])->name(name: 'projects.archive');
    Route::patch('/categories/{category}/projects/{project}/unarchive', [ProjectController::class, 'unarchive'])->name('projects.unarchive');


    Route::get('/categories/{category}/projects/{project}/tasks', [TaskController::class, 'index'])->name('tasks.index');
    Route::get('/categories/{category}/projects/{project}/tasks/create', [TaskController::class, 'create'])->name('tasks.create');
    Route::post('/categories/{category}/projects/{project}/tasks', [TaskController::class, 'store'])->name('tasks.store');
    Route::get('/categories/{category}/projects/{project}/tasks/{task}', [TaskController::class, 'show'])->name(name: 'tasks.show');
    Route::get('/categories/{category}/projects/{project}/tasks/{task}/edit', [TaskController::class, 'edit'])->name('tasks.edit');
    Route::put('/categories/{category}/projects/{project}/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
    Route::delete('/categories/{category}/projects/{project}/tasks/{task}', action: [TaskController::class, 'destroy'])->name('tasks.destroy');


    // User Profile
    Route::get('/profile', [UserController::class, 'show'])->name('user.show');
    Route::get('/profile/edit', [UserController::class, 'edit'])->name('user.edit');
    Route::put('/profile/update', [UserController::class, 'update'])->name('user.update');
    Route::delete('/profile/delete', [UserController::class, 'destroy'])->name('user.destroy');


    Route::inertia('/Settings', 'Settings');
    Route::inertia('/settings/general', 'Settings/General');
    Route::inertia('/settings/notification', 'Settings/Notifications');
    Route::inertia('/settings/preferences', 'Settings/Preferences');
    Route::inertia('/settings/profile', 'Settings/Profile');
    Route::inertia('/Create/Options', 'Create_Options');

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::patch('/notifications/{notification}/mark-read', [NotificationController::class, 'markRead'])->name('notifications.markRead');
    Route::patch('/notifications/{notification}/mark-unread', [NotificationController::class, 'markUnread'])->name('notifications.markUnread');
});



