import { JourneyDestination } from '../types';

export const JOURNEY_DESTINATIONS: JourneyDestination[] = [
  {
    id: 'HERO',
    label: 'START // NH-47 TECH RIDE',
    shortLabel: 'START',
    progress: 0.0,
    kmMarker: 'KM 0.0',
    landmark: 'Origin: Coimbatore Road Junction',
    signTitle: 'WELCOME TO TECH RIDE',
    signSubtitle: 'Deepak S • B.Tech IT Student',
    direction: 'straight'
  },
  {
    id: 'ABOUT',
    label: 'ABOUT ME',
    shortLabel: 'ABOUT',
    progress: 0.12,
    kmMarker: 'KM 0.8',
    landmark: 'Sri Eshwar Green Boulevard',
    signTitle: 'ABOUT ME →',
    signSubtitle: 'Digital Identity & Engineer Profile',
    direction: 'right'
  },
  {
    id: 'PROJECTS',
    label: 'PROJECTS',
    shortLabel: 'PROJECTS',
    progress: 0.28,
    kmMarker: 'KM 1.8',
    landmark: 'Innovation Tech Valley',
    signTitle: 'PROJECTS →',
    signSubtitle: '6 Software Platforms & AI Prototypes',
    direction: 'right'
  },
  {
    id: 'SKILLS',
    label: 'SKILLS',
    shortLabel: 'SKILLS',
    progress: 0.44,
    kmMarker: 'KM 2.8',
    landmark: 'Tech Arsenal Junction',
    signTitle: '← SKILLS ARSENAL',
    signSubtitle: 'C, C++, React, AI & Tools',
    direction: 'left'
  },
  {
    id: 'EDUCATION',
    label: 'EDUCATION',
    shortLabel: 'EDUCATION',
    progress: 0.58,
    kmMarker: 'KM 3.7',
    landmark: 'SECE Campus Outer Ring Road',
    signTitle: 'EDUCATION →',
    signSubtitle: 'Sri Eshwar College of Engineering',
    direction: 'right'
  },
  {
    id: 'ACHIEVEMENTS',
    label: 'ACHIEVEMENTS',
    shortLabel: 'JOURNEY',
    progress: 0.72,
    kmMarker: 'KM 4.6',
    landmark: 'Hackathon & Milestone Circuit',
    signTitle: '← ACHIEVEMENTS & JOURNEY',
    signSubtitle: 'Milestones & Coding Competitions',
    direction: 'left'
  },
  {
    id: 'HARDWARE',
    label: 'TECH INTERESTS',
    shortLabel: 'HARDWARE',
    progress: 0.86,
    kmMarker: 'KM 5.5',
    landmark: 'Physical Computing Way',
    signTitle: 'BEYOND SOFTWARE →',
    signSubtitle: 'ESP32, Arduino, IoT & Robotics Interests',
    direction: 'right'
  },
  {
    id: 'CONTACT',
    label: 'CONTACT',
    shortLabel: 'CONTACT',
    progress: 0.98,
    kmMarker: 'KM 6.2',
    landmark: 'Comms Rest-Stop & Terminal',
    signTitle: 'CONTACT TERMINAL ★',
    signSubtitle: 'Transmit Message • Download Resume',
    direction: 'straight'
  }
];
