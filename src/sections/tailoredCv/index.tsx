import { useState } from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Api from "src/config/api.config";
import { DashboardContent } from "src/layouts/dashboard";
import { useToastActions } from "src/hooks/useToast";

import { downloadCoverLetterPdf, downloadCvPdf, pdfFileName } from "./downloadPdf";

type Analysis = {
  summary: string;
  skills: string[];
  requiredSkills: string[];
  missingSkills: string[];
  coverLetter: string;
};

type DownloadKind = "cv" | "cover-letter";

function requestError(error: unknown, fallback: string) {
  if (typeof error === "object" && error && "response" in error) {
    const message = (error as { response?: { data?: { message?: unknown } } }).response?.data
      ?.message;
    if (typeof message === "string" && message) return message;
    if (Array.isArray(message)) {
      return message
        .map((item) =>
          typeof item === "object" && item && "msg" in item
            ? String((item as { msg: unknown }).msg)
            : String(item)
        )
        .join(", ");
    }
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export default function TailoredCv() {
  const toast = useToastActions();
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [downloading, setDownloading] = useState<DownloadKind | null>(null);

  const canAnalyze = jobTitle.trim() && companyName.trim() && jobDescription.trim();

  const analyze = async () => {
    if (!canAnalyze || analyzing) return;
    setAnalyzing(true);
    try {
      const response = await Api.post("/cv/analyze", {
        jobTitle: jobTitle.trim(),
        companyName: companyName.trim(),
        jobDescription: jobDescription.trim(),
      });
      const data = response.data?.data as Analysis | undefined;
      if (!data?.summary || !data.coverLetter) {
        throw new Error("Job analysis failed");
      }
      setAnalysis({
        summary: data.summary,
        skills: data.skills ?? [],
        requiredSkills: data.requiredSkills ?? [],
        missingSkills: data.missingSkills ?? [],
        coverLetter: data.coverLetter,
      });
    } catch (error) {
      setAnalysis(null);
      toast.showError(requestError(error, "Job analysis failed"));
    } finally {
      setAnalyzing(false);
    }
  };

  const download = async (kind: DownloadKind) => {
    if (!analysis || downloading) return;
    setDownloading(kind);
    try {
      const name = pdfFileName(
        companyName.trim(),
        jobTitle.trim(),
        kind === "cv" ? "CV" : "Cover Letter"
      );
      if (kind === "cv") {
        await downloadCvPdf(jobTitle.trim(), analysis.summary, analysis.skills, name);
      } else {
        await downloadCoverLetterPdf(companyName.trim(), jobTitle.trim(), analysis.coverLetter, name);
      }
    } catch (error) {
      toast.showError(requestError(error, "The PDF could not be created"));
    } finally {
      setDownloading(null);
    }
  };

  return (
    <DashboardContent>
      <Stack spacing={3}>
        <Typography variant="h4">Tailored CV</Typography>
        <Typography variant="body2" color="text.secondary">
          Paste a job, review the draft, then download a CV and cover letter. Your saved profile
          is not changed, and the files are not stored.
        </Typography>

        <Card sx={{ p: 3 }}>
          <Stack spacing={2}>
            <TextField
              label="Job title"
              value={jobTitle}
              onChange={(event) => setJobTitle(event.target.value)}
              fullWidth
            />
            <TextField
              label="Company name"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              fullWidth
            />
            <TextField
              label="Job description"
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              fullWidth
              multiline
              minRows={8}
            />
            <Box>
              <Button variant="contained" onClick={analyze} disabled={!canAnalyze || analyzing}>
                {analyzing ? "Analyzing..." : "Analyze"}
              </Button>
            </Box>
          </Stack>
        </Card>

        {analysis && (
          <Card sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h6">Professional summary</Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                {analysis.summary}
              </Typography>

              <Typography variant="h6">Skills on this CV</Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {analysis.skills.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    None of your saved skills matched this job.
                  </Typography>
                ) : (
                  analysis.skills.map((skill) => <Chip key={skill} label={skill} />)
                )}
              </Stack>

              <Typography variant="h6">Skills the job asks for</Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {analysis.requiredSkills.map((skill) => (
                  <Chip key={skill} label={skill} variant="outlined" />
                ))}
              </Stack>

              {analysis.missingSkills.length > 0 && (
                <Alert severity="warning">
                  Not added to the CV: {analysis.missingSkills.join(", ")}
                </Alert>
              )}

              <Typography variant="h6">Cover letter</Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                {analysis.coverLetter}
              </Typography>

              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  onClick={() => download("cv")}
                  disabled={downloading !== null}
                >
                  {downloading === "cv" ? <CircularProgress size={18} color="inherit" /> : "Download CV"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => download("cover-letter")}
                  disabled={downloading !== null}
                >
                  {downloading === "cover-letter" ? (
                    <CircularProgress size={18} />
                  ) : (
                    "Download cover letter"
                  )}
                </Button>
              </Stack>
              <Typography variant="caption" color="text.secondary">
                The PDF is created in the browser and is not saved.
              </Typography>
            </Stack>
          </Card>
        )}
      </Stack>
    </DashboardContent>
  );
}
