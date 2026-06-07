import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Sectors } from "@/components/sections/Sectors";
import { Solutions } from "@/components/sections/Solutions";
import { Process } from "@/components/sections/Process";
import { InnoCell } from "@/components/sections/InnoCell";
import { Structures } from "@/components/sections/Structures";
import { Certifications } from "@/components/sections/Certifications";
import { AreaClienti } from "@/components/sections/AreaClienti";
import { ContactCta } from "@/components/sections/ContactCta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-zinc-950 text-white">
        <Hero />
        <Manifesto />
        <Sectors />
        <Solutions />
        <Process />
        <InnoCell />
        <Structures />
        <Certifications />
        <AreaClienti />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
