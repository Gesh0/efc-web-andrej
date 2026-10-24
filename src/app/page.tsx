import HomeHero from "@/components/home/HomeHero";
import TrustTiles from "@/components/home/TrustTiles";
import ServicesPicker from "@/components/home/ServicesPicker";
import Location from "@/components/home/Location";
import SecurityTrail from "@/components/home/SecurityTrail";
import ElsDelivery from "@/components/home/ElsDelivery";
import Benefits from "@/components/home/Benefits";
import FaqSection from "@/components/FaqSection";
import CtaBand from "@/components/CtaBand";
import SmoothScroll from "@/components/motion/SmoothScroll";

const HOME_FAQ = [
  {
    q: "Може ли да користам само дел од услугите?",
    a: "Да. Секоја услуга може да се користи посебно: само складирање, сортирање и поделба на роба, фискализација или палетно работење. Ако ви треба нешто што не е на листата, кажете ни.",
  },
  {
    q: "Колку чини?",
    a: "Цената зависи од просторот што го користите и од бројот на нарачки. Нема фиксен месечен трошок. Кажете ни што продавате и колку нарачки имате, и ќе добиете точна понуда.",
  },
  {
    q: "Колку време треба за да почнеме?",
    a: "По првиот разговор ги договараме деталите, ја поврзуваме вашата продавница со нашиот систем и ја примаме стоката. Рокот зависи од бројот на артикли и од интеграцијата.",
  },
  {
    q: "Што ако имам мал број нарачки?",
    a: "Работиме со продавници од 100 нарачки. Плаќате само за она што го користите, па и мал обем има смисла.",
  },
  {
    q: "Што ако купувач рекламира дека нешто недостасува?",
    a: "Секоја нарачка е снимена при пакување. Ја проверуваме снимката од таа нарачка и ви ја испраќаме.",
  },
];

export default function HomePage() {
  return (
    <div style={{ background: "#ffffff", color: "#14141a", width: "100%", overflowX: "clip" }}>
      <SmoothScroll />
      <HomeHero />
      <TrustTiles />
      <ServicesPicker />
      <Location />
      <SecurityTrail />
      <ElsDelivery />
      <Benefits />
      <FaqSection id="faq" single wide items={HOME_FAQ} />
      <CtaBand
        wide
        title="Кажете ни што продавате"
        body="Ќе ви кажеме точно како би работеле со вашата стока и колку би чинело."
        steps={["Ве повикуваме", "Прашуваме за производите и бројот на нарачки", "Ве каниме да го видите магацинот", "Добивате понуда"]}
        label="Побарај понуда"
        href="/contact"
      />
    </div>
  );
}
