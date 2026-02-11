// import { Hero1 } from "@/components/layouts/hero1";

import AboutUs from "@/components/layouts/aboutus/AboutUs";
import Count from "@/components/layouts/count/Count";
import { Hero1 } from "@/components/layouts/hero1";
import Specs from "@/components/layouts/specificationn-cards/specs";

export default function Home() {
  return (
    <div className="max-w-9/12 mx-auto">
      <Hero1
        heading="Skill Bridge"
        description="Learn Smart, Be Creative, Teach Smart"
        // image="/stu1.jpg"
        image={{ src: "stu1.jpg", alt: "Student" }}
      ></Hero1>
      <Specs></Specs>
      <AboutUs></AboutUs>
      <Count></Count>
    </div>
  );
}
