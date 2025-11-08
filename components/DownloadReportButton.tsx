"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface DownloadReportButtonProps {
  interviewId: string;
  feedback: any;
  interview: any;
}

export default function DownloadReportButton({
  interviewId,
  feedback,
  interview,
}: DownloadReportButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = () => {
    if (!feedback) {
      alert("No feedback available for this interview yet.");
      return;
    }

    setIsGenerating(true);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPosition = 20;

      // Helper function to remove emojis and special characters
      const cleanText = (text: string) => {
        if (!text) return "";
        return text
          .replace(
            /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
            ""
          )
          .trim();
      };

      // Helper function to add header on each page
      const addHeader = () => {
        doc.setFillColor(37, 99, 235);
        doc.rect(0, 0, pageWidth, 30, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("PrepWise AI", 15, 15);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("Interview Feedback Report", 15, 23);

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
        doc.setFillColor(37, 99, 235);
        doc.rect(0, pageHeight - 15, pageWidth, 15, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text("© 2025 PrepWise - Powered by AI", 15, pageHeight - 7);
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
          yPosition = 40;
          addHeader();
          return true;
        }
        return false;
      };

      // Determine if feedback uses new format
      const isNewFormat = !!feedback?.performanceSummary;

      // Add initial header
      addHeader();
      yPosition = 40;

      // Interview Details Section
      doc.setFillColor(243, 244, 246);
      doc.rect(15, yPosition, pageWidth - 30, 35, "F");

      doc.setTextColor(31, 41, 55);
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
      doc.text(
        `Type: ${cleanText(interview.type) || "N/A"}`,
        20,
        yPosition + 24
      );
      doc.text(
        `Level: ${cleanText(interview.level) || "N/A"}`,
        20,
        yPosition + 30
      );

      yPosition += 45;

      // Performance Summary Section
      if (isNewFormat && feedback?.performanceSummary) {
        checkPageBreak(50);

        doc.setFillColor(219, 234, 254);
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

      // Question Evaluations Section (if new format)
      if (isNewFormat && feedback?.questionEvaluations) {
        checkPageBreak(30);

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(37, 99, 235);
        doc.text("Question-wise Evaluation", 20, yPosition);

        yPosition += 10;

        feedback.questionEvaluations.forEach((qEval: any, index: number) => {
          checkPageBreak(50);

          doc.setFillColor(249, 250, 251);
          doc.rect(15, yPosition, pageWidth - 30, 8, "F");

          doc.setFontSize(11);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(31, 41, 55);
          doc.text(`Question ${index + 1}`, 20, yPosition + 6);
          doc.text(
            `Score: ${qEval.marks || 0}/5`,
            pageWidth - 20,
            yPosition + 6,
            { align: "right" }
          );

          yPosition += 12;

          doc.setFontSize(9);
          doc.setFont("helvetica", "normal");
          const questionText = doc.splitTextToSize(
            `Q: ${cleanText(qEval.question) || "N/A"}`,
            pageWidth - 40
          );
          doc.text(questionText, 20, yPosition);
          yPosition += questionText.length * 5 + 3;

          checkPageBreak(20);

          const answerText = doc.splitTextToSize(
            `A: ${cleanText(qEval.studentAnswer) || "N/A"}`,
            pageWidth - 40
          );
          doc.text(answerText, 20, yPosition);
          yPosition += answerText.length * 5 + 3;

          checkPageBreak(20);

          doc.setTextColor(100, 116, 139);
          const evalText = doc.splitTextToSize(
            `Evaluation: ${cleanText(qEval.evaluation) || "N/A"}`,
            pageWidth - 40
          );
          doc.text(evalText, 20, yPosition);
          yPosition += evalText.length * 5 + 10;
        });
      }

      // Strengths Section
      if (feedback?.strengths) {
        checkPageBreak(40);

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(37, 99, 235);
        doc.text("Strengths", 20, yPosition);

        yPosition += 8;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(31, 41, 55);

        const strengths = Array.isArray(feedback.strengths)
          ? feedback.strengths
          : [feedback.strengths];

        strengths.forEach((strength: string) => {
          checkPageBreak(15);
          const strengthText = doc.splitTextToSize(
            `• ${cleanText(strength)}`,
            pageWidth - 40
          );
          doc.text(strengthText, 20, yPosition);
          yPosition += strengthText.length * 5 + 3;
        });

        yPosition += 5;
      }

      // Areas for Improvement Section
      if (feedback?.areasForImprovement) {
        checkPageBreak(40);

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(37, 99, 235);
        doc.text("Areas for Improvement", 20, yPosition);

        yPosition += 8;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(31, 41, 55);

        const areas = Array.isArray(feedback.areasForImprovement)
          ? feedback.areasForImprovement
          : [feedback.areasForImprovement];

        areas.forEach((area: string) => {
          checkPageBreak(15);
          const areaText = doc.splitTextToSize(
            `• ${cleanText(area)}`,
            pageWidth - 40
          );
          doc.text(areaText, 20, yPosition);
          yPosition += areaText.length * 5 + 3;
        });

        yPosition += 5;
      }

      // Final Assessment Section
      if (feedback?.finalAssessment) {
        checkPageBreak(40);

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(37, 99, 235);
        doc.text("Final Assessment", 20, yPosition);

        yPosition += 8;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(31, 41, 55);

        const finalText = doc.splitTextToSize(
          cleanText(
            typeof feedback.finalAssessment === "string"
              ? feedback.finalAssessment
              : JSON.stringify(feedback.finalAssessment)
          ),
          pageWidth - 40
        );
        doc.text(finalText, 20, yPosition);
        yPosition += finalText.length * 5 + 10;
      }

      // Add footers to all pages
      const totalPages = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        addFooter(i);
      }

      // Generate filename
      const fileName = `Interview_Report_${cleanText(interview.role)}_${
        new Date().toISOString().split("T")[0]
      }.pdf`;

      // Save the PDF
      doc.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center"
      onClick={generatePDF}
      disabled={isGenerating || !feedback}
    >
      <Download className="w-4 h-4 mr-2" />
      {isGenerating ? "Generating..." : "Report"}
    </Button>
  );
}
