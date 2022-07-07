FROM owasp/modsecurity-crs:3.3.2-apache
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install python3 pip curl -y
RUN pip3 install msc-pyparser>=1.2.0
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install nodejs -y

COPY ./waf-backend /waf-backend
COPY ./waf-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./waf-httpd-vhosts.conf /tmp/waf-vhosts-orig.conf
COPY ./fullchain.pem /usr/local/apache2/conf/fullchain.pem
COPY ./privkey.pem /usr/local/apache2/conf/privkey.pem

CMD /waf-backend/waf-init.sh