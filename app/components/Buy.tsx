"use client";
import { useState } from "react";
import { Minus, Plus, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const product = {
	title: "BOOM BUDS 3000",
	price: 400,
	originalPrice: 420,
	description:
		"Captivate with this shirt’s versatile urban look that works as well at happy hour as it does in the back yard. The real mother of pearl buttons and embroidered crocodile complete its elegant appeal. Lorem ipsum...",
	colors: ["white", "blue", "black"],
	images: [
		{ img: "/Hero/whitecut.png", color: "white" },
		{ img: "/Hero/blackcut.png", color: "black" },
		{ img: "/Hero/skycut.png", color: "blue" },
	],
};

export default function ProductDetails() {
	const [selectedColor, setSelectedColor] = useState("white");
	const [quantity, setQuantity] = useState(1);
	const [activeImage, setActiveImage] = useState("/Hero/whitecut.png");

	return (
		<div className="bg-white grid grid-cols-1 md:grid-cols-2 max-w-7xl p-3 mx-auto mb-40">
			{/* Left: Image section */}
			<div>
				<Image
					src={activeImage}
					alt="Main Product"
					width={500}
					height={500}
					className="rounded-xl object-cover"
				/>
			</div>

			{/* Right: Details section */}
			<div className="space-y-6">
				<div>
					<h1 className="text-3xl font-semibold">{product.title}</h1>
					<div className="flex items-center gap-4 mt-2">
						<span className="text-2xl font-bold">${product.price}</span>
						<span className="line-through text-gray-400">
							${product.originalPrice}
						</span>
					</div>
				</div>

				<p className="text-gray-600">{product.description}</p>

				{/* Color */}
				<div>
					<h3 className="text-sm font-medium mb-1">Color:</h3>
					<div className="flex gap-3">
						{product.images.map((color, i) => (
							<button
								key={i}
								onClick={() => {
									setSelectedColor(color.color);
									setActiveImage(color.img);
								}}
								className={cn("h-8 w-8 rounded-full border-2 transition-all", {
									"border-black": selectedColor === color.color,
									"border-gray-300": selectedColor !== color.color,
									"bg-white": color.color === "white",
									"bg-blue-300": color.color === "blue",
									"bg-gray-900": color.color === "black",
								})}
							/>
						))}
					</div>
				</div>

				{/* Quantity */}
				<div className="flex items-center gap-3">
					<h3 className="text-sm font-medium">Quantity:</h3>
					<div className="flex items-center border rounded-md px-2">
						<button
							onClick={() => setQuantity(Math.max(1, quantity - 1))}
							className="p-1"
						>
							<Minus size={16} />
						</button>
						<span className="px-3">{quantity}</span>
						<button onClick={() => setQuantity(quantity + 1)} className="p-1">
							<Plus size={16} />
						</button>
					</div>
				</div>

				{/* Buttons */}
				<div className="flex flex-col sm:flex-row gap-3">
					{/* <Button variant="secondary" className="w-full sm:w-auto">
						Add To Cart
					</Button>
					<Button className="w-full sm:w-auto">Buy It Now</Button> */}
					<button className="px-8 py-2  bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg">
						Add to cart
					</button>
					<button className="px-8 py-2  bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg">
						Buy It Now
					</button>
					<button className="flex items-center gap-1 text-sm text-gray-600 hover:text-black">
						<Heart size={16} /> Add To Wishlist
					</button>
				</div>

				{/* Shipping Info */}
				<div className="text-sm text-gray-500 mt-4 space-y-1">
					<p>📦 Orders ship within 5 to 10 business days.</p>
					<p>🚚 Hooray! This item ships free to the US</p>
				</div>
			</div>
		</div>
	);
}
