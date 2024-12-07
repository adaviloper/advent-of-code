FROM nickblah/lua:latest

WORKDIR /app

# Prefer not to run as root.
# USER deno

# These steps will be re-run upon each file change in your working directory:
# COPY . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.

# CMD ["deno", "run", "--watch", "index.ts"]
CMD ["lua", "-e", "while true do end"]

