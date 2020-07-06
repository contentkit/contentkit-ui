#!/usr/bin/bash

export TRAVIS_TOKEN=$(curl -H "X-Vault-Token: $VAULT_TOKEN" https://vault.k8s.menubar.io/v1/kv/data/travis | jq -r '.data.data.value')

curl -X POST \
  -H "Content-Type: application/json" \
  -H "Travis-API-Version: 3" \
  -H "Accept: application/json" \
  -H "Authorization: token $TRAVIS_TOKEN" \
  -d '{"request": {"branch": "master"}}' 'https://api.travis-ci.org/repo/contentkit%2Fcontentkit/requests'