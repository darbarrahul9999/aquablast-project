# Aqua Blast - The Surface Experts

Aqua Blast is a professional pressure washing service application built with a modern full-stack architecture. It provides users with the ability to learn about services, book restoration appointments, and manage their bookings in real-time.

---

## 🏗️ Architecture

The application follows a **Full-Stack SPA (Single Page Application)** architecture with a serverless backend integration.

- **Frontend**: 
  - **React 18** with **Vite** for fast development and optimized builds.
  - **Tailwind CSS** for utility-first styling.
  - **Motion (Framer Motion)** for smooth animations and transitions.
  - **Lucide React** for consistent iconography.
- **Backend**:
  - **Express.js** server running on Node.js to serve the application and handle routing.
- **Database & Authentication**:
  - **Firebase Authentication**: Handles secure user sign-up, login (Email/Password & Google), and session management.
  - **Cloud Firestore**: A NoSQL document database providing real-time data synchronization via `onSnapshot` listeners.
- **Security**:
  - **Firestore Security Rules**: Implements granular access control (RBAC). Clients are restricted to their own documents, while **Admins** have global read/write access to all collections for management purposes.
  - **Error Boundary**: Custom React Error Boundary to catch and report database permission issues.

---

## 🌐 Website Schema (Sitemap)

The application structure is organized into the following routes:

- **Home (`/`)**: Hero section, value proposition, and featured services.
- **About (`/about`)**: Company philosophy, team information, and performance statistics.
- **Services (`/services`)**: Detailed breakdown of Residential, Commercial, and Industrial services.
- **Contact (`/contact`)**: Interactive booking form for scheduling services.
- **Auth (`/auth`)**: Unified Login and Sign-up portal with Google integration.
- **Dashboard (`/dashboard`)**: Private user area to view and manage active/past bookings.

---

## 📊 Database Schema (Firestore)

The database is structured into two primary collections:

### 1. `users` Collection
Stores profile information for authenticated users.
- **Path**: `/users/{userId}`
- **Entity**: `User`

### 2. `bookings` Collection
Stores service requests made by users.
- **Path**: `/bookings/{bookingId}`
- **Entity**: `Booking`

---

## 📖 Data Dictionary

### Entity: User
| Field | Type | Format | Description |
|-------|------|--------|-------------|
| `uid` | String | - | Unique identifier from Firebase Auth |
| `email` | String | Email | User's registered email address |
| `displayName`| String | - | User's full name or nickname |
| `role` | String | Enum | User permission level (`client`, `admin`) |
| `createdAt` | String | ISO 8601 | Timestamp of account creation |

### Entity: Booking
| Field | Type | Format | Description |
|-------|------|--------|-------------|
| `userId` | String | - | Reference to the User who created the booking |
| `service` | String | - | Type of service requested (e.g., Residential) |
| `date` | String | Date | Scheduled date for the service |
| `message` | String | - | Additional notes or instructions |
| `status` | String | Enum | `pending`, `confirmed`, `cancelled`, `completed` |
| `adminNotes` | String | - | Internal notes added by administrators |
| `assignedStaff` | String | - | Name of the staff member assigned to the job |
| `createdAt` | String | ISO 8601 | Timestamp of booking submission |
| `updatedAt` | String | ISO 8601 | Timestamp of the last administrative update |

---

## 🛡️ Admin Section (Administrative Capabilities)

While the primary user interface focuses on client interactions, the system is architected with a robust Administrative layer.

### Admin Role
Users with the `role: 'admin'` attribute in their Firestore document gain elevated privileges. The system identifies the initial administrator via the primary developer email (`darbarrahul99.99@gmail.com`).

### Administrative Functions
- **Global Booking Oversight**: Admins can view all bookings across all users in the system.
- **Status Management**: Ability to transition booking statuses (e.g., from `pending` to `confirmed` or `completed`).
- **User Management**: Oversight of user profiles and account statuses.
- **Security Enforcement**: All administrative actions are strictly validated via server-side Firestore Security Rules, preventing unauthorized privilege escalation.

---

## 📐 ER Diagram (Entity-Relationship)

The following diagram illustrates the detailed data structure and the primary relationships between users and their bookings, including administrative metadata.

```mermaid
erDiagram
    USER ||--o{ BOOKING : "owns / manages"
    USER {
        string uid PK "Firebase Auth UID"
        string email "User Email"
        string displayName "Full Name"
        string role "client | admin"
        string createdAt "ISO Timestamp"
    }
    BOOKING {
        string bookingId PK "Document ID"
        string userId FK "Reference to USER.uid"
        string service "Service Type"
        string date "Scheduled Date"
        string message "User Notes"
        string status "pending | confirmed | cancelled | completed"
        string adminNotes "Internal Admin Notes"
        string assignedStaff "Staff Name"
        string createdAt "Submission Time"
        string updatedAt "Last Admin Update"
    }
```

---

## 🔄 Data Flow Diagrams (DFD)

### Level 0: Context Diagram
The high-level view of the system's interactions with Client, Worker, and Admin entities.

```mermaid
graph TD
    Client((Client User))
    Worker((Field Worker))
    Admin((System Admin))
    System[Aqua Blast Restoration System]

    Client -- "1. Booking Requests" --> System
    System -- "2. Status Updates" --> Client
    
    Admin -- "3. Assign Workers" --> System
    System -- "4. Global Oversight" --> Admin
    
    Worker -- "5. Task Completion" --> System
    System -- "6. Assigned Jobs" --> Worker

    style System fill:#00E5FF,stroke:#141414,stroke-width:4px
    style Client fill:#E4E3E0,stroke:#141414
    style Worker fill:#E4E3E0,stroke:#141414
    style Admin fill:#E4E3E0,stroke:#141414
```

### Level 1: Process Decomposition
Breaking down the system into core functional processes with Admin integration.

```mermaid
graph TD
    User((Client User))
    Admin((System Admin))
    
    subgraph "Aqua Blast Core Processes"
        P1[1.0 Identity & Access]
        P2[2.0 Booking Lifecycle]
        P3[3.0 User Profiles]
        P4[4.0 Admin Management]
    end
    
    D1[(Auth Store)]
    D2[(Firestore DB)]

    User -- "Auth Request" --> P1
    Admin -- "Admin Auth" --> P1
    P1 -- "Verify" --> D1
    D1 -- "Session" --> P1
    
    User -- "Create/View Booking" --> P2
    Admin -- "Update Status/Notes" --> P2
    P2 -- "Sync State" --> D2
    D2 -- "Data Streams" --> P2
    
    User -- "Update Info" --> P3
    P3 -- "Store" --> D2
    
    Admin -- "Audit Logs / User List" --> P4
    P4 -- "Query All" --> D2
```

### Level 2: Administrative & Booking Logic
A deep dive into the internal logic of the Booking Engine and Admin interactions.

```mermaid
graph LR
    User((Client))
    Admin((Admin))
    
    subgraph "2.0 Booking & Admin Engine"
        P21[2.1 Request Validation]
        P22[2.2 State Persistence]
        P23[2.3 Real-time Dispatch]
        P24[2.4 Admin Intervention]
    end
    
    DB[(Firestore)]

    User -- "Form Data" --> P21
    P21 -- "Validated" --> P22
    P22 -- "setDoc" --> DB
    DB -- "onSnapshot" --> P23
    P23 -- "Client Dashboard" --> User
    
    Admin -- "Update Status/Staff" --> P24
    P24 -- "updateDoc" --> DB
    DB -- "Admin View" --> P23
    P23 -- "Admin Panel" --> Admin
```

---

## 📚 Bibliography

- **React Documentation**: [https://react.dev/](https://react.dev/)
- **Firebase Documentation**: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- **Tailwind CSS**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Mermaid.js**: [https://mermaid.js.org/](https://mermaid.js.org/)
- **Lucide Icons**: [https://lucide.dev/](https://lucide.dev/)
- **Vite Guide**: [https://vitejs.dev/guide/](https://vitejs.dev/guide/)
