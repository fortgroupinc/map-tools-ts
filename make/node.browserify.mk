# ----------------------------------------------------------------------------------------------------------------------

BUILD_DIR   ?= build
SOURCE_DIR  ?= lib

BSF_FLAGS ?= --standalone 'mapTools' --debug
BSF_EXE   := ./node_modules/browserify/bin/cmd.js
BSF_DIR   := $(BUILD_DIR)

BSF_SRC   := build/yago/index.js
BSF_OUT   := dist/mapTools.js

# ----------------------------------------------------------------------------------------------------------------------
$(BSF_OUT): $(BSF_SRC)
	$(BSF_EXE) $(BSF_FLAGS) -o $@ -- $<

.PHONY: browser browser-clean

browser: $(BSF_OUT)

browser-clean:
ifneq (,$(wildcard $(BSF_OUT)))
	rm -f $(BSF_OUT)
endif