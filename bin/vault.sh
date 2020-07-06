#!/usr/bin/bash

curl -H "X-Vault-Token: $VAULT_TOKEN" \
  https://vault.k8s.menubar.io/v1/kv/data/npm | jq -r \
  '.data.data | "//registry.npmjs.org/:_authToken=\(.value)"' > .npmrc