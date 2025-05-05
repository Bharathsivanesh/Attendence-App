# 🏨 Hostel Attendance App

📲 **Purpose**  
To streamline hostel attendance management by enabling wardens to take attendance, manage student data, and notify parents about absences efficiently.

---

## 📋 Overview

This app provides **role-based functionality**, allowing:
- 🛠️ **Admins** to manage warden credentials and assign hostel blocks.
- 🧑‍🏫 **Wardens** to take attendance, manage student records, and send daily reports.

---

## ✨ Features

### 🔐 Role-based Authentication
- **Admin**
  - ➕ Create warden credentials
  - ✏️ Edit credentials
  - ❌ Delete credentials
  - 🏢 Assign blocks to wardens
- **Warden**
  - 📝 Take attendance
  - 👩‍🎓 Manage student records
  - 📤 Export attendance details

---

### 📅 Attendance Management
- 🛏️ Display rooms under assigned blocks
- ✅ Mark students as present
- ❌ Mark students as absent
- 📲 Notify parents via SMS (powered by **Twilio**)

---

### 👨‍🎓 Student Management
- ➕ Add student details
- ✏️ Edit student details
- ❌ Delete student details
- 🛏️ Assign students to rooms

---

### 📊 Daily Reports
- 📤 Export attendance details to the admin
- 🧹 Auto-clear previous day’s data after export

---

### 💻 Responsive UI
- Built using **Tailwind CSS** for a mobile-first and responsive experience

### 🔒 Data Security
- 🔐 Firebase Authentication
- 🗂️ Firestore for secure database access
- 🔑 Role-based access control

---
### 💻 Screenshots
![Image](https://github.com/user-attachments/assets/f48a78aa-bb05-4060-b956-63029f879584)
![Image](https://github.com/user-attachments/assets/4900df7a-32cb-4c76-81d9-a47331b2f2d4)
![Image](https://github.com/user-attachments/assets/63f0d933-1d1e-477b-ac88-4bfa8addc9ac)

## 🛠️ Technical Overview

### 🏗️ Architecture
- **Client:** React Native + Tailwind CSS
- **Backend:** Firebase (Authentication + Firestore)
- **SMS Integration:** Twilio for sending notifications

---

### 🧰 Technology Stack
- ⚛️ React Native
- 🔥 Firebase (Firestore & Authentication)
- 📲 Twilio (SMS)
- 🎨 Tailwind CSS

---

### 📦 Dependencies
- All dependencies are listed in `package.json`

---

## 📱 Device Requirements
- Android or iOS device for warden use

---

## 🚀 Installation & Setup

### 📋 Prerequisites
- ✅ [Node.js](https://nodejs.org/) installed
- ✅ [Expo CLI](https://docs.expo.dev/get-started/installation/) installed globally
- ✅ Firebase account
- ✅ Twilio account

### ⚙️ Setup Instructions
1. Clone the repo:
   ```bash
   git clone https://github.com/Bharathsivanesh/Hostel-AttendenceApp.git
   cd Hostel-AttendenceApp
