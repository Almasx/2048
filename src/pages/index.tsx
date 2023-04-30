import { type NextPage } from "next";
import { useGameState } from "~/hooks/useGameState.";
import { useMove } from "~/hooks/useMove";
import clsx from "clsx";
import Badge from "~/components/Badge";
import { atom, useAtom } from "jotai";
import { Grid } from "~/components/Grid";
import { useBot } from "~/hooks/useBot";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { ThemeSwitch } from "~/components/ThemeSwitch";
import Link from "next/link";

export const difficultyAtom = atom<"hard" | "medium" | "easy">("medium");
export const botAtom = atom<boolean>(false);

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const { mutate: recordScore } = api.score.new.useMutation({
    onSuccess: () => refetch(),
  });
  const { data: user, refetch } = api.score.get.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  const { board, score, gameOver, moveBoard, initializeBoard } = useGameState(
    (score: number) => recordScore({ score })
  );

  const [difficulty, setDifficulty] = useAtom(difficultyAtom);
  const [bot, setBot] = useAtom(botAtom);
  useBot(moveBoard);
  useMove((direction) => moveBoard(direction));

  return (
    <div className="flex min-h-screen flex-col  pb-5 pt-10 ">
      <div className="mx-auto mb-14 flex flex-col">
        <h1 className="mb-8 text-center text-8xl font-bold text-primary/30 duration-150 hover:text-primary/60">
          {score || 2048}
        </h1>
        <Grid board={board} />

        <div
          className={clsx(
            "fixed inset-0 z-20 h-screen bg-dark/10 backdrop-blur-md duration-150 ",
            !gameOver && "invisible opacity-0",
            gameOver && "visible flex items-center justify-center opacity-100"
          )}
          onClick={initializeBoard}
        >
          <div className="flex w-80 flex-col gap-3 rounded-2xl border border-[#1c1c1c] bg-black p-5">
            <p className="text-4xl font-bold">Game Over!</p>
            <button className="mt-4 rounded-xl bg-primary px-4 py-2 font-bold text-white ">
              Restart
            </button>
          </div>
        </div>
      </div>

      <div className="bottom-5 left-5 mx-auto flex w-[325px] flex-col gap-3 text-dark dark:text-white/30  sm:w-[464px] lg:fixed lg:w-auto lg:p-0">
        <div className="flex gap-3">
          {sessionData && (
            <Badge>
              <div className="flex gap-3">
                <Image
                  height={24}
                  width={24}
                  className="rounded-full"
                  src={sessionData.user?.image as string}
                  alt="pfp"
                />
                Лучший рекорд: {user?.bestScore}
              </div>
            </Badge>
          )}
        </div>
        <div className="w-[325px] rounded-2xl border border-gray-light p-3 tracking-wide duration-300 hover:text-dark  dark:border-gray-dark-secondary dark:hover:text-white/30 sm:w-[394px]">
          ✨ Попробуйте получить 2048 <br />
          🕹️ Используйте клавишу / свайп
        </div>
        <div className="flex gap-3">
          <Badge
            active={difficulty === "hard"}
            onClick={() => setDifficulty("hard")}
          >
            Hard
          </Badge>
          <Badge
            active={difficulty === "medium"}
            onClick={() => setDifficulty("medium")}
          >
            Medium
          </Badge>
          <Badge
            active={difficulty === "easy"}
            onClick={() => setDifficulty("easy")}
          >
            Easy
          </Badge>
          <Badge active={bot} onClick={() => setBot(!bot)} className="ml-auto">
            Auto 🤖
          </Badge>
        </div>
        <div className="flex gap-3">
          <ThemeSwitch />
          <Link href="/ " className="ml-auto">
            <Badge>🏆 LeaderBoard</Badge>
          </Link>
          <Badge
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? "Выйти" : "Войти"}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Home;
