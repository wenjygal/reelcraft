# Only needed if `remotion render` fails with an FFmpeg exit code around
# 3236495362 / -1058471934 and Windows Event Viewer's
# "Microsoft-Windows-CodeIntegrity/Operational" log shows an event like:
#   "Code Integrity determined that a process ... attempted to load
#    ...avfilter-10.dll that did not meet the Enterprise signing level
#    requirements" — that's Windows 11 Smart App Control blocking Remotion's
#    bundled ffmpeg.exe as an unrecognized binary.
#
# This script builds a local, gitignored `.remotion-binaries/` folder: a copy of
# Remotion's own compositor (remotion.exe + its DLLs, which already works —
# frame rendering isn't what's blocked) with ffmpeg.exe/ffprobe.exe swapped for
# a separately-installed, already-trusted system FFmpeg build. remotion.config.ts
# picks this folder up automatically if it exists — no other config needed.
#
# Do NOT "fix" this by disabling Smart App Control — that's a one-way OS
# setting (can't be re-enabled without a clean Windows install). This script
# works around the block without touching it.
#
# Requires: a system FFmpeg install with a *self-contained* ffmpeg.exe/ffprobe.exe
# (no separate DLLs next to them — a "full_build" from gyan.dev, e.g. via
# `winget install Gyan.FFmpeg`, qualifies). Update $systemFfmpegDir below to
# wherever yours lives.

$ErrorActionPreference = "Stop"

$systemFfmpegDir = "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin"
$compositorPkgDir = Join-Path $PSScriptRoot "..\node_modules\@remotion\compositor-win32-x64-msvc"
$destDir = Join-Path $PSScriptRoot "..\.remotion-binaries"

if (-not (Test-Path $systemFfmpegDir)) {
    throw "System FFmpeg not found at $systemFfmpegDir — install one (e.g. 'winget install Gyan.FFmpeg') and update this script's `$systemFfmpegDir."
}
if (-not (Test-Path $compositorPkgDir)) {
    throw "Remotion's compositor package not found at $compositorPkgDir — run 'npm install' first."
}

if (Test-Path $destDir) { Remove-Item -Recurse -Force $destDir }
New-Item -ItemType Directory -Path $destDir | Out-Null

Copy-Item "$compositorPkgDir\*" $destDir -Recurse -Force
Copy-Item "$systemFfmpegDir\ffmpeg.exe" (Join-Path $destDir "ffmpeg.exe") -Force
Copy-Item "$systemFfmpegDir\ffprobe.exe" (Join-Path $destDir "ffprobe.exe") -Force

Write-Host "Built $destDir — remotion.config.ts will use it automatically from now on."
