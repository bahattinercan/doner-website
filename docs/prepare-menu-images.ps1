Add-Type -AssemblyName System.Drawing
$projectRoot = Split-Path $PSScriptRoot -Parent
$manifest = Get-Content (Join-Path $PSScriptRoot 'menu-image-prompts.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$quality = [System.Drawing.Imaging.EncoderParameters]::new(1)
$quality.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]85)
foreach ($entry in $manifest.images) {
    $destination = Join-Path $projectRoot "assets/menu/$($entry.id)-generated.jpg"
    if (Test-Path -LiteralPath $destination) { continue }
    $sourceImage = [System.Drawing.Image]::FromFile($entry.source)
    $height = [int][Math]::Round(800 * $sourceImage.Height / $sourceImage.Width)
    $resized = [System.Drawing.Bitmap]::new(800, $height)
    $graphics = [System.Drawing.Graphics]::FromImage($resized)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.DrawImage($sourceImage, 0, 0, 800, $height)
    $resized.Save($destination, $encoder, $quality)
    $graphics.Dispose()
    $resized.Dispose()
    $sourceImage.Dispose()
}
$quality.Dispose()
Write-Output "Prepared $($manifest.images.Count) menu images."
