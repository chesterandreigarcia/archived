"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const slides = [
    "/hero/video2.mp4",
    "/hero/video1.mp4",
    "/hero/video3.mp4",
];

// Captures a frame from a video URL and returns it as a base64 data URL
function useCapturedFrame(src: string): string | null {
    const [dataUrl, setDataUrl] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const video = document.createElement("video");
        video.src = src;
        video.muted = true;
        video.playsInline = true;
        video.crossOrigin = "anonymous";
        // Do NOT set preload="metadata" — on iOS we need to load enough data to seek
        video.preload = "auto";

        const onSeeked = () => {
            if (cancelled) return;
            try {
                const canvas = document.createElement("canvas");
                canvas.width = video.videoWidth || 112;
                canvas.height = video.videoHeight || 112;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const url = canvas.toDataURL("image/jpeg", 0.8);
                setDataUrl(url);
            } catch {
                // Cross-origin or decode failure — leave null
            }
            video.src = ""; // release memory
        };

        const onLoaded = () => {
            // Seek to 0.5s — seeking to 0 is unreliable on Safari/iOS
            video.currentTime = 0.5;
        };

        video.addEventListener("loadeddata", onLoaded, { once: true });
        video.addEventListener("seeked", onSeeked, { once: true });
        video.load();

        return () => {
            cancelled = true;
            video.removeEventListener("loadeddata", onLoaded);
            video.removeEventListener("seeked", onSeeked);
            video.src = "";
        };
    }, [src]);

    return dataUrl;
}

function Thumbnail({
    src,
    isActive,
    onClick,
}: {
    src: string;
    isActive: boolean;
    onClick: () => void;
}) {
    const frame = useCapturedFrame(src);

    return (
        <div
            onClick={onClick}
            className={`cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-300 w-12 h-12 md:w-14 md:h-14 flex-shrink-0
                ${isActive
                    ? "scale-110 border-white shadow-lg"
                    : "opacity-50 border-white/30 hover:opacity-70"
                }`}
        >
            {frame ? (
                <img
                    src={frame}
                    alt=""
                    draggable={false}
                    className="w-full h-full object-cover"
                />
            ) : (
                // Skeleton shown while frame is capturing
                <div className="w-full h-full bg-white/10 animate-pulse" />
            )}
        </div>
    );
}

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const trackRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 12000);
        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        if (!trackRef.current) return;
        gsap.to(trackRef.current, {
            xPercent: -current * 100,
            duration: 1,
            ease: "back.inOut(1)",
        });
    }, [current]);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">

            {/* Video track */}
            <div ref={trackRef} className="flex w-full h-full">
                {slides.map((src, i) => (
                    <video
                        key={i}
                        src={src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover flex-shrink-0"
                    />
                ))}
            </div>

            {/* Gradient overlay */}
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
            <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 md:gap-5 z-10">
                {slides.map((src, i) => (
                    <Thumbnail
                        key={src}
                        src={src}
                        isActive={i === current}
                        onClick={() => setCurrent(i)}
                    />
                ))}
            </div>

        </div>
    );
}