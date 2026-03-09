import React, { useState, useEffect } from "react";

interface SavedMoment {
  id: string;
  url: string;
  videoId: string;
  timestamp: string;
  comment: string;
  createdAt: string;
}

export const Viewer: React.FC = () => {
  const [savedMoments, setSavedMoments] = useState<SavedMoment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSavedMoments = async () => {
      try {
        const result = await chrome.storage.local.get(["savedMoments"]);
        setSavedMoments(result.savedMoments || []);
      } catch (error) {
        console.error("Error loading saved moments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSavedMoments();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const result = await chrome.storage.local.get(["savedMoments"]);
      const moments = result.savedMoments || [];
      const updatedMoments = moments.filter(
        (moment: SavedMoment) => moment.id !== id,
      );
      await chrome.storage.local.set({ savedMoments: updatedMoments });
      setSavedMoments(updatedMoments);
    } catch (error) {
      console.error("Error deleting moment:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-stone-400">Loading...</p>
      </div>
    );
  }

  if (savedMoments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-stone-400 mb-2">No saved moments yet</p>
        <p className="text-stone-500 text-sm">
          Save your first YouTube moment!
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-2">
      {savedMoments.map((moment) => (
        <div
          key={moment.id}
          className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-3"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-stone-800 text-sm mb-1">
                {moment.videoId}
              </h3>
              <p className="text-stone-600 text-xs mb-1">
                Time: {moment.timestamp}
              </p>
              <p className="text-stone-500 text-xs">
                {new Date(moment.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => handleDelete(moment.id)}
              className="text-red-500 hover:text-red-700 text-xs"
            >
              Delete
            </button>
          </div>
          <p className="text-stone-700 text-sm">{moment.comment}</p>
          <a
            href={moment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-xs underline block mt-2"
          >
            Open Video
          </a>
        </div>
      ))}
    </div>
  );
};
