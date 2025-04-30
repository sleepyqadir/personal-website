import { Music } from "lucide-react"

interface MusicRecommendationProps {
  title: string
  artist: string
}

export function MusicRecommendation({ title, artist }: MusicRecommendationProps) {
  return (
    <div className="flex items-center gap-1.5">
      <Music className="w-3 h-3 text-muted-foreground" />
      <span className="text-sm">
        <span className="text-foreground">{title}</span>
        {" by "}
        <span className="text-muted-foreground">{artist}</span>
      </span>
    </div>
  )
}
