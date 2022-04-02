FROM owasp/modsecurity-crs:3.3.2-apache
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install nodejs npm -y

COPY ./waf-backend /waf-backend
COPY ./waf-httpd.conf /usr/local/apache2/conf/httpd.conf

CMD /waf-backend/waf-init.sh