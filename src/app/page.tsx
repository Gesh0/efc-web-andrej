import HomeHero from "@/components/home/HomeHero";
import ServicesReveal from "@/components/home/ServicesReveal";
import WhyStack from "@/components/home/WhyStack";
import Benefits from "@/components/home/Benefits";
import FaqSection from "@/components/FaqSection";
import CtaBand from "@/components/CtaBand";
import SmoothScroll from "@/components/motion/SmoothScroll";

export default function HomePage() {
  return (
    <div style={{ background: "#ffffff", color: "#14141a", width: "100%", overflowX: "clip" }}>
      <SmoothScroll />
      <HomeHero />
      <ServicesReveal />
      <WhyStack />
      <Benefits />
      <FaqSection id="faq" single />
      <CtaBand
        title="Решенија прилагодени на вашиот начин на работа"
        body="Кажете ни што транспортирате, од каде и колку често. Нашиот тим ќе се јави со конкретен предлог и понуда за вашата рута."
        href="/contact"
      />
    </div>
  );
}
