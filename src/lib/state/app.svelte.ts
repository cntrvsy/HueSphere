import { invoke } from "@tauri-apps/api/core";
import { FiniteStateMachine } from "runed";

type AppModes = "3d_mode" | "color_picker_mode";
type AppEvents = "toggleColorPicker";

// --- Global Data State ---
const lights = $state([{ id: crypto.randomUUID(), color: "#FFFFFF", intensity: 1.2, roughness: 0.2, metalness: 0.1 }]);
let activeLightId = $state<string>(lights[0].id);

// Palette State
let paletteName = $state("New Palette");
let paletteColorSpace = $state("RGB");
let paletteJsonData = $state('{"r": 255, "g": 0, "b": 0}');
let allPalettes = $state<any[]>([]);
let name = $state("");
let greetMsg = $state("");

// Global Lighting State
let mainLightColor = $state("#FFFFFF");
let mainLightIntensity = $state(0.8);

// --- Finite State Machine ---
const machine = new FiniteStateMachine<AppModes, AppEvents>("3d_mode", {
    "3d_mode": {
        toggleColorPicker: "color_picker_mode"
    },
    "color_picker_mode": {
        toggleColorPicker: "3d_mode"
    }
});

// --- Actions & Computed ---
function getActiveLight() {
    return lights.find((l) => l.id === activeLightId) || lights[0];
}

async function refreshPalettes() {
    try {
        allPalettes = await invoke("get_all_palettes");
    } catch (e) {
        console.error("Failed to fetch palettes:", e);
    }
}

// Initial fetch
refreshPalettes();

// --- Exported State Object ---
// We mimic the previous class structure to minimize refactoring in components
export const appState = {
    // FSM Derived State
    get isColorPickerVisible() {
        return machine.current === "color_picker_mode";
    },

    toggleColorPicker() {
        machine.send("toggleColorPicker");
    },

    // Light Management
    get lights() { return lights; },
    get activeLightId() { return activeLightId; },
    setActiveLightId(id: string) { activeLightId = id; },

    // Explicit setter if needed by components binding to it directly (though usually handled by internal logic)
    // For read-only derived in components, getters are fine. For bindings, we need to be careful.
    // Svelte 5 state is mutable, but exporting properties directly from an object is safer.

    get activeLight() { return getActiveLight(); },

    get activeLightColor() {
        return getActiveLight().color;
    },
    set activeLightColor(value: string) {
        const light = getActiveLight();
        if (light) light.color = value;
    },

    get lightIntensity() {
        return getActiveLight().intensity;
    },
    set lightIntensity(value: number) {
        const light = getActiveLight();
        if (light) light.intensity = value;
    },

    get lightRoughness() {
        return getActiveLight().roughness ?? 0.2;
    },
    set lightRoughness(value: number) {
        const light = getActiveLight();
        if (light) light.roughness = value;
    },

    get lightMetalness() {
        return getActiveLight().metalness ?? 0.1;
    },
    set lightMetalness(value: number) {
        const light = getActiveLight();
        if (light) light.metalness = value;
    },

    addLight() {
        const newLight = { id: crypto.randomUUID(), color: "#FFFFFF", intensity: 1.0, roughness: 0.2, metalness: 0.1 };
        lights.push(newLight);
        activeLightId = newLight.id;
    },

    removeLight() {
        if (lights.length <= 1) return;

        const index = lights.findIndex(l => l.id === activeLightId);
        // Note: In Svelte 5 with arrays, we should use array mutation methods or reassignment.
        // Array mutation on $state array works.
        const lightToRemove = lights[index];
        const newLights = lights.filter(l => l.id !== activeLightId);

        // Update lights array. Since `lights` is a const reference to a $state array proxy, 
        // we can mistakenly try to reassign the variable itself if it was `let`.
        // Ideally we splice.
        lights.splice(index, 1);

        // Select previous or first light
        const newIndex = Math.max(0, index - 1);
        activeLightId = lights[newIndex].id;
    },

    nextLight() {
        const index = lights.findIndex(l => l.id === activeLightId);
        const nextIndex = (index + 1) % lights.length;
        activeLightId = lights[nextIndex].id;
    },

    prevLight() {
        const index = lights.findIndex(l => l.id === activeLightId);
        const prevIndex = (index - 1 + lights.length) % lights.length;
        activeLightId = lights[prevIndex].id;
    },

    // Backend Interaction
    get name() { return name; },
    set name(v) { name = v; },

    get greetMsg() { return greetMsg; },
    set greetMsg(v) { greetMsg = v; },

    // Global Light State
    get mainLightColor() { return mainLightColor; },
    set mainLightColor(v) { mainLightColor = v; },

    get mainLightIntensity() { return mainLightIntensity; },
    set mainLightIntensity(v) { mainLightIntensity = v; },

    async greet() {
        greetMsg = await invoke("greet", { name: name });
    },

    // Palette Logic
    get paletteName() { return paletteName; },
    set paletteName(v) { paletteName = v; },

    get paletteColorSpace() { return paletteColorSpace; },
    set paletteColorSpace(v) { paletteColorSpace = v; },

    get paletteJsonData() { return paletteJsonData; },
    set paletteJsonData(v) { paletteJsonData = v; },

    get allPalettes() { return allPalettes; },

    async createPalette() {
        try {
            const parsedData = JSON.parse(paletteJsonData);
            await invoke("create_palette", {
                payload: {
                    name: paletteName,
                    color_space: paletteColorSpace,
                    data: parsedData,
                },
            });
            await refreshPalettes();
            paletteName = "New Palette";
            paletteJsonData = '{"r": 0, "g": 0, "b": 0}';
        } catch (e) {
            console.error("Failed to create palette:", e);
            alert("Error creating palette: " + e);
        }
    },

    refreshPalettes
};
