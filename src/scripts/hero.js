import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroSectionWrapper = document.querySelector(".gsap-hero-section-wrapper");
const heroContent = document.querySelector(".gsap-hero-content-animation");

if (heroSectionWrapper && heroContent) {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    const contentYDvh = 13;

    const sync = (self) => {
      gsap.set(heroContent, { y: `${contentYDvh * self.progress}dvh` });
    };

    const st = ScrollTrigger.create({
      trigger: heroSectionWrapper,
      start: "top top",
      end: "bottom top",
      invalidateOnRefresh: true,
      onRefresh: sync,
      onUpdate: sync,
    });

    return () => {
      st.kill();
      gsap.set(heroContent, { clearProps: "transform" });
    };
  });

  requestAnimationFrame(() => ScrollTrigger.refresh());
}
