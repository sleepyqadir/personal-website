import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { SocialLinks } from "@/components/social-links"
import { ProjectCard } from "@/components/project-card"
import { MusicRecommendation } from "@/components/music-recommendation"
import { NewsletterForm } from "@/components/newsletter-form"
import { DigitalPlayground } from "@/components/digital-playground"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      {/* Main container with 80% width */}
      <div className="w-[80%] max-w-7xl">
        <header className="py-6 flex items-center justify-between border-b border-border">
          <h1 className="text-lg font-medium">Your Name</h1>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                about
              </Link>
              <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                projects
              </Link>
              <Link href="/work" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                work
              </Link>
              <Link href="/moments" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                moments
              </Link>
              <Link
                href="/newsletter"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                newsletter
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </header>

        <main className="py-12 grid md:grid-cols-[2fr_1fr] gap-12">
          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-4xl font-bold">hi, i'm your name.</h2>
              <p className="text-lg text-muted-foreground">i build things on the internet.</p>
              <p className="text-muted-foreground">
                <Link href="#" className="text-foreground hover:underline">
                  frontend
                </Link>
                ,{" "}
                <Link href="#" className="text-foreground hover:underline">
                  backend
                </Link>
                ,{" "}
                <Link href="#" className="text-foreground hover:underline">
                  ai
                </Link>
                ,{" "}
                <Link href="#" className="text-foreground hover:underline">
                  crypto
                </Link>{" "}
                — whatever gets the job done.
              </p>
            </section>

            <section className="space-y-2">
              <p className="text-muted-foreground">
                was a{" "}
                <Link href="#" className="text-foreground hover:underline">
                  github intern
                </Link>
                . did development at{" "}
                <Link href="#" className="text-foreground hover:underline">
                  company name
                </Link>
                .
              </p>
              <p className="text-muted-foreground">spoke at meetups. wrote docs. shot videos. shipped projects.</p>
              <p className="text-muted-foreground">
                also vibed with devs at{" "}
                <Link href="#" className="text-foreground hover:underline">
                  community name
                </Link>
                .
              </p>
            </section>

            <section className="space-y-2">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">SPECIALIZE IN:</p>
              <p className="text-muted-foreground">complex dashboards, auth flows.</p>
              <p className="text-muted-foreground">and making websites look like someone cared.</p>
            </section>

            <section className="space-y-2">
              <p className="text-muted-foreground">
                off-screen, i play{" "}
                <Link href="#" className="text-foreground hover:underline">
                  basketball
                </Link>
                .
              </p>
            </section>

            <section className="space-y-2">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">SONG RECOM:</p>
              <div className="flex flex-wrap gap-4">
                <MusicRecommendation title="you and i" artist="artist name" />
                <MusicRecommendation title="blue" artist="artist name" />
              </div>
            </section>

            <SocialLinks />

            <section className="space-y-6">
              <h2 className="text-3xl font-bold">work</h2>

              <div className="space-y-12">
                {/* Shieldify */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center">
                      <span className="text-purple-500 font-bold">S</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold">Shieldify</h3>
                      <p className="text-muted-foreground">Frontend Engineering Intern</p>
                    </div>
                    <ul className="space-y-2 list-disc list-outside ml-5">
                      <li className="text-muted-foreground">
                        Built customer onboarding dashboard, implemented reporting a chargeback flow.
                      </li>
                      <li className="text-muted-foreground">
                        Created blogs in marketing website, integrated headless CMS for blog management.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Appwrite */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center bg-red-50 dark:bg-red-950">
                      <span className="text-red-500 font-bold">A</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold">Appwrite</h3>
                      <p className="text-muted-foreground">Developer Advocate Intern</p>
                    </div>
                    <ul className="space-y-2 list-disc list-outside ml-5">
                      <li className="text-muted-foreground">
                        Contributed to Appwrite's official documentation on{" "}
                        <Link href="#" className="text-foreground hover:underline">
                          OAuth integration ↗
                        </Link>
                      </li>
                      <li className="text-muted-foreground">
                        Worked on a{" "}
                        <Link href="#" className="text-foreground hover:underline">
                          full stack website ↗
                        </Link>{" "}
                        with Appwrite, made a{" "}
                        <Link href="#" className="text-foreground hover:underline">
                          blog ↗
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-foreground hover:underline">
                          video ↗
                        </Link>{" "}
                        tutorial.
                      </li>
                      <li className="text-muted-foreground">
                        Organized developer meetup in Delhi, hands-on session on OAuth2 architecture.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-muted-foreground text-sm">also worked with folks at</p>
                <div className="flex gap-2 mt-2">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                    <span className="text-white text-xs">V</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                    <span className="text-yellow-600 dark:text-yellow-300 text-xs">J</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-300 text-xs">N</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                    <span className="text-red-600 dark:text-red-300 text-xs">A</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-bold">projects</h2>
              <div className="space-y-6">
                <ProjectCard
                  icon="🔮"
                  title="ProjectOne"
                  description="A description of your first project goes here."
                />
                <ProjectCard
                  icon="✍️"
                  title="ProjectTwo"
                  description="A description of your second project goes here."
                />
                <ProjectCard
                  icon="🌊"
                  title="ProjectThree"
                  description="A description of your third project goes here."
                />
              </div>
            </section>
          </div>

          <div className="flex justify-center">
            {/* Digital Playground instead of ID Card */}
            <DigitalPlayground />
          </div>
        </main>

        {/* Moments Section */}
        <section className="py-16 border-t border-border">
          <h2 className="text-3xl font-bold mb-8">moments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="aspect-square bg-muted rounded-lg overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                <div className="w-full h-full flex items-center justify-center text-4xl">📸</div>
                <div className="absolute bottom-0 left-0 p-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-medium">Moment {item}</p>
                  <p className="text-muted-foreground text-xs">A brief description</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-24 border-t border-border text-center">
          <div className="mb-16">
            <h2 className="text-[120px] font-bold text-muted/20 leading-none">MUCH</h2>
            <h2 className="text-[120px] font-bold text-muted/20 leading-none -mt-8">LOVE</h2>
          </div>

          <div className="max-w-xl mx-auto space-y-6">
            <p className="text-lg">Want to stay updated? Subscribe to my newsletter</p>
            <NewsletterForm />
          </div>
        </footer>
      </div>
    </div>
  )
}
