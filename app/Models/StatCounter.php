<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatCounter extends Model
{
    protected $fillable = ['count_value', 'label', 'display_order'];
}
