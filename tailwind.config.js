/* Configuração do Tailwind (CDN).
   Precisa ser carregada logo APÓS o script do Tailwind e ANTES do conteúdo da página,
   por isso NÃO usa "defer" no index.html. */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-surface": "#1f1b16",
        "surface-container-highest": "#ebe1d9",
        "error": "#ba1a1a",
        "surface": "#fff8f4",
        "inverse-surface": "#352f2a",
        "outline-variant": "#cfc5bb",
        "tertiary-fixed-dim": "#c3c6cf",
        "surface-container-high": "#f1e6de",
        "on-secondary": "#ffffff",
        "primary": "#483f33",
        "secondary": "#645e51",
        "surface-container-lowest": "#ffffff",
        "on-primary": "#ffffff",
        "on-error-container": "#93000a",
        "error-container": "#ffdad6",
        "secondary-fixed": "#eae2d1",
        "on-tertiary-fixed-variant": "#43474e",
        "surface-dim": "#e2d8d0",
        "on-primary-fixed": "#221a10",
        "on-primary-container": "#daccbb",
        "on-secondary-container": "#6a6456",
        "background": "#fff8f4",
        "on-tertiary-fixed": "#181c22",
        "primary-container": "#605649",
        "primary-fixed": "#efe0cf",
        "tertiary": "#3d4147",
        "on-tertiary": "#ffffff",
        "on-secondary-fixed-variant": "#4b463a",
        "inverse-on-surface": "#f9efe7",
        "surface-tint": "#675d50",
        "on-tertiary-container": "#cbced7",
        "tertiary-fixed": "#dfe2eb",
        "secondary-container": "#eae2d1",
        "secondary-fixed-dim": "#cec6b5",
        "surface-container": "#f6ece4",
        "surface-bright": "#fff8f4",
        "tertiary-container": "#54585f",
        "on-primary-fixed-variant": "#4f4539",
        "inverse-primary": "#d2c4b4",
        "on-background": "#1f1b16",
        "outline": "#7d766d",
        "surface-container-low": "#fcf2ea",
        "on-surface-variant": "#4c463e",
        "primary-fixed-dim": "#d2c4b4",
        "on-secondary-fixed": "#1f1b11",
        "surface-variant": "#ebe1d9",
        "on-error": "#ffffff",
        "accent": "#FF9CA6",
        "accent-pink": "#FF9CA6",
        "brand-pink": "#FF9CA6"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
        card: "2rem"
      },
      spacing: {
        xl: "2.5rem",
        gutter: "1.5rem",
        md: "1rem",
        lg: "1.5rem",
        "container-max": "1200px",
        sm: "0.5rem",
        xs: "0.25rem"
      },
      fontFamily: {
        "label-md": ["Work Sans", "sans-serif"],
        "body-md": ["Work Sans", "sans-serif"],
        "headline-lg-mobile": ["Plus Jakarta Sans", "sans-serif"],
        "headline-md": ["Plus Jakarta Sans", "sans-serif"],
        "display-lg": ["Plus Jakarta Sans", "sans-serif"],
        "headline-lg": ["Plus Jakarta Sans", "sans-serif"],
        "body-lg": ["Work Sans", "sans-serif"]
      },
      fontSize: {
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.05em", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "headline-lg-mobile": ["28px", { lineHeight: "36px", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg": ["32px", { lineHeight: "40px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }]
      }
    }
  }
};
