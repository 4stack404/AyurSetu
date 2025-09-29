"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dataService from "../../../services/dataService";

export default function PatientDietPlanStandalone() {
  const [patientId, setPatientId] = useState("P001");
  const [plan, setPlan] = useState(null);

  useEffect(() => { setPlan(dataService.getActiveDietPlan(patientId)); }, [patientId]);

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
            <Link href="/Patient/Dashboard" className="px-3 py-2 rounded-lg text-[#7A5C3A] hover:bg-[#4C8C4A]/10">Dashboard</Link>
            <Link href="/Patient/DietPlan" className="px-3 py-2 rounded-lg bg-[#4C8C4A] text-white">Diet Plan</Link>
            <Link href="/Patient/Chat" className="px-3 py-2 rounded-lg text-[#7A5C3A] hover:bg-[#2A9D8F]/10">Chat</Link>
            <Link href="/Patient/MealLog" className="px-3 py-2 rounded-lg text-[#7A5C3A] hover:bg-[#F4A300]/10">Meal Log</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-8 shadow-lg border border-[#4C8C4A]/10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-[#7A5C3A]">Your Active Diet Plan</h1>
            <select value={patientId} onChange={(e) => setPatientId(e.target.value)} className="px-3 py-2 border rounded-lg">
              {dataService.getAllPatients().map(p => (<option key={p.id} value={p.id}>{p.name} ({p.id})</option>))}
            </select>
          </div>
          {!plan ? (
            <p className="text-[#7A5C3A]/70">No active plan found.</p>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-[#4C8C4A] mb-2">{plan.name}</h2>
              <p className="text-[#7A5C3A]/70 mb-4">{plan.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plan.meals.map((m, i) => (
                  <div key={i} className="bg-white border border-[#4C8C4A]/10 rounded-xl p-4">
                    <h3 className="font-semibold text-[#7A5C3A] mb-2">{m.time}</h3>
                    <ul className="list-disc list-inside text-[#7A5C3A]/80 mb-2">
                      {m.foods.map((f, idx) => (<li key={idx}>{f}</li>))}
                    </ul>
                    <p className="text-sm text-[#7A5C3A]/60">{m.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}


