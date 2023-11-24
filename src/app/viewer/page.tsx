import WelcomeMessage from "@/components/WelcomeMessage";

export default function ViewerPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { nombre = "Juan Perez", mesa = "12" } = searchParams;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <WelcomeMessage nombre={nombre} mesa={mesa} />
    </main>
  );
}
