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
  feedback,
  interview,
  isNewFormat,
}: DownloadPDFButtonProps) {
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Helper function to remove emojis and special characters
    const cleanText = (text: string) => {
      if (!text) return "";
      // Remove emojis and other special unicode characters
      return text
        .replace(
          /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
          ""
        )
        .trim();
    };

    // Helper function to add header on each page
    const addHeader = () => {
      // Header background
      doc.setFillColor(37, 99, 235); // Blue color
      doc.rect(0, 0, pageWidth, 30, "F");

      // Logo/Title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("AI Mock Interviews", 15, 15);

      // Report subtitle
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Interview Feedback Report", 15, 23);

      // Date on the right
      const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      doc.text(currentDate, pageWidth - 15, 15, { align: "right" });
    };

    // Helper function to add footer on each page
    const addFooter = (pageNum: number) => {
      const totalPages = (doc as any).internal.getNumberOfPages();

      // Footer background
      doc.setFillColor(37, 99, 235);
      doc.rect(0, pageHeight - 15, pageWidth, 15, "F");

      // Footer text
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text("© 2025 AI Mock Interviews - Powered by AI", 15, pageHeight - 7);
      doc.text(
        `Page ${pageNum} of ${totalPages}`,
        pageWidth - 15,
        pageHeight - 7,
        { align: "right" }
      );
    };

    // Helper function to check if we need a new page
    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - 25) {
        doc.addPage();
        yPosition = 40; // Reset position after header
        addHeader();
        return true;
      }
      return false;
    };

    // Add initial header
    addHeader();
    yPosition = 40;

    // Interview Details Section
    doc.setFillColor(243, 244, 246); // Light gray
    doc.rect(15, yPosition, pageWidth - 30, 35, "F");

    doc.setTextColor(31, 41, 55); // Dark gray
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Interview Details", 20, yPosition + 10);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Subject: ${cleanText(interview.role) || "N/A"}`,
      20,
      yPosition + 18
    );
    doc.text(`Type: ${cleanText(interview.type) || "N/A"}`, 20, yPosition + 24);
    doc.text(
      `Level: ${cleanText(interview.level) || "N/A"}`,
      20,
      yPosition + 30
    );

    yPosition += 45;

    // Performance Summary Section
    if (isNewFormat && feedback?.performanceSummary) {
      checkPageBreak(50);

      doc.setFillColor(219, 234, 254); // Light blue
      doc.rect(15, yPosition, pageWidth - 30, 40, "F");

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(37, 99, 235);
      doc.text("Performance Summary", 20, yPosition + 10);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(31, 41, 55);

      const summary = feedback.performanceSummary;
      doc.text(
        `Grade: ${cleanText(summary.grade) || "N/A"}`,
        20,
        yPosition + 20
      );
      doc.text(
        `Score: ${summary.marksObtained || 0}/${summary.totalMarks || 0} (${
          summary.percentage || 0
        }%)`,
        20,
        yPosition + 27
      );
      doc.text(
        `Overall: ${cleanText(summary.overallPerformance) || "N/A"}`,
        20,
        yPosition + 34
      );

      yPosition += 50;
    }

    // Category Scores Section
    if (feedback?.categoryScores) {
      checkPageBreak(60);

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(37, 99, 235);
      doc.text("Category Scores", 20, yPosition);

      yPosition += 10;

      const categoryData = Object.entries(feedback.categoryScores).map(
        ([category, score]) => [
          category.replace(/([A-Z])/g, " $1").trim(),
          `${score}/100`,
        ]
      );

      autoTable(doc, {
        startY: yPosition,
        head: [["Category", "Score"]],
        body: categoryData,
        theme: "grid",
        headStyles: {
          fillColor: [37, 99, 235],
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: "bold",
        },
        bodyStyles: {
          fontSize: 9,
        },
        margin: { left: 20, right: 20 },
      });

      yPosition = (doc as any).lastAutoTable.finalY + 15;
    }

    // Question Evaluations Section
    if (isNewFormat && feedback?.questionEvaluations) {
      checkPageBreak(30);

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(37, 99, 235);
      doc.text("Question-wise Evaluation", 20, yPosition);

      yPosition += 10;

      feedback.questionEvaluations.forEach((qEval: any, index: number) => {
        checkPageBreak(60);

        // Question box
        doc.setFillColor(254, 249, 195); // Light yellow
        doc.rect(20, yPosition, pageWidth - 40, 20, "F");

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(31, 41, 55);
        doc.text(
          `Q${index + 1}: ${cleanText(qEval.question) || "N/A"}`,
          25,
          yPosition + 7,
          { maxWidth: pageWidth - 50 }
        );
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text(`Marks: ${qEval.marksAwarded || 0}/5`, 25, yPosition + 14);

        yPosition += 25;

        // Student Answer
        doc.setFontSize(9);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(75, 85, 99);
        const answerText = doc.splitTextToSize(
          `Answer: ${cleanText(qEval.studentAnswer) || "N/A"}`,
          pageWidth - 50
        );
        doc.text(answerText, 25, yPosition);
        yPosition += answerText.length * 4 + 3;

        // Evaluation
        doc.setFont("helvetica", "normal");
        const evalText = doc.splitTextToSize(
          `Evaluation: ${cleanText(qEval.evaluation) || "N/A"}`,
          pageWidth - 50
        );
        doc.text(evalText, 25, yPosition);
        yPosition += evalText.length * 4 + 10;
      });
    }

    // Communication Insights Section
    if (isNewFormat && feedback?.communicationInsights) {
      checkPageBreak(50);

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(37, 99, 235);
      doc.text("Communication & Behavioral Insights", 20, yPosition);

      yPosition += 10;

      const insights = feedback.communicationInsights;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(31, 41, 55);

      const insightFields = [
        { label: "Confidence Level", value: insights.confidenceLevel },
        {
          label: "Clarity of Explanation",
          value: insights.clarityOfExplanation,
        },
        {
          label: "Problem-Solving Approach",
          value: insights.problemSolvingApproach,
        },
        { label: "Use of Examples", value: insights.useOfExamples },
        { label: "Engagement Level", value: insights.engagementLevel },
        { label: "Detailed Analysis", value: insights.detailedAnalysis },
      ];

      insightFields.forEach((field) => {
        if (field.value) {
          checkPageBreak(15);
          doc.setFont("helvetica", "bold");
          doc.text(`${field.label}:`, 25, yPosition);
          doc.setFont("helvetica", "normal");
          const text = doc.splitTextToSize(
            cleanText(field.value),
            pageWidth - 50
          );
          doc.text(text, 25, yPosition + 5);
          yPosition += text.length * 4 + 8;
        }
      });
    }

    // Final Feedback Section
    if (isNewFormat && feedback?.finalFeedback) {
      checkPageBreak(60);

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(37, 99, 235);
      doc.text("Final Feedback", 20, yPosition);

      yPosition += 10;

      const finalFeedback = feedback.finalFeedback;

      // Strengths
      if (finalFeedback.strengths && finalFeedback.strengths.length > 0) {
        checkPageBreak(30);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(22, 163, 74); // Green
        doc.text("Strengths:", 25, yPosition);
        yPosition += 7;

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(31, 41, 55);
        finalFeedback.strengths.forEach((strength: string) => {
          checkPageBreak(10);
          const text = doc.splitTextToSize(
            `• ${cleanText(strength)}`,
            pageWidth - 55
          );
          doc.text(text, 30, yPosition);
          yPosition += text.length * 4 + 3;
        });
        yPosition += 5;
      }

      // Areas for Improvement
      if (
        finalFeedback.areasForImprovement &&
        finalFeedback.areasForImprovement.length > 0
      ) {
        checkPageBreak(30);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(239, 68, 68); // Red
        doc.text("Areas for Improvement:", 25, yPosition);
        yPosition += 7;

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(31, 41, 55);
        finalFeedback.areasForImprovement.forEach((area: string) => {
          checkPageBreak(10);
          const text = doc.splitTextToSize(
            `• ${cleanText(area)}`,
            pageWidth - 55
          );
          doc.text(text, 30, yPosition);
          yPosition += text.length * 4 + 3;
        });
        yPosition += 5;
      }

      // Recommendation
      if (finalFeedback.recommendation) {
        checkPageBreak(25);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(147, 51, 234); // Purple
        doc.text("Recommendation:", 25, yPosition);
        yPosition += 7;

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(31, 41, 55);
        const recText = doc.splitTextToSize(
          cleanText(finalFeedback.recommendation),
          pageWidth - 50
        );
        doc.text(recText, 25, yPosition);
        yPosition += recText.length * 4 + 5;
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
