# Use nginx:alpine as the base image for a lightweight web server
FROM nginx:alpine

# Copy all static files to the nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
