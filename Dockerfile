FROM owasp/modsecurity-crs:3.3.2-apache
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install nodejs npm -y

COPY ./waf-app /waf-app
COPY ./waf-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./waf-httpd-vhosts.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf

CMD /waf-app/waf-init.sh