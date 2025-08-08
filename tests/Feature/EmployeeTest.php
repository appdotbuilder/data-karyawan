<?php

use App\Models\Employee;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('employee index page loads', function () {
    $response = $this->get('/');
    $response->assertStatus(200);
});

test('authenticated user can view employees', function () {
    Employee::factory()->create([
        'full_name' => 'John Doe',
        'employee_id' => 'EMP001'
    ]);

    $response = $this->actingAs($this->user)
                     ->get(route('employees.index'));

    $response->assertStatus(200);
});

test('authenticated user can create employee', function () {
    $employeeData = [
        'employee_id' => 'EMP123',
        'full_name' => 'Jane Smith',
        'position' => 'Manager',
        'work_unit' => 'HR',
        'start_date' => '2024-01-01',
        'salary' => 10000000,
        'email' => 'jane@example.com',
        'phone' => '081234567890'
    ];

    $response = $this->actingAs($this->user)
                     ->post(route('employees.store'), $employeeData);

    $this->assertDatabaseHas('employees', [
        'employee_id' => 'EMP123',
        'full_name' => 'Jane Smith',
        'email' => 'jane@example.com'
    ]);

    $response->assertRedirect();
});

test('authenticated user can view employee details', function () {
    $employee = Employee::factory()->create([
        'full_name' => 'John Doe',
        'employee_id' => 'EMP001'
    ]);

    $response = $this->actingAs($this->user)
                     ->get(route('employees.show', $employee));

    $response->assertStatus(200);
});

test('authenticated user can update employee', function () {
    $employee = Employee::factory()->create();

    $updateData = [
        'employee_id' => $employee->employee_id,
        'full_name' => 'Updated Name',
        'position' => $employee->position,
        'work_unit' => $employee->work_unit,
        'start_date' => $employee->start_date->format('Y-m-d'),
        'salary' => $employee->salary,
        'email' => $employee->email,
        'phone' => $employee->phone
    ];

    $response = $this->actingAs($this->user)
                     ->put(route('employees.update', $employee), $updateData);

    $this->assertDatabaseHas('employees', [
        'id' => $employee->id,
        'full_name' => 'Updated Name'
    ]);

    $response->assertRedirect();
});

test('authenticated user can delete employee', function () {
    $employee = Employee::factory()->create();

    $response = $this->actingAs($this->user)
                     ->delete(route('employees.destroy', $employee));

    $this->assertDatabaseMissing('employees', [
        'id' => $employee->id
    ]);

    $response->assertRedirect();
});

test('employee search works', function () {
    Employee::factory()->create([
        'full_name' => 'John Doe',
        'employee_id' => 'EMP001'
    ]);

    Employee::factory()->create([
        'full_name' => 'Jane Smith',
        'employee_id' => 'EMP002'
    ]);

    $response = $this->actingAs($this->user)
                     ->get(route('employees.index', ['search' => 'John']));

    $response->assertStatus(200);
});

test('employee validation works', function () {
    $response = $this->actingAs($this->user)
                     ->post(route('employees.store'), []);

    $response->assertSessionHasErrors([
        'employee_id',
        'full_name',
        'position',
        'work_unit',
        'start_date',
        'salary',
        'email',
        'phone'
    ]);
});

test('duplicate employee id validation', function () {
    Employee::factory()->create(['employee_id' => 'EMP001']);

    $employeeData = [
        'employee_id' => 'EMP001', // Duplicate
        'full_name' => 'Jane Smith',
        'position' => 'Manager',
        'work_unit' => 'HR',
        'start_date' => '2024-01-01',
        'salary' => 10000000,
        'email' => 'jane@example.com',
        'phone' => '081234567890'
    ];

    $response = $this->actingAs($this->user)
                     ->post(route('employees.store'), $employeeData);

    $response->assertSessionHasErrors(['employee_id']);
});

test('duplicate email validation', function () {
    Employee::factory()->create(['email' => 'test@example.com']);

    $employeeData = [
        'employee_id' => 'EMP002',
        'full_name' => 'Jane Smith',
        'position' => 'Manager',
        'work_unit' => 'HR',
        'start_date' => '2024-01-01',
        'salary' => 10000000,
        'email' => 'test@example.com', // Duplicate
        'phone' => '081234567890'
    ];

    $response = $this->actingAs($this->user)
                     ->post(route('employees.store'), $employeeData);

    $response->assertSessionHasErrors(['email']);
});