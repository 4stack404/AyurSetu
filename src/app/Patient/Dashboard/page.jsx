"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PatientDashboard() {
  return (
    <div className="min-h-screen bg-[#FAF8F2] pt-20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#4C8C4A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#4C8C4A] to-[#2A9D8F] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <span className="text-xl font-bold text-[#7A5C3A]">Ayursutra</span>
          </div>
          <nav className="flex items-center space-x-2">
            <Link href="/Patient/Dashboard" className="px-3 py-2 rounded-lg bg-[#4C8C4A] text-white">Dashboard</Link>
            <Link href="/Patient/DietPlan" className="px-3 py-2 rounded-lg text-[#7A5C3A] hover:bg-[#4C8C4A]/10">Diet Plan</Link>
            <Link href="/Patient/Chat" className="px-3 py-2 rounded-lg text-[#7A5C3A] hover:bg-[#2A9D8F]/10">Chat</Link>
            <Link href="/Patient/MealLog" className="px-3 py-2 rounded-lg text-[#7A5C3A] hover:bg-[#F4A300]/10">Meal Log</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-[#7A5C3A] mb-6">Patient Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/Patient/DietPlan" className="group">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl p-6 shadow-lg border border-[#4C8C4A]/10 h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-[#4C8C4A] to-[#2A9D8F] rounded-xl flex items-center justify-center mb-4">
                <span className="text-white">📋</span>
              </div>
              <h2 className="text-xl font-semibold text-[#7A5C3A] mb-2">View Diet Plan</h2>
              <p className="text-[#7A5C3A]/70">See your active plan and meals.</p>
            </motion.div>
          </Link>

          <Link href="/Patient/Chat" className="group">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl p-6 shadow-lg border border-[#2A9D8F]/10 h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2A9D8F] to-[#4C8C4A] rounded-xl flex items-center justify-center mb-4">
                <span className="text-white">💬</span>
              </div>
              <h2 className="text-xl font-semibold text-[#7A5C3A] mb-2">Chat with Dietician</h2>
              <p className="text-[#7A5C3A]/70">Ask questions and get updates.</p>
            </motion.div>
          </Link>

          <Link href="/Patient/MealLog" className="group">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl p-6 shadow-lg border border-[#F4A300]/10 h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F4A300] to-[#2A9D8F] rounded-xl flex items-center justify-center mb-4">
                <span className="text-white">🍽️</span>
              </div>
              <h2 className="text-xl font-semibold text-[#7A5C3A] mb-2">Log Meals</h2>
              <p className="text-[#7A5C3A]/70">Track what you eat each day.</p>
            </motion.div>
          </Link>
        </div>
      </main>
    </div>
  );
}


