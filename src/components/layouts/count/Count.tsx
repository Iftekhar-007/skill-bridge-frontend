// import React from 'react'

// export default function Count() {
//   return (
//     <div>Count</div>
//   )
// }

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, GraduationCap, BookOpen, Building2 } from "lucide-react";

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const stepTime = 16;
    const increment = value / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}+</span>;
}

export default function Count() {
  return (
    <section className="container py-10 md:py-24">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-none text-center">
          <CardContent className="pt-4 space-y-3">
            <Users className="mx-auto h-12 w-12 text-primary" />
            <p className="text-3xl font-bold">
              <Counter value={12000} />
            </p>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-none text-center">
          <CardContent className="pt-4 space-y-3">
            <GraduationCap className="mx-auto h-12 w-12 text-primary" />
            <p className="text-3xl font-bold">
              <Counter value={850} />
            </p>
            <p className="text-sm text-muted-foreground">Expert Tutors</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-none text-center">
          <CardContent className="pt-4 space-y-3">
            <BookOpen className="mx-auto h-12 w-12 text-primary" />
            <p className="text-3xl font-bold">
              <Counter value={320} />
            </p>
            <p className="text-sm text-muted-foreground">Active Subjects</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-none text-center">
          <CardContent className="pt-4 space-y-3">
            <Building2 className="mx-auto h-12 w-12 text-primary" />
            <p className="text-3xl font-bold">
              <Counter value={75} />
            </p>
            <p className="text-sm text-muted-foreground">Institutions</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
