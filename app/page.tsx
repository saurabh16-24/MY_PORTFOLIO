"use client"

import { useState, useEffect, Suspense } from "react"
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
} from "lucide-react"
import { Hero3DScene, Skills3DScene, Contact3DScene } from "@/components/3d-scene"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
  }>>([])

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    const newParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 8}s`,
      animationDuration: `${8 + Math.random() * 4}s`,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-accent/20 rounded-full animate-particle-float"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration,
          }}
        />
      ))}
    </div>
  )
}

const MatrixRain = () => {
  const [rainDrops, setRainDrops] = useState<Array<{
    left: string;
    animationDelay: string;
    animationDuration: string;
    character: string;
  }>>([])

  useEffect(() => {
    // Generate rain drops only on client side to avoid hydration mismatch
    const newRainDrops = [...Array(50)].map(() => ({
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
      character: Math.random() > 0.5 ? "1" : "0",
    }))
    setRainDrops(newRainDrops)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {rainDrops.map((drop, i) => (
        <div
          key={i}
          className="absolute text-accent font-mono text-sm animate-matrix-rain"
          style={{
            left: drop.left,
            animationDelay: drop.animationDelay,
            animationDuration: drop.animationDuration,
          }}
        >
          {drop.character}
        </div>
      ))}
    </div>
  )
}

const TypingEffect = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    setMounted(true)
    
    // Initialize EmailJS (commented out for testing)
    // emailjs.init('YOUR_PUBLIC_KEY') // Replace with your EmailJS public key
  }, [])

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "skills",
        "education",
        "experience",
        "projects",
        "resume",
        "achievements",
        "activities",
        "contact",
      ]
      
      const scrollPosition = window.scrollY
      const offset = 150 // Increased offset for better detection

      let currentSection = "hero"
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          const sectionTop = offsetTop - offset
          const sectionBottom = offsetTop + offsetHeight - offset
          
          // Check if the section is currently in view
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section
            break
          }
        }
      }
      
      // Add some debugging to see what's happening
      console.log('Scroll position:', scrollPosition, 'Active section:', currentSection)
      
      setActiveSection(currentSection)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  const getThemeIcon = () => {
    if (!mounted) return <Monitor className="w-5 h-5" />
    if (theme === "light") return <Sun className="w-5 h-5" />
    if (theme === "dark") return <Moon className="w-5 h-5" />
    return <Monitor className="w-5 h-5" />
  }

  const skills = [
    { name: "Python", level: 95, icon: Code, category: "Programming" },
    { name: "SQL", level: 90, icon: Database, category: "Database" },
    { name: "NoSQL", level: 85, icon: Database, category: "Database" },
    { name: "MongoDB", level: 83, icon: Database, category: "Database" },
    { name: "MySQL", level: 88, icon: Database, category: "Database" },
    { name: "AWS", level: 80, icon: Code, category: "Cloud" },
    { name: "MS Office 365", level: 92, icon: FileText, category: "Productivity" },
    { name: "GitLab", level: 85, icon: Code, category: "Tools" },
    { name: "Data Science", level: 90, icon: TrendingUp, category: "Analytics" },
    { name: "Machine Learning", level: 85, icon: Brain, category: "ML" },
    { name: "Data Visualization", level: 88, icon: BarChart3, category: "Visualization" },
    { name: "Statistical Analysis", level: 87, icon: TrendingUp, category: "Statistics" },
  ]

  const education = [
    {
      degree: "Bachelor of Engineering (B.E.) in Computer Science & Engineering",
      institution: "SVCE, Bengaluru",
      year: "2022-2026",
      description: "Currently pursuing with focus on programming, data structures, and software engineering",
      grade: "CGPA: 7.7/10",
      semesters: "Sem 1: 7.8/10, Sem 2: 7.9/10, Sem 3: 7.2/10, Sem 4: 7.6/10, Sem 5: 7.6/10, Sem 6: 7.9/10, Sem 7: 8.1/10",
    },
    {
      degree: "12th Grade (Intermediate)",
      institution: "Gyanada International Sr Sec School, Gopalganj, Bihar",
      year: "2020-2022",
      description: "Completed higher secondary education with science stream",
      grade: "Percentage: 84.8%",
    },
    {
      degree: "10th Grade",
      institution: "DAV Public School, Thawe, Gopalganj, Bihar",
      year: "2020",
      description: "Completed secondary education with strong academic foundation",
      grade: "Percentage: 84.4%",
    },
  ]

  const experience = [
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
      name: "Second 2nd Prize in Debugging Session",
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
    },
    {
      title: "AI-Powered Demand Forecasting and Dynamic Pricing in E-Commerce",
      description: "Developed interactive forecasting models integrating pricing, demand, and inventory dynamics",
      tech: ["Python", "AI", "Forecasting", "E-Commerce"],
      link: "#",
      image: "/demand-forecasting-interface.png",
    },
    {
      title: "Sports Sponsorship and Market Analysis Using AI",
      description: "Created AI models analyzing social media sentiment and merchandise sales for sponsorship optimization",
      tech: ["Python", "AI", "Social Media Analytics", "Market Analysis"],
      link: "#",
      image: "/sports-analysis-dashboard.png",
    },
  ]

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Initialize EmailJS with your public key
      emailjs.init('bWD_MtP07mtTCW2RK')

      // Using EmailJS for client-side email sending
      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        from_name: formData.name,
        from_email: formData.email,
      }

      // Send email using EmailJS directly
      const result = await emailjs.send(
        'service_h4cdbjc',
        'template_sng6qol',
        templateParams,
        'bWD_MtP07mtTCW2RK'
      )

      if (result.status === 200) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 relative overflow-x-hidden">
      {/* Enhanced 3D Mouse Cursor */}
      <div
        className="fixed w-6 h-6 bg-accent/40 rounded-full pointer-events-none z-50 transition-all duration-200 ease-out backdrop-blur-sm"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0}) rotate(${mousePosition.x * 0.1}deg)`,
          boxShadow: `0 0 20px rgba(16, 185, 129, 0.3)`,
        }}
      />
      <div
        className="fixed w-2 h-2 bg-accent rounded-full pointer-events-none z-50 transition-all duration-100 ease-out"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
        }}
      />

      <nav className="fixed top-0 w-full glass z-50 border-b border-border/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div 
              className="font-montserrat font-bold text-xl gradient-text animate-fade-in-up cursor-pointer hover:scale-110 transition-all duration-300 hover:rotate-1 transform-3d"
              onClick={() => scrollToSection("hero")}
              style={{
                textShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
              }}
            >
              Saurabh Kumar Singh
            </div>
            <div className="hidden lg:flex space-x-6 items-center">
              {[
                "About",
                "Skills",
                "Education",
                "Experience",
                "Projects",
                "Resume",
                "Achievements",
                "Activities",
                "Contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-all duration-300 hover:text-accent hover:scale-110 hover:rotate-1 relative group transform-3d ${
                    activeSection === item.toLowerCase() ? "text-accent font-semibold" : "text-muted-foreground"
                  }`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="ml-4 hover:bg-accent/10 transition-all duration-300 hover:rotate-180"
              >
                {getThemeIcon()}
              </Button>
            </div>
            <div className="flex items-center lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="mr-2 hover:bg-accent/10 transition-all duration-300 hover:rotate-180"
              >
                {getThemeIcon()}
              </Button>
              <button
                className="p-2 text-muted-foreground hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in-up glass">
              <div className="flex flex-col space-y-3">
                {[
                  "About",
                  "Skills",
                  "Education",
                  "Experience",
                  "Projects",
                  "Resume",
                  "Achievements",
                  "Activities",
                  "Contact",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-left px-4 py-2 text-sm font-medium transition-colors hover:text-accent ${
                      activeSection === item.toLowerCase() ? "text-accent font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <Suspense fallback={null}>
          <Hero3DScene />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-muted/40 to-accent/20 animate-gradient-shift"></div>
        <FloatingParticles />
                  <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-20 h-20 bg-accent/10 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div
              className="absolute top-40 right-20 w-16 h-16 bg-accent/5 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"
            ></div>
            <div
              className="absolute bottom-40 left-20 w-12 h-12 bg-accent/15 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"
            ></div>
            <div className="absolute top-60 left-1/4 w-8 h-8 bg-accent/20 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
            <div className="absolute bottom-60 right-1/4 w-10 h-10 bg-accent/8 rounded-full animate-float-delayed transform-3d hover-glow animate-pulse-3d"></div>
          </div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/40 rounded-full blur-xl animate-pulse-glow group-hover:blur-2xl transition-all duration-500"></div>
                <img
                  src="/saurabh-profile.jpg"
                  alt="Saurabh Kumar Singh"
                  className="relative w-48 h-48 rounded-full mx-auto mb-6 border-4 border-accent animate-pulse-glow shadow-2xl object-cover object-top transform-3d hover:rotate-y-12 transition-all duration-500 hover-lift hover:scale-110"
                  style={{ 
                    objectPosition: "50% 15%",
                    filter: "drop-shadow(0 0 20px rgba(16, 185, 129, 0.3))"
                  }}
                />
              </div>
            </div>
            <h1 className="font-montserrat font-black text-4xl sm:text-6xl lg:text-7xl gradient-text mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Saurabh Kumar Singh
            </h1>
            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <p className="text-xl sm:text-2xl text-accent font-semibold mb-2">
                <TypingEffect text="Python Data Analyst" />
              </p>
              <p className="text-lg text-muted-foreground">Computer Science Engineering Student</p>
            </div>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              A passionate Data Enthusiast with a solid foundation in programming, data analysis, and problem-solving. Proficient
              in Python, SQL, and data visualization tools, with hands-on experience in uncovering insights and supporting informed
              decision-making. Skilled in machine learning and statistical analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
              <MagneticButton
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold hover:shadow-lg hover:shadow-accent/25 transform-3d hover:scale-110 hover:rotate-1 transition-all duration-300"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </MagneticButton>
              <MagneticButton
                variant="outline"
                size="lg"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent hover:shadow-lg hover:shadow-accent/25 transform-3d hover:scale-110 hover:rotate-1 transition-all duration-300"
                onClick={() => scrollToSection("contact")}
              >
                Get In Touch
              </MagneticButton>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* 3D Background Elements for About Section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-16 h-16 bg-accent/5 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div className="absolute top-32 right-16 w-12 h-12 bg-accent/8 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"></div>
            <div className="absolute bottom-20 left-1/3 w-14 h-14 bg-accent/10 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"></div>
            <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-accent/15 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="book-container inline-block">
                <div className="book-cover px-8 py-4 animate-book-open">
                  <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">About Me</h2>
                  <div className="w-20 h-1 bg-white/80 mx-auto animate-gradient-shift"></div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in-left">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  A passionate Data Enthusiast with a strong foundation in programming, data analysis, and
                  problem-solving. Currently pursuing B.E. in Computer Science & Engineering at SVCE, Bengaluru, with
                  proven experience in data manipulation, automation, and AI development.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Skilled in leveraging Python, SQL, and visualization tools like Power BI to uncover insights and drive
                  informed decision-making. My approach combines technical proficiency with practical application,
                  demonstrated through various projects and hands-on experience in data analytics simulations.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                  <div>
                    <p>
                      <strong>Email:</strong> saurabhks102@gmail.com
                    </p>
                    <p>
                      <strong>Phone:</strong> 9380328640
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Location:</strong> Bengaluru
                    </p>
                    <p>
                      <strong>DOB:</strong> 10-02-2004
                    </p>
                  </div>
                </div>
                <div className="flex space-x-4 mt-8">
                  <MagneticButton
                    variant="outline"
                    size="icon"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                    onClick={() => window.open("https://github.com/saurabh16-24", "_blank")}
                  >
                    <Github className="w-5 h-5" />
                  </MagneticButton>
                  <MagneticButton
                    variant="outline"
                    size="icon"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                    onClick={() => window.open("https://linkedin.com/in/saurabh-singh", "_blank")}
                  >
                    <Linkedin className="w-5 h-5" />
                  </MagneticButton>
                  <MagneticButton
                    variant="outline"
                    size="icon"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                    onClick={() => window.open("mailto:saurabhks102@gmail.com", "_blank")}
                  >
                    <Mail className="w-5 h-5" />
                  </MagneticButton>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: BarChart3, title: "Data Visualization", desc: "Creating compelling visual stories" },
                  { icon: Brain, title: "Machine Learning", desc: "Predictive modeling & algorithms" },
                  { icon: Database, title: "Data Engineering", desc: "ETL processes & data pipelines" },
                  { icon: TrendingUp, title: "Statistical Analysis", desc: "Advanced statistical methods" },
                ].map((service, index) => (
                  <ScrollReveal key={service.title} delay={index * 100}>
                    <div className="book-container">
                      <div className="book-page text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-110 group hover-lift transform-3d hover:rotate-y-6 animate-book-shadow">
                        <div className="relative">
                          <service.icon className="w-12 h-12 text-accent mx-auto mb-4 group-hover:animate-scale-pulse group-hover:animate-rotate-3d" />
                          <div className="absolute inset-0 bg-accent/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors duration-300">{service.title}</h3>
                        <p className="text-sm text-muted-foreground group-hover:text-accent/80 transition-colors duration-300">{service.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
          <Suspense fallback={null}>
            <Skills3DScene />
          </Suspense>
          {/* 3D Background Elements for Skills Section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-16 left-1/4 w-20 h-20 bg-accent/8 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div className="absolute top-40 right-1/3 w-16 h-16 bg-accent/5 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"></div>
            <div className="absolute bottom-32 left-1/2 w-12 h-12 bg-accent/12 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"></div>
            <div className="absolute top-2/3 right-1/5 w-10 h-10 bg-accent/15 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
            <div className="absolute bottom-16 right-1/4 w-14 h-14 bg-accent/6 rounded-full animate-float-delayed transform-3d hover-glow animate-pulse-3d"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="book-container inline-block">
                <div className="book-cover px-8 py-4 animate-book-open">
                  <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">Technical Skills</h2>
                  <div className="w-20 h-1 bg-white/80 mx-auto animate-gradient-shift"></div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <ScrollReveal key={skill.name} delay={index * 50}>
                  <div className="book-container">
                    <div className="book-page p-6 hover:shadow-lg transition-all duration-300 hover:scale-110 hover-glow transform-3d hover:rotate-y-3 animate-book-shadow group">
                      <div className="flex items-center mb-4">
                        <div className="relative">
                          <skill.icon className="w-8 h-8 text-accent mr-3 animate-scale-pulse group-hover:animate-rotate-3d" />
                          <div className="absolute inset-0 bg-accent/10 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg group-hover:text-accent transition-colors duration-300">{skill.name}</h3>
                            <span className="text-sm text-muted-foreground group-hover:text-accent/80 transition-colors duration-300">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2 group-hover:bg-accent/20 transition-colors duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* 3D Background Elements for Education Section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-12 left-1/5 w-18 h-18 bg-accent/6 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div className="absolute top-36 right-1/6 w-14 h-14 bg-accent/9 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"></div>
            <div className="absolute bottom-24 left-2/3 w-16 h-16 bg-accent/7 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"></div>
            <div className="absolute top-1/2 left-1/4 w-10 h-10 bg-accent/12 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="book-container inline-block">
                <div className="book-cover px-8 py-4 animate-book-open">
                  <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">Education</h2>
                  <div className="w-20 h-1 bg-white/80 mx-auto animate-gradient-shift"></div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              {education.map((edu, index) => (
                <ScrollReveal key={edu.degree} delay={index * 200}>
                  <div className="book-container">
                    <div className="book-page p-6 hover:shadow-lg transition-all duration-300 hover:scale-110 hover-lift transform-3d hover:rotate-y-3 animate-book-shadow group">
                      <CardHeader>
                        <CardTitle className="text-xl">{edu.degree}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          <span className="font-semibold">{edu.institution}</span> - {edu.year}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg text-muted-foreground mb-4">{edu.description}</p>
                        <p className="text-lg text-muted-foreground">{edu.grade}</p>
                        {edu.semesters && (
                          <div className="mt-4">
                            <h3 className="font-semibold text-lg mb-2">Semesters</h3>
                            <p className="text-lg text-muted-foreground">{edu.semesters}</p>
                          </div>
                        )}
                      </CardContent>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
          {/* 3D Background Elements for Experience Section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-1/3 w-16 h-16 bg-accent/8 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div className="absolute top-44 right-1/4 w-12 h-12 bg-accent/5 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"></div>
            <div className="absolute bottom-28 left-1/4 w-14 h-14 bg-accent/10 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"></div>
            <div className="absolute top-2/3 right-1/3 w-8 h-8 bg-accent/15 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
            <div className="absolute bottom-12 right-1/5 w-18 h-18 bg-accent/6 rounded-full animate-float-delayed transform-3d hover-glow animate-pulse-3d"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="book-container inline-block">
                <div className="book-cover px-8 py-4 animate-book-open">
                  <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">Work Experience</h2>
                  <div className="w-20 h-1 bg-white/80 mx-auto animate-gradient-shift"></div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              {experience.map((exp, index) => (
                <ScrollReveal key={exp.title} delay={index * 200}>
                  <div className="book-container">
                    <div className="book-page p-6 hover:shadow-lg transition-all duration-300 hover:scale-110 hover-lift transform-3d hover:rotate-y-3 animate-book-shadow group">
                      <CardHeader>
                        <CardTitle className="text-xl">{exp.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          <span className="font-semibold">{exp.company}</span> - {exp.period}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg text-muted-foreground mb-4">{exp.description}</p>
                        <ul className="list-disc list-inside text-lg text-muted-foreground mb-4">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                        {exp.link && (
                          <MagneticButton
                            variant="outline"
                            size="sm"
                            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                            onClick={() => window.open(exp.link, "_blank")}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Certificate
                          </MagneticButton>
                        )}
                      </CardContent>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* 3D Background Elements for Projects Section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-16 left-1/6 w-20 h-20 bg-accent/7 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div className="absolute top-48 right-1/5 w-14 h-14 bg-accent/9 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"></div>
            <div className="absolute bottom-20 left-1/2 w-16 h-16 bg-accent/8 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"></div>
            <div className="absolute top-1/3 right-1/6 w-12 h-12 bg-accent/11 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
            <div className="absolute bottom-8 right-1/3 w-10 h-10 bg-accent/6 rounded-full animate-float-delayed transform-3d hover-glow animate-pulse-3d"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="book-container inline-block">
                <div className="book-cover px-8 py-4 animate-book-open">
                  <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">Featured Projects</h2>
                  <div className="w-20 h-1 bg-white/80 mx-auto animate-gradient-shift"></div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ScrollReveal key={project.title} delay={index * 100}>
                  <div className="book-container">
                    <div className="book-page overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-110 group hover-lift transform-3d hover:rotate-y-3 animate-book-shadow">
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <MagneticButton variant="secondary" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Project
                          </MagneticButton>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <Badge key={tech} variant="secondary" className="bg-accent/10 text-accent hover-glow">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* 3D Background Elements for Resume Section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-14 left-1/4 w-18 h-18 bg-accent/8 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div className="absolute top-52 right-1/4 w-12 h-12 bg-accent/6 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"></div>
            <div className="absolute bottom-16 left-1/3 w-14 h-14 bg-accent/10 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"></div>
            <div className="absolute top-1/2 right-1/5 w-10 h-10 bg-accent/12 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="book-container inline-block">
                <div className="book-cover px-8 py-4 animate-book-open">
                  <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">Resume</h2>
                  <div className="w-20 h-1 bg-white/80 mx-auto animate-gradient-shift"></div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-semibold text-xl mb-6">Professional Summary</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  A passionate Data Enthusiast with a strong foundation in programming, data analysis, and
                  problem-solving. Proven experience in data manipulation, automation, and AI with hands-on projects and
                  practical applications.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-6">Download Resume</h3>
                <MagneticButton
                  variant="outline"
                  size="lg"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent hover:shadow-lg hover:shadow-accent/25"
                  onClick={() => window.open("https://drive.google.com/file/d/1_CjuJfAa_RULMZTQuCgGSufeB7NDe2dj/view?usp=sharing", "_blank")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* 3D Background Elements for Achievements Section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-18 left-1/5 w-16 h-16 bg-accent/9 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div className="absolute top-56 right-1/6 w-14 h-14 bg-accent/7 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"></div>
            <div className="absolute bottom-20 left-2/3 w-12 h-12 bg-accent/11 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"></div>
            <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-accent/15 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
            <div className="absolute bottom-8 right-1/4 w-18 h-18 bg-accent/6 rounded-full animate-float-delayed transform-3d hover-glow animate-pulse-3d"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="book-container inline-block">
                <div className="book-cover px-8 py-4 animate-book-open">
                  <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">Achievements</h2>
                  <div className="w-20 h-1 bg-white/80 mx-auto animate-gradient-shift"></div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              {certifications.map((cert, index) => (
                <ScrollReveal key={cert.name} delay={index * 200}>
                  <div className="book-container">
                    <div className="book-page p-6 hover:shadow-lg transition-all duration-300 hover:scale-110 hover-lift transform-3d hover:rotate-y-3 animate-book-shadow group">
                      <div className="flex items-center mb-4">
                        <cert.icon className="w-8 h-8 text-accent mr-3 animate-scale-pulse" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{cert.name}</h3>
                          <p className="text-base text-muted-foreground mb-2">
                            Awarded by <span className="font-semibold">{cert.issuer}</span> in {cert.year}
                          </p>
                        </div>
                      </div>
                      {cert.link && (
                        <MagneticButton
                          variant="outline"
                          size="sm"
                          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                          onClick={() => window.open(cert.link, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Certificate
                        </MagneticButton>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="activities" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
          {/* 3D Background Elements for Activities Section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-22 left-1/6 w-18 h-18 bg-accent/7 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div className="absolute top-60 right-1/5 w-12 h-12 bg-accent/9 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"></div>
            <div className="absolute bottom-24 left-1/2 w-16 h-16 bg-accent/8 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"></div>
            <div className="absolute top-2/3 right-1/6 w-10 h-10 bg-accent/12 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
            <div className="absolute bottom-10 right-1/3 w-14 h-14 bg-accent/6 rounded-full animate-float-delayed transform-3d hover-glow animate-pulse-3d"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="book-container inline-block">
                <div className="book-cover px-8 py-4 animate-book-open">
                  <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">
                    Co-Curricular Activities
                  </h2>
                  <div className="w-20 h-1 bg-white/80 mx-auto animate-gradient-shift"></div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              {activities.map((activity, index) => (
                <ScrollReveal key={activity.title} delay={index * 100}>
                  <div className="book-container">
                    <div className="book-page p-6 hover:shadow-lg transition-all duration-300 hover:scale-110 hover-lift transform-3d hover:rotate-y-3 animate-book-shadow group">
                      <CardHeader>
                        <CardTitle className="text-xl">{activity.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          <span className="font-semibold">{activity.organization}</span> - {activity.period}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg text-muted-foreground">{activity.description}</p>
                      </CardContent>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
          <Suspense fallback={null}>
            <Contact3DScene />
          </Suspense>
          {/* 3D Background Elements for Contact Section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-24 left-1/4 w-16 h-16 bg-accent/8 rounded-full animate-float transform-3d rotate-y-12 hover-glow animate-pulse-3d"></div>
            <div className="absolute top-64 right-1/4 w-12 h-12 bg-accent/6 rounded-full animate-float-delayed transform-3d rotate-x-12 hover-glow animate-bounce-soft"></div>
            <div className="absolute bottom-28 left-1/3 w-14 h-14 bg-accent/10 rounded-full animate-float-slow transform-3d hover-glow animate-rotate-3d"></div>
            <div className="absolute top-1/2 right-1/5 w-10 h-10 bg-accent/12 rounded-full animate-float transform-3d hover-glow animate-shimmer"></div>
            <div className="absolute bottom-12 right-1/3 w-18 h-18 bg-accent/7 rounded-full animate-float-delayed transform-3d hover-glow animate-pulse-3d"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="book-container inline-block">
                <div className="book-cover px-8 py-4 animate-book-open">
                  <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">Get In Touch</h2>
                  <div className="w-20 h-1 bg-white/80 mx-auto animate-gradient-shift"></div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-semibold text-xl mb-6">Let's Connect</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I'm always interested in discussing new opportunities, collaborations, or just chatting about data
                  science and analytics. Feel free to reach out!
                </p>
                <div className="space-y-4">
                  <div className="flex items-center hover-glow p-2 rounded transition-all duration-300 transform-3d hover:rotate-y-1 hover:scale-105">
                    <Mail className="w-5 h-5 text-accent mr-3 animate-scale-pulse" />
                    <span>saurabhks102@gmail.com</span>
                  </div>
                  <div className="flex items-center hover-glow p-2 rounded transition-all duration-300 transform-3d hover:rotate-y-1 hover:scale-105">
                    <Phone className="w-5 h-5 text-accent mr-3 animate-scale-pulse" />
                    <span>9380328640 / 9973705441</span>
                  </div>
                  <div className="flex items-center hover-glow p-2 rounded transition-all duration-300 transform-3d hover:rotate-y-1 hover:scale-105">
                    <MapPin className="w-5 h-5 text-accent mr-3 animate-scale-pulse" />
                    <span>Bengaluru, India</span>
                  </div>
                </div>
                <div className="flex space-x-4 mt-8">
                  <MagneticButton
                    variant="outline"
                    size="icon"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                    onClick={() => window.open("https://github.com/saurabh16-24", "_blank")}
                  >
                    <Github className="w-5 h-5" />
                  </MagneticButton>
                  <MagneticButton
                    variant="outline"
                    size="icon"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                    onClick={() => window.open("https://linkedin.com/in/saurabh-singh", "_blank")}
                  >
                    <Linkedin className="w-5 h-5" />
                  </MagneticButton>
                  <MagneticButton
                    variant="outline"
                    size="icon"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                    onClick={() => window.open("mailto:saurabhks102@gmail.com", "_blank")}
                  >
                    <Mail className="w-5 h-5" />
                  </MagneticButton>
                </div>
              </div>
              <div className="book-container">
                <div className="book-page p-6 glass hover-glow transform-3d hover:rotate-y-2 transition-all duration-300 animate-book-shadow">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name" 
                        className="border-accent/20 focus:border-accent hover-glow" 
                        required
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                        className="border-accent/20 focus:border-accent hover-glow"
                        required
                      />
                    </div>
                    <div>
                      <Input 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Subject" 
                        className="border-accent/20 focus:border-accent hover-glow" 
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your Message"
                        rows={5}
                        className="border-accent/20 focus:border-accent resize-none hover-glow"
                        required
                      />
                    </div>
                    <MagneticButton 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </MagneticButton>
                    
                    {submitStatus === 'success' && (
                      <div className="text-green-600 text-sm text-center animate-fade-in-up">
                        Message sent successfully! I'll get back to you soon.
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="text-red-600 text-sm text-center animate-fade-in-up">
                        Failed to send message. Please try again or contact me directly.
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border glass">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">© 2024 Saurabh Kumar Singh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
