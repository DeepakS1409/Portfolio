import { SectionJourneyConfig } from '../types';

export const SECTION_JOURNEYS: Record<string, SectionJourneyConfig> = {
  projects: {
    id: 'projects',
    name: 'Projects',
    roadTitle: 'PROJECT SHOWCASE ROAD',
    roadSubtitle: 'Explore 6 full-stack, AI, and smart infrastructure software systems along NH-47',
    themeColor: '#38bdf8',
    icon: 'Layers',
    landmark: 'Innovation Tech Valley',
    stations: [
      {
        id: 'deepkart',
        stationNumber: 1,
        progress: 0.14,
        kmMarker: 'KM 0.8',
        title: 'DeepKart',
        subtitle: 'Modern High-Performance E-Commerce Web Application',
        categoryTag: 'Full-Stack Web App',
        content: {
          badge: 'IN DEVELOPMENT',
          description:
            'A full-featured e-commerce web platform engineered for fluid product discovery, reactive cart management, and seamless simulated checkout transactions.',
          highlights: [
            'Interactive catalog with real-time keyword search and dynamic category filtering',
            'Persistent shopping cart engine with quantity adjusters and subtotal calculation',
            'Wishlist storage for tracking favorite consumer goods',
            'Multi-step checkout workflow with shipping validation and mock payment interface',
            'Order history dashboard with tracking status'
          ],
          techStack: ['React', 'JavaScript (ES6+)', 'CSS3 / Tailwind', 'LocalStorage State', 'REST APIs'],
          visualType: 'ShoppingCart',
          githubUrl: 'https://github.com/placeholder-deepak/deepkart',
          liveDemoUrl: 'https://deepkart-demo-placeholder.vercel.app',
          extraNote: 'Features responsive mobile layouts and modular state management.'
        }
      },
      {
        id: 'factorymind',
        stationNumber: 2,
        progress: 0.30,
        kmMarker: 'KM 1.9',
        title: 'FactoryMind AI',
        subtitle: 'AI Digital Twin & Autonomous Production Scheduler',
        categoryTag: 'AI & Industrial Automation',
        content: {
          badge: 'WORKING PROTOTYPE',
          description:
            'An intelligent manufacturing telemetry simulator modeling factory equipment operations, predicting bottlenecks, and dynamically rescheduling production queues.',
          highlights: [
            'Digital twin visualizer of multi-stage assembly lines',
            'Algorithmic machine job scheduling with constraint satisfaction',
            'Predictive downtime reduction algorithms',
            'Real-time throughput metrics & performance graph telemetry'
          ],
          techStack: ['Python', 'Optimization Algorithms', 'Machine Learning Concepts', 'Streamlit', 'Web Dashboard'],
          visualType: 'Cpu',
          githubUrl: 'https://github.com/placeholder-deepak/factorymind-ai',
          liveDemoUrl: 'https://factorymind-ai-placeholder.vercel.app',
          extraNote: 'Simulates discrete factory events to optimize multi-machine workflows.'
        }
      },
      {
        id: 'whatsapp-ai',
        stationNumber: 3,
        progress: 0.46,
        kmMarker: 'KM 3.0',
        title: 'WhatsApp AI Intelligence Center',
        subtitle: 'Automated Messaging Analysis & Intelligent Routing System',
        categoryTag: 'AI & Conversational NLP',
        content: {
          badge: 'PROTOTYPE',
          description:
            'An AI-driven communication routing pipeline that parses incoming consumer communications, detects sentiment, handles multimodal queries, and routes inquiries to designated handlers.',
          highlights: [
            'Automated natural language processing and intent classification',
            'Sentiment scoring and urgent ticket priority tagging',
            'Conceptual image and voice input transcription pipeline',
            'Intelligent triage matrix routing tasks to specialized departments'
          ],
          techStack: ['Python', 'Natural Language Processing', 'Prompt Engineering', 'API Webhooks', 'LLM Integration'],
          visualType: 'MessageSquare',
          githubUrl: 'https://github.com/placeholder-deepak/whatsapp-ai-center',
          liveDemoUrl: 'https://whatsapp-ai-placeholder.vercel.app',
          extraNote: 'Designed to drastically reduce customer support triage latency.'
        }
      },
      {
        id: 'padika-ai',
        stationNumber: 4,
        progress: 0.62,
        kmMarker: 'KM 4.1',
        title: 'Padika AI',
        subtitle: 'AI-Powered Multilingual Educational Assistant for College Students',
        categoryTag: 'Educational Technology',
        content: {
          badge: 'IN DEVELOPMENT',
          description:
            'A collegiate academic companion built to simplify complex engineering concepts through curriculum-aligned search, subject breakdowns, and multilingual explanation support.',
          highlights: [
            'Engineering syllabus navigation with subject-wise modular breakdowns',
            'Intelligent academic query search across textbook concepts',
            'Multilingual explanation support tailored for diverse collegiate learners',
            'Automated revision flashcards and practice conceptual query prompts'
          ],
          techStack: ['Generative AI', 'React', 'Python Backend', 'Vector Embeddings', 'Tailwind CSS'],
          visualType: 'GraduationCap',
          githubUrl: 'https://github.com/placeholder-deepak/padika-ai',
          liveDemoUrl: 'https://padika-ai-placeholder.vercel.app',
          extraNote: 'Built with first-hand understanding of freshman engineering curriculum requirements.'
        }
      },
      {
        id: 'smart-parking',
        stationNumber: 5,
        progress: 0.78,
        kmMarker: 'KM 5.2',
        title: 'Smart Parking System',
        subtitle: 'Next-Gen Mobile Concept for Frictionless Urban Parking',
        categoryTag: 'Mobile Concept & IoT',
        content: {
          badge: 'CONCEPT ARCHITECTURE',
          description:
            'A mobile application architecture concept that bridges ultrasonic parking lot bay sensors with real-time smartphone booking and contactless QR check-in/out.',
          highlights: [
            'Instant QR-based contactless ingress and egress validation',
            'Advance parking slot pre-reservation with slot availability telemetry',
            'Live occupancy heatmap of urban parking structures',
            'In-facility turn-by-turn navigation guidance to designated bays'
          ],
          techStack: ['Mobile UI/UX', 'QR Code Protocol', 'IoT Bay Sensor Concepts', 'Frontend Prototyping'],
          visualType: 'Car',
          githubUrl: 'https://github.com/placeholder-deepak/smart-parking-concept',
          liveDemoUrl: 'https://smart-parking-concept-placeholder.vercel.app',
          extraNote: 'Combines hardware bay sensors with rapid consumer mobile interfaces.'
        }
      },
      {
        id: 'smart-street-light',
        stationNumber: 6,
        progress: 0.94,
        kmMarker: 'KM 6.3',
        title: 'Hybrid Smart Street Light Fault Monitoring System',
        subtitle: 'Smart Infrastructure Monitoring & Field Maintenance Solution',
        categoryTag: 'Smart Infrastructure',
        content: {
          badge: 'CONCEPT & WORKFLOW',
          description:
            'An intelligent municipal utility solution that automates fault detection across street illumination networks, aggregates citizen QR complaints, and dispatches repair routes to municipal electricians.',
          highlights: [
            'Automated electrical fault detection and burnout alert monitoring',
            'QR-coded fixture plates for instant citizen incident reporting',
            'Geospatial asset mapping with automated repair ticket assignment',
            'Optimized municipal maintenance worker routing algorithms'
          ],
          techStack: ['IoT Systems Architecture', 'Geospatial Mapping', 'QR Dispatch Workflows', 'Embedded Sensors (Explored)'],
          visualType: 'Lightbulb',
          githubUrl: 'https://github.com/placeholder-deepak/smart-streetlight-system',
          liveDemoUrl: 'https://smart-streetlight-placeholder.vercel.app',
          extraNote: 'Engineered to reduce municipal energy waste and speed up public repair cycles.'
        }
      }
    ]
  },

  skills: {
    id: 'skills',
    name: 'Skills',
    roadTitle: 'SKILLS EXPLORATION ROAD',
    roadSubtitle: 'Ride through Deepak’s categorized technology arsenal, core languages, and active learning roadmap',
    themeColor: '#10b981',
    icon: 'Cpu',
    landmark: 'Tech Arsenal Junction',
    stations: [
      {
        id: 'lang-station',
        stationNumber: 1,
        progress: 0.16,
        kmMarker: 'KM 1.0',
        title: 'Programming Languages',
        subtitle: 'Core Foundational Languages for Systems & Application Logic',
        categoryTag: 'Core Languages',
        content: {
          badge: 'CORE COMPETENCY',
          description:
            'Deepak focuses on strong foundational languages taught in college coursework along with practical scripting and modern web standards.',
          highlights: [
            'C: Pointers, memory allocation, procedural structures, and low-level computing',
            'C++: Object-oriented programming, standard template library (STL), data structures',
            'Python: Scripting, backend prototyping, data manipulation, automation, AI APIs',
            'JavaScript: Modern ES6+, DOM manipulation, asynchronous promises, web logic'
          ],
          techStack: ['C', 'C++', 'Python', 'JavaScript (ES6+)'],
          visualType: 'Terminal',
          extraNote: 'Emphasis on writing readable, algorithmically sound code without unnecessary overhead.'
        }
      },
      {
        id: 'web-station',
        stationNumber: 2,
        progress: 0.36,
        kmMarker: 'KM 2.3',
        title: 'Web Development',
        subtitle: 'Modern Declarative Frontend Architecture & Reactive Interfaces',
        categoryTag: 'Frontend & UI Engineering',
        content: {
          badge: 'ACTIVE FOCUS',
          description:
            'Crafting responsive, accessible, and dynamic user interfaces using industry-standard tooling and modern styling patterns.',
          highlights: [
            'HTML5: Clean semantic markup and accessible structure',
            'CSS3: Custom flexbox, grid, glassmorphism, responsive breakpoints, animations',
            'React: Declarative component trees, custom hooks, modular state management',
            'Vite: Ultra-fast dev server setup and optimized production bundling',
            'Full-Stack Exploration: Building API endpoints and exploring backend connectivity'
          ],
          techStack: ['HTML5', 'CSS3', 'React', 'Vite', 'Tailwind CSS', 'Responsive UI'],
          visualType: 'Globe',
          extraNote: 'All interfaces are tested across mobile, tablet, and desktop viewports.'
        }
      },
      {
        id: 'ai-station',
        stationNumber: 3,
        progress: 0.54,
        kmMarker: 'KM 3.5',
        title: 'AI & Machine Learning',
        subtitle: 'Applied Generative AI Integration & Intelligent Reasoning',
        categoryTag: 'Artificial Intelligence',
        content: {
          badge: 'INNOVATION PASSION',
          description:
            'Exploring the frontiers of Generative AI, prompt engineering workflows, and machine learning principles to build context-aware digital products.',
          highlights: [
            'Generative AI: Integrating state-of-the-art LLMs into real-world software applications',
            'Prompt Engineering: Structured prompting, few-shot conditioning, and output schema enforcement',
            'Machine Learning Fundamentals: Supervised learning, classification, and evaluation metrics',
            'Computer Vision Concepts: Image classification concepts and visual feature extraction'
          ],
          techStack: ['Generative AI', 'Prompt Engineering', 'AI API Integration', 'Computer Vision Basics'],
          visualType: 'Bot',
          extraNote: 'Demonstrated practically in projects like FactoryMind AI and Padika AI.'
        }
      },
      {
        id: 'tools-station',
        stationNumber: 4,
        progress: 0.72,
        kmMarker: 'KM 4.8',
        title: 'Development Tools & Platforms',
        subtitle: 'Productivity Ecosystem, Version Control, and Deployment',
        categoryTag: 'Developer Tools',
        content: {
          badge: 'DAILY WORKFLOW',
          description:
            'Leveraging standard developer environments and AI agentic platforms for rapid pair programming and continuous delivery.',
          highlights: [
            'Git & GitHub: Branching, commits, pull requests, and repository maintenance',
            'VS Code: Configured multi-language IDE with linting and terminal integration',
            'Antigravity IDE: Advanced AI pair programming and full-stack workflow automation',
            'Streamlit: Rapid Python prototyping for data science and AI applications',
            'Vercel: Continuous deployment and edge hosting for web applications'
          ],
          techStack: ['Git', 'GitHub', 'VS Code', 'Antigravity IDE', 'Streamlit', 'Vercel'],
          visualType: 'GitBranch',
          extraNote: 'Fostering clean commit histories and reproducible project setups.'
        }
      },
      {
        id: 'learning-station',
        stationNumber: 5,
        progress: 0.90,
        kmMarker: 'KM 5.9',
        title: 'Currently Learning & Future Goals',
        subtitle: 'Honest Learning Roadmap • No Fabricated Percentages',
        categoryTag: 'Active Exploration',
        content: {
          badge: 'TRANSPARENT ROADMAP',
          description:
            'Deepak is transparent about his learning progression as a first-year undergraduate student. These represent active study priorities, not expert claims.',
          highlights: [
            'Advanced JavaScript: Event loop, memory profiling, closures, and async patterns',
            'Data Structures & Algorithms: Solving trees, graphs, and dynamic programming in C++',
            'Full-Stack Backend: Relational database design, authentication, and REST APIs',
            'Embedded Firmware & IoT: C firmware loops on ESP32 and sensor reading protocols'
          ],
          techStack: ['Advanced JS', 'DSA in C++', 'Backend Microservices', 'Embedded C'],
          visualType: 'TrendingUp',
          extraNote: 'Pursued through college coursework at Sri Eshwar College of Engineering and independent study.'
        }
      }
    ]
  },

  about: {
    id: 'about',
    name: 'About Me',
    roadTitle: 'PERSONAL INTRODUCTION ROAD',
    roadSubtitle: 'Get to know Deepak S — student engineer, innovator, and physical-digital explorer',
    themeColor: '#00f2fe',
    icon: 'User',
    landmark: 'Sri Eshwar Green Boulevard',
    stations: [
      {
        id: 'bio-station',
        stationNumber: 1,
        progress: 0.22,
        kmMarker: 'KM 1.2',
        title: 'Personal Introduction & Identity',
        subtitle: 'B.Tech Information Technology | 2026–2030 • Sri Eshwar College of Engineering',
        categoryTag: 'Digital Identity',
        content: {
          badge: 'ACADEMIC PROFILE',
          description:
            'I am a B.Tech Information Technology student (Batch 2026–2030) at Sri Eshwar College of Engineering, passionate about exploring technology and developing innovative digital solutions. I enjoy building software applications, experimenting with AI-powered ideas, and solving real-world problems through technology. I am also interested in hardware, embedded systems, IoT, robotics, and the integration of software with physical devices.',
          highlights: [
            'Academic Program: B.Tech Information Technology | 2026–2030',
            'Institution: Sri Eshwar College of Engineering, Coimbatore, Tamil Nadu',
            'Department: Information Technology (IT)',
            'Interests: Full-Stack Web Development, Applied AI, and Embedded Hardware'
          ],
          visualType: 'Compass',
          extraNote: 'Passionate about coding solutions that create tangible real-world value.'
        }
      },
      {
        id: 'philosophy-station',
        stationNumber: 2,
        progress: 0.54,
        kmMarker: 'KM 3.2',
        title: 'Engineering Philosophy & Mindset',
        subtitle: 'Where Software Architecture Meets Physical Hardware Automation',
        categoryTag: 'Core Philosophy',
        content: {
          badge: 'CORE MINDSET',
          description:
            'Rather than separating software and physical hardware into isolated fields, Deepak approaches engineering as a unified spectrum — where high-level software user experiences command low-level physical sensors and actuators.',
          highlights: [
            'Curiosity-driven experimentation: rapid prototyping using modern developer agents and tools',
            'Honest engineering: building functional proofs of concept rather than fabricated claims',
            'Continuous learning: dedicating hours daily to algorithmic practice and framework mastery',
            'Collaborative engineering: participating enthusiastically in hackathons and peer study groups'
          ],
          visualType: 'Sparkles',
          extraNote: 'Believes true innovation happens at the intersection of disciplines.'
        }
      },
      {
        id: 'career-station',
        stationNumber: 3,
        progress: 0.86,
        kmMarker: 'KM 5.4',
        title: 'Career Aspirations & Horizons',
        subtitle: 'Long-term Goals in Software Development and Cyber-Physical Systems',
        categoryTag: 'Career Vision',
        content: {
          badge: 'FUTURE HORIZON',
          description:
            'Aspiring to grow into a world-class software engineer who bridges full-stack cloud applications with intelligent AI models and smart physical infrastructure.',
          highlights: [
            'Full-Stack Software Development: Building scalable web services with responsive user experiences',
            'Applied AI Systems: Integrating LLM agents and vision into daily business and educational workflows',
            'Physical Computing & Smart Cities: Deploying connected IoT systems for urban optimization in India'
          ],
          visualType: 'Target',
          extraNote: 'Committed to disciplined four-year undergraduate growth at Sri Eshwar College of Engineering.'
        }
      }
    ]
  },

  education: {
    id: 'education',
    name: 'Education',
    roadTitle: 'EDUCATION JOURNEY ROAD',
    roadSubtitle: 'Academic trajectory, engineering foundations, and coursework at SECE',
    themeColor: '#8b5cf6',
    icon: 'GraduationCap',
    landmark: 'SECE Campus Outer Ring Road',
    stations: [
      {
        id: 'schooling-station',
        stationNumber: 1,
        progress: 0.25,
        kmMarker: 'KM 1.4',
        title: 'Higher Secondary Certificate (HSC)',
        subtitle: 'Strong Foundational Sciences & Mathematics (Completed 2024)',
        categoryTag: 'Schooling Foundation',
        content: {
          badge: 'COMPLETED 2024',
          description:
            'Completed Higher Secondary education with focus on Mathematics, Physics, Chemistry, and Computer Science, establishing analytical discipline and algorithmic curiosity.',
          highlights: [
            'Rigorous grounding in higher mathematics, calculus, and logical reasoning',
            'Foundations in digital computing, basic data structures, and computer science concepts',
            'Analytical problem-solving habits that carried into collegiate engineering'
          ],
          visualType: 'BookOpen',
          extraNote: 'Provided the mathematical foundation for computer science algorithms.'
        }
      },
      {
        id: 'college-station',
        stationNumber: 2,
        progress: 0.60,
        kmMarker: 'KM 3.6',
        title: 'B.Tech Information Technology | 2026–2030',
        subtitle: 'Sri Eshwar College of Engineering',
        categoryTag: 'Undergraduate Program',
        content: {
          badge: 'B.TECH IT | 2026–2030',
          description:
            'Enrolled in B.Tech Information Technology | 2026–2030 at Sri Eshwar College of Engineering, a premier engineering institution in Tamil Nadu renowned for industry-aligned innovation.',
          highlights: [
            'Program & Batch: B.Tech Information Technology | 2026–2030',
            'Institution: Sri Eshwar College of Engineering',
            'Department: Information Technology (IT)',
            'Ecosystem: State-of-the-art coding labs, hackathon mentorship, and technical clubs'
          ],
          visualType: 'GraduationCap',
          extraNote: 'Actively participating in departmental coding contests and peer tech symposiums.'
        }
      },
      {
        id: 'coursework-station',
        stationNumber: 3,
        progress: 0.88,
        kmMarker: 'KM 5.5',
        title: 'Curriculum Coursework & Focus Areas',
        subtitle: 'First-Year Engineering Syllabus & Practical Laboratories',
        categoryTag: 'Academic Focus',
        content: {
          badge: 'ACTIVE COURSEWORK',
          description:
            'Building comprehensive understanding across fundamental engineering subjects and hands-on laboratory programming.',
          highlights: [
            'Programming in C and C++ with data structure implementations',
            'Digital Principles, Boolean logic gates, and Computer Architecture fundamentals',
            'Engineering Mathematics (Linear Algebra, Matrices, Calculus)',
            'Object-Oriented Programming principles and algorithmic problem solving'
          ],
          techStack: ['C Programming', 'C++ OOP', 'Digital Logic', 'Engineering Math', 'Data Structures'],
          visualType: 'Layers',
          extraNote: 'Translating theoretical textbook concepts into functional software code.'
        }
      }
    ]
  },

  achievements: {
    id: 'achievements',
    name: 'Achievements',
    roadTitle: 'ACHIEVEMENT SHOWCASE ROAD',
    roadSubtitle: 'Milestones, hackathon exploration, coding contests, and verified credential vault',
    themeColor: '#f59e0b',
    icon: 'Trophy',
    landmark: 'Hackathon & Milestone Circuit',
    stations: [
      {
        id: 'milestone-init',
        stationNumber: 1,
        progress: 0.22,
        kmMarker: 'KM 1.3',
        title: 'Academic Milestone & Engineering Launch',
        subtitle: 'Enrolling in B.Tech IT & Independent Web/AI Prototyping (2026)',
        categoryTag: 'Academic Milestone',
        content: {
          badge: 'FOUNDATION PHASE',
          description:
            'Initiated formal engineering studies at Sri Eshwar College of Engineering and launched independent software exploration in React and Generative AI, building projects like DeepKart and Padika AI.',
          highlights: [
            'B.Tech IT (2026–2030) at Sri Eshwar College of Engineering',
            'Self-directed transition into modern full-stack web architectures',
            'Development of core algorithmic solutions in C and C++'
          ],
          visualType: 'Sparkles',
          extraNote: 'Marked the beginning of disciplined coding and software development.'
        }
      },
      {
        id: 'hackathon-track',
        stationNumber: 2,
        progress: 0.52,
        kmMarker: 'KM 3.2',
        title: 'Hackathon Participation & Rapid Ideation',
        subtitle: 'Collaborative Problem Solving & Prototyping (2024 – 2025)',
        categoryTag: 'Hackathons',
        content: {
          badge: 'HACKATHON TRACK',
          description:
            'Engaged in hackathon brainstorming, problem statement formulation, and rapid prototype delivery addressing urban parking challenges and autonomous factory scheduling.',
          highlights: [
            'Collaborated with collegiate team members under time constraints',
            'Prototyped FactoryMind AI for autonomous factory optimization',
            'Conceptualized smart infrastructure solutions for Indian municipal challenges'
          ],
          visualType: 'Trophy',
          extraNote: 'Gained invaluable experience in rapid prototyping and technical presentations.'
        }
      },
      {
        id: 'coding-contests',
        stationNumber: 3,
        progress: 0.76,
        kmMarker: 'KM 4.8',
        title: 'Competitive Coding & Algorithmic Practice',
        subtitle: 'Problem Solving in C++ and Python (Active 2025)',
        categoryTag: 'Coding Practice',
        content: {
          badge: 'IN PROGRESS',
          description:
            'Consistent practice solving fundamental algorithmic problems covering arrays, strings, recursion, sorting, and computational complexity on online platforms.',
          highlights: [
            'Daily problem-solving practice in C++ and Python',
            'Strengthening knowledge of time and space algorithmic complexity',
            'Active participant in collegiate coding challenges and departmental contests'
          ],
          visualType: 'Code',
          extraNote: 'Building strong computational foundations for technical excellence.'
        }
      },
      {
        id: 'cert-vault',
        stationNumber: 4,
        progress: 0.94,
        kmMarker: 'KM 6.0',
        title: 'Honors & Credentials Vault',
        subtitle: 'Clearly Marked Placeholders for Verified Certifications',
        categoryTag: 'Verified Vault',
        content: {
          badge: 'EDITABLE PLACEHOLDERS',
          description:
            'In adherence to portfolio integrity guidelines, unverified certificates or competition ranks are marked as transparent placeholders ready to be updated with verified credential IDs.',
          highlights: [
            'Technical Certification Placeholder: Coursera / Cisco / HackerRank (In Progress)',
            'Hackathon / Innovation Contest Placeholder: Tech Symposium Participation',
            'Coding Competition Rank Placeholder: Platform rating badge'
          ],
          visualType: 'Award',
          extraNote: 'Deepak refuses to fabricate course certificates or fake ranks.'
        }
      }
    ]
  },

  hardware: {
    id: 'hardware',
    name: 'Tech Interests',
    roadTitle: 'TECHNOLOGY EXPLORATION ROAD',
    roadSubtitle: 'Beyond software — exploring microcontrollers, IoT sensor networks, and robotics',
    themeColor: '#059669',
    icon: 'Radio',
    landmark: 'Physical Computing Way',
    stations: [
      {
        id: 'bridge-station',
        stationNumber: 1,
        progress: 0.20,
        kmMarker: 'KM 1.1',
        title: 'The Software–Hardware Bridge',
        subtitle: 'How High-Level Code Translates into Physical Real-World Action',
        categoryTag: 'System Architecture',
        content: {
          badge: 'EXPLORATORY INTEREST',
          description:
            'Studying the end-to-end communication stack that allows web dashboards (React/Python) to transmit MQTT/WebSocket packets through edge microcontrollers to actuate physical relays and servos.',
          highlights: [
            'Layer 1: High-Level Web UI (React/Python) transmits telemetry packets',
            'Layer 2: Edge microcontroller firmware (C/C++) parses commands & toggles GPIO pins',
            'Layer 3: Physical actuators (servos, relays) and sensors (ultrasonic, optical) react in real-time'
          ],
          visualType: 'Terminal',
          extraNote: 'Represented as an active learning passion, not completed hardware production.'
        }
      },
      {
        id: 'arduino-station',
        stationNumber: 2,
        progress: 0.45,
        kmMarker: 'KM 2.8',
        title: 'Arduino UNO & AVR Microcontrollers',
        subtitle: '16MHz ATmega328P Architecture & Breadboard Circuitry',
        categoryTag: 'Microcontrollers (Interest)',
        content: {
          badge: 'ACTIVE STUDY',
          description:
            'Investigating digital/analog I/O pins, pulse width modulation (PWM), timer interrupts, and breadboard interfacing with LEDs, resistors, and basic sensors.',
          highlights: [
            '14 Digital I/O pins (6 PWM outputs) and 6 Analog Inputs (10-bit ADC)',
            'Understanding 5V regulated power rails, crystal oscillators, and reset circuitry',
            'Writing low-level C control loops for input sampling and output actuation'
          ],
          techStack: ['Arduino UNO', 'ATmega328P', 'Embedded C', 'PWM Control'],
          visualType: 'Cpu',
          extraNote: 'The foundational microcontroller platform for physical computing exploration.'
        }
      },
      {
        id: 'esp32-station',
        stationNumber: 3,
        progress: 0.70,
        kmMarker: 'KM 4.4',
        title: 'ESP32 SoC & Wireless IoT Telemetry',
        subtitle: 'Dual-Core Tensilica Xtensa LX6 • Wi-Fi & Bluetooth 5.0 LE',
        categoryTag: 'IoT Nodes (Interest)',
        content: {
          badge: 'ACTIVE STUDY',
          description:
            'Exploring connected edge computing nodes: Wi-Fi web servers, MQTT client publishing, deep sleep power management, and wireless sensor telemetry.',
          highlights: [
            'Dual-core 240MHz processing power with integrated Wi-Fi and BLE antennas',
            'FreeRTOS multitasking concepts: managing sensor reading and cloud transmission concurrently',
            'Edge node telemetry streaming for smart city infrastructure concepts'
          ],
          techStack: ['ESP32', 'Wi-Fi / BLE', 'MQTT Protocol', 'FreeRTOS Concepts'],
          visualType: 'Wifi',
          extraNote: 'Explored conceptually in the Smart Street Light and Smart Parking systems.'
        }
      },
      {
        id: 'robotics-station',
        stationNumber: 4,
        progress: 0.92,
        kmMarker: 'KM 5.8',
        title: 'Sensors, Actuators & Robotics Kinematics',
        subtitle: 'Multi-Axis Robotic Kinematics & Environmental Feedback',
        categoryTag: 'Robotics & Sensors',
        content: {
          badge: 'FUTURE FOCUS',
          description:
            'Fascinated by multi-axis articulated arms, servo motor kinematics, and ultrasonic/optical sensors providing automated physical feedback loops.',
          highlights: [
            'Ultrasonic distance sensors for non-contact object and vehicle detection',
            'LDR light-dependent resistors and current telemetry for municipal lighting faults',
            'Forward and inverse kinematics formulas for robotic arm positioning'
          ],
          visualType: 'Bot',
          extraNote: 'A primary career goal: unifying elegant software with autonomous robotics.'
        }
      }
    ]
  },

  contact: {
    id: 'contact',
    name: 'Contact',
    roadTitle: 'CONTACT DESTINATION ROAD',
    roadSubtitle: 'Direct communication channels, resume download, and transmission terminal',
    themeColor: '#06b6d4',
    icon: 'Mail',
    landmark: 'Comms Rest-Stop & Terminal',
    stations: [
      {
        id: 'directory-station',
        stationNumber: 1,
        progress: 0.30,
        kmMarker: 'KM 1.8',
        title: 'Campus Location & Direct Channels',
        subtitle: 'Sri Eshwar College of Engineering • Coimbatore, Tamil Nadu',
        categoryTag: 'Location & Comms',
        content: {
          badge: 'DIRECTORY',
          description:
            'Deepak is based in Coimbatore, Tamil Nadu, studying at Sri Eshwar College of Engineering. Open for student project collaborations, hackathon brainstorming, and technical discussions.',
          highlights: [
            'Institution: Sri Eshwar College of Engineering, Coimbatore, Tamil Nadu',
            'Email: deepak.placeholder@sece.ac.in (Editable Placeholder)',
            'GitHub: github.com/placeholder-deepak (Editable Placeholder)',
            'LinkedIn: linkedin.com/in/placeholder-deepak (Editable Placeholder)'
          ],
          visualType: 'MapPin',
          extraNote: 'Social links are marked as editable placeholders ready to connect.'
        }
      },
      {
        id: 'resume-station',
        stationNumber: 2,
        progress: 0.65,
        kmMarker: 'KM 4.0',
        title: 'Verified Developer Profile & Resume',
        subtitle: 'Download Deepak S’s Complete Academic & Technical Summary',
        categoryTag: 'Curriculum Vitae',
        content: {
          badge: 'RESUME READY',
          description:
            'A clean, structured developer resume document detailing Deepak’s first-year B.Tech IT coursework, technical skills arsenal, 6 active software projects, and physical computing interests.',
          highlights: [
            'Format: Clean, standardized developer text profile (.txt)',
            'Contains verified contact details, academic span (2026–2030), and project features',
            'Instant client-side download with zero remote dependencies'
          ],
          visualType: 'FileDown',
          extraNote: 'Click the Download Resume button on the HUD or Launch page at any time.'
        }
      },
      {
        id: 'terminal-station',
        stationNumber: 3,
        progress: 0.92,
        kmMarker: 'KM 5.8',
        title: 'Encrypted Transmission Terminal',
        subtitle: 'Input Name, Email, Subject & Message for Direct Mail Dispatch',
        categoryTag: 'Transmission Form',
        content: {
          badge: 'TRANSMITTER READY',
          description:
            'A validated client-side communication form that formats inquiries and automatically dispatches them via local storage logging and direct email client fallback.',
          highlights: [
            'Input validation for sender name, comms email, subject, and message packet',
            'Client-side transmission encryption feedback with procedural sound chime',
            'Automated mailto composition so messages reach Deepak directly'
          ],
          visualType: 'Send',
          extraNote: 'Can be easily adapted to backend services like EmailJS or Resend.'
        }
      }
    ]
  },
  certificates: {
    id: 'certificates',
    name: 'Certificates',
    roadTitle: 'CREDENTIALS & CERTIFICATION ROAD',
    roadSubtitle: 'Explore verified hackathon qualifications, memberships & engineering credentials along NH-47',
    themeColor: '#10b981',
    icon: 'Award',
    landmark: 'Accreditation Corridor',
    stations: [
      {
        id: 'cert-igen',
        stationNumber: 1,
        progress: 0.20,
        kmMarker: 'KM 1.2',
        title: 'IGEN Student Member',
        subtitle: 'The Institution of Green Engineers (IGEN) — Valid thru Oct 2027',
        categoryTag: 'Professional Membership',
        content: {
          badge: 'ACTIVE MEMBERSHIP',
          organization: 'The Institution of Green Engineers (IGEN)',
          issueDate: 'Valid thru OCT 2027',
          validity: 'October 2027',
          credentialId: 'IGEN/SM26M0606',
          verificationUrl: 'https://www.theigen.org',
          downloadUrl: '/certificates/igen-student-member.jpg',
          certificateImage: '/certificates/igen-student-member.jpg',
          description:
            'Official Student Membership Certificate awarded by The Institution of Green Engineers (IGEN). Committed to sustainable technological developments, eco-friendly engineering paradigms, and green innovations.',
          highlights: [
            'Membership Category: IGEN Non-Donor Member',
            'Credential ID: IGEN/SM26M0606',
            'Official G Score: 25 in sustainability initiatives',
            'Authorized portal: www.theigen.org (Valid through October 2027)'
          ],
          techStack: ['Green Engineering', 'Sustainability', 'Eco Innovation', 'IGEN Member'],
          visualType: 'Award',
          extraNote: 'Click the certificate image to preview full resolution or download the credential.'
        }
      },
      {
        id: 'cert-boss',
        stationNumber: 2,
        progress: 0.52,
        kmMarker: 'KM 3.1',
        title: 'BOSS $1000 Contributor Hackathon',
        subtitle: 'BOSS Console via Unstop — Certificate of Participation',
        categoryTag: 'Hackathon & Contribution',
        content: {
          badge: 'PARTICIPATION & CONTRIBUTION',
          organization: 'BOSS Console (via Unstop)',
          issueDate: '2025 - 2026',
          credentialId: 'BOSS-SECE-DEEPAK',
          downloadUrl: '/certificates/boss-hackathon-contributor.png',
          certificateImage: '/certificates/boss-hackathon-contributor.png',
          description:
            'Certificate of Participation awarded to Deepak S from Sri Eshwar College of Engineering (SECE) for active participation and open-source contributions in the global BOSS $1000 Contributor Hackathon organized by BOSS Console.',
          highlights: [
            'Organized by BOSS Console via official partner platform Unstop',
            'Represented Sri Eshwar College of Engineering (SECE)',
            'Contributed to developer tools, automation, and real-world software modules',
            'Validated participation and contributor credentials'
          ],
          techStack: ['Open-Source', 'Developer Tooling', 'Hackathon Coding', 'Unstop Platform'],
          visualType: 'Trophy',
          extraNote: 'Click the certificate image to open full resolution lightbox or download.'
        }
      },
      {
        id: 'cert-agentic-ai',
        stationNumber: 3,
        progress: 0.84,
        kmMarker: 'KM 5.0',
        title: 'National Agentic AI Hackathon 2026',
        subtitle: 'Ziro.Digital — National Qualification Rank #132 (Team TRIFORGE)',
        categoryTag: 'National AI Competition',
        content: {
          badge: 'NATIONAL QUALIFICATION RANK #132',
          organization: 'Ziro.Digital',
          issueDate: '2026',
          downloadUrl: '/certificates/national-agentic-ai-hackathon.png',
          certificateImage: '/certificates/national-agentic-ai-hackathon.png',
          description:
            'National Qualification Certificate recognized by Ziro.Digital (#1 AI Career Intelligence Platform). Secured National Qualification Rank #132 with an Overall Evaluation Score of 116 / 180 as Team TRIFORGE.',
          highlights: [
            'National Qualification Rank: #132 out of multi-state collegiate competitors',
            'Overall System Evaluation Score: 116 / 180',
            'Team TRIFORGE Members: Deepak S IT, Anushuvetha SJ, Shanmugi A',
            'Institution: Sri Eshwar College of Engineering (SECE)',
            'Built with AI. Officially Recognized and verified by Ziro.Digital'
          ],
          techStack: ['Agentic AI', 'Autonomous Agents', 'Prompt Architecture', 'Ziro.Digital Platform'],
          visualType: 'Bot',
          extraNote: 'Click to expand high-resolution certificate lightbox or download original credential.'
        }
      }
    ]
  }
};
