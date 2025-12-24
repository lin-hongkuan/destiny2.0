
export interface UserProfile {
  name: string;
  birthDate: string;
  birthTime: string;
  gender: 'male' | 'female' | 'other';
  location?: string;
}

export interface ReadingResult {
  title: string;
  summary: string;
  aspects: {
    label: string;
    content: string;
    score: number;
    icon: string;
  }[];
  advice: string;
  luckyElements: {
    color: string;
    number: string;
    direction: string;
  };
}

export enum FortuneType {
  BAZI = 'bazi',
  ZODIAC = 'zodiac',
  DAILY = 'daily',
  ICHING = 'iching',
  ROMANCE = 'romance'
}
