"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

// const formSchema = z.object({
//   name: z.string().min(1, "Name is required!"),
//   email: z.email(),
//   password: z.string().min(6, "Password required and at least 6 characters"),
// });

const formSchema = z.object({
  role: z.enum(["STUDENT", "TUTOR"], {
    error: "Please select a role",
  }),
  name: z.string().min(1, "Name is required!"),
  email: z.email(),
  password: z.string().min(6, "Password required and at least 6 characters"),
});

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm({
    // defaultValues: { name: "", email: "", password: "" },
    defaultValues: {
      role: "STUDENT",
      name: "",
      email: "",
      password: "",
    },

    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("User creating");
      try {
        // const { data, error } = await authClient.signUp.email(value);

        // {
        //   name: value.name,
        //   email: value.email,
        //   password: value.password,
        //   role: value.role, // ✅ add this
        // }

        const { data, error } = await authClient.signUp.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("user ccreated successfully", { id: toastId });
        form.reset();
        console.log(data, value);
      } catch (err: unknown) {
        toast.error(err instanceof Error ? err.message : "An error occurred");
      }
    },
  });

  const { data: session } = authClient.useSession();
  console.log(session);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field name="role">
                {(field) => {
                  return (
                    <Field>
                      <FieldLabel>Select Role</FieldLabel>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Student */}
                        <Card
                          onClick={() => field.handleChange("STUDENT")}
                          className={cn(
                            "cursor-pointer border-2",
                            field.state.value === "STUDENT"
                              ? "border-primary"
                              : "border-muted",
                          )}
                        >
                          <CardContent className="flex flex-col items-center p-4">
                            🎓
                            <p>Student</p>
                          </CardContent>
                        </Card>

                        {/* Tutor */}
                        <Card
                          onClick={() => field.handleChange("TUTOR")}
                          className={cn(
                            "cursor-pointer border-2",
                            field.state.value === "TUTOR"
                              ? "border-primary"
                              : "border-muted",
                          )}
                        >
                          <CardContent className="flex flex-col items-center p-4">
                            👨‍🏫
                            <p>Tutor</p>
                          </CardContent>
                        </Card>
                      </div>
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="name">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        type="text"
                        onChange={(e) => field.handleChange(e.target.value)}
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        type="email"
                        onChange={(e) => field.handleChange(e.target.value)}
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="password">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        type="password"
                        onChange={(e) => field.handleChange(e.target.value)}
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Button className="w-full" form="login-form" type="submit">
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
