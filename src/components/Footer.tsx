import { useEffect, useRef, useState } from 'react';
import { RouteKey, SITE_PROFILE } from '../data/siteData';

interface FooterProps {
  onNavigate: (route: RouteKey) => void;
  isPlaying: boolean;
}

const FOOTER_GOLDFISH_SRC = '/assets/devault-ascii-tiles-u-pa7qt6jf_a2570146.mp4';

export function Footer({ onNavigate, isPlaying }: FooterProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
        });
      }
    } else {
      video.pause();
    }
  }, [isPlaying]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
    }
  };

  return (
    <footer className="relative z-10 flex min-h-[460px] flex-col justify-between overflow-hidden border-t border-[#27272A] bg-[#050505] lg:min-h-[540px]">
      <div
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          src={FOOTER_GOLDFISH_SRC}
          autoPlay={isPlaying}
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-[#050505]/45" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 pt-16 pb-10 sm:pt-20">
        <div className="flex justify-end">
          <div className="grid grid-cols-2 gap-8 sm:gap-12">
            <div className="w-full max-w-[150px]">
              <h3 className="text-sm font-semibold text-zinc-50">Pages</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('home')}
                    className="transition-colors duration-150 hover:text-zinc-100"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('blog')}
                    className="transition-colors duration-150 hover:text-zinc-100"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('skills')}
                    className="transition-colors duration-150 hover:text-zinc-100"
                  >
                    Skills
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('projects')}
                    className="transition-colors duration-150 hover:text-zinc-100"
                  >
                    Projects
                  </button>
                </li>
              </ul>
            </div>

            <div className="w-full max-w-[160px]">
              <h3 className="text-sm font-semibold text-zinc-50">Socials</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
                {SITE_PROFILE.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-150 hover:text-zinc-100"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col items-start justify-between gap-4 px-6 pb-8 pt-6 text-xs text-zinc-400 sm:flex-row sm:items-center">
        <p>© 2026 {SITE_PROFILE.name}</p>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="underline decoration-[#52525B] underline-offset-4 transition-colors hover:text-[#F2F2F0] hover:decoration-[#EAE6DF]"
          >
            {copiedEmail ? `Copied ${SITE_PROFILE.email}` : SITE_PROFILE.email}
          </button>

          <a
            href="#top"
            className="underline decoration-[#52525B] underline-offset-4 transition-colors hover:text-[#F2F2F0] hover:decoration-[#EAE6DF]"
          >
            Back to Top
          </a>
        </div>
      </div>
    </footer>
  );
}
