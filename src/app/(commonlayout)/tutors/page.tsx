import { tutorServices } from "@/services/tutor.service";
import { TutorProfile } from "@/types/tutor.type";

export async function generateStaticParams() {
  const data = await tutorServices.getTutors();

  return data.data.data?.map((tutor: TutorProfile) => ({
    id: tutor.id,
  }));
}

export default async function TutorPage() {
  const { data } = await tutorServices.getTutors();
  // console.log(data);
  // console.log(JSON.stringify(data, null, 2));

  return (
    <div className="max-w-9/12 mx-auto grid grid-cols-3 gap-5 mt-20">
      {data.data.data?.map((tutor: TutorProfile) => (
        <h1 key={tutor.id}>{tutor.user?.name}</h1>
      ))}
    </div>
  );
}
