import Image from "next/image";

type User =
  | {
      username?: string | null | undefined;
      password?: string | null | undefined;
      name?: string | null | undefined;
      email?: string | null | undefined;
    }
  | undefined;

type Props = {
  user: User;
  pagetype: string;
};

export default function Card({ user, pagetype }: Props) {
  const greeting = user?.name ? (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
      Hello {user?.name}!
    </div>
  ) : null;

  return (
    <section className="flex flex-col gap-4">
      {greeting}
      <p className="text-2xl text-center">{pagetype} Page!</p>
    </section>
  );
}
