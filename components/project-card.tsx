import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface ProjectCardProps {
  icon: string
  title: string
  description: string
  link?: string
}

export function ProjectCard({ icon, title, description, link = "#" }: ProjectCardProps) {
  return (
    <div className="group">
      <Link href={link} className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-muted rounded-full">
          <span className="text-lg">{icon}</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <h3 className="font-medium group-hover:underline">{title}</h3>
            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </Link>
    </div>
  )
}
