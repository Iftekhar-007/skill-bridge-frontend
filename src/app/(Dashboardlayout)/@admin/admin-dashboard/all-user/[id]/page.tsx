import { SingleUserView } from "@/components/modules/admin/SingleUserView";
import { Button } from "@/components/ui/button";
import { adminService } from "@/services/admin.service";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SingleUserPage({ params }: Props) {
  const { id } = await params;

  const { data: user, error } = await adminService.getUserById(id);

  // if (error || !user) notFound();

  return (
    <div className="min-h-screen bg-muted/30 p-6 space-y-6">
      <Link href="/admin-dashboard/all-user">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </Button>
      </Link>

      <SingleUserView user={user} />
    </div>
  );
}
