import { TutorCategories } from "./tutorcategories.type";

export interface Categories {
  id: string;
  title: string;
  image?: string | null;

  tutors?: TutorCategories[];
}
