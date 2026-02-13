import { Categories } from "./categories.type";
import { TutorProfile } from "./tutor.type";

export interface TutorCategories {
  tutorProfileId: string;
  categoryId: string;

  tutor?: TutorProfile;
  category?: Categories;
}
