"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dataService from "../../../services/dataService";

export default function PatientChatStandalone() {
  const [patientId, setPatientId] = useState("P001");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const key = `chat_${patientId}`;
    const stored = localStorage.getItem(key);
    setMessages(stored ? JSON.parse(stored) : [
      { id: "m1", sender: "dietician", text: "Hello! How are you feeling today?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
  }, [patientId]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const next = [...messages, { id: Date.now().toString(), sender: 'patient', text: input.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];
    setMessages(next);
    setInput("");
    if (typeof window !== 'undefined') {
      localStorage.setItem(`chat_${patientId}`, JSON.stringify(next));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] pt-20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#4C8C4A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#4C8C4A] to-[#2A9D8F] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <span className="text-xl font-bold text-[#7A5C3A]">AyurSetu</span>
          </div>
          <nav className="flex items-center space-x-2">
            <Link href="/Patient/Dashboard" className="px-3 py-2 rounded-lg text-[#7A5C3A] hover:bg-[#4C8C4A]/10">Dashboard</Link>
            <Link href="/Patient/DietPlan" className="px-3 py-2 rounded-lg text-[#7A5C3A] hover:bg-[#4C8C4A]/10">Diet Plan</Link>
            <Link href="/Patient/Chat" className="px-3 py-2 rounded-lg bg-[#2A9D8F] text-white">Chat</Link>
            <Link href="/Patient/MealLog" className="px-3 py-2 rounded-lg text-[#7A5C3A] hover:bg-[#F4A300]/10">Meal Log</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-8 shadow-lg border border-[#2A9D8F]/10 flex flex-col h-[70vh]">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-[#7A5C3A]">Chat with Dietician</h1>
            <select value={patientId} onChange={(e) => setPatientId(e.target.value)} className="px-3 py-2 border rounded-lg">
              {dataService.getAllPatients().map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
              ))}
            </select>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] px-4 py-2 rounded-2xl ${m.sender === 'patient' ? 'bg-[#2A9D8F] text-white' : 'bg-gray-100 text-[#7A5C3A]'}`}>
                  <p className="text-sm">{m.text}</p>
                  <p className={`text-xs mt-1 ${m.sender === 'patient' ? 'text-white/70' : 'text-[#7A5C3A]/60'}`}>{m.time}</p>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="mt-4 flex space-x-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-2 border border-[#2A9D8F]/20 rounded-xl focus:ring-2 focus:ring-[#2A9D8F]/20 focus:border-[#2A9D8F]" />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={send} className="px-4 py-2 bg-[#2A9D8F] text-white rounded-xl font-semibold">Send</motion.button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}


