cd /waf-backend
npm install

#Controllo esistenza di una configurazione aggiornata
if [ ! -e /vol/waf-custom.conf ]
then
    touch /vol/waf-custom.conf
fi

#Copia VHosts file
if [ ! -e /vol/waf-vhosts.conf ]
then
    cp /tmp/waf-vhosts-orig.conf /vol/waf-vhosts.conf
fi

if [ ! -d /vol/vhosts-custom-rules ]
then
    mkdir /vol/vhosts-custom-rules
fi

grep -oP '(?<=Use VHost ).*?(?=http)' /vol/waf-vhosts.conf | while read -r VHostName; do
    if [ ! -e /vol/vhosts-custom-rules/$VHostName ]
    then
        touch /vol/vhosts-custom-rules/$VHostName.conf
    fi
done

npm start &
apachectl -D FOREGROUND