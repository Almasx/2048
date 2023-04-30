import {
  GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { appRouter } from "~/server/api/root";
import {} from "~/server/api/trpc";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { createInnerTRPCContext } from "~/server/api/trpc";
import superjson from "superjson";
import Link from "next/link";
import Badge from "~/components/Badge";

export const getServerSideProps = async () => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson, // optional - adds superjson serialization
  });

  const leaders = await helpers.score.all.fetch();
  return {
    props: {
      trpcState: helpers.dehydrate(),
      leaders,
    },
  };
};

const LeaderBoard = ({
  leaders,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="flex min-h-screen flex-col items-center pb-5 pt-10">
      <div className="mb-10 text-5xl font-bold">🏆 Leader Board</div>
      <ul
        className="mx-auto mb-3 flex w-full max-w-md flex-col gap-3 rounded-xl border
                border-gray-light-secondary p-5 dark:border-gray-dark-secondary"
        style={{
          boxShadow:
            "0px 0px 0px 1px rgba(255, 255, 255, 0.05), 0px -40px 180px -20px rgba(74, 83, 235, 0.3)",
        }}
      >
        {leaders.map((user, index) => (
          <li
            key={user.email}
            className="rounded-xl border border-gray-light-secondary px-5 py-2.5 dark:border-gray-dark-secondary"
          >
            <div className="flex items-baseline justify-between">
              <div className="flex items-center">
                <span className="mr-4 text-2xl font-bold italic">
                  {index + 1}
                </span>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>
              <p className="text-lg text-white/60 dark:text-gray-50">
                {user.bestScore}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mx-auto flex w-full max-w-md">
        <Link href="/">
          <Badge>🏡 Home</Badge>
        </Link>
      </div>
    </div>
  );
};

export default LeaderBoard;
