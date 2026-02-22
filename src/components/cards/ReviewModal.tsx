// // "use client";

// // import { useActionState } from "@/lib/client-action-state";
// // import { createReview } from "@/actions/review.action";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";

// // interface Props {
// //   open: boolean;
// //   setOpen: (v: boolean) => void;
// //   bookingId: string;
// //   tutorId: string;
// // }

// // export default function ReviewModal({
// //   open,
// //   setOpen,
// //   bookingId,
// //   tutorId,
// // }: Props) {
// //   const [state, formAction, pending] = useActionState(createReview, null);

// //   return (
// //     <Dialog open={open} onOpenChange={setOpen}>
// //       <DialogContent>
// //         <DialogHeader>
// //           <DialogTitle>Add Review</DialogTitle>
// //         </DialogHeader>

// //         <form action={formAction} className="space-y-4">
// //           <input type="hidden" name="bookingId" value={bookingId} />
// //           <input type="hidden" name="tutorId" value={tutorId} />

// //           <Input
// //             type="number"
// //             name="rating"
// //             min={1}
// //             max={5}
// //             required
// //             placeholder="Rating (1-5)"
// //           />

// //           <Textarea
// //             name="comment"
// //             required
// //             placeholder="Write your feedback..."
// //           />

// //           <Button type="submit" disabled={pending} className="w-full">
// //             {pending ? "Submitting..." : "Submit Review"}
// //           </Button>

// //           {state?.success === false && (
// //             <p className="text-sm text-red-500">{state.message}</p>
// //           )}

// //           {state?.success && (
// //             <p className="text-sm text-green-600">
// //               Review submitted successfully 🎉
// //             </p>
// //           )}
// //         </form>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { createReview } from "@/actions/review.action";

// interface Props {
//   open: boolean;
//   setOpen: (v: boolean) => void;
//   bookingId: string;
//   tutorId: string;
// }

// export default function ReviewModal({
//   open,
//   setOpen,
//   bookingId,
//   tutorId,
// }: Props) {
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<{
//     text: string;
//     type: "success" | "error";
//   } | null>(null);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//     const formData = new FormData(e.currentTarget);

//     const result = await createReview(null, formData);

//     if (result.success) {
//       setMessage({ text: result.message, type: "success" });
//       setTimeout(() => setOpen(false), 1200); // auto close modal
//     } else {
//       setMessage({ text: result.message, type: "error" });
//     }

//     setLoading(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add Review</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input type="hidden" name="bookingId" value={bookingId} />
//           <input type="hidden" name="tutorId" value={tutorId} />

//           <Input
//             type="number"
//             name="rating"
//             min={1}
//             max={5}
//             required
//             placeholder="Rating (1-5)"
//           />

//           <Textarea
//             name="comment"
//             required
//             placeholder="Write your feedback..."
//           />

//           <Button type="submit" disabled={loading} className="w-full">
//             {loading ? "Submitting..." : "Submit Review"}
//           </Button>

//           {message && (
//             <p
//               className={`text-sm mt-2 ${
//                 message.type === "error" ? "text-red-500" : "text-green-600"
//               }`}
//             >
//               {message.text}
//             </p>
//           )}
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/actions/review.action";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  bookingId: string;
  tutorId: string;
}

export default function ReviewModal({
  open,
  setOpen,
  bookingId,
  tutorId,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);

    const result = await createReview(null, formData);

    if (result.success) {
      setMessage({ text: result.message, type: "success" });
      setTimeout(() => setOpen(false), 1200); // auto close modal
    } else {
      setMessage({ text: result.message, type: "error" });
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="bookingId" value={bookingId} />
          <input type="hidden" name="tutorId" value={tutorId} />

          <Input
            type="number"
            name="rating"
            min={1}
            max={5}
            required
            placeholder="Rating (1-5)"
          />

          <Textarea
            name="comment"
            required
            placeholder="Write your feedback..."
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit Review"}
          </Button>

          {message && (
            <p
              className={`text-sm mt-2 ${
                message.type === "error" ? "text-red-500" : "text-green-600"
              }`}
            >
              {message.text}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
