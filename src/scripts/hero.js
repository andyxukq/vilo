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
    end: "bottom 75%",
    pin: heroContent,
    pinSpacing: false,
    scrub: 1,
    markers: true,
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
    end: "bottom 75%",
    scrub: 0,
    animation: gsap.to(heroImageHolder, { y: "30vh" }),
  });

  ScrollTrigger.create({
    trigger: heroSectionWrapper,
    start: "top top",
    end: "bottom 75%",
    scrub: 0,
    ease: "none",
    animation: gsap.to(heroSecondaryImage, { y: "-50vh" }),
  });
});

mm.add("(max-width: 1023px)", () => {
  ScrollTrigger.create({
    trigger: heroSectionWrapper,
    start: "50% top",
    end: "bottom top",
    scrub: true,
    animation: gsap.to(heroContent, {
      opacity: 0,
      y: -50,
      ease: "power1.inOut",
    }),
  });

  ScrollTrigger.create({
    trigger: heroSectionWrapper,
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
    animation: gsap.to(heroSecondaryImage, { y: "-200vh", ease: "none" }),
  });
});
