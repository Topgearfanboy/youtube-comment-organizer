import React, { useState } from "react";
import { Field } from "./field";

interface FormData {
  url: string;
  timestamp: string;
  comment: string;
}

const inputClass =
  "w-full bg-stone-100 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 text-sm outline-none placeholder-stone-400 focus:border-stone-500 transition-colors";

export const Form: React.FC<{}> = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [url, setUrl] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    setFormData({ url, timestamp, comment });
  };

  return (
    <div className="bg-gradient-to-br from-stone-100 via-slate-50 to-stone-200 min-h-screen flex items-center justify-center p-4 font-serif">
      <div className="bg-white border border-stone-200 rounded-3xl p-7 w-[300px] shadow-lg">
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

        <Field label="Timestamp">
          <input
            type="time"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
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
