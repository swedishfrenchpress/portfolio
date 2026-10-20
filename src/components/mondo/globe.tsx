// Dark Reader rewrites stop colors before hydration; let React ignore that.
function Stop(props: React.SVGProps<SVGStopElement>) {
  return <stop suppressHydrationWarning {...props} />;
}

/**
 * The little Earth from the hip-badge masthead: an ocean gradient with
 * turbulence continents and clouds. Every <Globe /> references the shared
 * <GlobeDefs />, which must be mounted once on the page.
 */
export function GlobeDefs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="mondo-ocean" cx="38%" cy="32%" r="75%">
          <Stop offset="0" stopColor="#6ec6ff" />
          <Stop offset=".55" stopColor="#1360c2" />
          <Stop offset="1" stopColor="#04163d" />
        </radialGradient>
        <radialGradient id="mondo-terminator" cx="35%" cy="30%" r="80%">
          <Stop offset=".45" stopColor="#000" stopOpacity="0" />
          <Stop offset="1" stopColor="#000" stopOpacity=".75" />
        </radialGradient>
        <radialGradient id="mondo-spec" cx="32%" cy="26%" r="22%">
          <Stop offset="0" stopColor="#fff" stopOpacity=".9" />
          <Stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <filter id="mondo-land" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".045"
            numOctaves="4"
            seed="11"
          />
          <feColorMatrix values="0 0 0 0 .27  0 0 0 0 .55  0 0 0 0 .2  13 0 0 0 -6.9" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="mondo-cloud" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".07 .14"
            numOctaves="3"
            seed="3"
          />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 9 0 0 -5.2" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}

export function Globe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="49" fill="url(#mondo-ocean)" />
      <circle cx="50" cy="50" r="49" filter="url(#mondo-land)" />
      <circle
        cx="50"
        cy="50"
        r="49"
        filter="url(#mondo-cloud)"
        opacity=".8"
      />
      <circle cx="50" cy="50" r="49" fill="url(#mondo-terminator)" />
      <circle cx="50" cy="50" r="49" fill="url(#mondo-spec)" />
    </svg>
  );
}
