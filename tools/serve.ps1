param([int]$Port = 8765, [string]$Root = (Get-Location).Path)

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Start()
Write-Host "Serving $Root on http://127.0.0.1:$Port/"

$mime = @{
  ".html"="text/html"; ".css"="text/css"; ".js"="application/javascript";
  ".svg"="image/svg+xml"; ".json"="application/json"; ".ico"="image/x-icon";
  ".webp"="image/webp"; ".png"="image/png"; ".jpg"="image/jpeg"
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request
  $res = $ctx.Response
  try {
    $path = $req.Url.LocalPath
    if ($path -eq "/") { $path = "/index.html" }
    $filePath = Join-Path $Root ($path.TrimStart("/"))
    if (Test-Path $filePath -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($filePath)
      $ct = $mime[$ext]
      if (-not $ct) { $ct = "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $res.ContentType = $ct
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $res.StatusCode = 404
      $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
      $res.OutputStream.Write($msg, 0, $msg.Length)
    }
  } catch {
  } finally {
    $res.OutputStream.Close()
  }
}
