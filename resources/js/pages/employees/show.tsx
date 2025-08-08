import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Edit, Trash2, Mail, Phone, Calendar, DollarSign } from 'lucide-react';

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

export default function ShowEmployee({ employee }: Props) {
    const handleDelete = () => {
        if (confirm(`Apakah Anda yakin ingin menghapus data karyawan ${employee.full_name}?`)) {
            router.delete(route('employees.destroy', employee.id), {
                onSuccess: () => {
                    router.visit(route('employees.index'));
                }
            });
        }
    };

    const workingYears = () => {
        const startDate = new Date(employee.start_date);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
        const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
        return diffYears;
    };

    return (
        <AppShell>
            <Head title={`${employee.full_name} - Detail Karyawan`} />
            
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('employees.index')}>
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                        <div>
                            <h1 className="flex items-center gap-2 text-3xl font-bold">
                                <span>👤</span>
                                {employee.full_name}
                            </h1>
                            <p className="text-muted-foreground">
                                Detail informasi karyawan
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex gap-2">
                        <Link href={route('employees.edit', employee.id)}>
                            <Button className="flex items-center gap-2">
                                <Edit className="h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                        <Button 
                            variant="destructive" 
                            onClick={handleDelete}
                            className="flex items-center gap-2"
                        >
                            <Trash2 className="h-4 w-4" />
                            Hapus
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Employee Information Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>📋</span>
                                Informasi Karyawan
                            </CardTitle>
                            <CardDescription>
                                Data personal dan identifikasi
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">ID Karyawan</span>
                                <Badge variant="secondary" className="font-mono">
                                    {employee.employee_id}
                                </Badge>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Nama Lengkap</span>
                                <span className="font-medium">{employee.full_name}</span>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Jabatan</span>
                                <Badge variant="outline">{employee.position}</Badge>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Unit Kerja</span>
                                <Badge>{employee.work_unit}</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Employment Details Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>💼</span>
                                Detail Pekerjaan
                            </CardTitle>
                            <CardDescription>
                                Informasi masa kerja dan kompensasi
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    TMT
                                </span>
                                <span className="font-medium">{employee.formatted_start_date}</span>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Masa Kerja</span>
                                <Badge variant="secondary">
                                    {workingYears()} tahun
                                </Badge>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <DollarSign className="h-4 w-4" />
                                    Gaji
                                </span>
                                <span className="font-mono font-medium text-green-600">
                                    {employee.formatted_salary}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>📞</span>
                                Informasi Kontak
                            </CardTitle>
                            <CardDescription>
                                Data kontak dan komunikasi
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    Email
                                </span>
                                <a 
                                    href={`mailto:${employee.email}`}
                                    className="block rounded-md bg-blue-50 p-3 text-blue-600 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400 dark:hover:bg-blue-900"
                                >
                                    {employee.email}
                                </a>
                            </div>
                            
                            <div className="space-y-2">
                                <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    Nomor Telepon
                                </span>
                                <a 
                                    href={`tel:${employee.phone}`}
                                    className="block rounded-md bg-green-50 p-3 text-green-600 hover:bg-green-100 dark:bg-green-950 dark:text-green-400 dark:hover:bg-green-900"
                                >
                                    {employee.phone}
                                </a>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Metadata Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>⏱️</span>
                                Metadata
                            </CardTitle>
                            <CardDescription>
                                Informasi sistem dan riwayat
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Dibuat</span>
                                <span className="text-sm">
                                    {new Date(employee.created_at).toLocaleDateString('id-ID', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Diperbarui</span>
                                <span className="text-sm">
                                    {new Date(employee.updated_at).toLocaleDateString('id-ID', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <Edit className="h-5 w-5 text-blue-600" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                        Perbarui Data
                                    </p>
                                    <p className="text-xs text-blue-600 dark:text-blue-400">
                                        Edit informasi karyawan
                                    </p>
                                </div>
                                <Link href={route('employees.edit', employee.id)}>
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                        Edit
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <Mail className="h-5 w-5 text-green-600" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-green-900 dark:text-green-100">
                                        Kirim Email
                                    </p>
                                    <p className="text-xs text-green-600 dark:text-green-400">
                                        Hubungi via email
                                    </p>
                                </div>
                                <a href={`mailto:${employee.email}`}>
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                        Email
                                    </Button>
                                </a>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <Trash2 className="h-5 w-5 text-red-600" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-red-900 dark:text-red-100">
                                        Hapus Data
                                    </p>
                                    <p className="text-xs text-red-600 dark:text-red-400">
                                        Hapus karyawan ini
                                    </p>
                                </div>
                                <Button 
                                    size="sm" 
                                    variant="destructive"
                                    onClick={handleDelete}
                                >
                                    Hapus
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}