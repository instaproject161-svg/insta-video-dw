import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Blog — Instagram Downloader Tips & Guides | ReelSave",
  description: "Learn how to download Instagram content with our step-by-step guides, tips, and tutorials.",
  openGraph: {
    title: "ReelSave Blog — Instagram Downloader Guides",
    description: "Tips, guides, and tutorials on downloading Instagram videos, Reels, photos, and more.",
    type: "website",
  },
};

const posts = [
  {
    slug: "#",
    title: "How to Download Instagram Reels — Complete Guide 2024",
    excerpt: "Step-by-step instructions for saving Instagram Reels in HD quality on any device without watermarks.",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    date: "2024-12-01",
    readTime: "4 min read",
    category: "How-to",
  },
  {
    slug: "#",
    title: "How to Save Instagram Stories Before They Disappear",
    excerpt: "Never miss a story again. Learn how to anonymously save Instagram Stories to your device.",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    date: "2024-11-18",
    readTime: "3 min read",
    category: "How-to",
  },
  {
    slug: "#",
    title: "Download Instagram Videos on Mobile — iPhone & Android",
    excerpt: "The easiest way to save Instagram videos directly to your phone's camera roll. No app required.",
    image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    date: "2024-11-05",
    readTime: "5 min read",
    category: "Mobile",
  },
  {
    slug: "#",
    title: "Best Instagram Downloader in 2024 — ReelSave Review",
    excerpt: "An honest look at what makes a great Instagram downloader and why ReelSave leads the pack.",
    image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    date: "2024-10-22",
    readTime: "6 min read",
    category: "Guide",
  },
  {
    slug: "#",
    title: "How to Download Instagram IGTV Videos for Free",
    excerpt: "Save long-form IGTV videos in full HD to watch offline. Works on all devices.",
    image: "https://images.pexels.com/photos/6893905/pexels-photo-6893905.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    date: "2024-10-10",
    readTime: "3 min read",
    category: "How-to",
  },
  {
    slug: "#",
    title: "Save All Photos from Instagram Carousel Posts at Once",
    excerpt: "Tired of saving carousel photos one by one? Here's how to batch-download every image in seconds.",
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    date: "2024-09-28",
    readTime: "4 min read",
    category: "Tips",
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            ReelSave <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty">
            Guides, tips, and tutorials for downloading Instagram content like a pro.
          </p>
        </div>

        {/* Featured Post */}
        <Link href={featured.slug} className="group block mb-12">
          <div className="relative overflow-hidden rounded-3xl border border-border/50 hover:border-primary/40 transition-all duration-300 bg-card">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center gap-4">
                <span className="inline-flex w-fit items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                  Featured
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-200 text-balance">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(featured.date)}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{featured.readTime}</span>
                </div>
                <span className="flex items-center gap-1.5 text-primary font-medium text-sm mt-1 group-hover:gap-2.5 transition-all duration-200">
                  Read article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Post Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link key={post.slug + post.title} href={post.slug} className="group block">
              <article className="h-full overflow-hidden rounded-2xl border border-border/50 hover:border-primary/40 bg-card transition-all duration-300 flex flex-col">
                <div className="relative overflow-hidden h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-semibold text-foreground border border-border/50">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h2 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-200 text-balance line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
