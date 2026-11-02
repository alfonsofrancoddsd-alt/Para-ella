#!/bin/bash
cd "$(dirname "$0")"
echo "Abriendo http://localhost:8000 (deja esta ventana abierta mientras la ves)"
(sleep 1; open "http://localhost:8000" 2>/dev/null || xdg-open "http://localhost:8000" 2>/dev/null) &
python3 -m http.server 8000
