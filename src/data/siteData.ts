export type RouteKey = 'home' | 'blog' | 'skills' | 'projects';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  codeBlock?: {
    language: string;
    filename: string;
    code: string;
  };
  sections?: {
    heading: string;
    body: string;
  }[];
}

export interface SkillGroup {
  category: string;
  items: string[];
  note: string;
}

export const SITE_PROFILE = {
  name: 'Zaidan Dhiyaurrahman',
  tagline:
    "I'm a 3rd semester Information System & Technology student at Institut Teknologi Bandung. I'm interested in software engineering.",
  location: 'Bandung, Indonesia',
  institution: 'Institut Teknologi Bandung',
  program: 'Information System & Technology',
  semester: 'Semester 3',
  email: 'zdndya@gmail.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/zaidandya', handle: '@zaidandya' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/zaidandya/', handle: 'in/zaidandya' },
    { label: 'Instagram', href: 'https://instagram.com/zaidandya/', handle: '@zaidandya' },
    { label: 'Gmail', href: 'mailto:zdndya@gmail.com', handle: 'zdndya@gmail.com' },
  ],
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'code-snippet',
    title: 'Testing code snippet',
    date: 'October 4, 2026',
    description: 'Testing code snippet in mdx.',
    codeBlock: {
      language: 'Java',
      filename: 'Main.java',
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    },
  },
  {
    slug: 'midterm-prep',
    title: 'Preparing for midterm exam',
    date: 'October 4, 2026',
    description:
      "I should've been preparing for midterm exam, but I didn't do anything because of procrastination.",
    sections: [
      {
        heading: 'What should I prepare for midterm exam',
        body: 'Review core lecture material, trace through past problem sets, and write out practice solutions by hand before exam week.',
      },
      {
        heading: "Why I haven't done anything for preparation",
        body: 'Putting off difficult topics makes starting feel heavier than it is, turning small daily review sessions into last-minute pressure.',
      },
      {
        heading: 'Why should I start doing preparation',
        body: 'Consistent preparation builds genuine intuition across coursework and removes unnecessary guesswork during exams.',
      },
      {
        heading: 'How can I improve my schedule',
        body: 'Block fixed 45-minute study windows each evening with zero distractions and track completed problem sets one topic at a time.',
      },
    ],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['TypeScript'],
    note: 'Typed application logic, schemas, and tooling.',
  },
  {
    category: 'Frontend',
    items: ['Next.js'],
    note: 'App Router interfaces, static generation, and responsive layouts.',
  },
  {
    category: 'Backend',
    items: ['Node.js'],
    note: 'Server-side runtimes, API routes, and service architecture.',
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub'],
    note: 'Version control workflows, branching, and collaboration.',
  },
];
