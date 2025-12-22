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

      // Helper to break very long words for wrapping
      const breakLongWords = (input: string, maxLen = 24) => {
        return input
          .split(/\s+/)
          .map((w) =>
            w.length > maxLen
              ? (w.match(new RegExp(`.{1,${maxLen}}`, "g")) || [w]).join("-")
              : w
          )
          .join(" ");
      };

      // Helpers for parsing educational references
      const extractUrl = (ref: string) => {
        const m = ref.match(/https?:\/\/[^\s]+/);
        return m ? m[0] : "";
      };
      const isTopicUrl = (url: string) => /https?:\/\/[^/]+\/.+/.test(url);
      const refLabel = (ref: string) => {
        const parts = ref.split(" - ");
        return parts[0] || "Reference";
      };

      // Helper function to add header on each page
      const addHeader = () => {
        doc.setFillColor(37, 99, 235);
        doc.rect(0, 0, pageWidth, 30, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("VivaChat AI", 15, 15);

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
        doc.text("© 2025 VivaChat - Powered by AI", 15, pageHeight - 7);
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

      // Add initial header on the first page
      addHeader();
      yPosition = 40;

      // Interview Details Section
      const subjectText =
        cleanText(
          interview?.interview?.subject ??
            interview?.subject ??
            interview?.role
        ) || "N/A";
      const typeText =
        cleanText(
          interview?.interview?.type ??
            interview?.type ??
            interview?.grade
        ) || "N/A";
      const levelText =
        cleanText(
          interview?.interview?.level ??
            interview?.level ??
            interview?.difficulty
        ) || "N/A";

      // Draw details box
      checkPageBreak(55);
      doc.setFillColor(241, 245, 249);
      doc.rect(15, yPosition, pageWidth - 30, 45, "F");

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(37, 99, 235);
      doc.text("Interview Details", 20, yPosition + 12);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(31, 41, 55);
      doc.text(`Subject: ${subjectText}`, 20, yPosition + 22);
      doc.text(`Type: ${typeText}`, 20, yPosition + 30);
      doc.text(`Level: ${levelText}`, 20, yPosition + 38);

      yPosition += 55;

      // Determine if feedback uses new format
      const isNewFormat = !!feedback?.performanceSummary;

      // Performance Summary Section (dynamic height)
      if (isNewFormat && feedback?.performanceSummary) {
        const summary = feedback.performanceSummary;
        const overallText = `Overall: ${breakLongWords(
          cleanText(summary.overallPerformance) || "N/A",
          24
        )}`;
        const overallLines = doc.splitTextToSize(overallText, pageWidth - 40);
        const lineHeight = 6;
        const boxHeight = Math.max(60, 38 + overallLines.length * lineHeight + 14);
        checkPageBreak(boxHeight + 12);

        doc.setFillColor(219, 234, 254);
        doc.rect(15, yPosition, pageWidth - 30, boxHeight, "F");

        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(37, 99, 235);
        doc.text("Performance Summary", 20, yPosition + 10);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(31, 41, 55);

        doc.text(
          `Grade: ${cleanText(summary.grade) || "N/A"}`,
          20,
          yPosition + 20
        );
        doc.text(
          `Score: ${summary.marksObtained || 0}/${summary.totalMarks || 0} (${summary.percentage || 0}%)`,
          20,
          yPosition + 27
        );
        doc.setFontSize(11);
        doc.text(overallLines, 20, yPosition + 36);

        yPosition += boxHeight + 10;
      }

      // Category Scores Section
      if (feedback?.categoryScores) {
        checkPageBreak(60);

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(37, 99, 235);
        doc.text("Category Scores", 20, yPosition);

        yPosition += 10;

        // Normalize category scores to a table-friendly shape
        const categoryArray = Array.isArray(feedback.categoryScores)
          ? feedback.categoryScores
          : Object.entries(feedback.categoryScores).map(([key, value]) => ({
              category: key,
              score: value,
            }));

        const formatScore = (score: any) => {
          if (score == null) return "N/A";
          if (typeof score === "number") return `${score}`;
          if (typeof score === "string") return score;
          if (typeof score === "object") {
            const val =
              score.score || score.value || score.marks || score.percentage;
            const total = score.total || score.outOf;
            if (val != null && total != null) return `${val}/${total}`;
            if (val != null) return `${val}`;
          }
          return "N/A";
        };

        const categoryData = categoryArray.map((item: any) => [
          (item.category || item.name || item.title || "Category")
            .toString()
            .replace(/([A-Z])/g, " $1")
            .trim(),
          formatScore(item.score),
        ]);

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
          const awardedRaw =
            qEval.marksAwarded ??
            qEval.score ??
            qEval.marks ??
            qEval.obtainedMarks ??
            qEval.pointsAwarded ??
            0;
          const maxRaw =
            qEval.maxMarks ??
            qEval.outOf ??
            qEval.totalMarks ??
            qEval.max ??
            qEval.points ??
            5;
          const awarded = Number.isFinite(awardedRaw)
            ? Number(awardedRaw)
            : 0;
          const max = Number.isFinite(maxRaw) ? Number(maxRaw) : 5;
          doc.text(
            `Score: ${awarded}/${max}`,
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

          // Inline Reference line (first valid topic URL)
          const refs: string[] = Array.isArray(qEval.educationalReferences)
            ? qEval.educationalReferences
            : [];
          const firstValidRef = refs.find((r) => {
            const url = extractUrl(r);
            return !!url && isTopicUrl(url);
          });
          if (firstValidRef) {
            checkPageBreak(10);
            const url = extractUrl(firstValidRef);
            const label = refLabel(firstValidRef);
            doc.setTextColor(37, 99, 235);
            const refLine = doc.splitTextToSize(
              `Reference: ${label} - ${url}`,
              pageWidth - 40
            );
            doc.text(refLine, 20, yPosition);
            yPosition += refLine.length * 5 + 6;
            doc.setTextColor(31, 41, 55);
          }
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

        const finalValue = (() => {
          if (typeof feedback.finalAssessment === "string") {
            return feedback.finalAssessment;
          }
          if (
            typeof feedback.finalAssessment === "object" &&
            feedback.finalAssessment !== null
          ) {
            // Attempt to use common fields for summary
            const overview =
              feedback.finalAssessment.overview ||
              feedback.finalAssessment.summary ||
              feedback.finalAssessment.comment;
            if (overview) return overview;
            return JSON.stringify(feedback.finalAssessment, null, 2);
          }
          return "N/A";
        })();

        const finalText = doc.splitTextToSize(
          cleanText(finalValue),
          pageWidth - 40
        );
        doc.text(finalText, 20, yPosition);
        yPosition += finalText.length * 5 + 10;
      }

      // Recommended Resources Section (trusted platforms)
      const recommended = feedback?.finalFeedback?.recommendedResources;
      if (Array.isArray(recommended) && recommended.length > 0) {
        checkPageBreak(30);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(37, 99, 235);
        doc.text("Recommended Learning Resources (Trusted Platforms)", 20, yPosition);
        yPosition += 10;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(31, 41, 55);

        recommended.forEach((ref: string) => {
          checkPageBreak(15);
          const url = extractUrl(ref);
          const label = refLabel(ref);
          const line = doc.splitTextToSize(`• ${label} - ${url}`, pageWidth - 40);
          doc.text(line, 20, yPosition);
          yPosition += line.length * 5 + 4;
        });
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
