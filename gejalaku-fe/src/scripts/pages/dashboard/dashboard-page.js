export default class DashboardPage {
  async render() {
    return `

    <section class="py-16 md:py-24 px-4">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pahami Gejala, <br /><span class="text-blue-600">Jaga Kesehatan Anda</span>
            </h1>
            <p class="my-4 text-lg text-gray-600 max-w-lg">
              GejalaKu menggunakan kecerdasan buatan untuk memahami gejala Anda dan membantu memberikan arahan untuk langkah selanjutnya.
            </p>
            <div class="flex flex-col sm:flex-row space- sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <button
                id="cek-gejala-btn"
                class="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition transform hover:-translate-y-1 shadow-md"
              >
                <i class="fas fa-search mr-2"></i> Cek Gejala Sekarang
              </button>
              <a
                href="#/about"
                class="border border-blue-600 text-blue-600 font-medium px-6 py-3 rounded-md hover:bg-blue-50 transition"
              >
                <i class="fas fa-info-circle mr-2"></i> Pelajari Lebih Lanjut
              </a>
            </div>
             <div class="mt-4 flex items-center text-sm text-gray-500">
              <i class="fas fa-shield-alt text-primary-500 mr-2"></i>
              <span>Data Anda aman dan terenkripsi</span>
              <i class="fas fa-user-md text-primary-500 mx-2 ml-4"></i>
              <span>Didukung oleh tenaga medis profesional</span>
            </div>
          </div>
          <div class="md:w-1/2">
            <div class="relative">
              <div class="w-64 h-64 md:w-80 md:h-80 mx-auto bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                <img id="dashboard-image" src="/images/dashboard.png" alt="Health Illustrations" class="object-cover" />
              </div>
              <div class="absolute -top-4 -right-2 bg-green-100 rounded-full p-4 flex items-center justify-center animate-pulse">
                <i class="fas fa-shield-virus text-green-600 text-xl"></i>
              </div>
              <div class="absolute -bottom-4 -left-2 bg-purple-100 rounded-full p-4 flex items-center justify-center animate-pulse">
                <i class="fas fa-stethoscope text-purple-600 text-xl"></i>
              </div>

              <div class="absolute -bottom-10 -right-5 p-4 bg-white rounded-lg shadow-lg transform rotate-3 hidden md:block">
                <div class="flex items-center">
                    <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                        <i class="fas fa-check text-sm"></i>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium">Hasil dalam 2 menit</p>
                    </div>
                </div>
                </div>

                <div class="absolute -top-10 -left-5 p-4 bg-white rounded-lg shadow-lg transform -rotate-6 hidden md:block">
                    <div class="flex items-center">
                        <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                            <i class="fas fa-heartbeat text-sm"></i>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium">95% akurat</p>
                        </div>
                    </div>
                </div>
            </div>

            
          </div>
        </div>
      </section>

    <!-- Features Section -->
    <section id="features" class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-base font-semibold text-primary-600 tracking-wide uppercase">Fitur Utama</h2>
          <p class="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Mengapa menggunakan GejalaKu?</p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Platform kami dirancang untuk memberikan informasi kesehatan yang akurat dan dapat diandalkan dengan cepat.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 symptom-card">
             <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <i class="fas fa-search text-blue-600 text-xl"></i>
              </div>
              <h3 class="text-xl font-semibold mb-2">Pengecekan Gejala</h3>
            <p class="text-gray-600">
              Masukkan gejala Anda dan dapatkan analisis kesehatan awal dalam hitungan menit, tanpa menunggu lama.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 symptom-card">
             <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <i class="fas fa-robot text-purple-600 text-xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">AI Canggih</h3>
            <p class="text-gray-600">
              Didukung oleh kecerdasan buatan yang dilatih dengan data medis terkini untuk memberikan hasil yang akurat.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 symptom-card">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <i class="fas fa-user-md text-green-600 text-xl"></i>
              </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Rekomendasi Medis</h3>
            <p class="text-gray-600">
              Terhubung dengan dokter berpengalaman untuk konsultasi lanjutan jika diperlukan.
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 symptom-card">
            <div class="w-12 h-12 bg-pink-100 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <i class="fas fa-mobile-alt text-pink-600 text-xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Akses dari Mana Saja</h3>
            <p class="text-gray-600">
              Gunakan GejalaKu dari smartphone, tablet, atau komputer Anda kapan saja dan di mana saja.
            </p>
          </div>

          <!-- Feature 5 -->
          <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 symptom-card">
            <div class="w-12 h-12 bg-gray-100 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <i class="fas fa-shield-alt text-gray-600 text-xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Privasi Terjamin</h3>
            <p class="text-gray-600">
              Data Anda dienkripsi end-to-end dan tidak pernah dibagikan tanpa izin Anda.
            </p>
          </div>

          <!-- Feature 6 -->
          <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 symptom-card">
            <div class="w-12 h-12 bg-yellow-100 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <i class="fas fa-history text-yellow-600 text-xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Riwayat Medis</h3>
            <p class="text-gray-600">
              Simpan riwayat pemeriksaan Anda untuk referensi di masa depan dan pantau kesehatan Anda.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-base font-semibold text-primary-600 tracking-wide uppercase">Cara Kerja</h2>
          <p class="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Mudah digunakan dalam 3 langkah sederhana</p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Proses yang cepat dan mudah untuk mendapatkan wawasan tentang kesehatan Anda.
          </p>
        </div>

        <div class="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
            <div class="step-item flex flex-col items-center text-center max-w-xs">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 relative">
                <span class="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full text-white flex items-center justify-center text-sm">1</span>
                <i class="fas fa-clipboard-list text-blue-600 text-xl"></i>
              </div>
              <h3 class="text-lg font-semibold mb-2">Pilih Gejala</h3>
              <p class="text-gray-600">Pilih gejala yang Anda alami dari daftar yang komprehensif</p>
            </div>
            
            <div class="hidden md:block text-blue-400">
              <i class="fas fa-long-arrow-alt-right text-3xl"></i>
            </div>
            
            <div class="step-item flex flex-col items-center text-center max-w-xs">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 relative">
                <span class="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full text-white flex items-center justify-center text-sm">2</span>
                <i class="fas fa-laptop-medical text-blue-600 text-xl"></i>
              </div>
              <h3 class="text-lg font-semibold mb-2">Proses Analisis</h3>
              <p class="text-gray-600">Sistem kami menganalisis gejala Anda dengan database medis yang luas</p>
            </div>
            
            <div class="hidden md:block text-blue-400">
              <i class="fas fa-long-arrow-alt-right text-3xl"></i>
            </div>
            
            <div class="step-item flex flex-col items-center text-center max-w-xs">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 relative">
                <span class="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full text-white flex items-center justify-center text-sm">3</span>
                <i class="fas fa-file-medical-alt text-blue-600 text-xl"></i>
              </div>
              <h3 class="text-lg font-semibold mb-2">Terima Hasil</h3>
              <p class="text-gray-600">Dapatkan informasi yang relevan dan rekomendasi langkah selanjutnya</p>
            </div>
          </div>
        </div>        
      </div>
    </section>    

      <!-- Cek Gejala Modal -->
      <div id="gejala-modal" class="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 hidden flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-semibold text-gray-900">Cek Gejala Anda</h3>
              <button id="close-modal" class="text-gray-500 hover:text-gray-700">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <p class="text-gray-600 mb-4">Pilih gejala yang Anda alami untuk mendapatkan informasi lebih lanjut.</p>
            
            <div class="mb-4">
              <input type="text" id="gejala-search" placeholder="Cari gejala..." class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            
            <div class="space-y-2 mb-6">
              <div class="flex items-center">
                <input type="checkbox" id="gejala-1" class="mr-2">
                <label for="gejala-1" class="text-gray-700">Demam</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" id="gejala-2" class="mr-2">
                <label for="gejala-2" class="text-gray-700">Sakit kepala</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" id="gejala-3" class="mr-2">
                <label for="gejala-3" class="text-gray-700">Batuk</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" id="gejala-4" class="mr-2">
                <label for="gejala-4" class="text-gray-700">Pilek</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" id="gejala-5" class="mr-2">
                <label for="gejala-5" class="text-gray-700">Nyeri otot</label>
              </div>
            </div>
            
            <button class="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition">
              Analisis Gejala
            </button>
          </div>
        </div>
      </div>

     
      <!-- Testimoni Section -->
      <section id="testimoni" class="py-16 bg-gray-100">
        <div class="max-w-6xl mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12">Apa Kata Pengguna</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-200 rounded-full mr-4"></div>
                <div>
                  <h4 class="font-semibold">Dzaky Fawwaz</h4>
                  <div class="flex text-yellow-400">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p class="text-gray-600">"GejalaKu sangat membantu saya untuk memahami gejala yang saya alami. Rekomendasi yang diberikan sangat akurat!"</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-green-200 rounded-full mr-4"></div>
                <div>
                  <h4 class="font-semibold">Siti Nurhayati</h4>
                  <div class="flex text-yellow-400">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                  </div>
                </div>
              </div>
              <p class="text-gray-600">"Aplikasi yang sangat informatif. Saya merasa lebih tenang sebelum pergi ke dokter karena sudah mendapat gambaran tentang kondisi saya."</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-purple-200 rounded-full mr-4"></div>
                <div>
                  <h4 class="font-semibold">Ahmad Fauzi</h4>
                  <div class="flex text-yellow-400">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p class="text-gray-600">"Antarmuka yang intuitif dan mudah digunakan. Proses pengecekan gejala sangat cepat dan hasilnya komprehensif."</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-16 bg-blue-600">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold text-white mb-4">Siap untuk menjaga kesehatan Anda?</h2>
          <p class="text-blue-100 mb-8">Daftar sekarang dan mulai perjalanan kesehatan Anda bersama GejalaKu.</p>
          <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
            <button
              class="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-blue-50 transition shadow-md"
            >
              Daftar Sekarang
            </button>
            <button
              id="cek-gejala-btn-2"
              class="border border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Cek Gejala
            </button>
          </div>
        </div>
      </section>
    </main>
    `;
  }

  // <div class="flex-grow flex flex-col justify-center items-center text-center max-w-md my-auto mx-auto">
  //     <div class="mb-6">
  //         <div
  //         class="w-32 h-32 rounded-full bg-blue-200 flex items-center justify-center mx-auto"
  //         >
  //         <i class="fas fa-heartbeat text-blue-600 text-4xl"></i>
  //         </div>
  //     </div>
  //     <h2 class="font-semibold text-gray-900 text-lg leading-6 mb-2">
  //         Check your symptoms, get instant health insights
  //     </h2>
  //     <p class="text-gray-500 text-sm mb-6 leading-relaxed">
  //         <span class="font-normal">GejalaKu</span> helps you understand your
  //         symptoms and guides you on your next steps.
  //     </p>
  //     <a
  //         href="#/login"
  //         id="login-button"
  //         class="cursor-pointer w-full bg-blue-600 text-white font-semibold py-2 rounded-md mb-2 hover:bg-blue-700 transition"
  //     >
  //         Login
  //     </a>
  //     <a href="#/register" id="register-button" class="cursor-pointer w-full border border-blue-600 text-blue-600 font-normal py-2 rounded-md hover:bg-blue-50 transition"
  //     >
  //         Register
  //     </a>
  // </div>
  async afterRender() {
    document.getElementById('main-content');
  }
}
