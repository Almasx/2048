import { useAtomValue } from "jotai";
import { type Board, boardLength } from "~/hooks/useGameState.";
import { difficultyAtom } from "~/pages";

export function Grid({ board }: { board: Board }) {
  const difficulty = useAtomValue(difficultyAtom);

  return (
    <div
      className="grid gap-3 rounded-2xl border border-[#141414] bg-[#020202] p-4 sm:gap-4"
      style={{
        boxShadow:
          "0px 0px 0px 1px rgba(255, 255, 255, 0.05), 0px -40px 180px -20px rgba(74, 83, 235, 0.3)",
        gridTemplateColumns: `repeat(${boardLength[difficulty]}, minmax(0, 1fr))`,
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="h-16 w-16 overflow-clip rounded-3xl border border-[#141414] bg-[#060606] duration-150 hover:border-[#1f1f1f] 
                         hover:bg-[#0f0f0f] sm:h-24 sm:w-24"
          >
            <Tile value={value} />
          </div>
        ))
      )}
    </div>
  );
}

export function Tile({ value }: { value: number }) {
  const radialGradients = {
    2: "radial-gradient(50% 50% at 50% 50%, #A3A9FE 0%, #757FF9 36.25%, #1E2BEC 73.23%, #0010FD 100%)",
    4: "radial-gradient(50% 50% at 50% 50%, #A3A9FE 0%, #9D8FF7 25%, #8F6BEA 50%, #8147DD 75%, #7300D0 100%)",
    8: "radial-gradient(50% 50% at 50% 50%, #A3A9FE 0%, #AE8DF1 25%, #B970E3 50%, #C251D5 75%, #CB33C7 100%)",
    16: "radial-gradient(50% 50% at 50% 50%, #A3A9FE 0%, #B88BEA 25%, #C267D7 50%, #CB43C4 75%, #D520B1 100%)",
    32: "radial-gradient(50% 50% at 50% 50%, #A3A9FE 0%, #C288E3 25%, #D267C9 50%, #E147AF 75%, #F02795 100%)",
    64: "radial-gradient(50% 50% at 50% 50%, #A3A9FE 0%, #CC84DC 25%, #E671BA 50%, #FF5E98 75%, #FF4B76 100%)",
    128: "radial-gradient(50% 50% at 50% 50%, #A3A9FE 0%, #D681D5 25%, #F473AA 50%, #FF6480 75%, #FF5556 100%)",
    256: "radial-gradient(50% 50% at 50% 50%, #A3A9FE 0%, #E07DCF 25%, #F5759B 50%, #FF6A68 75%, #FF5F35 100%)",
    512: "radial-gradient(50% 50% at 50% 50%, #A3A9FE 0%, #E979C9 25%, #F6778C 50%, #FF7550 75%, #FF7314 100%)",
  };
  const bgSize = value + 16 + 8 * Math.log2(value);

  return (
    <div className="relative h-full w-full">
      {value !== 0 && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full "
          style={{
            background: radialGradients[value as keyof typeof radialGradients],
            width: bgSize,
            height: bgSize,
            boxShadow: "0px 0px 20px #1E2BEC",
          }}
        />
      )}
      <div
        className="relative z-10 flex h-full w-full items-center justify-center rounded-lg 
                     backdrop-blur-xl transition-colors duration-300 hover:backdrop-blur-lg"
      >
        <div className="">
          {value !== 0 && (
            <p className="text-center text-5xl font-bold">{value}</p>
          )}
        </div>
      </div>
    </div>
  );
}
