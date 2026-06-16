import Link from "next/link";

const logoPath = "/images/logo/murumaster-logo-transparent.png";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#12351f] px-6 py-16 text-white">
      <section className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <img
          src={logoPath}
          alt="Murumaster"
          className="mb-8 h-24 w-auto sm:h-28"
        />
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#f4c542]">
          404
        </p>
        <h1 className="text-3xl font-black sm:text-5xl">
          Otsitud lehte ei leitud
        </h1>
        <Link
          href="/et"
          className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-[#f4c542] px-7 text-sm font-black text-[#12351f] shadow-[0_18px_40px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-white"
        >
          Tagasi avalehele
        </Link>
      </section>
    </main>
  );
}
