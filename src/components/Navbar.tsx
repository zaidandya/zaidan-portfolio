import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { RouteKey } from '../data/siteData';

interface NavbarProps {
  activeRoute: RouteKey;
  onNavigate: (route: RouteKey) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const NAV_ITEMS: { key: RouteKey; label: string; href: string }[] = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'blog', label: 'Blog', href: '/blog' },
  { key: 'skills', label: 'Skills', href: '/skills' },
  { key: 'projects', label: 'Projects', href: '/projects' },
];

export function Navbar({
  activeRoute,
  onNavigate,
  isPlaying,
  onTogglePlay,
}: NavbarProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const islandRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileExpanded) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileExpanded(false);
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (islandRef.current && !islandRef.current.contains(event.target as Node)) {
        setMobileExpanded(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [mobileExpanded]);

  const activeLabel =
    NAV_ITEMS.find((item) => item.key === activeRoute)?.label ?? 'Home';

  const springTransition = shouldReduceMotion
    ? { duration: 0.01 }
    : { type: 'spring' as const, stiffness: 420, damping: 34, mass: 0.85 };

  const handleSelect = (
    event: React.MouseEvent<HTMLAnchorElement>,
    key: RouteKey
  ) => {
    event.preventDefault();
    onNavigate(key);
    setMobileExpanded(false);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-3 sm:top-4 sm:px-6">
      <motion.nav
        ref={islandRef}
        aria-label="Primary navigation"
        layout
        transition={springTransition}
        className={`pointer-events-auto w-full border border-white/14 bg-[#09090C]/88 backdrop-blur-xl shadow-[0_14px_40px_rgba(0,0,0,0.72)] transition-[max-width,border-color] duration-200 ${
          mobileExpanded
            ? 'max-w-md rounded-[28px] border-white/20 md:max-w-[520px] md:rounded-full'
            : isScrolled
              ? 'max-w-[calc(100vw-24px)] rounded-full sm:max-w-[420px] md:max-w-[480px]'
              : 'max-w-[calc(100vw-24px)] rounded-full sm:max-w-[460px] md:max-w-[520px]'
        }`}
      >
        {/* Top Dynamic Island Bar (zero icons, zero SVG logos, zero user name) */}
        <div
          className={`flex items-center justify-between gap-3 px-4 transition-[height,padding] duration-200 sm:px-5 ${
            isScrolled ? 'h-12 md:h-[52px]' : 'h-[50px] md:h-14'
          }`}
        >
          {/* Mobile Active Page Label */}
          <span className="truncate text-sm font-medium text-zinc-100 md:hidden">
            {activeLabel}
          </span>

          {/* Desktop Route Tabs */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeRoute === item.key;
              return (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => handleSelect(e, item.key)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
                    isActive ? 'text-zinc-50' : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="dynamic-island-route-pill"
                      transition={springTransition}
                      className="absolute inset-0 -z-10 rounded-full bg-white/12"
                    />
                  )}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right: Text-Only Background Motion Toggle + Mobile Expand Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onTogglePlay}
              aria-pressed={isPlaying}
              className="inline-flex min-h-[34px] items-center justify-center rounded-full bg-orange-500 px-4 py-1.5 text-xs font-semibold text-zinc-950 whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>

            <button
              type="button"
              onClick={() => setMobileExpanded((prev) => !prev)}
              aria-expanded={mobileExpanded}
              aria-label={mobileExpanded ? 'Collapse navigation island' : 'Expand navigation island'}
              className="inline-flex min-h-[36px] items-center justify-center rounded-full border border-white/14 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-zinc-100 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-white/25 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 md:hidden"
            >
              {mobileExpanded ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {/* Expanded Dynamic Island Drawer for Mobile & Small Tablets */}
        <AnimatePresence initial={false}>
          {mobileExpanded && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={springTransition}
              className="overflow-hidden border-t border-white/10 md:hidden"
            >
              <div className="flex flex-col gap-1 px-3 py-3">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeRoute === item.key;
                  return (
                    <a
                      key={item.key}
                      href={item.href}
                      onClick={(e) => handleSelect(e, item.key)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex min-h-[44px] items-center justify-between rounded-2xl px-4 text-sm font-medium transition-colors duration-150 ${
                        isActive
                          ? 'bg-white/10 text-zinc-50'
                          : 'text-zinc-300 hover:bg-white/[0.06] hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="text-xs text-orange-400">Active</span>
                      )}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
