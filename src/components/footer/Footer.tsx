import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";

const studentLinks = [
  { label: "Browse Tutors", href: "/tutors" },
  { label: "How It Works", href: "#" },
  { label: "My Bookings", href: "/#" },
  { label: "Student Dashboard", href: "/#" },
];

const tutorLinks = [
  { label: "Become a Tutor", href: "/tutor-dashboard" },
  { label: "Tutor Dashboard", href: "/#" },
  { label: "Manage Bookings", href: "/#" },
  { label: "My Reviews", href: "/#" },
];

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground">
                SkillBridge
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Connecting passionate tutors with eager students. Learn anything,
              teach everything — bridge the gap between knowledge and potential.
            </p>

            <Badge variant="secondary" className="text-xs w-fit">
              🇧🇩 Made in Bangladesh
            </Badge>

            <div className="flex items-center gap-2 pt-1">
              {socials.map(({ icon: Icon, href, label }) => (
                <Button
                  key={label}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  asChild
                >
                  <Link href={href} aria-label={label}>
                    <Icon className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* For Students */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-foreground">
              For Students
            </p>
            <Separator />
            <ul className="space-y-2.5">
              {studentLinks.map((link) => (
                <li key={link.label}>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground text-sm font-normal"
                    asChild
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* For Tutors */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-foreground">For Tutors</p>
            <Separator />
            <ul className="space-y-2.5">
              {tutorLinks.map((link) => (
                <li key={link.label}>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground text-sm font-normal"
                    asChild
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-foreground">Contact</p>
            <Separator />

            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 shrink-0" />
                support@skillbridge.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 shrink-0" />
                +880 1700-000000
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0" />
                Dhaka, Bangladesh
              </li>
            </ul>

            <div className="space-y-2 pt-1">
              <p className="text-xs text-muted-foreground font-medium">
                Stay updated
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="h-9 text-sm"
                />
                <Button size="sm" className="h-9 px-4 shrink-0">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <Separator className="mt-12 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SkillBridge. All rights reserved.
          </p>

          <div className="flex items-center gap-1">
            {legalLinks.map((item, i) => (
              <div key={item} className="flex items-center gap-1">
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs text-muted-foreground font-normal"
                  asChild
                >
                  <Link href="#">{item}</Link>
                </Button>
                {i < legalLinks.length - 1 && (
                  <span className="text-muted-foreground text-xs">·</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
