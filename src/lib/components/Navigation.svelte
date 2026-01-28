<script lang="ts">
    import { appState } from "$lib/state/app.svelte";
</script>

<nav
    class="absolute bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[600px] z-30 h-[72px] glass-panel rounded-full flex items-center justify-between px-2 pr-2 md:px-3 shadow-[0_8px_32px_rgba(62,39,35,0.15)]"
>
    <div class="flex items-center gap-1 md:gap-2 pl-2">
        <button
            class="group flex flex-col items-center justify-center w-14 h-12 md:w-16 rounded-2xl bg-coffee-100 text-coffee-800 shadow-sm transition-all relative overflow-hidden"
        >
            <div
                class="absolute inset-0 bg-coffee-200 opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
            <span class="material-symbols-outlined text-xl relative z-10"
                >wb_sunny</span
            >
            <span class="text-[9px] font-bold mt-0.5 relative z-10">Light</span>
        </button>
        <button
            class="group flex flex-col items-center justify-center w-14 h-12 md:w-16 rounded-2xl text-coffee-500 hover:bg-coffee-50 transition-all"
        >
            <span class="material-symbols-outlined text-xl">public</span>
            <span class="text-[9px] font-bold mt-0.5">World</span>
        </button>
        <button
            class="group flex flex-col items-center justify-center w-14 h-12 md:w-16 rounded-2xl text-coffee-500 hover:bg-coffee-50 transition-all"
        >
            <span class="material-symbols-outlined text-xl">category</span>
            <span class="text-[9px] font-bold mt-0.5">Object</span>
        </button>
    </div>
    <button
        onclick={() => appState.createPalette()}
        class="bg-coffee-800 hover:bg-coffee-900 text-white pl-5 pr-6 py-3 rounded-full font-bold text-sm shadow-xl shadow-coffee-800/30 flex items-center gap-2 transition-transform active:scale-95 ml-2 md:ml-auto"
    >
        <span class="material-symbols-outlined text-[20px] animate-pulse"
            >auto_fix_high</span
        >
        <span class="hidden md:inline">Generate Palette</span>
        <span class="md:hidden">Generate</span>
    </button>
</nav>
