<script lang="ts">
    import { appState } from "$lib/state/app.svelte";

    let activeTab = $state("source"); // "source", "material", "environment"
</script>

<aside
    class="absolute right-4 top-24 bottom-24 w-[260px] z-10 hidden sm:flex flex-col gap-4 pointer-events-none justify-center"
>
    <div
        class="pointer-events-auto glass-panel p-5 rounded-3xl shadow-glass flex flex-col gap-4 transition-transform hover:-translate-x-1"
    >
        <!-- TABS HEADER -->
        <div
            role="tablist"
            class="tabs tabs-boxed bg-coffee-100/50 p-1 rounded-2xl"
        >
            <button
                role="tab"
                class="tab text-xs font-bold transition-all px-2"
                class:tab-active={activeTab === "source"}
                onclick={() => (activeTab = "source")}>Source</button
            >
            <button
                role="tab"
                class="tab text-xs font-bold transition-all px-2"
                class:tab-active={activeTab === "material"}
                onclick={() => (activeTab = "material")}>Material</button
            >
            <button
                role="tab"
                class="tab text-xs font-bold transition-all px-2"
                class:tab-active={activeTab === "environment"}
                onclick={() => (activeTab = "environment")}>Env</button
            >
        </div>

        <!-- LIGHT SOURCE PANEL -->
        {#if activeTab === "source"}
            <div
                class="flex flex-col gap-5 animate-fadeIn overflow-y-auto max-h-[60vh] pr-2"
            >
                <div
                    class="flex items-center justify-between border-b border-coffee-800/10 pb-3"
                >
                    <span
                        class="text-xs font-bold uppercase text-coffee-500 tracking-wider"
                        >Light Source</span
                    >
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] font-bold text-coffee-400"
                            >{appState.isStudioMode ? "STUDIO" : "HDRI"}</span
                        >
                        <input
                            type="checkbox"
                            class="toggle toggle-xs toggle-primary"
                            checked={appState.isStudioMode}
                            onchange={(e) =>
                                (appState.isStudioMode =
                                    e.currentTarget.checked)}
                        />
                    </div>
                </div>

                {#if appState.isStudioMode}
                    <!-- STUDIO MODE CONTROLS -->
                    <div class="flex flex-col gap-4">
                        <button
                            class="btn btn-xs btn-outline border-coffee-300 text-coffee-600 hover:bg-coffee-100"
                            onclick={() => appState.addStudioLight()}
                        >
                            + Add Light
                        </button>

                        {#each appState.studioLights as light, index (light.id)}
                            <div
                                class="flex flex-col gap-3 p-3 bg-white/50 rounded-xl border border-coffee-200/50"
                            >
                                <div class="flex justify-between items-center">
                                    <span
                                        class="text-xs font-bold text-coffee-700"
                                        >Light {index + 1}</span
                                    >
                                    {#if appState.studioLights.length > 1}
                                        <button
                                            class="btn btn-ghost btn-xs text-red-400 hover:text-red-600 w-6 h-6 min-h-0 p-0"
                                            onclick={() =>
                                                appState.removeStudioLight(
                                                    light.id,
                                                )}
                                        >
                                            <span
                                                class="material-symbols-outlined text-sm"
                                                >delete</span
                                            >
                                        </button>
                                    {/if}
                                </div>

                                <!-- Color & Intensity -->
                                <div class="flex gap-2 items-center">
                                    <div
                                        class="relative w-8 h-8 rounded-full overflow-hidden border border-coffee-200 shadow-sm shrink-0"
                                    >
                                        <input
                                            type="color"
                                            value={light.color}
                                            oninput={(e) =>
                                                appState.updateStudioLight(
                                                    light.id,
                                                    {
                                                        color: e.currentTarget
                                                            .value,
                                                    },
                                                )}
                                            class="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] cursor-pointer p-0 border-0"
                                        />
                                    </div>
                                    <div class="flex flex-col w-full">
                                        <span
                                            class="text-[10px] font-bold text-coffee-500"
                                            >Intensity: {light.intensity.toFixed(
                                                1,
                                            )}</span
                                        >
                                        <input
                                            type="range"
                                            min="0"
                                            max="10"
                                            step="0.1"
                                            value={light.intensity}
                                            oninput={(e) =>
                                                appState.updateStudioLight(
                                                    light.id,
                                                    {
                                                        intensity: parseFloat(
                                                            e.currentTarget
                                                                .value,
                                                        ),
                                                    },
                                                )}
                                            class="w-full h-1.5 bg-coffee-200 rounded-lg appearance-none cursor-pointer accent-coffee-500"
                                        />
                                    </div>
                                </div>

                                <!-- Position Controls -->
                                <div class="grid grid-cols-2 gap-2">
                                    <div class="flex flex-col">
                                        <span
                                            class="text-[10px] font-bold text-coffee-500"
                                            >Distance</span
                                        >
                                        <input
                                            type="range"
                                            min="2"
                                            max="20"
                                            step="0.5"
                                            value={light.distance}
                                            oninput={(e) =>
                                                appState.updateStudioLight(
                                                    light.id,
                                                    {
                                                        distance: parseFloat(
                                                            e.currentTarget
                                                                .value,
                                                        ),
                                                    },
                                                )}
                                            class="w-full h-1.5 bg-coffee-200 rounded-lg appearance-none cursor-pointer accent-coffee-500"
                                        />
                                    </div>
                                    <div class="flex flex-col">
                                        <span
                                            class="text-[10px] font-bold text-coffee-500"
                                            >Height</span
                                        >
                                        <input
                                            type="range"
                                            min="-5"
                                            max="15"
                                            step="0.5"
                                            value={light.height}
                                            oninput={(e) =>
                                                appState.updateStudioLight(
                                                    light.id,
                                                    {
                                                        height: parseFloat(
                                                            e.currentTarget
                                                                .value,
                                                        ),
                                                    },
                                                )}
                                            class="w-full h-1.5 bg-coffee-200 rounded-lg appearance-none cursor-pointer accent-coffee-500"
                                        />
                                    </div>
                                </div>
                                <div class="flex flex-col">
                                    <span
                                        class="text-[10px] font-bold text-coffee-500"
                                        >Angle</span
                                    >
                                    <input
                                        type="range"
                                        min="0"
                                        max={Math.PI * 2}
                                        step="0.1"
                                        value={light.angle}
                                        oninput={(e) =>
                                            appState.updateStudioLight(
                                                light.id,
                                                {
                                                    angle: parseFloat(
                                                        e.currentTarget.value,
                                                    ),
                                                },
                                            )}
                                        class="w-full h-1.5 bg-coffee-200 rounded-lg appearance-none cursor-pointer accent-coffee-500"
                                    />
                                </div>
                                <div class="flex flex-col">
                                    <span
                                        class="text-[10px] font-bold text-coffee-500"
                                        >Softness</span
                                    >
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={light.penumbra}
                                        oninput={(e) =>
                                            appState.updateStudioLight(
                                                light.id,
                                                {
                                                    penumbra: parseFloat(
                                                        e.currentTarget.value,
                                                    ),
                                                },
                                            )}
                                        class="w-full h-1.5 bg-coffee-200 rounded-lg appearance-none cursor-pointer accent-coffee-500"
                                    />
                                </div>
                            </div>
                        {/each}
                    </div>
                {:else}
                    <!-- HDRI MODE (Existing Controls) -->
                    <!-- Global Light Color -->
                    <div class="flex flex-wrap gap-2 items-center">
                        <button
                            onclick={() =>
                                (appState.mainLightColor = "#FFFFFF")}
                            aria-label="Set light to white"
                            class="w-8 h-8 rounded-full bg-[#FFFFFF] border border-coffee-200 shadow-sm hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-coffee-300"
                            class:ring-coffee-300={appState.mainLightColor ===
                                "#FFFFFF"}
                        ></button>
                        <button
                            onclick={() =>
                                (appState.mainLightColor = "#ffeb3b")}
                            aria-label="Set light to warm"
                            class="w-8 h-8 rounded-full bg-[#ffeb3b] border border-transparent shadow-sm hover:scale-110 transition-transform"
                            class:ring-2={appState.mainLightColor === "#ffeb3b"}
                            class:ring-coffee-500={appState.mainLightColor ===
                                "#ffeb3b"}
                        ></button>
                        <button
                            onclick={() =>
                                (appState.mainLightColor = "#f44336")}
                            aria-label="Set light to red"
                            class="w-8 h-8 rounded-full bg-[#f44336] border border-transparent shadow-sm hover:scale-110 transition-transform"
                            class:ring-2={appState.mainLightColor === "#f44336"}
                            class:ring-coffee-500={appState.mainLightColor ===
                                "#f44336"}
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
                        <div
                            class="flex justify-between text-xs font-bold text-coffee-700"
                        >
                            <span>Intensity</span>
                            <span
                                >{appState.mainLightIntensity?.toFixed(1)}</span
                            >
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
                {/if}
            </div>
        {/if}

        <!-- MATERIAL PANEL -->
        {#if activeTab === "material"}
            <div class="flex flex-col gap-4 animate-fadeIn">
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
                    <span class="text-sm font-bold text-coffee-900"
                        >Base Color</span
                    >
                    <div
                        class="relative w-8 h-8 rounded-full overflow-hidden border border-coffee-200 shadow-sm hover:scale-110 transition-transform"
                    >
                        <input
                            type="color"
                            bind:value={appState.activeObjectColor}
                            class="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] cursor-pointer p-0 border-0"
                            aria-label="Object base color"
                        />
                    </div>
                </div>

                <!-- Roughness -->
                <div class="space-y-1">
                    <div
                        class="flex justify-between text-xs font-bold text-coffee-700"
                    >
                        <span>Roughness</span>
                        <span>{appState.activeObjectRoughness?.toFixed(2)}</span
                        >
                    </div>
                    <input
                        bind:value={appState.activeObjectRoughness}
                        min="0"
                        max="1"
                        step="0.01"
                        class="w-full h-2 bg-coffee-200 rounded-lg appearance-none cursor-pointer accent-coffee-500"
                        type="range"
                    />
                </div>

                <!-- Metalness -->
                <div class="space-y-1">
                    <div
                        class="flex justify-between text-xs font-bold text-coffee-700"
                    >
                        <span>Metalness</span>
                        <span>{appState.activeObjectMetalness?.toFixed(2)}</span
                        >
                    </div>
                    <input
                        bind:value={appState.activeObjectMetalness}
                        min="0"
                        max="1"
                        step="0.01"
                        class="w-full h-2 bg-coffee-200 rounded-lg appearance-none cursor-pointer accent-coffee-500"
                        type="range"
                    />
                </div>
            </div>
        {/if}

        <!-- ENVIRONMENT PANEL -->
        {#if activeTab === "environment"}
            <div class="flex flex-col gap-4 animate-fadeIn">
                <div
                    class="flex items-center justify-between border-b border-coffee-800/10 pb-3"
                >
                    <span
                        class="text-xs font-bold uppercase text-coffee-500 tracking-wider"
                        >Environment</span
                    >
                    <span class="material-symbols-outlined text-coffee-500"
                        >hdr_weak</span
                    >
                </div>

                <!-- Exposure -->
                <div class="space-y-1">
                    <div
                        class="flex justify-between text-xs font-bold text-coffee-700"
                    >
                        <span>Exposure</span>
                        <span>{appState.toneMappingExposure?.toFixed(1)}</span>
                    </div>
                    <input
                        bind:value={appState.toneMappingExposure}
                        min="0"
                        max="5"
                        step="0.1"
                        class="w-full h-2 bg-coffee-200 rounded-lg appearance-none cursor-pointer accent-coffee-500"
                        type="range"
                    />
                </div>

                <!-- HDRI URL -->
                <div class="space-y-1">
                    <span class="text-xs font-bold text-coffee-700"
                        >HDRI URL</span
                    >
                    <input
                        bind:value={appState.hdriUrl}
                        class="w-full text-xs p-2 bg-coffee-50 rounded-lg border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-500"
                        type="text"
                        placeholder="https://..."
                    />
                </div>
            </div>
        {/if}
    </div>
</aside>
