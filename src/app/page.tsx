// import { Hero1 } from "@/components/layouts/hero1";

import { Hero1 } from "@/components/layouts/hero1";

export default function Home() {
  return (
    <div className="max-w-9/12 mx-auto">
      <Hero1
        heading="Welcome"
        description="Your description here"
        // image="/stu1.jpg"
        image={{ src: "stu1.jpg", alt: "Student" }}
      ></Hero1>
    </div>
  );
}
