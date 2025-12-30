import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroSectionWrapper = document.querySelector(".gsap-hero-section-wrapper");
const heroContent = document.querySelector(".gsap-hero-content-animation");
const heroSecondaryImage = document.querySelector(".gsap-hero-secondary-image");

let mm = gsap.matchMedia();

mm.add("(min-width: 1024px)", () => {

  ScrollTrigger.create({
    trigger: heroSectionWrapper,
    start: "top top",
    end: "bottom top",
    scrub: 1,
    animation: gsap.to(heroContent, { y: "33dvh" }),
  });

  ScrollTrigger.create({
    trigger: heroSectionWrapper,
    start: "top top",
    end: "bottom top",
    scrub: 1,
    animation: gsap.to(heroSecondaryImage, { y: "-120dvh" }),
  });
});

mm.add("(max-width: 1023px)", () => {
  ScrollTrigger.create({
    trigger: heroSectionWrapper,
    start: "top top",
    end: "bottom top",
    scrub: 1,
    animation: gsap.to(heroSecondaryImage, { y: "-100dvh" }),
  });
});
