import React, { useState } from 'react';
import { GitBranch, X, Check, Code, ExternalLink } from 'lucide-react';

export const HackathonRepoInfo: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-slate-900 text-white text-xs px-4 py-2.5 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong className="text-emerald-400">APU Hackathon Project:</strong> Have an existing GitHub repo? You can paste your repository link or existing components anytime, and we'll integrate your code directly!
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-slate-400 hidden md:inline">
            All code in this project is modular React + Tailwind
          </span>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded transition-colors"
            title="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
