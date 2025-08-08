<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $employeeId = $this->route('employee')->id;
        
        return [
            'employee_id' => 'required|string|max:20|unique:employees,employee_id,' . $employeeId,
            'full_name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'work_unit' => 'required|string|max:255',
            'start_date' => 'required|date',
            'salary' => 'required|numeric|min:0',
            'email' => 'required|email|unique:employees,email,' . $employeeId,
            'phone' => 'required|string|max:20',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'employee_id.required' => 'ID Karyawan wajib diisi.',
            'employee_id.unique' => 'ID Karyawan sudah digunakan karyawan lain.',
            'full_name.required' => 'Nama lengkap wajib diisi.',
            'position.required' => 'Jabatan wajib diisi.',
            'work_unit.required' => 'Unit kerja wajib diisi.',
            'start_date.required' => 'Tanggal mulai kerja wajib diisi.',
            'start_date.date' => 'Format tanggal tidak valid.',
            'salary.required' => 'Gaji wajib diisi.',
            'salary.numeric' => 'Gaji harus berupa angka.',
            'salary.min' => 'Gaji tidak boleh kurang dari 0.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah digunakan karyawan lain.',
            'phone.required' => 'Nomor telepon wajib diisi.',
        ];
    }
}