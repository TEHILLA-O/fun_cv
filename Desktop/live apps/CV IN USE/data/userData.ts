import { Skill, Experience, Education, Project, SocialLink } from '../types';
import { 
  Briefcase, 
  Palette, 
  BarChart3, 
  Code, 
  Monitor, 
  Figma, 
  PencilRuler, 
  Database, 
  GraduationCap,
  MapPin,
  Mail,
  Github,
  Linkedin,
  ExternalLink
} from 'lucide-react';

export const userInfo = {
  name: 'Obanor Tehilla, MSc',
  tagline: 'Enthusiastic postgraduate graduate with expertise in data analysis, financial technology, and quantitative research. Transforming complex data into actionable business insights.',
  location: 'London, UK',
  email: 'tehillaobanor@gmail.com',
  linkedin: 'https://www.linkedin.com/in/tehilla-obanor',
  stats: {
    hp: 98,
    maxHp: 100,
    mana: 92,
    maxMana: 100,
    level: 23,
    exp: 2025,
    race: 'Human',
    class: 'Tech/Finance / UI Designer'
  }
};

export const skills: Skill[] = [
  // Core Data & Analytics Skills
  { id: 'data-analysis', name: 'Data Analysis', level: 9.5, maxLevel: 10, category: 'data', color: '#00FF9D', icon: BarChart3 },
  { id: 'python', name: 'Python', level: 8.5, maxLevel: 10, category: 'data', color: '#4B8BBE', icon: Code },
  { id: 'sql', name: 'SQL', level: 8.5, maxLevel: 10, category: 'data', color: '#DE8C02', icon: Database },
  { id: 'tableau', name: 'Tableau', level: 8, maxLevel: 10, category: 'data', color: '#5C6BC0', icon: BarChart3 },
  { id: 'powerbi', name: 'Power BI', level: 8, maxLevel: 10, category: 'data', color: '#F2C811', icon: BarChart3 },
  { id: 'data-viz', name: 'Data Visualization', level: 9, maxLevel: 10, category: 'data', color: '#00C853', icon: BarChart3 },
  { id: 'data-modeling', name: 'Data Modeling', level: 8.5, maxLevel: 10, category: 'data', color: '#FF6B6B', icon: Database },
  { id: 'statistics', name: 'Statistics', level: 9, maxLevel: 10, category: 'data', color: '#4ECDC4', icon: BarChart3 },
  
  // Financial & Research Skills
  { id: 'financial-analysis', name: 'Financial Analysis', level: 8.5, maxLevel: 10, category: 'other', color: '#4CAF50', icon: BarChart3 },
  { id: 'quantitative-research', name: 'Quantitative Research', level: 9, maxLevel: 10, category: 'other', color: '#9C27B0', icon: BarChart3 },
  { id: 'risk-assessment', name: 'Risk Assessment', level: 8.5, maxLevel: 10, category: 'other', color: '#FF9800', icon: BarChart3 },
  { id: 'economics', name: 'Economics', level: 9, maxLevel: 10, category: 'other', color: '#2196F3', icon: BarChart3 },
  { id: 'database-management', name: 'Database Management', level: 8, maxLevel: 10, category: 'other', color: '#607D8B', icon: Database },
  
  // Programming & Technical
  { id: 'r', name: 'R Programming', level: 7.5, maxLevel: 10, category: 'data', color: '#276DC3', icon: Code },
  { id: 'machine-learning', name: 'Machine Learning', level: 7, maxLevel: 10, category: 'data', color: '#E91E63', icon: Code },
  { id: 'excel', name: 'Advanced Excel', level: 9, maxLevel: 10, category: 'data', color: '#2E7D32', icon: BarChart3 },
  
  // Design & Visualization
  { id: 'davinci', name: 'DaVinci Resolve', level: 6.2, maxLevel: 10, category: 'design', color: '#FF4B4B', icon: Monitor },
  { id: 'figma', name: 'Figma', level: 8, maxLevel: 10, category: 'design', color: '#A259FF', icon: Figma },
  { id: 'photoshop', name: 'Photoshop', level: 7.5, maxLevel: 10, category: 'design', color: '#31A8FF', icon: Palette },
  { id: 'powerpoint', name: 'Microsoft PowerPoint', level: 8.5, maxLevel: 10, category: 'design', color: '#FF6347', icon: PencilRuler },
  { id: 'canva', name: 'Canva', level: 8, maxLevel: 10, category: 'design', color: '#00C4CC', icon: Palette },
  { id: 'ui-design', name: 'UI Design', level: 8, maxLevel: 10, category: 'design', color: '#00FF9D', icon: Figma },
  { id: 'business-intelligence', name: 'Business Intelligence', level: 8.5, maxLevel: 10, category: 'other', color: '#00FF9D', icon: BarChart3 },
];

export const experiences: Experience[] = [
  {
    id: 'event-planner-conveenie',
    title: 'Event Planner',
    company: 'Conveenie',
    location: 'London, UK',
    period: 'January 2025 - April 2025',
    description: 'Marketing & Design Department - Planning and coordinating corporate events, managing marketing campaigns, and creating visual materials for brand promotion. Developing event strategies and ensuring seamless execution of marketing initiatives.',
    skills: ['Event Planning', 'Marketing', 'Design', 'Project Management', 'Brand Promotion', 'Visual Communication'],
    active: true,
    icon: Briefcase
  },
  {
    id: 'auditor-intern-ptdf',
    title: 'Auditor Intern',
    company: 'Petroleum Technology Development Fund',
    location: 'Abuja, Nigeria',
    period: 'February 2023 - December 2023',
    description: 'Supported team to strengthen internal controls and departmental processes to bring errors to near-zero. Assisted in compiling and organizing extracted data for review and analysis, and prepared comprehensive audit reports facilitating accurate measurement of audit findings against set KPIs.',
    skills: ['Audit', 'Financial Analysis', 'Risk Assessment', 'Data Compilation', 'Report Writing'],
    active: false,
    icon: Briefcase
  },
  {
    id: 'data-analysis-intern-brekete',
    title: 'Data Analysis Intern',
    company: 'Brekete Techpat',
    location: 'Abuja, Nigeria',
    period: 'July 2020 - August 2021',
    description: 'Compiled and organized complex data sets from multiple sources, achieving a 20% improvement in data processing efficiency through automated extraction techniques. Conducted in-depth data analysis using Python, SQL, and Tableau, resulting in a 15% reduction in reporting turnaround time.',
    skills: ['Python', 'SQL', 'Tableau', 'Data Analysis', 'Machine Learning', 'Excel'],
    active: false,
    icon: BarChart3
  }
];

export const education: Education[] = [
  {
    id: 'masters-fintech',
    degree: 'MSc Fintech',
    institution: 'Coventry University',
    school: 'Coventry University',
    location: 'London, UK',
    period: '2024 - 2025',
    description: 'Advanced studies in financial technology, digital innovation, and data analysis in the financial sector.',
    completed: true,
    score: 'Graduated',
    icon: GraduationCap
  },
  {
    id: 'bachelors-economics',
    degree: 'BSc Economics',
    institution: 'Covenant University',
    school: 'Covenant University',
    location: 'Nigeria',
    period: '2018 - 2022',
    description: 'Comprehensive study of economic theory, quantitative methods, and policy analysis.',
    completed: true,
    score: 'Graduated',
    icon: GraduationCap
  }
];

export const projects: Project[] = [
  {
    id: 'audit-efficiency-system',
    title: 'Audit Process Optimization System',
    description: 'Developed automated data extraction and analysis system that improved audit reporting accuracy by 20% and reduced analysis time by 15% for PTDF internal controls.',
    image: '/ChatGPT Image Aug 22, 2025, 01_41_21 PM.png',
    category: 'data',
    github: 'https://github.com/tehilla/audit-system',
    link: 'https://audit-demo.vercel.app'
  },
  {
    id: 'financial-forecasting-model',
    title: 'Financial Forecasting Model',
    description: 'Machine learning model for predicting future expenses with 75% accuracy, leading to 20% improvement in budgeting precision using Python and advanced statistical methods.',
    image: '/ChatGPT Image Aug 22, 2025, 01_41_21 PM.png',
    category: 'data',
    github: 'https://github.com/tehilla/financial-forecasting',
    link: 'https://forecasting-demo.vercel.app'
  },
  {
    id: 'data-processing-automation',
    title: 'Corporate Data Processing Automation',
    description: 'Automated analysis and update system for 900+ corporate files, reducing errors by 15% and improving data integrity using advanced Excel functions and Python scripts.',
    image: '/ChatGPT Image Aug 22, 2025, 01_41_21 PM.png',
    category: 'data',
    github: 'https://github.com/tehilla/data-automation',
    link: 'https://data-automation.vercel.app'
  },
  {
    id: 'fintech-dashboard',
    title: 'FinTech Analytics Dashboard',
    description: 'Interactive dashboard for analyzing financial data and market trends using Python, SQL, and Tableau with real-time data visualization capabilities.',
    image: '/ChatGPT Image Aug 22, 2025, 01_41_21 PM.png',
    category: 'data',
    github: 'https://github.com/tehilla/fintech-dashboard',
    link: 'https://fintech-demo.vercel.app'
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity Design',
    description: 'Complete brand identity package including logo, color palette, and marketing materials.',
    image: '/ChatGPT Image Aug 22, 2025, 01_41_21 PM.png',
    category: 'design',
    behance: 'https://behance.net/tehilla/brand-identity'
  },
  {
    id: 'mobile-app-ui',
    title: 'Mobile Banking App UI',
    description: 'User interface design for a mobile banking application with focus on accessibility and user experience.',
    image: '/ChatGPT Image Aug 22, 2025, 01_41_21 PM.png',
    category: 'ui',
    figma: 'https://figma.com/tehilla/banking-app'
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'Personal portfolio website built with React and Next.js, featuring responsive design and smooth animations.',
    image: '/ChatGPT Image Aug 22, 2025, 01_41_21 PM.png',
    category: 'web',
    github: 'https://github.com/tehilla/portfolio',
    link: 'https://tehilla.dev'
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
    image: '/ChatGPT Image Aug 22, 2025, 01_41_21 PM.png',
    category: 'web',
    github: 'https://github.com/tehilla/ecommerce-platform',
    link: 'https://ecommerce-demo.vercel.app'
  },
  {
    id: 'data-visualization',
    title: 'Climate Data Visualization',
    description: 'Interactive data visualization showing climate change trends over the past 50 years using D3.js.',
    image: '/ChatGPT Image Aug 22, 2025, 01_41_21 PM.png',
    category: 'data',
    github: 'https://github.com/tehilla/climate-viz',
    link: 'https://climate-viz.vercel.app'
  },
  {
    id: 'mobile-game-ui',
    title: 'Mobile Game UI Design',
    description: 'Complete UI/UX design for a fantasy RPG mobile game including character screens, inventory, and battle interfaces.',
    image: '/ChatGPT Image Aug 22, 2025, 01_41_21 PM.png',
    category: 'ui',
    figma: 'https://figma.com/tehilla/rpg-game-ui',
    behance: 'https://behance.net/tehilla/game-ui'
  },
  {
    id: 'ai-chatbot',
    title: 'AI Customer Service Bot',
    description: 'Intelligent chatbot powered by machine learning for customer support with natural language processing.',
    image: '/ChatGPT Image Aug 22, 2025, 01_41_21 PM.png',
    category: 'web',
    github: 'https://github.com/tehilla/ai-chatbot',
    link: 'https://chatbot-demo.vercel.app'
  },
  {
    id: 'print-design',
    title: 'Magazine Layout Design',
    description: 'Editorial design for tech magazine featuring modern typography, grid systems, and visual hierarchy.',
    image: '/ChatGPT Image Aug 22, 2025, 01_41_21 PM.png',
    category: 'design',
    behance: 'https://behance.net/tehilla/magazine-design'
  },
  {
    id: 'crypto-tracker',
    title: 'Cryptocurrency Tracker',
    description: 'Real-time cryptocurrency price tracking app with portfolio management and market analysis features.',
    image: '/ChatGPT Image Aug 22, 2025, 01_41_21 PM.png',
    category: 'web',
    github: 'https://github.com/tehilla/crypto-tracker',
    link: 'https://crypto-tracker.vercel.app'
  },
  {
    id: 'restaurant-app',
    title: 'Restaurant Mobile App',
    description: 'Food delivery and restaurant management app with order tracking, payment integration, and real-time updates.',
    image: '/ChatGPT Image Aug 22, 2025, 01_41_21 PM.png',
    category: 'ui',
    figma: 'https://figma.com/tehilla/restaurant-app',
    behance: 'https://behance.net/tehilla/restaurant-ui'
  },
  {
    id: 'blockchain-dapp',
    title: 'Blockchain DApp',
    description: 'Decentralized application for NFT marketplace with smart contracts, wallet integration, and gas optimization.',
    image: '/ChatGPT Image Aug 22, 2025, 01_41_21 PM.png',
    category: 'web',
    github: 'https://github.com/tehilla/nft-marketplace',
    link: 'https://nft-marketplace.vercel.app'
  },
  {
    id: 'social-media-dashboard',
    title: 'Social Media Analytics',
    description: 'Comprehensive social media management dashboard with analytics, scheduling, and engagement tracking.',
    image: '/ChatGPT Image Aug 22, 2025, 01_41_21 PM.png',
    category: 'data',
    github: 'https://github.com/tehilla/social-dashboard',
    link: 'https://social-dashboard.vercel.app'
  },
  {
    id: 'fitness-app-ui',
    title: 'Fitness App Interface',
    description: 'Modern fitness tracking app UI with workout plans, progress tracking, and social features.',
    image: '/ChatGPT Image Aug 22, 2025, 01_41_21 PM.png',
    category: 'ui',
    figma: 'https://figma.com/tehilla/fitness-app',
    behance: 'https://behance.net/tehilla/fitness-ui'
  },
  {
    id: 'machine-learning-model',
    title: 'ML Stock Predictor',
    description: 'Machine learning model for stock price prediction using LSTM neural networks and technical indicators.',
    image: '/ChatGPT Image Aug 22, 2025, 01_41_21 PM.png',
    category: 'data',
    github: 'https://github.com/tehilla/stock-predictor',
    link: 'https://stock-predictor.vercel.app'
  }
];

export const socialLinks: SocialLink[] = [
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:tehillaobanor@gmail.com',
    icon: Mail
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/tehilla-obanor',
    icon: Linkedin
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/TEHILLA-O',
    icon: Github
  }
];