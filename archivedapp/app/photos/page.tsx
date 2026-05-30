"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Photo {
    id: number;
    src: string;
    title: string;
    year: string;
    location?: string;
    colSpan: number;
    rowSpan: number;
    featured?: boolean;
}

const U = (id: string, w: number, h: number) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const PHOTOS: Photo[] = [
    { id: 1, src: U("photo-1506905925346-21bda4d32df4", 1400, 520), title: "Golden Residue", year: "2024", location: "Sierra Nevada", colSpan: 7, rowSpan: 2, featured: true },
    { id: 2, src: U("photo-1470071459604-3b5ec3a7fe05", 900, 260), title: "Salt Flat Mirror", year: "2023", location: "Bonneville", colSpan: 5, rowSpan: 1 },
    { id: 3, src: U("photo-1501854140801-50d01698950b", 900, 260), title: "Canopy", year: "2024", location: "Mt. Apo", colSpan: 5, rowSpan: 1 },
    { id: 4, src: U("photo-1531746020798-e6953c6e8e04", 500, 460), title: "Pause", year: "2024", location: "Manila", colSpan: 3, rowSpan: 2 },
    { id: 5, src: U("photo-1441974231531-c6227db76b6e", 500, 220), title: "Before the Rain", year: "2022", location: "Batanes", colSpan: 3, rowSpan: 1 },
    { id: 6, src: U("photo-1477959858617-67f85cf4f1df", 500, 220), title: "Rush Hour Elegy", year: "2024", location: "BGC", colSpan: 3, rowSpan: 1 },
    { id: 7, src: U("photo-1519681393784-d120267933ba", 500, 220), title: "Ridge at Dusk", year: "2023", location: "Benguet", colSpan: 3, rowSpan: 1 },
    { id: 8, src: U("photo-1500648767791-00dcc994a43e", 500, 220), title: "Threshold", year: "2024", colSpan: 3, rowSpan: 1 },
    { id: 9, src: U("photo-1449824913935-59a10b8d2000", 500, 220), title: "Night Market", year: "2023", location: "Escolta", colSpan: 3, rowSpan: 1 },
    { id: 10, src: U("photo-1465146344425-f00d5f5c8f07", 500, 220), title: "Fragment III", year: "2022", colSpan: 3, rowSpan: 1 },
    { id: 11, src: U("photo-1472214103451-9374bd1c798e", 1000, 420), title: "Still Water", year: "2024", location: "Laguna de Bay", colSpan: 6, rowSpan: 2 },
    { id: 12, src: U("photo-1522708323590-d24dbb6b0267", 500, 220), title: "Corner Light", year: "2023", location: "Intramuros", colSpan: 3, rowSpan: 1 },
    { id: 13, src: U("photo-1534430480872-3498386e7856", 500, 220), title: "Form Study", year: "2023", colSpan: 3, rowSpan: 1 },
    { id: 14, src: U("photo-1506794778202-cad84cf45f1d", 500, 220), title: "Passage", year: "2024", location: "Makati", colSpan: 3, rowSpan: 1 },
    { id: 15, src: U("photo-1519003722824-194d4455a60c", 500, 220), title: "Scaffolding Study", year: "2024", location: "Makati", colSpan: 3, rowSpan: 1 },
];

function BentoCell({ photo, index }: { photo: Photo; index: number }) {
    const cellRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [hovered, setHovered] = useState(false);

    useGSAP(() => {
        gsap.from(cellRef.current, {
            scrollTrigger: { trigger: cellRef.current, start: "top 90%", toggleActions: "play none none none" },
            y: 40, opacity: 0, scale: 0.97,
            duration: 1.1, ease: "expo.out",
            delay: (index % 5) * 0.07,
        });
    }, []);

    const handleEnter = () => {
        setHovered(true);
        gsap.to(imgRef.current, { scale: 1.06, duration: 0.8, ease: "power2.out" });
    };
    const handleLeave = () => {
        setHovered(false);
        gsap.to(imgRef.current, { scale: 1, duration: 0.8, ease: "power2.out" });
    };

    return (
        <div
            ref={cellRef}
            className="bento-cell-wrapper relative overflow-hidden bg-white/[0.03]"
            style={{ gridColumn: `span ${photo.colSpan}`, gridRow: `span ${photo.rowSpan}`, borderRadius: "3px" }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <img
                ref={imgRef}
                src={photo.src}
                alt={photo.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    filter: hovered ? "grayscale(0) brightness(1)" : "grayscale(0.25) brightness(0.78)",
                    transition: "filter 0.6s ease",
                    transformOrigin: "center center",
                }}
            />

            <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                    background: hovered
                        ? "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.12) 50%, transparent 100%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 65%)",
                }}
            />

            {photo.featured && (
                <div className="absolute top-3 left-3 text-[9px] tracking-[0.25em] uppercase text-black px-2 py-[3px]"
                    style={{ background: "white", fontFamily: "var(--font-barlow), sans-serif", borderRadius: "1px" }}>
                    Featured
                </div>
            )}

            <span className="absolute top-3 right-3 text-white/20 text-[10px] tabular-nums" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
                {String(index + 1).padStart(2, "0")}
            </span>

            <div
                className="absolute bottom-0 left-0 right-0 px-4 pb-4"
                style={{
                    transform: hovered ? "translateY(0)" : "translateY(8px)",
                    opacity: hovered ? 1 : 0,
                    transition: "all 0.45s cubic-bezier(0.23,1,0.32,1)",
                }}
            >
                <p className="text-white leading-none mb-1"
                    style={{
                        fontFamily: "var(--font-bebas), sans-serif",
                        fontSize: photo.colSpan >= 5 ? "clamp(1.4rem, 2.5vw, 2rem)" : "clamp(0.95rem, 1.6vw, 1.25rem)",
                        letterSpacing: "0.04em",
                    }}>
                    {photo.title}
                </p>
                <p className="text-white/50 text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
                    {photo.location ? photo.location + " · " : ""}{photo.year}
                </p>
            </div>

            <div className="absolute inset-0 pointer-events-none"
                style={{
                    boxShadow: hovered ? "inset 0 0 0 1px rgba(255,255,255,0.12)" : "none",
                    transition: "box-shadow 0.4s ease",
                    borderRadius: "3px",
                }}
            />
        </div>
    );
}

export default function PhotosPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.15 });
        tl.from(headlineRef.current, { yPercent: 105, opacity: 0, duration: 1.1, ease: "expo.out" })
            .from(subtitleRef.current, { y: 24, opacity: 0, duration: 0.9, ease: "expo.out" }, "-=0.6");
    }, []);

    return (
        <div ref={pageRef} className="bg-[#080808] min-h-screen">

            <div className="relative px-6 md:px-14 pt-32 md:pt-44 pb-14 md:pb-20 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        backgroundSize: "128px 128px",
                    }}
                />
                <p className="text-white/30 text-[10px] tracking-[0.35em] uppercase mb-5" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>001 — Photos</p>
                <div className="overflow-hidden mb-4">
                    <h1 ref={headlineRef} className="text-white" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", lineHeight: 0.88, letterSpacing: "0.02em" }}>
                        The Still<br />Archive.
                    </h1>
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-8">
                    <p ref={subtitleRef} className="text-white/45 text-sm md:text-base leading-relaxed max-w-sm" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
                        Frames that deserved to be kept. Every photograph is a moment frozen in silver and light.
                    </p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-white tabular-nums" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.05em", lineHeight: 1 }}>
                            {String(PHOTOS.length).padStart(2, "0")}
                        </span>
                        <span className="text-white/30 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>frames</span>
                    </div>
                </div>
                <div className="w-full h-[0.5px] bg-white/10 mt-10 md:mt-14" />
            </div>

            <div className="px-4 md:px-8 pb-24">
                <div
                    className="grid gap-2 md:gap-3"
                    style={{ gridTemplateColumns: "repeat(12, 1fr)", gridAutoRows: "180px" }}
                >
                    {PHOTOS.map((photo, i) => (
                        <BentoCell key={photo.id} photo={photo} index={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}