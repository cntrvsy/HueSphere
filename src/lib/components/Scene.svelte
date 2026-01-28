<script lang="ts">
    import { T, useTask } from "@threlte/core";
    import { OrbitControls, Environment } from "@threlte/extras";
    import { appState } from "$lib/state/app.svelte";

    let { ambientLightIntensity = 0.5, mainLightIntensity = 1 } = $props();

    // Spacing helper
    // Calculate X position based on index and total length to center them
    function getPosition(
        index: number,
        total: number,
    ): [number, number, number] {
        const spacing = 3;
        const width = (total - 1) * spacing;
        const startX = -width / 2;
        return [startX + index * spacing, 1, 0];
    }
</script>

<!-- Camera -->
<T.PerspectiveCamera
    makeDefault
    position={[8, 5, 8]}
    fov={50}
    oncreate={(ref) => {
        ref.lookAt(0, 0, 0);
    }}
>
    <OrbitControls enableDamping target={[0, 1, 0]} />
</T.PerspectiveCamera>

<!-- Environment / IBL -->
<Environment
    url="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/adams_place_bridge_1k.hdr"
    isBackground={false}
/>

<!-- Lights -->
<T.DirectionalLight
    position={[5, 10, 5]}
    intensity={appState.mainLightIntensity ?? 0.8}
    color={appState.mainLightColor ?? "#FFFFFF"}
    castShadow
    shadow.mapSize={[2048, 2048]}
/>

<!-- Environment / Ground -->
<T.Mesh rotation.x={-Math.PI / 2} receiveShadow>
    <T.CircleGeometry args={[10, 64]} />
    <T.MeshStandardMaterial color="white" />
</T.Mesh>

<!-- Objects -->
{#each appState.lights as light, index (light.id)}
    {@const isSelected = light.id === appState.activeLightId}

    <T.Group position={getPosition(index, appState.lights.length)}>
        <T.Mesh
            castShadow
            receiveShadow
            onclick={(e: any) => {
                e.stopPropagation();
                appState.setActiveLightId(light.id);
            }}
            onpointerenter={() => (document.body.style.cursor = "pointer")}
            onpointerleave={() => (document.body.style.cursor = "auto")}
        >
            <T.SphereGeometry args={[1, 32, 32]} />
            <T.MeshStandardMaterial
                color={light.color}
                roughness={light.roughness ?? 0.2}
                metalness={light.metalness ?? 0.1}
                emissive={isSelected ? light.color : "#000000"}
                emissiveIntensity={isSelected ? 0.2 : 0}
            />
        </T.Mesh>

        <!-- Selection Halo (Ring) logic could go here if emissive isn't enough -->
        {#if isSelected}
            <T.Mesh rotation.x={-Math.PI / 2} position.y={-0.9}>
                <T.RingGeometry args={[1.2, 1.3, 32]} />
                <T.MeshBasicMaterial
                    color="#ffffff"
                    opacity={0.5}
                    transparent
                />
            </T.Mesh>
        {/if}
    </T.Group>
{/each}
