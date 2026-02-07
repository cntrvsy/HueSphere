<script lang="ts">
  import type * as THREE from "three";
  import type { Snippet } from "svelte";
  import { T, useThrelte, type Props } from "@threlte/core";
  import {
    useDraco,
    useGltf,
    OrbitControls,
    Environment,
  } from "@threlte/extras";
  import { appState } from "$lib/state/app.svelte";

  let {
    fallback,
    error,
    children,
    ref = $bindable(),
    ...props
  }: Props<THREE.Group> & {
    ref?: THREE.Group;
    children?: Snippet<[{ ref: THREE.Group | undefined }]>;
    fallback?: Snippet;
    error?: Snippet<[{ error: Error }]>;
  } = $props();

  const { renderer } = useThrelte();

  $effect(() => {
    if (renderer) {
      renderer.toneMappingExposure = appState.toneMappingExposure;
    }
  });

  let ambientLightIntensity = 0.15;
  let mainLightIntensity = 1.2;

  type GLTFResult = {
    nodes: {
      Cube: THREE.Mesh;
      Sphere: THREE.Mesh;
      Cylinder: THREE.Mesh;
      Cone: THREE.Mesh;
      Icosphere: THREE.Mesh;
      Torus001: THREE.Mesh;
      Cube001: THREE.Mesh;
      WHITE: THREE.Mesh;
    };
    materials: {
      square: THREE.MeshStandardMaterial;
      ball: THREE.MeshStandardMaterial;
      donut: THREE.MeshStandardMaterial;
      triangl: THREE.MeshStandardMaterial;
      ico: THREE.MeshStandardMaterial;
      white: THREE.MeshStandardMaterial;
    };
  };

  const dracoLoader = useDraco();
  const gltf = useGltf<GLTFResult>("/blankGLTFrender-transformed.glb", {
    dracoLoader,
  });

  // Helper to get object state by type
  function getObjState(
    type: "cube" | "sphere" | "cylinder" | "cone" | "torus",
  ) {
    return appState.sceneObjects.find((o) => o.type === type);
  }

  // Reactive state objects
  let cubeState = $derived(getObjState("cube"));
  let sphereState = $derived(getObjState("sphere"));
  let cylinderState = $derived(getObjState("cylinder"));
  let coneState = $derived(getObjState("cone"));
  let torusState = $derived(getObjState("torus"));

  // Mesh References for Selection Effect
  let cubeRef: THREE.Mesh | undefined = $state();
  let sphereRef: THREE.Mesh | undefined = $state();
  let cylinderRef: THREE.Mesh | undefined = $state();
  let coneRef: THREE.Mesh | undefined = $state();
  let torusRef: THREE.Mesh | undefined = $state();

  let selectedMesh = $derived.by(() => {
    if (!appState.activeObjectId) return undefined;
    if (cubeState && appState.activeObjectId === cubeState.id) return cubeRef;
    if (sphereState && appState.activeObjectId === sphereState.id)
      return sphereRef;
    if (cylinderState && appState.activeObjectId === cylinderState.id)
      return cylinderRef;
    if (coneState && appState.activeObjectId === coneState.id) return coneRef;
    if (torusState && appState.activeObjectId === torusState.id)
      return torusRef;
    return undefined;
  });

  import SelectionOutline from "./SelectionOutline.svelte";
</script>

<!-- CAMERA -->
<T.PerspectiveCamera
  makeDefault
  position={[8, 5, 8]}
  fov={50}
  oncreate={(ref) => ref.lookAt(0, 1, 0)}
>
  <OrbitControls enableDamping target={[0, 1, 0]} />
</T.PerspectiveCamera>

{#if appState.isStudioMode}
  <!-- STUDIO MODE LIGHTS -->
  {#each appState.studioLights as light (light.id)}
    <T.SpotLight
      position={light.position}
      angle={0.6}
      penumbra={light.penumbra}
      decay={light.decay}
      intensity={light.intensity}
      color={light.color}
      castShadow
      shadow.mapSize={[2048, 2048]}
      shadow.bias={-0.00005}
      shadow.normalBias={0.05}
    />
  {/each}
  <!-- Very weak ambient for fill (studio is dark but not void) -->
  <T.AmbientLight intensity={0.05} color="#ffffff" />
{:else}
  <!-- HDRI / OUTDOOR MODE -->
  {#if appState.hdriUrl}
    <Environment url={appState.hdriUrl} isBackground={true} />
  {/if}

  <T.SpotLight
    position={[5, 8, 5]}
    angle={0.5}
    penumbra={1}
    decay={0}
    intensity={appState.mainLightIntensity ?? mainLightIntensity * 5}
    color={appState.mainLightColor ?? "#ffffff"}
    castShadow
    shadow.mapSize={[2048, 2048]}
    shadow.bias={-0.00005}
    shadow.normalBias={0.05}
  />

  <T.AmbientLight intensity={0.01} color={"#ffffff"} />
{/if}

<T.Group bind:ref dispose={false} {...props}>
  {#await gltf}
    {@render fallback?.()}
  {:then gltf}
    <!-- CUBE -->
    {#if cubeState}
      {@const isSelected = cubeState.id === appState.activeObjectId}
      <T.Mesh
        bind:ref={cubeRef}
        geometry={gltf.nodes.Cube.geometry}
        position={[0, 1, 0]}
        castShadow
        receiveShadow
        on:click={(e) => {
          e.stopPropagation();
          appState.setActiveObjectId(cubeState!.id);
        }}
        on:pointerenter={() => (document.body.style.cursor = "pointer")}
        on:pointerleave={() => (document.body.style.cursor = "auto")}
      >
        <T.MeshStandardMaterial
          color={cubeState.color}
          roughness={cubeState.roughness}
          metalness={cubeState.metalness}
          emissive={isSelected ? cubeState.color : "#000000"}
          emissiveIntensity={isSelected ? 0.2 : 0}
        />
      </T.Mesh>
    {/if}

    <!-- SPHERE -->
    {#if sphereState}
      {@const isSelected = sphereState.id === appState.activeObjectId}
      <T.Mesh
        bind:ref={sphereRef}
        geometry={gltf.nodes.Sphere.geometry}
        position={[0, 2.93, 0]}
        castShadow
        receiveShadow
        on:click={(e) => {
          e.stopPropagation();
          appState.setActiveObjectId(sphereState!.id);
        }}
        on:pointerenter={() => (document.body.style.cursor = "pointer")}
        on:pointerleave={() => (document.body.style.cursor = "auto")}
      >
        <T.MeshStandardMaterial
          color={sphereState.color}
          roughness={sphereState.roughness}
          metalness={sphereState.metalness}
          emissive={isSelected ? sphereState.color : "#000000"}
          emissiveIntensity={isSelected ? 0.2 : 0}
        />
      </T.Mesh>
    {/if}

    <!-- CYLINDER -->
    {#if cylinderState}
      {@const isSelected = cylinderState.id === appState.activeObjectId}
      <T.Mesh
        bind:ref={cylinderRef}
        geometry={gltf.nodes.Cylinder.geometry}
        position={[0.69, 2.64, -2.21]}
        rotation={[-0.23, -0.09, -0.65]}
        scale={[0.52, 1, 0.52]}
        castShadow
        receiveShadow
        on:click={(e) => {
          e.stopPropagation();
          appState.setActiveObjectId(cylinderState!.id);
        }}
        on:pointerenter={() => (document.body.style.cursor = "pointer")}
        on:pointerleave={() => (document.body.style.cursor = "auto")}
      >
        <T.MeshStandardMaterial
          color={cylinderState.color}
          roughness={cylinderState.roughness}
          metalness={cylinderState.metalness}
          emissive={isSelected ? cylinderState.color : "#000000"}
          emissiveIntensity={isSelected ? 0.2 : 0}
        />
      </T.Mesh>
    {/if}

    <!-- CONE -->
    {#if coneState}
      {@const isSelected = coneState.id === appState.activeObjectId}
      <T.Mesh
        bind:ref={coneRef}
        geometry={gltf.nodes.Cone.geometry}
        position={[2, 1.16, -1.08]}
        scale={1.19}
        castShadow
        receiveShadow
        on:click={(e) => {
          e.stopPropagation();
          appState.setActiveObjectId(coneState!.id);
        }}
        on:pointerenter={() => (document.body.style.cursor = "pointer")}
        on:pointerleave={() => (document.body.style.cursor = "auto")}
      >
        <T.MeshStandardMaterial
          color={coneState.color}
          roughness={coneState.roughness}
          metalness={coneState.metalness}
          emissive={isSelected ? coneState.color : "#000000"}
          emissiveIntensity={isSelected ? 0.2 : 0}
        />
      </T.Mesh>
    {/if}

    <!-- TORUS (Icosphere in file but labelled Torus in types? Wait, types say Torus001 and Icosphere. 
         Looking at the file content: 
         nodes.Icosphere exists. 
         nodes.Torus001 exists.
         nodes.Cube001 exists.
         nodes.WHITE exists.
         
         The user's appState has: sphere, cube, cylinder, cone, torus.
         Let's map Torus to Torus001.
    -->
    {#if torusState}
      {@const isSelected = torusState.id === appState.activeObjectId}
      <T.Mesh
        bind:ref={torusRef}
        geometry={gltf.nodes.Torus001.geometry}
        position={[0.55, 2.16, -2.25]}
        scale={[1.66, 1.5, 1.66]}
        castShadow
        receiveShadow
        on:click={(e) => {
          e.stopPropagation();
          appState.setActiveObjectId(torusState!.id);
        }}
        on:pointerenter={() => (document.body.style.cursor = "pointer")}
        on:pointerleave={() => (document.body.style.cursor = "auto")}
      >
        <T.MeshStandardMaterial
          color={torusState.color}
          roughness={torusState.roughness}
          metalness={torusState.metalness}
          emissive={isSelected ? torusState.color : "#000000"}
          emissiveIntensity={isSelected ? 0.2 : 0}
        />
      </T.Mesh>
    {/if}

    <!-- Extra Static Objects from GLTF (Not in state, just render as is or ignore?) -->
    <!-- Keeping them for context if they are part of the scene composition -->

    <T.Mesh
      geometry={gltf.nodes.Icosphere.geometry}
      material={gltf.materials.ico}
      position={[1.84, 0.39, 0.62]}
      rotation={[-0.42, -0.02, 0.29]}
      scale={0.64}
      castShadow
      receiveShadow
    />

    <T.Mesh
      geometry={gltf.nodes.Cube001.geometry}
      material={gltf.materials.square}
      position={[0.12, 1, -2.41]}
      rotation={[0, 0.36, 0]}
      scale={[2.37, 1, 1]}
      castShadow
      receiveShadow
    />

    <T.Mesh
      geometry={gltf.nodes.WHITE.geometry}
      material={gltf.materials.white}
      position={[-4.41, 0, -4.26]}
      rotation={[0, 0.98, 0]}
      scale={9.28}
      castShadow
      receiveShadow
    />
  {:catch err}
    {@render error?.({ error: err })}
  {/await}

  {@render children?.({ ref })}
</T.Group>

<SelectionOutline {selectedMesh} />
