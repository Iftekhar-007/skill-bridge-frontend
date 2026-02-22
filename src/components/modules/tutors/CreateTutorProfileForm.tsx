"use client";

import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";

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

import { createTutor } from "@/actions/tutor.action";
import { toast } from "sonner";

interface Category {
  id: string;
  title: string;
}

interface Props {
  categories: Category[];
}

export default function CreateTutorProfileForm({ categories }: Props) {
  const [state, formAction, isPending] = useActionState(createTutor, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div>
      <Card className="max-w-9xl mx-auto">
        <CardHeader>
          <CardTitle>Create Tutor Profile</CardTitle>
          <CardDescription>
            Setup your availability and expertise
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="tutor-form" action={formAction}>
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
          <Button
            type="submit"
            form="tutor-form"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Tutor Profile"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
