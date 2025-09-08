export interface Template {
  id: number;
  title: string;
  category: string;
  image: string;
  previewImage: string;
  demoUrl: string;
}

export const templates: Template[] = [
  { 
    id: 1, 
    title: "AI Landing Factory", 
    category: "Tecnología", 
    image: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2940&auto=format&fit=crop", 
    previewImage: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2940&auto=format&fit=crop", 
    demoUrl: "https://ai-landingfactory.netlify.app/" 
  },
  { 
    id: 2, 
    title: "InsurePro AI", 
    category: "Seguros", 
    image: "https://images.unsplash.com/photo-1560520450-9a5e2c204608?q=80&w=2940&auto=format&fit=crop", 
    previewImage: "https://images.unsplash.com/photo-1560520450-9a5e2c204608?q=80&w=2940&auto=format&fit=crop", 
    demoUrl: "https://insurepro-ai.netlify.app/" 
  },
  { 
    id: 3, 
    title: "Invercorp", 
    category: "Finanzas", 
    image: "https://images.unsplash.com/photo-1665686310934-865eb9941a1d?q=80&w=2874&auto=format&fit=crop", 
    previewImage: "https://images.unsplash.com/photo-1665686310934-865eb9941a1d?q=80&w=2874&auto=format&fit=crop", 
    demoUrl: "https://invercorp.netlify.app/" 
  },
  { 
    id: 4, 
    title: "Ecuatorianos en Canadá", 
    category: "Comunidad", 
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2940&auto=format&fit=crop", 
    previewImage: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2940&auto=format&fit=crop", 
    demoUrl: "https://ecuadorencanada.com/" 
  },
  { 
    id: 5, 
    title: "DentalCare Landing", 
    category: "Salud", 
    image: "https://images.unsplash.com/photo-1588776814546-da637f43b7fe?q=80&w=2940&auto=format&fit=crop", 
    previewImage: "https://images.unsplash.com/photo-1588776814546-da637f43b7fe?q=80&w=2940&auto=format&fit=crop", 
    demoUrl: "https://dentalcare-landing.netlify.app/" 
  },
  { 
    id: 6, 
    title: "Leadership Landing", 
    category: "Consultoría", 
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2942&auto=format&fit=crop", 
    previewImage: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2942&auto=format&fit=crop", 
    demoUrl: "https://leadership-landing.netlify.app/" 
  },
  { 
    id: 7, 
    title: "Vancouver Coffee", 
    category: "Negocio Local", 
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2787&auto=format&fit=crop", 
    previewImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2787&auto=format&fit=crop", 
    demoUrl: "https://vancouver-coffee-landing.netlify.app/" 
  },
  { 
    id: 8, 
    title: "Freelancer Portfolio", 
    category: "Portfolio", 
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2944&auto=format&fit=crop", 
    previewImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2944&auto=format&fit=crop", 
    demoUrl: "https://freelancer-landing.netlify.app/" 
  },
  { 
    id: 9, 
    title: "Billybon Detalles", 
    category: "E-commerce", 
    image: "https://images.unsplash.com/photo-1599745588545-c9c051a83a18?q=80&w=2940&auto=format&fit=crop", 
    previewImage: "https://images.unsplash.com/photo-1599745588545-c9c051a83a18?q=80&w=2940&auto=format&fit=crop", 
    demoUrl: "https://billybon-detalles.netlify.app/" 
  },
  { 
    id: 10, 
    title: "Vancouver Landings", 
    category: "Agencia", 
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2940&auto=format&fit=crop", 
    previewImage: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2940&auto=format&fit=crop", 
    demoUrl: "https://vancouver-landings.netlify.app/" 
  }
];

export const categories = ["Todos", "Agencia", "Comunidad", "Consultoría", "E-commerce", "Finanzas", "Negocio Local", "Portfolio", "Salud", "Seguros", "Tecnología"];
