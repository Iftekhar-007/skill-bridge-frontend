"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createCategoryAction } from "@/actions/category.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FolderPlus, Loader2, Sparkles } from "lucide-react";

export default function CreateCategoryForm() {
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Category title is required");
      return;
    }

    startTransition(async () => {
      try {
        await createCategoryAction({ title: title.trim() });
        toast.success(`"${title}" category created! 🎉`);
        setTitle("");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        toast.error(message);
      }
    });
  };

  return (
    <Card className="border-0 shadow-xl overflow-hidden">
      {/* Colored top accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary to-primary/40" />

      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <FolderPlus className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">New Category</CardTitle>
            <CardDescription>
              Add a new subject category for tutors
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Category Title
            </Label>
            <Input
              id="title"
              placeholder="e.g. Mathematics, Physics, Chemistry..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isPending}
              className="h-11 rounded-xl"
            />
          </div>

          <Button
            type="submit"
            disabled={isPending || !title.trim()}
            className="w-full h-11 rounded-xl gap-2 text-sm font-semibold"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Create Category
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
