import React from 'react';
import { motion } from 'motion/react';
import Mermaid from '../components/Mermaid';
import { Network, Database, Shield, Users } from 'lucide-react';

export default function SystemArchitecture() {
  const level0Chart = `
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
  `;

  const techStackChart = `
    graph LR
      subgraph Frontend
        React[React 18 / Vite]
        Tailwind[Tailwind CSS]
        Motion[Framer Motion]
      end
      
      subgraph Backend
        Express[Express.js Server]
      end
      
      subgraph Cloud Services
        Auth[Firebase Auth]
        DB[(Firestore NoSQL)]
      end
      
      React --> Express
      Express --> Auth
      Express --> DB
      
      style React fill:#00E5FF,stroke:#141414
      style Express fill:#E4E3E0,stroke:#141414
      style DB fill:#00E5FF,stroke:#141414
  `;

  return (
    <div className="pt-32 pb-24 bg-brand-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-cyan/10 rounded-full text-brand-cyan text-xs font-black tracking-widest uppercase">
              <Network className="w-4 h-4" /> System Engineering
            </div>
            <h1 className="text-5xl font-bold tracking-tight">System Architecture</h1>
            <p className="text-brand-charcoal/60 max-w-2xl mx-auto">
              A comprehensive overview of the Aqua Blast ecosystem, detailing data flow, 
              user interactions, and our modern technology stack.
            </p>
          </div>

          {/* Level 0 Diagram */}
          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-brand-charcoal/5">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-charcoal text-brand-cyan flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Level 0: Context Diagram</h2>
                <p className="text-sm text-brand-charcoal/60">High-level system interactions and external entities.</p>
              </div>
            </div>
            <div className="bg-brand-white rounded-2xl p-4 border border-brand-charcoal/5">
              <Mermaid chart={level0Chart} />
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="p-6 bg-brand-white rounded-2xl border border-brand-charcoal/5">
                <h4 className="font-bold mb-2 text-brand-cyan">1. Clients</h4>
                <p className="text-brand-charcoal/60">Initiate service requests and track restoration progress in real-time.</p>
              </div>
              <div className="p-6 bg-brand-white rounded-2xl border border-brand-charcoal/5">
                <h4 className="font-bold mb-2 text-brand-cyan">2. Workers</h4>
                <p className="text-brand-charcoal/60">Receive assigned tasks and update job status upon completion.</p>
              </div>
              <div className="p-6 bg-brand-white rounded-2xl border border-brand-charcoal/5">
                <h4 className="font-bold mb-2 text-brand-cyan">3. Admins</h4>
                <p className="text-brand-charcoal/60">Orchestrate the entire workflow by assigning staff and managing global data.</p>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-brand-charcoal/5">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-charcoal text-brand-cyan flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Technology Stack</h2>
                <p className="text-sm text-brand-charcoal/60">The modern infrastructure powering our restoration engine.</p>
              </div>
            </div>
            <div className="bg-brand-white rounded-2xl p-4 border border-brand-charcoal/5">
              <Mermaid chart={techStackChart} />
            </div>
          </section>

          {/* Security */}
          <section className="bg-brand-charcoal text-white rounded-[3rem] p-8 md:p-12 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-cyan text-brand-charcoal flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Security & Integrity</h2>
                <p className="text-sm text-white/60">How we protect your data and ensure system reliability.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-brand-cyan font-bold uppercase tracking-widest text-xs">RBAC Enforcement</h4>
                <p className="text-white/70 leading-relaxed">
                  Our Role-Based Access Control (RBAC) is enforced at the database level via 
                  Firestore Security Rules. This ensures that even if the frontend is bypassed, 
                  data remains isolated and secure.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-brand-cyan font-bold uppercase tracking-widest text-xs">Real-time Synchronization</h4>
                <p className="text-white/70 leading-relaxed">
                  We utilize WebSocket-based listeners to provide instant updates across all 
                  platforms. When an Admin assigns a job, the Worker sees it immediately 
                  without refreshing.
                </p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
