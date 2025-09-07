export const steps = [
  {
    icon: 'FileTextIcon',
    title: "Describe",
  description: "Dinos en 1–3 frases qué ofreces, a quién va dirigido y el beneficio clave. Con eso la IA genera la estructura, titulares y propuesta de valor listos para convertir.",
    colors: { bg: 'bg-categorical-blue-light', border: 'border-blue-200', text: 'text-categorical-blue-mid' },
    gradient: 'to-categorical-blue-light',
    displayType: 'typing-prompt',
    displayData: {
      prompts: [
        "SaaS para gestión de equipos: ahorro de tiempo para pymes, integración con Slack y facturación...",
        "Tienda online de cerámica artesanal: productos únicos, envíos internacionales, público femenino 25-45...",
        "App de fitness personalizada: planes por suscripción, planes adaptativos y seguimiento de progreso..."
      ]
    },
    enabled: true,
  },
  {
    icon: 'SparklesIcon',
    title: "Genera",
  description: "En segundos obtienes una landing estructurada: titulares orientados a beneficio, secciones para pruebas sociales y CTAs optimizados para convertir visitantes en leads.",
    colors: { bg: 'bg-categorical-green-light', border: 'border-green-200', text: 'text-categorical-green-mid' },
    gradient: 'to-categorical-green-light',
    displayType: 'video',
    displayData: {
      src: 'https://videos.pexels.com/video-files/853828/853828-hd_1920_1080_25fps.mp4',
      poster: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    enabled: true,
  },
  {
    icon: 'GavelIcon',
    title: "Personaliza",
  description: "Personaliza diseño y copy en nuestro editor visual: arrastra, reemplaza y publica en tiempo real. Mantén coherencia de marca sin tocar código.",
    colors: { bg: 'bg-categorical-violet-light', border: 'border-violet-200', text: 'text-categorical-violet-mid' },
    gradient: 'to-categorical-violet-light',
    displayType: 'ui-editor',
    enabled: true,
  },
  {
    icon: 'HeartHandshakeIcon',
    title: "Conecta",
  description: "Conecta formularios, CRM y herramientas de email para automatizar la captura y nutrición de leads: integraciones nativas con HubSpot, Mailchimp y Zapier.",
    colors: { bg: 'bg-categorical-orange-light', border: 'border-orange-200', text: 'text-categorical-orange-mid' },
    gradient: 'to-categorical-orange-light',
    displayType: 'integration-logos',
    displayData: {
        details: [
            { type: 'img', props: { src: 'https://cdn.simpleicons.org/hubspot/FF7A59', alt: 'Hubspot Logo' } },
            { type: 'img', props: { src: 'https://cdn.simpleicons.org/zapier/FF4A00', alt: 'Zapier Logo' } },
            { type: 'img', props: { src: 'https://cdn.simpleicons.org/slack/4A154B', alt: 'Slack Logo' } },
            { type: 'img', props: { src: 'https://cdn.simpleicons.org/mailchimp/FFE01B', alt: 'Mailchimp Logo' } },
            { type: 'img', props: { src: 'https://cdn.simpleicons.org/notion/000000', alt: 'Notion Logo' } },
            { type: 'img', props: { src: 'https://cdn.simpleicons.org/salesforce/00A1E0', alt: 'Salesforce Logo' } },
        ]
    },
    enabled: true,
  },
  {
    icon: 'TrophyIcon',
    title: "Lanza",
  description: "Publica en tu dominio en un clic (DNS guiado), con SSL y tracking configurado: mide conversiones y empieza a optimizar desde el primer día.",
    colors: { bg: 'bg-categorical-cyan-light', border: 'border-cyan-200', text: 'text-categorical-cyan-mid' },
    gradient: 'to-categorical-cyan-light',
    displayType: 'launch-dashboard',
    displayData: {
      mainKPI: { value: 88, label: 'Tasa de Conversión' },
      secondaryMetrics: [
        { value: 1240, label: 'Visitantes' },
        { value: 312, label: 'Prospectos' }
      ],
      lineChartData: [20, 35, 30, 50, 45, 70, 80] // Represents trend over 7 days
    },
    enabled: true,
  },
  {
    icon: 'FileSearchIcon',
    title: "Optimiza",
  description: "Lanza tests A/B automáticos: la IA prueba variantes de titulares, imágenes y CTAs, y recomienda la versión ganadora con métricas claras.",
    colors: { bg: 'bg-categorical-blue-light', border: 'border-blue-200', text: 'text-categorical-blue-mid' },
    gradient: 'to-categorical-blue-light',
    displayType: 'ab-testing',
    enabled: false,
  },
  {
    icon: 'ArrowLeftRightIcon',
    title: "Identifica",
  description: "Escanea tu web o subida de activos para extraer logo, paleta y tipografías; generamos tres opciones de diseño alineadas a tu marca.",
    colors: { bg: 'bg-categorical-green-light', border: 'border-green-200', text: 'text-categorical-green-mid' },
    gradient: 'to-categorical-green-light',
    displayType: 'brand-scanner',
    enabled: false,
  },
  {
    icon: 'SparklesIcon',
    title: "Ilustra",
  description: "Genera imágenes e iconos a partir de un prompt—variantes optimizadas por formato (hero, thumbnail, social) y libres de problemas de licencia.",
    colors: { bg: 'bg-categorical-violet-light', border: 'border-violet-200', text: 'text-categorical-violet-mid' },
    gradient: 'to-categorical-violet-light',
    displayType: 'image-generation',
    enabled: false,
  }
];