import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface Props {
  defaultTheme: "dark" | "light";
  toggleIcon: string;
}

export const ThemeSelector: React.FC<Props> = ({
  defaultTheme,
  toggleIcon,
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  /** Avoid Hydration Mismatch
   *  https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
   */
  if (!mounted) return null;

  // TODO why?
  if (!defaultTheme) return null;

  return (
    <button
      type="button"
      className={`
        min-w-fit transition duration-500
        ${theme === "dark" ? "grayscale opacity-70" : ""}
      `}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <img
        src={toggleIcon}
        alt="toggle theme"
        width={24}
        height={24}
        className="max-w-24 max-h-24"
      />
    </button>
  );
};
