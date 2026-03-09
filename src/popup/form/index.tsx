import React, { useState, useEffect } from "react";
import { Field } from "./field";

interface FormData {
  url: string;
  videoId: string;
  timestamp: string;
  comment: string;
}

const inputClass =
  "w-full bg-stone-100 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 text-sm outline-none placeholder-stone-400 focus:border-stone-500 transition-colors";

export const Form: React.FC<{}> = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    // Get current tab URL and video time if YouTube
    const getCurrentTab = async () => {
      try {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        if (tab?.url) {
          setUrl(tab.url);

          // Extract video ID from YouTube URL
          const videoIdMatch = tab.url.match(
            /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/,
          );
          if (videoIdMatch) {
            setVideoId(videoIdMatch[1]);
          }

          // Check if it's a YouTube video and get current time
          if (tab.url.includes("youtube.com/watch")) {
            console.log("YouTube video detected");
            // Execute script to get video time
            chrome.scripting.executeScript(
              {
                target: { tabId: tab.id! },
                func: () => {
                  const video = document.querySelector("video");
                  console.log("Video element found:", !!video);
                  if (video) {
                    console.log("Video currentTime:", video.currentTime);
                    return Math.floor(video.currentTime);
                  }
                  return null;
                },
              },
              (results) => {
                console.log("Script execution results:", results);
                if (results?.[0]?.result) {
                  const seconds = results[0].result;
                  console.log("Video time in seconds:", seconds);
                  const hours = Math.floor(seconds / 3600);
                  const minutes = Math.floor((seconds % 3600) / 60);
                  const remainingSeconds = seconds % 60;
                  const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
                  console.log("Formatted time string:", timeString);
                  setTimestamp(timeString);
                } else {
                  console.log("No video time found");
                }
              },
            );
          } else {
            console.log("Not a YouTube video");
          }
        }
      } catch (error) {
        console.error("Error accessing Chrome tabs API:", error);
      }
    };

    getCurrentTab();
  }, []);

  const handleSubmit = async () => {
    const formData = { url, videoId, timestamp, comment };
    setFormData(formData);

    // Save to Chrome local storage
    try {
      const existingData = await chrome.storage.local.get(["savedMoments"]);
      const savedMoments = existingData.savedMoments || [];
      savedMoments.push({
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      });

      await chrome.storage.local.set({ savedMoments });
      console.log("Data saved to local storage:", formData);
    } catch (error) {
      console.error("Error saving to local storage:", error);
    }
  };

  return (
    <div className="bg-transparent min-h-screen flex items-start justify-center font-serif">
      <div className="bg-white rounded-3xl p-7 w-[300px]">
        <div className="mb-6">
          <h2 className="text-stone-800 text-lg font-semibold tracking-wide">
            Save Moment
          </h2>
          <p className="text-stone-400 text-xs mt-1">
            Capture a URL, time & note
          </p>
        </div>

        <Field label="URL">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className={inputClass}
          />
        </Field>

        <Field label="Video ID">
          <input
            type="text"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            placeholder="dQw4w9WgXcQ"
            className={inputClass}
          />
        </Field>

        <Field label="Timestamp">
          <input
            type="text"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="00:00:00"
            className={`${inputClass} [color-scheme:light]`}
          />
        </Field>

        <Field label="Comment">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a note..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </Field>

        <button
          onClick={handleSubmit}
          className="w-full bg-stone-800 hover:bg-stone-700 text-white font-bold text-sm tracking-wide rounded-xl py-2.5 active:scale-95 transition-all cursor-pointer"
        >
          Save
        </button>

        {formData && (
          <div className="mt-4 bg-stone-50 border border-stone-200 rounded-xl p-3">
            <p className="text-stone-400 text-[10px] uppercase tracking-widest mb-2">
              Saved
            </p>
            <pre className="text-stone-600 text-xs overflow-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
