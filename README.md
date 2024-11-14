# devcontainer

## How to build locally
```
docker build docker/ros-noetic -t ghcr.io/garaemon/ros-noetic:latest
docker build docker/ubuntu-focal -t ghcr.io/garaemon/ubuntu-focal:latest
docker build docker/ubuntu-noble -t ghcr.io/garaemon/ubuntu-noble:latest
```
## First time you make an image

1. Build it locally
2. Push it to ghcr.io
3. Connect the image and the repository on github.com
4. Make it public by changing package visibility on github.com from Package settings
