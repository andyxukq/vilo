import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroSectionWrapper = document.querySelector(".gsap-hero-section-wrapper");
const heroContent = document.querySelector(".gsap-hero-content-animation");
const heroImageHolder = document.querySelector(".gsap-hero-image-holder");
const heroSecondaryImage = document.querySelector(".gsap-hero-secondary-image");

let mm = gsap.matchMedia();

mm.add("(min-width: 1024px)", () => {
  ScrollTrigger.create({
    trigger: heroSectionWrapper,
    start: "top top",
    end: "bottom bottom",
    pin: heroContent,
    pinSpacing: false,
    scrub: 1,
  });

  const nodes = [
    ".hero-section-title",
    ".hero-section-subhead",
    ".hero-section-ctas",
  ];
  ScrollTrigger.create({
    trigger: heroSectionWrapper,
    start: "70% top",
    onEnter: () => {
      gsap.to(nodes, {
        opacity: 0,
        y: -30,
        stagger: 0.1,
        duration: 0.4,
        overwrite: "auto",
      });
    },
    onLeaveBack: () => {
      gsap.to(nodes, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.4,
        overwrite: "auto",
      });
    },
  });

  ScrollTrigger.create({
    trigger: heroSectionWrapper,
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
    animation: gsap.to(heroSecondaryImage, { y: "-120dvh" }),
  });
});

mm.add("(max-width: 1023px)", () => {
  ScrollTrigger.create({
    trigger: heroSectionWrapper,
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
    animation: gsap.to(heroSecondaryImage, { y: "-100dvh" }),
  });
});
