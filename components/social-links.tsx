import Link from "next/link"

export function SocialLinks() {
  return (
    <div className="flex gap-4">
      <Link
        href="https://twitter.com"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        X ↗
      </Link>
      <Link
        href="https://github.com"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub ↗
      </Link>
      <Link
        href="https://linkedin.com"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn ↗
      </Link>
      <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
        Blog ↗
      </Link>
    </div>
  )
}
