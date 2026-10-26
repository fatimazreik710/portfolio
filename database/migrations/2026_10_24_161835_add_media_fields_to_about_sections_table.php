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
        Schema::table('about_sections', function (Blueprint $table) {
            $table->string('main_image')->nullable()->after('description');
            $table->string('secondary_image')->nullable()->after('main_image');
            $table->string('experience_years')->nullable()->after('secondary_image');
            $table->string('experience_label')->nullable()->after('experience_years');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('about_sections', function (Blueprint $table) {
            $table->dropColumn(['main_image', 'secondary_image', 'experience_years', 'experience_label']);
        });
    }
};
