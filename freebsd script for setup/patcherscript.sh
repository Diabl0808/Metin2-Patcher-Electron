#!/bin/sh

echo "Instalando Nginx..."
if pkg install -y nginx; then
    echo "Nginx instalado correctamente."

    echo "Creando carpeta del autoparche..."
    mkdir -p /usr/local/www/patch
    echo "Hola autoparche" > /usr/local/www/patch/test.txt
    chown -R www:www /usr/local/www
    chmod -R 755 /usr/local/www

    echo "Configurando Nginx..."

    PATCH_LOCATION="    location /patch/ {\n        alias /usr/local/www/patch/;\n        autoindex on;\n        try_files \$uri \$uri/ =404;\n    }"
    NGINX_CONF="/usr/local/etc/nginx/nginx.conf"

    FOUND_PATCH=$(grep "/patch/" "$NGINX_CONF")
    if [ -z "$FOUND_PATCH" ]; then
        awk -v block="$PATCH_LOCATION" '
            BEGIN { inserted=0 }
            /^\s*server\s*\{/ { print; next }
            /^\s*location\s+\// && inserted==0 {
                print block
                inserted=1
            }
            { print }
        ' "$NGINX_CONF" > "$NGINX_CONF.tmp" && mv "$NGINX_CONF.tmp" "$NGINX_CONF"
        echo "Bloque /patch/ insertado en nginx.conf"
    else
        echo "La configuración para /patch/ ya existe."
    fi

    echo "Habilitando e iniciando Nginx..."
    sysrc nginx_enable=YES
    service nginx restart

    echo "Servidor listo. Puedes acceder a:"
    echo "http://$(curl -4 -s ifconfig.me)/patch/test.txt"
else
    echo "Error: Falló la instalación de Nginx. Abortando."
    exit 1
fi

echo "Instalando Node.js..."
if pkg install -y node; then
    echo "Node.js instalado correctamente."

    ALIAS_NAME="genhash"
    ALIAS_COMMAND='(prev_dir="$PWD"; cd /usr/local/www/patch && node generate_hash_electron.js; cd "$prev_dir")'
    SHELL_CONFIG="$HOME/.profile"

    FOUND_ALIAS=$(grep "$ALIAS_NAME=" "$SHELL_CONFIG")
    if [ -z "$FOUND_ALIAS" ]; then
        echo "Añadiendo alias al archivo $SHELL_CONFIG..."
        echo "alias $ALIAS_NAME=\"$ALIAS_COMMAND\"" >> "$SHELL_CONFIG"
        echo "Alias añadido correctamente."
    else
        echo "El alias '$ALIAS_NAME' ya existe en $SHELL_CONFIG."
    fi

    echo "Recargando configuración del shell..."
    . "$SHELL_CONFIG"

    echo "Ya puedes usar el comando: $ALIAS_NAME"
else
    echo "Error: Falló la instalación de Node.js."
fi
