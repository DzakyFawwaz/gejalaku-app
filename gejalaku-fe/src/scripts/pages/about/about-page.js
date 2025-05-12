export default class AboutPage {
  async render() {
    return `
    <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <section class="mb-16">
        <div class="bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Tentang GejalaKu</h2>
            <div class="flex flex-col md:flex-row gap-8">
                <div class="md:w-2/3">
                    <p class="text-gray-700 mb-4">
                        GejalaKu adalah platform inovatif yang dikembangkan oleh tim CC25-CF213 untuk membantu masyarakat Indonesia mengenali gejala penyakit lebih awal melalui informasi kesehatan yang mudah dipahami, dengan tujuan mendorong deteksi dini dan penanganan medis yang tepat.
                    </p>
                    <p class="text-gray-700 mb-4">
                        Banyak individu yang memiliki gejala-gejala penyakit yang jelas, namun tidak menyadari bahwa hal tersebut merupakan tanda-tanda dari penyakit tertentu, sehingga mereka baru mencari pertolongan medis ketika kondisi mereka memburuk. Faktor penyebabnya antara lain rendahnya literasi kesehatan, terbatasnya akses ke pelayanan kesehatan, dan persebaran tenaga medis yang kurang merata, terutama di daerah terpencil.
                    </p>
                    <p class="text-gray-700">
                        GejalaKu hadir sebagai solusi berbasis teknologi berupa website interaktif yang dirancang untuk membantu pengguna mengenali gejala awal penyakit, memberikan informasi awal dan panduan berdasarkan gejala yang dialami.
                    </p>
                </div>
                <div class="md:w-1/3">
                    <div class="bg-blue-50 p-6 rounded-lg border border-blue-100">
                        <h3 class="text-lg font-semibold text-blue-700 mb-3">Tema Proyek</h3>
                        <p class="text-gray-700 mb-4">Health Innovation</p>
                        
                        <h3 class="text-lg font-semibold text-blue-700 mb-3">Tim Pengembang</h3>
                        <p class="text-gray-700">ID Tim: CC25-CF213</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- How It Works -->
    <section class="mb-16">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Bagaimana GejalaKu Bekerja</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                <div class="mb-4 text-blue-500 text-center">
                    <i class="fas fa-search text-4xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-center mb-3">Pengecekan Gejala</h3>
                <p class="text-gray-700 text-center">
                    Masukkan gejala yang Anda alami, dan GejalaKu akan memproses informasi tersebut untuk memberikan analisis awal.
                </p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
                <div class="mb-4 text-purple-500 text-center">
                    <i class="fas fa-robot text-4xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-center mb-3">AI Canggih</h3>
                <p class="text-gray-700 text-center">
                    Menggunakan model Machine Learning dengan algoritma Random Forest untuk menganalisis gejala dan memberikan informasi kemungkinan penyakit.
                </p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                <div class="mb-4 text-green-500 text-center">
                    <i class="fas fa-user-md text-4xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-center mb-3">Rekomendasi Medis</h3>
                <p class="text-gray-700 text-center">
                    Mendapatkan informasi tentang kemungkinan penyakit, deskripsi, langkah pencegahan, dan saran penanganan awal.
                </p>
            </div>
        </div>
    </section>

    <!-- Technology -->
    <section class="mb-16">
        <div class="bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Teknologi yang Digunakan</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 class="text-xl font-semibold text-blue-600 mb-4">Machine Learning</h3>
                    <ul class="list-disc pl-5 text-gray-700 space-y-2">
                        <li>Model klasifikasi penyakit berbasis input gejala menggunakan algoritma Random Forest</li>
                        <li>Dibuat dengan Scikit-Learn dan TensorFlow</li>
                        <li>Dataset dari sumber terpercaya untuk memastikan keakuratan informasi</li>
                        <li>Analisis gejala dengan tingkat akurasi hingga 95%</li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="text-xl font-semibold text-blue-600 mb-4">Web Development</h3>
                    <ul class="list-disc pl-5 text-gray-700 space-y-2">
                        <li>Frontend: HTML, CSS, JavaScript dengan Tailwind CSS</li>
                        <li>Backend: Node.js dengan framework Hapi</li>
                        <li>Database: MySQL untuk menyimpan data pengguna dengan aman</li>
                        <li>Webpack untuk bundling dan optimasi aplikasi</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Features -->
    <section class="mb-16">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Fitur Utama</h2>
        
        <div class="space-y-6">
            <div class="bg-white p-6 rounded-lg shadow-md flex items-start">
                <div class="bg-blue-100 p-3 rounded-full mr-4">
                    <i class="fas fa-stethoscope text-blue-600 text-xl"></i>
                </div>
                <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">Analisis Gejala Cepat</h3>
                    <p class="text-gray-700">
                        Masukkan gejala yang Anda alami dan dapatkan hasil analisis dalam waktu kurang dari 2 menit dengan tingkat akurasi mencapai 95%.
                    </p>
                </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md flex items-start">
                <div class="bg-blue-100 p-3 rounded-full mr-4">
                    <i class="fas fa-book-medical text-blue-600 text-xl"></i>
                </div>
                <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">Informasi Penyakit Lengkap</h3>
                    <p class="text-gray-700">
                        Akses informasi lengkap tentang berbagai penyakit, termasuk deskripsi, gejala umum, langkah pencegahan, dan opsi pengobatan awal.
                    </p>
                </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md flex items-start">
                <div class="bg-blue-100 p-3 rounded-full mr-4">
                    <i class="fas fa-lock text-blue-600 text-xl"></i>
                </div>
                <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">Keamanan Data</h3>
                    <p class="text-gray-700">
                        Data Anda aman dan terenkripsi. GejalaKu menjamin privasi pengguna dan keamanan informasi kesehatan Anda.
                    </p>
                </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md flex items-start">
                <div class="bg-blue-100 p-3 rounded-full mr-4">
                    <i class="fas fa-user-md text-blue-600 text-xl"></i>
                </div>
                <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">Didukung oleh Tenaga Medis</h3>
                    <p class="text-gray-700">
                        Informasi kesehatan yang disediakan oleh GejalaKu telah dikonsultasikan dengan para profesional medis untuk memastikan keakuratan dan relevansi.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section class="mb-16">
        <div class="bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Pertanyaan Umum</h2>
            
            <div class="space-y-6">
                <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Apakah GejalaKu menggantikan konsultasi dengan dokter?</h3>
                    <p class="text-gray-700">
                        Tidak. GejalaKu dirancang sebagai alat bantu awal untuk mengenali gejala dan meningkatkan kesadaran kesehatan. Kami selalu menyarankan untuk berkonsultasi dengan tenaga medis profesional untuk diagnosis dan perawatan yang tepat.
                    </p>
                </div>
                
                <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Bagaimana tingkat akurasi analisis GejalaKu?</h3>
                    <p class="text-gray-700">
                        Model Machine Learning kami memiliki tingkat akurasi sekitar 95% berdasarkan dataset yang telah diverifikasi. Namun, hasilnya tetap bersifat informatif dan bukan diagnosis medis resmi.
                    </p>
                </div>
                
                <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Apakah penggunaan GejalaKu berbayar?</h3>
                    <p class="text-gray-700">
                        Tidak, GejalaKu dapat digunakan secara gratis. Kami berkomitmen untuk meningkatkan akses masyarakat terhadap informasi kesehatan yang berkualitas.
                    </p>
                </div>
                
                <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Bagaimana GejalaKu melindungi data saya?</h3>
                    <p class="text-gray-700">
                        Semua data pengguna GejalaKu terenkripsi dan disimpan dengan aman. Kami tidak membagikan informasi kesehatan pribadi Anda kepada pihak ketiga tanpa persetujuan Anda.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    </div>
    <section>
        <div class="bg-blue-600 shadow-md p-8 text-white text-center">
            <h2 class="text-2xl font-bold mb-4">Siap Menggunakan GejalaKu?</h2>
            <p class="mb-6 text-lg">Mulai perjalanan menuju kesehatan yang lebih baik dengan mengenali gejala lebih awal</p>
            <div class="flex justify-center space-x-4">
                <a href="#" class="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100">Cek Gejala Sekarang</a>
                <a href="#" class="bg-blue-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800">Register</a>
            </div>
        </div>
    </section>
        `;
  }

  async afterRender() {}
}
