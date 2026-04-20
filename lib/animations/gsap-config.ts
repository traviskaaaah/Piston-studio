import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Fade in animation
export const fadeIn = (element: HTMLElement | string, delay = 0) => {
  return gsap.from(element, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay,
    ease: 'power3.out',
  });
};

// Stagger fade in for multiple elements
export const staggerFadeIn = (elements: HTMLElement[] | string, delay = 0) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.1,
    delay,
    ease: 'power3.out',
  });
};

// Scale in animation
export const scaleIn = (element: HTMLElement | string, delay = 0) => {
  return gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    delay,
    ease: 'back.out(1.7)',
  });
};

// Slide in from left
export const slideInLeft = (element: HTMLElement | string, delay = 0) => {
  return gsap.from(element, {
    x: -100,
    opacity: 0,
    duration: 0.8,
    delay,
    ease: 'power3.out',
  });
};

// Slide in from right
export const slideInRight = (element: HTMLElement | string, delay = 0) => {
  return gsap.from(element, {
    x: 100,
    opacity: 0,
    duration: 0.8,
    delay,
    ease: 'power3.out',
  });
};

// Parallax effect
export const parallax = (element: HTMLElement | string, speed = 0.5) => {
  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

// Reveal on scroll
export const revealOnScroll = (element: HTMLElement | string) => {
  return gsap.from(element, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none reverse',
    },
  });
};

// Split text animation
export const splitTextReveal = (element: HTMLElement | string) => {
  const text = typeof element === 'string' 
    ? document.querySelector(element) 
    : element;
  
  if (!text) return;

  const chars = text.textContent?.split('') || [];
  text.innerHTML = chars.map(char => 
    `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
  ).join('');

  return gsap.from(text.children, {
    opacity: 0,
    y: 20,
    rotateX: -90,
    stagger: 0.02,
    duration: 0.6,
    ease: 'back.out(1.7)',
  });
};
