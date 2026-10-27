import type { ReactNode } from "react";
import { Document, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 32,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#111",
    lineHeight: 1.35,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
  },
  title: {
    fontSize: 13,
    fontFamily: "Helvetica-Oblique",
    marginTop: 2,
  },
  right: {
    textAlign: "right",
    fontSize: 9,
  },
  links: {
    marginTop: 4,
    fontSize: 9,
  },
  link: {
    color: "#1565c0",
    textDecoration: "none",
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#1565c0",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    borderBottomWidth: 1,
    borderBottomColor: "#111",
    paddingBottom: 2,
    marginBottom: 4,
  },
  roleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  italic: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 8,
  },
  bullet: {
    marginLeft: 10,
    marginTop: 1,
  },
  skillLabel: {
    fontFamily: "Helvetica-Bold",
    width: 70,
  },
  skillRow: {
    flexDirection: "row",
    marginTop: 2,
  },
});

type Entry = {
  title: string;
  right: string;
  subtitle: string;
  meta: string;
  items?: string[];
};

const experience: Entry[] = [
  {
    title: "Software Engineer",
    right: "Jan 2026 -- Present",
    subtitle: "sahelBooks",
    meta: "Invoice CRM System",
    items: [
      "Design and maintain UI features using React and TypeScript, and convert Figma screens to code.",
      "Developed and maintained backend services, RESTful APIs, and database integrations to support scalable web applications.",
    ],
  },
  {
    title: "Software Engineer",
    right: "May 2025 -- Dec 2025",
    subtitle: "InformaCore Technologies",
    meta: "Saudi Ministry of Justice Project - Amicable Settlement (Weddi)",
    items: [
      "Implemented modular front-end features using React and TypeScript to enhance functionality and user experience.",
      "Resolved front-end issues and refactored legacy components to improve code quality, stability, and maintainability.",
      "Developed and maintained backend services, RESTful APIs, and database integrations to support scalable web applications.",
    ],
  },
  {
    title: "Full Stack Developer",
    right: "Aug 2023 -- Aug 2024",
    subtitle: "TopGrowth",
    meta: "Educational and other company projects",
    items: [
      "Built and deployed new platform features using React, Node.js, Express, and MongoDB.",
      "Enhanced user interface components and optimized backend logic to improve usability, responsiveness, and system efficiency.",
    ],
  },
];

const projects: Entry[] = [
  {
    title: "Balance — Real Estate Website (11/2024)",
    right: "React.js, Tailwind CSS",
    subtitle: "",
    meta: "",
    items: [
      "Developed a responsive real estate platform enabling users to browse, filter, and view property details.",
    ],
  },
  {
    title: "Weddi — Friendly Settlement for Labor Disputes (05/2024)",
    right: "React.js, Tailwind CSS",
    subtitle: "",
    meta: "",
    items: [
      "Built core front-end modules for a digital dispute-resolution system used in large-scale legal operations.",
    ],
  },
  {
    title: "Real Estate Consulting Website",
    right: "React.js, Bootstrap, Node.js, Express, MongoDB",
    subtitle: "",
    meta: "",
    items: [
      "Created a full-stack consulting platform for requesting, tracking, and managing real estate consultations.",
    ],
  },
  {
    title: "Task Management System (02/2025 -- 03/2025)",
    right: ".NET MVC, C#, Bootstrap",
    subtitle: "",
    meta: "",
    items: [
      "Developed an MVC task management application with real-time chat features.",
    ],
  },
  {
    title: "Spacecavez — Education Platform (08/2023)",
    right: "React.js, Node.js, MongoDB",
    subtitle: "",
    meta: "",
    items: [
      "Built an online learning platform with authentication, course management, and a scalable backend.",
    ],
  },
  {
    title: "Topgrowth Agency (10/2023)",
    right: "React.js, Node.js, MongoDB",
    subtitle: "",
    meta: "",
    items: [
      "Developed marketing service modules and admin dashboards for content management.",
    ],
  },
  {
    title: "TTN — Productivity Tools",
    right: "Bootstrap, JavaScript",
    subtitle: "",
    meta: "",
    items: [
      "Created lightweight productivity tools for task tracking, time management, and notes.",
    ],
  },
  {
    title: "Blog Website",
    right: "React.js, Bootstrap, Node.js, MongoDB",
    subtitle: "",
    meta: "",
    items: [
      "Built a blogging system with authentication, article management, and an admin dashboard.",
    ],
  },
];

const internships: Entry[] = [
  {
    title: "ITI — Web Development Using ASP.NET",
    right: "Oct 2024 -- Jun 2025",
    subtitle: "9-Month Training Program",
    meta: "Assuit, Egypt",
  },
  {
    title: "DEPI — MERN Stack Training",
    right: "Apr 2024 -- Oct 2024",
    subtitle: "6-Month Training",
    meta: "Assuit, Egypt",
  },
  {
    title: "Ministry of Communications And IT — PHP/Laravel",
    right: "Nov 2022 -- Jan 2023",
    subtitle: "Training",
    meta: "Assuit, Egypt",
  },
  {
    title: "ITI — Front-end Development Using Angular",
    right: "Jul 2021 -- Aug 2021",
    subtitle: "Summer Training",
    meta: "Assuit, Egypt",
  },
  {
    title: "ITI — Soft Skills And Freelancing Program",
    right: "24-Hour Training",
    subtitle: "Assuit, Egypt",
    meta: "",
  },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Role({ entry }: { entry: Entry }) {
  return (
    <View>
      <View style={styles.roleRow}>
        <Text style={styles.bold}>{entry.title}</Text>
        <Text>{entry.right}</Text>
      </View>
      {(entry.subtitle || entry.meta) && (
        <View style={styles.roleRow}>
          <Text style={styles.italic}>{entry.subtitle}</Text>
          <Text style={styles.italic}>{entry.meta}</Text>
        </View>
      )}
      {entry.items?.map((item) => (
        <Text key={item} style={styles.bullet}>
          • {item}
        </Text>
      ))}
    </View>
  );
}

export type CvDocumentProps = {
  jobTitle: string;
  summary: string;
  skills: string[];
};

export function CvDocument({ jobTitle, summary, skills }: CvDocumentProps) {
  const skillLine = skills.filter(Boolean).join(", ") || "—";

  return (
    <Document title={`Hassan Ali - ${jobTitle}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.name}>Hassan Ali Hassan</Text>
            <Text style={styles.title}>{jobTitle}</Text>
            <Text style={styles.links}>
              <Link style={styles.link} src="https://github.com/hassanali199912">
                GitHub
              </Link>
              {"   "}
              <Link style={styles.link} src="https://www.linkedin.com/in/hassan-ali-510b39192/">
                LinkedIn
              </Link>
              {"   "}
              <Link style={styles.link} src="https://hassanalihssan-livid.vercel.app/">
                Portfolio
              </Link>
            </Text>
          </View>
          <View style={styles.right}>
            <Text>Cairo, Egypt</Text>
            <Text>+20 155 388 0080</Text>
            <Text>hassanalihassan1203@gmail.com</Text>
            <Link
              style={styles.link}
              src="https://drive.google.com/drive/folders/1s7unjuxPCzSHQf4cILxs3VPabplr8ubY?usp=sharing"
            >
              Certificates
            </Link>
          </View>
        </View>

        <Section title="Professional Summary">
          <Text>{summary}</Text>
        </Section>

        <Section title="Education">
          <Role
            entry={{
              title: "ITI 9-Month Diploma: Professional Training Program (PTP)",
              right: "Information Technology Institute (ITI)",
              subtitle: "Professional Development & BI-infused CRM",
              meta: "Oct 2024 -- Jul 2025",
            }}
          />
          <Role
            entry={{
              title: "Bachelor of Information Technology",
              right: "Egyptian E-Learning University",
              subtitle: "Web Engineering, AI, Security, IT Fundamentals | GPA: 3.49 (Very Good)",
              meta: "2018 -- 2022, Assuit",
            }}
          />
        </Section>

        <Section title="Experience">
          {experience.map((entry) => (
            <Role key={`${entry.title}-${entry.right}`} entry={entry} />
          ))}
        </Section>

        <Section title="Technical Skills">
          <View style={styles.skillRow}>
            <Text style={styles.skillLabel}>Skills</Text>
            <Text style={{ flex: 1 }}>{skillLine}</Text>
          </View>
        </Section>

        <Section title="Projects">
          {projects.map((entry) => (
            <Role key={entry.title} entry={entry} />
          ))}
        </Section>

        <Section title="Internships">
          {internships.map((entry) => (
            <Role key={entry.title} entry={entry} />
          ))}
        </Section>

        <Section title="Volunteering">
          <Role
            entry={{
              title: "Front End Training Lead",
              right: "January 2025 -- April 2025",
              subtitle: "Information Technology Institute (ITI) - Assiut Intake 45",
              meta: "Assiut, Egypt",
              items: [
                "Supervised front-end development tasks for ITI colleagues and reviewed code submissions.",
                "Guided React concepts, UI patterns, and practical front-end techniques.",
              ],
            }}
          />
          <Role
            entry={{
              title: "Technical Speaker At GDES",
              right: "Mar 2021 -- Oct 2022",
              subtitle: "Egyptian E-Learning University",
              meta: "Assiut, Egypt",
              items: [
                "Conducted sessions to discuss modern web technologies.",
                "Helped organize a marathon for students entering Google's Solution Challenge competitions.",
              ],
            }}
          />
        </Section>

        <Section title="Awards and Competitions">
          <Text style={styles.bullet}>• ACPC 2019 — Ranked 60th among 400 teams.</Text>
          <Text style={styles.bullet}>• ACPC 2020 — Secured 40th position out of 425 teams.</Text>
        </Section>

        <Section title="Languages">
          <View style={styles.skillRow}>
            <Text style={styles.skillLabel}>Arabic</Text>
            <Text>Native</Text>
          </View>
          <View style={styles.skillRow}>
            <Text style={styles.skillLabel}>English</Text>
            <Text>Intermediate</Text>
          </View>
        </Section>
      </Page>
    </Document>
  );
}
