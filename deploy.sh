#!/bin/bash
ng build --prod --aot --output-path="docs" --base-href="./"

git add --all
git add -u
git commit -m "Building last Commit FOR GH PAGES"
git push