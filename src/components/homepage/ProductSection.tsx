"use client";
import React from "react";
import Image from "next/image";
import {
  rideauMetaliqueIMG,
  voletRoulantsIMG,
  storeBanneIMG,
  porteGarageIMG,
} from "@/assets/imageModule";

const ProductSection: React.FC = () => {
  const accordionData = [
    {
      id: 1,
      text: "Créer devis volet roulant",
      imageUrl: voletRoulantsIMG,
      altText: "Volet Roulant Product",
      link: "/configurateur",
    },
    {
      id: 2,
      text: "Créer devis rideau metallique",
      imageUrl: rideauMetaliqueIMG,
      altText: "Rideau Metallique Product",
      link: "#",
      statue: "Coming Soon...",
    },
    {
      id: 3,
      text: "Créer devis store Banne",
      imageUrl: storeBanneIMG,
      altText: "Store Banne Product",
      link: "#",
      statue: "Coming Soon...",
    },
    {
      id: 4,
      text: "Créer devis porte de garage",
      imageUrl: porteGarageIMG,
      altText: "Porte de Garage Product",
      link: "#",
      statue: "Coming Soon...",
    },
  ];

  const getArticleClasses = (statue: string | undefined) =>
    `group/article relative w-full rounded-xl overflow-hidden md:group-hover:[&:not(:hover)]:w-[20%] md:group-focus-within:[&:not(:focus-within):not(:hover)]:w-[20%] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)] ${
      statue === "Coming Soon..."
        ? "before:absolute before:inset-x-0 before:top-0 before:h-[800px] before:bg-black before:bg-opacity-70"
        : ""
    } before:transition-opacity md:before:opacity-100 focus-within:before:opacity-100 after:opacity-0 md:group-hover:[&:not(:hover)]:after:opacity-100 md:group-focus-within:[&:not(:focus-within):not(:hover)]:after:opacity-100 after:absolute after:inset-0 after:bg-white/30 after:backdrop-blur after:transition-all focus-within:ring focus-within:ring-indigo-300`;

  return (
    <div className="group w-[80%] flex max-md:flex-col justify-center gap-2 h-[500px]">
      {accordionData.map((item) => (
        <div key={item.id} className={getArticleClasses(item.statue)}>
          <a
            className={`absolute inset-0 text-white z-10 ${
              item.statue === "Coming Soon..." ? "cursor-not-allowed" : ""
            }`}
            href={item.statue === "Coming Soon..." ? "#" : item.link}
            onClick={(e) => {
              if (item.statue === "Coming Soon...") {
                e.preventDefault(); // Prevent navigation
              }
            }}
          >
            {item.statue === "Coming Soon..." && (
              <span className="absolute inset-x-0 top-0 text-2xl uppercase tracking-widest font-bold p-6 md:px-12 md:py-8 md:whitespace-nowrap md:truncate text-center z-20 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)]">
                {item.statue}
              </span>
            )}

            <span className="absolute inset-x-0 bottom-0 text-2xl uppercase tracking-widest font-bold p-6 md:px-12 md:py-8 md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-300 group-focus-within/article:delay-300">
              {item.text}
            </span>
          </a>

          <Image
            className="object-cover w-full h-[500px]"
            src={item.imageUrl}
            width={800}
            height={500}
            alt={item.altText}
            quality={75}
            priority // Ensure first image (or any critical image) is prioritized
          />
        </div>
      ))}
    </div>
  );
};

export default ProductSection;
