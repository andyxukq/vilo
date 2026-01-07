import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const parallaxSection = document.querySelector(".gsap-parallax-section");
const parallaxContent = document.querySelector(
  ".gsap-parallax-content-animation"
);
const parallaxImages = document.querySelector(
  ".gsap-parallax-images-animation"
);

let mm = gsap.matchMedia();

mm.add("(max-width: 767px)", () => {
  ScrollTrigger.create({
    trigger: parallaxSection,
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
    animation: gsap.to(parallaxContent, { y: "15dvh" }),
  });
  ScrollTrigger.create({
    trigger: parallaxSection,
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
    animation: gsap.to(parallaxImages, { y: "-8dvh" }),
  });
});
mm.add("(min-width: 768px)", () => {
    ScrollTrigger.create({
    trigger: parallaxSection,
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
    animation: gsap.to(parallaxContent, { y: "30dvh" }),
  });
  ScrollTrigger.create({
    trigger: parallaxSection,
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
    animation: gsap.to(parallaxImages, { y: "-8dvh" }),
  });
});
