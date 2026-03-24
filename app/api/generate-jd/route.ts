import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

function buildPrompt(data: {
  jobTitle: string;
  industry: string;
  jobType: string;
  experienceLevel: string;
  keyResponsibilities: string;
  skills: string;
  tone: string;
  companyName?: string;
}): string {
  const {
    jobTitle,
    industry,
    jobType,
    experienceLevel,
    keyResponsibilities,
    skills,
    tone,
    companyName,
  } = data;

  return `You are a world-class HR professional and talent strategist with 15+ years of experience crafting job descriptions that attract elite candidates in competitive markets. Your job descriptions are known for being compelling, precise, inclusive, and ATS-optimized.

Create a complete, professional job description for the following role:

**Role Details:**
- Job Title: ${jobTitle}
- Industry: ${industry}
- Job Type: ${jobType}
- Experience Level: ${experienceLevel}
${companyName ? `- Company Name: ${companyName}` : ""}
- Key Responsibilities Input: ${keyResponsibilities}
- Required Skills: ${skills}
- Writing Tone: ${tone}

**Structure the job description with these exact sections using Markdown headers:**

## About the Role
Write 3 sentences that capture the mission and impact of this position. Make it exciting and candidate-focused. Highlight why this role matters to the company and the industry.

## What You'll Do
List 8–10 key responsibilities as bullet points. Use strong action verbs (Lead, Build, Architect, Drive, Own, etc.). Each bullet should describe an outcome, not just a task. Reference the input responsibilities but expand them meaningfully.

## What You'll Bring
List 6–8 required qualifications. Include:
- Years of experience specific to ${experienceLevel} level
- Technical skills derived from: ${skills}
- Soft skills critical for the ${industry} industry
- Relevant education or certifications if appropriate

## Nice to Have
List 4–5 preferred qualifications that would make a candidate stand out but are not required.

## Why Join Us
Write 6–8 compelling bullet points covering: compensation philosophy, growth opportunities, work culture, work-life balance, learning & development, team environment, and any perks/benefits. Make these feel authentic and specific, not generic.

## Our Commitment to Diversity
Write 2 sentences affirming the company's commitment to equal opportunity and inclusive hiring practices.

**Writing Guidelines:**
- Use a ${tone} tone throughout — let the personality shine in word choices
- Use inclusive, bias-free language (avoid gendered pronouns unless specified)
- Include quantifiable context where possible (team sizes, scale, impact metrics)
- Make the JD compelling to attract ${experienceLevel}-level ${jobTitle} talent in ${industry}
- ATS-friendly: use clear section headers and natural keyword integration
- Avoid corporate buzzwords like "synergy", "rockstar", "ninja", or "guru"
- Each section should feel crafted, not templated

Return only the formatted job description. No preamble, no commentary, no "Here is your job description:" prefix.`;
}

export async function POST(request: NextRequest) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const body = await request.json();

    const { jobTitle, industry, jobType, experienceLevel, keyResponsibilities, skills, tone, companyName } = body;

    if (!jobTitle || !industry || !jobType || !experienceLevel || !skills) {
      return NextResponse.json(
        { error: "Missing required fields: jobTitle, industry, jobType, experienceLevel, skills" },
        { status: 400 }
      );
    }

    const prompt = buildPrompt({
      jobTitle,
      industry,
      jobType,
      experienceLevel,
      keyResponsibilities: keyResponsibilities || "Not specified",
      skills,
      tone: tone || "Professional",
      companyName,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an expert HR specialist who writes exceptional job descriptions. You always follow the exact format requested and produce ready-to-publish content.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const generatedJD = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({
      jobDescription: generatedJD,
      usage: completion.usage,
    });
  } catch (error: unknown) {
    console.error("JD generation error:", error);

    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return NextResponse.json(
          { error: "Invalid OpenAI API key. Please check your configuration." },
          { status: 401 }
        );
      }
      if (error.status === 429) {
        return NextResponse.json(
          { error: "API rate limit reached. Please try again in a moment." },
          { status: 429 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: error.status ?? 500 });
    }

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
