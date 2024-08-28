"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "./ui/button";

interface VisitorIDCardProps {
  visitorName: string;
  visitorId: string;
  visitPurpose: string;
  contactPerson: string;
  visitDate: string
}

const VisitorIDCard: React.FC<VisitorIDCardProps> = ({
  visitorName,
  visitorId,
  visitPurpose,
  contactPerson,
  visitDate,
}) => {
  const downloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`VISITOR_PASS_IKNTEL_${visitorName}.pdf`);
    });
  };

  const pdfRef = useRef();

  return (
    <div>
      <div
        ref={pdfRef}
        style={{
          maxWidth: "20rem",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "0.5rem",
          border: "1px solid #d1d5db",
          overflow: "hidden",
        }}
      >

        <div
          style={{
            backgroundColor: "#ef4444",
            textAlign: "center",
            padding: "0.5rem 0",
            fontWeight: "bold",
            letterSpacing: "0.05em",
            color: "#ffffff",
          }}
        >
          VISITOR
        </div>
        <img
          src="/images/ikontel-logo.png"
          width={100}
          height={100}
          alt="Ikontel Solutions Private Limites"
          style={{
            display: "block",
            margin: "1.25rem auto",
          }}
        />

        <div style={{ padding: "1rem" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#4a5568",
            }}
          >
            {visitorName}
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#4a5568",
            }}
          >
            Visitor ID: {visitorId}
          </p>

          <div style={{ marginTop: "1rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>
              <span
                style={{
                  fontWeight: "600",
                  color: "#4a5568",
                }}
              >
                Purpose:
              </span>
              <span
              className="text-sm"
              >{visitPurpose}</span>
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <span
                style={{
                  fontWeight: "600",
                  color: "#4a5568",
                }}
              >
                Contact Person:
              </span>
              <span
              className="text-sm"
              >{contactPerson}</span>
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <span
                style={{
                  fontWeight: "600",
                  color: "#4a5568",
                }}
              >
                Visit Date:
              </span>
              <span
              className="text-sm"
              >{visitDate}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            backgroundColor: "#ef4444",
            textAlign: "center",
            padding: "0.5rem 0",
          }}
        >
          <p
            style={{
              color: "#ffffff",
              fontSize: "0.875rem",
            }}
          >
            Visitor Pass
          </p>
        </div>
      </div>
        <Button
        className="w-full my-5 bg-red-500 hover:bg-red-800"
        onClick={downloadPdf}>Download Pass</Button>
    </div>
  );
};

export default VisitorIDCard;
