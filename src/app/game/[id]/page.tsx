import { games } from "@/data/games";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import GamePageClient from "./GamePageClient";

// Static generation for all games → instant loading
export function generateStaticParams() {
  return games.map((g) => ({ id: g.id }));
}

// Dynamic SEO — "Play [Game Name] Online Free"
export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const game = games.find((g) => g.id === params.id);
  if (!game) return { title: "Game Not Found" };

  return {
    title: `Play ${game.title} Online Free - No Download`,
    description: `${game.description} Play ${game.title} for free in your browser. No downloads needed.`,
    keywords: [
      game.title,
      `play ${game.title} online`,
      `play ${game.title} free`,
      `${game.title} no download`,
      `${game.category} games`,
      `free ${game.category.toLowerCase()} games`,
      "free browser games",
      "HTML5 games",
      "no download games",
    ],
    openGraph: {
      title: `Play ${game.title} Free Online — GameZone`,
      description: `${game.description} No download required.`,
      type: "website",
      siteName: "GameZone",
      images: [{ url: game.thumb, width: 480, height: 270, alt: game.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Play ${game.title} Free — GameZone`,
      description: game.description,
      images: [game.thumb],
    },
  };
}

export default function GamePage({ params }: { params: { id: string } }) {
  const game = games.find((g) => g.id === params.id);
  if (!game) notFound();

  // Related = same category, max 5
  const related = games
    .filter((g) => g.category === game.category && g.id !== game.id)
    .slice(0, 5);

  // "You May Also Like" = different categories, shuffled, max 5
  const alsoLike = games
    .filter((g) => g.category !== game.category)
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  return <GamePageClient game={game} related={related} alsoLike={alsoLike} />;
}
