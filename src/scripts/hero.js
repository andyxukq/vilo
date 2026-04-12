import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroSectionWrapper = document.querySelector(".gsap-hero-section-wrapper");
const heroContent = document.querySelector(".gsap-hero-content-animation");
const heroSecondaryImage = document.querySelector(".gsap-hero-secondary-image");

function setupHeroScroll({
  heroEl,
  ringImg,
  contentEl,
  contentYDvh,
  ringYDvh,
}) {
  const ringHolder = ringImg.closest(".hero-secondary-image-holder");
  if (!ringHolder) return () => {};

  const moveContent = Boolean(contentEl && contentYDvh);

  const sync = (self) => {
    if (moveContent) {
      gsap.set(contentEl, { y: `${contentYDvh * self.progress}dvh` });
    }
    if (ringHolder.classList.contains("hero-secondary-image-holder--hidden")) return;
    gsap.set(ringImg, { y: `${-ringYDvh * self.progress}dvh` });
  };

  const st = ScrollTrigger.create({
    trigger: heroEl,
    start: "top top",
    end: "bottom top",
    invalidateOnRefresh: true,
    onRefresh: sync,
    onUpdate: sync,
    onLeave() {
      ringHolder.classList.add("hero-secondary-image-holder--hidden");
      gsap.set(ringImg, { clearProps: "transform" });
      if (!moveContent) st.kill();
    },
  });

  return () => {
    st.kill();
    ringHolder.classList.remove("hero-secondary-image-holder--hidden");
    gsap.set(ringImg, { clearProps: "transform" });
    if (moveContent) gsap.set(contentEl, { clearProps: "transform" });
  };
}

if (heroSectionWrapper && heroSecondaryImage) {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () =>
    setupHeroScroll({
      heroEl: heroSectionWrapper,
      ringImg: heroSecondaryImage,
      contentEl: heroContent,
      contentYDvh: 13,
      ringYDvh: 100,
    })
  );

  mm.add("(max-width: 1023px)", () =>
    setupHeroScroll({
      heroEl: heroSectionWrapper,
      ringImg: heroSecondaryImage,
      contentEl: null,
      contentYDvh: 0,
      ringYDvh: 100,
    })
  );

  requestAnimationFrame(() => ScrollTrigger.refresh());
}
