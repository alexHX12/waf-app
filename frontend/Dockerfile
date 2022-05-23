FROM httpd
RUN apt-get update -y && apt-get upgrade -y

COPY ./waf-frontend/dist/waf-frontend /waf-frontend
COPY ./waf-frontend-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./waf-frontend-httpd-vhosts.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf