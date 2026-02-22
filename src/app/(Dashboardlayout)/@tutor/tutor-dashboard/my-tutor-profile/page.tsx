// import TutorProfileCard from "@/components/cards/TutorProfileCard";
// import { tutorServices } from "@/services/tutor.service";
// import { TutorProfile } from "@/types";
// import React from "react";

// export async function generateStaticParams() {
//   const data = await tutorServices.getTutors();

//   return data.data.map((tutor: TutorProfile) => ({ id: tutor.id }));
// }

// export default async function TutorMyProfilePage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const data = await tutorServices.getSingleTutor(id);
//   console.log(data);

//   if (!data) {
//     return <p className="text-center mt-20 text-red-500">Profile not found!</p>;
//   }

//   const profile = data.data;
//   console.log(profile);
//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold text-center mt-6">Tutor Profile</h1>
//       {/* <TutorProfileCard
//         name={profile.user.name}
//         bio={profile.bio}
//         hourlyRate={profile.hourlyRate}
//         availability={profile.availability}
//         totalStudents={profile.totalStudents}
//         averageRating={profile.averageRating}
//         expertise={profile.expertise.map(
//           (e: { category: { title: string } }) => e.category.title,
//         )}
//       /> */}
//     </div>
//   );
// }

// app/tutor/my-profile/page.tsx
import TutorProfileCard from "@/components/cards/TutorProfileCard";
import { tutorServices } from "@/services/tutor.service";

export default async function TutorMyProfilePage() {
  const { data: profile, error } = await tutorServices.getMyTutorProfile();
  console.log(profile);

  //   if (error || !profile || !profile.user) {
  //     return <p className="text-center mt-20 text-red-500">Profile not found!</p>;
  //   }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mt-6">My Tutor Profile</h1>
    </div>
  );
}
