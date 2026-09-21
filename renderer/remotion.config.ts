/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideBundlerConfig(enableTailwind);
// Cap the offthread video cache — see remotion-project's own note on this
// (https://remotion.dev/docs/troubleshooting/no-frame-found-at-position):
// an oversized cache request can itself trigger "no frame found" crashes on a
// machine with limited free RAM.
Config.setOffthreadVideoCacheSizeInBytes(300_000_000);
