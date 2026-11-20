/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { AsciiBackground } from './components/AsciiBackground';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { PageViews } from './components/PageViews';
import { RouteKey } from './data/siteData';

function getInitialPlaybackPreference(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return true;
  }
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function parsePathname(pathname: string): {
  route: RouteKey;
  postSlug: string | null;
} {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/skills') {
    return { route: 'skills', postSlug: null };
  }
  if (clean === '/projects') {
    return { route: 'projects', postSlug: null };
  }
  if (clean === '/blog') {
    return { route: 'blog', postSlug: null };
  }
  if (clean.startsWith('/blog/')) {
    return { route: 'blog', postSlug: clean.slice('/blog/'.length) };
  }
  return { route: 'home', postSlug: null };
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(getInitialPlaybackPreference);
  const [{ route, postSlug }, setLocationState] = useState(() =>
    typeof window !== 'undefined'
      ? parsePathname(window.location.pathname)
      : { route: 'home' as RouteKey, postSlug: null }
  );

  useEffect(() => {
    const handlePopState = () => {
      setLocationState(parsePathname(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback(
    (nextRoute: RouteKey, nextSlug: string | null = null) => {
      const nextPath =
        nextRoute === 'home'
          ? '/'
          : nextRoute === 'blog' && nextSlug
            ? `/blog/${nextSlug}`
            : `/${nextRoute}`;

      if (window.location.pathname !== nextPath) {
        window.history.pushState({}, '', nextPath);
      }
      setLocationState({ route: nextRoute, postSlug: nextSlug });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  return (
    <div id="top" className="relative min-h-screen bg-[#050505] text-zinc-100">
      <AsciiBackground isPlaying={isPlaying} />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar
          activeRoute={route}
          onNavigate={(nextRoute) => handleNavigate(nextRoute)}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying((prev) => !prev)}
        />
        <main className="flex-1">
          <PageViews
            activeRoute={route}
            activePostSlug={postSlug}
            onNavigate={handleNavigate}
          />
        </main>
        <Footer
          onNavigate={(nextRoute) => handleNavigate(nextRoute)}
          isPlaying={isPlaying}
        />
      </div>
    </div>
  );
}
