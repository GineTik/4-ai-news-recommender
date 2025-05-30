#!/bin/bash

# Build the Docker image
docker build -t ginetik/4-ai-news-recommender-frontend:latest \
  --build-arg DATABASE_URL=mysql://root:XuiamXPKOKmGxtqbnssEBIKaVgTWoAEc@shortline.proxy.rlwy.net:43546/railway \
  --build-arg OPEN_ROUTER_API_KEY=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 \
  ./

# Push the Docker image to Docker Hub
docker push ginetik/4-ai-news-recommender-frontend:latest
