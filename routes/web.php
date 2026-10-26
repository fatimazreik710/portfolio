<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;

// Public Route
Route::get('/', [ClientController::class, 'index'])->name('portfolio');

// Breeze default dashboard redirect fix
Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Admin Group Routes
Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {

    Route::get('/', [AdminController::class, 'index'])->name('admin.dashboard');

    Route::put('/home', [AdminController::class, 'updateHome'])->name('admin.home.update');
    Route::put('/about', [AdminController::class, 'updateAbout'])->name('admin.about.update');
    Route::put('/about-features/{aboutFeature}', [AdminController::class, 'updateAboutFeature'])->name('admin.about-features.update');

    Route::post('/services', [AdminController::class, 'storeService'])->name('admin.services.store');
    Route::put('/services/{service}', [AdminController::class, 'updateService'])->name('admin.services.update');
    Route::delete('/services/{service}', [AdminController::class, 'deleteService'])->name('admin.services.delete');

    Route::post('/projects', [AdminController::class, 'storeProject'])->name('admin.projects.store');
    Route::put('/projects/{project}', [AdminController::class, 'updateProject'])->name('admin.projects.update');
    Route::delete('/projects/{project}', [AdminController::class, 'deleteProject'])->name('admin.projects.delete');

    Route::post('/counters', [AdminController::class, 'storeCounter'])->name('admin.counters.store');
    Route::put('/counters/{counter}', [AdminController::class, 'updateCounter'])->name('admin.counters.update');
    Route::delete('/counters/{counter}', [AdminController::class, 'deleteCounter'])->name('admin.counters.delete');
});

require __DIR__.'/auth.php';
