import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x py-32">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4">This page doesn&apos;t exist.</h1>
      <p className="mt-6 text-lg text-mute">It may have moved, or the link may be mistyped.</p>
      <Link href="/" className="btn mt-10">
        Back to home
      </Link>
    </section>
  );
}
