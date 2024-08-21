import Link from "next/link";

import Image from "next/image";
import VisitorBtn from "@/components/visitorBtn";


export default function Landing() {
  return (
    <div className="p-4 w-full flex flex-col min-h-[100vh] bg-[#D9AFD9] bg-gradient-to-b from-[#D9AFD9] to-[#97D9E1] justify-between">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="https://www.ikontel.com/"
          target="_blank"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <Image
            src="/images/ikontel-logo.png"
            width={100}
            height={100}
            alt="Ikontel Solutions Private Limites"
          />
        </Link>
      </header>
      <main className="w-full">
        <section className="w-full ">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="lg:space-y-[50px]">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-slate-800">
                    Discover the Best of Our Services
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    We are the best in connecting data with telephony, we are
                    passionate and pioneer to develop or tweak a solution to any
                    problem.
                  </p>
                </div>
                <VisitorBtn />
              </div>
              <img
                src="https://www.ikontel.com/storage/documents/1617796093e8797fb06ff8480b9c87c6ef2ce4d8ce.png"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <Link
          href="https://www.ikontel.com/"
          target="_blank"
          className="flex items-center justify-center gap-3"
          prefetch={false}
        >
          <Image
            src="/images/ikontel-logo.png"
            width={50}
            height={80}
            alt="Ikontel Solutions Private Limites"
          />
        <p className="text-xs text-muted-foreground">
          &copy;{new Date().getFullYear()} IKonTel. All rights reserved.
        </p>
        </Link>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            target="_blank"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            target="_blank"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
