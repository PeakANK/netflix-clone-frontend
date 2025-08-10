import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-neutral-950 text-white px-6">
      <div className="text-center max-w-lg">
        <div className="mx-auto mb-6 h-10 w-10 rounded bg-red-600/90 grid place-items-center font-bold">404</div>
        <h1 className="text-3xl md:text-4xl font-extrabold">Lost your way?</h1>
        <p className="mt-3 text-neutral-300">
          Sorry, we can’t find that page. You’ll find lots to explore on the home page.
        </p>
        <Link href="/" className="mt-6 inline-flex items-center justify-center rounded-md bg-red-600 px-5 py-2.5 font-semibold hover:bg-red-700 transition">
          Netflix Home
        </Link>
      </div>
    </div>
  );
}
