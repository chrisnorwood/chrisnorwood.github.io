# chrisnorwood.github.io / ( chrisnorwood.io )

- master tracks /dist folder, for github pages hosting
- source code can be modified in the `source` branch

## Deploying dist to master:
```
git push origin `git subtree split --prefix=dist/ source`:master --force
```