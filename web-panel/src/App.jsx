import useThemeToggler from "./hooks/themeToggler";

const App = () => {
  const [theme, setTheme] = useThemeToggler();

  return (
    <div class={theme()}>
      <div class="flex h-screen w-screen flex-col bg-white dark:bg-neutral-900"></div>

      <div
        class="absolute bottom-2 right-2 flex cursor-pointer flex-col items-center justify-center rounded-full border-l border-t border-r border-b border-violet-900 bg-white p-3 text-violet-500 shadow-2xl shadow-violet-900 dark:border-violet-600 dark:bg-neutral-900 dark:text-violet-600 dark:shadow-violet-600"
        onClick={() =>
          theme() === "light" ? setTheme("dark") : setTheme("dark")
        }
      >
        {theme() === "light" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default App;
