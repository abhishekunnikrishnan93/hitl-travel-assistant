import React, { useState } from 'react';
import { Plane, Calendar, Wallet, MapPin, Globe } from 'lucide-react';

const InputForm = ({ onSubmit }) => {
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tripType, setTripType] = useState('domestic');
  const [budgetAmount, setBudgetAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (startPoint && endPoint && startDate && endDate && budgetAmount) {
      const destination = `From ${startPoint} to ${endPoint} (${tripType} trip)`;
      const dates = `${startDate} to ${endDate}`;
      
      let budget = budgetAmount;
      if (tripType === 'international') {
        budget = `${budgetAmount}. Since this is an international trip, please convert and estimate all costs in the local currency of the destination (${endPoint}).`;
      } else {
        budget = `${budgetAmount} (Keep in original currency since it's domestic/interstate)`;
      }

      onSubmit({ destination, dates, budget, session_id: 'default' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50">
      <h2 className="text-3xl font-extrabold text-slate-800 mb-8 text-center drop-shadow-sm">Where to next?</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Start Point</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                required
                className="pl-10 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-brand-500 focus:ring-brand-500 py-3 border outline-none transition-colors"
                placeholder="e.g. New York"
                value={startPoint}
                onChange={(e) => setStartPoint(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Ending Destination</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Plane className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                required
                className="pl-10 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-brand-500 focus:ring-brand-500 py-3 border outline-none transition-colors"
                placeholder="e.g. Kyoto, Japan"
                value={endPoint}
                onChange={(e) => setEndPoint(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Start Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="date"
                required
                className="pl-10 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-brand-500 focus:ring-brand-500 py-3 border outline-none transition-colors"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">End Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="date"
                required
                className="pl-10 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-brand-500 focus:ring-brand-500 py-3 border outline-none transition-colors"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Trip Type</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-slate-400" />
              </div>
              <select
                className="pl-10 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-brand-500 focus:ring-brand-500 py-3 border outline-none transition-colors appearance-none"
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
              >
                <option value="domestic">Inside Country / Interstate</option>
                <option value="international">International Trip</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Budget</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Wallet className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                required
                className="pl-10 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-brand-500 focus:ring-brand-500 py-3 border outline-none transition-colors"
                placeholder="e.g. ₹20,000 total"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-3 px-6 rounded-xl font-medium hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            Start Planning
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
