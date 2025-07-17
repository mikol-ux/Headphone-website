const data = [
	{
		image: "/Hero/blueww.jpg",
		title: "Mountains",
	},
	{
		image: "/Hero/blackwm.jpg",
		title: "Great Wall of China",
	},
	{
		image: "/Hero/whitew.jpg",
		title: "Texture & Patterns",
	},
];


"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";



export default function Live() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const slideRef = useRef<HTMLDivElement[]>([]);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const removeActiveClass = useCallback(() => {
		return new Promise<void>((resolve) => {
			slideRef.current.forEach((d) => {
				if (d) {
					gsap.killTweensOf(d);
					gsap.to(d, {
						flex: 1,
						duration: 0.5,
						ease: "none",
					});
				}
			});
			setTimeout(() => resolve(), 100);
		});
	}, []);

	const setActiveSlide = useCallback(
		(index: number) => {
			removeActiveClass().then(() => {
				const slide = slideRef.current[index];
				if (slide) {
					gsap.to(slide, {
						flex: 10,
						duration: 2.5,
						ease: "elastic.out(1, 0.3)",
					});
					setCurrentSlide(index);
				}
			});
		},
		[removeActiveClass]
	);

	// Only start autoplay ONCE
	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % data.length);
		}, 6000);

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, []);

	// Animate the slide when currentSlide changes
	useEffect(() => {
		setActiveSlide(currentSlide);
	}, [currentSlide, setActiveSlide]);

	const handleClick = (i: number) => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
		setCurrentSlide(i);
	};

	return (
		<section className="flex items-center justify-center bg-white min-h-screen">
			<div className="slider flex flex-row w-[85vw] overflow-hidden max-[660px]:flex-col max-[660px]:h-screen max-[660px]:m-8">
				{data.map((d, i) => (
					<div
						key={i}
						className={`slide flex-1 h-[80vh] rounded-[30px] m-2.5 cursor-pointer select-none relative max-[660px]:h-[5vh] ${i === currentSlide ? "active" : ""
							}`}
						ref={(el) => {
							if (el) slideRef.current[i] = el;
						}}
						onClick={() => handleClick(i)}
					>
						<h1
							className={`absolute text-2xl font-semibold bottom-5 left-5 px-3 py-1 bg-black/50 text-white rounded z-10
		max-[660px]:text-[1.2rem] max-[400px]:text-[1rem]
		transition-opacity duration-300
		${i === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"}`}
						>
							{d.title}
						</h1>

						<div
							className="glide block w-full h-full bg-cover bg-center rounded-[30px]"
							style={{ backgroundImage: `url(${d.image})` }}
						></div>
					</div>
				))}
			</div>
		</section>
	);
}
