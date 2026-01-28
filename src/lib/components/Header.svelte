<script lang="ts">
    import { appState } from "$lib/state/app.svelte";

    let activeLightIndex = $derived(
        appState.lights.findIndex((l) => l.id === appState.activeLightId),
    );
</script>

<header class="absolute top-0 left-0 right-0 z-20 p-2 pointer-events-none">
    <div
        class="navbar bg-base-100/80 backdrop-blur-md shadow-sm rounded-box pointer-events-auto"
    >
        <div class="navbar-start">
            <button
                onclick={() => appState.toggleColorPicker()}
                class="btn btn-ghost btn-circle"
                aria-label="Toggle Color Picker"
                class:btn-active={appState.isColorPickerVisible}
            >
                <span class="material-symbols-outlined">palette</span>
            </button>
        </div>

        <div class="navbar-center">
            <div class="flex items-center gap-2">
                <button
                    onclick={() => appState.prevLight()}
                    class="btn btn-ghost btn-circle btn-sm"
                    aria-label="Previous Light"
                >
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>

                <div
                    class="px-2 min-w-[80px] text-center flex flex-col items-center justify-center"
                >
                    <span
                        class="text-xs font-bold uppercase tracking-wide opacity-70"
                    >
                        Light {activeLightIndex + 1}
                    </span>
                </div>

                <button
                    onclick={() => appState.nextLight()}
                    class="btn btn-ghost btn-circle btn-sm"
                    aria-label="Next Light"
                >
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>

                <div
                    class="divider divider-horizontal mx-0 h-6 self-center"
                ></div>

                <button
                    onclick={() => appState.addLight()}
                    class="btn btn-ghost btn-circle btn-sm"
                    aria-label="Add Light"
                >
                    <span class="material-symbols-outlined">add</span>
                </button>

                <button
                    onclick={() => appState.removeLight()}
                    disabled={appState.lights.length <= 1}
                    class="btn btn-ghost btn-circle btn-sm text-error"
                    aria-label="Remove Light"
                >
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>

        <div class="navbar-end">
            <button class="btn btn-ghost btn-circle" aria-label="Settings">
                <span class="material-symbols-outlined">settings</span>
            </button>
        </div>
    </div>
</header>
