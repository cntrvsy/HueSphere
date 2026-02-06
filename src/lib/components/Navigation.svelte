<script lang="ts">
    import { appState } from "$lib/state/app.svelte";
    import PalettePreview from "./PalettePreview.svelte";
</script>

<nav
    class="absolute bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[600px] z-30 h-[72px] glass-panel rounded-full flex items-center justify-between px-4 shadow-[0_8px_32px_rgba(62,39,35,0.15)]"
>
    <!-- Placeholder for alignment -->
    <div class="flex-1"></div>

    <!-- Center/Right: Palette Preview (Replacing Generate Button) -->
    <div class="flex items-center gap-2">
        <!-- We can make this clickable if it's supposed to generate palette, 
              but for now just placing it as requested. 
              The user didn't say "make it a button", just "replace". -->
        <button
            onclick={() => appState.createPalette()}
            class="contents text-left"
        >
            <PalettePreview />
        </button>
    </div>

    <!-- Placeholder for alignment -->
    <div class="flex-1"></div>
</nav>
