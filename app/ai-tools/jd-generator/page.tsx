import type { Metadata } from "next";
import JDGenerator from "@/components/JDGenerator/JDGenerator";

export const metadata: Metadata = {
  title: "Free AI Job Description Generator | Aptahire",
  description:
    "Generate accurate, detailed, and tailored job descriptions in seconds with Aptahire's AI-powered JD Generator. Free to use.",
};

export default function JDGeneratorPage() {
  return <JDGenerator />;
}
