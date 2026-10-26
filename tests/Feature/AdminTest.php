<?php

use App\Models\AboutFeature;
use App\Models\AboutSection;
use App\Models\HomeSection;
use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\Service;
use App\Models\StatCounter;
use App\Models\User;

test('unauthenticated users cannot view admin dashboard', function () {
    $response = $this->get(route('admin.dashboard'));

    $response->assertRedirect(route('login'));
});

test('authenticated user can view admin dashboard', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('admin.dashboard'));

    $response->assertStatus(200);
});

test('authenticated user can update home section', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->put(route('admin.home.update'), [
        'badge_text' => 'New Badge Text',
        'main_title' => 'New Title',
        'subtitle' => 'New Subtitle',
        'bg_image' => 'https://example.com/bg.jpg',
    ]);

    $response->assertSessionHas('message');
    expect(HomeSection::first()->main_title)->toBe('New Title');
});

test('authenticated user can update about section with media fields', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->put(route('admin.about.update'), [
        'badge_text' => 'ABOUT UPDATED',
        'title' => 'Updated About Title',
        'description' => 'Updated Description',
        'main_image' => 'https://example.com/main.jpg',
        'secondary_image' => 'https://example.com/sec.jpg',
        'experience_years' => '30+',
        'experience_label' => 'Decades of Quality',
    ]);

    $response->assertSessionHas('message');
    $about = AboutSection::first();
    expect($about->title)->toBe('Updated About Title');
    expect($about->experience_years)->toBe('30+');
});

test('authenticated user can update about feature', function () {
    $user = User::factory()->create();
    $feature = AboutFeature::create([
        'title' => 'Original Feature',
        'description' => 'Original Desc',
    ]);

    $response = $this->actingAs($user)->put(route('admin.about-features.update', $feature), [
        'title' => 'Updated Feature',
        'description' => 'Updated Feature Desc',
    ]);

    $response->assertSessionHas('message');
    expect($feature->fresh()->title)->toBe('Updated Feature');
});

test('authenticated user can manage services', function () {
    $user = User::factory()->create();

    // 1. Create service
    $response = $this->actingAs($user)->post(route('admin.services.store'), [
        'title' => 'Roofing & Solar',
        'description' => 'Premium rooftop solar solutions.',
        'icon' => '☀️',
    ]);
    $response->assertSessionHas('message');
    $service = Service::where('title', 'Roofing & Solar')->first();
    expect($service)->not->toBeNull();

    // 2. Update service
    $this->actingAs($user)->put(route('admin.services.update', $service), [
        'title' => 'Roofing & Solar Pro',
        'description' => 'Updated description',
        'icon' => '⚡',
    ]);
    expect($service->fresh()->title)->toBe('Roofing & Solar Pro');

    // 3. Delete service using admin.services.delete
    $this->actingAs($user)->delete(route('admin.services.delete', $service));
    expect(Service::find($service->id))->toBeNull();
});

test('authenticated user can manage projects', function () {
    $user = User::factory()->create();
    $category = ProjectCategory::create([
        'name' => 'Industrial',
        'abbreviation' => 'industrial',
    ]);

    // 1. Create project
    $response = $this->actingAs($user)->post(route('admin.projects.store'), [
        'project_category_id' => $category->id,
        'title' => 'Logistics Park',
        'description' => 'Heavy industrial warehouse complex.',
        'image' => 'https://example.com/project.jpg',
    ]);
    $response->assertSessionHas('message');
    $project = Project::where('title', 'Logistics Park')->first();
    expect($project)->not->toBeNull();

    // 2. Update project
    $this->actingAs($user)->put(route('admin.projects.update', $project), [
        'project_category_id' => $category->id,
        'title' => 'Logistics Park Expansion',
        'description' => 'Expanded phase 2.',
        'image' => 'https://example.com/project2.jpg',
    ]);
    expect($project->fresh()->title)->toBe('Logistics Park Expansion');

    // 3. Delete project using admin.projects.delete
    $this->actingAs($user)->delete(route('admin.projects.delete', $project));
    expect(Project::find($project->id))->toBeNull();
});

test('authenticated user can manage counters', function () {
    $user = User::factory()->create();

    // 1. Create counter
    $response = $this->actingAs($user)->post(route('admin.counters.store'), [
        'count_value' => '99%',
        'label' => 'On-Time Rate',
        'display_order' => 5,
    ]);
    $response->assertSessionHas('message');
    $counter = StatCounter::where('label', 'On-Time Rate')->first();
    expect($counter)->not->toBeNull();

    // 2. Update counter
    $this->actingAs($user)->put(route('admin.counters.update', $counter), [
        'count_value' => '100%',
        'label' => 'Client Satisfaction',
        'display_order' => 5,
    ]);
    expect($counter->fresh()->count_value)->toBe('100%');

    // 3. Delete counter
    $this->actingAs($user)->delete(route('admin.counters.delete', $counter));
    expect(StatCounter::find($counter->id))->toBeNull();
});
