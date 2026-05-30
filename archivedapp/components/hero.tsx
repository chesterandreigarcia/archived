"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const slides = [
    "/hero/video2.mp4",
    "/hero/video1.mp4",
    "/hero/video3.mp4",
];

// Poster images to show in thumbnails — always visible, no video decode needed
// Add actual poster jpgs at these paths, or swap to any static image
const POSTERS = [
    "/hero/poster1.jpg",
    "/hero/poster2.jpg",
    "/hero/poster3.jpg",
];

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const [loaded, setLoaded] = useState<boolean[]>(slides.map(() => false));
    const trackRef = useRef<HTMLDivElement | null>(null);
    const scrollArrowRef = useRef<HTMLButtonElement | null>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const handleCanPlay = (i: number) => {
        setLoaded((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
        });
    };

    // Auto-advance slides
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    // Play current, pause others
    useEffect(() => {
        videoRefs.current.forEach((vid, i) => {
            if (!vid) return;
            if (i === current) {
                vid.currentTime = 0;
                vid.play().catch(() => { });
            } else {
                vid.pause();
            }
        });
    }, [current]);

    // Slide transition
    useGSAP(() => {
        if (!trackRef.current) return;
        gsap.to(trackRef.current, {
            xPercent: -current * 100,
            duration: 1,
            ease: "back.inOut(1)",
        });
    }, [current]);

    // Scroll arrow bounce
    useGSAP(() => {
        if (!scrollArrowRef.current) return;
        gsap.to(scrollArrowRef.current, {
            y: 8,
            duration: 1.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
        });
    }, []);

    const scrollToAbout = () => {
        const about = document.getElementById("about");
        if (about) about.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">

            {/* Video track */}
            <div ref={trackRef} className="flex w-full h-full">
                {slides.map((src, i) => (
                    <div key={i} className="relative w-full h-full flex-shrink-0">
                        {!loaded[i] && (
                            <div className="absolute inset-0 bg-black/80 animate-pulse" />
                        )}
                        <video
                            ref={(el) => { videoRefs.current[i] = el; }}
                            src={src}
                            autoPlay={i === 0}
                            muted
                            loop
                            playsInline
                            preload="auto"
                            onCanPlay={() => handleCanPlay(i)}
                            className="w-full h-full object-cover"
                            style={{
                                opacity: loaded[i] ? 1 : 0,
                                transition: "opacity 0.4s ease",
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

            {/* Hero text */}
            <div className="absolute bottom-36 md:bottom-44 left-1/2 -translate-x-1/2 z-10 w-full px-6 flex flex-col items-center text-center">
                <h1
                    className="hero-headline text-white w-full"
                    style={{ lineHeight: 0.92 }}
                >
                    Let's turn stories
                    <br />
                    into moving pictures.
                </h1>
                <p className="mt-4 md:mt-5 text-sm md:text-base text-white/75 leading-relaxed hero-body max-w-md">
                    A curated archive of cinematic moments, emotions, and memories captured through film.
                </p>
            </div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4 z-10">
                {slides.map((src, i) => {
                    const isActive = i === current;
                    return (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            style={{
                                // Fixed size — no scale transforms that can cause layout shifts on mobile
                                width: "52px",
                                height: "52px",
                                borderRadius: "6px",
                                overflow: "hidden",
                                flexShrink: 0,
                                padding: 0,
                                cursor: "pointer",
                                position: "relative",
                                // Always a visible border — active is white, inactive is dim white
                                border: isActive
                                    ? "2px solid rgba(255,255,255,1)"
                                    : "2px solid rgba(255,255,255,0.35)",
                                // Box shadow for active instead of scale (scale causes invisible thumbnails on some mobile browsers)
                                boxShadow: isActive
                                    ? "0 0 0 1px rgba(255,255,255,0.5), 0 4px 12px rgba(0,0,0,0.6)"
                                    : "none",
                                transition: "border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease",
                                // Inactive is dimmed but always visible — never fully transparent
                                opacity: isActive ? 1 : 0.55,
                                background: "#111",
                            }}
                        >
                            {/*
                             * Use a static <img> poster instead of <video> for thumbnails.
                             * Video thumbnails are unreliable on mobile — the browser often
                             * refuses to decode a frame, leaving a black box.
                             * If you don't have poster jpgs yet, remove the <img> and
                             * uncomment the <video> below as a fallback.
                             */}
                            <img
                                src={POSTERS[i]}
                                alt={`Slide ${i + 1}`}
                                loading="eager"
                                decoding="async"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                                // If the poster image fails (file not found), fall back to
                                // a video element so something still renders
                                onError={(e) => {
                                    const img = e.currentTarget;
                                    const parent = img.parentElement;
                                    if (!parent) return;
                                    img.style.display = "none";
                                    const vid = document.createElement("video");
                                    vid.src = src;
                                    vid.muted = true;
                                    vid.playsInline = true;
                                    vid.preload = "metadata";
                                    vid.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;";
                                    parent.appendChild(vid);
                                }}
                            />

                            {/* Active indicator dot at bottom */}
                        </button>
                    );
                })}
            </div>

            {/* Scroll down arrow */}
            <button
                ref={scrollArrowRef}
                onClick={scrollToAbout}
                aria-label="Scroll to about"
                className="absolute right-6 md:right-14 bottom-10 z-10 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 cursor-pointer"
                style={{ fontFamily: "var(--font-barlow), sans-serif" }}
            >
                <span className="text-[10px] tracking-[0.25em] uppercase rotate-90 mb-2">
                    Scroll
                </span>
                <svg
                    width="16"
                    height="28"
                    viewBox="0 0 16 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect x="7" y="0" width="2" height="20" rx="1" fill="currentColor" opacity="0.4" />
                    <path
                        d="M1 18L8 26L15 18"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
}