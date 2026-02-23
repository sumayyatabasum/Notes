"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import NotesList from "@/components/NotesList";
import NoteEditor from "@/components/NotesEditor";
import AskAI from "@/components/AskAI";
import Navbar from "@/components/Navbar";

export type Note = {
  id: string;
  title: string;
  content: string;
};

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  // 🔐 AUTH GUARD
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/login");
      } else {
        setLoading(false);
        loadNotes();
      }
    });
  }, [router]);

  // 📖 READ
  async function loadNotes() {
    const { data } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    setNotes(data ?? []);
  }

  // 📖 READ ONE
  function selectNote(id: string) {
    setActiveNote(notes.find((n) => n.id === id) ?? null);
  }

  // ❌ DELETE
  async function deleteNote(id: string) {
    await supabase.from("notes").delete().eq("id", id);
    if (activeNote?.id === id) setActiveNote(null);
    loadNotes();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Checking session…
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-indigo-950 via-slate-900 to-black text-slate-100">
      <Navbar />

      <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* NOTES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-3 bg-slate-950 rounded-xl border border-slate-800 p-4"
        >
          <NotesList
            notes={notes}
            activeId={activeNote?.id}
            onSelect={selectNote}
            onDelete={deleteNote}
          />
        </motion.div>

        {/* EDITOR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-6 bg-slate-950 rounded-xl border border-slate-800 p-6"
        >
          <NoteEditor
            note={activeNote}
            onSave={loadNotes}
            onBack={() => setActiveNote(null)}
          />
        </motion.div>

        {/* AI (fallback/local) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-3 bg-slate-950 rounded-xl border border-slate-800 p-4"
        >
          <AskAI context={activeNote?.content ?? ""} />
        </motion.div>
      </section>
    </main>
  );
}
