import HomeHero from "@/components/home/HomeHero";
import TrustTiles from "@/components/home/TrustTiles";
import ServicesPicker from "@/components/home/ServicesPicker";
import Location from "@/components/home/Location";
import SecurityTrail from "@/components/home/SecurityTrail";
import ElsDelivery from "@/components/home/ElsDelivery";
import Benefits from "@/components/home/Benefits";
import HomeFaq from "@/components/home/HomeFaq";
import { Rails } from "@/components/home/frame";
import SmoothScroll from "@/components/motion/SmoothScroll";

export default function HomePage() {
  return (
    <div className="relative" style={{ background: "#ffffff", color: "#14141a", width: "100%", overflowX: "clip" }}>
      <SmoothScroll />
      <Rails />
      <HomeHero />
      <TrustTiles />
      <ServicesPicker />
      <Location />
      <SecurityTrail />
      <ElsDelivery />
      <Benefits />
      <HomeFaq />
    </div>
  );
}
