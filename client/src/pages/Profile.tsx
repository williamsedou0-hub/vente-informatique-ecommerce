import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
	const { user } = useAuth();

	return (
		<main className="connected-page">
			<header className="connected-header">
				<Link to="/accueil" className="site-brand">TGI<span>store</span></Link>
				<Link to="/panier" className="catalogue-link">Mon panier</Link>
			</header>
			<section className="connected-hero">
				<p className="home-kicker">Mon compte</p>
				<h1>{user?.name || "Votre profil"}</h1>
				<p>{user?.email || "Gérez vos informations personnelles."}</p>
			</section>
		</main>
	);
}
