<script lang="ts">
  import Visualizer from "$lib/components/Visualizer.svelte";
  import Header from "$lib/components/Header.svelte";
  import LightingControls from "$lib/components/LightingControls.svelte";
  import MobileControls from "$lib/components/MobileControls.svelte";
  import PalettePreview from "$lib/components/PalettePreview.svelte";
  import Navigation from "$lib/components/Navigation.svelte";

  // AppState is initialized in the module and imported by components,
  // but we can import it here if we need top-level access,
  // or just rely on components.
</script>

<div
  class="bg-coffee-50 text-coffee-900 h-screen w-screen overflow-hidden relative selection:bg-caramel selection:text-white font-sans"
>
  <Visualizer />
  <Header />
  <LightingControls />
  <MobileControls />
  <PalettePreview />
  <Navigation />
</div>
