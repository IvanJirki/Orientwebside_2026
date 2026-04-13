# Yhdistää työtilan juuren `orient-web`-nimen tähän projektiin (Windows junction).
# 1) Sulje Cursor/VS Code ja terminaalit, jotka käyttävät vanhaa orient-web-kansiota.
# 2) Poista käsin tyhjä tai vanha kansio: ...\Orient_Nettisivut\orient-web
# 3) Aja tämä skripti PowerShellistä:  .\scripts\link-orient-web-junction.ps1

$ErrorActionPreference = "Stop"
# scripts/ -> Orientwebside_2026 -> työtilan juuri (Orient_Nettisivut)
$projectRoot = Split-Path $PSScriptRoot -Parent
$repoRoot = Split-Path $projectRoot -Parent
$linkPath = Join-Path $repoRoot "orient-web"

if (-not (Test-Path $projectRoot)) {
    Write-Error "Project root not found: $projectRoot"
}

if (Test-Path $linkPath) {
    Write-Host "Poista ensin kansio tai junction: $linkPath" -ForegroundColor Yellow
    exit 1
}

cmd /c mklink /J "$linkPath" "$projectRoot"
if ($LASTEXITCODE -ne 0) {
    Write-Error "mklink epäonnistui (tarvitaan usein järjestelmänvalvojan oikeudet tai Kehittäjätila Windowsissa)."
}
Write-Host "OK: orient-web -> $projectRoot" -ForegroundColor Green
