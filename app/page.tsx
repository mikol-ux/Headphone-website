import ProcessSection from "./components/HeroComponent";
import ScrollCoverEffect from "./components/Features";
import Expandable from "./components/Expandable";
import ProductDetails from "./components/Buy";

export default function Home() {
	return (
		<main>
			<ProcessSection />
			<ScrollCoverEffect />
			<ProductDetails />
			<Expandable />
		</main>
	);
}
