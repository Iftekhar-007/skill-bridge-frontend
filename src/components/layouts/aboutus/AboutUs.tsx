// // import React from "react";

// // export default function AboutUs() {
// //   return <div>AboutUs</div>;
// // }

// import Image from "next/image";

// export default function AboutUs() {
//   return (
//     <section className="container py-16 md:py-24">
//       <div className="grid items-center gap-12 lg:grid-cols-2">
//         {/* Left Content */}
//         <div className="space-y-6">
//           <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
//             About Skill Bridge
//           </h2>
//           <p className="text-muted-foreground leading-relaxed">
//             Skill Bridge is built to connect passionate learners with
//             experienced instructors. Our mission is to make quality education
//             accessible, practical, and career-focused for everyone.
//           </p>
//           <p className="text-muted-foreground leading-relaxed">
//             Whether youre here to teach or to learn, our platform creates a
//             supportive environment where knowledge turns into real-world skills.
//             We believe learning should be simple, interactive, and impactful.
//           </p>
//         </div>

//         {/* Right Gallery */}
//         <div className="grid grid-cols-2 gap-4">
//           <div className="relative  w-full overflow-hidden rounded-2xl">
//             <Image
//               src="/stu2.jpg"
//               alt="Students learning together"
//               fill
//               className="object-cover"
//             />
//           </div>

//           <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
//             <Image
//               src="/stu3.jpg"
//               alt="Online learning session"
//               fill
//               className="object-cover"
//             />
//           </div>

//           <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
//             <Image
//               src="/stu4.jpg"
//               alt="Teacher explaining lesson"
//               fill
//               className="object-cover"
//             />
//           </div>

//           <div className="relative  w-full overflow-hidden rounded-2xl">
//             <Image
//               src="/stu2.jpg"
//               alt="Students collaborating"
//               fill
//               className="object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section className="container py-10 md:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left Content */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            About Skill Bridge __
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            Skill Bridge is an online learning platform built to connect
            passionate learners with experienced instructors. We believe
            education should go beyond theory — it should help people develop
            real skills they can use in their careers and daily lives.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Our platform creates a supportive environment where students can
            learn at their own pace while still receiving guidance, feedback,
            and motivation from dedicated teachers. Every course is designed to
            be practical, structured, and easy to follow.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Whether you want to grow professionally, explore a new interest, or
            share your knowledge with others, Skill Bridge helps turn learning
            into real progress. We are committed to making quality education
            accessible, interactive, and impactful for everyone.
          </p>

          <Link href="#" className="font-bold text-green-500">
            Learn More...
          </Link>
        </div>

        {/* Right Stylish Gallery */}
        <div className="grid grid-cols-2 gap-5">
          <div className="group relative  overflow-hidden rounded-3xl rotate-[-2deg]">
            <Image
              src="/stu2.jpg"
              alt="Students learning together"
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 group-hover:opacity-40 transition" />
          </div>

          <div className="group relative aspect-square overflow-hidden rounded-3xl rotate-[2deg] mt-6">
            <Image
              src="/stu3.jpg"
              alt="Online learning session"
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 group-hover:opacity-40 transition" />
          </div>

          <div className="group relative aspect-square overflow-hidden rounded-3xl rotate-[1.5deg]">
            <Image
              src="/stu4.jpg"
              alt="Teacher explaining lesson"
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 group-hover:opacity-40 transition" />
          </div>

          <div className="group relative  overflow-hidden rounded-3xl rotate-[-1.5deg] -mt-6">
            <Image
              src="/stu2.jpg"
              alt="Students collaborating"
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 group-hover:opacity-40 transition" />
          </div>
        </div>
      </div>
    </section>
  );
}
