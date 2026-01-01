# LifeOS - Personal Life Operating System

LifeOS is a comprehensive, modern personal management web application designed to help users organize their life, finances, and mental well-being in one unified interface. Built with performance and aesthetics in mind, it features a glassmorphic design, smooth animations, and a seamless user experience.

![LifeOS Banner](/public/banner-placeholder.png) *Note: Replace with actual screenshot*

## 🚀 Key Features

*   **🛡️ Secure Authentication**: Middleware-protected routes with a custom login/signup interface.
*   **📊 Interactive Dashboard**: At-a-glance view of daily stats, quotes, and quick actions.
*   **💰 Finance Tracker**: Manage expenses, visualize spending with charts, and track budgets.
*   **📅 AI Planner**: Integrated calendar system for event management and scheduling.
*   **📔 Mindful Journal**: Daily journaling with mood tracking (emoji-based) and reflection.
*   **👤 Identity Hub**: beautifully designed "About Me" profile page.
*   **🎨 Premium UI**:
    *   **Glassmorphism**: Modern, frosted-glass aesthetic using backdrop filters.
    *   **Floating Dock**: macOS-style detached navigation bar.
    *   **Animations**: Smooth transitions powered by `framer-motion`.

## 🛠️ Technology Stack

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: 
    *   [Tailwind CSS v4](https://tailwindcss.com/)
    *   [Shadcn/UI](https://ui.shadcn.com/) (Component Library)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Charts**: [Recharts](https://recharts.org/)
*   **Calendar**: [React Big Calendar](https://github.com/jquense/react-big-calendar)
*   **Icons**: [Lucide React](https://lucide.dev/)

## 🏗️ Architecture

LifeOS follows a client-side heavy architecture for interactivity, hosted within the robust Next.js server environment.

```mermaid
graph TD
    User[User] -->|Access Request| Middleware{Middleware / Auth Guard}
    Middleware -->|No Session| AuthPage[Auth Page (/auth)]
    Middleware -->|Valid Session| AppShell[App Shell]
    
    subgraph Client_Application ["Client Application (Browser)"]
        direction TB
        AppShell --> NavBar[Floating Dock Navigation]
        AppShell --> MainContent[Main Content Area]
        
        MainContent -->|Route: /| Dashboard[Dashboard]
        MainContent -->|Route: /finance| Finance[Finance Module]
        MainContent -->|Route: /calendar| Planner[Planner Module]
        MainContent -->|Route: /journal| Journal[Journal Module]
        MainContent -->|Route: /about| About[Profile Module]
        
        Dashboard & Finance & Planner & Journal & About --> Zustand[Zustand Store]
        
        Zustand -->|Persist| LocalStorage[(Local Storage)]
    end

    style Middleware fill:#f9f,stroke:#333,stroke-width:2px
    style Zustand fill:#61dafb,stroke:#333,stroke-width:2px,color:black
```

## 📂 Project Structure

```bash
lifeos/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── auth/            # Authentication page
│   │   ├── finance/         # Finance tracker
│   │   ├── journal/         # Journaling app
│   │   ├── about/           # Profile page
│   │   ├── globals.css      # Global styles & Tailwind
│   │   ├── layout.tsx       # Root layout & providers
│   │   └── page.tsx         # Dashboard Entry
│   ├── components/          # React Components
│   │   ├── ui/              # Reusable Shadcn UI components
│   │   ├── dashboard/       # Dashboard widgets
│   │   ├── finance/         # Finance specific components
│   │   └── Navbar.tsx       # Floating navigation
│   ├── store/               # Global state (Zustand)
│   └── lib/                 # Utilities
├── middleware.ts            # Route protection logic
├── tailwind.config.ts       # Tailwind configuration
└── package.json             # Dependencies
```

## ⚡ Getting Started

1.  **Clone the repository**
    ```bash
    git clone git@github.com:PriyankaSDaida/LifeOS.git
    cd LifeOS
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Open Application**
    Visit `http://localhost:3000` in your browser.

## 🔜 Future Roadmap

*   [ ] **Backend Integration**: Connect to Supabase for real cloud persistence.
*   [ ] **AI Insights**: Integrate OpenAI/Gemini for financial advice and journal sentiment analysis.
*   [ ] **Mobile View**: Further optimize for PWA (Progressive Web App) experience.
*   [ ] **Themes**: Add configurable color themes customizer.
