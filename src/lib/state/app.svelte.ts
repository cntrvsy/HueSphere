import { invoke } from "@tauri-apps/api/core";
import { FiniteStateMachine } from "runed";

type AppModes = "3d_mode" | "color_picker_mode";
type AppEvents = "toggleColorPicker";

// --- Global Data State ---
// --- Global Data State ---
interface SceneObject {
    id: string;
    type: "sphere" | "cube" | "cylinder" | "cone" | "torus";
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
    color: string;
    roughness: number;
    metalness: number;
}

const sceneObjects = $state<SceneObject[]>([
    {
        id: crypto.randomUUID(),
        type: "cube",
        position: [0, 0.5, 0],
        rotation: [0, 0.2, 0],
        scale: [1, 1, 1],
        color: "#4caf50",
        roughness: 0.2,
        metalness: 0.1
    },
    {
        id: crypto.randomUUID(),
        type: "sphere",
        position: [-0.3, 1.4, -0.2],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        color: "#ffeb3b",
        roughness: 0.1,
        metalness: 0.1
    },
    {
        id: crypto.randomUUID(),
        type: "cone",
        position: [-0.9, 0.5, 0.2],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        color: "#e91e63",
        roughness: 0.3,
        metalness: 0.2
    },
    {
        id: crypto.randomUUID(),
        type: "cylinder",
        position: [0.9, 0.6, 0.1],
        rotation: [0, 0, Math.PI / 6],
        scale: [0.6, 1.2, 0.6],
        color: "#9c27b0",
        roughness: 0.4,
        metalness: 0.6
    },
    {
        id: crypto.randomUUID(),
        type: "torus",
        position: [0.4, 0.3, 1.0],
        rotation: [Math.PI / 2, -Math.PI / 6, 0], // Leaning back slightly
        scale: [1, 1, 1],
        color: "#ff9800",
        roughness: 0.2,
        metalness: 0.0
    }
]);

let activeObjectId = $state<string>(sceneObjects[0].id);

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
let hdriUrl = $state("https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/qwantani_dusk_2_1k.hdr");
let toneMappingExposure = $state(1.0);

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
// --- Actions & Computed ---
function getActiveObject() {
    return sceneObjects.find((o) => o.id === activeObjectId) || sceneObjects[0];
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

    // Scene Object Management
    get sceneObjects() { return sceneObjects; },
    get activeObjectId() { return activeObjectId; },
    setActiveObjectId(id: string) { activeObjectId = id; },

    get activeObject() { return getActiveObject(); },

    get activeObjectColor() {
        return getActiveObject().color;
    },
    set activeObjectColor(value: string) {
        const obj = getActiveObject();
        if (obj) obj.color = value;
    },

    get activeObjectRoughness() {
        return getActiveObject().roughness ?? 0.2;
    },
    set activeObjectRoughness(value: number) {
        const obj = getActiveObject();
        if (obj) obj.roughness = value;
    },

    get activeObjectMetalness() {
        return getActiveObject().metalness ?? 0.1;
    },
    set activeObjectMetalness(value: number) {
        const obj = getActiveObject();
        if (obj) obj.metalness = value;
    },

    nextObject() {
        const index = sceneObjects.findIndex(o => o.id === activeObjectId);
        const nextIndex = (index + 1) % sceneObjects.length;
        activeObjectId = sceneObjects[nextIndex].id;
    },

    prevObject() {
        const index = sceneObjects.findIndex(o => o.id === activeObjectId);
        const prevIndex = (index - 1 + sceneObjects.length) % sceneObjects.length;
        activeObjectId = sceneObjects[prevIndex].id;
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

    get hdriUrl() { return hdriUrl; },
    set hdriUrl(v) { hdriUrl = v; },

    get toneMappingExposure() { return toneMappingExposure; },
    set toneMappingExposure(v) { toneMappingExposure = v; },

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
