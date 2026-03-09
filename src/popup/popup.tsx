import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/global.css";
import "./popup.css";
import { Form } from "./form";
import { Viewer } from "./viewer";

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"form" | "viewer">("form");

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex border-b border-stone-200 mb-4">
        <button
          onClick={() => setActiveTab("form")}
          className={`flex-1 py-2 px-4 text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === "form"
              ? "text-stone-800 border-b-2 border-stone-800"
              : "text-stone-500 hover:text-stone-700"
          }`}
        >
          Save Moment
        </button>
        <button
          onClick={() => setActiveTab("viewer")}
          className={`flex-1 py-2 px-4 text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === "viewer"
              ? "text-stone-800 border-b-2 border-stone-800"
              : "text-stone-500 hover:text-stone-700"
          }`}
        >
          View Moments
        </button>
      </div>

      {/* Tab Content */}
      <div className="h-[500px] overflow-hidden">
        {activeTab === "form" && <Form />}
        {activeTab === "viewer" && <Viewer />}
      </div>
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
