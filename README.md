## chrisnorwood.github.io

# Master tracks "dist" folder

## ALL SOURCE IN "source" branch

# Deploying dist to master:
```
git push origin `git subtree split --prefix dist master`:production --force
```