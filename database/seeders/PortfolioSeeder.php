<?php

namespace Database\Seeders;

use App\Models\AboutFeature;
use App\Models\AboutSection;
use App\Models\HomeSection;
use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\Service;
use App\Models\StatCounter;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing records to prevent duplication
        Project::query()->delete();
        ProjectCategory::query()->delete();
        StatCounter::query()->delete();
        AboutFeature::query()->delete();
        Service::query()->delete();
        HomeSection::query()->delete();
        AboutSection::query()->delete();

        // 1. Home Section
        HomeSection::create([
            'badge_text' => 'Trusted Construction Partner Since 1998',
            'main_title' => "Building Tomorrow's Infrastructure Today",
            'subtitle' => 'Providing world-class construction services with precision, passion, and purpose across residential, commercial, and infrastructure sectors.',
            'bg_image' => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80',
        ]);

        // 2. Stat Counters (Exactly 4 items)
        StatCounter::create(['count_value' => '25+', 'label' => 'Years Experience', 'display_order' => 1]);
        StatCounter::create(['count_value' => '850+', 'label' => 'Projects Completed', 'display_order' => 2]);
        StatCounter::create(['count_value' => '120+', 'label' => 'Team Experts', 'display_order' => 3]);
        StatCounter::create(['count_value' => '35+', 'label' => 'Industry Awards', 'display_order' => 4]);

        // 3. About Section
        AboutSection::create([
            'badge_text' => 'ABOUT CONSTRUCTIFY',
            'title' => 'We Build With Precision, Passion & Purpose',
            'description' => 'Since 1998, we have been delivering world-class construction services across residential, commercial, and infrastructure sectors. Our commitment to quality craftsmanship and client satisfaction drives everything we do.',
        ]);

        // 4. About Features (Exactly 4 items)
        AboutFeature::create(['title' => 'Licensed & Insured', 'description' => 'Fully certified with comprehensive coverage for every project we undertake.']);
        AboutFeature::create(['title' => 'On-Time Delivery', 'description' => 'Proven track record of completing projects within schedule and budget.']);
        AboutFeature::create(['title' => 'Expert Workforce', 'description' => 'Over 120 skilled professionals across all construction disciplines.']);
        AboutFeature::create(['title' => 'Award Winning', 'description' => 'Recognized with 35+ industry awards for quality and innovation.']);

        // 5. Services (Exactly 6 items)
        Service::create([
            'title' => 'Residential Building',
            'description' => 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit.',
            'icon' => '🏠',
        ]);
        Service::create([
            'title' => 'Commercial Projects',
            'description' => 'Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam.',
            'icon' => '🏢',
        ]);
        Service::create([
            'title' => 'Renovation & Remodeling',
            'description' => 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.',
            'icon' => '🔨',
        ]);
        Service::create([
            'title' => 'Road & Infrastructure',
            'description' => 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.',
            'icon' => '🌉',
        ]);
        Service::create([
            'title' => 'Project Management',
            'description' => 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut.',
            'icon' => '📊',
        ]);
        Service::create([
            'title' => 'Architecture & Design',
            'description' => 'At vero eos et accusamus et iusto odio dignissimos ducimus qui.',
            'icon' => '📐',
        ]);

        // 6. Project Categories
        $res = ProjectCategory::create(['name' => 'Residential', 'abbreviation' => 'residential']);
        $com = ProjectCategory::create(['name' => 'Commercial', 'abbreviation' => 'commercial']);
        $inf = ProjectCategory::create(['name' => 'Infrastructure', 'abbreviation' => 'infrastructure']);

        // 7. Projects (Exactly 3 items)
        Project::create([
            'project_category_id' => $res->id,
            'title' => 'Sunset Ridge Villa',
            'description' => 'Premium residential complex with contemporary architecture.',
            'image' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        ]);
        Project::create([
            'project_category_id' => $com->id,
            'title' => 'Metro Business Hub',
            'description' => 'State-of-the-art office complex in the city center.',
            'image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        ]);
        Project::create([
            'project_category_id' => $inf->id,
            'title' => 'Riverside Highway Bridge',
            'description' => 'Major bridge connecting the northern corridor.',
            'image' => 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80',
        ]);
    }
}
