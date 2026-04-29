import React, { useState } from 'react';
import InputForm from './components/InputForm';
import Stepper from './components/Stepper';
import AgentCard from './components/AgentCard';
import { startSession, runAgent, saveAgentContent, getFinalPdfUrl } from './api';
import { PlaneTakeoff, Loader2, Download } from 'lucide-react';

const steps = ['planner', 'budget', 'hotel', 'transport', 'guide'];

function App() {
  const [sessionId] = useState('default'); // Static session for MVP
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [agentContent, setAgentContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleStart = async (data) => {
    setIsLoading(true);
    try {
      await startSession(data);
      await loadAgentStep(0);
    } catch (e) {
      console.error(e);
      alert('Error starting session.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAgentStep = async (stepIndex) => {
    setCurrentStepIndex(stepIndex);
    setIsLoading(true);
    setAgentContent('');
    try {
      const stepName = steps[stepIndex];
      const res = await runAgent(stepName, sessionId);
      setAgentContent(res.content);
    } catch (e) {
      console.error(e);
      alert('Error running agent.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (content) => {
    setIsLoading(true);
    try {
      const stepName = steps[currentStepIndex];
      await saveAgentContent(stepName, sessionId, content);
      
      if (currentStepIndex < steps.length - 1) {
        await loadAgentStep(currentStepIndex + 1);
      } else {
        setIsFinished(true);
      }
    } catch (e) {
      console.error(e);
      alert('Error saving content.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (content, feedback) => {
    setIsLoading(true);
    try {
      const stepName = steps[currentStepIndex];
      const res = await runAgent(stepName, sessionId, feedback, content);
      setAgentContent(res.content);
    } catch (e) {
      console.error(e);
      alert('Error regenerating agent content.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setCurrentStepIndex(-1);
    setAgentContent('');
    setIsFinished(false);
  };

  return (
    <div className="min-h-screen relative overflow-y-auto bg-slate-100 font-sans text-slate-900 pb-20">
      {/* High-Visibility Background Image */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/travel_bg.png')" }}
      />
      {/* Very light ethereal overlay to ensure contrast without hiding the background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-white/40 backdrop-blur-[2px]" />
      
      <header className="pt-16 pb-12 px-6 relative z-10 drop-shadow-md">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="bg-white/90 text-brand-600 p-5 rounded-full mb-6 shadow-xl border border-white">
            <PlaneTakeoff className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            AI Travel <span className="text-brand-600">Assistance</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Your personal, intelligent travel curator. Plan your perfect journey step-by-step with expert AI guidance.
          </p>
        </div>
      </header>

      <main className="px-4 relative z-10">
        {currentStepIndex === -1 ? (
          <div className="mt-8">
            <InputForm onSubmit={handleStart} />
          </div>
        ) : (
          <div className="w-full">
            <Stepper currentStepIndex={currentStepIndex} />
            
            {!isFinished ? (
              <div className="relative mt-12 min-h-[400px]">
                {isLoading && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-sm rounded-2xl">
                    <Loader2 className="w-10 h-10 text-brand-600 animate-spin mb-4" />
                    <p className="text-slate-600 font-medium">Curating {steps[currentStepIndex]} insights...</p>
                  </div>
                )}
                
                {agentContent && !isLoading && (
                  <AgentCard 
                    stepName={steps[currentStepIndex]}
                    title={steps[currentStepIndex]}
                    initialContent={agentContent}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onCancel={handleCancel}
                  />
                )}
              </div>
            ) : (
              <div className="max-w-2xl mx-auto mt-16 bg-white p-12 rounded-3xl shadow-xl border border-slate-100 text-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-2 bg-brand-500" />
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Your trip is planned!</h2>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  We've successfully compiled your itinerary, budget, select hotels, transport logistics, and local tips into a beautiful PDF.
                </p>
                <a 
                  href={getFinalPdfUrl(sessionId)}
                  download
                  className="inline-flex items-center gap-3 bg-brand-600 hover:bg-brand-700 text-white py-4 px-8 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-brand-500/30"
                >
                  <Download className="w-5 h-5" />
                  Download Travel Plan PDF
                </a>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
