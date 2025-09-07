export const steps = [
  {
    icon: 'FileSearchIcon',
    title: "Diagnóstico",
    description: "Todo comienza con nuestro wizard inteligente. En 5 minutos, nos das los detalles clave de tu negocio, objetivos y público. La IA analiza esta información para crear un brief de proyecto preciso.",
    colors: { bg: 'bg-categorical-blue-light', border: 'border-blue-200', text: 'text-categorical-blue-mid' },
    gradient: 'to-categorical-blue-light',
    displayType: 'typing-prompt',
    displayData: {
      prompts: [
        "¿Qué vendes? ¿A quién? ¿Qué problema resuelves?",
        "¿Cuál es tu objetivo principal con esta landing page?",
        "¿Quién es tu cliente ideal? Descríbelo brevemente."
      ]
    },
    enabled: true,
  },
  {
    icon: 'HeartHandshakeIcon',
    title: "Estrategia",
    description: "Un plan de IA es un gran comienzo, pero la experiencia humana es irremplazable. Uno de nuestros estrategas revisará el plan contigo y se asegurará de que cada detalle esté alineado con tu visión.",
    colors: { bg: 'bg-categorical-orange-light', border: 'border-orange-200', text: 'text-categorical-orange-mid' },
    gradient: 'to-categorical-orange-light',
    displayType: 'video',
    displayData: {
      src: 'https://videos.pexels.com/video-files/853828/853828-hd_1920_1080_25fps.mp4',
      poster: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    enabled: true,
  },
  {
    icon: 'SparklesIcon',
    title: "Creación",
    description: "Aquí es donde ocurre la magia. Nuestros agentes de IA, supervisados por desarrolladores expertos, toman el plan y construyen tu landing page. Textos, diseño, código... con la más alta calidad.",
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
  }
];