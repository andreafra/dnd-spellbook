import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
	return (
		<div className="container mx-auto px-4 font-serif">
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	);
}
