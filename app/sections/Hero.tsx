"use client";
import gsap from "gsap";
import React, { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/all";
import Herosection from "../components/Herosection";

gsap.registerPlugin(ScrollTrigger);

const heroSections = [
	{
		children: (
			<div className="text-center md:text-left space-y-6">
				<h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
					Sound that Moves You.
				</h1>
				<p className="text-lg text-gray-600 max-w-lg">
					Experience unparalleled clarity, deep bass, and active noise
					cancellation.
				</p>
			</div>
		),
		image: "/Hero/skycut.png",
		className: "sky",
	},
	{
		children: (
			<div className="text-center md:text-left space-y-6">
				<h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
					Silence. Precision. Power.
				</h1>
				<p className="text-lg text-gray-600 max-w-lg">
					Powered by adaptive noise cancellation, our headphones let you focus
					on what matters.
				</p>
			</div>
		),
		image: "/Hero/blackcut.png",
		className: "black",
	},
	{
		children: (
			<div className="text-center md:text-left space-y-6">
				<h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
					Comfort that Lasts.
				</h1>
				<p className="text-lg text-gray-600 max-w-lg">
					Designed for all-day wear, with ultra-soft memory foam ear cushions.
				</p>
			</div>
		),
		image: "/Hero/whitecut.png",
		className: "white",
	},
];

const Hero = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		if (!containerRef.current) return;

		heroSections.forEach((_, index) => {
			const section = sectionRefs.current[index];
			if (!section) return;

			gsap.from(section, {
				opacity: 0,
				x: index % 2 === 0 ? -200 : 0, // Odd sections from left
				y: index % 2 !== 0 ? -200 : 0, // Even sections from top
				duration: 1.2,
				ease: "power4.out",
				scrollTrigger: {
					trigger: section,
					start: "top 75%", // Start animation when 75% of the section is visible
					end: "bottom 50%",
					toggleActions: "play none none none",
					scrub: true,
					snap: 1 / heroSections.length, // Snap to each section
				},
			});
		});
	}, []);

	return (
		<section ref={containerRef} className="relative w-full min-h-screen">
			{heroSections.map((item, index) => (
				<div
					ref={(el) => {
						sectionRefs.current[index] = el; // ✅ FIXED: Doesn't return anything now
					}}
					className="h-screen flex items-center justify-center m-9"
					key={index}
				>
					<Herosection
						image={item.image}
						className={`hero-section ${item.className}`}
					>
						{item.children}
					</Herosection>
				</div>
			))}
		</section>
	);
};

export default Hero;
