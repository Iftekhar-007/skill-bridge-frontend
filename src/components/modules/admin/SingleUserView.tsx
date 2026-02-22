import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  ShieldCheck,
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  Globe,
  MonitorSmartphone,
  RefreshCw,
} from "lucide-react";
import { UserStatus } from "@/constants/userStatus";

// ─── Types ────────────────────────────────────────────────────────────────────

type Session = {
  id: string;
  expiresAt: string;
  createdAt: string;
  ipAddress?: string;
  userAgent?: string;
};

type Account = {
  id: string;
  providerId: string;
  accountId: string;
  createdAt: string;
  scope?: string;
};

export type UserDetail = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  status: UserStatus;
  sessions?: Session[];
  accounts?: Account[];
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function DetailRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string | UserStatus;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-6">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <span
        className={`text-sm text-right break-all ${
          mono ? "font-mono text-xs" : "font-medium"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function SingleUserView({ user }: { user: UserDetail }) {
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
        <User className="h-10 w-10 opacity-40" />
        <p className="text-sm">User not found.</p>
      </div>
    );
  }
  const isActive = user.status === UserStatus.ACTIVE;
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-6">
      {/* ── Hero ── */}
      <Card className="rounded-2xl border shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-background ${
                  isActive ? "bg-green-500" : "bg-red-500"
                }`}
              />
            </div>

            {/* Name / email / badges */}
            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {user.name}
                </h1>
                <p className="flex items-center justify-center sm:justify-start gap-1 text-sm text-muted-foreground mt-1">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge variant="outline" className="gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  {user.role}
                </Badge>

                <Badge
                  variant={isActive ? "default" : "destructive"}
                  className="gap-1"
                >
                  {isActive ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  {user.status}
                </Badge>

                <Badge
                  variant={user.emailVerified ? "secondary" : "outline"}
                  className="gap-1"
                >
                  {user.emailVerified ? (
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  ) : (
                    <XCircle className="h-3 w-3 text-destructive" />
                  )}
                  Email {user.emailVerified ? "Verified" : "Unverified"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Details grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Account Details */}
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <DetailRow label="User ID" value={user.id} mono />
            <Separator />
            <DetailRow label="Name" value={user.name} />
            <Separator />
            <DetailRow label="Email" value={user.email} />
            <Separator />
            <DetailRow label="Role" value={user.role} />
            <Separator />
            <DetailRow label="Status" value={user.status} />
          </CardContent>
        </Card>

        {/* Timestamps */}
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              Timestamps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <DetailRow
              label="Created At"
              value={new Date(user.createdAt).toLocaleString()}
            />
            <Separator />
            <DetailRow
              label="Last Updated"
              value={new Date(user.updatedAt).toLocaleString()}
            />
          </CardContent>
        </Card>
      </div>

      {/* ── Sessions ── */}
      {user.sessions && user.sessions.length > 0 && (
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MonitorSmartphone className="h-4 w-4 text-primary" />
              Sessions
              <Badge variant="secondary" className="ml-auto text-xs">
                {user.sessions.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {user.sessions.map((session) => (
                <div
                  key={session.id}
                  className="rounded-xl border bg-muted/30 p-3 space-y-1.5"
                >
                  <p className="font-mono text-xs text-muted-foreground truncate">
                    {session.id}
                  </p>
                  {session.ipAddress && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Globe className="h-3 w-3" />
                      {session.ipAddress}
                    </div>
                  )}
                  {session.userAgent && (
                    <p className="text-xs text-muted-foreground truncate">
                      {session.userAgent}
                    </p>
                  )}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Expires: {new Date(session.expiresAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Linked Providers ── */}
      {user.accounts && user.accounts.length > 0 && (
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              Linked Providers
              <Badge variant="secondary" className="ml-auto text-xs">
                {user.accounts.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {user.accounts.map((account) => (
                <div
                  key={account.id}
                  className="rounded-xl border bg-muted/30 p-3 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold capitalize text-sm">
                      {account.providerId}
                    </span>
                    {account.scope && (
                      <Badge variant="outline" className="text-xs">
                        {account.scope}
                      </Badge>
                    )}
                  </div>
                  <p className="font-mono text-xs text-muted-foreground truncate">
                    {account.accountId}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <RefreshCw className="h-3 w-3" />
                    Linked: {new Date(account.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
