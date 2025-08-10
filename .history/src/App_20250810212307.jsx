import React, { useState, useEffect, createContext, useContext } from 'react';
import { ArrowRight, Menu, X, Clock, DollarSign, Music, Video, Code, Globe, Zap } from 'lucide-react';

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
  const [language, setLanguage] = useState('en'); // Default to 'en' on first render

  // Safely read localStorage only on client
  useEffect(() => {
    try {
      const saved = localStorage.getItem('preferredLanguage');
      if (saved) setLanguage(saved);
    } catch {}
  }, []);

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    try {
      localStorage.setItem('preferredLanguage', newLang);
    } catch {}
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
        <span className={`inline-block transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors ${language === lang.code ? 'bg-gray-700/50' : ''}`}
            >
              <span className="text-lg flex-shrink-0">{lang.flag}</span>
              <span className="text-white text-sm whitespace-nowrap font-medium">{lang.name}</span>
              {language === lang.code && (
                <span className="ml-auto flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-400">
                    <path d="M20 6L9 17L5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
