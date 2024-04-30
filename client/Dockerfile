
# # Base image
# FROM node:18-alpine AS build-stage

# # Work directory
# WORKDIR /app

# # Copy frontend dependencies 
# COPY /package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the code
# COPY . .

# # Build Vite App
# RUN npm run dev

# # Final stage: lightweight Nginx to serve files
# FROM nginx:alpine AS production-stage

# # Copy build output
# COPY --from=build-stage /app/dist /usr/share/nginx/html

FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]