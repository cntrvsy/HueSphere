<script lang="ts">
    import { T } from "@threlte/core";
    import { OrbitControls, Environment } from "@threlte/extras";
    import { appState } from "$lib/state/app.svelte";

    // Svelte 5 props
    let ambientLightIntensity = 0.15;
    let mainLightIntensity = 1.2;

    // Helper to center objects
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

<!-- CAMERA -->
<T.PerspectiveCamera
    makeDefault
    position={[8, 5, 8]}
    fov={50}
    on:create={(cam) => cam.lookAt(0, 1, 0)}
>
    <OrbitControls enableDamping target={[0, 1, 0]} />
</T.PerspectiveCamera>

<!-- ENVIRONMENT (IBL) -->
<Environment
    url="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/qwantani_dusk_2_1k.hdr"
    isBackground={true}
/>

<!-- MAIN DIRECTIONAL LIGHT (45° angle) -->
<T.DirectionalLight
    position={[5, 10, 5]}
    intensity={appState.mainLightIntensity ?? mainLightIntensity}
    color={appState.mainLightColor ?? "#ffffff"}
    castShadow
    shadow.mapSize={[2048, 2048]}
    shadow.bias={-0.0005}
    shadow.radius={4}
/>

<!-- BOUNCE LIGHT (Hemisphere) -->
<T.HemisphereLight
    skyColor={"#ffffff"}
    groundColor={"#888888"}
    intensity={ambientLightIntensity}
/>

<!-- VERY LOW AMBIENT (keeps shadows deep) -->
<T.AmbientLight intensity={0.03} color={"#ffffff"} />

<!-- GROUND -->
<T.Mesh rotation.x={-Math.PI / 2} receiveShadow>
    <T.CircleGeometry args={[10, 64]} />
    <T.MeshStandardMaterial color="#e0e0e0" roughness={1} />
</T.Mesh>

<!-- OBJECTS -->
{#each appState.lights as light, index (light.id)}
    {@const isSelected = light.id === appState.activeLightId}

    <T.Group position={getPosition(index, appState.lights.length)}>
        <T.Mesh
            castShadow
            receiveShadow
            on:click={(e) => {
                e.stopPropagation();
                appState.setActiveLightId(light.id);
            }}
            on:pointerenter={() => (document.body.style.cursor = "pointer")}
            on:pointerleave={() => (document.body.style.cursor = "auto")}
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
    </T.Group>
{/each}
