Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$assetsDir = Join-Path $root "assets"
if (-not (Test-Path $assetsDir)) { New-Item -ItemType Directory -Path $assetsDir | Out-Null }

function New-RoundedRectPath {
  param([float]$X, [float]$Y, [float]$W, [float]$H, [float]$R)
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $R * 2
  $path.AddArc($X, $Y, $d, $d, 180, 90)
  $path.AddArc($X + $W - $d, $Y, $d, $d, 270, 90)
  $path.AddArc($X + $W - $d, $Y + $H - $d, $d, $d, 0, 90)
  $path.AddArc($X, $Y + $H - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

function Pt {
  param([float]$OriginX, [float]$OriginY, [float]$Size, [float]$Ux, [float]$Uy)
  New-Object System.Drawing.PointF(($OriginX + $Ux * $Size), ($OriginY + $Uy * $Size))
}

function New-DropletPath {
  param([float]$OriginX, [float]$OriginY, [float]$Size)
  $p0  = Pt $OriginX $OriginY $Size 0.5   0.11667
  $c1a = Pt $OriginX $OriginY $Size 0.325 0.32917
  $c1b = Pt $OriginX $OriginY $Size 0.2   0.4875
  $p1  = Pt $OriginX $OriginY $Size 0.2   0.64583
  $c2a = Pt $OriginX $OriginY $Size 0.8   0.4875
  $c2b = Pt $OriginX $OriginY $Size 0.675 0.32917
  $pArcEnd = Pt $OriginX $OriginY $Size 0.8 0.64583

  $rectX = $OriginX + 0.2 * $Size
  $rectY = $OriginY + 0.34583 * $Size
  $rectW = 0.6 * $Size
  $rectH = 0.6 * $Size

  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddBezier($p0, $c1a, $c1b, $p1)
  $path.AddArc($rectX, $rectY, $rectW, $rectH, 180, -180)
  $path.AddBezier($pArcEnd, $c2a, $c2b, $p0)
  $path.CloseFigure()
  return $path
}

function New-BrandGradientBrush {
  param([System.Drawing.RectangleF]$Rect, [float]$Angle = 45)
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($Rect, [System.Drawing.Color]::FromArgb(255,22,32,47), [System.Drawing.Color]::FromArgb(255,34,211,238), $Angle)
  $cb = New-Object System.Drawing.Drawing2D.ColorBlend(3)
  $cb.Colors = @(
    [System.Drawing.Color]::FromArgb(255,22,32,47),
    [System.Drawing.Color]::FromArgb(255,47,111,237),
    [System.Drawing.Color]::FromArgb(255,34,211,238)
  )
  $cb.Positions = [float[]]@(0.0, 0.55, 1.0)
  $brush.InterpolationColors = $cb
  return $brush
}

function New-GlowBrush {
  param([float]$Cx, [float]$Cy, [float]$R, [System.Drawing.Color]$Color)
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddEllipse($Cx - $R, $Cy - $R, $R * 2, $R * 2)
  $brush = New-Object System.Drawing.Drawing2D.PathGradientBrush($path)
  $brush.CenterColor = $Color
  $transparent = [System.Drawing.Color]::FromArgb(0, $Color.R, $Color.G, $Color.B)
  $brush.SurroundColors = @($transparent)
  return $brush
}

function Save-Icon {
  param([int]$Size, [string]$FileName)
  $bmp = New-Object System.Drawing.Bitmap($Size, $Size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.Color]::Transparent)

  $radius = $Size * 0.22
  $bgPath = New-RoundedRectPath 0 0 $Size $Size $radius
  $bgRect = New-Object System.Drawing.RectangleF(0, 0, $Size, $Size)
  $bgBrush = New-BrandGradientBrush $bgRect 135
  $g.FillPath($bgBrush, $bgPath)

  $inset = $Size * 0.24
  $dropSize = $Size - ($inset * 2)
  $dropPath = New-DropletPath $inset ($inset * 0.94) $dropSize
  $g.FillPath([System.Drawing.Brushes]::White, $dropPath)

  $outPath = Join-Path $assetsDir $FileName
  $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
  Write-Output "Saved $outPath"
}

# --- Icons ---
Save-Icon 32 "icon-32.png"
Save-Icon 180 "icon-180.png"
Save-Icon 192 "icon-192.png"
Save-Icon 512 "icon-512.png"

# --- OG image (1200x630) ---
$w = 1200; $h = 630
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$bgRect = New-Object System.Drawing.RectangleF(0, 0, $w, $h)
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($bgRect, [System.Drawing.Color]::FromArgb(255,5,7,11), [System.Drawing.Color]::FromArgb(255,14,20,32), 35)
$g.FillRectangle($bgBrush, $bgRect)

$glow1 = New-GlowBrush 980 60 480 ([System.Drawing.Color]::FromArgb(140,34,211,238))
$g.FillRectangle($glow1, 0, 0, $w, $h)
$glow2 = New-GlowBrush 120 620 420 ([System.Drawing.Color]::FromArgb(120,47,111,237))
$g.FillRectangle($glow2, 0, 0, $w, $h)

# droplet with dashed ring
$dropSize = 300.0
$dropX = 90.0
$dropY = ($h - $dropSize) / 2
$cx = $dropX + $dropSize / 2
$cy = $dropY + $dropSize / 2
$ringPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(70,255,255,255), 1.5)
$ringPen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
$ringR = $dropSize * 0.72
$g.DrawEllipse($ringPen, $cx - $ringR, $cy - $ringR, $ringR * 2, $ringR * 2)

$dropPath = New-DropletPath $dropX $dropY $dropSize
$dropRect = New-Object System.Drawing.RectangleF($dropX, $dropY, $dropSize, $dropSize)
$dropBrush = New-BrandGradientBrush $dropRect 45
$g.FillPath($dropBrush, $dropPath)

# text
$textX = 460.0
$titleFont = New-Object System.Drawing.Font("Segoe UI", 54, [System.Drawing.FontStyle]::Bold)
$g.DrawString("VITAREX", $titleFont, [System.Drawing.Brushes]::White, $textX, 210)

$tagFont = New-Object System.Drawing.Font("Segoe UI", 22, [System.Drawing.FontStyle]::Regular)
$tagBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255,148,206,220))
$g.DrawString("Premium suv tozalash filtri", $tagFont, $tagBrush, $textX, 300)

$subFont = New-Object System.Drawing.Font("Segoe UI", 17, [System.Drawing.FontStyle]::Regular)
$subBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255,140,150,163))
$subCodes = @(0x0427,0x0438,0x0441,0x0442,0x0430,0x044F,0x0020,0x0432,0x043E,0x0434,0x0430,0x0020,0x0434,0x043B,0x044F,0x0020,0x0434,0x043E,0x043C,0x0430,0x0020,0x0438,0x0020,0x0431,0x0438,0x0437,0x043D,0x0435,0x0441,0x0430)
$subText = (-join ($subCodes | ForEach-Object { [char]$_ })) + "  -  @vitarex_uz"
$g.DrawString($subText, $subFont, $subBrush, $textX, 350)

$outPath = Join-Path $assetsDir "og-image.png"
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Output "Saved $outPath"

$g.Dispose()
$bmp.Dispose()
