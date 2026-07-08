import { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import { Download, FileText, CheckCircle } from 'lucide-react';
import { endpoints } from '../../api/config';

import { DashboardState, EmergencyData } from '../../types';

export default function Reports() {
  const [reportData, setReportData] = useState<DashboardState | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetch(endpoints.report)
      .then(res => res.json())
      .then(data => setReportData(data))
      .catch(err => console.error(err));
  }, []);

  const generatePDF = () => {
    if (!reportData) return;
    setGenerating(true);
    
    setTimeout(() => {
      const doc = new jsPDF();
      
      doc.setFontSize(22);
      doc.text("Stadium Intelligence Daily Report", 20, 20);
      
      doc.setFontSize(16);
      doc.text("1. Dashboard Summary", 20, 40);
      doc.setFontSize(12);
      doc.text(`Total Visitors: ${reportData.dashboard.total_visitors}`, 20, 50);
      doc.text(`Current Visitors: ${reportData.dashboard.current_visitors}`, 20, 60);
      doc.text(`Crowd Status: ${reportData.dashboard.crowd_status}`, 20, 70);
      doc.text(`Parking Availability: ${reportData.dashboard.parking_availability}`, 20, 80);

      doc.setFontSize(16);
      doc.text("2. Emergency Incidents", 20, 100);
      doc.setFontSize(12);
      let y = 110;
      reportData.emergency.forEach((em: EmergencyData, index: number) => {
        doc.text(`${index + 1}. ${em.type} (${em.priority}) - ${em.status} at ${em.time}`, 20, y);
        y += 10;
      });

      doc.setFontSize(16);
      doc.text("3. AI Recommendations", 20, y + 10);
      doc.setFontSize(12);
      const splitText = doc.splitTextToSize(reportData.dashboard.ai_recommendation, 170);
      doc.text(splitText, 20, y + 20);

      doc.save("stadium-daily-report.pdf");
      setGenerating(false);
    }, 1000); // simulate generation time
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm text-center space-y-6">
        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
          <FileText size={40} />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Generate Daily Report</h2>
          <p className="text-gray-500">
            Download a comprehensive summary of today's crowd metrics, incidents, and AI insights in PDF format.
          </p>
        </div>

        {reportData ? (
          <button 
            onClick={generatePDF}
            disabled={generating}
            className="flex items-center justify-center gap-2 w-full max-w-sm mx-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20"
          >
            {generating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating PDF...
              </>
            ) : (
              <>
                <Download size={20} />
                Download PDF Report
              </>
            )}
          </button>
        ) : (
          <p className="text-gray-400">Loading report data...</p>
        )}

        <div className="pt-8 text-left border-t border-gray-100 dark:border-gray-800">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Included in this report:</h3>
          <ul className="grid grid-cols-2 gap-3">
            {['Visitor Statistics', 'Crowd Distribution', 'Emergency Incident Log', 'AI Recommendations', 'Weather Context'].map(item => (
              <li key={item} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle size={16} className="text-green-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
