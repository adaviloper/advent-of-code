FROM denoland/deno:2.0.0-rc.3

# The port that your application listens to.
EXPOSE 9001

WORKDIR /app

# Prefer not to run as root.
USER deno

# These steps will be re-run upon each file change in your working directory:
# COPY . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.

CMD ["deno", "run", "--watch", "index.js"]

