import type { SceneFactory } from "../types";
import { cyberspace } from "./cyberspace";
import { raytrace } from "./raytrace";

export const SCENES: Record<string, SceneFactory> = {
  cyberspace,
  raytrace,
};
