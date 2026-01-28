<script lang="ts">
    import { appState } from "$lib/state/app.svelte";
</script>

<aside
    class="absolute right-4 top-24 bottom-24 w-[260px] z-10 hidden sm:flex flex-col gap-4 pointer-events-none justify-center"
>
    <div
        class="pointer-events-auto glass-panel p-5 rounded-3xl shadow-glass flex flex-col gap-5 transition-transform hover:-translate-x-1"
    >
        <div
            class="flex items-center justify-between border-b border-coffee-800/10 pb-3"
        >
            <span
                class="text-xs font-bold uppercase text-coffee-500 tracking-wider"
                >Light Source</span
            >
            <span class="material-symbols-outlined text-coffee-500"
                >light_mode</span
            >
        </div>
        <div class="flex flex-wrap gap-2">
            <button
                onclick={() => (appState.activeLightColor = "#FFFFFF")}
                aria-label="Select white color"
                class="w-8 h-8 rounded-full bg-[#FFFFFF] border border-coffee-200 shadow-sm hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-coffee-300"
                class:ring-coffee-300={appState.activeLightColor === "#FFFFFF"}
            ></button>
            <button
                onclick={() => (appState.activeLightColor = "#fdd835")}
                aria-label="Select yellow color"
                class="w-8 h-8 rounded-full bg-[#fdd835] border border-transparent shadow-sm hover:scale-110 transition-transform"
                class:ring-2={appState.activeLightColor === "#fdd835"}
                class:ring-coffee-500={appState.activeLightColor === "#fdd835"}
            ></button>
            <button
                onclick={() => (appState.activeLightColor = "#d4a373")}
                aria-label="Select tan color"
                class="w-8 h-8 rounded-full bg-caramel border border-transparent shadow-sm hover:scale-110 transition-transform ring-offset-2"
                class:ring-2={appState.activeLightColor === "#d4a373"}
                class:ring-coffee-500={appState.activeLightColor === "#d4a373"}
            ></button>
            <button
                onclick={() => (appState.activeLightColor = "#8d6e63")}
                aria-label="Select brown color"
                class="w-8 h-8 rounded-full bg-coffee-600 border border-transparent shadow-sm hover:scale-110 transition-transform"
                class:ring-2={appState.activeLightColor === "#8d6e63"}
                class:ring-coffee-500={appState.activeLightColor === "#8d6e63"}
            ></button>
        </div>
        <div class="space-y-2">
            <div class="flex justify-between text-xs font-bold text-coffee-700">
                <span>Intensity</span>
                <span>{appState.lightIntensity}lx</span>
            </div>
            <input
                bind:value={appState.lightIntensity}
                min="0"
                max="5"
                step="0.1"
                class="w-full h-2 bg-coffee-200 rounded-lg appearance-none cursor-pointer accent-coffee-500"
                type="range"
            />
        </div>
    </div>
    <div
        class="pointer-events-auto glass-panel p-4 rounded-3xl shadow-glass flex items-center gap-3 transition-transform hover:-translate-x-1"
    >
        <div
            class="w-12 h-12 rounded-2xl bg-linear-to-br from-coffee-400 to-coffee-600 shadow-inner"
        ></div>
        <div class="flex-1">
            <p class="text-sm font-bold text-coffee-900">Base Material</p>
            <p class="text-[10px] text-coffee-500 font-medium">Standard Clay</p>
        </div>
        <button
            class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-coffee-100 text-coffee-600"
        >
            <span class="material-symbols-outlined text-sm">edit</span>
        </button>
    </div>
</aside>
