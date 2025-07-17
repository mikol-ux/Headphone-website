import Image from "next/image";
import React, { ReactNode } from "react";

interface HerosectionProps {
	image: string;
	children: ReactNode;
	className?: string;
}

const Herosection = ({ image, children, className }: HerosectionProps) => {
	return (
		<section
			className={`panel min-w-screen w-screen max-sm:h-[90vh] h-screen flex items-center justify-center ${className} max-sm:py-4`}
		>
			<div className="flex flex-col md:flex-row w-full max-w-7xl">
				<div className="md:basis-1/2 w-full">{children}</div>
				<div className="relative md:basis-1/2">
					<Image
						src={image}
						alt="Hero Image"
						width={500}
						height={500}
						className="object-contain w-full h-full"
					/>
				</div>
			</div>
		</section>
	);
};

export default Herosection;
