import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { revalidateTag, updateTag } from "next/cache";
import { cookies } from "next/headers";

const TUTOR_URL = env.TUTOR_URL;

interface Category {
  id: string;
  title: string;
}

interface Props {
  categories: Category[];
}

export default function CreateTutorProfileForm({ categories }: Props) {
  const createTutor = async (formData: FormData) => {
    "use server";

    const bio = formData.get("bio") as string;
    const hourlyRate = Number(formData.get("hourlyRate"));
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;

    const categoryIds = formData
      .getAll("categoryIds")
      .map((id) => id.toString());

    const tutorData = {
      bio,
      hourlyRate,
      startTime,
      endTime,
      categoryIds,
    };

    const cookieStore = await cookies();

    const res = await fetch(`${TUTOR_URL}/create-tutor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(tutorData),
    });

    if (res.ok) {
      //   revalidateTag("tutors", "max");
      updateTag("tutors");
    }

    if (!res.ok) {
      throw new Error("Failed to create tutor profile");
    }
  };

  return (
    <div>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Create Tutor Profile</CardTitle>
          <CardDescription>
            Setup your availability and expertise
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="tutor-form" action={createTutor}>
            <FieldGroup>
              {/* Bio */}
              <Field>
                <FieldLabel htmlFor="bio">Bio</FieldLabel>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell students about yourself..."
                />
              </Field>

              {/* Hourly Rate */}
              <Field>
                <FieldLabel htmlFor="hourlyRate">Hourly Rate (৳)</FieldLabel>
                <Input
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  required
                />
              </Field>

              {/* Start Time */}
              <Field>
                <FieldLabel htmlFor="startTime">Available From</FieldLabel>
                <Input id="startTime" name="startTime" type="time" required />
              </Field>

              {/* End Time */}
              <Field>
                <FieldLabel htmlFor="endTime">Available To</FieldLabel>
                <Input id="endTime" name="endTime" type="time" required />
              </Field>

              {/* Expertise Categories */}
              <Field>
                <FieldLabel>Expertise</FieldLabel>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        name="categoryIds"
                        value={cat.id}
                        className="accent-black"
                      />
                      {cat.title}
                    </label>
                  ))}
                </div>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Button type="submit" form="tutor-form" className="w-full">
            Create Tutor Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
