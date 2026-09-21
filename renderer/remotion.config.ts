/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

// Note: Config.setBinariesDirectory() exists but its module-level state didn't
// reliably survive into the actual render step in testing here — pass
// --binaries-directory=.remotion-binaries explicitly on the render command
// instead (see package.json's render:* scripts and step-4-deliver.md). Only
// needed at all if Windows Smart App Control blocks Remotion's bundled ffmpeg —
// see renderer/scripts/setup-local-binaries.ps1.

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideBundlerConfig(enableTailwind);
// Cap the offthread video cache — see remotion-project's own note on this
// (https://remotion.dev/docs/troubleshooting/no-frame-found-at-position):
// an oversized cache request can itself trigger "no frame found" crashes on a
// machine with limited free RAM.
Config.setOffthreadVideoCacheSizeInBytes(300_000_000);
