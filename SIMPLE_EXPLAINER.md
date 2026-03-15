# 🌊 Aqua Blast: How It Works (Simple Guide)

Hey there! If you're wondering how this website actually works behind the scenes, this guide is for you. We've broken down the "tech talk" into simple ideas that anyone can understand.

---

## 🏠 1. The Big Picture (Architecture)
Think of a website like a **Restaurant**:

*   **The Dining Area (Frontend - React):** This is what you see. It's the tables, the menu, and the decor. In our app, we use **React** to make sure the "menu" looks great and responds instantly when you click something.
*   **The Kitchen (Backend - Express):** This is where the work happens. It takes your order and makes sure it gets to the right place.
*   **The Storage Room (Database - Firebase):** This is like the pantry. It stores all the ingredients (your data, like your name and your bookings) so the kitchen can find them later.

---

## 🔐 2. Who Are You? (Authentication)
When you log in, it's like showing an **ID Card** at the door. 
*   We use **Firebase Auth**. It’s like a super-secure bouncer that checks if your password is correct or if your Google account is real. Once you're in, the bouncer gives you a "VIP Wristband" (a token) so you don't have to log in again every time you change pages.

---

## 📂 3. The Filing Cabinet (Database)
We use something called **Firestore**. Imagine a giant filing cabinet with two main drawers:

1.  **Users Drawer:** Every person who signs up gets a folder here with their name and email.
2.  **Bookings Drawer:** Every time someone asks for a cleaning, a new "order form" is put in this drawer. It says who asked for it, what they want cleaned, and when.

---

## 🛡️ 4. The Boss Mode (Admin Section)
Most people are "Clients"—they can only see their own folders. But there’s a special role called **Admin**.
*   **Admins** have a "Master Key." They can open *every* folder in the cabinet to see all the bookings, change the status (like marking a job as "Done"), or add notes for the cleaning crew.

---

## 📊 5. Understanding the Diagrams

### The ER Diagram (The Family Tree)
This just shows how things are related. 
*   **User** ➡️ **Booking**: One user can have many bookings. It’s like one customer having many receipts.

### The DFD (The Information Highway)
This shows how data travels:
1.  You type your info into the **UI** (the screen).
2.  The **UI** sends it to the **Database**.
3.  The **Database** saves it and sends a "Thumbs Up" back to the screen so you know it worked.
4.  If an **Admin** changes something, the **Database** tells the **UI** immediately (we call this "Real-time"), and the screen updates without you even having to refresh!

---

## 🛠️ 6. The Tools We Used (The Tech Stack)
*   **React:** The "Lego blocks" we used to build the pages.
*   **Tailwind CSS:** The "Paint" we used to make the colors and layout look cool.
*   **Firebase:** The "Cloud" that holds all our data so it doesn't get lost.
*   **Lucide Icons:** The little pictures (like the house or the water drop) you see on the buttons.

---

## 📖 Summary
Basically, Aqua Blast is a smart system that lets people book cleaning jobs, keeps that info safe in the cloud, and lets the bosses manage everything from one place. It’s built to be fast, secure, and easy to use!
