import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /* The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:5000",

  user: {
    additionalFields: {
      role: {
        type: "string",
      },
    },
  },
});

// import { createAuthClient } from "better-auth/react";

// type AdditionalUserFields = {
//   role: "STUDENT" | "TUTOR";
// };

// export const authClient = createAuthClient<{
//   user: AdditionalUserFields;
// }>({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",

//   user: {
//     additionalFields: {
//       role: {
//         type: "string",
//       },
//     },
//   },
// });
