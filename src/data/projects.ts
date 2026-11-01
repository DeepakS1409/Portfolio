import { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'deepkart',
    title: 'DeepKart',
    tagline: 'Modern High-Performance E-Commerce Web Platform',
    category: 'Full-Stack',
    status: 'In Development',
    description: 'A full-featured e-commerce web application engineered to deliver seamless shopping experiences, fast catalog querying, and a secure checkout pipeline.',
    features: [
      'Interactive Product Listing with multi-criteria filtering and instant search',
      'Persistent Shopping Cart with real-time stock verification',
      'Custom Wishlist manager for saved items',
      'Multi-step Checkout flow with simulated payment gateway interface',
      'Order history dashboard with status tracking',
      'User Profile and preference management'
    ],
    technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'REST APIs', 'LocalStorage/State Management'],
    metrics: 'Active Development — Core UI & Cart Engine Implemented',
    githubUrl: 'https://github.com/placeholder-deepak/deepkart', // [EDITABLE PLACEHOLDER: Update with your GitHub repo URL]
    liveDemoUrl: 'https://deepkart-demo-placeholder.vercel.app', // [EDITABLE PLACEHOLDER: Update with your live demo URL]
    accentColor: '#00f2fe',
    iconName: 'ShoppingCart',
    architectureNotes: 'Built with modular state management and responsive component architecture for optimal mobile and desktop rendering.'
  },
  {
    id: 'factorymind-ai',
    title: 'FactoryMind AI',
    tagline: 'AI Digital Twin & Autonomous Production Scheduler',
    category: 'AI & Automation',
    status: 'Prototype',
    description: 'An intelligent manufacturing simulation system that models machine telemetry, predicts production bottlenecks, and autonomously optimizes assembly line schedules.',
    features: [
      'Industrial production simulation and machine status monitoring',
      'Intelligent machine scheduling algorithms',
      'Dynamic production planning matrix',
      'AI-assisted optimization suggestions for downtime reduction',
      'Real-time throughput metrics visualizer'
    ],
    technologies: ['Python', 'AI/ML Concepts', 'Optimization Algorithms', 'Data Visualization', 'Streamlit / Web Dashboard'],
    metrics: 'Working Prototype — Algorithmic Scheduling Logic Validated',
    githubUrl: 'https://github.com/placeholder-deepak/factorymind-ai', // [EDITABLE PLACEHOLDER: Update with your GitHub repo URL]
    liveDemoUrl: 'https://factorymind-ai-placeholder.vercel.app', // [EDITABLE PLACEHOLDER: Update with your live demo URL]
    accentColor: '#3b82f6',
    iconName: 'Cpu',
    architectureNotes: 'Simulates discrete factory events and evaluates machine operational parameters to prevent bottlenecking in multi-stage workflows.'
  },
  {
    id: 'whatsapp-ai',
    title: 'WhatsApp AI Intelligence Center',
    tagline: 'Automated Messaging Analysis & Intelligent Routing System',
    category: 'AI & Automation',
    status: 'Prototype',
    description: 'An AI-powered messaging processing hub designed to parse incoming customer communications, classify intent, handle multimodal media, and route inquiries intelligently.',
    features: [
      'Automated message analysis and sentiment evaluation',
      'Intelligent intent classification and priority tagging',
      'Image and voice processing conceptual pipeline',
      'AI-assisted workflow routing to appropriate responder queues',
      'Analytics dashboard tracking communication trends'
    ],
    technologies: ['Python', 'Natural Language Processing', 'AI Integration', 'Prompt Engineering', 'API Webhooks'],
    metrics: 'Prototype Stage — Intent Classifier and Routing Engine Tested',
    githubUrl: 'https://github.com/placeholder-deepak/whatsapp-ai-center', // [EDITABLE PLACEHOLDER: Update with your GitHub repo URL]
    liveDemoUrl: 'https://whatsapp-ai-placeholder.vercel.app', // [EDITABLE PLACEHOLDER: Update with your live demo URL]
    accentColor: '#10b981',
    iconName: 'MessageSquare',
    architectureNotes: 'Leverages modern NLP models and prompt engineering frameworks to categorize complex conversational inputs into actionable task pipelines.'
  },
  {
    id: 'padika-ai',
    title: 'Padika AI',
    tagline: 'AI-Powered Multilingual Educational Assistant for College Students',
    category: 'AI & Automation',
    status: 'In Development',
    description: 'A specialized academic companion engineered to support collegiate learning across technical syllabi, offering curated search, subject explanations, and language adaptation.',
    features: [
      'College learning support adapted for engineering curriculums',
      'Subject-wise information breakdown and conceptual summaries',
      'Smart educational content search across academic modules',
      'Multilingual explanation support for diverse student backgrounds',
      'Interactive flashcard generation and revision quiz queries'
    ],
    technologies: ['Generative AI', 'React', 'Python Backend', 'Vector Search Concepts', 'Tailwind CSS'],
    metrics: 'Active Development — Subject Modules & UI in Progress',
    githubUrl: 'https://github.com/placeholder-deepak/padika-ai', // [EDITABLE PLACEHOLDER: Update with your GitHub repo URL]
    liveDemoUrl: 'https://padika-ai-placeholder.vercel.app', // [EDITABLE PLACEHOLDER: Update with your live demo URL]
    accentColor: '#8b5cf6',
    iconName: 'GraduationCap',
    architectureNotes: 'Focused on making foundational IT and engineering concepts clear through context-aware AI explanations.'
  },
  {
    id: 'smart-parking',
    title: 'Smart Parking System',
    tagline: 'Next-Gen Mobile Concept for Frictionless Urban Parking',
    category: 'Mobile Concept',
    status: 'Concept',
    description: 'A mobile application architectural concept integrating QR identification and real-time slot sensor data to eliminate parking congestion.',
    features: [
      'Instant QR-based contactless entry and exit validation',
      'Advance parking slot reservation and booking flow',
      'Real-time slot availability telemetry and heatmap',
      'In-lot turn-by-turn parking navigation guidance',
      'Digital receipt and automated duration billing calculator'
    ],
    technologies: ['Mobile UI/UX Design', 'QR Code Protocol', 'IoT Sensor Concepts', 'Frontend Prototyping', 'Figma/React Native Concepts'],
    metrics: 'Concept & Architecture Design Phase',
    githubUrl: 'https://github.com/placeholder-deepak/smart-parking-concept', // [EDITABLE PLACEHOLDER: Update with your GitHub repo URL]
    liveDemoUrl: 'https://smart-parking-concept-placeholder.vercel.app', // [EDITABLE PLACEHOLDER: Update with your live demo URL]
    accentColor: '#ec4899',
    iconName: 'Car',
    architectureNotes: 'Designed to bridge hardware ultrasonic/optical bay sensors with a rapid mobile consumer interface.'
  },
  {
    id: 'smart-street-light',
    title: 'Hybrid Smart Street Light Fault Monitoring System',
    tagline: 'Smart Infrastructure Monitoring & Field Maintenance Solution',
    category: 'Smart Infrastructure',
    status: 'Concept',
    description: 'An intelligent municipal infrastructure system concept that automates fault detection across street lighting networks and streamlines municipal worker dispatch.',
    features: [
      'Real-time streetlight fault and electrical outage monitoring',
      'QR-based public citizen complaints and rapid incident logging',
      'Automated geographical location tracking of faulty fixtures',
      'Optimized maintenance worker routing and repair ticket dispatch',
      'Municipal energy consumption analytics and dimming schedules'
    ],
    technologies: ['IoT System Architecture', 'Geospatial Mapping', 'QR Dispatch Workflow', 'Web Dashboard Prototype', 'Embedded Sensors (Explored)'],
    metrics: 'Concept & System Workflow Designed',
    githubUrl: 'https://github.com/placeholder-deepak/smart-streetlight-system', // [EDITABLE PLACEHOLDER: Update with your GitHub repo URL]
    liveDemoUrl: 'https://smart-streetlight-placeholder.vercel.app', // [EDITABLE PLACEHOLDER: Update with your live demo URL]
    accentColor: '#f59e0b',
    iconName: 'Lightbulb',
    architectureNotes: 'Combines citizen-in-the-loop reporting via QR tags with hardware failure alarms for efficient municipal resource allocation.'
  }
];
