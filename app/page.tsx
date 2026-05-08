"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });
  const [feedback, setFeedback] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear feedback when typing
    if (feedback) setFeedback(null);
    if (success) setSuccess(false);
  };

  const handleAnalyse = async () => {
    setLoading(true);
    setFeedback(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to analyse form");

      const data = await response.json();
      setFeedback(data);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setFeedback({ global: "An error occurred while communicating with the AI." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-6 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative w-full max-w-md bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 transition-all">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 mb-4 border border-indigo-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 mb-2">AI Form Assistant</h1>
          <p className="text-sm text-zinc-400">Fill the form and let AI validate your inputs.</p>
        </div>

        <div className="space-y-5">
          {/* Form Fields */}
          {[
            { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
            { id: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
            { id: "password", label: "Password", type: "password", placeholder: "••••••••" },
          ].map((field) => (
            <div key={field.id} className="group">
              <label htmlFor={field.id} className="block text-sm font-medium text-zinc-300 mb-1.5 transition-colors group-focus-within:text-indigo-400">
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.id as keyof typeof formData]}
                onChange={handleChange}
                className="w-full bg-zinc-950/50 border border-zinc-800 text-zinc-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600"
              />
              {feedback && feedback[field.id] && (
                <p className="mt-2 text-xs text-indigo-300 flex items-start gap-1.5 animate-in fade-in slide-in-from-top-1">
                  <span className="shrink-0 mt-[1px] text-indigo-400">✧</span>
                  <span className="leading-relaxed">{feedback[field.id]}</span>
                </p>
              )}
            </div>
          ))}

          {/* Bio Field */}
          <div className="group">
            <label htmlFor="bio" className="block text-sm font-medium text-zinc-300 mb-1.5 transition-colors group-focus-within:text-indigo-400">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              placeholder="Tell us a little about yourself..."
              value={formData.bio}
              onChange={handleChange}
              className="w-full bg-zinc-950/50 border border-zinc-800 text-zinc-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none placeholder:text-zinc-600"
            />
            {feedback && feedback.bio && (
              <p className="mt-2 text-xs text-indigo-300 flex items-start gap-1.5 animate-in fade-in slide-in-from-top-1">
                <span className="shrink-0 mt-[1px] text-indigo-400">✧</span>
                <span className="leading-relaxed">{feedback.bio}</span>
              </p>
            )}
          </div>
          
          {feedback && feedback.global && (
            <p className="text-sm text-red-400 text-center animate-in fade-in">{feedback.global}</p>
          )}

          {/* Submit Button */}
          <button
            onClick={handleAnalyse}
            disabled={loading}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analysing...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                Analyse with AI
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
