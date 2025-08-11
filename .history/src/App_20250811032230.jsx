import React, { useState, useEffect, createContext, useContext } from 'react';
import { ArrowRight, ArrowLeft, Menu, X, CheckCircle, Star, Users, Clock, DollarSign, Music, Video, Code, Globe, Zap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Calendar, ChevronDown } from 'lucide-react';

/*
 * EMAIL BACKEND IMPLEMENTATION GUIDE
 * ===================================
 * 
 * To implement actual email sending, create a backend endpoint that handles the email data.
 * 
 * Example using Node.js/Express with Nodemailer:
 * 
 * ```javascript
 * // backend/routes/api.js
 * const nodemailer = require('nodemailer');
 * 
 * // Configure email transporter (example with Gmail)
 * const transporter = nodemailer.createTransporter({
 *   service: 'gmail',
 *   auth: {
 *     user: process.env.EMAIL_USER,
 *     pass: process.env.EMAIL_PASS
 *   }
 * });
 * 
 * app.post('/api/send-consultation-emails', async (req, res) => {
 *   const { formData, timeSlot, emails } = req.body;
 *   
 *   try {
 *     // Send company notification email
 *     await transporter.sendMail({
 *       from: '"Nex AI System" <noreply@nexai.com>',
 *       to: emails.companyEmail.to,
 *       subject: emails.companyEmail.subject,
 *       text: emails.companyEmail.body,
 *       html: `<pre>${emails.companyEmail.body}</pre>`
 *     });
 *     
 *     // Send client confirmation email
 *     await transporter.sendMail({
 *       from: '"Nex AI Team" <hello@nexai.com>',
 *       to: emails.clientEmail.to,
 *       subject: emails.clientEmail.subject,
 *       text: emails.clientEmail.body,
 *       html: `<div style="font-family: Arial, sans-serif;">${emails.clientEmail.body.replace(/\n/g, '<br>')}</div>`
 *     });
 *     
 *     res.json({ success: true, message: 'Emails sent successfully' });
 *   } catch (error) {
 *     console.error('Email sending failed:', error);
 *     res.status(500).json({ success: false, error: error.message });
 *   }
 * });
 * ```
 */

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
      subtitle: 'Comprehensive AI solutions designed to transform your business operations and drive unprecedented growth.',
      getStarted: 'Get Started'
    },
    stats: {
      projects: 'Projects Completed',
      satisfaction: 'Client Satisfaction',
      support: 'Support Available',
      models: 'AI Models Deployed'
    },
    about: {
      title: 'Leading the AI Revolution',
      subtitle: 'At Nex AI, we\'re not just building AI solutions – we\'re crafting the future of business intelligence and automation.',
      mission: 'Our Mission',
      missionText: 'To democratize AI technology and make it accessible to businesses of all sizes, enabling them to compete in the digital age.',
      values: 'Our Values',
      consultation: 'Schedule a Consultation'
    },
    portfolio: {
      title: 'Our Portfolio',
      subtitle: 'Explore our latest AI projects and see how we\'ve helped businesses transform their operations.',
      startProject: 'Start Your Project'
    },
    contact: {
      title: 'Ready to Get Started?',
      subtitle: 'Let\'s discuss how AI can transform your business. Schedule a free consultation with our experts.',
      getInTouch: 'Get in Touch',
      followUs: 'Follow Us',
      schedule: 'Schedule Your Consultation',
      scheduleDesc: 'Book a free 30-minute consultation to discuss your AI project needs and get a custom proposal.',
      whatYouGet: 'What you\'ll get:',
      bookConsultation: 'Book Free Consultation',
      responds: 'Usually responds within 1 hour'
    },
    form: {
      step: 'Step',
      complete: 'Complete',
      projectType: 'What type of AI project do you need?',
      selectService: 'Select the service that best matches your needs',
      budgetTimeline: 'Budget & Timeline',
      budgetQuestion: 'What\'s your budget range?',
      timelineQuestion: 'When do you need this completed?',
      tellUs: 'Tell us about your project',
      description: 'The more details you provide, the better we can help you',
      examples: 'Examples for',
      almostDone: 'Almost done! Let\'s connect',
      reachOut: 'We\'ll reach out within 24 hours with a custom proposal',
      projectSummary: 'Your Project Summary:',
      getProposal: 'Get My Custom Proposal',
      continue: 'Continue',
      back: 'Back'
    },
    calendar: {
      perfect: 'Perfect! Let\'s Schedule Your Call',
      basedOn: 'Based on your',
      prepare: 'we\'ll prepare a custom proposal for your',
      whatHappens: 'What happens next:',
      discovery: 'Discovery Call',
      discoveryDesc: '15-min call to understand your needs',
      proposal: 'Custom Proposal',
      proposalDesc: 'Detailed solution within 24 hours',
      kickoff: 'Project Kickoff',
      kickoffDesc: 'Start building your AI solution',
      selectTime: 'Select a time that works for you:',
      selected: 'Selected:',
      emailNotifications: 'Email Notifications',
      youWillReceive: 'You will receive:',
      weWillReceive: 'We will receive:',
      readyToSend: 'Ready to send emails to:',
      confirmMeeting: 'Confirm Meeting & Send Emails',
      selectTimeSlot: 'Select a Time Slot',
      sendingEmails: 'Sending Emails...'
    },
    confirmation: {
      confirmed: 'Meeting Confirmed! 🎉',
      scheduled: 'Your consultation is scheduled for',
      whatToExpect: 'What to expect:',
      projectReview: 'Project Review',
      reviewDesc: 'We\'ll discuss your requirements in detail',
      aiStrategy: 'AI Strategy',
      strategyDesc: 'Custom recommendations for your budget',
      customProposal: 'Custom Proposal',
      proposalDesc: 'Detailed project timeline and pricing',
      nextSteps: 'Next Steps',
      stepsDesc: 'Clear roadmap to get started',
      confirmationSent: 'Confirmation Details Sent To:',
      calendarInvite: 'You\'ll receive a calendar invite and meeting prep materials within 5 minutes.',
      emailSummary: 'Email Summary:',
      companyNotified: 'Company notified:',
      clientConfirmation: 'Client confirmation:',
      backToWebsite: 'Back to Website',
      addToCalendar: 'Add to Calendar'
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
      subtitle: 'Uitgebreide AI-oplossingen ontworpen om uw bedrijfsactiviteiten te transformeren en ongekende groei te stimuleren.',
      getStarted: 'Start Nu'
    },
    stats: {
      projects: 'Projecten Voltooid',
      satisfaction: 'Klanttevredenheid',
      support: 'Ondersteuning Beschikbaar',
      models: 'AI Modellen Ingezet'
    },
    about: {
      title: 'Leidend in de AI Revolutie',
      subtitle: 'Bij Nex AI bouwen we niet alleen AI-oplossingen – we creëren de toekomst van bedrijfsintelligentie en automatisering.',
      mission: 'Onze Missie',
      missionText: 'AI-technologie democratiseren en toegankelijk maken voor bedrijven van alle groottes.',
      values: 'Onze Waarden',
      consultation: 'Plan een Consultatie'
    },
    portfolio: {
      title: 'Ons Portfolio',
      subtitle: 'Ontdek onze nieuwste AI-projecten en zie hoe we bedrijven hebben geholpen hun activiteiten te transformeren.',
      startProject: 'Start Uw Project'
    },
    contact: {
      title: 'Klaar om te Beginnen?',
      subtitle: 'Laten we bespreken hoe AI uw bedrijf kan transformeren. Plan een gratis consultatie met onze experts.',
      getInTouch: 'Neem Contact Op',
      followUs: 'Volg Ons',
      schedule: 'Plan Uw Consultatie',
      scheduleDesc: 'Boek een gratis 30-minuten consultatie om uw AI-projectbehoeften te bespreken.',
      whatYouGet: 'Wat u krijgt:',
      bookConsultation: 'Boek Gratis Consultatie',
      responds: 'Reageert meestal binnen 1 uur'
    },
    form: {
      step: 'Stap',
      complete: 'Compleet',
      projectType: 'Welk type AI-project heeft u nodig?',
      selectService: 'Selecteer de dienst die het beste bij uw behoeften past',
      budgetTimeline: 'Budget & Planning',
      budgetQuestion: 'Wat is uw budgetbereik?',
      timelineQuestion: 'Wanneer moet dit klaar zijn?',
      tellUs: 'Vertel ons over uw project',
      description: 'Hoe meer details u verstrekt, hoe beter we u kunnen helpen',
      examples: 'Voorbeelden voor',
      almostDone: 'Bijna klaar! Laten we contact maken',
      reachOut: 'We nemen binnen 24 uur contact op met een aangepaste offerte',
      projectSummary: 'Uw Project Samenvatting:',
      getProposal: 'Krijg Mijn Aangepaste Offerte',
      continue: 'Verder',
      back: 'Terug'
    },
    calendar: {
      perfect: 'Perfect! Laten We Uw Gesprek Plannen',
      basedOn: 'Gebaseerd op uw',
      prepare: 'bereiden we een aangepaste offerte voor uw',
      whatHappens: 'Wat gebeurt er hierna:',
      discovery: 'Ontdekkingsgesprek',
      discoveryDesc: '15-min gesprek om uw behoeften te begrijpen',
      proposal: 'Aangepaste Offerte',
      proposalDesc: 'Gedetailleerde oplossing binnen 24 uur',
      kickoff: 'Project Start',
      kickoffDesc: 'Begin met het bouwen van uw AI-oplossing',
      selectTime: 'Selecteer een tijd die voor u uitkomt:',
      selected: 'Geselecteerd:',
      emailNotifications: 'E-mail Notificaties',
      youWillReceive: 'U ontvangt:',
      weWillReceive: 'Wij ontvangen:',
      readyToSend: 'Klaar om e-mails te sturen naar:',
      confirmMeeting: 'Bevestig Afspraak & Verstuur E-mails',
      selectTimeSlot: 'Selecteer een Tijdslot',
      sendingEmails: 'E-mails Versturen...'
    },
    confirmation: {
      confirmed: 'Afspraak Bevestigd! 🎉',
      scheduled: 'Uw consultatie is gepland voor',
      whatToExpected: 'Wat te verwachten:',
      projectReview: 'Project Beoordeling',
      reviewDesc: 'We bespreken uw vereisten in detail',
      aiStrategy: 'AI Strategie',
      strategyDesc: 'Aangepaste aanbevelingen voor uw budget',
      customProposal: 'Aangepaste Offerte',
      proposalDesc: 'Gedetailleerde projecttijdlijn en prijzen',
      nextSteps: 'Volgende Stappen',
      stepsDesc: 'Duidelijk stappenplan om te beginnen',
      confirmationSent: 'Bevestigingsdetails Verzonden Naar:',
      calendarInvite: 'U ontvangt binnen 5 minuten een agenda-uitnodiging en voorbereidingsmateriaal.',
      emailSummary: 'E-mail Samenvatting:',
      companyNotified: 'Bedrijf geïnformeerd:',
      clientConfirmation: 'Klantbevestiging:',
      backToWebsite: 'Terug naar Website',
      addToCalendar: 'Toevoegen aan Agenda'
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
      subtitle: "De la production musicale IA à l'automatisation intelligente, nous créons des solutions de pointe qui génèrent de vrais résultats pour les entreprises avant-gardistes.",
      cta1: 'Obtenez Votre Proposition IA',
      cta2: 'Voir Notre Travail',
      trusted: 'Fait confiance par des entreprises innovantes dans le monde entier'
    },
    services: {
      title: 'Nos Services IA',
      subtitle: 'Solutions IA complètes conçues pour transformer vos opérations commerciales et stimuler une croissance sans précédent.',
      getStarted: 'Commencer'
    },
    stats: {
      projects: 'Projets Complétés',
      satisfaction: 'Satisfaction Client',
      support: 'Support Disponible',
      models: 'Modèles IA Déployés'
    },
    about: {
      title: 'Leader de la Révolution IA',
      subtitle: 'Chez Nex AI, nous ne construisons pas seulement des solutions IA – nous façonnons l\'avenir de l\'intelligence d\'affaires.',
      mission: 'Notre Mission',
      missionText: 'Démocratiser la technologie IA et la rendre accessible aux entreprises de toutes tailles.',
      values: 'Nos Valeurs',
      consultation: 'Planifier une Consultation'
    },
    portfolio: {
      title: 'Notre Portfolio',
      subtitle: 'Explorez nos derniers projets IA et voyez comment nous avons aidé les entreprises à transformer leurs opérations.',
      startProject: 'Démarrer Votre Projet'
    },
    contact: {
      title: 'Prêt à Commencer?',
      subtitle: 'Discutons de la façon dont l\'IA peut transformer votre entreprise. Planifiez une consultation gratuite.',
      getInTouch: 'Contactez-nous',
      followUs: 'Suivez-nous',
      schedule: 'Planifiez Votre Consultation',
      scheduleDesc: 'Réservez une consultation gratuite de 30 minutes pour discuter de vos besoins.',
      whatYouGet: 'Ce que vous obtiendrez:',
      bookConsultation: 'Réserver une Consultation Gratuite',
      responds: 'Répond généralement dans l\'heure'
    },
    form: {
      step: 'Étape',
      complete: 'Terminé',
      projectType: 'Quel type de projet IA avez-vous besoin?',
      selectService: 'Sélectionnez le service qui correspond le mieux à vos besoins',
      budgetTimeline: 'Budget et Calendrier',
      budgetQuestion: 'Quelle est votre fourchette budgétaire?',
      timelineQuestion: 'Quand avez-vous besoin que ce soit terminé?',
      tellUs: 'Parlez-nous de votre projet',
      description: 'Plus vous fournissez de détails, mieux nous pouvons vous aider',
      examples: 'Exemples pour',
      almostDone: 'Presque fini! Connectons-nous',
      reachOut: 'Nous vous contacterons dans les 24 heures avec une proposition personnalisée',
      projectSummary: 'Résumé de Votre Projet:',
      getProposal: 'Obtenir Ma Proposition Personnalisée',
      continue: 'Continuer',
      back: 'Retour'
    },
    calendar: {
      perfect: 'Parfait! Planifions Votre Appel',
      basedOn: 'Basé sur votre',
      prepare: 'nous préparerons une proposition personnalisée pour votre',
      whatHappens: 'Que se passe-t-il ensuite:',
      discovery: 'Appel de Découverte',
      discoveryDesc: 'Appel de 15 min pour comprendre vos besoins',
      proposal: 'Proposition Personnalisée',
      proposalDesc: 'Solution détaillée sous 24 heures',
      kickoff: 'Lancement du Projet',
      kickoffDesc: 'Commencer à construire votre solution IA',
      selectTime: 'Sélectionnez une heure qui vous convient:',
      selected: 'Sélectionné:',
      emailNotifications: 'Notifications Email',
      youWillReceive: 'Vous recevrez:',
      weWillReceive: 'Nous recevrons:',
      readyToSend: 'Prêt à envoyer des emails à:',
      confirmMeeting: 'Confirmer le Rendez-vous & Envoyer les Emails',
      selectTimeSlot: 'Sélectionner un Créneau',
      sendingEmails: 'Envoi des Emails...'
    },
    confirmation: {
      confirmed: 'Rendez-vous Confirmé! 🎉',
      scheduled: 'Votre consultation est programmée pour',
      whatToExpect: 'À quoi s\'attendre:',
      projectReview: 'Révision du Projet',
      reviewDesc: 'Nous discuterons de vos exigences en détail',
      aiStrategy: 'Stratégie IA',
      strategyDesc: 'Recommandations personnalisées pour votre budget',
      customProposal: 'Proposition Personnalisée',
      proposalDesc: 'Calendrier détaillé du projet et tarification',
      nextSteps: 'Prochaines Étapes',
      stepsDesc: 'Feuille de route claire pour commencer',
      confirmationSent: 'Détails de Confirmation Envoyés À:',
      calendarInvite: 'Vous recevrez une invitation de calendrier et du matériel de préparation dans 5 minutes.',
      emailSummary: 'Résumé Email:',
      companyNotified: 'Entreprise notifiée:',
      clientConfirmation: 'Confirmation client:',
      backToWebsite: 'Retour au Site Web',
      addToCalendar: 'Ajouter au Calendrier'
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
      subtitle: 'Von KI-Musikproduktion bis hin zu intelligenter Automatisierung erstellen wir hochmoderne Lösungen, die echte Ergebnisse für zukunftsorientierte Unternehmen liefern.',
      cta1: 'Erhalten Sie Ihr KI-Angebot',
      cta2: 'Unsere Arbeit Ansehen',
      trusted: 'Vertraut von innovativen Unternehmen weltweit'
    },
    services: {
      title: 'Unsere KI-Dienstleistungen',
      subtitle: 'Umfassende KI-Lösungen zur Transformation Ihrer Geschäftsabläufe und zur Förderung beispiellosen Wachstums.',
      getStarted: 'Jetzt Starten'
    },
    stats: {
      projects: 'Projekte Abgeschlossen',
      satisfaction: 'Kundenzufriedenheit',
      support: 'Support Verfügbar',
      models: 'KI-Modelle Eingesetzt'
    },
    about: {
      title: 'Führend in der KI-Revolution',
      subtitle: 'Bei Nex AI bauen wir nicht nur KI-Lösungen – wir gestalten die Zukunft der Geschäftsintelligenz und Automatisierung.',
      mission: 'Unsere Mission',
      missionText: 'KI-Technologie demokratisieren und für Unternehmen jeder Größe zugänglich machen.',
      values: 'Unsere Werte',
      consultation: 'Beratung Planen'
    },
    portfolio: {
      title: 'Unser Portfolio',
      subtitle: 'Entdecken Sie unsere neuesten KI-Projekte und sehen Sie, wie wir Unternehmen bei der Transformation geholfen haben.',
      startProject: 'Ihr Projekt Starten'
    },
    contact: {
      title: 'Bereit zu Beginnen?',
      subtitle: 'Lassen Sie uns besprechen, wie KI Ihr Unternehmen transformieren kann. Planen Sie eine kostenlose Beratung.',
      getInTouch: 'Kontakt Aufnehmen',
      followUs: 'Folgen Sie Uns',
      schedule: 'Ihre Beratung Planen',
      scheduleDesc: 'Buchen Sie eine kostenlose 30-minütige Beratung, um Ihre KI-Projektbedürfnisse zu besprechen.',
      whatYouGet: 'Was Sie erhalten:',
      bookConsultation: 'Kostenlose Beratung Buchen',
      responds: 'Antwortet normalerweise innerhalb 1 Stunde'
    },
    form: {
      step: 'Schritt',
      complete: 'Vollständig',
      projectType: 'Welche Art von KI-Projekt benötigen Sie?',
      selectService: 'Wählen Sie den Service, der am besten zu Ihren Bedürfnissen passt',
      budgetTimeline: 'Budget & Zeitplan',
      budgetQuestion: 'Was ist Ihr Budgetbereich?',
      timelineQuestion: 'Wann benötigen Sie die Fertigstellung?',
      tellUs: 'Erzählen Sie uns von Ihrem Projekt',
      description: 'Je mehr Details Sie angeben, desto besser können wir Ihnen helfen',
      examples: 'Beispiele für',
      almostDone: 'Fast fertig! Lassen Sie uns verbinden',
      reachOut: 'Wir melden uns innerhalb von 24 Stunden mit einem maßgeschneiderten Angebot',
      projectSummary: 'Ihre Projektzusammenfassung:',
      getProposal: 'Mein Maßgeschneidertes Angebot Erhalten',
      continue: 'Weiter',
      back: 'Zurück'
    },
    calendar: {
      perfect: 'Perfekt! Lassen Sie Uns Ihren Anruf Planen',
      basedOn: 'Basierend auf Ihrem',
      prepare: 'bereiten wir ein maßgeschneidertes Angebot für Ihren',
      whatHappens: 'Was passiert als nächstes:',
      discovery: 'Entdeckungsanruf',
      discoveryDesc: '15-min Anruf, um Ihre Bedürfnisse zu verstehen',
      proposal: 'Maßgeschneidertes Angebot',
      proposalDesc: 'Detaillierte Lösung innerhalb von 24 Stunden',
      kickoff: 'Projektstart',
      kickoffDesc: 'Beginnen Sie mit dem Aufbau Ihrer KI-Lösung',
      selectTime: 'Wählen Sie eine Zeit, die für Sie passt:',
      selected: 'Ausgewählt:',
      emailNotifications: 'E-Mail-Benachrichtigungen',
      youWillReceive: 'Sie erhalten:',
      weWillReceive: 'Wir erhalten:',
      readyToSend: 'Bereit, E-Mails zu senden an:',
      confirmMeeting: 'Termin Bestätigen & E-Mails Senden',
      selectTimeSlot: 'Zeitfenster Wählen',
      sendingEmails: 'E-Mails Senden...'
    },
    confirmation: {
      confirmed: 'Termin Bestätigt! 🎉',
      scheduled: 'Ihre Beratung ist geplant für',
      whatToExpect: 'Was zu erwarten ist:',
      projectReview: 'Projektüberprüfung',
      reviewDesc: 'Wir besprechen Ihre Anforderungen im Detail',
      aiStrategy: 'KI-Strategie',
      strategyDesc: 'Maßgeschneiderte Empfehlungen für Ihr Budget',
      customProposal: 'Maßgeschneidertes Angebot',
      proposalDesc: 'Detaillierter Projektzeitplan und Preisgestaltung',
      nextSteps: 'Nächste Schritte',
      stepsDesc: 'Klarer Fahrplan zum Einstieg',
      confirmationSent: 'Bestätigungsdetails Gesendet An:',
      calendarInvite: 'Sie erhalten innerhalb von 5 Minuten eine Kalendereinladung und Vorbereitungsmaterialien.',
      emailSummary: 'E-Mail-Zusammenfassung:',
      companyNotified: 'Unternehmen benachrichtigt:',
      clientConfirmation: 'Kundenbestätigung:',
      backToWebsite: 'Zurück zur Website',
      addToCalendar: 'Zum Kalender Hinzufügen'
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
      subtitle: 'Desde producción musical con IA hasta automatización inteligente, creamos soluciones de vanguardia que generan resultados reales para empresas con visión de futuro.',
      cta1: 'Obtén Tu Propuesta IA',
      cta2: 'Ver Nuestro Trabajo',
      trusted: 'Confiado por empresas innovadoras en todo el mundo'
    },
    services: {
      title: 'Nuestros Servicios IA',
      subtitle: 'Soluciones integrales de IA diseñadas para transformar sus operaciones comerciales e impulsar un crecimiento sin precedentes.',
      getStarted: 'Comenzar'
    },
    stats: {
      projects: 'Proyectos Completados',
      satisfaction: 'Satisfacción del Cliente',
      support: 'Soporte Disponible',
      models: 'Modelos IA Desplegados'
    },
    about: {
      title: 'Liderando la Revolución IA',
      subtitle: 'En Nex AI, no solo construimos soluciones IA – estamos creando el futuro de la inteligencia empresarial y la automatización.',
      mission: 'Nuestra Misión',
      missionText: 'Democratizar la tecnología IA y hacerla accesible para empresas de todos los tamaños.',
      values: 'Nuestros Valores',
      consultation: 'Programar una Consulta'
    },
    portfolio: {
      title: 'Nuestro Portafolio',
      subtitle: 'Explora nuestros últimos proyectos IA y ve cómo hemos ayudado a las empresas a transformar sus operaciones.',
      startProject: 'Iniciar Tu Proyecto'
    },
    contact: {
      title: '¿Listo para Comenzar?',
      subtitle: 'Hablemos sobre cómo la IA puede transformar tu negocio. Programa una consulta gratuita con nuestros expertos.',
      getInTouch: 'Ponerse en Contacto',
      followUs: 'Síguenos',
      schedule: 'Programa Tu Consulta',
      scheduleDesc: 'Reserva una consulta gratuita de 30 minutos para discutir las necesidades de tu proyecto IA.',
      whatYouGet: 'Lo que obtendrás:',
      bookConsultation: 'Reservar Consulta Gratuita',
      responds: 'Generalmente responde en 1 hora'
    },
    form: {
      step: 'Paso',
      complete: 'Completo',
      projectType: '¿Qué tipo de proyecto IA necesitas?',
      selectService: 'Selecciona el servicio que mejor se adapte a tus necesidades',
      budgetTimeline: 'Presupuesto y Cronograma',
      budgetQuestion: '¿Cuál es tu rango de presupuesto?',
      timelineQuestion: '¿Cuándo necesitas que esté terminado?',
      tellUs: 'Cuéntanos sobre tu proyecto',
      description: 'Cuanto más detalles proporciones, mejor podremos ayudarte',
      examples: 'Ejemplos para',
      almostDone: '¡Casi terminado! Conectémonos',
      reachOut: 'Nos pondremos en contacto dentro de 24 horas con una propuesta personalizada',
      projectSummary: 'Resumen de Tu Proyecto:',
      getProposal: 'Obtener Mi Propuesta Personalizada',
      continue: 'Continuar',
      back: 'Atrás'
    },
    calendar: {
      perfect: '¡Perfecto! Programemos Tu Llamada',
      basedOn: 'Basado en tu',
      prepare: 'prepararemos una propuesta personalizada para tu',
      whatHappens: 'Qué pasa a continuación:',
      discovery: 'Llamada de Descubrimiento',
      discoveryDesc: 'Llamada de 15 min para entender tus necesidades',
      proposal: 'Propuesta Personalizada',
      proposalDesc: 'Solución detallada en 24 horas',
      kickoff: 'Inicio del Proyecto',
      kickoffDesc: 'Comenzar a construir tu solución IA',
      selectTime: 'Selecciona una hora que te funcione:',
      selected: 'Seleccionado:',
      emailNotifications: 'Notificaciones por Email',
      youWillReceive: 'Recibirás:',
      weWillReceive: 'Recibiremos:',
      readyToSend: 'Listo para enviar emails a:',
      confirmMeeting: 'Confirmar Reunión y Enviar Emails',
      selectTimeSlot: 'Seleccionar Horario',
      sendingEmails: 'Enviando Emails...'
    },
    confirmation: {
      confirmed: '¡Reunión Confirmada! 🎉',
      scheduled: 'Tu consulta está programada para',
      whatToExpected: 'Qué esperar:',
      projectReview: 'Revisión del Proyecto',
      reviewDesc: 'Discutiremos tus requisitos en detalle',
      aiStrategy: 'Estrategia IA',
      strategyDesc: 'Recomendaciones personalizadas para tu presupuesto',
      customProposal: 'Propuesta Personalizada',
      proposalDesc: 'Cronograma detallado del proyecto y precios',
      nextSteps: 'Próximos Pasos',
      stepsDesc: 'Hoja de ruta clara para comenzar',
      confirmationSent: 'Detalles de Confirmación Enviados A:',
      calendarInvite: 'Recibirás una invitación de calendario y materiales de preparación en 5 minutos.',
      emailSummary: 'Resumen de Email:',
      companyNotified: 'Empresa notificada:',
      clientConfirmation: 'Confirmación del cliente:',
      backToWebsite: 'Volver al Sitio Web',
      addToCalendar: 'Agregar al Calendario'
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
    return 'en';
  });

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
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
          <ChevronDown className="w-4 h-4" />
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
                  <CheckCircle className="w-4 h-4 text-green-400" />
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
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [sendingEmails, setSendingEmails] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      id: 'music',
      title: 'AI Music Production',
      icon: 'music',
      description: 'Professional AI-generated music, compositions, and sound design tailored to your brand and vision.',
      features: ['Automated composition', 'Multi-genre expertise', 'Professional mastering', 'Custom soundtracks', 'Royalty-free licensing'],
      price: 'Starting at $500',
      timeline: '2-5 days'
    },
    {
      id: 'video',
      title: 'AI Video Creation',
      icon: 'video',
      description: 'Intelligent video editing, effects, and content generation that transforms your ideas into compelling visual stories.',
      features: ['Automated editing', 'Smart effects', 'Content generation', 'Multi-platform optimization', 'Brand consistency'],
      price: 'Starting at $1,000',
      timeline: '3-7 days'
    },
    {
      id: 'development',
      title: 'AI Application Development',
      icon: 'code',
      description: 'Custom AI-powered software solutions that solve complex business problems and automate processes.',
      features: ['Custom AI models', 'API integration', 'Scalable architecture', 'Cloud deployment', 'Ongoing support'],
      price: 'Starting at $5,000',
      timeline: '2-8 weeks'
    },
    {
      id: 'website',
      title: 'AI Website Development',
      icon: 'globe',
      description: 'Smart websites with AI-powered features that adapt to users and drive conversions.',
      features: ['AI chatbots', 'Personalization', 'Smart analytics', 'SEO optimization', 'Responsive design'],
      price: 'Starting at $3,000',
      timeline: '1-4 weeks'
    },
    {
      id: 'automation',
      title: 'AI Process Automation',
      icon: 'zap',
      description: 'Streamline your workflows with intelligent automation that learns and adapts to your business needs.',
      features: ['Workflow optimization', 'Document processing', 'Data automation', 'Integration setup', 'Performance monitoring'],
      price: 'Starting at $2,000',
      timeline: '1-3 weeks'
    }
  ];

  const projectTypes = [
    {
      id: 'music',
      title: 'AI Music Production',
      icon: 'music',
      description: 'Automated composition, arrangement, and mastering',
      startingPrice: 'Starting at $500',
      timeline: '2-5 days',
      examples: ['Background music', 'Jingles', 'Full compositions', 'Sound design']
    },
    {
      id: 'video',
      title: 'AI Video Creation',
      icon: 'video',
      description: 'Intelligent editing, effects, and content generation',
      startingPrice: 'Starting at $1,000',
      timeline: '3-7 days',
      examples: ['Marketing videos', 'Social content', 'Explainer videos', 'Video editing']
    },
    {
      id: 'development',
      title: 'AI Application Development',
      icon: 'code',
      description: 'Custom AI-powered software solutions',
      startingPrice: 'Starting at $5,000',
      timeline: '2-8 weeks',
      examples: ['Chatbots', 'Data analysis', 'Predictive models', 'Custom AI tools']
    },
    {
      id: 'website',
      title: 'AI Website Development',
      icon: 'globe',
      description: 'Smart websites with AI-powered features',
      startingPrice: 'Starting at $3,000',
      timeline: '1-4 weeks',
      examples: ['AI chatbots', 'Personalization', 'Content generation', 'Smart search']
    },
    {
      id: 'automation',
      title: 'AI Process Automation',
      icon: 'zap',
      description: 'Streamline workflows with intelligent automation',
      startingPrice: 'Starting at $2,000',
      timeline: '1-3 weeks',
      examples: ['Document processing', 'Email automation', 'Data entry', 'Workflow optimization']
    }
  ];

  const budgetRanges = [
    { id: 'small', label: '$2,000 - $5,000', description: 'Perfect for getting started' },
    { id: 'medium', label: '$5,000 - $15,000', description: 'Most popular choice' },
    { id: 'large', label: '$15,000 - $50,000', description: 'Comprehensive solution' },
    { id: 'enterprise', label: '$50,000+', description: 'Enterprise transformation' }
  ];

  const timelineOptions = [
    { id: 'urgent', label: 'ASAP (Rush delivery)', description: 'We can start immediately' },
    { id: 'fast', label: '1-2 weeks', description: 'Quick turnaround' },
    { id: 'normal', label: '1-2 months', description: 'Standard timeline' },
    { id: 'flexible', label: '3+ months', description: 'Flexible planning' }
  ];

  const portfolioItems = [
    {
      id: '1',
      title: 'E-commerce AI Chatbot',
      category: 'development',
      description: 'Intelligent customer service bot that increased sales by 40%',
      tags: ['AI', 'Chatbot', 'E-commerce']
    },
    {
      id: '2',
      title: 'Brand Music Suite',
      category: 'music',
      description: 'Complete audio identity for tech startup including jingles and background music',
      tags: ['Music', 'Branding', 'Audio']
    },
    {
      id: '3',
      title: 'Marketing Video Campaign',
      category: 'video',
      description: 'AI-generated video series that boosted engagement by 200%',
      tags: ['Video', 'Marketing', 'AI Generation']
    },
    {
      id: '4',
      title: 'Smart Analytics Dashboard',
      category: 'website',
      description: 'AI-powered website with predictive analytics and personalization',
      tags: ['Website', 'Analytics', 'Personalization']
    },
    {
      id: '5',
      title: 'Document Processing System',
      category: 'automation',
      description: 'Automated document workflow saving 30 hours per week',
      tags: ['Automation', 'Document Processing', 'Workflow']
    },
    {
      id: '6',
      title: 'Predictive Sales Model',
      category: 'development',
      description: 'Machine learning model that improved sales forecasting accuracy by 85%',
      tags: ['ML', 'Sales', 'Prediction']
    }
  ];

  const filteredPortfolio = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

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

  function getCategoryIcon(category) {
    switch(category) {
      case 'development':
        return <Code className="w-12 h-12" />;
      case 'music':
        return <Music className="w-12 h-12" />;
      case 'video':
        return <Video className="w-12 h-12" />;
      case 'website':
        return <Globe className="w-12 h-12" />;
      case 'automation':
        return <Zap className="w-12 h-12" />;
      default:
        return null;
    }
  }

  // Form handlers
  const selectedProject = projectTypes.find(p => p.id === formData.projectType);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setShowCalendar(true);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleConfirmMeeting = async () => {
    if (selectedTimeSlot) {
      setSendingEmails(true);
      
      try {
        // Send emails via your Netlify function
        const response = await fetch('/.netlify/functions/send-emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formData: {
              name: formData.name,
              email: formData.email,
              company: formData.company,
              phone: formData.phone,
              projectType: selectedProject?.title || formData.projectType,
              budget: budgetRanges.find(b => b.id === formData.budget)?.label || formData.budget,
              timeline: timelineOptions.find(t => t.id === formData.timeline)?.label || formData.timeline,
              description: formData.description
            },
            timeSlot: selectedTimeSlot
          })
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
          console.log('✅ Emails sent successfully!');
          setSendingEmails(false);
          setBookingConfirmed(true);
        } else {
          throw new Error(result.error || result.details || 'Failed to send emails');
        }
      } catch (error) {
        console.error('❌ Email sending failed:', error);
        
        // Show user-friendly error but still confirm booking
        alert(`Meeting confirmed! However, there was an issue sending confirmation emails. We'll contact you directly at ${formData.email}.`);
        
        setSendingEmails(false);
        setBookingConfirmed(true);
      }
    }
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      projectType: '',
      budget: '',
      timeline: '',
      description: '',
      name: '',
      email: '',
      company: '',
      phone: ''
    });
    setShowCalendar(false);
    setSelectedTimeSlot('');
    setBookingConfirmed(false);
    setShowForm(false);
    setShowEmailPreview(false);
    setSendingEmails(false);
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return formData.projectType !== '';
      case 2: return formData.budget !== '' && formData.timeline !== '';
      case 3: return formData.description.length > 10;
      case 4: return formData.name !== '' && formData.email !== '' && formData.company !== '';
      default: return false;
    }
  };

  // If form view is active, show the form
  if (showForm) {
    // Booking confirmed state
    if (bookingConfirmed) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full border border-white/20 text-center">
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">{t.confirmation.confirmed}</h2>
            <p className="text-xl text-gray-300 mb-6">
              {t.confirmation.scheduled} <strong className="text-blue-400">{selectedTimeSlot}</strong>
            </p>
            
            <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">{t.confirmation.whatToExpect}</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-green-300 font-bold mb-2">📋 {t.confirmation.projectReview}</div>
                  <div className="text-sm text-white">{t.confirmation.reviewDesc}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-green-300 font-bold mb-2">💡 {t.confirmation.aiStrategy}</div>
                  <div className="text-sm text-white">{t.confirmation.strategyDesc}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-green-300 font-bold mb-2">📊 {t.confirmation.customProposal}</div>
                  <div className="text-sm text-white">{t.confirmation.proposalDesc}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-green-300 font-bold mb-2">🚀 {t.confirmation.nextSteps}</div>
                  <div className="text-sm text-white">{t.confirmation.stepsDesc}</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 mb-6">
              <h4 className="text-blue-400 font-medium mb-2">📧 {t.confirmation.confirmationSent}</h4>
              <p className="text-white font-medium">{formData.email}</p>
              <p className="text-gray-300 text-sm mt-2">
                {t.confirmation.calendarInvite}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleReset}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {t.confirmation.backToWebsite}
              </button>
              <button 
                onClick={() => console.log('Calendar integration would open here')}
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                {t.confirmation.addToCalendar}
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Calendar selection state
    if (showCalendar) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
          <button 
            onClick={() => setShowForm(false)}
            className="absolute top-4 left-4 text-white bg-white/10 backdrop-blur p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-4xl w-full border border-white/20">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4 text-center">{t.calendar.perfect}</h2>
            <p className="text-gray-300 mb-8 text-center">
              {t.calendar.basedOn} {selectedProject?.title} {t.calendar.prepare} {formData.budget} budget.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4">{t.calendar.whatHappens}</h3>
                  <div className="space-y-3">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-white font-bold">1. {t.calendar.discovery}</div>
                      <div className="text-sm text-blue-100">{t.calendar.discoveryDesc}</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-white font-bold">2. {t.calendar.proposal}</div>
                      <div className="text-sm text-blue-100">{t.calendar.proposalDesc}</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-white font-bold">3. {t.calendar.kickoff}</div>
                      <div className="text-sm text-blue-100">{t.calendar.kickoffDesc}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-semibold mb-4 text-gray-800">{t.calendar.selectTime}</h4>
                  {selectedTimeSlot && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <p className="text-green-800 text-sm font-medium">
                        ✅ {t.calendar.selected} <strong>{selectedTimeSlot}</strong>
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    {['Tomorrow 2:00 PM', 'Tomorrow 4:00 PM', 'Wed 10:00 AM', 'Wed 2:00 PM', 'Thu 9:00 AM', 'Thu 3:00 PM'].map((time, index) => (
                      <button 
                        key={index}
                        onClick={() => handleTimeSlotSelect(time)}
                        className={selectedTimeSlot === time
                          ? 'p-3 text-sm font-medium transition-all rounded-lg border-2 bg-blue-500 border-blue-400 text-white'
                          : 'p-3 text-sm font-medium transition-all rounded-lg border-2 bg-blue-50 hover:bg-blue-100 border-blue-200 text-gray-800'
                        }
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    {t.calendar.emailNotifications}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">{t.calendar.youWillReceive}</span>
                      </div>
                      <ul className="text-sm text-gray-400 space-y-1 ml-4">
                        <li>• Consultation confirmation</li>
                        <li>• Calendar invite with meeting link</li>
                        <li>• Preparation checklist</li>
                        <li>• Direct contact with our team</li>
                      </ul>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">{t.calendar.weWillReceive}</span>
                      </div>
                      <ul className="text-sm text-gray-400 space-y-1 ml-4">
                        <li>• Your project requirements</li>
                        <li>• Contact information</li>
                        <li>• Budget and timeline details</li>
                        <li>• Meeting scheduling notification</li>
                      </ul>
                    </div>

                    {selectedTimeSlot && (
                      <div className="bg-green-900/20 border border-green-400/30 rounded-lg p-4">
                        <div className="text-green-400 text-sm font-medium mb-2">📧 {t.calendar.readyToSend}</div>
                        <div className="text-white text-sm">
                          <div>Your email: <span className="font-medium">{formData.email}</span></div>
                          <div>Our team: <span className="font-medium">nexai.guide@gmail.com</span></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setShowEmailPreview(!showEmailPreview)}
                    className="mt-4 text-blue-400 text-sm hover:text-blue-300 transition-colors"
                  >
                    {showEmailPreview ? 'Hide' : 'Show'} email preview →
                  </button>

                  {showEmailPreview && (
                    <div className="mt-4 bg-gray-900 rounded-lg p-4 max-h-64 overflow-y-auto">
                      <div className="text-xs text-gray-400 font-mono">
                        <div className="mb-3">
                          <div className="text-blue-400">To: {formData.email}</div>
                          <div className="text-blue-400">Subject: Your AI Consultation is Confirmed</div>
                          <div className="mt-2 text-gray-300">
                            Hi {formData.name},<br/><br/>
                            Thank you for booking a consultation with Nex AI!<br/>
                            Your {selectedProject?.title} consultation is confirmed for {selectedTimeSlot}.<br/><br/>
                            We'll discuss your project needs and prepare a custom proposal within your {budgetRanges.find(b => b.id === formData.budget)?.label} budget.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button 
              onClick={handleConfirmMeeting}
              disabled={!selectedTimeSlot || sendingEmails}
              className={selectedTimeSlot && !sendingEmails
                ? 'w-full mt-6 px-8 py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700'
                : 'w-full mt-6 px-8 py-3 rounded-lg font-semibold transition-all bg-gray-400 text-gray-200 cursor-not-allowed'
              }
            >
              {sendingEmails ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  {t.calendar.sendingEmails}
                </span>
              ) : (
                selectedTimeSlot ? t.calendar.confirmMeeting : t.calendar.selectTimeSlot
              )}
            </button>
          </div>
        </div>
      );
    }

    // Form steps
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        <button 
          onClick={() => setShowForm(false)}
          className="absolute top-4 left-4 text-white bg-white/10 backdrop-blur p-2 rounded-lg hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-4xl w-full border border-white/20">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-300 text-sm">{t.form.step} {step} of 4</span>
              <span className="text-gray-300 text-sm">{(step / 4 * 100).toFixed(0)}% {t.form.complete}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Project Type Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{t.form.projectType}</h2>
              <p className="text-gray-300 mb-8">{t.form.selectService}</p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectTypes.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setFormData(prev => ({ ...prev, projectType: project.id }))}
                    className={formData.projectType === project.id 
                      ? 'text-left p-6 rounded-xl border-2 transition-all group hover:scale-105 border-blue-400 bg-blue-500/20' 
                      : 'text-left p-6 rounded-xl border-2 transition-all group hover:scale-105 border-white/20 bg-white/5 hover:border-blue-400/50'
                    }
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={formData.projectType === project.id ? 'p-3 rounded-lg bg-blue-500' : 'p-3 rounded-lg bg-white/10'}>
                        <div className={formData.projectType === project.id ? 'text-white' : 'text-blue-400'}>
                          {getIcon(project.icon, "w-8 h-8")}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                        <p className="text-blue-400 text-sm font-medium">{project.startingPrice}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.examples.slice(0, 2).map((example, index) => (
                        <span key={index} className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded">
                          {example}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Budget and Timeline */}
          {step === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{t.form.budgetTimeline}</h2>
              <p className="text-gray-300 mb-8">{t.form.description}</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">{t.form.budgetQuestion}</h3>
                  <div className="space-y-3">
                    {budgetRanges.map((budget) => (
                      <button
                        key={budget.id}
                        onClick={() => setFormData(prev => ({ ...prev, budget: budget.id }))}
                        className={formData.budget === budget.id 
                          ? 'w-full text-left p-4 rounded-lg border-2 transition-all border-blue-400 bg-blue-500/20' 
                          : 'w-full text-left p-4 rounded-lg border-2 transition-all border-white/20 bg-white/5 hover:border-blue-400/50'
                        }
                      >
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-green-400" />
                          <div>
                            <div className="text-white font-medium">{budget.label}</div>
                            <div className="text-gray-400 text-sm">{budget.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">{t.form.timelineQuestion}</h3>
                  <div className="space-y-3">
                    {timelineOptions.map((timeline) => (
                      <button
                        key={timeline.id}
                        onClick={() => setFormData(prev => ({ ...prev, timeline: timeline.id }))}
                        className={formData.timeline === timeline.id 
                          ? 'w-full text-left p-4 rounded-lg border-2 transition-all border-blue-400 bg-blue-500/20' 
                          : 'w-full text-left p-4 rounded-lg border-2 transition-all border-white/20 bg-white/5 hover:border-blue-400/50'
                        }
                      >
                        <div className="flex items-center gap-3">
                          {timeline.id === 'urgent' && <Zap className="w-5 h-5" />}
                          {timeline.id === 'fast' && <Clock className="w-5 h-5" />}
                          {timeline.id === 'normal' && <Calendar className="w-5 h-5" />}
                          {timeline.id === 'flexible' && <Users className="w-5 h-5" />}
                          <div>
                            <div className="text-white font-medium">{timeline.label}</div>
                            <div className="text-gray-400 text-sm">{timeline.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Project Description */}
          {step === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{t.form.tellUs}</h2>
              <p className="text-gray-300 mb-8">{t.form.description}</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-white text-lg font-medium mb-3">
                    Describe your {selectedProject?.title} project:
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="What are you looking to create? What's the purpose? Any specific requirements or features you need?"
                    className="w-full h-40 px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  />
                  <div className="text-gray-400 text-sm mt-2">
                    {formData.description.length}/500 characters
                  </div>
                </div>

                {selectedProject && (
                  <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                    <h4 className="text-blue-400 font-medium mb-2">{t.form.examples} {selectedProject.title}:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProject.examples.map((example, index) => (
                        <div key={index} className="text-gray-300 text-sm">• {example}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Contact Information */}
          {step === 4 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{t.form.almostDone}</h2>
              <p className="text-gray-300 mb-8">{t.form.reachOut}</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="John Smith"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="john@company.com"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Company Name *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Your Company Inc."
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="mt-6 bg-green-500/10 border border-green-400/30 rounded-lg p-4">
                <h4 className="text-green-400 font-medium mb-2">🎯 {t.form.projectSummary}</h4>
                <div className="text-gray-300 text-sm space-y-1">
                  <div><strong>Service:</strong> {selectedProject?.title}</div>
                  <div><strong>Budget:</strong> {budgetRanges.find(b => b.id === formData.budget)?.label}</div>
                  <div><strong>Timeline:</strong> {timelineOptions.find(t => t.id === formData.timeline)?.label}</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={step === 1 
                ? 'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all bg-white/10 text-white hover:bg-white/20'
              }
            >
              <ArrowLeft className="w-5 h-5" />
              {t.form.back}
            </button>

            <button
              onClick={step === 4 ? handleSubmit : handleNext}
              disabled={!isStepValid()}
              className={isStepValid()
                ? 'flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                : 'flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all bg-gray-600 text-gray-400 cursor-not-allowed'
              }
            >
              {step === 4 ? t.form.getProposal : t.form.continue}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main website view
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
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
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
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all text-lg flex items-center justify-center gap-2 animate-pulse"
            >
              {t.hero.cta1}
              <ArrowRight className="w-5 h-5" />
            </button>
            <a 
              href="#portfolio" 
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
                
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
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

          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-green-600 hover:to-blue-700 transition-all shadow-lg"
              >
                Get Your Free Custom Proposal
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <span className="text-gray-400">or</span>
              
              <a 
                href="https://calendly.com/nex-ai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-blue-500 text-blue-400 px-8 py-4 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-all"
              >
                <Calendar className="w-5 h-5" />
                Schedule Directly
              </a>
            </div>
            <p className="text-gray-400 mt-4">No commitment required • Response within 24 hours</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {t.about.title}
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {t.about.subtitle}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                  <div className="text-3xl font-bold text-blue-400 mb-2">5+</div>
                  <div className="text-gray-300">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                  <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
                  <div className="text-gray-300">AI Models</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex-1"
                >
                  {t.about.consultation}
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <a 
                  href="https://calendly.com/nex-ai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-blue-500 text-blue-400 px-6 py-4 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  Calendly
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-400" />
                  {t.about.mission}
                </h3>
                <p className="text-gray-300">
                  {t.about.missionText}
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Users className="w-6 h-6 text-blue-400" />
                  {t.about.values}
                </h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Innovation-driven development</li>
                  <li>• Transparent communication</li>
                  <li>• Results-focused approach</li>
                  <li>• Continuous learning and adaptation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {t.portfolio.title}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {t.portfolio.subtitle}
            </p>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['all', 'development', 'music', 'video', 'website', 'automation'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={activeFilter === filter
                    ? 'px-6 py-3 rounded-lg font-medium transition-all bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'px-6 py-3 rounded-lg font-medium transition-all bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((item) => (
              <div 
                key={item.id}
                className="bg-gray-900/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group hover:transform hover:scale-105"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                  <div className="text-4xl text-blue-400">
                    {getCategoryIcon(item.category)}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                {t.portfolio.startProject}
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <span className="text-gray-400">or</span>
              
              <a 
                href="https://calendly.com/nex-ai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-blue-500 text-blue-400 px-6 py-4 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-all"
              >
                <Calendar className="w-5 h-5" />
                Quick Call
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {t.contact.title}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6">{t.contact.getInTouch}</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-blue-400 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Email</h4>
                      <p className="text-gray-300">nexai.guide@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-blue-400 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Phone</h4>
                      <p className="text-gray-300">+1 (555) 123-4567</p>
                    </div>
                  </div>
              
                
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-blue-400 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Location</h4>
                      <p className="text-gray-300">Gent</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-white font-semibold mb-4">{t.contact.followUs}</h4>
                  <div className="flex gap-4">
                    <a href="https://facebook.com/nexai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                      <Facebook className="w-5 h-5 text-white" />
                    </a>
                    <a href="https://twitter.com/nexai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors">
                      <Twitter className="w-5 h-5 text-white" />
                    </a>
                    <a href="https://linkedin.com/company/nexai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                    <a href="https://instagram.com/nexai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                      <Instagram className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">{t.contact.schedule}</h3>
              <p className="text-gray-300 mb-8">
                {t.contact.scheduleDesc}
              </p>

              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-6">
                <h4 className="text-xl font-semibold text-white mb-4">{t.contact.whatYouGet}</h4>
                <ul className="space-y-3 text-white">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    AI strategy assessment
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Custom solution recommendations
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Project timeline and pricing
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    No-obligation proposal
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => setShowForm(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2 text-lg"
                >
                  {t.contact.bookConsultation}
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gray-600"></div>
                  <span className="text-gray-400 text-sm">or</span>
                  <div className="flex-1 h-px bg-gray-600"></div>
                </div>

                <a 
                  href="https://calendly.com/nex-ai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border-2 border-blue-500 text-blue-400 py-4 px-6 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-2 text-lg"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule via Calendly
                </a>
              </div>

              <p className="text-center text-gray-400 text-sm mt-4">
                {t.contact.responds}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                Nex AI
              </div>
              <p className="text-gray-400 mb-4">
                Transforming businesses through intelligent AI solutions and cutting-edge technology.
              </p>
              <div className="flex gap-4">
                <a href="https://facebook.com/nexai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://twitter.com/nexai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/company/nexai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/nexai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-white transition-colors">AI Music Production</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">AI Video Creation</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">AI Development</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">AI Websites</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">AI Automation</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Blog</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Careers</span></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Stay updated with our latest AI innovations and insights.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Nex AI. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
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