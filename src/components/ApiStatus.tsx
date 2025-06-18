import React from 'react';
import { CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { aiService } from '../services/aiService';

export const ApiStatus: React.FC = () => {
  const isConfigured = aiService.isApiConfigured();

  if (isConfigured) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-sm">
        <CheckCircle className="w-4 h-4 text-green-600" />
        <span className="text-green-800">OpenAI API Connected</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm">
      <AlertCircle className="w-4 h-4 text-amber-600" />
      <span className="text-amber-800">Demo Mode - Configure API Key</span>
      <Settings className="w-3 h-3 text-amber-600" />
    </div>
  );
};