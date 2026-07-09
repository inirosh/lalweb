// Shared wrapper for static info/policy pages (Delivery, Returns, etc.).
export default function InfoPage({ title, subtitle, children }) {
  return (
    <div>
      <section className="bg-brand-dark py-12 text-center text-white">
        <h1 className="text-3xl font-black sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 text-brand-yellow">{subtitle}</p>}
      </section>
      <div className="info mx-auto max-w-3xl px-4 py-10">{children}</div>
    </div>
  );
}
