# ============================================================
# DEPARTMENT LIBRARY CHATBOT
# Dockerfile
# PHP 8.2 + Apache
# ============================================================

FROM php:8.2-apache

# ============================================================
# 1. ENVIRONMENT
# ============================================================

ENV DEBIAN_FRONTEND=noninteractive

ENV APACHE_DOCUMENT_ROOT=/var/www/html

ENV TZ=Asia/Kolkata

# ============================================================
# 2. SYSTEM PACKAGES
# ============================================================

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl \
        unzip \
        git \
        libzip-dev \
        libpng-dev \
        libjpeg62-turbo-dev \
        libfreetype6-dev \
        libonig-dev \
        libxml2-dev \
        libicu-dev \
        libssl-dev \
        default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# ============================================================
# 3. PHP EXTENSIONS
# ============================================================

RUN docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" \
        mysqli \
        pdo \
        pdo_mysql \
        mbstring \
        zip \
        gd \
        intl \
        opcache

# ============================================================
# 4. VERIFY PHP EXTENSIONS
# ============================================================

RUN php -m | grep -i mysqli \
    && php -m | grep -i pdo_mysql \
    && php -m | grep -i mbstring \
    && php -m | grep -i zip \
    && php -m | grep -i gd \
    && php -m | grep -i intl

# ============================================================
# 5. ENABLE APACHE MODULES
# ============================================================

RUN a2enmod rewrite \
    && a2enmod headers \
    && a2enmod expires \
    && a2enmod deflate \
    && a2enmod ssl

# ============================================================
# 6. APACHE DOCUMENT ROOT
# ============================================================

RUN sed -ri \
    -e "s!/var/www/html!${APACHE_DOCUMENT_ROOT}!g" \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf

# ============================================================
# 7. APACHE DIRECTORY CONFIGURATION
# ============================================================

RUN printf '%s\n' \
'<Directory /var/www/html>' \
'    Options -Indexes +FollowSymLinks' \
'    AllowOverride All' \
'    Require all granted' \
'</Directory>' \
> /etc/apache2/conf-available/library-chatbot.conf

RUN a2enconf library-chatbot

# ============================================================
# 8. SECURITY HEADERS
# ============================================================

RUN printf '%s\n' \
'<IfModule mod_headers.c>' \
'    Header always set X-Content-Type-Options "nosniff"' \
'    Header always set X-Frame-Options "SAMEORIGIN"' \
'    Header always set Referrer-Policy "strict-origin-when-cross-origin"' \
'    Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"' \
'</IfModule>' \
> /etc/apache2/conf-available/security-headers.conf

RUN a2enconf security-headers

# ============================================================
# 9. COMPRESSION
# ============================================================

RUN printf '%s\n' \
'<IfModule mod_deflate.c>' \
'    AddOutputFilterByType DEFLATE text/plain' \
'    AddOutputFilterByType DEFLATE text/html' \
'    AddOutputFilterByType DEFLATE text/xml' \
'    AddOutputFilterByType DEFLATE text/css' \
'    AddOutputFilterByType DEFLATE application/xml' \
'    AddOutputFilterByType DEFLATE application/xhtml+xml' \
'    AddOutputFilterByType DEFLATE application/rss+xml' \
'    AddOutputFilterByType DEFLATE application/javascript' \
'    AddOutputFilterByType DEFLATE application/json' \
'</IfModule>' \
> /etc/apache2/conf-available/compression.conf

RUN a2enconf compression

# ============================================================
# 10. CACHE CONTROL
# ============================================================

RUN printf '%s\n' \
'<IfModule mod_expires.c>' \
'    ExpiresActive On' \
'    ExpiresByType text/css "access plus 7 days"' \
'    ExpiresByType application/javascript "access plus 7 days"' \
'    ExpiresByType image/jpeg "access plus 30 days"' \
'    ExpiresByType image/png "access plus 30 days"' \
'    ExpiresByType image/gif "access plus 30 days"' \
'    ExpiresByType image/webp "access plus 30 days"' \
'    ExpiresByType image/svg+xml "access plus 30 days"' \
'    ExpiresByType font/woff "access plus 30 days"' \
'    ExpiresByType font/woff2 "access plus 30 days"' \
'</IfModule>' \
> /etc/apache2/conf-available/cache.conf

RUN a2enconf cache

# ============================================================
# 11. PHP CONFIGURATION
# ============================================================

RUN { \
        echo 'memory_limit=256M'; \
        echo 'upload_max_filesize=32M'; \
        echo 'post_max_size=32M'; \
        echo 'max_execution_time=120'; \
        echo 'max_input_time=120'; \
        echo 'max_input_vars=5000'; \
        echo 'display_errors=Off'; \
        echo 'log_errors=On'; \
        echo 'error_log=/proc/self/fd/2'; \
        echo 'date.timezone=Asia/Kolkata'; \
    } > /usr/local/etc/php/conf.d/library-chatbot.ini

# ============================================================
# 12. PHP OPCACHE
# ============================================================

RUN { \
        echo 'opcache.enable=1'; \
        echo 'opcache.enable_cli=1'; \
        echo 'opcache.memory_consumption=128'; \
        echo 'opcache.interned_strings_buffer=16'; \
        echo 'opcache.max_accelerated_files=10000'; \
        echo 'opcache.revalidate_freq=2'; \
        echo 'opcache.validate_timestamps=1'; \
        echo 'opcache.save_comments=1'; \
    } > /usr/local/etc/php/conf.d/opcache.ini

# ============================================================
# 13. CREATE APPLICATION DIRECTORIES
# ============================================================

RUN mkdir -p \
    /var/www/html \
    /var/www/html/uploads \
    /var/www/html/uploads/books \
    /var/www/html/uploads/students \
    /var/www/html/uploads/documents \
    /var/www/html/storage \
    /var/www/html/storage/logs

# ============================================================
# 14. COPY PROJECT
# ============================================================

COPY . /var/www/html/

# ============================================================
# 15. FILE PERMISSIONS
# ============================================================

RUN chown -R www-data:www-data /var/www/html \
    && find /var/www/html -type d -exec chmod 755 {} \; \
    && find /var/www/html -type f -exec chmod 644 {} \;

# ============================================================
# 16. WRITE PERMISSIONS FOR UPLOAD DIRECTORIES
# ============================================================

RUN chmod -R 775 \
    /var/www/html/uploads \
    /var/www/html/storage

# ============================================================
# 17. PROTECT IMPORTANT FILES
# ============================================================

RUN printf '%s\n' \
'<FilesMatch "^(\.env|\.git|composer\.json|composer\.lock|Dockerfile|docker-compose\.yml|docker-compose\.yaml)$">' \
'    Require all denied' \
'</FilesMatch>' \
> /etc/apache2/conf-available/protected-files.conf

RUN a2enconf protected-files

# ============================================================
# 18. BLOCK DIRECTORY LISTING
# ============================================================

RUN printf '%s\n' \
'Options -Indexes' \
> /var/www/html/.htaccess

# ============================================================
# 19. DEFAULT INDEX FILES
# ============================================================

RUN printf '%s\n' \
'DirectoryIndex index.php index.html index.htm' \
> /etc/apache2/conf-available/library-index.conf

RUN a2enconf library-index

# ============================================================
# 20. HEALTH CHECK PAGE
# ============================================================

RUN printf '%s\n' \
'<?php' \
'http_response_code(200);' \
'header("Content-Type: text/plain");' \
'echo "Department Library Chatbot OK";' \
'?>' \
> /var/www/html/health.php

# ============================================================
# 21. APACHE CONFIGURATION TEST
# ============================================================

RUN apache2ctl configtest

# ============================================================
# 22. PHP CONFIGURATION TEST
# ============================================================

RUN php -v \
    && php -m

# ============================================================
# 23. PORT
# ============================================================

EXPOSE 80

# ============================================================
# 24. HEALTH CHECK
# ============================================================

HEALTHCHECK \
    --interval=30s \
    --timeout=10s \
    --start-period=30s \
    --retries=3 \
    CMD curl -f http://localhost/health.php || exit 1

# ============================================================
# 25. START APACHE
# ============================================================

CMD ["apache2-foreground"]
# ============================================================
# GIT
# ============================================================

.git
.gitignore
.gitattributes
.github

# ============================================================
# IDE
# ============================================================

.vscode
.idea

# ============================================================
# DEPENDENCIES
# ============================================================

node_modules
vendor

# ============================================================
# ENVIRONMENT / SECRETS
# ============================================================

.env
.env.*
*.key
*.pem

# ============================================================
# LOGS
# ============================================================

*.log
logs
storage/logs

# ============================================================
# OS FILES
# ============================================================

.DS_Store
Thumbs.db
desktop.ini

# ============================================================
# DOCKER
# ============================================================

Dockerfile
docker-compose.yml
docker-compose.yaml

# ============================================================
# BACKUPS
# ============================================================

*.bak
*.backup
*.tmp
*.old

# ============================================================
# DATABASE DUMPS
# ============================================================

*.sql.gz
*.dump

# ============================================================
# DOCUMENTATION
# ============================================================

README.md
DEPLOYMENT.md
