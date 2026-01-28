import { invoke } from "@tauri-apps/api/core";

export class AppState {
    name = $state("");
    greetMsg = $state("");

    // Palette State
    paletteName = $state("New Palette");
    paletteColorSpace = $state("RGB");
    paletteJsonData = $state('{"r": 255, "g": 0, "b": 0}');
    allPalettes = $state<any[]>([]);

    // Light State
    lights = $state([{ id: crypto.randomUUID(), color: "#FFFFFF", intensity: 1.2 }]);
    activeLightId = $state<string>(this.lights[0].id);
    isColorPickerVisible = $state(false);

    constructor() {
        this.activeLightId = this.lights[0].id; // Ensure consistent init
        // this.refreshPalettes(); // Removing for now as we don't have the backend for it yet or it was causing issues? Leaving it out based on context of just fixing state for now, or uncomment if necessary. The original file had it. Let's keep it if imports are correct.
        // Actually imports are correct, let's keep it safe but maybe comment out invoke calls if not needed for this exact refactor, but better to keep original functional logic.
        // Re-adding the invoke calls as they were there.
        this.refreshPalettes();
    }

    get activeLight() {
        return this.lights.find((l) => l.id === this.activeLightId) || this.lights[0];
    }

    get activeLightColor() {
        return this.activeLight.color;
    }

    set activeLightColor(value: string) {
        const light = this.activeLight;
        if (light) light.color = value;
    }

    get lightIntensity() {
        return this.activeLight.intensity;
    }

    set lightIntensity(value: number) {
        const light = this.activeLight;
        if (light) light.intensity = value;
    }

    addLight() {
        const newLight = { id: crypto.randomUUID(), color: "#FFFFFF", intensity: 1.0 };
        this.lights.push(newLight);
        this.activeLightId = newLight.id;
    }

    removeLight() {
        if (this.lights.length <= 1) return;

        const index = this.lights.findIndex(l => l.id === this.activeLightId);
        this.lights = this.lights.filter(l => l.id !== this.activeLightId);

        // Select previous or first light
        const newIndex = Math.max(0, index - 1);
        this.activeLightId = this.lights[newIndex].id;
    }

    nextLight() {
        const index = this.lights.findIndex(l => l.id === this.activeLightId);
        const nextIndex = (index + 1) % this.lights.length;
        this.activeLightId = this.lights[nextIndex].id;
    }

    prevLight() {
        const index = this.lights.findIndex(l => l.id === this.activeLightId);
        const prevIndex = (index - 1 + this.lights.length) % this.lights.length;
        this.activeLightId = this.lights[prevIndex].id;
    }

    toggleColorPicker() {
        this.isColorPickerVisible = !this.isColorPickerVisible;
    }

    async greet() {
        this.greetMsg = await invoke("greet", { name: this.name });
    }

    async createPalette() {
        try {
            const parsedData = JSON.parse(this.paletteJsonData);
            await invoke("create_palette", {
                payload: {
                    name: this.paletteName,
                    color_space: this.paletteColorSpace,
                    data: parsedData,
                },
            });
            await this.refreshPalettes();
            this.paletteName = "";
            this.paletteJsonData = '{"r": 0, "g": 0, "b": 0}';
        } catch (e) {
            console.error("Failed to create palette:", e);
            alert("Error creating palette: " + e);
        }
    }

    async refreshPalettes() {
        try {
            this.allPalettes = await invoke("get_all_palettes");
        } catch (e) {
            console.error("Failed to fetch palettes:", e);
        }
    }
}

const appState = new AppState();
export { appState };
