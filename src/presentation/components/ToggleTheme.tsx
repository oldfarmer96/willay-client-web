import { Check, ChevronDown, Palette } from "lucide-react";
import { useRef, useState } from "react";

const themes = [
  { value: "light", label: "Light" },
  { value: "cupcake", label: "Cupcake" },
  { value: "dark", label: "Dark" },
  { value: "nord", label: "Nord" },
  { value: "night", label: "Night" },
  { value: "valentine", label: "Valentine" },
  { value: "abyss", label: "Abyss" },
  { value: "emerald", label: "Emerald" },
  { value: "retro", label: "Retro" },
  { value: "garden", label: "Garden" },
  { value: "forest", label: "Forest" },
  { value: "lemonade", label: "Lemonade" },
  { value: "sunset", label: "Sunset" },
  { value: "caramellatte", label: "Caramellatte" },
] as const;

type Theme = (typeof themes)[number]["value"];

const isTheme = (value: string | null): value is Theme =>
  themes.some((theme) => theme.value === value);

const getInitialTheme = (): Theme => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  return isTheme(currentTheme) ? currentTheme : "sunset";
};

const ThemeSwatch = ({ theme }: { theme: Theme }) => (
  <div
    data-theme={theme}
    className="bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm"
  >
    <div className="bg-base-content size-1 rounded-full" />
    <div className="bg-primary size-1 rounded-full" />
    <div className="bg-secondary size-1 rounded-full" />
    <div className="bg-accent size-1 rounded-full" />
  </div>
);

const ToggleTheme = () => {
  const [activeTheme, setActiveTheme] = useState<Theme>(getInitialTheme);
  const popoverRef = useRef<HTMLDivElement>(null);

  const changeTheme = (theme: Theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    setActiveTheme(theme);

    try {
      localStorage.setItem("app-theme", theme);
    } catch {
      console.warn("El tema seleccionado sigue funcionando");
    }

    popoverRef.current?.hidePopover?.();
  };

  return (
    <>
      <button
        popoverTarget="theme-change"
        style={{ anchorName: "--theme-change" } as React.CSSProperties}
        className="btn btn-ghost btn-sm gap-1.5 px-1.5"
        aria-label={`Cambiar tema. Tema actual: ${activeTheme}`}
      >
        <Palette className="size-4" aria-hidden="true" />
        <ChevronDown className="size-3 opacity-60" aria-hidden="true" />
      </button>

      <div
        ref={popoverRef}
        popover="auto"
        id="theme-change"
        style={{ positionAnchor: "--theme-change" } as React.CSSProperties}
        className="dropdown dropdown-end bg-base-200 text-base-content rounded-box
                   top-px mt-2 h-96 max-h-[calc(100vh-8.6rem)] overflow-y-auto
                   border border-base-300 shadow-2xl"
      >
        <ul className="menu w-56">
          <li className="menu-title text-xs">Tema</li>
          {themes.map((theme) => (
            <li key={theme.value}>
              <button
                type="button"
                className="gap-3 px-2"
                onClick={() => changeTheme(theme.value)}
                aria-pressed={activeTheme === theme.value}
              >
                <ThemeSwatch theme={theme.value} />
                <div className="w-32 truncate">{theme.label}</div>
                <Check
                  className={`size-3 shrink-0 ${
                    activeTheme === theme.value ? "visible" : "invisible"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ToggleTheme;
