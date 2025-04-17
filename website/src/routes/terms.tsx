import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
	component: Terms,
	head: () => ({
		meta: [
			{
				title: `Terms of Service - ${metaData.title}`,
			},
			{
				name: "description",
				content: "Terms of Service for Janudocs.",
			},
		],
	}),
});

function Terms() {
	return (
		<>
			<header>
				<h1>Terms of Service</h1>
				<p>
					Welcome to our Terms of Service page. Please read the following terms
					carefully before using our website.
				</p>
			</header>

			<section>
				<h2>Acceptance of Terms</h2>
				<p>
					By accessing or using our website ("Site"), you agree to be bound by
					these Terms of Service ("Terms"). If you do not agree to these Terms,
					please do not use the Site.
				</p>
			</section>

			<section>
				<h2>Changes to Terms</h2>
				<p>
					We reserve the right to modify these Terms at any time. Changes will
					be effective immediately upon posting to the Site. Your continued use
					of the Site after changes are posted constitutes your acceptance of
					the modified Terms.
				</p>
			</section>

			<section>
				<h2>Eligibility</h2>
				<p>
					Anyone can use the Site. By using the Site, you agree to comply with
					these Terms.
				</p>
			</section>

			<section>
				<h2>Use of the Site</h2>
				<p>
					You agree to use the Site only for lawful purposes and in a manner
					that does not infringe the rights of, restrict, or inhibit anyone
					else's use and enjoyment of the Site.
				</p>
				<ul>
					<li>
						You may not use the Site for any illegal or unauthorized purpose.
					</li>
					<li>
						You must not interfere with or disrupt the security, integrity, or
						performance of the Site.
					</li>
					<li>
						You must not attempt to gain unauthorized access to any part of the
						Site or its related systems or networks.
					</li>
				</ul>
			</section>

			<section>
				<h2>Third-Party Links</h2>
				<p>
					The Site may contain links to third-party websites. We are not
					responsible for the content or practices of any linked third-party
					sites. Such links do not imply endorsement.
				</p>
			</section>

			<section>
				<h2>Governing Law</h2>
				<p>
					These Terms are governed by the laws of the jurisdiction in which
					Janudocs operates, without regard to its conflict of law principles.
				</p>
			</section>

			<section>
				<h2>Entire Agreement</h2>
				<p>
					These Terms constitute the entire agreement between you and Janudocs
					regarding the use of the Site, superseding any prior agreements.
				</p>
			</section>

			<section>
				<h2>Contact Information</h2>
				<p>If you have questions about these Terms, please contact us at</p>
			</section>
		</>
	);
}
