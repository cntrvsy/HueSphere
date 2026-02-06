<script lang="ts">
    import { appState } from "$lib/state/app.svelte";
</script>

<div class="absolute top-20 right-4 left-4 sm:hidden z-10 pointer-events-none">
    <div
        class="pointer-events-auto glass-panel p-4 rounded-3xl shadow-glass flex flex-col gap-4 max-w-sm ml-auto"
    >
        <div class="flex items-center justify-between">
            <span
                class="text-xs font-bold uppercase text-coffee-500 tracking-wider"
                >Active: Light</span
            >
            <span
                class="w-2 h-2 rounded-full ring-2 ring-offset-1 ring-transparent"
                style:background-color={appState.mainLightColor}
            ></span>
        </div>
        <div class="flex flex-col gap-3">
            <input
                bind:value={appState.mainLightIntensity}
                min="0"
                max="5"
                step="0.1"
                class="w-full h-2 bg-coffee-200 rounded-lg appearance-none cursor-pointer accent-coffee-500"
                type="range"
            />
            <div class="flex gap-2 justify-end">
                <div
                    class="w-6 h-6 rounded-full bg-caramel ring-2 ring-coffee-500 ring-offset-1"
                ></div>
                <div class="w-6 h-6 rounded-full bg-coffee-600"></div>
            </div>
        </div>
    </div>
</div>
