<script lang="ts">
    import { appState } from "$lib/state/app.svelte";
</script>

<div class="absolute bottom-24 left-4 z-10 hidden md:block">
    <div class="glass-panel px-3 py-2 rounded-xl flex items-center gap-3">
        <span class="text-[10px] font-bold text-coffee-400 uppercase"
            >Palette Preview</span
        >
        <div class="flex -space-x-2">
            <div
                class="w-6 h-6 rounded-full bg-coffee-900 ring-2 ring-white"
            ></div>
            <div
                class="w-6 h-6 rounded-full bg-coffee-600 ring-2 ring-white"
            ></div>
            <div
                class="w-6 h-6 rounded-full bg-caramel ring-2 ring-white"
            ></div>
            <div
                class="w-6 h-6 rounded-full bg-coffee-50 ring-2 ring-white"
            ></div>
        </div>
    </div>
</div>
