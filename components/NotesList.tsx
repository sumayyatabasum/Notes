"use client";

import { motion } from "framer-motion";

type Note = {
  id: string;
  title: string;
};

export default function NotesList({
  notes,
  activeId,
  onSelect,
  onDelete,
}: {
  notes: Note[];
  activeId?: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-cyan-400 mb-4">Notes</h2>

      {notes.length === 0 && (
        <p className="text-sm text-slate-400">No notes yet</p>
      )}

      <div className="space-y-2">
        {notes.map((note) => (
          <motion.div
            key={note.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center justify-between px-3 py-2 rounded-lg
              ${
                note.id === activeId
                  ? "bg-indigo-500/20 border border-indigo-400/40"
                  : "bg-slate-900 hover:bg-indigo-500/20"
              }`}
          >
            <button
              onClick={() => onSelect(note.id)}
              className="flex-1 text-left"
            >
              {note.title}
            </button>

            <button
              onClick={() => onDelete(note.id)}
              className="text-xs text-red-400 hover:text-red-500 ml-2"
            >
              Delete
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
