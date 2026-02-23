"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });
  }, []);

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-slate-800">
      <h1 className="text-2xl font-bold text-indigo-400">Second Brain</h1>

      <div className="flex items-center gap-4">
        {email && (
          <div className="w-9 h-9 rounded-full bg-indigo-500/30 flex items-center justify-center font-semibold">
            {email[0].toUpperCase()}
          </div>
        )}

        <span className="hidden sm:block text-sm text-slate-400">{email}</span>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/login");
          }}
          className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
