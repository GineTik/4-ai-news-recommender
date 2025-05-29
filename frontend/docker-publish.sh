#!/bin/bash

# Build the Docker image
docker build -t ginetik/4-ai-news-recommender-frontend:latest \
  --build-arg DATABASE_URL=mysql://root:XuiamXPKOKmGxtqbnssEBIKaVgTWoAEc@shortline.proxy.rlwy.net:43546/railway \
  --build-arg OPEN_ROUTER_API_KEY=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 \
  ./

# Push the Docker image to Docker Hub
docker push ginetik/4-ai-news-recommender-frontend:latest
