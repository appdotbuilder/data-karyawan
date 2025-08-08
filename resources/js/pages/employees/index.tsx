import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card';
import { Trash2, Edit, Eye, Plus, Search } from 'lucide-react';

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

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedData {
    current_page: number;
    data: Employee[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface Props {
    employees: PaginatedData;
    search: string;
    [key: string]: unknown;
}

export default function EmployeeIndex({ employees, search }: Props) {
    const [searchTerm, setSearchTerm] = React.useState(search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('employees.index'), { search: searchTerm }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleDelete = (employee: Employee) => {
        if (confirm(`Apakah Anda yakin ingin menghapus data karyawan ${employee.full_name}?`)) {
            router.delete(route('employees.destroy', employee.id), {
                onSuccess: () => {
                    // Handle success if needed
                }
            });
        }
    };

    return (
        <AppShell>
            <Head title="Data Karyawan" />
            
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="flex items-center gap-2 text-3xl font-bold">
                            <span>👥</span>
                            Data Karyawan
                        </h1>
                        <p className="text-muted-foreground">
                            Kelola data karyawan perusahaan Anda
                        </p>
                    </div>
                    
                    <Link href={route('employees.create')}>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Tambah Karyawan
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Karyawan
                            </CardTitle>
                            <span className="text-2xl">👤</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{employees.total}</div>
                            <p className="text-xs text-muted-foreground">
                                Terdaftar dalam sistem
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Halaman Saat Ini
                            </CardTitle>
                            <span className="text-2xl">📄</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {employees.current_page} dari {employees.last_page}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Menampilkan {employees.per_page} per halaman
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Data Ditampilkan
                            </CardTitle>
                            <span className="text-2xl">📊</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {employees.from || 0}-{employees.to || 0}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Dari total {employees.total} data
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Search className="h-5 w-5" />
                            Pencarian
                        </CardTitle>
                        <CardDescription>
                            Cari berdasarkan nama, ID karyawan, jabatan, unit kerja, atau email
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <Input
                                type="text"
                                placeholder="Masukkan kata kunci pencarian..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1"
                            />
                            <Button type="submit" variant="secondary">
                                <Search className="h-4 w-4" />
                                Cari
                            </Button>
                            {search && (
                                <Link href={route('employees.index')}>
                                    <Button variant="outline">
                                        Reset
                                    </Button>
                                </Link>
                            )}
                        </form>
                        {search && (
                            <p className="mt-2 text-sm text-muted-foreground">
                                Menampilkan hasil pencarian untuk: <strong>"{search}"</strong>
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Employee Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Karyawan</CardTitle>
                        <CardDescription>
                            {employees.total > 0 
                                ? `Menampilkan ${employees.data.length} dari ${employees.total} karyawan`
                                : 'Tidak ada data karyawan'
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {employees.data.length > 0 ? (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID Karyawan</TableHead>
                                            <TableHead>Nama Lengkap</TableHead>
                                            <TableHead>Jabatan</TableHead>
                                            <TableHead>Unit Kerja</TableHead>
                                            <TableHead>TMT</TableHead>
                                            <TableHead>Gaji</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {employees.data.map((employee) => (
                                            <TableRow key={employee.id}>
                                                <TableCell>
                                                    <Badge variant="secondary">
                                                        {employee.employee_id}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {employee.full_name}
                                                </TableCell>
                                                <TableCell>{employee.position}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">
                                                        {employee.work_unit}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{employee.formatted_start_date}</TableCell>
                                                <TableCell className="font-mono text-sm">
                                                    {employee.formatted_salary}
                                                </TableCell>
                                                <TableCell className="text-sm text-blue-600">
                                                    {employee.email}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-1">
                                                        <Link href={route('employees.show', employee.id)}>
                                                            <Button variant="ghost" size="sm">
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link href={route('employees.edit', employee.id)}>
                                                            <Button variant="ghost" size="sm">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm"
                                                            onClick={() => handleDelete(employee)}
                                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <div className="mb-4 text-6xl">📝</div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    {search ? 'Tidak ada hasil pencarian' : 'Belum ada data karyawan'}
                                </h3>
                                <p className="mb-4 text-muted-foreground">
                                    {search 
                                        ? `Tidak ditemukan data karyawan dengan kata kunci "${search}"`
                                        : 'Mulai dengan menambahkan karyawan pertama Anda'
                                    }
                                </p>
                                {!search && (
                                    <Link href={route('employees.create')}>
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Tambah Karyawan
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {employees.data.length > 0 && employees.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {employees.links.map((link, index) => (
                            <div key={index}>
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                                            link.active
                                                ? 'bg-primary text-primary-foreground border-primary'
                                                : 'bg-background text-foreground border-border hover:bg-muted'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span 
                                        className="px-3 py-2 text-sm text-muted-foreground"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}