"use client";
import { cn } from "@/lib/utils";
import { HTMLAttributes, useEffect, useState } from "react";
import WaveReveal from "../text/wave-reveal";

interface ImageProps extends HTMLAttributes<HTMLDivElement> {
	item: { image: string; title: string };
	index: number;
	activeItem: number;
}

interface ExpandableProps {
	list?: { image: string; title: string }[];
	autoPlay?: boolean;
	className?: string;
}

const List = ({ item, className, index, activeItem, ...props }: ImageProps) => {
	return (
		<div
			className={cn(
				"relative flex h-full w-20 min-w-10 cursor-pointer overflow-hidden rounded-md transition-all delay-0 duration-300 ease-in-out",
				{
					"flex-grow": index === activeItem,
				},
				className
			)}
			{...props}
		>
			<img
				src={item.image}
				alt={item.title}
				className={cn("h-full w-full object-cover object-top", {
					"blur-[2px]": index !== activeItem,
				})}
			/>
			{index === activeItem && (
				<div className="absolute bottom-4 left-4 min-w-fit text-white md:bottom-8 md:left-8">
					<WaveReveal
						duration="1000ms"
						className="items-start justify-start text-xl sm:text-2xl md:text-6xl"
						text={item.title}
						direction="up"
					/>
				</div>
			)}
		</div>
	);
};

const items = [
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

export default function Expandable({
	list = items,
	autoPlay = true,
	className,
}: ExpandableProps) {
	const [activeItem, setActiveItem] = useState(0);
	const [isHovering, setIsHovering] = useState(false);

	useEffect(() => {
		if (!autoPlay) return;

		const interval = setInterval(() => {
			if (!isHovering) {
				setActiveItem((prev) => (prev + 1) % list.length);
			}
		}, 5000);

		return () => clearInterval(interval);
	}, [autoPlay, list.length, isHovering]);

	return (
		<div
			className={cn("flex h-screen w-full gap-1", className)}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			{list.map((item, index) => (
				<List
					key={item.title}
					item={item}
					index={index}
					activeItem={activeItem}
					onClick={() => setActiveItem(index)}
				/>
			))}
		</div>
	);
}

