import React, { useState, useEffect, createContext, useContext } from 'react';
import { ArrowRight, ArrowLeft, Menu, X, CheckCircle, Star, Users, Clock, DollarSign, Music, Video, Code, Globe, Zap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Calendar, ChevronDown } from 'lucide-react';

// Translation System
const translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      portfolio: 'Portfolio',
      contact: 'Contact',
      getProposal: 'Get Custom Proposal'
    },
    hero: {
      title1: 'Transform Your Business',
      title2: 'with AI Innovation',
      subtitle: 'From AI music production to intelligent automation, we create cutting-edge solutions that drive real results for forward-thinking businesses.',
      cta1: 'Get Your Custom AI Proposal',
      cta2: 'View Our Work',
      trusted: 'Trusted by innovative companies worldwide'
    },
    services: {
      title: 'Our AI Services',
      subtitle: 'Comprehensive AI solutions designed to transform your business operations.',
      getStarted: 'Get Started'
    },
    stats: {
      projects: 'Projects Completed',
      satisfaction: 'Client Satisfaction',
      support: 'Support Available',
      models: 'AI Models Deployed'
    }
  },
  nl: {
    nav: {
      home: 'Home',
      services: 'Diensten',
      about: 'Over Ons',
      portfolio: 'Portfolio',
      contact: 'Contact',
      getProposal: 'Krijg Offerte Op Maat'
    },
    hero: {
      title1: 'Transformeer Uw Bedrijf',
      title2: 'met AI Innovatie',
      subtitle: 'Van AI muziekproductie tot intelligente automatisering, wij creëren geavanceerde oplossingen die echte resultaten opleveren voor vooruitstrevende bedrijven.',
      cta1: 'Krijg Uw AI Offerte Op Maat',
      cta2: 'Bekijk Ons Werk',
      trusted: 'Vertrouwd door innovatieve bedrijven wereldwijd'
    },
    services: {
      title: 'Onze AI Diensten',
      subtitle: 'Uitgebreide AI-oplossingen ontworpen om uw bedrijfsactiviteiten te transformeren.',
      getStarted: 'Start Nu'
    },
    stats: {
      projects: 'Projecten Voltooid',
      satisfaction: 'Klanttevredenheid',
      support: 'Ondersteuning Beschikbaar',
      models: 'AI Modellen Ingezet'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      about: 'À Propos',
      portfolio: 'Portfolio',
      contact: 'Contact',
      getProposal: 'Obtenir un Devis'
    },
    hero: {
      title1: 'Transformez Votre Entreprise',
      title2: "avec l'Innovation IA",
      subtitle: "De la production musicale IA à l'automatisation intelligente, nous créons des solutions de pointe qui génèrent de vrais résultats.",
      cta1: 'Obtenez Votre Proposition IA',
      cta2: 'Voir Notre Travail',
      trusted: 'Fait confiance par des entreprises innovantes'
    },
    services: {
      title: 'Nos Services IA',
      subtitle: 'Solutions IA complètes conçues pour transformer vos opérations commerciales.',
      getStarted: 'Commencer'
    },
    stats: {
      projects: 'Projets Complétés',
      satisfaction: 'Satisfaction Client',
      support: 'Support Disponible',
      models: 'Modèles IA Déployés'
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      services: 'Dienstleistungen',
      about: 'Über Uns',
      portfolio: 'Portfolio',
      contact: 'Kontakt',
      getProposal: 'Angebot Erhalten'
    },
    hero: {
      title1: 'Transformieren Sie Ihr Unternehmen',
      title2: 'mit KI-Innovation',
      subtitle: 'Von KI-Musikproduktion bis hin zu intelligenter Automatisierung erstellen wir hochmoderne Lösungen.',
      cta1: 'Erhalten Sie Ihr KI-Angebot',
      cta2: 'Unsere Arbeit Ansehen',
      trusted: 'Vertraut von innovativen Unternehmen weltweit'
    },
    services: {
      title: 'Unsere KI-Dienstleistungen',
      subtitle: 'Umfassende KI-Lösungen zur Transformation Ihrer Geschäftsabläufe.',
      getStarted: 'Jetzt Starten'
    },
    stats: {
      projects: 'Projekte Abgeschlossen',
      satisfaction: 'Kundenzufriedenheit',
      support: 'Support Verfügbar',
      models: 'KI-Modelle Eingesetzt'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      about: 'Acerca de',
      portfolio: 'Portafolio',
      contact: 'Contacto',
      getProposal: 'Obtener Propuesta'
    },
    hero: {
      title1: 'Transforma Tu Negocio',
      title2: 'con Innovación IA',
      subtitle: 'Desde producción musical con IA hasta automatización inteligente, creamos soluciones de vanguardia.',
      cta1: 'Obtén Tu Propuesta IA',
      cta2: 'Ver Nuestro Trabajo',
      trusted: 'Confiado por empresas innovadoras en todo el mundo'
    },
    services: {
      title: 'Nuestros Servicios IA',
      subtitle: 'Soluciones integrales de IA diseñadas para transformar sus operaciones comerciales.',
      getStarted: 'Comenzar'
    },
    stats: {
      projects: 'Proyectos Completados',
      satisfaction: 'Satisfacción del Cliente',
      support: 'Soporte Disponible',
      models: 'Modelos IA Desplegados'
    }
  }
};

// Language Context
const LanguageContext = createContext();

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

// Language Provider Component
function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferredLanguage');
      return saved || 'en';
    }
    return 'en';
  });

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', newLang);
    }
  };

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Language Selector Component
function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-white border border-white/20 min-w-[100px]"
        aria-label="Select language"
      >
        <span className="text-lg flex-shrink-0">{currentLang.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">{currentLang.name}</span>
        {/* Chevron icon that's always visible */}
        <span className={`inline-block transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path 
              d="M6 9L12 15L18 9" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50 min-w-[180px]">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors ${
                language === lang.code ? 'bg-gray-700/50' : ''
              }`}
            >
              <span className="text-lg flex-shrink-0">{lang.flag}</span>
              <span className="text-white text-sm whitespace-nowrap font-medium">{lang.name}</span>
              {language === lang.code && (
                <span className="ml-auto flex-shrink-0">
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-green-400"
                  >
                    <path 
                      d="M20 6L9 17L5 13" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Main Component
function NexAIWebsite() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '500+', label: t.stats.projects },
    { number: '98%', label: t.stats.satisfaction },
    { number: '24/7', label: t.stats.support },
    { number: '50+', label: t.stats.models }
  ];

  function getIcon(iconName, className) {
    switch(iconName) {
      case 'music':
        return <Music className={className} />;
      case 'video':
        return <Video className={className} />;
      case 'code':
        return <Code className={className} />;
      case 'globe':
        return <Globe className={className} />;
      case 'zap':
        return <Zap className={className} />;
      default:
        return null;
    }
  }

  const services = [
    {
      id: 'music',
      title: 'AI Music Production',
      icon: 'music',
      description: 'Professional AI-generated music tailored to your brand.',
      price: 'Starting at $500',
      timeline: '2-5 days'
    },
    {
      id: 'video',
      title: 'AI Video Creation',
      icon: 'video',
      description: 'Intelligent video editing and content generation.',
      price: 'Starting at $1,000',
      timeline: '3-7 days'
    },
    {
      id: 'development',
      title: 'AI Application Development',
      icon: 'code',
      description: 'Custom AI-powered software solutions.',
      price: 'Starting at $5,000',
      timeline: '2-8 weeks'
    },
    {
      id: 'website',
      title: 'AI Website Development',
      icon: 'globe',
      description: 'Smart websites with AI-powered features.',
      price: 'Starting at $3,000',
      timeline: '1-4 weeks'
    },
    {
      id: 'automation',
      title: 'AI Process Automation',
      icon: 'zap',
      description: 'Streamline workflows with intelligent automation.',
      price: 'Starting at $2,000',
      timeline: '1-3 weeks'
    }
  ];

  // Simple form view
  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full border border-white/20 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Contact Form</h2>
          <p className="text-gray-300 mb-6">This is where the form would be displayed.</p>
          <button 
            onClick={() => setShowForm(false)}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Back to Website
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Nex AI
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-baseline space-x-4">
                <a href="#home" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.nav.home}</a>
                <a href="#services" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.nav.services}</a>
                <a href="#about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.nav.about}</a>
                <a href="#portfolio" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.nav.portfolio}</a>
                <a href="#contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.nav.contact}</a>
              </div>
              
              <LanguageSelector />
              
              <button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-2"
              >
                {t.nav.getProposal}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="md:hidden flex items-center gap-3">
              <LanguageSelector />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
              <a href="#home" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t.nav.home}</a>
              <a href="#services" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t.nav.services}</a>
              <a href="#about" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t.nav.about}</a>
              <a href="#portfolio" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t.nav.portfolio}</a>
              <a href="#contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t.nav.contact}</a>
              <button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white block px-3 py-2 rounded-md text-base font-medium text-center w-full"
              >
                {t.nav.getProposal}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>
        
        <div className={`relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {t.hero.title1}
            </span>
            <br />
            <span className="text-white">{t.hero.title2}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {t.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all text-lg flex items-center justify-center gap-2"
            >
              {t.hero.cta1}
              <ArrowRight className="w-5 h-5" />
            </button>
            <a 
              href="#services" 
              className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all text-lg"
            >
              {t.hero.cta2}
            </a>
          </div>

          <div className="mt-16">
            <p className="text-gray-400 text-sm mb-6">{t.hero.trusted}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {t.services.title}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.services.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group hover:transform hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white group-hover:scale-110 transition-transform">
                    {getIcon(service.icon, "w-8 h-8")}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {service.price}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {service.timeline}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6">{service.description}</p>
                
                <button 
                  onClick={() => setShowForm(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                >
                  {t.services.getStarted}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>© 2025 Nex AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Main App Component with Language Provider
export default function App() {
  return (
    <LanguageProvider>
      <NexAIWebsite />
    </LanguageProvider>
  );
}