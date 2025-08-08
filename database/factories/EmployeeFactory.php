<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $positions = [
            'Manager',
            'Supervisor',
            'Staff Administrasi',
            'Analis',
            'Koordinator',
            'Sekretaris',
            'Asisten Manager',
            'Specialist',
            'Officer',
            'Konsultan'
        ];

        $workUnits = [
            'Human Resources',
            'Keuangan',
            'Pemasaran',
            'IT',
            'Operasional',
            'Produksi',
            'Quality Assurance',
            'Research & Development',
            'Customer Service',
            'Legal'
        ];

        return [
            'employee_id' => 'EMP' . fake()->unique()->numberBetween(1000, 9999),
            'full_name' => fake('id_ID')->name(),
            'position' => fake()->randomElement($positions),
            'work_unit' => fake()->randomElement($workUnits),
            'start_date' => fake()->dateTimeBetween('-5 years', 'now'),
            'salary' => fake()->numberBetween(5000000, 25000000),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake('id_ID')->phoneNumber(),
        ];
    }
}