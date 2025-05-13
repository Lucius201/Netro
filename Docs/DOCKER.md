# Docker Setup für das Webprojekt

Dieses Projekt besteht aus drei Containern: **Frontend**, **Backend** und **Database**. In den jeweiligen Unterordnern sind bereits die notwendigen `Dockerfile`s vorhanden.

## Schritte zum Starten der Container

1. Navigiere im Terminal zurück in das Hauptverzeichnis des Projekts (`netro`):

   ```bash
   cd netro
    ```
2. Starte alle Container mit folgendem Befehl

    ```bash
   docker-compose up --build
    ```
   Dieser Befehl baut die Images und startet die Container gemäß der Konfiguration in der docker-compose.yml.
---
## Zugriff auf die Services

Frontend: erreichbar unter
http://localhost:3000 <br>
Backend: läuft auf
http://localhost:8080

## Optional: Docker Desktop

Du kannst auch die Docker Desktop App öffnen, um:
den Status der Container zu sehen
die zugewiesenen Ports zu prüfen
Logs und Ressourcennutzung einzusehen.