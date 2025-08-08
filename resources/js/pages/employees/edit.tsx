import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Save } from 'lucide-react';

interface Employee {
    id: number;
    employee_id: string;
    full_name: string;
    position: string;
    work_unit: string;
    start_date: string;
    salary: number;
    email: string;
    phone: string;
    formatted_salary: string;
    formatted_start_date: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    employee: Employee;
    [key: string]: unknown;
}

export default function EditEmployee({ employee }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        employee_id: employee.employee_id,
        full_name: employee.full_name,
        position: employee.position,
        work_unit: employee.work_unit,
        start_date: employee.start_date,
        salary: employee.salary.toString(),
        email: employee.email,
        phone: employee.phone
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('employees.update', employee.id));
    };

    return (
        <AppShell>
            <Head title={`Edit ${employee.full_name}`} />
            
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex items-center gap-4">
                    <Link href={route('employees.show', employee.id)}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="flex items-center gap-2 text-3xl font-bold">
                            <span>✏️</span>
                            Edit Karyawan
                        </h1>
                        <p className="text-muted-foreground">
                            Perbarui informasi karyawan: {employee.full_name}
                        </p>
                    </div>
                </div>

                {/* Current Info Card */}
                <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                            <span>ℹ️</span>
                            Informasi Saat Ini
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2 text-sm md:grid-cols-2">
                            <div className="text-blue-700 dark:text-blue-300">
                                <strong>ID:</strong> {employee.employee_id}
                            </div>
                            <div className="text-blue-700 dark:text-blue-300">
                                <strong>Nama:</strong> {employee.full_name}
                            </div>
                            <div className="text-blue-700 dark:text-blue-300">
                                <strong>Jabatan:</strong> {employee.position}
                            </div>
                            <div className="text-blue-700 dark:text-blue-300">
                                <strong>Unit:</strong> {employee.work_unit}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Form Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span>📝</span>
                            Formulir Edit
                        </CardTitle>
                        <CardDescription>
                            Ubah informasi yang diperlukan. Semua field dengan tanda * wajib diisi
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Employee ID */}
                                <div className="space-y-2">
                                    <Label htmlFor="employee_id" className="flex items-center gap-2">
                                        <span>🆔</span>
                                        ID Karyawan *
                                    </Label>
                                    <Input
                                        id="employee_id"
                                        type="text"
                                        placeholder="Contoh: EMP001"
                                        value={data.employee_id}
                                        onChange={(e) => setData('employee_id', e.target.value)}
                                        className={errors.employee_id ? 'border-red-500' : ''}
                                    />
                                    {errors.employee_id && (
                                        <Alert className="border-red-200 bg-red-50 text-red-800">
                                            <AlertDescription>{errors.employee_id}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                {/* Full Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="full_name" className="flex items-center gap-2">
                                        <span>👤</span>
                                        Nama Lengkap *
                                    </Label>
                                    <Input
                                        id="full_name"
                                        type="text"
                                        placeholder="Nama lengkap karyawan"
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        className={errors.full_name ? 'border-red-500' : ''}
                                    />
                                    {errors.full_name && (
                                        <Alert className="border-red-200 bg-red-50 text-red-800">
                                            <AlertDescription>{errors.full_name}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                {/* Position */}
                                <div className="space-y-2">
                                    <Label htmlFor="position" className="flex items-center gap-2">
                                        <span>💼</span>
                                        Jabatan *
                                    </Label>
                                    <Input
                                        id="position"
                                        type="text"
                                        placeholder="Contoh: Manager, Staff, Supervisor"
                                        value={data.position}
                                        onChange={(e) => setData('position', e.target.value)}
                                        className={errors.position ? 'border-red-500' : ''}
                                    />
                                    {errors.position && (
                                        <Alert className="border-red-200 bg-red-50 text-red-800">
                                            <AlertDescription>{errors.position}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                {/* Work Unit */}
                                <div className="space-y-2">
                                    <Label htmlFor="work_unit" className="flex items-center gap-2">
                                        <span>🏢</span>
                                        Unit Kerja *
                                    </Label>
                                    <Input
                                        id="work_unit"
                                        type="text"
                                        placeholder="Contoh: HR, IT, Marketing"
                                        value={data.work_unit}
                                        onChange={(e) => setData('work_unit', e.target.value)}
                                        className={errors.work_unit ? 'border-red-500' : ''}
                                    />
                                    {errors.work_unit && (
                                        <Alert className="border-red-200 bg-red-50 text-red-800">
                                            <AlertDescription>{errors.work_unit}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                {/* Start Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="start_date" className="flex items-center gap-2">
                                        <span>📅</span>
                                        Tanggal Mulai Kerja (TMT) *
                                    </Label>
                                    <Input
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        className={errors.start_date ? 'border-red-500' : ''}
                                    />
                                    {errors.start_date && (
                                        <Alert className="border-red-200 bg-red-50 text-red-800">
                                            <AlertDescription>{errors.start_date}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                {/* Salary */}
                                <div className="space-y-2">
                                    <Label htmlFor="salary" className="flex items-center gap-2">
                                        <span>💰</span>
                                        Gaji *
                                    </Label>
                                    <Input
                                        id="salary"
                                        type="number"
                                        placeholder="Contoh: 5000000"
                                        value={data.salary}
                                        onChange={(e) => setData('salary', e.target.value)}
                                        className={errors.salary ? 'border-red-500' : ''}
                                        min="0"
                                        step="1000"
                                    />
                                    {errors.salary && (
                                        <Alert className="border-red-200 bg-red-50 text-red-800">
                                            <AlertDescription>{errors.salary}</AlertDescription>
                                        </Alert>
                                    )}
                                    <p className="text-xs text-muted-foreground">
                                        Gaji saat ini: {employee.formatted_salary}
                                    </p>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="flex items-center gap-2">
                                        <span>📧</span>
                                        Email *
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="nama@email.com"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && (
                                        <Alert className="border-red-200 bg-red-50 text-red-800">
                                            <AlertDescription>{errors.email}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="flex items-center gap-2">
                                        <span>📱</span>
                                        Nomor Telepon *
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="Contoh: 081234567890"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className={errors.phone ? 'border-red-500' : ''}
                                    />
                                    {errors.phone && (
                                        <Alert className="border-red-200 bg-red-50 text-red-800">
                                            <AlertDescription>{errors.phone}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center gap-4 pt-6">
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="flex items-center gap-2"
                                >
                                    <Save className="h-4 w-4" />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                                <Link href={route('employees.show', employee.id)}>
                                    <Button type="button" variant="outline">
                                        Batal
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Change History Notice */}
                <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                            <span>⚠️</span>
                            Pemberitahuan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-yellow-700 dark:text-yellow-300">
                        <ul className="space-y-2 text-sm">
                            <li>• Pastikan semua informasi sudah benar sebelum menyimpan</li>
                            <li>• Perubahan akan langsung tersimpan setelah tombol "Simpan Perubahan" ditekan</li>
                            <li>• ID Karyawan dan Email harus tetap unik (tidak boleh sama dengan karyawan lain)</li>
                            <li>• Data yang sudah disimpan akan memperbarui timestamp "Diperbarui"</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}