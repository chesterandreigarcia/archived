"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type MediaType = "photo" | "video";

interface ArchiveItem {
    id: number;
    type: MediaType;
    src: string;           
    poster?: string;       
    title: string;
    year: string;
    month: string;
    location?: string;
    tag?: string;
    colSpan: number;
    rowSpan: number;
}

const U = (id: string, w: number, h: number) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const ITEMS: ArchiveItem[] = [
    {
        id: 1, type: "photo",
        src: U("photo-1506905925346-21bda4d32df4", 1400, 520),
        title: "Golden Residue", year: "2024", month: "OCT",
        location: "Sierra Nevada", tag: "Landscape",
        colSpan: 7, rowSpan: 2,
    },
    {
        id: 2, type: "video",
        src: "/hero/video1.mp4",
        poster: U("photo-1470071459604-3b5ec3a7fe05", 600, 340),
        title: "Tide & Ash", year: "2024", month: "SEP",
        location: "Pacific Coast", tag: "Film",
        colSpan: 5, rowSpan: 2,
    },
    {
        id: 3, type: "photo",
        src: U("photo-1531746020798-e6953c6e8e04", 420, 360),
        title: "Pause", year: "2024", month: "AUG",
        location: "Manila", tag: "Portrait",
        colSpan: 3, rowSpan: 2,
    },
    {
        id: 4, type: "video",
        src: "/hero/video2.mp4",
        poster: U("photo-1477959858617-67f85cf4f1df", 560, 220),
        title: "City at 3AM", year: "2024", month: "AUG",
        location: "BGC", tag: "Film",
        colSpan: 4, rowSpan: 1,
    },
    {
        id: 5, type: "photo",
        src: U("photo-1519681393784-d120267933ba", 700, 220),
        title: "Ridge at Dusk", year: "2023", month: "DEC",
        location: "Benguet", tag: "Landscape",
        colSpan: 5, rowSpan: 1,
    },
    {
        id: 6, type: "photo",
        src: U("photo-1441974231531-c6227db76b6e", 560, 220),
        title: "Before the Rain", year: "2022", month: "JUN",
        location: "Batanes", tag: "Landscape",
        colSpan: 4, rowSpan: 1,
    },
    {
        id: 7, type: "photo",
        src: U("photo-1465146344425-f00d5f5c8f07", 420, 220),
        title: "Fragment III", year: "2022", month: "MAR",
        tag: "Abstract",
        colSpan: 3, rowSpan: 1,
    },
    {
        id: 8, type: "video",
        src: "/hero/video3.mp4",
        poster: U("photo-1472214103451-9374bd1c798e", 1000, 420),
        title: "Still Water", year: "2024", month: "JUL",
        location: "Laguna de Bay", tag: "Film",
        colSpan: 6, rowSpan: 2,
    },
    {
        id: 9, type: "photo",
        src: U("photo-1449824913935-59a10b8d2000", 420, 220),
        title: "Night Market", year: "2023", month: "NOV",
        location: "Escolta", tag: "Urban",
        colSpan: 3, rowSpan: 1,
    },
    {
        id: 10, type: "photo",
        src: U("photo-1500648767791-00dcc994a43e", 420, 220),
        title: "Threshold", year: "2024", month: "FEB",
        tag: "Portrait",
        colSpan: 3, rowSpan: 1,
    },
    {
        id: 11, type: "photo",
        src: U("photo-1506794778202-cad84cf45f1d", 420, 220),
        title: "Passage", year: "2024", month: "APR",
        location: "Makati", tag: "Portrait",
        colSpan: 3, rowSpan: 1,
    },
    {
        id: 12, type: "photo",
        src: U("photo-1534430480872-3498386e7856", 420, 220),
        title: "Form Study", year: "2023", month: "JAN",
        tag: "Abstract",
        colSpan: 3, rowSpan: 1,
    },
    {
        id: 13, type: "photo",
        src: U("photo-1501854140801-50d01698950b", 560, 220),
        title: "Canopy", year: "2024", month: "MAY",
        location: "Mt. Apo", tag: "Landscape",
        colSpan: 4, rowSpan: 1,
    },
    {
        id: 14, type: "video",
        src: "/hero/video1.mp4",
        poster: U("photo-1519003722824-194d4455a60c", 560, 220),
        title: "Scaffolding", year: "2024", month: "JAN",
        location: "Makati", tag: "Film",
        colSpan: 4, rowSpan: 1,
    },
    {
        id: 15, type: "photo",
        src: U("photo-1522708323590-d24dbb6b0267", 420, 220),
        title: "Corner Light", year: "2023", month: "OCT",
        location: "Intramuros", tag: "Urban",
        colSpan: 4, rowSpan: 1,
    },
];

function Ticker() {
    const words = ["Landscape", "Film", "Portrait", "Urban", "Abstract", "2024", "2023", "2022", "Archive", "Mixed Media"];
    const repeated = [...words, ...words, ...words];
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(trackRef.current, {
            x: "-33.333%",
            duration: 22,
            ease: "none",
            repeat: -1,
        });
    }, []);

    return (
        <div className="overflow-hidden border-t border-b border-white/10 py-3 my-0">
            <div ref={trackRef} className="flex gap-0 whitespace-nowrap" style={{ width: "max-content" }}>
                {repeated.map((w, i) => (
                    <span
                        key={i}
                        className="text-white/20 text-[10px] tracking-[0.4em] uppercase px-6"
                        style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                    >
                        {w}
                        <span className="ml-6 text-white/10">·</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

function ArchiveCell({ item, index }: { item: ArchiveItem; index: number }) {
    const cellRef  = useRef<HTMLDivElement>(null);
    const mediaRef = useRef<HTMLImageElement & HTMLVideoElement>(null);
    const [hovered, setHovered] = useState(false);

    useGSAP(() => {
        gsap.from(cellRef.current, {
            scrollTrigger: {
                trigger: cellRef.current,
                start: "top 92%",
                toggleActions: "play none none none",
            },
            y: 60,
            opacity: 0,
            scale: 0.96,
            duration: 1.2,
            ease: "expo.out",
            delay: (index % 4) * 0.1,
        });
    }, []);

    const handleEnter = () => {
        setHovered(true);
        gsap.to(mediaRef.current, { scale: 1.07, duration: 0.9, ease: "power2.out" });
        if (item.type === "video" && mediaRef.current) {
            (mediaRef.current as HTMLVideoElement).play?.().catch(() => {});
        }
    };
    const handleLeave = () => {
        setHovered(false);
        gsap.to(mediaRef.current, { scale: 1, duration: 0.9, ease: "power2.out" });
        if (item.type === "video" && mediaRef.current) {
            const v = mediaRef.current as HTMLVideoElement;
            v.pause?.();
            v.currentTime = 0;
        }
    };

    const isWide = item.colSpan >= 5;

    return (
        <div
            ref={cellRef}
            className="relative overflow-hidden bg-white/[0.03] cursor-pointer group"
            style={{
                gridColumn: `span ${item.colSpan}`,
                gridRow: `span ${item.rowSpan}`,
                borderRadius: "2px",
            }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
           
            {item.type === "photo" ? (
                <img
                    ref={mediaRef as React.RefObject<HTMLImageElement>}
                    src={item.src}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        filter: hovered ? "grayscale(0) brightness(1.02)" : "grayscale(0.2) brightness(0.75)",
                        transition: "filter 0.7s ease",
                        transformOrigin: "center",
                    }}
                />
            ) : (
                <video
                    ref={mediaRef as React.RefObject<HTMLVideoElement>}
                    src={item.src}
                    poster={item.poster}
                    muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        filter: hovered ? "grayscale(0) brightness(1.02)" : "grayscale(0.2) brightness(0.75)",
                        transition: "filter 0.7s ease",
                        transformOrigin: "center",
                    }}
                />
            )}

          
            <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                    background: hovered
                        ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                }}
            />

            
            <div className="absolute top-3 left-3 flex items-center gap-2">
                {item.type === "video" && (
                    <div
                        className="flex items-center gap-1.5 px-2 py-[3px]"
                        style={{
                            background: "rgba(255,255,255,0.12)",
                            backdropFilter: "blur(6px)",
                            borderRadius: "1px",
                            border: "0.5px solid rgba(255,255,255,0.2)",
                        }}
                    >
                        <svg width="7" height="9" viewBox="0 0 7 9" fill="white">
                            <path d="M0 0l7 4.5L0 9V0z" />
                        </svg>
                        <span className="text-white text-[9px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
                            Film
                        </span>
                    </div>
                )}
                {item.tag && item.type === "photo" && (
                    <span
                        className="text-white/60 text-[9px] tracking-[0.25em] uppercase px-2 py-[3px]"
                        style={{
                            fontFamily: "var(--font-barlow), sans-serif",
                            background: "rgba(0,0,0,0.4)",
                            backdropFilter: "blur(4px)",
                            borderRadius: "1px",
                        }}
                    >
                        {item.tag}
                    </span>
                )}
            </div>

           
            <div className="absolute top-3 right-3 text-right">
                <span
                    className="text-white/25 text-[9px] tracking-[0.25em] uppercase block"
                    style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                >
                    {item.month} {item.year}
                </span>
            </div>

           
            {item.type === "video" && (
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ opacity: hovered ? 0 : 0.5, transition: "opacity 0.4s ease" }}
                >
                    <div
                        style={{
                            width: isWide ? 52 : 40,
                            height: isWide ? 52 : 40,
                            border: "1.5px solid rgba(255,255,255,0.6)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backdropFilter: "blur(4px)",
                            background: "rgba(255,255,255,0.07)",
                        }}
                    >
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
                            <path d="M0 0l12 7-12 7V0z" />
                        </svg>
                    </div>
                </div>
            )}

            <div
                className="absolute bottom-0 left-0 right-0 px-4 pb-4"
                style={{
                    transform: hovered ? "translateY(0)" : "translateY(10px)",
                    opacity: hovered ? 1 : 0,
                    transition: "transform 0.45s cubic-bezier(0.23,1,0.32,1), opacity 0.35s ease",
                }}
            >
                <p
                    className="text-white leading-none mb-[5px]"
                    style={{
                        fontFamily: "var(--font-bebas), sans-serif",
                        fontSize: isWide ? "clamp(1.5rem, 2.8vw, 2.2rem)" : "clamp(1rem, 1.8vw, 1.3rem)",
                        letterSpacing: "0.04em",
                    }}
                >
                    {item.title}
                </p>
                {item.location && (
                    <p
                        className="text-white/45 text-[10px] tracking-[0.25em] uppercase"
                        style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                    >
                        {item.location}
                    </p>
                )}
            </div>

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    boxShadow: hovered ? "inset 0 0 0 1px rgba(255,255,255,0.14)" : "none",
                    transition: "box-shadow 0.4s ease",
                    borderRadius: "2px",
                }}
            />
        </div>
    );
}

function YearDivider({ year, count }: { year: string; count: number }) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(ref.current, {
            scrollTrigger: { trigger: ref.current, start: "top 90%", toggleActions: "play none none none" },
            x: -40, opacity: 0, duration: 1, ease: "expo.out",
        });
    }, []);

    return (
        <div ref={ref} className="col-span-12 flex items-center gap-5 py-2">
            <span
                className="text-white/80"
                style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(3rem, 6vw, 5rem)", letterSpacing: "0.08em", lineHeight: 1 }}
            >
                {year}
            </span>
            <div className="flex-1 h-[0.5px] bg-white/10" />
            <span
                className="text-white/25 text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-barlow), sans-serif" }}
            >
                {count} works
            </span>
        </div>
    );
}

export default function ArchivePage() {
    const pageRef     = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subRef      = useRef<HTMLDivElement>(null);
    const lineRef     = useRef<HTMLDivElement>(null);

    const years = ["2024", "2023", "2022"];

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.1 });

        tl.from(".arch-letter", {
            yPercent: 110,
            opacity: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.04,
        })
        .from(subRef.current, {
            y: 20, opacity: 0, duration: 0.9, ease: "expo.out",
        }, "-=0.5")
        .from(lineRef.current, {
            scaleX: 0, duration: 1.2, ease: "expo.out", transformOrigin: "left",
        }, "-=0.7");

        gsap.from(".stat-val", {
            scrollTrigger: { trigger: ".stat-val", start: "top 88%" },
            y: 20, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.1,
        });
    }, []);

    const title = "THE ARCHIVE";

    return (
        <div ref={pageRef} className="bg-[#080808] min-h-screen">

            <div className="relative px-6 md:px-14 pt-36 md:pt-48 pb-0 overflow-hidden">

                <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        backgroundSize: "128px 128px",
                    }}
                />

                <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase mb-6" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
                    002 — Mixed Media
                </p>

                <h1
                    ref={headlineRef}
                    className="overflow-hidden leading-none mb-0"
                    style={{
                        fontFamily: "var(--font-bebas), sans-serif",
                        fontSize: "clamp(4rem, 12vw, 11rem)",
                        letterSpacing: "0.03em",
                        lineHeight: 0.85,
                    }}
                >
                    {title.split("").map((char, i) => (
                        <span
                            key={i}
                            className="arch-letter inline-block text-white"
                            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </h1>

                <div ref={subRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-8 mb-10">
                    <p
                        className="text-white/40 text-sm leading-relaxed max-w-xs"
                        style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                    >
                        Every frame, every film. A complete record of work across photography and video — sorted by time, held in one place.
                    </p>

                    <div className="flex items-end gap-10">
                        {[
                            { val: "47", label: "Total Works" },
                            { val: "12", label: "Films" },
                            { val: "35", label: "Photographs" },
                        ].map(s => (
                            <div key={s.label}>
                                <p
                                    className="stat-val text-white tabular-nums leading-none"
                                    style={{
                                        fontFamily: "var(--font-bebas), sans-serif",
                                        fontSize: "clamp(2rem, 4vw, 3rem)",
                                        letterSpacing: "0.06em",
                                    }}
                                >
                                    {s.val}
                                </p>
                                <p
                                    className="text-white/25 text-[9px] tracking-[0.3em] uppercase mt-1"
                                    style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                                >
                                    {s.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div ref={lineRef} className="w-full h-[0.5px] bg-white/15" />
            </div>

            <Ticker />

            <div className="px-4 md:px-8 pb-32 pt-6">
                <div
                    className="grid gap-2 md:gap-3"
                    style={{
                        gridTemplateColumns: "repeat(12, 1fr)",
                        gridAutoRows: "180px",
                    }}
                >
                    <YearDivider year="2024" count={9} />

                    {ITEMS.filter(i => i.year === "2024").map((item, i) => (
                        <ArchiveCell key={item.id} item={item} index={i} />
                    ))}

                    <YearDivider year="2023" count={4} />

                    {ITEMS.filter(i => i.year === "2023").map((item, i) => (
                        <ArchiveCell key={item.id} item={item} index={i} />
                    ))}

                    <YearDivider year="2022" count={2} />

                    {ITEMS.filter(i => i.year === "2022").map((item, i) => (
                        <ArchiveCell key={item.id} item={item} index={i} />
                    ))}
                </div>
            </div>

        </div>
    );
}