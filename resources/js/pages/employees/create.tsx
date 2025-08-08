import React from 'react';
import { Head, useForm } from '@inertiajs/react';
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
import { Link } from '@inertiajs/react';

export default function CreateEmployee() {
    const { data, setData, post, processing, errors } = useForm({
        employee_id: '',
        full_name: '',
        position: '',
        work_unit: '',
        start_date: '',
        salary: '',
        email: '',
        phone: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('employees.store'));
    };

    return (
        <AppShell>
            <Head title="Tambah Karyawan Baru" />
            
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex items-center gap-4">
                    <Link href={route('employees.index')}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="flex items-center gap-2 text-3xl font-bold">
                            <span>➕</span>
                            Tambah Karyawan Baru
                        </h1>
                        <p className="text-muted-foreground">
                            Lengkapi formulir di bawah untuk menambahkan karyawan baru
                        </p>
                    </div>
                </div>

                {/* Form Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span>📝</span>
                            Informasi Karyawan
                        </CardTitle>
                        <CardDescription>
                            Semua field dengan tanda * wajib diisi
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
                                        Masukkan gaji dalam angka (tanpa titik atau koma)
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
                                    {processing ? 'Menyimpan...' : 'Simpan Karyawan'}
                                </Button>
                                <Link href={route('employees.index')}>
                                    <Button type="button" variant="outline">
                                        Batal
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Help Section */}
                <Card className="bg-blue-50 dark:bg-blue-950">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                            <span>💡</span>
                            Tips Pengisian
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-blue-700 dark:text-blue-300">
                        <ul className="space-y-2 text-sm">
                            <li>• ID Karyawan harus unik dan tidak boleh sama dengan karyawan lain</li>
                            <li>• Email harus menggunakan format yang valid (contoh: nama@email.com)</li>
                            <li>• Gaji dimasukkan dalam angka tanpa titik atau koma pemisah</li>
                            <li>• Pastikan semua informasi sudah benar sebelum menyimpan</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}