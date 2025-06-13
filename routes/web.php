<?php
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\EmailVerificationController;


Route::get('/', function () {return Inertia::render('Landing');});
Route::inertia('/Piji-App','Landing');

Route::middleware('guest')->group(function () {

    Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);

    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

Route::get('/email/verify', [EmailVerificationController::class, 'showNotice'])->middleware('auth')->name('verification.notice');
Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])->middleware(['auth', 'signed'])->name('verification.verify');
Route::post('/email/verification-notification', [EmailVerificationController::class, 'send'])->middleware(['auth', 'throttle:6,1'])->name('verification.send');

Route::middleware(['auth', 'verified'])->group(function() 
{
    Route::get('/', [AuthController::class, 'dashboard'])->name('dashboard');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::get('/categories/{category}', [CategoryController::class, 'show'])->name('categories.show');
    Route::get('/categories/{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::put('/categories/{category}/update', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}/delete', [CategoryController::class, 'destroy'])->name('categories.destroy');

    Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::get('/projects/{project}', [ProjectController::class, 'show'])->name(name: 'projects.show');
    Route::get('/projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
    Route::put('/projects/{project}/update', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('/projects/{project}/delete', [ProjectController::class, 'destroy'])->name('projects.destroy');

    Route::get('/tasks', [TaskController::class, 'showTasks'])->name('showTasks');
    Route::get('/tasks/create', [TaskController::class, 'create'])->name('tasks.create');
    Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
    Route::get('/tasks/{task}', [TaskController::class, 'show'])->name(name: 'tasks.show');
    Route::get('/tasks/{task}/edit', [TaskController::class, 'edit'])->name('tasks.edit');
    Route::put('/tasks/{task}/update', [TaskController::class, 'update'])->name('tasks.update');
    Route::delete('/tasks/{task}/delete', [TaskController::class, 'delete'])->name('tasks.delete');

    Route::get('/profile', [UserController::class, 'show'])->name('user.show');
    Route::get('/profile/edit', action: [UserController::class, 'edit'])->name('user.edit');
    Route::put('/profile/update', [UserController::class, 'update'])->name('user.update');
    Route::delete('/profile/delete', [UserController::class, 'destroy'])->name('user.destroy');


    // for checking routes only at the moment
    


    Route::inertia('/Archived','Archived');
    Route::inertia('/Notifications','Notifications');
    Route::inertia('/Deleted','Deleted');
    Route::inertia('/Settings','Settings');
    
    Route::inertia('/Category','Category_view');
    Route::inertia('/Project','Project_view');
    Route::inertia('/Task','Task_view');



    Route::inertia('/settings/general','Settings/General');
    Route::inertia('/settings/notification','Settings/Notifications');
    Route::inertia('/settings/preferences','Settings/Preferences');
    Route::inertia('/settings/profile','Settings/profile');

    Route::inertia('/Create/Options','Create_Options');


    Route::middleware(['auth'])->group(function () {
        Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
        Route::patch('/notifications/{notification}/mark-read', [NotificationController::class, 'markRead'])->name('notifications.markRead');
        Route::patch('/notifications/{notification}/mark-unread', [NotificationController::class, 'markUnread'])->name('notifications.markUnread');
    });
});
