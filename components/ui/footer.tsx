import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const t = useTranslations()
  
  return (
    <footer
      className={cn(
        "border-t bg-background px-4 py-6 md:px-6",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <a
            href="/privacy"
            className="hover:text-foreground"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="hover:text-foreground"
          >
            Terms of Service
          </a>
          <a
            href="/contact"
            className="hover:text-foreground"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  )
}
