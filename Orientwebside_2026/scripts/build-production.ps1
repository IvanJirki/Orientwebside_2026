$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $root ".env"

if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*#' -or $_ -notmatch '\S') { return }
        $idx = $_.IndexOf("=")
        if ($idx -lt 1) { return }
        $key = $_.Substring(0, $idx).Trim()
        $val = $_.Substring($idx + 1).Trim()
        [Environment]::SetEnvironmentVariable($key, $val, "Process")
    }
}

Set-Location $root
npm run build
Write-Host "Valmis: $root\dist\"
