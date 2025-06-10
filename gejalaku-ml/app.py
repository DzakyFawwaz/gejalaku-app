from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np

# Inisialisasi aplikasi Flask
app = Flask(__name__)
CORS(app)  # Mengaktifkan Cross-Origin Resource Sharing

# Memuat artefak yang telah disimpan
try:
    model = joblib.load('gejalaku_model.pkl')
    feature_columns = joblib.load('feature_columns.pkl')
    label_encoder = joblib.load('label_encoder.pkl')
    disease_info = pd.read_csv('disease_info.csv')
except FileNotFoundError as e:
    print(f"Error: Pastikan file model dan data pendukung ada.")
    print(f"Jalankan 'model.py' terlebih dahulu untuk menghasilkan file-file ini.")
    print(e)
    exit()

@app.route('/')
def home():
    return "<h1>Backend GejalaKu Aktif!</h1><p>Gunakan endpoint /predict untuk melakukan diagnosis.</p>"


@app.route('/predict', methods=['POST'])
def predict():
    """
    Endpoint untuk memprediksi penyakit berdasarkan gejala yang diterima.
    Menerima JSON dengan key 'symptoms' yang berisi daftar gejala.
    """
    if not request.json or 'symptoms' not in request.json:
        return jsonify({'error': 'Request tidak valid, harus berisi "symptoms"'}), 400

    # Mengambil daftar gejala dari request
    user_symptoms = request.json['symptoms']

    # --- PERBAIKAN: Menambahkan Logging untuk Diagnosis ---
    print("\n" + "="*40)
    print("REQUEST BARU DITERIMA")
    print(f"Gejala yang diterima: {user_symptoms}")
    # --- AKHIR PERBAIKAN ---

    # --- PERBAIKAN DIMULAI DI SINI ---
    # Membuat DataFrame input untuk model, sesuai dengan format saat training
    # 1. Buat DataFrame dengan satu baris berisi angka 0 dan kolom sesuai fitur model.
    input_df = pd.DataFrame(0, index=[0], columns=feature_columns)

    # 2. Ubah nilai menjadi 1 untuk gejala yang dilaporkan oleh pengguna.
    for symptom in user_symptoms:
        if symptom in input_df.columns:
            input_df.loc[0, symptom] = 1
    # --- PERBAIKAN SELESAI ---

     # --- PERBAIKAN: LOGGING TAMBAHAN UNTUK DIAGNOSIS ---
    # Mencetak gejala mana saja yang aktif (bernilai 1) di dalam DataFrame
    # sebelum dikirim ke model.
    active_symptoms_in_df = input_df.columns[input_df.loc[0] == 1].tolist()
    print(f"DataFrame Input untuk Model (Gejala Aktif): {active_symptoms_in_df}")
    # --- AKHIR PERBAIKAN ---

    # Melakukan prediksi menggunakan model dengan DataFrame sebagai input
    prediction_encoded = model.predict(input_df)

    # Mengubah hasil prediksi dari angka kembali ke nama penyakit
    predicted_disease_name = label_encoder.inverse_transform(prediction_encoded)[0]

     # --- PERBAIKAN: Menambahkan Logging untuk Diagnosis ---
    print(f"Hasil Prediksi Model: {predicted_disease_name}")
    print("="*40 + "\n")
    # --- AKHIR PERBAIKAN ---

    # Mengambil informasi detail tentang penyakit yang diprediksi
    info = disease_info[disease_info['disease'] == predicted_disease_name]

    if info.empty:
        return jsonify({'error': 'Informasi untuk penyakit ini tidak ditemukan.'}), 404

    # Menyusun respons JSON
    result = {
        'predicted_disease': predicted_disease_name,
        'description': info['description'].iloc[0],
        'precautions': [
            info['precaution_1'].iloc[0],
            info['precaution_2'].iloc[0],
            info['precaution_3'].iloc[0],
            info['precaution_4'].iloc[0]
        ],
        'medications': info['drug'].iloc[0].split(', ') # Asumsi obat dipisahkan koma
    }

    return jsonify(result)

if __name__ == '__main__':
    # Menjalankan server Flask di port 5000
    # host='0.0.0.0' agar bisa diakses dari luar container/mesin
    app.run(host='0.0.0.0', port=8181, debug=True)
