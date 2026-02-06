<script lang="ts">
    import { Canvas } from "@threlte/core";
    import Scene from "./Scene.svelte";
    import { ACESFilmicToneMapping } from "three";
    import { appState } from "$lib/state/app.svelte";
</script>

<main class="absolute inset-0 z-0 viewport-gradient">
    <Canvas toneMapping={ACESFilmicToneMapping} shadows>
        <Scene />
    </Canvas>
</main>
