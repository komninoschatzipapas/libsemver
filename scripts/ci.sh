#!/bin/bash
set -e
npm run lint
npm run test-cover
codecov --token=1d135290-d059-4b19-8a50-02ff8df21d99
