import React, { useState } from "react";

export default function Prompt2Fit() {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setGeneratedImage(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setGeneratedImage(data.imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-gray-800 flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-center">🧥 Prompt2Fit</h1>
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your outfit…"
            className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className={`mt-3 w-full py-2 rounded-md text-white font-medium ${
              loading || !prompt.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Generating..." : "Generate Outfit"}
          </button>
        </div>

        {generatedImage && (
          <div className="flex flex-col gap-4 bg-white rounded-lg p-4 shadow-md">
            <div className="bg-gray-100 rounded-md p-3 text-sm font-mono text-gray-700">
              <strong>Prompt:</strong> {prompt}
            </div>
            <img
              src={generatedImage}
              alt="Generated outfit"
              className="w-full rounded-md border"
            />
          </div>
        )}
      </div>

      <footer className="text-xs text-gray-400 mt-8">
        © 2025 Prompt2Fit by Mohit Ningania
      </footer>
    </div>
  );
}