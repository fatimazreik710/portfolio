<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutSection extends Model
{
    protected $fillable = [
        'badge_text',
        'title',
        'description',
        'main_image',
        'secondary_image',
        'experience_years',
        'experience_label',
    ];
}
