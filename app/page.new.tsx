"use client"

import React, { useState, useEffect, Suspense } from "react"
import emailjs from '@emailjs/browser'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  BarChart3,
  Database,
  Brain,
  TrendingUp,
  Code,
  FileText,
  Menu,
  X,
  Award,
  Sun,
  Moon,
  Monitor,
  Server,
} from "lucide-react"
import { Hero3DScene, Skills3DScene, Contact3DScene } from "@/components/3d-scene"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { DataIntroScreen } from "@/components/data-intro"
import { DataNetworkBackground } from "@/components/data-network"
import { ClientOnly } from "@/components/client-only"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    setMounted(true)
    // Force dark mode for data theme initially if not set
    setTheme("dark")
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await emailjs.send(
        'service_bg451al',
        'template_3408q18',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Saurabh',
        },
        '0y33X524Qx-j73Kk-'
      )

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('EmailJS Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) return null

  // Data for sections
  const skills = [
    { name: "Python", level: 90, icon: FileText },
    { name: "SQL", level: 85, icon: Database },
    { name: "Machine Learning", level: 80, icon: Brain },
    { name: "Data Visualization", level: 85, icon: BarChart3 },
    { name: "Power BI / Tableau", level: 80, icon: TrendingUp },
    { name: "Big Data Technologies", level: 75, icon: Server },
    { name: "React / Next.js", level: 70, icon: Code },
  ]

  const education = [
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "SVCE Bangalore",
      year: "2022 - 2026",
      description: "Focused on Data Science, Algorithms, and Software Engineering.",
    },
    {
      degree: "Class XII",
      institution: "Kendriya Vidyalaya",
      year: "2021",
      description: "PCMB stream with focus on Mathematics and Computer Science.",
    },
  ]

  const experience = [
    {
      title: "GST Management System",
      company: "Industrial Project",
      period: "July 2025 – Nov 2025",
      description: "Architected a microservices backend with RESTful APIs to ingest, validate, and process high-volume GST invoice data using PostgreSQL.",
      achievements: [
        "Built robust ETL workflows to handle complex data transformation, following strict SDLC practices to ensure code manageability and scalability.",
        "Optimized database performance and query execution plans, significantly improving total transaction throughput and system reliability.",
        "Secured the application with a comprehensive Role-Based Access Control (RBAC) system, enforcing strict authorization policies across multi-tenant user roles.",
      ],
    },
    {
      title: "Data Visualization Associate Internship",
      company: "Excelerate - Remote",
      period: "04/2025 - 05/2025",
      description: "Worked on comprehensive data visualization projects focusing on business intelligence and analytics",
      achievements: [
        "Developed comprehensive dashboards for tracking key performance indicators and trends",
        "Conducted in-depth data analysis for forecasting market shifts and identifying opportunities",
        "Optimized supply chain operations with regression and clustering techniques",
        "Enhanced data-driven decision-making processes",
      ],
      link: "https://drive.google.com/file/d/1v4PqjYHbEn6JpCz3sYEbUy8jiMhZJH07/view?usp=sharing",
    },
  ]

  const projects = [
    {
      title: "Health Assistant Chatbot",
      description: "AI-powered chatbot for preliminary health diagnosis and advice.",
      tags: ["Python", "NLP", "Machine Learning"],
      link: "https://github.com/saurabh16-24/Health-Assistant-Chatbot",
      demo: "https://github.com/saurabh16-24/Health-Assistant-Chatbot",
    },
    {
      title: "End-to-End IPL Score Prediction",
      description: "Machine learning model to predict IPL cricket match scores.",
      tags: ["Python", "Scikit-learn", "Pandas"],
      link: "https://github.com/saurabh16-24/End-to-End-IPL-Score-Prediction",
      demo: "https://github.com/saurabh16-24/End-to-End-IPL-Score-Prediction",
    },
    {
      title: "Credit Card Fraud Detection",
      description: "Anomaly detection system for identifying fraudulent credit card transactions.",
      tags: ["Python", "Anomaly Detection", "Data Analysis"],
      link: "https://github.com/saurabh16-24/Credit-Card-Fraud-Detection",
      demo: "https://github.com/saurabh16-24/Credit-Card-Fraud-Detection",
    },
  ]

  const certifications = [
    {
      name: "First Prize in Project Expo 2025",
      issuer: "SVCE Bangalore",
      year: "2025",
      icon: Award,
      link: "https://drive.google.com/file/d/1qpR2sViD7ggklYqSLi_WPbqUMZIBucgW/view?usp=drivesdk",
    },
    {
      name: "Second 2nd Prize in Python Workshop",
      issuer: "SVCE Bangalore",
      year: "2024",
      icon: Award,
      link: "https://drive.google.com/file/d/1fR9p65pczxQFEKqgeevuS1R8qsEdnAQ9/view?usp=sharing",
    },
    {
      name: "Infosys Springboard Python Certification",
      issuer: "Infosys",
      year: "2024",
      icon: Code,
      link: "https://drive.google.com/file/d/1g1D4oQhuO4pZ-u1xQ02i-TKiWDrM2Gv_/view?usp=sharing",
    },
    {
      name: "Introduction to Data Science",
      issuer: "Cisco",
      year: "2024",
      icon: Database,
      link: "https://drive.google.com/file/d/1n2jX6Wd4T-uBv5mE8zOqK7l9wR3s4t/view?usp=sharing",
    },
  ]

  const activities = [
    {
      title: "GeeksforGeeks Student Club Member",
      organization: "SVCE Chapter",
      period: "2023 - Present",
      description: "Active member contributing to coding events and workshops.",
    },
    {
      title: "Event Coordinator",
      organization: "College Tech Fest",
      period: "2024",
      description: "Organized and managed technical events during the annual tech fest.",
    }
  ]

  return (
    <div className={`min-h-screen bg-transparent text-foreground relative transition-colors duration-300 font-sans selection:bg-accent selection:text-accent-foreground`}>

      {showIntro && (
        <ClientOnly>
          <DataIntroScreen onComplete={() => setShowIntro(false)} />
        </ClientOnly>
      )}

      <ClientOnly>
        <DataNetworkBackground />
      </ClientOnly>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isMenuOpen ? "bg-background/95 backdrop-blur-md" : "bg-transparent backdrop-blur-sm"} border-b border-border/10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-mono text-xl font-bold text-accent animate-pulse">
                &lt;Saurabh /&gt;
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {["Home", "About", "Skills", "Education", "Experience", "Projects", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                      setActiveSection(item.toLowerCase())
                    }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:text-accent hover:bg-accent/10 ${activeSection === item.toLowerCase() ? "text-accent bg-accent/10" : "text-muted-foreground"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {["Home", "About", "Skills", "Education", "Experience", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                    setActiveSection(item.toLowerCase())
                  }}
                  className="block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:text-accent hover:bg-accent/10 transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden">
        <Hero3DScene />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <ScrollReveal>
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 border border-accent/30 rounded-full bg-accent/5 backdrop-blur-sm mb-4 animate-bounce-soft">
                <span className="text-accent font-mono text-sm tracking-wider">DATA SCIENCE ENTHUSIAST & ANALYST</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Saurabh Kumar Singh</span>
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed">
                Transforming raw data into actionable insights through Data Science, Machine Learning, and Interactive Visualization.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <MagneticButton onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  View Projects
                </MagneticButton>
                <MagneticButton variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Contact Me
                </MagneticButton>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-6 mt-12">
                {[
                  { icon: Github, link: "https://github.com/saurabh16-24" },
                  { icon: Linkedin, link: "https://linkedin.com/in/saurabh-singh" },
                  { icon: Mail, link: "mailto:saurabhks102@gmail.com" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent transition-colors transform hover:scale-110"
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stair/Graph Layout Container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Central Connecting Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500/20 via-cyan-500/50 to-emerald-500/20 hidden md:block transform -translate-x-1/2"></div>


        {/* Sections alternating left/right */}

        {/* About Section */}
        <div id="about" className="relative mb-32 md:mb-48 md:ml-auto md:w-[45%] md:pr-12 md:text-left text-left group">
          {/* Connector Dot */}
          <div className="absolute hidden md:block w-4 h-4 rounded-full bg-accent top-10 -left-[calc(5.5%+9px)] shadow-[0_0_10px_#10b981]"></div>

          <ScrollReveal>
            <Card className="bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-3xl font-bold flex items-center gap-2">
                  <Monitor className="text-accent" /> About Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  I am a passionate Computer Science student at SVCE Bangalore, with a strong focus on Data Science and Analytics.
                  My journey involves turning complex datasets into meaningful stories through code and visualization.
                  I thrive in solving real-world problems using Python, SQL, and modern ML algorithms.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>

        {/* Skills Section */}
        <div id="skills" className="relative mb-32 md:mb-48 md:mr-auto md:w-[45%] md:pl-12 md:text-right group">
          {/* Connector Dot */}
          <div className="absolute hidden md:block w-4 h-4 rounded-full bg-accent top-10 -right-[calc(5.5%+9px)] shadow-[0_0_10px_#10b981]"></div>

          <Skills3DScene />

          <ScrollReveal>
            <div className="grid grid-cols-1 gap-4">
              <h2 className="text-3xl font-bold mb-6 flex items-center justify-end gap-2 text-right">
                Technical Arsenal <Brain className="text-accent" />
              </h2>
              {skills.map((skill, index) => (
                <div key={index} className="bg-card/30 p-4 rounded-lg border border-accent/10 hover:border-accent/40 transition-all">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold flex items-center gap-2">
                      <skill.icon size={16} className="text-accent" /> {skill.name}
                    </span>
                    <span className="text-accent">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2 bg-accent/10" />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Experience Section */}
        <div id="experience" className="relative mb-32 md:mb-48 md:ml-auto md:w-[45%] md:pr-12 group">
          {/* Connector Dot */}
          <div className="absolute hidden md:block w-4 h-4 rounded-full bg-accent top-10 -left-[calc(5.5%+9px)] shadow-[0_0_10px_#10b981]"></div>

          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <TrendingUp className="text-accent" /> Professional Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/50 transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl text-accent">{exp.title}</CardTitle>
                    <CardDescription className="text-lg font-semibold">{exp.company}</CardDescription>
                    <Badge variant="outline" className="w-fit mt-2 border-accent/50 text-accent">{exp.period}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-muted-foreground">{exp.description}</p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                      {exp.achievements.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    {exp.link && (
                      <a href={exp.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-4 text-accent hover:underline">
                        View Certificate <ExternalLink size={14} className="ml-1" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Projects Section */}
        <div id="projects" className="relative mb-32 md:mb-48 md:mr-auto md:w-[45%] md:pl-12 group">
          {/* Connector Dot */}
          <div className="absolute hidden md:block w-4 h-4 rounded-full bg-accent top-10 -right-[calc(5.5%+9px)] shadow-[0_0_10px_#10b981]"></div>

          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-8 flex items-center justify-end gap-2 text-right">
              Key Projects <Code className="text-accent" />
            </h2>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/50 hover:transform hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-1 hover:text-accent transition-colors"><Github size={16} /> Source</a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Education Section */}
        <div id="education" className="relative mb-32 md:mb-48 md:ml-auto md:w-[45%] md:pr-12 group">
          {/* Connector Dot */}
          <div className="absolute hidden md:block w-4 h-4 rounded-full bg-accent top-10 -left-[calc(5.5%+9px)] shadow-[0_0_10px_#10b981]"></div>

          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <Award className="text-accent" /> Education
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-accent pl-4 py-2 hover:bg-accent/5 transition-colors rounded-r-lg">
                  <h3 className="text-xl font-bold">{edu.institution}</h3>
                  <p className="text-accent font-medium">{edu.degree}</p>
                  <p className="text-sm text-muted-foreground mb-2">{edu.year}</p>
                  <p className="text-muted-foreground">{edu.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Certifications & Activities */}
        <div id="activities" className="relative mb-32 md:mb-48 md:mr-auto md:w-[45%] md:pl-12 group">
          {/* Connector Dot */}
          <div className="absolute hidden md:block w-4 h-4 rounded-full bg-accent top-10 -right-[calc(5.5%+9px)] shadow-[0_0_10px_#10b981]"></div>

          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-8 flex items-center justify-end gap-2 text-right">
              Achievements & Activities <Award className="text-accent" />
            </h2>
            <div className="space-y-6">
              <div className="bg-card/50 p-6 rounded-lg border border-accent/20">
                <h3 className="text-xl font-semibold mb-4 text-accent">Certifications</h3>
                <ul className="space-y-4">
                  {certifications.map((cert, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <cert.icon size={20} className="text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-muted-foreground">{cert.issuer} | {cert.year}</p>
                        {cert.link && <a href={cert.link} target="_blank" className="text-xs text-accent hover:underline">View</a>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card/50 p-6 rounded-lg border border-accent/20">
                <h3 className="text-xl font-semibold mb-4 text-accent">Co-Curricular</h3>
                <ul className="space-y-4">
                  {activities.map((act, i) => (
                    <li key={i}>
                      <p className="font-medium">{act.title}</p>
                      <p className="text-sm text-muted-foreground">{act.organization}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-accent/10 glass">
        <Contact3DScene />
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-12">Let's <span className="text-accent">Connect</span></h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-lg text-muted-foreground mb-8">
                  I'm always open to discussing data science projects, potential collaborations, or just geeking out over the latest ML trends.
                </p>
                <div className="space-y-6">
                  <a href="mailto:saurabhks102@gmail.com" className="flex items-center gap-4 text-foreground hover:text-accent transition-colors p-3 rounded-lg hover:bg-accent/5">
                    <Mail size={24} className="text-accent" /> saurabhks102@gmail.com
                  </a>
                  <div className="flex items-center gap-4 text-foreground p-3 rounded-lg hover:bg-accent/5">
                    <Phone size={24} className="text-accent" /> 9380328640 / 9973705441
                  </div>
                  <div className="flex items-center gap-4 text-foreground p-3 rounded-lg hover:bg-accent/5">
                    <MapPin size={24} className="text-accent" /> Bengaluru, India
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-6">Resume</h3>
                  <MagneticButton
                    variant="outline"
                    size="lg"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    onClick={() => window.open("https://drive.google.com/file/d/1PP-heh-ljlgqz8cXdh4A1C3Z7czRBypV/view?usp=drivesdk", "_blank")}
                  >
                    <Download className="w-4 h-4 mr-2" /> Download Resume
                  </MagneticButton>
                </div>
              </div>

              <Card className="bg-card/30 border-accent/20 backdrop-blur-md">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input name="name" value={formData.name} onChange={handleInputChange} required className="bg-background/50 border-accent/30 focus:border-accent" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required className="bg-background/50 border-accent/30 focus:border-accent" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Input name="subject" value={formData.subject} onChange={handleInputChange} required className="bg-background/50 border-accent/30 focus:border-accent" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea name="message" value={formData.message} onChange={handleInputChange} required rows={4} className="bg-background/50 border-accent/30 focus:border-accent" />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                    {submitStatus === 'success' && <p className="text-green-500 text-sm text-center">Message sent successfully!</p>}
                    {submitStatus === 'error' && <p className="text-red-500 text-sm text-center">Failed to send message. Try again.</p>}
                  </form>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="py-8 border-t border-accent/10 text-center text-muted-foreground bg-[#020617]">
        <p>© 2026 Saurabh Kumar Singh. Built with Next.js, Tailwind & Three.js.</p>
      </footer>
    </div>
  )
}
