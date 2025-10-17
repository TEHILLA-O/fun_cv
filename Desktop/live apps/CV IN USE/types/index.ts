export interface Skill {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  category: 'design' | 'data' | 'other';
  color?: string;
  icon?: React.ComponentType<any>;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  skills?: string[];
  active?: boolean;
  location?: string;
  icon: React.ComponentType<any>;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  school?: string;
  location?: string;
  period: string;
  description: string;
  completed?: boolean;
  score?: string;
  icon: React.ComponentType<any>;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'design' | 'data' | 'ui' | 'web';
  github?: string;
  behance?: string;
  figma?: string;
  link?: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: React.ComponentType<any>;
}

export interface UserInfo {
  name: string;
  tagline: string;
  location: string;
  phone?: string;
  email?: string;
  linkedin?: string;
  stats: {
    hp: number;
    maxHp: number;
    mana: number;
    maxMana: number;
    level: number;
    exp?: number;
    race: string;
    class: string;
  };
}
