PORT ?= 9234
HOST ?= 127.0.0.1

.PHONY: run
run:
	npm run dev -- --host $(HOST) --port $(PORT)
