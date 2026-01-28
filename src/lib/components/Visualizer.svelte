<script lang="ts">
    // Implementation of 3D visualizer
</script>

<main
    class="absolute inset-0 z-0 viewport-gradient flex items-center justify-center"
>
    <div
        class="absolute inset-0 opacity-30 bg-[radial-gradient(#8d6e63_1px,transparent_1px)] [bg-size:24px_24px] pointer-events-none"
    ></div>
    <div
        class="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] transition-all duration-700 ease-out"
    >
        <div
            class="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-coffee-900/20 blur-xl rounded-[100%]"
        ></div>
        <div
            class="w-full h-full rounded-full bg-linear-to-br from-coffee-50 via-coffee-300 to-coffee-600 shadow-[inset_-20px_-20px_50px_rgba(62,39,35,0.2),0_20px_40px_rgba(62,39,35,0.15)] relative overflow-hidden border border-white/40"
        >
            <div
                class="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-white/50 blur-2xl rounded-full mix-blend-overlay"
            ></div>
            <div
                class="absolute top-[15%] left-[20%] w-16 h-16 bg-white blur-xl rounded-full opacity-80"
            ></div>
            <div
                class="absolute inset-0 rounded-full shadow-[inset_2px_2px_20px_rgba(255,255,255,0.5)]"
            ></div>
        </div>
        <div class="absolute top-0 right-0 p-2 opacity-50">
            <div
                class="w-12 h-12 rounded-full border border-coffee-800/20 flex items-center justify-center relative"
            >
                <div class="w-px h-8 bg-coffee-800/30 absolute"></div>
                <div class="w-8 h-px bg-coffee-800/30 absolute"></div>
                <div class="w-2 h-2 bg-coffee-800 rounded-full z-10"></div>
            </div>
        </div>
    </div>
</main>
