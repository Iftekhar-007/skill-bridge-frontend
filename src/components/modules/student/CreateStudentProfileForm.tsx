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
// import { createStudent } from "@/actions/student.action";
import { toast } from "sonner";
import { createStudent } from "@/actions/student.action";

export default function CreateStudentProfileForm() {
  const [state, formAction, isPending] = useActionState(createStudent, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Create Student Profile</CardTitle>
        <CardDescription>Setup your student information</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="student-form" action={formAction}>
          <FieldGroup>
            {/* Phone */}
            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input id="phone" name="phone" required />
            </Field>

            {/* Level */}
            <Field>
              <FieldLabel htmlFor="level">Level</FieldLabel>
              <Input id="level" name="level" type="number" required />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          form="student-form"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Student Profile"}
        </Button>
      </CardFooter>
    </Card>
  );
}
