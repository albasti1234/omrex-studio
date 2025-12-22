import Link from "next/link";

export default function PearlFooter() {
  return (
    <footer className="mt-20">
      <div className="pd-container pb-12">
        <div className="pd-hairline mb-10" />
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <div className="pd-kicker mb-3">Pearl Dental</div>
            <div className="text-[1.1rem] font-semibold tracking-tight text-pd-text-main">
              Light-premium clinic demo,
              <br />
              built for trust and conversion.
            </div>
            <p className="mt-4 pd-muted max-w-md text-[0.95rem] leading-relaxed">
              Everything here is demo copy and structure. Swap in real clinic details,
              licenses, providers, and imagery when you are ready.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2 sm:grid-cols-3">
            <div>
              <div className="pd-kicker mb-3 text-pd-primary">Pages</div>
              <ul className="space-y-2 text-[0.95rem]">
                <li>
                  <Link className="pd-muted hover:text-pd-primary transition-colors" href="/demos/pearl-dental">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="pd-muted hover:text-pd-primary transition-colors" href="/demos/pearl-dental/treatments">
                    Treatments
                  </Link>
                </li>
                <li>
                  <Link className="pd-muted hover:text-pd-primary transition-colors" href="/demos/pearl-dental/insurance">
                    Insurance
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="pd-kicker mb-3 text-pd-primary">Clinic</div>
              <ul className="space-y-2 text-[0.95rem]">
                <li>
                  <Link className="pd-muted hover:text-pd-primary transition-colors" href="/demos/pearl-dental/team">
                    Team
                  </Link>
                </li>
                <li>
                  <Link className="pd-muted hover:text-pd-primary transition-colors" href="/demos/pearl-dental/contact">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link className="pd-muted hover:text-pd-primary transition-colors" href="/demos/pearl-dental/booking">
                    Book
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="pd-kicker mb-3 text-pd-primary">Actions</div>
              <ul className="space-y-2 text-[0.95rem]">
                <li>
                  <a className="pd-muted hover:text-pd-primary transition-colors" href="#services">
                    Explore services
                  </a>
                </li>
                <li>
                  <a className="pd-muted hover:text-pd-primary transition-colors" href="#faq">
                    Read FAQs
                  </a>
                </li>
                <li>
                  <a className="pd-muted hover:text-pd-primary transition-colors" href="#location">
                    Find us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 text-[12px] pd-muted">
          <span>(c) {new Date().getFullYear()} Pearl Dental - demo by OMREX.STUDIO</span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-pd-primary" />
            pearl/teal surface system
          </span>
        </div>
      </div>
    </footer>
  );
}
