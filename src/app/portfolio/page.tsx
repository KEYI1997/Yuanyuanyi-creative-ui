import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "歷屆實績",
  description: "圓圓乙創意留名的建案行銷與主視覺實績。",
};

export const dynamic = "force-dynamic";

export type PortfolioProject = {
  id: string;
  title: string;
  image: string;
  alt: string;
  positionX: number;
  positionY: number;
  scale: number;
};

const defaultProjects: PortfolioProject[] = [
  { id: "yanmei-qianying", title: "岩美芊映", image: "/images/portfolio/yanmei-qianying.png", alt: "岩美芊映主視覺：金色材質與綠色植物拼貼", positionX: 69.1396, positionY: 57.8362, scale: 1 },
  { id: "le-more", title: "樂MORE", image: "/images/portfolio/le-more.jpg", alt: "樂MORE主視覺：粉彩城市與生活想像", positionX: 50, positionY: 50, scale: 1 },
  { id: "hongtai-zhongli", title: "竑泰中壢山上段", image: "/images/portfolio/hongtai-zhongli.png", alt: "竑泰中壢山上段主視覺：家庭生活與綠意插畫", positionX: 61.4528, positionY: 58.2381, scale: 1.02306 },
];

async function getProjects(): Promise<PortfolioProject[]> {
  return defaultProjects;
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-dark px-5 pb-24 pt-36 text-white sm:px-8 lg:px-12 lg:pb-32 lg:pt-48">
      <div className="mx-auto max-w-[1440px]">
        <AnimateOnScroll>
          <h1 className="text-5xl leading-tight sm:text-6xl lg:text-8xl">歷屆實績</h1>
        </AnimateOnScroll>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6 lg:mt-20 lg:gap-8">
          {projects.map((project, index) => (
            <AnimateOnScroll key={project.id} delay={index * 100}>
              <article className="group">
                <div className="portfolio-media relative aspect-[4/3] overflow-hidden bg-bg-alt">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="portfolio-media object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    style={{ objectPosition: `${project.positionX}% ${project.positionY}%`, transform: `scale(${project.scale})` }}
                  />
                </div>
                <div className="mt-5 border-t border-white/20 pt-4">
                  <h2 className="text-2xl sm:text-3xl">{project.title}</h2>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </main>
  );
}

export { defaultProjects };
