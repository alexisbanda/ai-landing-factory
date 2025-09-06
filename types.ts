
export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  // Added for modal content
  details?: {
    heading: string;
    points: string[];
    image?: string;
  };
}

export interface Testimonial {
  image: string;
  name: string;
  company: string;
  quote: string;
  designation: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}