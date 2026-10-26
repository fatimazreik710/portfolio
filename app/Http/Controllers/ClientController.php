<?php

namespace App\Http\Controllers;

use App\Models\AboutFeature;
use App\Models\AboutSection;
use App\Models\HomeSection;
use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\Service;
use App\Models\StatCounter;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'home' => HomeSection::first(),
            'counters' => StatCounter::orderBy('display_order')->get(),
            'about' => AboutSection::first(),
            'aboutFeatures' => AboutFeature::all(),
            'services' => Service::all(),
            'categories' => ProjectCategory::all(),
            'projects' => Project::with('category')->get(),
        ]);
    }
}
