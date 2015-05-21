
# MAINTAINER:
# Peter Chanthamynavong <peterc@zephyrhealth.com>

# Check vars defined in main Makefile
# ----------------------------------------------------------------------------------------------------------------------

ifndef TS_FLAGS
$(error TS_FLAGS is undefined)
endif

# ----------------------------------------------------------------------------------------------------------------------

BUILD_DIR   ?= build
SOURCE_DIR  ?= lib

TS_EXE   := node_modules/typescript/bin/tsc
TS_SRC   := $(filter-out $(wildcard $(SOURCE_DIR)/*/*.d.ts plugins/*/*.d.ts), $(wildcard $(SOURCE_DIR)/*.ts $(SOURCE_DIR)/*/*.ts plugins/*.ts plugins/*/*.ts))
TS_DST   := $(patsubst $(SOURCE_DIR)/%.ts,$(BUILD_DIR)/%.js,$(TS_SRC))

HTML_SRC := $(wildcard $(SOURCE_DIR)/*.html $(SOURCE_DIR)/*/*.html)
HTML_DST := $(patsubst $(SOURCE_DIR)/%.html,$(BUILD_DIR)/%.html,$(HTML_SRC))

MAKE_FILES :=

# RULES: $@: $<

# ----------------------------------------------------------------------------------------------------------------------
# helper rules to makes sure that node_modules commands are installed

$(TS_EXE): node_modules

node_modules: package.json
	@$(NPM) install
	@touch node_modules


# ----------------------------------------------------------------------------------------------------------------------
$(BUILD_DIR):
	@mkdir -p $@

# compile .ts --> .js when the following rules are true
# 1. %.js does not exists
# 2. %.js is older than %.ts
$(BUILD_DIR)/%.js: $(SOURCE_DIR)/%.ts
	@printf '\e[1;32m %-10s\e[m %s > %s\n' 'compiling' '$<' '$@'
	@$(TS_EXE) $(TS_FLAGS) --out $@ $<

$(BUILD_DIR)/%.html: $(SOURCE_DIR)/%.html
	@printf '\e[1;32m %-10s\e[m %s > %s\n' 'copying' '$<' '$@'
	@cp -f $< $@

# ----------------------------------------------------------------------------------------------------------------------
.PHONY: ts ts-clean

# compile *.ts --> *.js
ts: Makefile $(BUILD_DIR) $(TS_EXE) $(TS_DST) $(HTML_DST)

ts-clean:
	@rm -f lib/*.js*
	@rm -rf build/**

