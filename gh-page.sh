#!/bin/bash
 
git add --all
git add -u
git commit -m "Build FOR GH PAGES"
ng build --prod --aot --output-path="docs" --base-href="./"

git push --force