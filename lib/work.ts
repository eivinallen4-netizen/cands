import { ourWork } from "@/content/pages";
import { home } from "@/content/home";

// The owner's real Nova pair, using the asset maker's cropped, same-size 4:3 versions.
const CROPPED: Record<string, string> = {
  "/images/nova-before.jpg": "/images/work/nova-before.jpg",
  "/images/nova-after.jpg": "/images/work/nova-after.jpg",
};
export const cropped = (src: string) => CROPPED[src] ?? src;

const [before, after] = ourWork.projects[0].images;
export const novaPair = {
  before: { ...before, src: cropped(before.src), caption: home.beforeAfter.captions.before },
  after: { ...after, src: cropped(after.src), caption: home.beforeAfter.captions.after },
};
