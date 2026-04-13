@echo off
REM Sulje ensin Cursor / VS Code ja kaikki terminaalit, jotka ovat orient-web-kansiossa.
REM Aja tämä tuplaklikkaamalla tai cmd:stä järjestelmänvalvojana jos tavallinen poisto epäonnistuu.

set "ROOT=%~dp0..\.."
set "A=%ROOT%\orient-web"
set "B=%ROOT%\Orientwebside_2026\orient-web"

if exist "%A%" (
  rmdir /s /q "%A%" 2>nul
  if exist "%A%" echo Epäonnistui: %A% ^(sulje IDE ja yrita uudelleen^)
  else echo Poistettu: %A%
) else echo Ei löytynyt: %A%

if exist "%B%" (
  rmdir /s /q "%B%" 2>nul
  if exist "%B%" echo Epäonnistui: %B%
  else echo Poistettu: %B%
) else echo Ei löytynyt: %B%

pause
