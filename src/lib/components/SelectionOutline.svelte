<script lang="ts">
    import type { Mesh } from "three";
    import { useTask, useThrelte } from "@threlte/core";
    import {
        BlendFunction,
        EffectComposer,
        EffectPass,
        OutlineEffect,
        RenderPass,
        SMAAEffect,
        SMAAPreset,
        EdgeDetectionMode,
    } from "postprocessing";

    type Props = {
        selectedMesh: Mesh | undefined;
    };

    let { selectedMesh }: Props = $props();

    const { scene, renderer, camera, size, autoRender, renderStage } =
        useThrelte();

    const composer = new EffectComposer(renderer, {
        multisampling: 8, // High quality MSAA
    });

    const renderPass = new RenderPass(scene, camera.current);
    composer.addPass(renderPass);

    $effect(() => {
        composer.setSize($size.width, $size.height);
    });

    export const outlineEffectOptions: ConstructorParameters<
        typeof OutlineEffect
    >[2] = {
        blendFunction: BlendFunction.ALPHA,
        edgeStrength: 100, // Start strong
        pulseSpeed: 0.0,
        visibleEdgeColor: 0xffffff,
        hiddenEdgeColor: 0xffffff,
        xRay: true,
        blur: true,
    };

    const outlineEffect = new OutlineEffect(
        scene,
        camera.current,
        outlineEffectOptions,
    );

    // Track fade animation
    let timeSinceSelection = 0;

    $effect(() => {
        if (selectedMesh) {
            outlineEffect.selection.set([selectedMesh]);
            // Reset fade
            timeSinceSelection = 0;
            // Reset opacity/strength
            if (outlineEffect.blendMode.opacity)
                outlineEffect.blendMode.opacity.value = 1;
            // Make sure it is enabled
            outlineEffectPass.enabled = true;
        } else {
            outlineEffect.selection.clear();
        }

        return () => {
            // Cleanup handled by effect re-run or dispose
        };
    });

    const outlineEffectPass = new EffectPass(camera.current, outlineEffect);
    composer.addPass(outlineEffectPass);

    $effect(() => {
        renderPass.mainCamera = $camera;
        outlineEffect.mainCamera = $camera;
        outlineEffectPass.mainCamera = $camera;
    });

    $effect(() => {
        return () => {
            composer.removeAllPasses();
            outlineEffectPass.dispose();
            renderPass.dispose();
            composer.dispose();
        };
    });

    // Take over rendering
    $effect(() => {
        const last = autoRender.current;
        autoRender.set(false);
        return () => {
            autoRender.set(last);
        };
    });

    useTask(
        (delta) => {
            // Animation logic: Fade out after 1 second?
            // User asked: "fades out after 1 second when switching between objects"
            // Meaning: Visuals -> Select Object A -> Outline appears -> 1s later -> Outline Gone.

            if (selectedMesh && outlineEffect.selection.size > 0) {
                timeSinceSelection += delta;

                // Start fading immediately or after a delay?
                // "fades out after 1 second" could mean "stays for 1s then fades" or "fades over 1s".
                // Let's assume fades OUT over 1s.

                const fadeDuration = 1.0;
                const opacity = Math.max(
                    0,
                    1 - timeSinceSelection / fadeDuration,
                );

                if (outlineEffect.blendMode.opacity) {
                    outlineEffect.blendMode.opacity.value = opacity;
                }

                // Optional: Disable pass if opacity is 0 to save perf
                // if (opacity <= 0) outlineEffectPass.enabled = false;
                // Just keep it simple.
            }

            composer.render(delta);
        },
        { stage: renderStage, autoInvalidate: false },
    );
</script>

```
