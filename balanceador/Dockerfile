FROM nginx:alpine AS balanceador

COPY nginx.conf /etc/nginx/confi.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]