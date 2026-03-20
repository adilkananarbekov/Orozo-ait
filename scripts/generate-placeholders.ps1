$base = Join-Path $PSScriptRoot "..\public"
if (-not (Test-Path $base)) {
  New-Item -ItemType Directory -Path $base | Out-Null
}
$base = (Resolve-Path $base).Path
New-Item -ItemType Directory -Force -Path "$base\assets\story", "$base\assets\blessings", "$base\models" | Out-Null
Add-Type -AssemblyName System.Drawing

for ($i = 1; $i -le 6; $i++) {
  $w = 1600
  $h = 1000
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.Clear([System.Drawing.Color]::FromArgb(5, 8, 20))
  $c1 = [System.Drawing.Color]::FromArgb(255, [Math]::Min(255, 120 + $i * 15), [Math]::Min(255, 80 + $i * 10), [Math]::Min(255, 40 + $i * 5))
  $c2 = [System.Drawing.Color]::FromArgb(255, [Math]::Min(255, 50 + $i * 8), [Math]::Max(0, 180 - $i * 10), [Math]::Max(0, 200 - $i * 12))
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush ([System.Drawing.Point]::new(0, 0), [System.Drawing.Point]::new($w, $h), $c1, $c2)
  $g.FillRectangle($brush, 0, 0, $w, $h)
  $brush.Dispose()
  $font = New-Object System.Drawing.Font("Segoe UI", 40, [System.Drawing.FontStyle]::Bold)
  $sb = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(248, 243, 232))
  $g.DrawString("Orozo Ait - Moment $i", $font, $sb, 70, 70)
  $path = Join-Path $base ("assets\story\shot-{0:D2}.jpg" -f $i)
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $font.Dispose()
  $sb.Dispose()
  $g.Dispose()
  $bmp.Dispose()
}

for ($i = 1; $i -le 6; $i++) {
  $w = 900
  $h = 1120
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.Clear([System.Drawing.Color]::FromArgb(8, 12, 24))
  $c1 = [System.Drawing.Color]::FromArgb(255, 158, 247, 194)
  $c2 = [System.Drawing.Color]::FromArgb(255, 91, 192, 255)
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush ([System.Drawing.Point]::new(0, $h), [System.Drawing.Point]::new($w, 0), $c1, $c2)
  $g.FillRectangle($brush, 0, 0, $w, $h)
  $brush.Dispose()
  $font = New-Object System.Drawing.Font("Segoe UI", 36, [System.Drawing.FontStyle]::Bold)
  $sb = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(5, 8, 20))
  $g.DrawString("Blessing $i", $font, $sb, 50, 50)
  $path = Join-Path $base ("assets\blessings\blessing-{0:D2}.jpg" -f $i)
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $font.Dispose()
  $sb.Dispose()
  $g.Dispose()
  $bmp.Dispose()
}

Write-Host "Placeholder JPEGs written to $base"
