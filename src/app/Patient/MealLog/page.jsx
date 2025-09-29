"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dataService from "../../../services/dataService";

export default function PatientMealLogStandalone() {
  const [patientId, setPatientId] = useState("P001");
  const [logs, setLogs] = useState([]);
  const [mealType, setMealType] = useState("Breakfast");
  const [items, setItems] = useState("");
  const [notes, setNotes] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(() => new Date().toTimeString().slice(0,5));

  const refresh = () => setLogs(dataService.getMealLogsByPatientId(patientId));
  useEffect(() => { refresh(); }, [patientId]);

  const addLog = () => {
    const itemsList = items.split(',').map(s => s.trim()).filter(Boolean);
    dataService.addMealLog({ patientId, date, time, mealType, items: itemsList, notes, calories: calories ? Number(calories) : undefined });
    setItems(""); setNotes(""); setCalories(""); setTime(new Date().toTimeString().slice(0,5));
    refresh();
  };

  const deleteLog = (id) => { dataService.deleteMealLog(id); refresh(); };
  const totalCalories = useMemo(() => logs.reduce((s, l) => s + (l.calories || 0), 0), [logs]);

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
            <Link href="/Patient/DietPlan" className="px-3 py-2 rounded-lg text-[#7A5C3A] hover:bg-[#4C8C4A]/10">Diet Plan</Link>
            <Link href="/Patient/Chat" className="px-3 py-2 rounded-lg text-[#7A5C3A] hover:bg-[#2A9D8F]/10">Chat</Link>
            <Link href="/Patient/MealLog" className="px-3 py-2 rounded-lg bg-[#F4A300] text-white">Meal Log</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-8 shadow-lg border border-[#F4A300]/10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-[#7A5C3A]">Meal Log</h1>
            <select value={patientId} onChange={(e) => setPatientId(e.target.value)} className="px-3 py-2 border rounded-lg">
              {dataService.getAllPatients().map(p => (<option key={p.id} value={p.id}>{p.name} ({p.id})</option>))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm text-[#7A5C3A]/70 mb-1">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm text-[#7A5C3A]/70 mb-1">Time</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm text-[#7A5C3A]/70 mb-1">Meal Type</label>
              <select value={mealType} onChange={(e) => setMealType(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                {['Breakfast','Lunch','Snack','Dinner','Other'].map(t => (<option key={t} value={t}>{t}</option>))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-[#7A5C3A]/70 mb-1">Items (comma-separated)</label>
              <input value={items} onChange={(e) => setItems(e.target.value)} placeholder="e.g., Khichdi, Cucumber salad" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm text-[#7A5C3A]/70 mb-1">Calories (optional)</label>
              <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="e.g., 450" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm text-[#7A5C3A]/70 mb-1">Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="How did you feel after the meal?" className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>

          <div className="flex justify-end mb-8">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={addLog} className="px-5 py-2 bg-[#F4A300] text-white rounded-xl font-semibold">Add Log</motion.button>
          </div>

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-[#7A5C3A]">Recent Logs</h2>
            <div className="text-sm text-[#7A5C3A]/70">Total calories: {totalCalories}</div>
          </div>

          <div className="space-y-3">
            {logs.length === 0 && <p className="text-[#7A5C3A]/70">No logs yet.</p>}
            {logs.map(l => (
              <div key={l.id} className="bg-white border border-[#F4A300]/10 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#7A5C3A]">{l.mealType} • {l.date} {l.time}</div>
                  <div className="text-sm text-[#7A5C3A]/80">{l.items.join(', ')}</div>
                  {l.notes && <div className="text-xs text-[#7A5C3A]/60 mt-1">{l.notes}</div>}
                </div>
                <div className="flex items-center space-x-3">
                  {typeof l.calories === 'number' && <span className="text-sm text-[#7A5C3A]/70">{l.calories} kcal</span>}
                  <button onClick={() => deleteLog(l.id)} className="px-3 py-1 text-sm rounded-lg bg-red-50 text-red-600 border border-red-200">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}


