"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Herosection from "./Herosection";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
const heroSections = [
	{
		children: (
			<div className="text-center md:text-left space-y-8 px-4 sm:px-8 md:px-16">
				<h1 className="text-5xl md:text-6xl 2xl:text-9xl font-extrabold text-gray-900 leading-tight mb-4">
					Sound that Moves <span className="text-cyan-900">You.</span>
				</h1>
				<p className="text-lg md:text-xl 2xl:text-2xl text-gray-600 max-w-2xl mx-auto md:mx-0">
					Experience unparalleled clarity, deep bass, and active noise
					cancellation.
				</p>
			</div>
		),
		image: "/Hero/skycut.png",
		className: "bg-gradient-to-r from-[#86c2b7] to-[#58a09f]",
	},
	{
		children: (
			<div className="text-center md:text-left space-y-8 px-4 sm:px-8 md:px-16">
				<h1 className="text-5xl md:text-6xl 2xl:text-9xl font-extrabold text-white leading-tight mb-4">
					Silence. Precision. Power.
				</h1>
				<p className="text-lg md:text-xl 2xl:text-2xl text-gray-300 max-w-2xl mx-auto md:mx-0">
					Powered by adaptive noise cancellation, our headphones let you focus
					on what matters.
				</p>
			</div>
		),
		image: "/Hero/blackcut.png",
		className: "bg-gradient-to-r from-black to-[#333]",
	},
	{
		children: (
			<div className="text-center md:text-left space-y-8 px-4 sm:px-8 md:px-16">
				<h1 className="text-5xl md:text-6xl 2xl:text-9xl font-extrabold text-gray-900 leading-tight mb-4">
					Comfort that Lasts.
				</h1>
				<p className="text-lg md:text-xl 2xl:text-2xl text-gray-600 max-w-2xl mx-auto md:mx-0">
					Designed for all-day wear with ultra-soft memory foam ear cushions.
					Comfort is key, even during long listening sessions.
				</p>
			</div>
		),
		image: "/Hero/whitecut.png",
		className: "bg-gradient-to-r from-white to-[#f4f4f4]",
	},
];

export default function ProcessSection() {
	const container = useRef<HTMLDivElement>(null);
	const animationRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const sections = animationRef.current?.querySelectorAll(".panel") || [];

			// Fade in the container when loaded
			gsap.to(animationRef.current, {
				opacity: 1,
				duration: 0.5,
			});

			// Scroll-triggered horizontal scroll
			gsap.to(sections, {
				xPercent: -100 * (sections.length - 1),
				ease: "none",
				scrollTrigger: {
					trigger: animationRef.current,
					pin: true,
					scrub: 1,
					snap: {
						snapTo: 1 / (sections.length - 1),
						duration: 0.6, // ← snappy and quick
						delay: 0.1, // ← snap soon after scroll ends
						ease: "power1.out", // ← smooth but fast
					},
					end: () => "+=" + animationRef.current?.offsetWidth,
					// markers: true, // Uncomment for debugging
				},
			});
		},
		{ scope: container }
	);

	return (
		<section className="w-full overflow-x-hidden" ref={container}>
			<div
				className="flex h-screen w-[400%] flex-nowrap bg-background-secondary opacity-0 transition-opacity"
				ref={animationRef}
			>
				{heroSections.map((item, index) => (
					<div className="" key={index}>
						<Herosection
							image={item.image}
							className={`hero-section ${item.className}`}
						>
							{item.children}
						</Herosection>
					</div>
				))}
			</div>
		</section>
	);
}
