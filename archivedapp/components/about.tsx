"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const photos = [
    { src: "/about/archive1.jpg", span: "col-span-2 row-span-2" },
    { src: "/about/archive2.jpg", span: "col-span-1 row-span-1" },
    { src: "/about/archive3.jpg", span: "col-span-1 row-span-1" },
    { src: "/about/archive4.jpg", span: "col-span-1 row-span-1" },
    { src: "/about/archive5.jpg", span: "col-span-1 row-span-1" },
];

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLParagraphElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {

            gsap.from(headlineRef.current, {
                scrollTrigger: {
                    trigger: headlineRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
                yPercent: 120,
                opacity: 0,
                duration: 1,
                ease: "expo.out",
            });

            gsap.from(dividerRef.current, {
                scrollTrigger: {
                    trigger: dividerRef.current,
                    start: "top 88%",
                    toggleActions: "play none none none",
                },
                scaleX: 0,
                transformOrigin: "left center",
                duration: 1.2,
                ease: "expo.out",
            });

            gsap.from(subtitleRef.current, {
                scrollTrigger: {
                    trigger: subtitleRef.current,
                    start: "top 88%",
                    toggleActions: "play none none none",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "expo.out",
                delay: 0.15,
            });

            gsap.from(bodyRef.current, {
                scrollTrigger: {
                    trigger: bodyRef.current,
                    start: "top 88%",
                    toggleActions: "play none none none",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "expo.out",
                delay: 0.25,
            });

            const cards = gridRef.current?.querySelectorAll(".photo-card");
            if (cards) {
                gsap.from(cards, {
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    ease: "expo.out",
                    stagger: 0.12,
                });
            }

            gsap.to(gridRef.current, {
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
                y: -60,
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative bg-[#0a0a0a] text-white px-6 md:px-14 py-24 md:py-36 overflow-hidden"
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: "128px 128px",
                }}
            />

            <div className="overflow-hidden mb-3">
                <p
                    className="text-white/40 text-xs tracking-[0.3em] uppercase mb-4"
                    style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                >
                    001 — About
                </p>
                <h2
                    ref={headlineRef}
                    className="text-white"
                    style={{
                        fontFamily: "var(--font-bebas), sans-serif",
                        fontSize: "clamp(3rem, 9vw, 7.5rem)",
                        lineHeight: 0.92,
                        letterSpacing: "0.01em",
                    }}
                >
                    A personal archive
                    <br />
                    of moving moments.
                </h2>
            </div>

            <div
                ref={dividerRef}
                className="w-full h-[0.5px] bg-white/20 my-10 md:my-14"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 mb-20 md:mb-28">
                <p
                    ref={subtitleRef}
                    className="text-white text-xl md:text-2xl leading-snug"
                    style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 500 }}
                >
                    This is a living archive — a collection of films, photographs, and
                    fragments from a life spent chasing light.
                </p>
                <p
                    ref={bodyRef}
                    className="text-white/55 text-sm md:text-base leading-relaxed"
                    style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                >
                    Every frame here is a moment that deserved to be kept. Not for an
                    audience, not for an algorithm — but because some things are worth
                    preserving. From quiet landscapes to crowded streets, from still
                    water to moving people, this archive is an honest record of what
                    it felt like to be present.
                </p>
            </div>

            <div
                ref={gridRef}
                className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 md:gap-4 h-[400px] md:h-[560px]"
            >
                {photos.map((photo, i) => (
                    <div
                        key={i}
                        className={`photo-card relative overflow-hidden bg-white/5 rounded-sm ${photo.span}`}
                    >
                        <img
                            src={photo.src}
                            alt=""
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-all duration-500" />
                    </div>
                ))}
            </div>

            <div className="mt-16 md:mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <p
                    className="text-white/40 text-sm tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                >
                    Browse the full collection
                </p>
                <a
                    href="/archive"
                    className="group flex items-center gap-3 text-white text-sm tracking-widest uppercase border-b border-white/30 pb-1 hover:border-white transition-all duration-200"
                    style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                >
                    View Archive
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </a>
            </div>

        </section>
    );
}