# Downloads curated Picsum photos (deterministic seeds) + copies moon.glb from repo root.
$ErrorActionPreference = 'Stop'
$root = Join-Path $PSScriptRoot '..\public'
if (-not (Test-Path $root)) { New-Item -ItemType Directory -Path $root | Out-Null }
$storyDir = Join-Path $root 'assets\story'
$blessDir = Join-Path $root 'assets\blessings'
$modelsDir = Join-Path $root 'models'
@($storyDir, $blessDir, $modelsDir) | ForEach-Object {
  if (-not (Test-Path $_)) { New-Item -ItemType Directory -Path $_ | Out-Null }
}

for ($i = 1; $i -le 6; $i++) {
  $dest = Join-Path $storyDir ("shot-{0:D2}.jpg" -f $i)
  curl.exe -fsSL -o $dest "https://picsum.photos/seed/orozoaitstory$i/1920/1080.jpg"
}

for ($i = 1; $i -le 6; $i++) {
  $dest = Join-Path $blessDir ("blessing-{0:D2}.jpg" -f $i)
  curl.exe -fsSL -o $dest "https://picsum.photos/seed/orozoaitbless$i/1200/1500.jpg"
}

$moonSrc = Join-Path (Split-Path $PSScriptRoot -Parent) 'moon.glb'
$moonDst = Join-Path $modelsDir 'moon.glb'
if (Test-Path $moonSrc) {
  Copy-Item -Path $moonSrc -Destination $moonDst -Force
  Write-Host "Copied moon.glb"
}

Write-Host "Done."
