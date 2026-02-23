"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Note } from "@/app/page";

export default function NoteEditor({
  note,
  onSave,
  onBack,
}: {
  note: Note | null;
  onSave: () => void;
  onBack: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);

  async function save() {
    if (!title.trim() || !content.trim()) {
      alert("Title and content required");
      return;
    }

    if (note) {
      await supabase.from("notes").update({ title, content }).eq("id", note.id);
    } else {
      const { data } = await supabase.auth.getUser();
      await supabase.from("notes").insert({
        title,
        content,
        user_id: data.user?.id,
      });
    }

    onSave();
    onBack();
  }

  return (
    <div className="space-y-4">
      {note && (
        <button
          onClick={onBack}
          className="text-sm text-slate-400 hover:text-slate-200"
        >
          ← Back to new note
        </button>
      )}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3"
        placeholder="Title"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full bg-slate-900 rounded-lg p-3 h-100 overflow-visible"
        placeholder="Write your note..."
      />

      <button
        onClick={save}
        className="bg-indigo-500 hover:bg-indigo-600 px-6 py-2 rounded-lg"
      >
        {note ? "Update Note" : "Save Note"}
      </button>
    </div>
  );
}
