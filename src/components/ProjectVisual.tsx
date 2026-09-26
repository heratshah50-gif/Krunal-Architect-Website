import Image from "next/image";
import type { Project } from "@/lib/content";

// Shows the project's cover photo when one is set. Until real photos are
// added, draws a monochrome architectural composition that is unique per
// project (derived from its slug), so the layout never shows broken images.

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

export function ProjectVisual({
  project,
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className = "",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  if (project.cover) {
    return (
      <div className={`relative overflow-hidden bg-stone ${className}`}>
        <Image
          src={project.cover}
          alt={`${project.title}, ${project.category.toLowerCase()} project in ${project.location}`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  const rand = hash(project.slug);
  const horizon = 150 + rand() * 60;
  const blocks = Array.from({ length: 3 + Math.floor(rand() * 3) }, () => {
    const w = 60 + rand() * 140;
    const h = 40 + rand() * 110;
    const x = rand() * (400 - w);
    return { x, y: horizon - h, w, h, shade: rand() };
  });
  const sun = { cx: 60 + rand() * 280, cy: 40 + rand() * 50, r: 14 + rand() * 18 };
  const fins = Math.floor(rand() * 10) + 6;

  return (
    <div className={`relative overflow-hidden bg-stone ${className}`}>
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={`${project.title} — illustration`}
        className="absolute inset-0 h-full w-full"
      >
        <rect width="400" height="300" fill="#e7e5e1" />
        <circle cx={sun.cx} cy={sun.cy} r={sun.r} fill="#f7f6f3" />
        {blocks.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={b.shade > 0.5 ? "#1a1a1a" : "#8a8783"} />
            <rect x={b.x + b.w * 0.62} y={b.y} width={b.w * 0.38} height={b.h} fill="#000" opacity="0.18" />
          </g>
        ))}
        {Array.from({ length: fins }, (_, i) => (
          <line
            key={i}
            x1={blocks[0].x + (i * blocks[0].w) / fins}
            x2={blocks[0].x + (i * blocks[0].w) / fins}
            y1={blocks[0].y + 6}
            y2={horizon - 6}
            stroke="#f7f6f3"
            strokeWidth="1"
            opacity="0.35"
          />
        ))}
        <rect x="0" y={horizon} width="400" height={300 - horizon} fill="#cfccc6" />
        <line x1="0" x2="400" y1={horizon} y2={horizon} stroke="#1a1a1a" strokeWidth="1" />
      </svg>
    </div>
  );
}
