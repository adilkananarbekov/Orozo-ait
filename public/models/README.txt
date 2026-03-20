Place your lunar mesh here as moon.glb (glTF binary).

When the file is valid, the experience loads it with useGLTF.
If the file is missing or invalid, a procedural moon is shown instead.

Optional: after adding moon.glb, add at the bottom of src/components/MoonScene.tsx:
  void useGLTF.preload(MOON_GLB)
to warm the cache on startup.
