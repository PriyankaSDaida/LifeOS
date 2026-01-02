# LifeOS - Personal Life Operating System

LifeOS is a comprehensive, modern personal management web application designed to help users organize their life, finances, and mental well-being in one unified interface. Built with performance and aesthetics in mind, it features a glassmorphic design, smooth animations, and a seamless user experience.

![LifeOS Banner](/public/banner-placeholder.png) *Note: Replace with actual screenshot*

## 🚀 Key Features

*   **🛡️ Secure Authentication**: Middleware-protected routes with **NextAuth.js** (Login/Register).
*   **📊 Interactive Dashboard**: At-a-glance view of daily stats, quotes, and quick actions.
*   **💰 Finance Tracker**: Manage expenses, visualize spending with charts, and track budgets.
*   **📅 AI Planner**: Integrated calendar system for event management and scheduling.
*   **📔 Mindful Journal**: Daily journaling with mood tracking (emoji-based) and reflection.
*   **✅ Habit Tracker**: Visualize consistency with contribution graphs and streak tracking.
*   **⏲️ Focus Timer**: Pomodoro-style timer with customizable work/break intervals.
*   **📋 Kanban Projects**: Drag-and-drop project management with tasks, comments, and color coding.
*   **💡 Ideas Board**: Sticky-note style "Brain Dump" area for quick thoughts.
*   **📱 Mobile & PWA**: Fully offline-capable Progressive Web App with install support.
*   **🔔 Smart Notifications**: Local reminders to keep up with habits and journaling.
*   **🧩 Custom Dashboard**: Draggable widgets to personalize your home screen layout.
*   **Identity Hub**: Beautifully designed "About Me" profile page.
*   **🎨 Premium UI**:
    *   **Glassmorphism**: Modern, frosted-glass aesthetic using backdrop filters.
    *   **Floating Dock**: macOS-style detached navigation bar.
    *   **Animations**: Smooth transitions powered by `framer-motion`.

## 🛠️ Technology Stack

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Database**: [PostgreSQL](https://www.postgresql.org/)
*   **ORM**: [Prisma](https://www.prisma.io/)
*   **Authentication**: [NextAuth.js v5](https://authjs.dev/)
*   **Styling**: 
    *   [Tailwind CSS v4](https://tailwindcss.com/)
    *   [Shadcn/UI](https://ui.shadcn.com/) (Component Library)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand) (synced with Server Actions)
*   **Icons**: [Lucide React](https://lucide.dev/)

## 🏗️ Architecture

LifeOS uses a modern **Next.js App Router** architecture with Server Actions for backend logic.

### Data Flow
1.  **Client**: Components (Zustand) trigger Server Actions.
2.  **Server Action**: Validates input -> Checks Auth (NextAuth) -> Calls Database (Prisma).
3.  **Database**: PostgreSQL stores the data.
4.  **Optimistic Updates**: Client updates UI immediately for zero-latency feel.

```mermaid
graph TD
    User[User] -->|Access Request| Middleware{"Middleware / Auth Guard"}
    Middleware -->|No Session| AuthPage["Auth Pages (/login, /register)"]
    Middleware -->|Valid Session| AppShell["App Shell"]
    
    subgraph Client_Application ["Client Application (Browser)"]
        direction TB
        AppShell --> NavBar["Floating Dock Navigation"]
        AppShell --> MainContent["Main Content Area"]
        
        MainContent -->|Route: /| Dashboard["Dashboard"]
        MainContent -->|Route: /finance| Finance["Finance Module"]
        MainContent -->|Server Actions| ServerActions["Server Actions (API)"]
        
        Dashboard & Finance --> Zustand["Zustand Store (Client Cache)"]
    end

    subgraph Server_Infrastructure ["Server Infrastructure (Node/Next.js)"]
        ServerActions -->|Authenticate| NextAuth["NextAuth.js"]
        ServerActions -->|ORM| Prisma["Prisma ORM"]
        NextAuth -->|Session Data| Prisma
    end

    subgraph Database_Layer ["Database Layer"]
        Prisma -->|Query/Mutation| Postgres[("PostgreSQL Database")]
    end

    style Middleware fill:#f9f,stroke:#333,stroke-width:2px
    style Postgres fill:#336791,stroke:#333,stroke-width:2px,color:white
    style NextAuth fill:#a855f7,stroke:#333,stroke-width:2px,color:white
```

## ⚡ Getting Started

### Prerequisites
*   Node.js 18+
*   PostgreSQL (Local or Cloud)

### Installation

1.  **Clone the repository**
    ```bash
    git clone git@github.com:PriyankaSDaida/LifeOS.git
    cd LifeOS
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory:
    ```env
    # Database Connection
    DATABASE_URL="postgresql://user:password@localhost:5432/lifeos?schema=public"
    
    # Auth Secret (Run `npx auth secret` to generate)
    AUTH_SECRET="your-generated-secret-key"
    
    # Base URL (for Auth)
    NEXTAUTH_URL="http://localhost:3000"
    ```

4.  **Setup Database**
    Run Prisma migrations to create the tables:
    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Run Development Server**
    ```bash
    npm run dev
    ```

6.  **Open Application**
    Visit `http://localhost:3000`.

## 📂 Project Structure

```bash
lifeos/
├── src/
│   ├── actions/             # Server Actions (Backend Logic)
│   ├── app/                 # Next.js Pages & Routes
│   │   ├── login/           # Login Page
│   │   ├── register/        # Register Page
│   │   └── ...              # Feature pages
│   ├── lib/                 # Utilities (db connection, etc.)
│   ├── store/               # Client State (Zustand)
│   └── components/          # React Components
├── prisma/
│   └── schema.prisma        # Database Schema
├── middleware.ts            # Route Protection
└── .env                     # Secrets (Not committed)
```
