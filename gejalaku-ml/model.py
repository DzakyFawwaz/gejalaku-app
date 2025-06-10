import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
import joblib

# 1. Memuat Dataset
# Memuat semua file CSV yang diperlukan
try:
    df_disease = pd.read_csv('dataset-clean/df_disease.csv')
    df_description = pd.read_csv('dataset-clean/df_disease_description.csv')
    df_precaution = pd.read_csv('dataset-clean/df_disease_precaution.csv')
    df_drug = pd.read_csv('dataset-clean/df_drug.csv')
except FileNotFoundError as e:
    print(f"Error: Pastikan file CSV berikut ada di direktori yang sama:")
    print(e)
    exit()

# --- PERBAIKAN untuk KeyError ---
# Mengganti nama kolom secara eksplisit untuk memastikan konsistensi.
# Ini mengasumsikan urutan kolom di file CSV asli adalah tetap.
df_description.rename(columns={
    df_description.columns[0]: 'disease',
    df_description.columns[1]: 'description'
}, inplace=True)

df_precaution.rename(columns={
    df_precaution.columns[0]: 'disease',
    df_precaution.columns[1]: 'precaution_1',
    df_precaution.columns[2]: 'precaution_2',
    df_precaution.columns[3]: 'precaution_3',
    df_precaution.columns[4]: 'precaution_4'
}, inplace=True)

df_drug.rename(columns={
    df_drug.columns[0]: 'disease',
    df_drug.columns[1]: 'drug'
}, inplace=True)
# --- AKHIR PERBAIKAN ---

# Menangani nilai yang hilang di kolom target 'prognosis' jika ada
df_disease.dropna(subset=['Disease'], inplace=True)

# 2. Pra-pemrosesan Data
# Memisahkan fitur (X) dan target (y)
X = df_disease.drop('Disease', axis=1)
y = df_disease['Disease']

# Secara eksplisit memastikan semua kolom fitur bertipe data integer.
# Ini untuk mencegah error tipe data saat training dan prediksi.
for col in X.columns:
    X[col] = pd.to_numeric(X[col], errors='coerce').fillna(0).astype(int)

# Menggunakan LabelEncoder untuk mengubah label penyakit menjadi angka
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Menyimpan daftar kolom fitur (gejala) untuk digunakan nanti di backend
feature_columns = X.columns.tolist()
joblib.dump(feature_columns, 'feature_columns.pkl')
joblib.dump(label_encoder, 'label_encoder.pkl')


# 3. Membagi Data
# Membagi dataset menjadi data latih dan data uji
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded)

# 4. Membuat Pipeline Machine Learning
# Membuat pipeline yang terdiri dari dua langkah:
# a. SimpleImputer: Untuk menangani nilai yang hilang (missing values) dengan menggantinya dengan nilai 0.
#    Ini memenuhi persyaratan "Missing Values Imputation".
# b. RandomForestClassifier: Model klasifikasi yang akan kita gunakan.# --- PERBAIKAN: Menambahkan class_weight='balanced' ---
# Ini akan mengatasi masalah data tidak seimbang dengan memberi bobot lebih pada kelas minoritas.
pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='constant', fill_value=0)),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42, class_weight='balanced'))
])
# --- AKHIR PERBAIKAN ---
# 5. Melatih Model
# Melatih seluruh pipeline dengan data latih
print("Memulai pelatihan model...")
pipeline.fit(X_train, y_train)
print("Pelatihan model selesai.")

# 6. Mengevaluasi Model
# Membuat prediksi pada data uji
y_pred = pipeline.predict(X_test)

# Menghitung akurasi model
accuracy = accuracy_score(y_test, y_pred)
print(f"Akurasi model: {accuracy * 100:.2f}%")

# 7. Menyimpan Model
# Menyimpan pipeline yang sudah dilatih ke dalam sebuah file
joblib.dump(pipeline, 'gejalaku_model.pkl')
print("Model telah disimpan sebagai 'gejalaku_model.pkl'")

# 8. Menggabungkan data informasi
# Menggabungkan semua data informasi menjadi satu file untuk kemudahan akses di backend
disease_info = df_description.merge(df_precaution, on='disease')
disease_info = disease_info.merge(df_drug, on='disease')
disease_info.to_csv('disease_info.csv', index=False)
print("Informasi penyakit, pencegahan, dan obat telah digabungkan ke 'disease_info.csv'")
