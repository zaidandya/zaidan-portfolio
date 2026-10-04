export default function Page() {
    const skillCategories = [
        {
            title: "Languages",
            skills: ["TypeScript"],
        },
        {
            title: "Frontend",
            skills: ["Next.js"],
        },
        {
            title: "Backend",
            skills: ["Node.js"],
        },
        {
            title: "Tools",
            skills: ["Git/GitHub"],
        },
    ]
    return (
        <section>
            <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
                Skills
            </h1>
            <div className="space-y-6">
                {skillCategories.map((category) => (
                    <div key={category.title} className="border-b border-neutral-200 pb-6 dark:border-neutral-800 last:border-0">
                        <h2 className="mb-3 text-lg font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                            {category.title}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => (
                                <span key={skill} className="rounded-md bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-800 dark:bg-neutral-800/80 dark:text-neutral-200">
                                    {skill}
                                </span>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}