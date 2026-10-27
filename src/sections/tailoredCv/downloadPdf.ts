import { pdf, type DocumentProps } from "@react-pdf/renderer";
import { createElement, type ReactElement } from "react";

import { CoverLetterDocument } from "./CoverLetterDocument";
import { CvDocument } from "./CvDocument";

function saveBlob(blob: Blob, downloadName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = downloadName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function pdfFileName(company: string, role: string, kind: "CV" | "Cover Letter") {
  return `${company} - ${role} - ${kind}.pdf`.replace(/[\\/:*?"<>|]/g, "").trim();
}

export async function downloadCvPdf(jobTitle: string, summary: string, skills: string[], downloadName: string) {
  const blob = await pdf(
    createElement(CvDocument, { jobTitle, summary, skills }) as ReactElement<DocumentProps>
  ).toBlob();
  saveBlob(blob, downloadName);
}

export async function downloadCoverLetterPdf(
  companyName: string,
  jobTitle: string,
  coverLetter: string,
  downloadName: string
) {
  const blob = await pdf(
    createElement(CoverLetterDocument, { companyName, jobTitle, coverLetter }) as ReactElement<DocumentProps>
  ).toBlob();
  saveBlob(blob, downloadName);
}
