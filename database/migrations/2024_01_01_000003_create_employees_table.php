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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id')->unique()->comment('Employee ID number');
            $table->string('full_name')->comment('Employee full name');
            $table->string('position')->comment('Job position');
            $table->string('work_unit')->comment('Department or work unit');
            $table->date('start_date')->comment('Starting work date (TMT)');
            $table->decimal('salary', 12, 2)->comment('Monthly salary');
            $table->string('email')->unique()->comment('Email address');
            $table->string('phone')->comment('Phone number');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('employee_id');
            $table->index('full_name');
            $table->index('position');
            $table->index('work_unit');
            $table->index('email');
            $table->index(['work_unit', 'position']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};