// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"

// export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
//   return (
//     <Card {...props}>
//       <CardHeader>
//         <CardTitle>Create an account</CardTitle>
//         <CardDescription>
//           Enter your information below to create your account
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <FieldGroup>
//             <Field>
//               <FieldLabel htmlFor="name">Full Name</FieldLabel>
//               <Input id="name" type="text" placeholder="John Doe" required />
//             </Field>
//             <Field>
//               <FieldLabel htmlFor="email">Email</FieldLabel>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 required
//               />
//               <FieldDescription>
//                 We&apos;ll use this to contact you. We will not share your email
//                 with anyone else.
//               </FieldDescription>
//             </Field>
//             <Field>
//               <FieldLabel htmlFor="password">Password</FieldLabel>
//               <Input id="password" type="password" required />
//               <FieldDescription>
//                 Must be at least 8 characters long.
//               </FieldDescription>
//             </Field>
//             <Field>
//               <FieldLabel htmlFor="confirm-password">
//                 Confirm Password
//               </FieldLabel>
//               <Input id="confirm-password" type="password" required />
//               <FieldDescription>Please confirm your password.</FieldDescription>
//             </Field>
//             <FieldGroup>
//               <Field>
//                 <Button type="submit">Create Account</Button>
//                 <Button variant="outline" type="button">
//                   Sign up with Google
//                 </Button>
//                 <FieldDescription className="px-6 text-center">
//                   Already have an account? <a href="#">Sign in</a>
//                 </FieldDescription>
//               </Field>
//             </FieldGroup>
//           </FieldGroup>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

const formSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z.email(),
  password: z.string().min(6, "Password required and at least 6 characters"),
});

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm({
    defaultValues: { name: "", email: "", password: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("User creating");
      try {
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
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
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
            Log In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
