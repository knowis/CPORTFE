#!/usr/bin/env bash
echo "using a local start script"

node node_modules/@quasar/cli/bin/quasar-serve -p 8443 --history --https --cert /etc/knowis/security/servicecert/tls.crt --key /etc/knowis/security/servicecert/tls.key dist/spa
