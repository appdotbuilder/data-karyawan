import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Sistem Manajemen Karyawan">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-white">
                <header className="mb-8 w-full max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <>
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl"
                                >
                                    📊 Dashboard
                                </Link>
                                <Link
                                    href={route('employees.index')}
                                    className="inline-flex items-center gap-2 rounded-lg border-2 border-blue-600 px-6 py-3 font-medium text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:text-white"
                                >
                                    👥 Data Karyawan
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    🔑 Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl"
                                >
                                    📝 Daftar
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <div className="w-full max-w-6xl">
                    <main className="text-center">
                        {/* Hero Section */}
                        <div className="mb-16">
                            <div className="mb-6 text-6xl">👥</div>
                            <h1 className="mb-6 text-5xl font-bold text-gray-800 dark:text-white">
                                Sistem Manajemen Karyawan
                            </h1>
                            <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
                                Kelola data karyawan dengan mudah, efisien, dan terorganisir
                            </p>
                            
                            {!auth.user && (
                                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-medium text-white shadow-xl transition-all duration-200 hover:bg-blue-700 hover:shadow-2xl transform hover:scale-105"
                                    >
                                        🚀 Mulai Sekarang
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-lg dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                    >
                                        🔑 Sudah Punya Akun?
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-xl bg-white p-8 shadow-lg transition-all duration-200 hover:shadow-xl dark:bg-gray-800">
                                <div className="mb-4 text-4xl">📝</div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
                                    Tambah Karyawan
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Tambahkan data karyawan baru dengan formulir yang lengkap dan mudah digunakan
                                </p>
                            </div>

                            <div className="rounded-xl bg-white p-8 shadow-lg transition-all duration-200 hover:shadow-xl dark:bg-gray-800">
                                <div className="mb-4 text-4xl">👁️</div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
                                    Lihat Data
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Tampilkan daftar karyawan dengan informasi lengkap dan detail yang terorganisir
                                </p>
                            </div>

                            <div className="rounded-xl bg-white p-8 shadow-lg transition-all duration-200 hover:shadow-xl dark:bg-gray-800">
                                <div className="mb-4 text-4xl">✏️</div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
                                    Edit & Update
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Perbarui data karyawan kapan saja dengan antarmuka yang intuitif dan responsif
                                </p>
                            </div>

                            <div className="rounded-xl bg-white p-8 shadow-lg transition-all duration-200 hover:shadow-xl dark:bg-gray-800">
                                <div className="mb-4 text-4xl">🔍</div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
                                    Pencarian Cepat
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Temukan karyawan dengan mudah menggunakan fitur pencarian yang canggih
                                </p>
                            </div>
                        </div>

                        {/* Data Fields Section */}
                        <div className="mb-16 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
                            <h2 className="mb-8 text-3xl font-bold text-gray-800 dark:text-white">
                                📊 Informasi Karyawan Lengkap
                            </h2>
                            <div className="grid gap-4 text-left md:grid-cols-2 lg:grid-cols-4">
                                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                                    <div className="mb-2 text-2xl">🆔</div>
                                    <h4 className="font-semibold text-blue-800 dark:text-blue-300">ID Karyawan</h4>
                                    <p className="text-sm text-blue-600 dark:text-blue-400">Nomor identitas unik</p>
                                </div>
                                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                                    <div className="mb-2 text-2xl">👤</div>
                                    <h4 className="font-semibold text-green-800 dark:text-green-300">Nama Lengkap</h4>
                                    <p className="text-sm text-green-600 dark:text-green-400">Identitas personal</p>
                                </div>
                                <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                                    <div className="mb-2 text-2xl">💼</div>
                                    <h4 className="font-semibold text-purple-800 dark:text-purple-300">Jabatan</h4>
                                    <p className="text-sm text-purple-600 dark:text-purple-400">Posisi dalam perusahaan</p>
                                </div>
                                <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
                                    <div className="mb-2 text-2xl">🏢</div>
                                    <h4 className="font-semibold text-orange-800 dark:text-orange-300">Unit Kerja</h4>
                                    <p className="text-sm text-orange-600 dark:text-orange-400">Departemen/divisi</p>
                                </div>
                                <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                                    <div className="mb-2 text-2xl">📅</div>
                                    <h4 className="font-semibold text-red-800 dark:text-red-300">TMT</h4>
                                    <p className="text-sm text-red-600 dark:text-red-400">Tanggal mulai kerja</p>
                                </div>
                                <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
                                    <div className="mb-2 text-2xl">💰</div>
                                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">Gaji</h4>
                                    <p className="text-sm text-yellow-600 dark:text-yellow-400">Kompensasi bulanan</p>
                                </div>
                                <div className="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
                                    <div className="mb-2 text-2xl">📧</div>
                                    <h4 className="font-semibold text-indigo-800 dark:text-indigo-300">Email</h4>
                                    <p className="text-sm text-indigo-600 dark:text-indigo-400">Alamat elektronik</p>
                                </div>
                                <div className="rounded-lg bg-pink-50 p-4 dark:bg-pink-900/20">
                                    <div className="mb-2 text-2xl">📱</div>
                                    <h4 className="font-semibold text-pink-800 dark:text-pink-300">Telepon</h4>
                                    <p className="text-sm text-pink-600 dark:text-pink-400">Nomor kontak</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        {!auth.user && (
                            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-xl">
                                <h2 className="mb-4 text-3xl font-bold">
                                    🌟 Siap Mengelola Data Karyawan?
                                </h2>
                                <p className="mb-6 text-lg opacity-90">
                                    Bergabunglah sekarang dan rasakan kemudahan dalam mengelola data karyawan perusahaan Anda
                                </p>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-medium text-blue-600 shadow-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-xl transform hover:scale-105"
                                >
                                    🚀 Mulai Gratis Sekarang
                                </Link>
                            </div>
                        )}

                        {auth.user && (
                            <div className="rounded-2xl bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white shadow-xl">
                                <h2 className="mb-4 text-3xl font-bold">
                                    🎉 Selamat Datang, {auth.user.name}!
                                </h2>
                                <p className="mb-6 text-lg opacity-90">
                                    Anda sudah siap untuk mengelola data karyawan dengan sistem yang powerful ini
                                </p>
                                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                    <Link
                                        href={route('employees.index')}
                                        className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-medium text-green-600 shadow-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-xl transform hover:scale-105"
                                    >
                                        👥 Kelola Data Karyawan
                                    </Link>
                                    <Link
                                        href={route('employees.create')}
                                        className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-medium text-white transition-all duration-200 hover:bg-white hover:text-green-600"
                                    >
                                        ➕ Tambah Karyawan Baru
                                    </Link>
                                </div>
                            </div>
                        )}
                    </main>
                </div>

                <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>
                        Sistem Manajemen Karyawan • Built with ❤️ using Laravel & React
                    </p>
                </footer>
            </div>
        </>
    );
}