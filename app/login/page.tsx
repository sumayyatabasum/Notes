"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }

    setLoading(false);
  }

  async function handleSignup() {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("Account created. Please login.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-indigo-950 via-slate-900 to-black flex items-center justify-center text-slate-100">
      <div className="w-full max-w-md bg-slate-950/90 backdrop-blur rounded-2xl border border-slate-800 shadow-2xl p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-indigo-400 mb-2">
          Second Brain
        </h1>
        <p className="text-center text-slate-400 mb-8">Login to continue</p>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
            {error}
          </div>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-500 hover:bg-indigo-600 transition text-white py-3 rounded-lg font-semibold mb-3 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full border border-slate-700 hover:bg-slate-800 transition py-3 rounded-lg font-medium"
        >
          Create Account
        </button>
      </div>
    </main>
  );
}
