// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-storage.js";

// 🔗 Your Cloud Function API
const API_URL = "http://127.0.0.1:5001/smarthealthapp-3d6a1/us-central1/api";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAShr1W6im1gM3dNmlEqtqEQzxns0bb-r8",
  authDomain: "smarthealthapp-3d6a1.firebaseapp.com",
  projectId: "smarthealthapp-3d6a1",
  storageBucket: "smarthealthapp-3d6a1.firebasestorage.app",
  messagingSenderId: "49817159971",
  appId: "1:49817159971:web:2e7664ac5a2bcbe8b2a496",
  measurementId: "G-PJJL2MQGZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Elements
const uploadBtn = document.getElementById("uploadBtn");
const input = document.getElementById("prescriptionInput");
const status = document.getElementById("status");
const result = document.getElementById("result");

// Upload + Send to Cloud Function
uploadBtn.addEventListener("click", async () => {
  const file = input.files[0];
  if (!file) {
    alert("Please select a prescription image first!");
    return;
  }

  try {
    status.innerText = "Uploading image...";
    const storageRef = ref(storage, "prescriptions/" + file.name);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    status.innerText = "Sending to Cloud Function...";

    // Call Cloud Function
    const res = await fetch(`${API_URL}?imageUrl=${encodeURIComponent(downloadURL)}`);
    const data = await res.json();

    result.innerText = data?.text || "No text extracted from prescription.";
    status.innerText = "✅ Analysis complete!";
  } catch (err) {
    console.error(err);
    status.innerText = "❌ Error during upload/analysis.";
  }
});

// Optional: Convert file to Base64 (only if needed by some APIs)
async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}