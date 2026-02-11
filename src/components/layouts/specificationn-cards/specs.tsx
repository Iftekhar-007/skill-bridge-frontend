import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, BookOpen, MessageCircle, Rocket } from "lucide-react";

export default function Specs() {
  return (
    <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Card 1 */}
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="flex flex-col items-center gap-4">
          <div className="p-3 rounded-2xl ">
            <BadgeCheck className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-center">
            Learn From Verified Experts
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground leading-relaxed text-center">
          Get guidance from skilled instructors with real-world experience who
          are passionate about teaching and helping students succeed.
        </CardContent>
      </Card>

      {/* Card 2 */}
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="flex flex-col items-center gap-4">
          <div className="p-3 rounded-2xl ">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-center">
            Structured & Practical Courses
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground leading-relaxed text-center">
          Step-by-step lessons, real projects, and practical examples that help
          you build skills you can actually use outside the classroom.
        </CardContent>
      </Card>

      {/* Card 3 */}
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="flex flex-col items-center gap-4">
          <div className="p-3 rounded-2xl ">
            <MessageCircle className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-center">
            Interactive Learning Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground leading-relaxed text-center">
          Ask questions, get feedback, and stay connected with instructors to
          make learning more engaging and easier to understand.
        </CardContent>
      </Card>

      {/* Card 4 */}
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="flex flex-col items-center gap-4">
          <div className="p-3 rounded-2xl ">
            <Rocket className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-center">
            Grow Skills for Your Future
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground leading-relaxed text-center">
          Build in-demand skills that prepare you for jobs, freelancing, or
          personal growth in today’s competitive world.
        </CardContent>
      </Card>
    </section>
  );
}
