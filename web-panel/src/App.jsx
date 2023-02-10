import { Link, Route, Routes } from "@solidjs/router";
import axios from "axios";
import { createSignal, onMount } from "solid-js";
import useState from "./hooks/state";
import useThemeToggler from "./hooks/themeToggler";
import Dashboard from "./pages/dashboard/dashboard";

const App = () => {
  const [theme, setTheme] = useThemeToggler();
  const [settings, updateSettings, clearSettings] = useState("settings");
  const [dichonoUrl, setDichonoUrl] = createSignal("");
  const [loading, setLoading] = createSignal(true);

  onMount(() => {
    setTimeout(() => {
      if (settings.url) loadConfiguration();
      else setLoading(false);
    }, 300);
  });

  const loadConfiguration = () => {
    axios
      .get(settings.url + "/rest/configuration")
      .then((response) => {
        if (response.data) {
          updateSettings({ url: settings.url, ...response.data });
          setLoading(false);
        }
      })
      .catch((error) => {
        clearSettings();
      });
  };

  const checkBotConnection = () => {
    setLoading(true);

    axios
      .get(dichonoUrl() + "/rest/configuration")
      .then((response) => {
        if (response.data) {
          updateSettings({ url: dichonoUrl(), ...response.data });
          setLoading(false);
        }
      })
      .catch((error) => {
        clearSettings();
      });
  };

  return (
    <div class={theme() || "light"}>
      <div class="flex h-screen w-screen select-none flex-col bg-neutral-200 text-neutral-900 dark:bg-neutral-900 dark:text-white transition-all duration-300 ease-in-out">
        {loading() && (
          <div class="flex h-screen w-screen flex-col items-center justify-center text-neutral-900 dark:text-white">
            <div class="flex items-center space-x-2">
              <div>Loading</div>
              <svg
                aria-hidden="true"
                class="mr-2 h-4 w-4 animate-spin fill-violet-900 text-neutral-300 dark:fill-violet-600 dark:text-neutral-800"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </div>
        )}

        {!loading() && settings.id === undefined && (
          <div class="flex h-screen w-screen flex-col items-center justify-center">
            <div class="flex flex-col items-center space-y-3 rounded-lg border-l border-r border-t border-b border-neutral-300 bg-white p-5 shadow-2xl shadow-violet-900 dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-violet-900">
              <div class="text-2xl text-neutral-900 dark:text-white">
                Dichono Setup
              </div>
              <div class="text-neutral-400 dark:text-neutral-300">
                Please enter the link for your Dichono bot.
              </div>
              <input
                type="text"
                placeholder="Dichono link"
                value={dichonoUrl()}
                onChange={(event) => setDichonoUrl(event.target.value)}
                class="h-auto w-full rounded-md border-l border-t border-r border-b border-violet-900 bg-neutral-200 px-5 py-3 text-neutral-900 outline-0 active:outline-none dark:border-violet-900 dark:bg-neutral-900 dark:text-white"
              />
              <div
                class="h-auto w-full cursor-pointer rounded-md bg-violet-900 px-5 py-3 text-white hover:bg-violet-800 active:bg-violet-900 dark:bg-violet-900 dark:hover:bg-violet-800 dark:active:bg-violet-900"
                onClick={() => checkBotConnection()}
              >
                Continue
              </div>
            </div>
          </div>
        )}

        {!loading() && settings.id !== undefined && (
          <div class="flex h-screen w-screen animate-fade-in overflow-hidden">
            <div class="flex h-screen w-0 flex-col space-y-3 overflow-hidden bg-white p-3 dark:bg-neutral-800 md:w-64 lg:w-96">
              <div class="w-full py-3 text-center text-lg font-medium text-violet-900 dark:text-violet-600">
                Dichono Web Panel
              </div>
              <div class="flex h-full w-full flex-col space-y-5 overflow-y-auto">
                <Link href="/" class="flex cursor-pointer flex-row items-center space-x-2 rounded-md border-l border-t border-r border-b border-neutral-300 bg-neutral-100 px-5 py-3 transition-all duration-300 ease-in-out hover:bg-violet-100 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-violet-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  <div class="text-md text-neutral-900 dark:text-white">
                    Dashboard
                  </div>
                </Link>
              </div>
              <div
                class="flex cursor-pointer flex-row items-center justify-between rounded-md border-l border-t border-r border-b border-neutral-300 bg-neutral-100 px-5 py-3 transition-all duration-300 ease-in-out hover:bg-red-100 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-red-500"
                onClick={() => {
                  clearSettings();
                  window.location.href = "/";
                }}
              >
                <div class="flex items-center space-x-2">
                  <img src={settings.avatar} class="h-8 w-8 rounded-full" />
                  <div class="text-md text-neutral-900 dark:text-white">
                    {settings.name}
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </div>
            </div>
            <div class="flex h-screen w-full flex-col bg-white dark:bg-neutral-800">
              <div class="flex h-screen w-full flex-col overflow-y-auto rounded-tl-2xl border-l border-neutral-300 bg-neutral-100 p-3 dark:border-neutral-700 dark:bg-neutral-900">
                <Routes>
                  <Route path="/" element={Dashboard} />
                </Routes>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        class="absolute bottom-2 right-2 flex cursor-pointer flex-col items-center justify-center rounded-full border-l border-t border-r border-b border-violet-900 bg-white p-3 text-violet-900 shadow-2xl shadow-violet-900 dark:border-violet-900 dark:bg-neutral-800 dark:text-violet-600 dark:shadow-violet-900"
        onClick={() =>
          theme() === "light" ? setTheme("dark") : setTheme("light")
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
