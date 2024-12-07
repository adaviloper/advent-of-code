FROM node:latest

WORKDIR /app

RUN npm install -g @vue/cli

# Prefer not to run as root.
# USER deno

# These steps will be re-run upon each file change in your working directory:
# COPY . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.

# CMD ["deno", "run", "--watch", "index.ts"]
CMD ["npm", "run", "ui"]

