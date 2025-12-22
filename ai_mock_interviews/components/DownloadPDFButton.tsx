"use client";

import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface DownloadPDFButtonProps {
  feedback: any;
  interview: any;
  isNewFormat: boolean;
}

export default function DownloadPDFButton({
  // Deprecated. Use DownloadReportButton instead.
  // Kept as a no-op to avoid breaking any lingering imports during cleanup.
  export default function DownloadPDFButton() {
    return null;
  }

      // Final Assessment
      if (finalFeedback.finalAssessment) {
        checkPageBreak(25);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(37, 99, 235);
        doc.text("Final Assessment:", 25, yPosition);
        yPosition += 7;

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(31, 41, 55);
        const assessText = doc.splitTextToSize(
          cleanText(finalFeedback.finalAssessment),
          pageWidth - 50
        );
        doc.text(assessText, 25, yPosition);
      }
    }

    // Add footers to all pages
    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      addFooter(i);
    }

    // Save the PDF
    const fileName = `Interview_Feedback_${interview.role}_${
      new Date().toISOString().split("T")[0]
    }.pdf`;
    doc.save(fileName);
  };

  return (
    <Button
      onClick={generatePDF}
      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Download Report (PDF)
    </Button>
  );
}
