// src/components/sections/home-clients-strip.tsx
"use client";

import "@/i18n/i18n";
import { useTranslation } from "react-i18next";
import Marquee from "react-fast-marquee";

import Image from "next/image";

const techIcons = [
  { name: "CSS3", src: "/tech/css3.png" },
  { name: "HTML5", src: "/tech/html5.png" },
  { name: "JavaScript", src: "/tech/javascript.png" },
  { name: "JSON", src: "/tech/json.png" },
  { name: "React", src: "/tech/react.png" },
  { name: "Webpack", src: "/tech/webpack.png" },
  { name: "Angular", src: "/tech/angular.png" },
  { name: "Tailwind CSS", src: "/tech/tailwind-css.png" },
  { name: "Node.js", src: "/tech/nodejs.png" },
  { name: "TypeScript", src: "/tech/typescript.png" },
  { name: "Git", src: "/tech/git.png" },
  { name: "GitHub", src: "/tech/github.png" },
  { name: "GitLab", src: "/tech/gitlab.png" },
  { name: "Sass", src: "/tech/sass.png" },
  { name: "NPM", src: "/tech/npm.png" },
  { name: "Java", src: "/tech/java.png" },
  { name: "MongoDB", src: "/tech/mongodb.png" },
  { name: "NestJS", src: "/tech/nestjs.png" },
  { name: "PostgreSQL", src: "/tech/postgresql.png" },
  { name: "Postman", src: "/tech/postman.png" },
  { name: "Python", src: "/tech/python.png" },
  { name: "Python Poetry", src: "/tech/python-poetry.png" },
  { name: "SQLite", src: "/tech/sqlite.png" },
  { name: "AWS", src: "/tech/aws.webp" },
];

export function HomeClientsStrip() {
  const { t } = useTranslation("common");

  return (
    <section className="border-b bg-neutral-950/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-neutral-300 md:px-6">
        <div className="relative w-full">
          <Marquee
            pauseOnHover
            speed={40} // velocità (aumenta/diminuisci a gusto)
            gradient={false} // niente fade ai bordi
          >
            {techIcons.map((icon) => (
              <div
                key={icon.name}
                className="mx-8 flex items-center justify-center"
              >
                <Image
                  src={icon.src}
                  alt={icon.name}
                  width={80}
                  height={80}
                  className="h-12 w-auto md:h-14 opacity-85 transition-opacity hover:opacity-100"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
