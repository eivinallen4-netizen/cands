import { ourWork as copy } from "@/content/pages";
import { primaryNav } from "@/content/nav";
import { LineText } from "@/components/ReviewMode";
import { pageMetadata } from "@/lib/seo";
import { cropped } from "@/lib/work";
import PageIntro from "@/components/PageIntro";
import WorkGallery from "@/components/WorkGallery";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMetadata({ absoluteTitle: copy.seo.title, description: copy.seo.description, path: "/our-work" });

const crumb = primaryNav.find((n) => n.href === "/our-work")!;
// Real photos only; the Nova pair uses the cropped, same-size 4:3 versions.
const projects = copy.projects.map((p) => ({ ...p, images: p.images.map((img) => ({ ...img, src: cropped(img.src) })) }));

// Pattern: paired comparisons + full-screen viewer. No filter chips while there is one project.
export default function OurWork() {
  return (
    <>
      <PageIntro crumbs={[crumb]} h1={copy.h1} lead={copy.intro} />
      <section aria-label={copy.h1} className="py-14 md:py-24">
        <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
          <WorkGallery projects={projects} labels={copy.viewer} />
        </div>
      </section>
      <CtaBand heading={copy.sendYours.heading} body={<LineText line={copy.sendYours.body} />} buttons={[copy.sendYours.primary, copy.sendYours.secondary]} />
    </>
  );
}
