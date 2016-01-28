#!/bin/bash

if [[ "$TRAVIS_TAG" == "v"* ]]; then
    # Build only if there's a tag that starts with a v'
    echo "Publishing using VSCE"
    npm install -g vsce
    vsce publish <<< $TOBIAH_KEY
else
    echo "This build has the following tag:"
    echo $TRAVIS_TAG
    echo "Which is not a version, so will not deploy"
fi