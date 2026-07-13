import sectorsJourneyVideo from "@/assets/experience-sectors-journey-hd.mp4";
import type { SectorsExperienceSector } from "@/components/SectorsExperience";

export const experienceSectors = [
  {
    slug: "healthcare",
    title: "Healthcare",
    hint: "Hospital campus",
    body: "Patient-first care, advanced facilities and trusted clinical partnerships designed to raise healthcare standards across the communities we serve.",
    notes: ["Advanced care", "Clinical infrastructure", "Community wellbeing"],
  },
  {
    slug: "education",
    title: "Education",
    hint: "School campus",
    body: "Future-ready campuses and quality learning environments that prepare students for a changing world while creating lasting community value.",
    notes: ["Future-ready learning", "Student development", "Knowledge-led growth"],
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    hint: "Hotel & resort",
    body: "Thoughtful hotels and leisure experiences shaped by modern comfort, attentive service and a strong sense of place.",
    notes: ["Hotels & leisure", "Guest experience", "Service excellence"],
  },
  {
    slug: "energy",
    title: "Energy",
    hint: "Energy complex",
    body: "Reliable energy platforms spanning core infrastructure, solar systems and practical transition pathways built for resilient long-term growth.",
    notes: ["Core infrastructure", "Solar systems", "Resilient growth"],
  },
] satisfies readonly SectorsExperienceSector[];

export const experienceVideo = sectorsJourneyVideo;
