export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl p-8 text-center">
      <h1 className="mb-2 text-3xl font-bold">Not Found</h1>
      <p className="text-neutral-300">Sorry, the page you’re looking for doesn’t exist.</p>
      <a href="/" className="mt-6 inline-block rounded bg-white px-4 py-2 text-black">Go Home</a>
    </div>
  );
}
