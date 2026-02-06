<script lang="ts">
    import { appState } from "$lib/state/app.svelte";

    let activeObjectIndex = $derived(
        appState.sceneObjects.findIndex(
            (o) => o.id === appState.activeObjectId,
        ),
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
                    onclick={() => appState.prevObject()}
                    class="btn btn-ghost btn-circle btn-sm"
                    aria-label="Previous Object"
                >
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>

                <div
                    class="px-2 min-w-[80px] text-center flex flex-col items-center justify-center"
                >
                    <span
                        class="text-xs font-bold uppercase tracking-wide opacity-70"
                    >
                        Object {activeObjectIndex + 1}
                    </span>
                    <span class="text-[10px] opacity-50 uppercase">
                        {appState.activeObject.type}
                    </span>
                </div>

                <button
                    onclick={() => appState.nextObject()}
                    class="btn btn-ghost btn-circle btn-sm"
                    aria-label="Next Object"
                >
                    <span class="material-symbols-outlined">chevron_right</span>
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
