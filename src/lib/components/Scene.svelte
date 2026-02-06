<script lang="ts">
    import { T, useThrelte } from "@threlte/core";
    import { OrbitControls, Environment } from "@threlte/extras";
    import { appState } from "$lib/state/app.svelte";

    const { renderer } = useThrelte();

    $effect(() => {
        if (renderer) {
            renderer.toneMappingExposure = appState.toneMappingExposure;
        }
    });

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
<!-- ENVIRONMENT (IBL) -->
<Environment url={appState.hdriUrl} isBackground={true} />

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
    intensity={0.05}
/>

<!-- VERY LOW AMBIENT (keeps shadows deep) -->
<T.AmbientLight intensity={0.01} color={"#ffffff"} />

<!-- GROUND -->
<T.Mesh rotation.x={-Math.PI / 2} receiveShadow>
    <T.CircleGeometry args={[10, 64]} />
    <T.MeshStandardMaterial color="#e0e0e0" roughness={1} />
</T.Mesh>

<!-- SCENE OBJECTS -->
{#each appState.sceneObjects as obj (obj.id)}
    {@const isSelected = obj.id === appState.activeObjectId}

    <T.Group
        position={obj.position}
        rotation={obj.rotation}
        scale={obj.scale}
        on:click={(e) => {
            e.stopPropagation();
            appState.setActiveObjectId(obj.id);
        }}
        on:pointerenter={() => (document.body.style.cursor = "pointer")}
        on:pointerleave={() => (document.body.style.cursor = "auto")}
    >
        <T.Mesh castShadow receiveShadow>
            {#if obj.type === "cube"}
                <T.BoxGeometry args={[1, 1, 1]} />
            {:else if obj.type === "sphere"}
                <T.SphereGeometry args={[0.5, 32, 32]} />
            {:else if obj.type === "cylinder"}
                <T.CylinderGeometry args={[0.5, 0.5, 1, 32]} />
            {:else if obj.type === "cone"}
                <T.ConeGeometry args={[0.5, 1, 32]} />
            {:else if obj.type === "torus"}
                <T.TorusGeometry args={[0.3, 0.15, 16, 48]} />
            {/if}

            <T.MeshStandardMaterial
                color={obj.color}
                roughness={obj.roughness}
                metalness={obj.metalness}
                emissive={isSelected ? obj.color : "#000000"}
                emissiveIntensity={isSelected ? 0.2 : 0}
            />
        </T.Mesh>
    </T.Group>
{/each}
