FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
WORKDIR /var/www/html
COPY ./www .
EXPOSE 80
EXPOSE 3000