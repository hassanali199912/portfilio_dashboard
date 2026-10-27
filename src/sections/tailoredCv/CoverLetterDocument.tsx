import { Document, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingHorizontal: 48,
    paddingBottom: 48,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#111",
    lineHeight: 1.45,
  },
  name: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
  },
  contact: {
    marginTop: 4,
    fontSize: 10,
  },
  link: {
    color: "#1565c0",
    textDecoration: "none",
  },
  block: {
    marginTop: 22,
  },
  company: {
    fontFamily: "Helvetica-Bold",
  },
  paragraph: {
    marginTop: 10,
  },
  sign: {
    marginTop: 22,
  },
});

export type CoverLetterProps = {
  companyName: string;
  jobTitle: string;
  coverLetter: string;
};

export function CoverLetterDocument({ companyName, jobTitle, coverLetter }: CoverLetterProps) {
  const paragraphs = coverLetter
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\n/g, " ").trim())
    .filter(Boolean);

  return (
    <Document title={`${companyName} - ${jobTitle}`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>Hassan Ali Hassan</Text>
        <Text style={styles.contact}>Cairo, Egypt  ·  +20 155 388 0080  ·  hassanalihassan1203@gmail.com</Text>
        <Text style={styles.contact}>
          <Link style={styles.link} src="https://github.com/hassanali199912">
            GitHub
          </Link>
          {"   "}
          <Link style={styles.link} src="https://www.linkedin.com/in/hassan-ali-510b39192/">
            LinkedIn
          </Link>
        </Text>

        <View style={styles.block}>
          <Text style={styles.company}>{companyName}</Text>
          <Text>{jobTitle}</Text>
        </View>

        {paragraphs.map((paragraph) => (
          <Text key={paragraph} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}

        <Text style={styles.sign}>Hassan Ali Hassan</Text>
      </Page>
    </Document>
  );
}
