export const steps = [
  {
    icon: 'FileTextIcon',
    title: "Describe",
    description: "Cuéntale a nuestra IA sobre tu oferta. Solo unas pocas frases es todo lo que necesita para comenzar a crear tu página de aterrizaje de alta conversión.",
    colors: { bg: 'bg-categorical-blue-light', border: 'border-blue-200', text: 'text-categorical-blue-mid' },
    gradient: 'to-categorical-blue-light',
    displayType: 'typing-prompt',
    displayData: {
      prompts: [
        "Un saas elegante para gestión de proyectos...",
        "Una tienda online de cerámica artesanal...",
        "Una página de aterrizaje para una nueva app de fitness..."
      ]
    },
    enabled: true,
  },
  {
    icon: 'SparklesIcon',
    title: "Genera",
    description: "Observa cómo la IA crea una página de aterrizaje completa (texto, diseño y maquetación) en menos de 60 segundos.",
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
    description: "Usa nuestro editor intuitivo de arrastrar y soltar para ajustar cada detalle a la perfección. No se requiere código.",
    colors: { bg: 'bg-categorical-violet-light', border: 'border-violet-200', text: 'text-categorical-violet-mid' },
    gradient: 'to-categorical-violet-light',
    displayType: 'ui-editor',
    enabled: true,
  },
  {
    icon: 'HeartHandshakeIcon',
    title: "Conecta",
    description: "Integra tus formularios con tus herramientas de marketing y ventas favoritas para automatizar tu flujo de prospectos.",
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
    description: "Publica tu página en un dominio personalizado con un solo clic y comienza a convertir visitantes en clientes.",
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
    description: "Deja que la IA pruebe automáticamente diferentes titulares e imágenes para encontrar la variante que maximiza tus conversiones.",
    colors: { bg: 'bg-categorical-blue-light', border: 'border-blue-200', text: 'text-categorical-blue-mid' },
    gradient: 'to-categorical-blue-light',
    displayType: 'ab-testing',
    enabled: false,
  },
  {
    icon: 'ArrowLeftRightIcon',
    title: "Identifica",
    description: "Nuestra IA analiza tu sitio web para extraer tu logo, colores y tipografías, aplicando tu identidad de marca al instante.",
    colors: { bg: 'bg-categorical-green-light', border: 'border-green-200', text: 'text-categorical-green-mid' },
    gradient: 'to-categorical-green-light',
    displayType: 'brand-scanner',
    enabled: false,
  },
  {
    icon: 'SparklesIcon',
    title: "Ilustra",
    description: "Genera imágenes e iconos únicos y libres de derechos de autor a partir de una simple descripción de texto, directamente en el editor.",
    colors: { bg: 'bg-categorical-violet-light', border: 'border-violet-200', text: 'text-categorical-violet-mid' },
    gradient: 'to-categorical-violet-light',
    displayType: 'image-generation',
    enabled: false,
  }
];