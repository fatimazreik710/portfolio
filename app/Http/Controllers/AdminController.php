<?php

namespace App\Http\Controllers;

use App\Models\AboutFeature;
use App\Models\AboutSection;
use App\Models\HomeSection;
use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\Service;
use App\Models\StatCounter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'home' => HomeSection::first(),
            'counters' => StatCounter::orderBy('display_order')->get(),
            'about' => AboutSection::first(),
            'aboutFeatures' => AboutFeature::all(),
            'services' => Service::all(),
            'categories' => ProjectCategory::all(),
            'projects' => Project::with('category')->get(),
        ]);
    }

    public function updateHome(Request $request)
    {
        $validated = $request->validate([
            'badge_text' => 'required|string',
            'bg_image' => 'required|string',
            'main_title' => 'required|string',
            'subtitle' => 'required|string',
        ]);

        $home = HomeSection::first();
        if ($home) {
            $home->update($validated);
        } else {
            HomeSection::create($validated);
        }

        return back()->with('message', 'Home section updated successfully!');
    }

    public function updateAbout(Request $request)
    {
        $validated = $request->validate([
            'badge_text' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
            'main_image' => 'nullable|string',
            'secondary_image' => 'nullable|string',
            'experience_years' => 'nullable|string',
            'experience_label' => 'nullable|string',
        ]);

        $about = AboutSection::first();
        if ($about) {
            $about->update($validated);
        } else {
            AboutSection::create($validated);
        }

        return back()->with('message', 'About section updated successfully!');
    }

    public function updateAboutFeature(Request $request, AboutFeature $aboutFeature)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $aboutFeature->update($validated);

        return back()->with('message', 'About highlight feature updated successfully!');
    }

    public function storeService(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'icon' => 'nullable|string',
        ]);

        Service::create($validated);

        return back()->with('message', 'Service added successfully!');
    }

    public function deleteService(Service $service)
    {
        $service->delete();

        return back()->with('message', 'Service deleted successfully!');
    }

    public function storeProject(Request $request)
    {
        $validated = $request->validate([
            'project_category_id' => 'required|exists:project_categories,id',
            'title' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'required|string',
        ]);

        Project::create($validated);

        return back()->with('message', 'Project added successfully!');
    }

    public function deleteProject(Project $project)
    {
        $project->delete();

        return back()->with('message', 'Project deleted successfully!');
    }

    public function updateService(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'icon' => 'nullable|string',
        ]);

        $service->update($validated);

        return back()->with('message', 'Service updated successfully!');
    }

    public function updateProject(Request $request, Project $project)
    {
        $validated = $request->validate([
            'project_category_id' => 'required|exists:project_categories,id',
            'title' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'required|string',
        ]);

        $project->update($validated);

        return back()->with('message', 'Project updated successfully!');
    }

    public function storeCounter(Request $request)
    {
        $validated = $request->validate([
            'count_value' => 'required|string|max:255',
            'label' => 'required|string|max:255',
            'display_order' => 'nullable|integer',
        ]);

        StatCounter::create($validated);

        return back()->with('message', 'Counter added successfully!');
    }

    public function deleteCounter(StatCounter $counter)
    {
        $counter->delete();

        return back()->with('message', 'Counter deleted successfully!');
    }

    public function updateCounter(Request $request, StatCounter $counter)
    {
        $validated = $request->validate([
            'count_value' => 'required|string|max:255',
            'label' => 'required|string|max:255',
            'display_order' => 'nullable|integer',
        ]);

        $counter->update($validated);

        return back()->with('message', 'Counter updated successfully!');
    }
}
