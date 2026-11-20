import { useState } from 'react';
import {
  BLOG_POSTS,
  BlogPost,
  RouteKey,
  SITE_PROFILE,
  SKILL_GROUPS,
} from '../data/siteData';

interface PageViewsProps {
  activeRoute: RouteKey;
  activePostSlug: string | null;
  onNavigate: (route: RouteKey, postSlug?: string | null) => void;
}

export function PageViews({
  activeRoute,
  activePostSlug,
  onNavigate,
}: PageViewsProps) {
  const [copiedCode, setCopiedCode] = useState(false);

  const selectedPost: BlogPost | undefined = activePostSlug
    ? BLOG_POSTS.find((post) => post.slug === activePostSlug)
    : undefined;

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      window.setTimeout(() => setCopiedCode(false), 1800);
    } catch {
      // Clipboard API unavailable
    }
  };

  if (activeRoute === 'home') {
    return (
      <section
        aria-label="Home"
        className="mx-auto flex min-h-[calc(100vh-14rem)] w-full max-w-[1100px] flex-col justify-center px-6 pt-28 pb-16 sm:pt-32"
      >
        <div className="max-w-2xl rounded-2xl border border-white/10 bg-[#07070A]/70 p-7 backdrop-blur-md sm:p-9">
          <h1
            className="text-[clamp(2.25rem,4.6vw,3.65rem)] font-semibold leading-[1.08] tracking-tight text-zinc-50"
            style={{ textWrap: 'balance' }}
          >
            {SITE_PROFILE.name}
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-300">
            {SITE_PROFILE.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('blog')}
              className="inline-flex min-h-[42px] items-center rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-zinc-950 whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              Read Blog
            </button>

            <button
              type="button"
              onClick={() => onNavigate('skills')}
              className="inline-flex min-h-[42px] items-center rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-200 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              Explore Skills
            </button>

            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="inline-flex min-h-[42px] items-center text-sm font-medium text-zinc-300 underline decoration-zinc-600 underline-offset-4 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-orange-400 hover:decoration-orange-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
            >
              Projects
            </button>
          </div>

          <div className="mt-8 border-t border-white/10 pt-5">
            <h2 className="text-xs font-medium text-zinc-400">Latest Writing</h2>
            <div className="mt-3 space-y-2.5">
              {BLOG_POSTS.map((post) => (
                <button
                  key={post.slug}
                  type="button"
                  onClick={() => onNavigate('blog', post.slug)}
                  className="group flex w-full flex-col gap-1 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-white/[0.05] sm:flex-row sm:items-center sm:gap-4"
                >
                  <span className="text-xs tabular-nums text-zinc-400 sm:w-32 shrink-0">
                    {post.date}
                  </span>
                  <span className="text-sm font-medium text-zinc-200 transition-colors group-hover:text-orange-400">
                    {post.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (activeRoute === 'blog') {
    return (
      <section
        aria-label="Blog"
        className="mx-auto min-h-[calc(100vh-14rem)] w-full max-w-[900px] px-6 pt-28 pb-16 sm:pt-32"
      >
        {selectedPost ? (
          <article className="rounded-2xl border border-white/10 bg-[#08080B]/88 p-7 backdrop-blur-md sm:p-10">
            <button
              type="button"
              onClick={() => onNavigate('blog', null)}
              className="inline-flex min-h-[38px] items-center text-sm font-medium text-zinc-400 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-orange-400 hover:decoration-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              Back to My Blog
            </button>

            <header className="mt-6 border-b border-white/10 pb-6">
              <p className="text-xs tabular-nums text-orange-400">
                {selectedPost.date}
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                {selectedPost.title}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-zinc-300">
                {selectedPost.description}
              </p>
            </header>

            {selectedPost.codeBlock && (
              <div className="mt-7 overflow-hidden rounded-xl border border-white/10 bg-[#050507]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-xs">
                  <span className="text-zinc-300">
                    {selectedPost.codeBlock.filename} · {selectedPost.codeBlock.language}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(selectedPost.codeBlock!.code)}
                    className="inline-flex min-h-[32px] items-center rounded-md border border-white/12 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                  >
                    {copiedCode ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="overflow-x-auto p-5 text-sm leading-6 text-zinc-200">
                  <code>{selectedPost.codeBlock.code}</code>
                </pre>
              </div>
            )}

            {selectedPost.sections && (
              <div className="mt-7 space-y-6">
                {selectedPost.sections.map((section, idx) => (
                  <div
                    key={section.heading}
                    className="border-b border-white/10 pb-5 last:border-b-0 last:pb-0"
                  >
                    <h2 className="text-xl font-semibold text-zinc-100">
                      <span className="mr-2 text-sm tabular-nums text-orange-400">
                        0{idx + 1}.
                      </span>
                      {section.heading}
                    </h2>
                    <p className="mt-2 text-base leading-relaxed text-zinc-300">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </article>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#08080B]/85 p-7 backdrop-blur-md sm:p-10">
            <p className="text-xs font-medium text-orange-400">Writing</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              My Blog
            </h1>

            <div className="mt-8 divide-y divide-white/10 border-t border-white/10">
              {BLOG_POSTS.map((post) => (
                <button
                  key={post.slug}
                  type="button"
                  onClick={() => onNavigate('blog', post.slug)}
                  className="group flex w-full flex-col justify-between gap-2 py-5 text-left transition-colors sm:flex-row sm:items-center sm:gap-6"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-zinc-100 transition-colors group-hover:text-orange-400">
                      {post.title}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-400">{post.description}</p>
                  </div>
                  <span className="text-xs tabular-nums text-zinc-400 shrink-0">
                    {post.date}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    );
  }

  if (activeRoute === 'skills') {
    return (
      <section
        aria-label="Skills"
        className="mx-auto min-h-[calc(100vh-14rem)] w-full max-w-[900px] px-6 pt-28 pb-16 sm:pt-32"
      >
        <div className="rounded-2xl border border-white/10 bg-[#08080B]/85 p-7 backdrop-blur-md sm:p-10">
          <p className="text-xs font-medium text-orange-400">Toolkit</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Skills
          </h1>

          <div className="mt-8 divide-y divide-white/10 border-t border-white/10">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.category}
                className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-12 sm:items-baseline"
              >
                <h2 className="text-sm font-medium text-zinc-400 sm:col-span-3">
                  {group.category}
                </h2>
                <div className="sm:col-span-9">
                  <p className="text-2xl font-semibold text-zinc-100">
                    {group.items.join(' · ')}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">{group.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="Projects"
      className="mx-auto min-h-[calc(100vh-14rem)] w-full max-w-[900px] px-6 pt-28 pb-16 sm:pt-32"
    >
      <div className="rounded-2xl border border-white/10 bg-[#08080B]/85 p-7 backdrop-blur-md sm:p-10">
        <p className="text-xs font-medium text-orange-400">Selected Work</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Projects
        </h1>

        <div className="mt-8 border-t border-white/10 pt-7">
          <p className="text-2xl font-semibold text-zinc-100">Coming soon.</p>
          <p className="mt-2 max-w-lg text-base leading-relaxed text-zinc-400">
            Currently documenting coursework and software engineering builds. Follow ongoing
            repositories directly on GitHub.
          </p>

          <a
            href="https://github.com/zaidandya"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-[40px] items-center rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-100 whitespace-nowrap shrink-0 transition-colors hover:border-orange-500/60 hover:text-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            github.com/zaidandya
          </a>
        </div>
      </div>
    </section>
  );
}
