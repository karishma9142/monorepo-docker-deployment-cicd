import { prisma } from "db/client";

export default async function Home() {
  console.log(process.env.DATABASE_URL);
  await prisma.user.create({
    data : {
      username : "karishma",
      password : "1234"
    }
  })
  const users = await prisma.user.findMany();

  return (
    <pre>
      {JSON.stringify(users, null, 2)}
    </pre>
  );
}

export const dynamic='force-dynamic'