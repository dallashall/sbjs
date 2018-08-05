FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /var/www/html
COPY ../www .
EXPOSE 80
EXPOSE 3000