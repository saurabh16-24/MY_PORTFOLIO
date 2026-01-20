"use client"

import React, { useState, useEffect, useMemo, Suspense } from "react"
import Image from "next/image"
import emailjs from '@emailjs/browser'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

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
  Code,
  FileCode,
  Terminal,
  Coffee,
  Brain,
  Box,
  FileBarChart,
  PieChart,
  Activity,
  Boxes,
  Layers,
  Database,
  FileJson,
  Settings,
  Code2,
  LayoutGrid,
  Zap,
  GitBranch,
  Monitor,
  Cpu,
  TrendingUp,
  FileText,
  Menu,
  X,
  Award,
  Sun,
  Moon,
  Server,
  Home,
  User,
  Briefcase,
  GraduationCap,
} from "lucide-react"
import { Hero3DScene, Skills3DScene, Contact3DScene } from "@/components/3d-scene"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { DataIntroScreen } from "@/components/data-intro"
import { DataNetworkBackground } from "@/components/data-network"
import { ClientOnly } from "@/components/client-only"
import { MultiColorNetwork } from "@/components/gap-visuals"
import { CurvedTimeline } from "@/components/curved-timeline"

export default function Portfolio() {
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
  const [showIntro, setShowIntro] = useState(false)
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    setMounted(true)
    // Force dark mode for data theme initially if not set
    setTheme("dark")

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false)
      } else {
        setIsNavVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

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
        'service_h4cdbjc',
        'template_sng6qol',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Saurabh',
        },
        'bWD_MtP07mtTCW2RK'
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

  // --- ORIGINAL USER DATA PRESERVED ---
  // Skills Data with Categories
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: [
        { name: "Python", icon: FileCode },
        { name: "C", icon: Terminal },
      ]
    },
    {
      title: "AI/ML & Data Science",
      icon: Brain,
      skills: [
        { name: "NumPy", icon: Box },
        { name: "Pandas", icon: FileBarChart },
        { name: "Matplotlib", icon: PieChart },
        { name: "Scikit-learn", icon: Activity },
        { name: "TensorFlow", icon: Boxes },
        { name: "Keras", icon: Layers },
      ]
    },
    {
      title: "Databases",
      icon: Database,
      skills: [
        { name: "SQL", icon: Database },
        { name: "NoSQL", icon: FileJson },
      ]
    },
    {
      title: "Tools & Platforms",
      icon: Settings,
      skills: [
        { name: "VS Code", icon: Code2 },
        { name: "Power BI", icon: BarChart3 },
        { name: "MS Office 365", icon: LayoutGrid },
        { name: "MySQL", icon: Database },
        { name: "PostgreSQL", icon: Database },
        { name: "Supabase", icon: Zap },
        { name: "Git", icon: GitBranch },
        { name: "GitHub", icon: Github },
      ]
    },
    {
      title: "Operating Systems",
      icon: Monitor,
      skills: [
        { name: "Windows", icon: Monitor },
        { name: "Linux", icon: Terminal },
      ]
    }
  ]

  const education = [
    {
      degree: "Bachelor of Engineering (B.E.) in Computer Science & Engineering",
      institution: "SVCE, Bengaluru",
      year: "2022-2026",
      description: "Currently pursuing with focus on programming, data structures, and software engineering",
    },
    {
      degree: "12th Grade (Intermediate)",
      institution: "Gyanada International Sr Sec School, Gopalganj, Bihar",
      year: "2020-2022",
      description: "Completed higher secondary education with science stream",
    },
    {
      degree: "10th Grade",
      institution: "DAV Public School, Thawe, Gopalganj, Bihar",
      year: "2020",
      description: "Completed secondary education with strong academic foundation",
    },
  ]

  const experience = [
    {
      title: "GST Management System (Industrial Project)",
      company: "Industrial Project",
      period: "July 2025 – Jan 2026",
      description: "Developed an end-to-end GST system using ETL workflows and microservice-based REST APIs.",
      achievements: [
        "Built microservice-based REST APIs for data ingestion, validation, and PostgreSQL storage",
        "Implemented secure RBAC and optimized SQL queries",
        "Reduced manual GST filing effort by 40%",
        "Onboarded 30+ test users and improved data accuracy with automated tax calculations"
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
    {
      title: "Event Coordinator - Foosball Event",
      company: "KalaVaibhava 2024, SVCE Bangalore",
      period: "11/2024",
      description: "Led event coordination for college cultural festival foosball tournament",
      achievements: [
        "Led planning, marketing, and budget management for campus sporting event",
        "Coordinated event logistics, promotions, and refereeing",
        "Oversaw refereeing and participant engagement to enhance event quality",
      ],
    },
  ]

  const certifications = [
    {
      name: "Second 2nd Prize in Python Workshop",
      issuer: "SVCE Bangalore",
      year: "2024",
      icon: Award,
      link: "https://drive.google.com/file/d/1fR9p65pczxQFEKqgeevuS1R8qsEdnAQ9/view?usp=sharing",
    },
    {
      name: "3rd Prize in Debugging Session",
      issuer: "SVCE Bangalore",
      year: "2024",
      icon: Award,
      link: "https://drive.google.com/file/d/1ltCoN1L1kPPJiMLJPa8-FKXn7TzmQzoe/view?usp=sharing",
    },
    {
      name: "Participated in CyberQuest Hackathon at DSATM",
      issuer: "DSATM",
      year: "2024",
      icon: Award,
      link: "https://drive.google.com/file/d/1QrYqkHC3WmwPges--nzxI3w8t9RvRfwW/view?usp=sharing",
    },
  ]

  const activities = [
    {
      title: "Sports Activities - Cricket and Kabaddi",
      organization: "SVCE Bangalore",
      period: "2022-Present",
      description: "Engaged in sports: Cricket and Kabaddi tournaments and college sports events",
    },
    {
      title: "Volunteered with NSS in cleanliness drives supporting Swachh Bharat",
      organization: "NSS (National Service Scheme)",
      period: "2023-2024",
      description: "Assisted in peer teaching and learning programs for school students",
    },
    {
      title: "Participated in organic farming initiatives promoting sustainability",
      organization: "NSS (National Service Scheme)",
      period: "2023-2024",
      description: "Participated in sustainable agriculture initiatives and organic farming awareness programs",
    },
  ]

  const projects = [
    {
      title: "Sales Prediction and Market Basket Analysis for Retail Chains",
      description: "Built machine learning models to predict seasonal sales and identify cross-selling opportunities at product level",
      tech: ["Python", "Machine Learning", "Data Analysis", "Retail Analytics"],
      link: "#",
      image: "/sales-prediction-dashboard.png",
      tags: ["Python", "Machine Learning", "Data Analysis", "Retail Analytics"] // Added tags for compatibility with new layout
    },
    {
      title: "AI-Powered Demand Forecasting and Dynamic Pricing in E-Commerce",
      description: "Developed interactive forecasting models integrating pricing, demand, and inventory dynamics",
      tech: ["Python", "AI", "Forecasting", "E-Commerce"],
      link: "#",
      image: "/demand-forecasting-interface.png",
      tags: ["Python", "AI", "Forecasting", "E-Commerce"]
    },
    {
      title: "Sports Sponsorship and Market Analysis Using AI",
      description: "Created AI models analyzing social media sentiment and merchandise sales for sponsorship optimization",
      tech: ["Python", "AI", "Social Media Analytics", "Market Analysis"],
      link: "#",
      image: "/sports-analysis-dashboard.png",
      tags: ["Python", "AI", "Social Media Analytics", "Market Analysis"]
    },
  ];
  // ------------------------------------

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

      {/* Floating Dock Navbar */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform ${isNavVisible ? 'translate-y-0' : '-translate-y-[200%]'} bg-[#0a0a0a]/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-1 shadow-[0_0_20px_rgba(124,58,237,0.1)]`}>
        {[
          { name: "Home", icon: Home },
          { name: "About", icon: User },
          { name: "Skills", icon: Brain },
          { name: "Education", icon: GraduationCap },
          { name: "Experience", icon: Briefcase },
          { name: "Projects", icon: Code },
          { name: "Contact", icon: Mail },
        ].map((item) => {
          const isActive = activeSection === item.name.toLowerCase()
          return (
            <button
              key={item.name}
              onClick={() => {
                document.getElementById(item.name.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
                setActiveSection(item.name.toLowerCase())
              }}
              className={`relative p-3 rounded-full transition-all duration-300 group hover:bg-white/5 ${isActive ? "text-white" : "text-muted-foreground hover:text-white"}`}
              title={item.name}
            >
              {isActive && (
                <div className="absolute inset-0 bg-accent rounded-full -z-10 animate-scale-in" />
              )}
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />

              {/* Tooltip */}
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.name}
              </span>
            </button>
          )
        })}
      </nav>  {/* Mobile Menu */}


      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden">
        <Hero3DScene />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <ScrollReveal>
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 border border-accent/30 rounded-full bg-accent/5 backdrop-blur-sm mb-4 animate-bounce-soft">
                <span className="text-accent font-mono text-sm tracking-wider">DATA SCIENCE ENTHUSIAST & ANALYST</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-4">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Saurabh Kumar Singh</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
                Transforming raw data into actionable insights through Data Science, Machine Learning, and Interactive Visualization.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <MagneticButton onClick={() => window.open('https://drive.google.com/file/d/1PP-heh-ljlgqz8cXdh4A1C3Z7czRBypV/view?usp=drivesdk', '_blank')} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Download className="mr-2 h-4 w-4" /> Download Resume
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
        {/* Background Network */}
        <MultiColorNetwork />

        {/* Central Connecting Line */}
        <CurvedTimeline />

        {/* Sections alternating left/right */}

        <div id="about" className="relative mb-20 md:mb-48 md:ml-auto md:w-[45%] md:pr-12 text-center md:text-left group">
          {/* Connector Dot */}
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute hidden md:block w-6 h-6 rounded-full bg-accent top-10 -left-[calc(5.5%+12px)] shadow-[0_0_15px_#10b981] border-4 border-black z-10 hover:scale-150 transition-transform cursor-pointer"
            aria-label="Scroll to About"
          />

          <div className="flex flex-col items-center md:items-start mb-12">
            <Dialog modal={false}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300 w-full md:w-3/4 group">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold flex items-center justify-center md:justify-start gap-2 text-foreground group-hover:text-accent transition-colors">
                      <Monitor className="text-accent h-8 w-8" /> About Me
                      <ExternalLink className="h-4 w-4 opacity-50 ml-2" />
                    </CardTitle>
                    <CardDescription className="text-center md:text-left">
                      Click to learn more about my background
                    </CardDescription>
                  </CardHeader>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto border-accent/20 bg-[#020617]/95 backdrop-blur-xl p-8" onOpenAutoFocus={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                    <Monitor className="text-accent" />
                    <h3 className="text-2xl font-bold">About Me</h3>
                  </div>


                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Profile Image */}
                    <div className="w-full md:w-1/4 flex-shrink-0">
                      <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden border-2 border-accent/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                        <Image
                          src="/M.jpeg"
                          alt="Profile"
                          fill
                          className="object-cover object-top"
                          priority
                        />
                      </div>
                      <div className="mt-3 p-3 text-center border border-accent/30 rounded-md bg-accent/5">
                        <p className="text-sm font-semibold text-foreground">Saurabh Kumar Singh</p>
                        <p className="text-xs text-muted-foreground">CSE Graduate from VTU</p>
                      </div>
                    </div>

                    {/* Text Content and Quote */}
                    <div className="flex-1 flex flex-col gap-6">
                      <div className="text-muted-foreground leading-relaxed text-lg">
                        <p>
                          I am a passionate Computer Science student at SVCE Bangalore, with a strong focus on Data Science and Analytics.
                          My journey involves turning complex datasets into meaningful stories through code and visualization.
                          I thrive in solving real-world problems using Python, SQL, and modern ML algorithms.
                        </p>
                      </div>

                      {/* Inspirational Quote */}
                      <div className="p-6 rounded-lg border-2 border-accent/40 bg-gradient-to-br from-accent/10 to-accent/5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl text-accent leading-none">"</span>
                          <p className="flex-1 text-lg italic text-foreground/90 leading-relaxed">
                            Data is not just numbers and statistics—it's the voice of reality waiting to be heard.
                            Every dataset tells a story, and as a data enthusiast, I'm here to listen, interpret, and transform that story into actionable insights.<span className="text-2xl text-accent leading-none">"</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Skills Section */}
        <div id="skills" className="relative mb-20 md:mb-48 md:mr-auto md:w-[45%] md:pl-12 text-center md:text-right group">
          {/* Connector Dot */}
          <button
            onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute hidden md:block w-6 h-6 rounded-full bg-accent top-10 -right-[calc(5.5%+12px)] shadow-[0_0_15px_#10b981] border-4 border-black z-10 hover:scale-150 transition-transform cursor-pointer"
            aria-label="Scroll to Skills"
          />



          <Skills3DScene />
          <div className="flex flex-col items-center md:items-end mb-12">
            {/* Sign Board Trigger */}
            <Dialog modal={false}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300 w-full md:w-3/4 group">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold flex items-center justify-center md:justify-end gap-3 text-foreground group-hover:text-accent transition-colors">
                      Technical Arsenal <Brain className="text-accent h-8 w-8" />
                      <ExternalLink className="h-4 w-4 opacity-50 ml-2" />
                    </CardTitle>
                    <CardDescription className="text-center md:text-right">
                      Click to view detailed technology stack
                    </CardDescription>
                  </CardHeader>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto border-accent/20 bg-[#020617]/95 backdrop-blur-xl p-8 !top-[40%]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-4">
                  <Brain className="text-accent" />
                  <h3 className="text-2xl font-bold">Technical Arsenal</h3>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  A comprehensive breakdown of my technical skills and tools.
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {skillCategories.map((category, catIndex) => (
                    <Card key={catIndex} className="bg-white/5 border-white/10">
                      <CardHeader className="bg-black/20 pb-4">
                        <CardTitle className="text-xl font-bold flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-accent/10 text-accent">
                            <category.icon size={20} />
                          </div>
                          {category.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-3 gap-4">
                          {category.skills.map((skill, skillIndex) => (
                            <div key={skillIndex} className="flex flex-col items-center justify-center p-3 rounded-xl bg-black/40 border border-white/5 hover:border-accent/40 hover:bg-accent/5 transition-all aspect-square text-center">
                              <skill.icon size={24} className="text-muted-foreground mb-2" />
                              <span className="text-[10px] md:text-xs font-semibold text-muted-foreground">
                                {skill.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div id="experience" className="relative mb-20 md:mb-48 md:ml-auto md:w-[45%] md:pr-12 group">
          {/* Connector Dot */}
          <button
            onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute hidden md:block w-6 h-6 rounded-full bg-accent top-10 -left-[calc(5.5%+12px)] shadow-[0_0_15px_#10b981] border-4 border-black z-10 hover:scale-150 transition-transform cursor-pointer"
            aria-label="Scroll to Experience"
          />

          <div className="flex flex-col items-center md:items-start mb-12">
            <Dialog modal={false}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300 w-full md:w-3/4 group">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold flex items-center justify-center md:justify-start gap-2 text-foreground group-hover:text-accent transition-colors">
                      <TrendingUp className="text-accent h-8 w-8" /> Professional Experience
                      <ExternalLink className="h-4 w-4 opacity-50 ml-2" />
                    </CardTitle>
                    <CardDescription className="text-center md:text-left">
                      Click to view career timeline
                    </CardDescription>
                  </CardHeader>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto border-accent/20 bg-[#020617]/95 backdrop-blur-xl p-8 !top-[45%]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-4">
                  <TrendingUp className="text-accent" />
                  <h3 className="text-2xl font-bold">Professional Experience</h3>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  My journey in the professional world.
                </div>
                <div className="space-y-8">
                  {experience.map((exp, index) => (
                    <Card key={index} className="bg-white/5 border-white/10 hover:border-accent/40 transition-all">
                      <CardHeader>
                        <CardTitle className="text-xl text-accent">{exp.title}</CardTitle>
                        <CardDescription className="text-lg font-semibold text-white/80">{exp.company}</CardDescription>
                        <Badge variant="outline" className="w-fit mt-2 border-accent/50 text-accent">{exp.period}</Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 text-muted-foreground">{exp.description}</p>
                        {exp.achievements && (
                          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                            {exp.achievements.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        )}
                        {exp.link && (
                          <a href={exp.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-4 text-accent hover:underline">
                            View Certificate <ExternalLink size={14} className="ml-1" />
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div id="projects" className="relative mb-20 md:mb-48 md:mr-auto md:w-[45%] md:pl-12 text-center md:text-right group">
          {/* Connector Dot */}
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute hidden md:block w-6 h-6 rounded-full bg-accent top-10 -right-[calc(5.5%+12px)] shadow-[0_0_15px_#10b981] border-4 border-black z-10 hover:scale-150 transition-transform cursor-pointer"
            aria-label="Scroll to Projects"
          />

          <div className="flex flex-col items-center md:items-end mb-12">
            <Dialog modal={false}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300 w-full md:w-3/4 group">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold flex items-center justify-center md:justify-end gap-3 text-foreground group-hover:text-accent transition-colors">
                      Key Projects <Code className="text-accent h-8 w-8" />
                      <ExternalLink className="h-4 w-4 opacity-50 ml-2" />
                    </CardTitle>
                    <CardDescription className="text-center md:text-right">
                      Click to explore my work
                    </CardDescription>
                  </CardHeader>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto border-accent/20 bg-[#020617]/95 backdrop-blur-xl p-8 !top-[55%]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-4">
                  <Code className="text-accent" />
                  <h3 className="text-2xl font-bold">Key Projects</h3>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  Showcase of my technical projects and experiments.
                </div>
                <div className="space-y-6">
                  {projects.map((project, index) => (
                    <Card key={index} className="bg-white/5 border-white/10 hover:border-accent/40 hover:transform hover:scale-[1.01] transition-all duration-300">
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(project.tags || project.tech || []).map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">{tag}</Badge>
                          ))}
                        </div>
                        <div className="flex gap-4">
                          {project.link && project.link !== "#" && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-1 hover:text-accent transition-colors"><ExternalLink size={16} /> View</a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div id="education" className="relative mb-20 md:mb-48 md:ml-auto md:w-[45%] md:pr-12 group">
          {/* Connector Dot */}
          <button
            onClick={() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute hidden md:block w-6 h-6 rounded-full bg-accent top-10 -left-[calc(5.5%+12px)] shadow-[0_0_15px_#10b981] border-4 border-black z-10 hover:scale-150 transition-transform cursor-pointer"
            aria-label="Scroll to Education"
          />

          <div className="flex flex-col items-center md:items-start mb-12">
            <Dialog modal={false}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300 w-full md:w-3/4 group">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold flex items-center justify-center md:justify-start gap-2 text-foreground group-hover:text-accent transition-colors">
                      <Award className="text-accent h-8 w-8" /> Education
                      <ExternalLink className="h-4 w-4 opacity-50 ml-2" />
                    </CardTitle>
                    <CardDescription className="text-center md:text-left">
                      Click to view academic timeline
                    </CardDescription>
                  </CardHeader>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto border-accent/20 bg-[#020617]/95 backdrop-blur-xl p-8 !top-[65%]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-4">
                  <Award className="text-accent" />
                  <h3 className="text-2xl font-bold">Education</h3>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  My academic background.
                </div>
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
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Certifications & Activities */}
        <div id="activities" className="relative mb-20 md:mb-48 md:mr-auto md:w-[45%] md:pl-12 text-center md:text-right group">
          {/* Connector Dot */}
          < div className="absolute hidden md:block w-4 h-4 rounded-full bg-accent top-10 -right-[calc(5.5%+9px)] shadow-[0_0_10px_#10b981]" ></div >

          <div className="flex flex-col items-center md:items-end mb-12">
            <Dialog modal={false}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300 w-full md:w-3/4 group">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold flex items-center justify-center md:justify-end gap-3 text-foreground group-hover:text-accent transition-colors">
                      Achievements & Activities <Award className="text-accent h-8 w-8" />
                      <ExternalLink className="h-4 w-4 opacity-50 ml-2" />
                    </CardTitle>
                    <CardDescription className="text-center md:text-right">
                      Click to view certifications and extracurriculars
                    </CardDescription>
                  </CardHeader>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto border-accent/20 bg-[#020617]/95 backdrop-blur-xl p-8 !top-[70%]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-4">
                  <Award className="text-accent" />
                  <h3 className="text-2xl font-bold">Achievements & Activities</h3>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  Certifications, awards, and extracurricular involvements.
                </div>

                <div className="mt-6 space-y-8">
                  {/* Certifications */}
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-accent">
                      <Award /> Certifications & Awards
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {certifications.map((cert, index) => (
                        <Card key={index} className="bg-white/5 border-white/10 hover:border-accent/40 transition-all flex flex-col justify-between h-full">
                          <CardHeader>
                            <CardTitle className="text-lg leading-tight">{cert.name}</CardTitle>
                            <CardDescription className="mt-1">{cert.issuer} • {cert.year}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline flex items-center gap-1">
                              View Credential <ExternalLink size={12} />
                            </a>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Activities */}
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-accent">
                      <Activity /> Extracurriculars
                    </h3>
                    <div className="space-y-4">
                      {activities.map((act, index) => (
                        <Card key={index} className="bg-white/5 border-white/10 hover:border-accent/40">
                          <CardHeader>
                            <CardTitle className="text-lg">{act.title}</CardTitle>
                            <CardDescription>{act.organization} • {act.period}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">{act.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
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
      </section >

      <footer className="py-8 border-t border-accent/10 text-center text-muted-foreground bg-[#020617]">
        <p>© 2026 Saurabh Kumar Singh</p>
      </footer>
    </div >
  )
}








