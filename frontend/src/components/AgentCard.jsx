import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Edit2, Check, ArrowRight, X, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const AgentCard = ({ stepName, title, initialContent, onApprove, onReject, onCancel }) => {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleApprove = () => {
    onApprove(content);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden my-8"
    >
      <div className="border-b border-slate-100 bg-slate-50/50 px-8 py-5 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-800 capitalize flex items-center gap-2">
          {title} Agent
        </h3>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand-600 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Edit content
          </button>
        ) : (
          <button 
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            <Check className="w-4 h-4" />
            Done editing
          </button>
        )}
      </div>
      
      <div className="p-8">
        {isEditing ? (
          <textarea
            className="w-full h-96 p-4 rounded-xl border border-slate-200 bg-slate-50 focus:border-brand-500 focus:ring-brand-500 outline-none resize-y font-mono text-sm text-slate-700"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <div className="prose prose-slate max-w-none hover:prose-a:text-brand-600">
            {content ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            ) : (
              <div className="h-40 flex items-center justify-center text-slate-400 italic">
                Awaiting agent output...
              </div>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-slate-100 p-6 bg-slate-50/30">
        {isRegenerating ? (
          <div className="flex flex-col gap-3">
            <textarea
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-brand-500 outline-none resize-none text-sm"
              rows={3}
              placeholder="What would you like to change? (e.g., 'Make it cheaper', 'Add more historical sites')"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsRegenerating(false)}
                className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onReject(content, feedbackText);
                  setIsRegenerating(false);
                  setFeedbackText('');
                }}
                disabled={!feedbackText.trim()}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </button>
            </div>
          </div>
        ) : isCanceling ? (
          <div className="flex flex-col gap-3 items-center">
            <p className="text-slate-700 font-medium">Do you want to cancel the booking?</p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setIsCanceling(false);
                  if (onCancel) onCancel();
                }}
                className="px-6 py-2 rounded-xl font-medium bg-rose-600 hover:bg-rose-700 text-white transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => setIsCanceling(false)}
                className="px-6 py-2 rounded-xl font-medium text-slate-600 hover:bg-slate-200 transition-colors"
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <button
                onClick={() => setIsCanceling(true)}
                className="flex items-center gap-2 text-rose-600 hover:bg-rose-50 px-5 py-2.5 rounded-xl font-medium transition-colors border border-transparent hover:border-rose-100"
              >
                <X className="w-4 h-4" />
                Reject
              </button>
              <button
                onClick={() => setIsRegenerating(true)}
                className="flex items-center gap-2 text-brand-600 hover:bg-brand-50 px-5 py-2.5 rounded-xl font-medium transition-colors border border-transparent hover:border-brand-100"
              >
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </button>
            </div>
            <button
              onClick={handleApprove}
              className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white py-2.5 px-6 rounded-xl font-medium transition-colors shadow-sm"
            >
              Approve & Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AgentCard;
