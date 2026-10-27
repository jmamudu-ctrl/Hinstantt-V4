import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
if (typeof window !== 'undefined') window.ScrollTrigger = ScrollTrigger;   // handy for debugging in the console

// ---- Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in step ----
export function startSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  // each wheel scroll glides over 1.2s with an exponential ease-out, a touch slower than native
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.4,
  });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (t) => lenis.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  window.__lenis = lenis;
  return () => { gsap.ticker.remove(tick); lenis.destroy(); window.__lenis = null; };
}

// ---- text entrances: a heading rises and un-blurs inside a clip, its paragraph and
// actions following. The DOM is left intact, so inline spans and line breaks survive. ----
export function startTextEntrances() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heads = Array.from(document.querySelectorAll('[data-enter]'));
  const ctx = gsap.context(() => {
    heads.forEach((head) => {
      const group = head.closest('[data-enter-group]') || head.parentElement;
      const follow = group ? Array.from(group.querySelectorAll('[data-enter-follow]')) : [];
      if (reduce) { gsap.set([head, ...follow], { opacity: 1, clearProps: 'all' }); return; }
      gsap.set(head, { opacity: 0, y: 36, filter: 'blur(10px)' });
      gsap.set(follow, { y: 18, opacity: 0 });
      ScrollTrigger.create({
        trigger: head, start: 'top 85%', once: true,
        onEnter: () => {
          // once in, drop the inline transform, filter and will-change: left behind they
          // make each element its own layer, which blocks blend modes beneath it
          gsap.timeline({ onComplete: () => gsap.set([head, ...follow], { clearProps: 'all' }) })
            .to(head, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out' })
            .to(follow, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08 }, 0.3);
        },
      });
    });
  });
  return () => ctx.revert();
}
