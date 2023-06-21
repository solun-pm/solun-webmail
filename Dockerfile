FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

ENV MONGODB_URL=
ENV JWT_SECRET_KEY=
ENV MAILSERVER_BASEURL=
ENV MAILSERVER_API_KEY=
ENV NEXT_PUBLIC_MAIN_DOMAIN=
ENV NEXT_PUBLIC_API_DOMAIN=
ENV NEXT_PUBLIC_AUTH_DOMAIN=
ENV NEXT_PUBLIC_AUTH_DOMAIN_SETTINGS=
ENV NEXT_PUBLIC_WEBMAIL_DOMAIN=
ENV NEXT_PUBLIC_MAIL_HOST=
ENV NEXT_PUBLIC_IMAP_PORT=
ENV NEXT_PUBLIC_SMTP_PORT=

CMD npm run build && npm run start