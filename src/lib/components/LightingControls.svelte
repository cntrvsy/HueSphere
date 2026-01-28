<script lang="ts">
    import { appState } from "$lib/state/app.svelte";
</script>

<aside
    class="absolute right-4 top-24 bottom-24 w-[260px] z-10 hidden sm:flex flex-col gap-4 pointer-events-none justify-center"
>
    <!-- LIGHT SOURCE PANEL -->
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

        <!-- Global Light Color -->
        <div class="flex flex-wrap gap-2 items-center">
            <button
                onclick={() => (appState.mainLightColor = "#FFFFFF")}
                aria-label="Set light to white"
                class="w-8 h-8 rounded-full bg-[#FFFFFF] border border-coffee-200 shadow-sm hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-coffee-300"
                class:ring-coffee-300={appState.mainLightColor === "#FFFFFF"}
            ></button>
            <button
                onclick={() => (appState.mainLightColor = "#ffeb3b")}
                aria-label="Set light to warm"
                class="w-8 h-8 rounded-full bg-[#ffeb3b] border border-transparent shadow-sm hover:scale-110 transition-transform"
                class:ring-2={appState.mainLightColor === "#ffeb3b"}
                class:ring-coffee-500={appState.mainLightColor === "#ffeb3b"}
            ></button>
            <button
                onclick={() => (appState.mainLightColor = "#f44336")}
                aria-label="Set light to red"
                class="w-8 h-8 rounded-full bg-[#f44336] border border-transparent shadow-sm hover:scale-110 transition-transform"
                class:ring-2={appState.mainLightColor === "#f44336"}
                class:ring-coffee-500={appState.mainLightColor === "#f44336"}
            ></button>
            <div
                class="relative w-8 h-8 rounded-full overflow-hidden border border-coffee-200 shadow-sm hover:scale-110 transition-transform"
            >
                <input
                    type="color"
                    bind:value={appState.mainLightColor}
                    class="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] cursor-pointer p-0 border-0"
                    aria-label="Custom light color"
                />
            </div>
        </div>

        <!-- Global Intensity -->
        <div class="space-y-2">
            <div class="flex justify-between text-xs font-bold text-coffee-700">
                <span>Intensity</span>
                <span>{appState.mainLightIntensity?.toFixed(1)}</span>
            </div>
            <input
                bind:value={appState.mainLightIntensity}
                min="0"
                max="3"
                step="0.1"
                class="w-full h-2 bg-coffee-200 rounded-lg appearance-none cursor-pointer accent-coffee-500"
                type="range"
            />
        </div>
    </div>

    <!-- MATERIAL PANEL -->
    <div
        class="pointer-events-auto glass-panel p-5 rounded-3xl shadow-glass flex flex-col gap-4 transition-transform hover:-translate-x-1"
    >
        <div
            class="flex items-center justify-between border-b border-coffee-800/10 pb-3"
        >
            <span
                class="text-xs font-bold uppercase text-coffee-500 tracking-wider"
                >Object Material</span
            >
            <span class="material-symbols-outlined text-coffee-500"
                >dataset</span
            >
        </div>

        <!-- Object Color -->
        <div class="flex items-center justify-between">
            <pan class="text-sm font-bold text-coffee-900">Base Color</pan>
            <div
                class="relative w-8 h-8 rounded-full overflow-hidden border border-coffee-200 shadow-sm hover:scale-110 transition-transform"
            >
                <input
                    type="color"
                    bind:value={appState.activeLightColor}
                    class="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] cursor-pointer p-0 border-0"
                    aria-label="Object base color"
                />
            </div>
        </div>

        <!-- Roughness -->
        <div class="space-y-1">
            <div class="flex justify-between text-xs font-bold text-coffee-700">
                <span>Roughness</span>
                <span>{appState.lightRoughness?.toFixed(2)}</span>
            </div>
            <input
                bind:value={appState.lightRoughness}
                min="0"
                max="1"
                step="0.01"
                class="w-full h-2 bg-coffee-200 rounded-lg appearance-none cursor-pointer accent-coffee-500"
                type="range"
            />
        </div>

        <!-- Metalness -->
        <div class="space-y-1">
            <div class="flex justify-between text-xs font-bold text-coffee-700">
                <span>Metalness</span>
                <span>{appState.lightMetalness?.toFixed(2)}</span>
            </div>
            <input
                bind:value={appState.lightMetalness}
                min="0"
                max="1"
                step="0.01"
                class="w-full h-2 bg-coffee-200 rounded-lg appearance-none cursor-pointer accent-coffee-500"
                type="range"
            />
        </div>
    </div>
</aside>
