import numpy as np
import tensorflow as tf

# --- Load symptoms dari file ---
with open("symptoms.txt", "r") as f:
    all_symptoms = [line.strip() for line in f]

# --- Load label mapping dari file ---
with open("label.txt", "r") as f:
    label_dict = eval(f.read())

# Buat reverse mapping: label (int) -> nama penyakit
reverse_label_dict = {v: k for k, v in label_dict.items()}

# Load model dari direktori
model = tf.keras.models.load_model("saved_model_folder")

# data input
gejala_input = input("Masukkan gejala, pisahkan dengan koma: ").split(",")
gejala_input = [g.strip() for g in gejala_input]

# --- One-hot encoding sesuai urutan all_symptoms ---
input_vector = [1 if symptom in gejala_input else 0 for symptom in all_symptoms]
input_array = np.array([input_vector], dtype=np.float32)  # shape (1, 131)

# --- Predict ---
prediction = model.predict(input_array)
predicted_class = tf.argmax(prediction[0]).numpy()
predicted_disease = reverse_label_dict[predicted_class]

print("Prediksi penyakit:", predicted_disease)