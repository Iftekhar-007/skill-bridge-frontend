import CreateTutorProfileForm from "@/components/modules/tutors/CreateTutorProfileForm";
import { env } from "@/env";
import React from "react";

const CATEGORY_URL = env.CATEGORY_URL;

const CreateTutorProfilePage = async () => {
  const categories = await fetch(`${CATEGORY_URL}/all-category`, {
    cache: "no-store",
  }).then((res) => res.json());
  return (
    <div>
      <CreateTutorProfileForm categories={categories.data} />
    </div>
  );
};

export default CreateTutorProfilePage;
