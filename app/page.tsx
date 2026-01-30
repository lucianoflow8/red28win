"use client";

import Script from "next/script";
import Image from "next/image";
import { useRef } from "react";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
const WHATSAPP_LINK =
  process.env.NEXT_PUBLIC_WA_LINK ||
  "https://wa.me/54911XXXXXXXX?text=Hola%20quiero%20crear%20mi%20cuenta";

const BG_GIF = process.env.NEXT_PUBLIC_BG_GIF || "/bg.gif";

// Poné tu logo en: /public/whatsapp.png
const WA_ICON = "/whatsapp.png";

// Poné tu flecha en: /public/arrow.png
const ARROW_ICON = "/arrow.png";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

function makeEventId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `evt_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export default function Home() {
  // Anti doble click (evita que cuente 2 veces si tocan rápido)
  const lockedRef = useRef(false);

  const onClickWhatsApp = () => {
    if (lockedRef.current) return;
    lockedRef.current = true;
    setTimeout(() => (lockedRef.current = false), 1200);

    const eventID = makeEventId();

    // Dispara Contact SOLO al click
    if (PIXEL_ID && typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Contact", {}, { eventID });
    }

    // Redirige a WhatsApp (o multiagente) después de trackear
    setTimeout(() => {
      window.location.href = WHATSAPP_LINK;
    }, 120);
  };

  return (
    <>
      {/* Fuente alternativa SOLO para la línea "CREÁ TU CUENTA..." */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Meta Pixel base */}
      {PIXEL_ID ? (
        <Script id="fb-pixel">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}

      <div style={styles.wrap}>
        {/* Fondo GIF */}
        <div
          style={{
            ...styles.bg,
            backgroundImage: `url('${BG_GIF}')`,
          }}
          aria-hidden="true"
        />
        {/* Oscurecer un poco para que lea el texto */}
        <div style={styles.overlay} aria-hidden="true" />

        <main style={styles.center}>
          <h1 style={styles.title}>
            CASINO <span style={styles.h24}>24HS</span>
          </h1>

          <button
            id="btn-contact-wa"
            data-event="contact"
            onClick={onClickWhatsApp}
            style={styles.btn}
            className="btn-wa"
          >
            <span style={styles.iconWrap} aria-hidden="true">
              <Image src={WA_ICON} alt="WhatsApp" width={30} height={30} />
            </span>
            CONTACTANOS
          </button>

          {/* Flecha PNG animada (sube y baja) */}
          <div style={styles.arrowWrap} aria-hidden="true">
            <div className="arrow-float">
              <Image src={ARROW_ICON} alt="" width={54} height={54} />
            </div>
          </div>

          <p style={styles.sub}>
            CREÁ TU CUENTA ENVIÁNDONOS UN <span className="wa-glow">WHATSAPP</span>
          </p>

          <p style={styles.legal}>+18 • Jugá responsablemente</p>

          {/* Animaciones y efectos */}
          <style>{`
            @keyframes floatY {
              0%, 100% { transform: translateY(0); opacity: .95; }
              50% { transform: translateY(10px); opacity: 1; }
            }

            .arrow-float {
              animation: floatY 1.05s ease-in-out infinite;
              filter: drop-shadow(0 6px 18px rgba(0,0,0,.6));
            }

            @keyframes glow {
              0%, 100% {
                text-shadow:
                  0 0 6px rgba(37,211,102,.55),
                  0 0 14px rgba(37,211,102,.35),
                  0 0 28px rgba(37,211,102,.22);
              }
              50% {
                text-shadow:
                  0 0 10px rgba(37,211,102,.9),
                  0 0 22px rgba(37,211,102,.65),
                  0 0 44px rgba(37,211,102,.35);
              }
            }

            .wa-glow {
              color: #25D366;
              animation: glow 1.2s ease-in-out infinite;
            }

            .btn-wa {
              transition: transform .12s ease, filter .12s ease;
            }
            .btn-wa:hover {
              transform: translateY(-2px);
              filter: brightness(1.08);
            }
            .btn-wa:active {
              transform: translateY(1px);
              filter: brightness(.98);
            }
          `}</style>
        </main>
      </div>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
    color: "white",
  },
  bg: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transform: "scale(1.04)",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at center, rgba(0,0,0,0.20), rgba(0,0,0,0.78))",
  },
  center: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "clamp(44px, 6vw, 86px)",
    letterSpacing: "1px",
    fontWeight: 900,
    textShadow: "0 10px 32px rgba(0,0,0,0.75)",
  },
  h24: {
    color: "#ff4d7d",
  },

  // Botón más grande
  btn: {
    marginTop: 22,
    border: "none",
    cursor: "pointer",
    padding: "22px 38px",
    borderRadius: 16,
    fontSize: 24,
    fontWeight: 900,
    color: "white",
    background: "linear-gradient(180deg, #3b57ff, #2437b8)",
    boxShadow: "0 18px 48px rgba(0,0,0,.55)",
    display: "inline-flex",
    alignItems: "center",
    gap: 14,
  },

  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 999,
    background: "rgba(0,0,0,.22)",
    display: "grid",
    placeItems: "center",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,.10)",
  },

  arrowWrap: {
    marginTop: 10,
    marginBottom: 14,
    height: 58,
    display: "grid",
    placeItems: "center",
  },

  sub: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 0.5,
    fontFamily: '"Oswald", ui-sans-serif, system-ui',
    textShadow: "0 6px 22px rgba(0,0,0,0.75)",
  },

  legal: {
    marginTop: 14,
    fontSize: 12,
    opacity: 0.85,
  },
};
