import { LearningItem } from '../types';


export const CURRENTLY_LEARNING_DATA: LearningItem[] = [
  {
    id: 'l1',
    topic: 'Advanced JavaScript',
    category: 'Software Engineering',
    currentFocus: 'Closures, Event Loop, Promises, Async/Await patterns, and Memory profiling in V8 engine.',
    goal: 'Master asynchronous architecture and functional programming paradigms for scalable web apps.',
    progressPercent: 75,
    status: 'Active Study',
    resources: 'MDN Web Docs, JavaScript: The Good Parts, Deep JavaScript'
  },
  {
    id: 'l2',
    topic: 'React & Modern Frontend Architecture',
    category: 'Web Development',
    currentFocus: 'Custom Hooks, Context API, state machines, component memoization, and React 18 concurrent features.',
    goal: 'Build modular, highly responsive, production-ready interactive interfaces with clean UX.',
    progressPercent: 70,
    status: 'Active Study',
    resources: 'Official React Documentation, Vite Ecosystem, Open-Source Repositories'
  },
  {
    id: 'l3',
    topic: 'Full-Stack Web Development',
    category: 'Full-Stack',
    currentFocus: 'RESTful API construction, Express/Node.js backend pipelines, database relational schemas, and auth flow.',
    goal: 'Connect complete frontend web applications with secure server-side logic and databases.',
    progressPercent: 55,
    status: 'Hands-on Practice',
    resources: 'Node.js Documentation, PostgreSQL / MongoDB concepts'
  },
  {
    id: 'l4',
    topic: 'Data Structures & Algorithms (DSA)',
    category: 'Computer Science Core',
    currentFocus: 'Trees, Graphs, Dynamic Programming, Binary Search, and time-space asymptotic complexity in C++.',
    goal: 'Strengthen problem-solving capability for technical interviews and competitive programming.',
    progressPercent: 60,
    status: 'Active Study',
    resources: 'LeetCode, Standard C++ STL, Standard Algorithms Textbooks'
  },
  {
    id: 'l5',
    topic: 'AI / Machine Learning Fundamentals',
    category: 'Artificial Intelligence',
    currentFocus: 'Neural network basics, loss functions, prompt chain frameworks, embeddings, and vector similarity.',
    goal: 'Integrate intelligent reasoning agents and computer vision into software applications.',
    progressPercent: 50,
    status: 'Hands-on Practice',
    resources: 'Fast.ai, DeepLearning.AI, LangChain & OpenAI/Google APIs'
  },
  {
    id: 'l6',
    topic: 'Embedded Systems & Microcontrollers',
    category: 'Hardware & IoT (Interest)',
    currentFocus: 'GPIO pinout control, analog-to-digital conversion, I2C/SPI communication protocols, and basic firmware loop.',
    goal: 'Write low-level firmware to interact with physical sensors and control mechanical outputs.',
    progressPercent: 35,
    status: 'Hands-on Practice',
    resources: 'Arduino Reference, ESP-IDF Docs, Electronics Workbench'
  },
  {
    id: 'l7',
    topic: 'IoT & Robotics Integration',
    category: 'Cyber-Physical Systems (Interest)',
    currentFocus: 'MQTT broker telemetry, Wi-Fi sensor relays, servo kinematics, and telemetry visualizers.',
    goal: 'Unify real-time web telemetry with physical robotics and autonomous smart city sensors.',
    progressPercent: 30,
    status: 'Future Exploration',
    resources: 'Robotics Handbooks, ROS Basics, IoT Architecture Whitepapers'
  }
];
