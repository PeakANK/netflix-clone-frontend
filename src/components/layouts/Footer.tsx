export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 py-10 text-neutral-400">
      <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-4">
        <a href="#">Audio Description</a>
        <a href="#">Help Center</a>
        <a href="#">Gift Cards</a>
        <a href="#">Investor Relations</a>
        <a href="#">Jobs</a>
        <a href="#">Terms of Use</a>
        <a href="#">Privacy</a>
        <a href="#">Legal Notices</a>
      </div>
      <p className="mt-6 text-xs opacity-70">© {new Date().getFullYear()} Netflix Clone</p>
    </footer>
  );
}
