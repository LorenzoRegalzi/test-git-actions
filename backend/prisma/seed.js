import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Funko Pop: Darth Vader",
        description: "Star Wars collectible vinyl figure.",
        price: "24.99",
        imageUrl: "/funko-darth-vader.png",
      },
      {
        name: "Funko Pop: Spider-Man",
        description: "Marvel superhero figure in classic pose.",
        price: "22.99",
        imageUrl: "/funko-spiderman.png",
      },
      {
        name: "Funko Pop: Harry Potter",
        description: "The boy who lived, in Funko Pop form.",
        price: "19.99",
        imageUrl: "/funko-harry-potter.png",
      },
    ],
  });

  console.log("✅ Database seeded with products!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
