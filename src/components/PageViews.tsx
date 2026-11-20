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
        <div className="max-w-2xl rounded-xl border border-[#27272A] bg-[#050505]/92 p-7 sm:p-9">
          <h1
            className="text-[clamp(2.25rem,4.6vw,3.65rem)] font-semibold leading-[1.08] tracking-tight text-[#F5F4F0]"
            style={{ textWrap: 'balance' }}
          >
            {SITE_PROFILE.name}
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#D4D4D8]">
            {SITE_PROFILE.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('blog')}
              className="inline-flex min-h-[42px] items-center rounded-lg bg-[#EAE6DF] px-4 py-2 text-sm font-semibold text-[#050505] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EAE6DF]"
            >
              Blog
            </button>

            <button
              type="button"
              onClick={() => onNavigate('skills')}
              className="inline-flex min-h-[42px] items-center rounded-lg border border-[#27272A] bg-[#050505] px-4 py-2 text-sm font-medium text-[#E4E4E7] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#52525B] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EAE6DF]"
            >
              Skills
            </button>

            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="inline-flex min-h-[42px] items-center text-sm font-medium text-[#D4D4D8] underline decoration-[#52525B] underline-offset-4 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white hover:decoration-[#EAE6DF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EAE6DF]"
            >
              Projects
            </button>
          </div>

          <div className="mt-8 border-t border-[#27272A] pt-5">
            <h2 className="text-xs font-medium text-[#A1A1AA]">Latest Writing</h2>
            <div className="mt-3 space-y-2.5">
              {BLOG_POSTS.map((post) => (
                <button
                  key={post.slug}
                  type="button"
                  onClick={() => onNavigate('blog', post.slug)}
                  className="group flex w-full flex-col gap-1 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-[#0E0E10] sm:flex-row sm:items-center sm:gap-4"
                >
                  <span className="text-xs tabular-nums text-[#A1A1AA] sm:w-32 shrink-0">
                    {post.date}
                  </span>
                  <span className="text-sm font-medium text-[#E4E4E7] transition-colors group-hover:text-white">
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
          <article className="rounded-xl border border-[#27272A] bg-[#050505]/94 p-7 sm:p-10">
            <button
              type="button"
              onClick={() => onNavigate('blog', null)}
              className="inline-flex min-h-[38px] items-center text-sm font-medium text-[#A1A1AA] underline decoration-[#52525B] underline-offset-4 transition-colors hover:text-[#F5F4F0] hover:decoration-[#EAE6DF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EAE6DF]"
            >
              Back to My Blog
            </button>

            <header className="mt-6 border-b border-[#27272A] pb-6">
              <p className="text-xs tabular-nums text-[#A1A1AA]">
                {selectedPost.date}
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#F5F4F0] sm:text-4xl">
                {selectedPost.title}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-[#D4D4D8]">
                {selectedPost.description}
              </p>
            </header>

            {selectedPost.codeBlock && (
              <div className="mt-7 overflow-hidden rounded-xl border border-[#27272A] bg-[#050505]">
                <div className="flex items-center justify-between border-b border-[#27272A] px-4 py-3 text-xs">
                  <span className="text-[#D4D4D8]">
                    {selectedPost.codeBlock.filename} · {selectedPost.codeBlock.language}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(selectedPost.codeBlock!.code)}
                    className="inline-flex min-h-[32px] items-center rounded-md border border-[#27272A] bg-[#050505] px-3 py-1 text-xs font-medium text-[#E4E4E7] transition-colors hover:border-[#52525B] hover:text-white"
                  >
                    {copiedCode ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="overflow-x-auto p-5 text-sm leading-6 text-[#E4E4E7]">
                  <code>{selectedPost.codeBlock.code}</code>
                </pre>
              </div>
            )}

            {selectedPost.sections && (
              <div className="mt-7 space-y-6">
                {selectedPost.sections.map((section) => (
                  <div
                    key={section.heading}
                    className="border-b border-[#27272A] pb-5 last:border-b-0 last:pb-0"
                  >
                    <h2 className="text-xl font-semibold text-[#F2F2F0]">
                      {section.heading}
                    </h2>
                    <p className="mt-2 text-base leading-relaxed text-[#D4D4D8]">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </article>
        ) : (
          <div className="rounded-xl border border-[#27272A] bg-[#050505]/92 p-7 sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#F5F4F0] sm:text-4xl">
              My Blog
            </h1>

            <div className="mt-8 divide-y divide-[#27272A] border-t border-[#27272A]">
              {BLOG_POSTS.map((post) => (
                <button
                  key={post.slug}
                  type="button"
                  onClick={() => onNavigate('blog', post.slug)}
                  className="group flex w-full flex-col justify-between gap-2 py-5 text-left transition-colors sm:flex-row sm:items-center sm:gap-6"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-[#F2F2F0] transition-colors group-hover:text-white">
                      {post.title}
                    </h2>
                    <p className="mt-1 text-sm text-[#A1A1AA]">{post.description}</p>
                  </div>
                  <span className="text-xs tabular-nums text-[#A1A1AA] shrink-0">
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
        <div className="rounded-xl border border-[#27272A] bg-[#050505]/92 p-7 sm:p-10">
          <h1 className="text-3xl font-semibold tracking-tight text-[#F5F4F0] sm:text-4xl">
            Skills
          </h1>

          <div className="mt-8 divide-y divide-[#27272A] border-t border-[#27272A]">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.category}
                className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-12 sm:items-baseline"
              >
                <h2 className="text-sm font-medium text-[#A1A1AA] sm:col-span-3">
                  {group.category}
                </h2>
                <div className="sm:col-span-9">
                  <p className="text-2xl font-semibold text-[#F2F2F0]">
                    {group.items.join(' · ')}
                  </p>
                  <p className="mt-1 text-sm text-[#A1A1AA]">{group.note}</p>
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
      <div className="rounded-xl border border-[#27272A] bg-[#050505]/92 p-7 sm:p-10">
        <h1 className="text-3xl font-semibold tracking-tight text-[#F5F4F0] sm:text-4xl">
          Projects
        </h1>

        <div className="mt-8 border-t border-[#27272A] pt-7">
          <p className="text-2xl font-semibold text-[#F2F2F0]">Coming soon.</p>
          <p className="mt-2 max-w-lg text-base leading-relaxed text-[#A1A1AA]">
            Currently documenting coursework and software engineering builds. Follow ongoing
            repositories directly on GitHub.
          </p>

          <a
            href="https://github.com/zaidandya"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-[40px] items-center rounded-lg border border-[#27272A] bg-[#050505] px-4 py-2 text-sm font-medium text-[#F2F2F0] whitespace-nowrap shrink-0 transition-colors hover:border-[#52525B] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EAE6DF]"
          >
            github.com/zaidandya
          </a>
        </div>
      </div>
    </section>
  );
}
