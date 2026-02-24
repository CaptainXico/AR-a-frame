const scene = document.querySelector("a-scene");
const model = document.querySelector("#model");

scene.addEventListener("enter-vr", () => {

    const xrSession = scene.renderer.xr.getSession();
    const referenceSpace = scene.renderer.xr.getReferenceSpace();

    xrSession.requestReferenceSpace("viewer").then((viewerSpace) => {

        xrSession.requestHitTestSource({ space: viewerSpace }).then((hitTestSource) => {

            scene.renderer.xr.setAnimationLoop((time, frame) => {

                if (!frame) return;

                const hitTestResults = frame.getHitTestResults(hitTestSource);

                if (hitTestResults.length > 0) {

                    const hit = hitTestResults[0];
                    const pose = hit.getPose(referenceSpace);

                    model.object3D.position.set(
                        pose.transform.position.x,
                        pose.transform.position.y,
                        pose.transform.position.z
                    );

                    model.setAttribute("visible", true);
                }

            });

        });

    });

});
