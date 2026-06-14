"use client";

import Link from "next/link";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { content, Locale, RequestType, ServiceItem } from "@/lib/content";

type LandingPageProps = {
  locale: Locale;
};

const transparentLogoPath = "/images/logo/murumaster-logo-transparent.png";
const fallbackLogoPath = "/images/logo/murumaster-logo.png";
const heroImagePath = "/images/hero/hero-tractor-front.jpg";

const localeCodes: Record<Locale, string> = {
  et: "et-EE",
  ru: "ru-RU",
};

const serviceFallbackStyles = [
  "from-[#315c36] via-[#7fa64c] to-[#e8f2d7]",
  "from-[#203829] via-[#6f9b45] to-[#dceacb]",
  "from-[#17201b] via-[#456b39] to-[#c9dcb5]",
  "from-[#27452e] via-[#8b9a5b] to-[#efe6c8]",
  "from-[#263a31] via-[#65776a] to-[#dce4dd]",
  "from-[#12351f] via-[#86b757] to-[#f4c542]",
];

export function LandingPage({ locale }: LandingPageProps) {
  const t = content[locale];
  const otherLocale = locale === "et" ? "ru" : "et";
  const localeCode = localeCodes[locale];
  const [requestType, setRequestType] = useState<RequestType>("equipment");
  const [selectedNeed, setSelectedNeed] = useState("");
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.setAttribute("locale", localeCode);
  }, [locale, localeCode]);

  useEffect(() => {
    if (!activeService) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveService(null);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeService]);

  function scrollToLead(type?: RequestType) {
    if (type) {
      setRequestType(type);
    }

    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  }

  function selectService(service: ServiceItem) {
    const nextType = service.image.includes("niitmisteenus")
      ? "service"
      : "equipment";

    setRequestType(nextType);
    setSelectedNeed(service.title);
    setActiveService(null);
    scrollToLead(nextType);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const requestTypeLabel =
      requestType === "equipment" ? t.form.equipment : t.form.service;

    const payload = {
      language: locale,
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      requestType: requestTypeLabel,
      service: String(formData.get("need") ?? ""),
      region: String(formData.get("area") ?? ""),
      comment: String(formData.get("comment") ?? ""),
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Lead submit failed");
      }

      setSubmitted(true);
      form.reset();
      setSelectedNeed("");
      setRequestType("equipment");
    } catch {
      setSubmitError(
        locale === "et"
          ? "Midagi läks valesti. Palun proovige uuesti või kirjutage meile: muru.master.ee@gmail.com"
          : "Что-то пошло не так. Попробуйте ещё раз или напишите нам: muru.master.ee@gmail.com",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main
      lang={locale}
      data-locale={localeCode}
      className="min-h-screen overflow-hidden bg-[#f7faf5] text-[#17201b]"
    >
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#12351f]/95 text-white backdrop-blur">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:min-h-[5.5rem] lg:px-8">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Logo />
            <span className="leading-none">
              <span className="block text-xl font-black tracking-[0.08em] text-white sm:text-2xl">
                MURUMASTER
              </span>
              <span className="mt-1 hidden text-xs font-black uppercase tracking-[0.16em] text-[#f4c542] sm:block">
                Aiatehnika rent
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-white/82 md:flex">
            {t.nav.map((item, index) => (
              <a
                key={item}
                href={["#tehnika", "#teenused", "#teenused", "#kontakt"][index]}
                className="transition hover:text-[#f4c542]"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden rounded-full border border-white/20 p-1 text-xs font-bold sm:flex">
              <Link
                href="/et"
                className={`rounded-full px-3 py-1.5 ${
                  locale === "et" ? "bg-white text-[#12351f]" : "text-white/75"
                }`}
              >
                ET
              </Link>
              <Link
                href="/ru"
                className={`rounded-full px-3 py-1.5 ${
                  locale === "ru" ? "bg-white text-[#12351f]" : "text-white/75"
                }`}
              >
                RU
              </Link>
            </div>
            <button
              type="button"
              onClick={() => scrollToLead()}
              className="rounded-full bg-[#f4c542] px-4 py-2 text-sm font-black text-[#17201b] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#ffd95f]"
            >
              {t.cta}
            </button>
          </div>
        </div>
      </header>

      <section className="relative bg-[#12351f] pt-28 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(244,197,66,0.2),transparent_28%),linear-gradient(135deg,rgba(18,53,31,0.98),rgba(23,32,27,0.94))]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f7faf5] to-transparent" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-8 sm:px-6 md:grid-cols-[0.92fr_1.08fr] md:items-center lg:px-8 lg:pb-16">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-[#f4c542]/50 bg-white/8 px-4 py-2 text-sm font-bold text-[#f4c542]">
              {t.hero.eyebrow}
            </p>
            <h1 className="text-5xl font-black leading-none sm:text-6xl lg:text-7xl">
              {t.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-2xl font-bold leading-tight text-white sm:text-3xl">
              {t.hero.subtitle}
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/78 sm:text-lg">
              {t.hero.text}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {t.choices.map((choice) => (
                <button
                  key={choice.type}
                  type="button"
                  onClick={() => scrollToLead(choice.type)}
                  className="rounded-full border border-white/15 bg-white px-5 py-3 text-sm font-black text-[#12351f] shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#f4c542]"
                >
                  {choice.button}
                </button>
              ))}
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-2 shadow-2xl shadow-black/35">
            <ImageWithFallback
              src={heroImagePath}
              alt="Murumaster lawn tractor service"
              className="h-[360px] w-full rounded-[1.65rem] object-cover sm:h-[470px]"
              fallbackClassName="h-[360px] rounded-[1.65rem] sm:h-[470px]"
            >
              <span className="text-2xl font-black">Murumaster</span>
            </ImageWithFallback>
          </div>
        </div>
      </section>

      <section className="relative bg-[#f7faf5] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto -mt-2 grid max-w-7xl gap-3 rounded-[1.35rem] border border-[#dbe5d8] bg-white p-3 shadow-xl shadow-[#12351f]/10 sm:grid-cols-2 lg:grid-cols-4">
          {t.trustItems.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl bg-[#f7faf5] px-4 py-3 text-sm font-black text-[#263a31]"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[#f4c542]" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="tehnika" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            {t.choiceTitle}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {t.choices.map((choice) => (
              <article
                key={choice.type}
                className="group overflow-hidden rounded-[1.65rem] border border-[#dbe5d8] bg-white shadow-xl shadow-[#12351f]/8 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#12351f]/18"
              >
                <ImageWithFallback
                  src={choice.image}
                  alt={choice.title}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  fallbackClassName="h-56"
                >
                  <span className="text-xl font-black">{choice.title}</span>
                </ImageWithFallback>
                <div className="p-6 sm:p-7">
                  <h3 className="text-2xl font-black">{choice.title}</h3>
                  <p className="mt-3 min-h-14 leading-7 text-[#526054]">
                    {choice.text}
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollToLead(choice.type)}
                    className="mt-6 rounded-full bg-[#12351f] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#12351f]/20 transition hover:bg-[#255b35] group-hover:bg-[#f4c542] group-hover:text-[#17201b]"
                  >
                    {choice.button}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="teenused" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              {t.servicesTitle}
            </h2>
            <div className="hidden h-1 w-32 rounded-full bg-[#f4c542] sm:block" />
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.map((service, index) => (
              <article
                key={service.title}
                role="button"
                tabIndex={0}
                onClick={() => selectService(service)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    selectService(service);
                  }
                }}
                className="group cursor-pointer overflow-hidden rounded-[1.35rem] border border-[#dbe5d8] bg-white text-left shadow-lg shadow-[#12351f]/6 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#12351f]/14 active:scale-[0.985] focus:outline-none focus:ring-4 focus:ring-[#f4c542]/45"
              >
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveService(service);
                  }}
                  className="relative block w-full overflow-hidden text-left focus:outline-none focus:ring-4 focus:ring-inset focus:ring-[#f4c542]/45"
                  aria-label={service.title}
                >
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    fallbackClassName={`h-44 bg-gradient-to-br ${serviceFallbackStyles[index]}`}
                  >
                    <span className="max-w-[12rem] text-center text-xl font-black">
                      {service.title}
                    </span>
                  </ImageWithFallback>
                  <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#17201b]/82 text-lg font-black text-white shadow-xl backdrop-blur transition group-hover:bg-[#12351f]">
                    +
                  </span>
                </button>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-black leading-tight">
                        {service.title}
                      </h3>
                      <p className="mt-1 text-xs font-black uppercase tracking-[0.08em] text-[#6d786f]">
                        {service.model}
                      </p>
                    </div>
                    <p className="shrink-0 rounded-full bg-[#f4c542] px-3.5 py-1.5 text-sm font-black text-[#17201b]">
                      {service.price}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#526054]">
                    {service.description}
                  </p>
                  <ul className="mt-3 grid gap-1.5">
                    {service.specs.slice(0, 3).map((spec) => (
                      <li
                        key={spec}
                        className="flex items-start gap-2 text-xs font-semibold leading-5 text-[#526054]"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f4c542]" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-5 inline-flex text-sm font-black text-[#12351f] transition group-hover:text-[#7a5b00]">
                    {service.cta}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,#17201b,#12351f)] py-10 text-white sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            {t.howTitle}
          </h2>
          <div className="relative mt-8 grid gap-7 md:grid-cols-4 md:gap-4">
            <div className="absolute left-4 top-0 hidden h-full w-px bg-[#f4c542]/55 max-md:block" />
            <div className="absolute left-0 right-0 top-4 hidden h-px bg-[#f4c542]/55 md:block" />
            {t.steps.map((step, index) => (
              <div
                key={step.title}
                className="relative grid grid-cols-[2rem_1fr] gap-4 md:block"
              >
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#f4c542] text-xs font-black text-[#17201b] shadow-lg shadow-black/20">
                  {index + 1}
                </span>
                <div className="md:mt-5">
                  <p className="text-lg font-black leading-tight">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-white/68">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="kontakt"
        className="bg-[linear-gradient(180deg,#f7faf5,#eef6e9)] py-16 sm:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.35fr_0.65fr] lg:items-start lg:px-8">
          <div className="relative overflow-hidden rounded-[1.65rem] bg-[#12351f] p-6 text-white shadow-2xl shadow-[#12351f]/20 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_10%,rgba(244,197,66,0.28),transparent_24%),linear-gradient(135deg,transparent,rgba(255,255,255,0.06))]" />
            <div className="relative">
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                {t.areaTitle}
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-white/72">
                {t.areaText}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {t.areas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {t.areaFeatures.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-2 rounded-full border border-[#f4c542]/35 bg-white/10 px-4 py-2 text-xs font-black text-white"
                  >
                    <span className="text-[#f4c542]">✓</span>
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <form
            onSubmit={onSubmit}
            lang={locale}
            data-locale={localeCode}
            className="rounded-[1.5rem] border border-[#dbe5d8] bg-white p-5 shadow-2xl shadow-[#12351f]/10 sm:p-6"
          >
            {submitted ? (
              <div className="rounded-2xl bg-[#12351f] p-6 text-lg font-bold leading-8 text-white">
                {t.form.success}
              </div>
            ) : (
              <div>
                <h2 className="text-3xl font-black tracking-tight text-[#17201b] sm:text-4xl">
                  {t.form.title}
                </h2>
                <p className="mt-3 leading-7 text-[#526054]">{t.form.text}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label={t.form.name} name="name" required />
                <Field label={t.form.email} name="email" type="email" required />
                <label className="grid gap-2 text-sm font-bold text-[#314338]">
                  {t.form.type}
                  <select
                    name="requestType"
                    value={requestType}
                    onChange={(event) =>
                      setRequestType(event.target.value as RequestType)
                    }
                    className="h-12 rounded-xl border border-[#cddccd] bg-white px-3 text-[#17201b] outline-none focus:border-[#12351f]"
                  >
                    <option value="equipment">{t.form.equipment}</option>
                    <option value="service">{t.form.service}</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-bold text-[#314338]">
                  {t.form.need}
                  <select
                    name="need"
                    value={selectedNeed}
                    required
                    onChange={(event) => setSelectedNeed(event.target.value)}
                    className="h-12 rounded-xl border border-[#cddccd] bg-white px-3 text-[#17201b] outline-none focus:border-[#12351f]"
                  >
                    <option value="" disabled>
                      {t.form.need}
                    </option>
                    {t.form.needOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <Field label={t.form.area} name="area" required />
                <label className="grid gap-2 text-sm font-bold text-[#314338] sm:col-span-2">
                  {t.form.comment}
                  <textarea
                    name="comment"
                    rows={4}
                    className="rounded-xl border border-[#cddccd] bg-white px-3 py-3 text-[#17201b] outline-none focus:border-[#12351f]"
                  />
                </label>
                {submitError ? (
                  <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700 sm:col-span-2">
                    {submitError}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-[#f4c542] px-6 py-4 text-sm font-black text-[#17201b] transition hover:bg-[#ffd95f] disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2"
                >
                  {isSubmitting
                    ? locale === "et"
                      ? "Saadan..."
                      : "Отправляем..."
                    : t.form.button}
                </button>
                <p className="text-center text-sm leading-6 text-[#6d786f] sm:col-span-2">
                  {locale === "et"
                    ? "Ei soovi vormi täita?"
                    : "Не хотите заполнять форму?"}
                  <br />
                  {locale === "et" ? "Kirjuta meile: " : "Напишите нам: "}
                  <a
                    href="mailto:muru.master.ee@gmail.com"
                    className="font-bold text-[#314338] underline decoration-[#f4c542]/70 underline-offset-4 transition hover:text-[#12351f]"
                  >
                    muru.master.ee@gmail.com
                  </a>
                </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      <footer className="bg-[#17201b] px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xl font-black tracking-[0.08em]">Murumaster</p>
            <p className="mt-2 text-sm text-white/65">{t.footer.line1}</p>
            <p className="text-sm text-white/65">{t.footer.line2}</p>
          </div>
          <div className="flex items-center gap-4 text-sm font-bold text-white/75">
            <Link href={`/${otherLocale}`}>{otherLocale.toUpperCase()}</Link>
            {t.footer.links.map((link) => (
              <a key={link} href="#" className="hover:text-[#f4c542]">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {activeService ? (
        <ServiceModal
          service={activeService}
          onClose={() => setActiveService(null)}
          onCta={() => selectService(activeService)}
        />
      ) : null}
    </main>
  );
}

type ServiceModalProps = {
  service: ServiceItem;
  onClose: () => void;
  onCta: () => void;
};

function ServiceModal({ service, onClose, onCta }: ServiceModalProps) {
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#07120b]/78 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={service.title}
      onMouseDown={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-[1.75rem] bg-white shadow-2xl shadow-black/40"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#17201b]/82 text-2xl font-light leading-none text-white shadow-xl backdrop-blur transition hover:bg-[#12351f]"
          aria-label="Close"
        >
          ×
        </button>
        <ImageWithFallback
          src={service.image}
          alt={service.title}
          className="h-[52vh] min-h-72 w-full object-cover"
          fallbackClassName="h-[52vh] min-h-72"
        >
          <span className="max-w-[14rem] text-center text-2xl font-black">
            {service.title}
          </span>
        </ImageWithFallback>
        <div className="max-h-[48vh] overflow-y-auto p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <h3 className="text-2xl font-black leading-tight text-[#17201b] sm:text-3xl">
              {service.title}
            </h3>
            <p className="mt-2 text-sm font-black uppercase tracking-[0.08em] text-[#6d786f]">
              {service.model}
            </p>
            <p className="mt-3 inline-flex rounded-full bg-[#f4c542] px-5 py-2 text-base font-black text-[#17201b]">
              {service.price}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#526054] sm:text-base">
              {service.description}
            </p>
            <ul className="mt-5 grid gap-2">
              {service.specs.map((spec) => (
                <li
                  key={spec}
                  className="flex items-start gap-3 rounded-2xl bg-[#f7faf5] px-4 py-3 text-sm font-bold leading-6 text-[#314338]"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#f4c542]" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            onClick={onCta}
            className="rounded-full bg-[#12351f] px-6 py-4 text-sm font-black text-white shadow-xl shadow-[#12351f]/20 transition hover:-translate-y-0.5 hover:bg-[#255b35]"
          >
            {service.cta}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  const [hasLogo, setHasLogo] = useState(true);
  const [logoSrc, setLogoSrc] = useState(transparentLogoPath);
  const isFallbackLogo = logoSrc === fallbackLogoPath;

  if (!hasLogo) {
    return (
      <span className="text-xl font-black tracking-[0.08em]">Murumaster</span>
    );
  }

  const image = (
    <img
      src={logoSrc}
      alt="Murumaster"
      onError={() => {
        if (logoSrc === transparentLogoPath) {
          setLogoSrc(fallbackLogoPath);
          return;
        }

        setHasLogo(false);
      }}
      className="h-[68px] w-auto object-contain sm:h-20 lg:h-[84px]"
    />
  );

  if (!isFallbackLogo) {
    return image;
  }

  return (
    <span className="inline-flex items-center rounded-2xl bg-[#0b1c11]/72 p-1.5 shadow-lg shadow-black/25 ring-1 ring-white/10">
      {image}
    </span>
  );
}

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  className: string;
  fallbackClassName: string;
  children: ReactNode;
};

function ImageWithFallback({
  src,
  alt,
  className,
  fallbackClassName,
  children,
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#12351f] via-[#6f9b45] to-[#e8f2d7] text-white ${fallbackClassName}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.55),transparent_16%),linear-gradient(180deg,transparent,rgba(18,53,31,0.45))]" />
        <div className="relative px-6 text-center drop-shadow-lg">{children}</div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={className}
      loading="lazy"
    />
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  lang?: Locale;
  locale?: string;
};

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  lang,
  locale,
}: FieldProps) {
  return (
    <label className="grid gap-2 text-sm font-bold text-[#314338]">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        lang={lang}
        {...(locale ? { locale } : {})}
        className="h-12 rounded-xl border border-[#cddccd] bg-white px-3 text-[#17201b] outline-none focus:border-[#12351f]"
      />
    </label>
  );
}
