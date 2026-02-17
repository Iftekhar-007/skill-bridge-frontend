import SingleTutorCard from "@/components/cards/SingleTutorCard";
import { tutorServices } from "@/services/tutor.service";
import { TutorProfile } from "@/types";
import React from "react";

export async function generateStaticParams() {
  const { data } = await tutorServices.getTutors();

  return data.data.map((tutor: TutorProfile) => ({ id: tutor.id }));
}

const SingleTutor = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const data = await tutorServices.getSingleTutor(id);

  return (
    <div>
      <SingleTutorCard tutor={data.data.data} />
    </div>
  );
};

export default SingleTutor;
