#!/bin/bash
set -e

echo "Deployment started #### "

echo "### Running test script"
npm run test

echo "Deployment finished!"