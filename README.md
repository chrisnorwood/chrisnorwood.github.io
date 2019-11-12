# chrisnorwood.github.io / ( chrisnorwood.io )

## About

This website is currently a one-page static site. It is hosted on Github Pages. It is styled with SASS, uses Vue.js for the modals, and builds for deployment with Gulp.

## See Live
You can visit my personal website @ [https://chrisnorwood.io](https://chrisnorwood.io)

## Preview

![personal-site-800](https://user-images.githubusercontent.com/18252139/68713916-bc6e6f80-0553-11ea-95b9-46cf2ab4764b.png)

## Notes

- `master` tracks `/dist` folder, for github pages hosting
- source code can be modified in the `source` branch

## Gulp Tasks
```
## Live reloading development environment
~/chrisnorwood.github.io$ gulp

## Build for deployment
~/chrisnorwood.github.io$ gulp compile
```

## Deploying dist to master:
```console
~/chrisnorwood.github.io$ git push origin `git subtree split --prefix=dist/ source`:master --force
```