# MAINTAINER:
# Peter Chanthamynavong <peterc@zephyrhealth.com>
# Gert Petja <gpetja@zephyrhealth.com>

# ----------------------------------------------------------------------------------------------------------------------

BUILD_DIR   ?= build
SOURCE_DIR  ?= lib

HTML_SRC := $(wildcard $(SOURCE_DIR)/*.html $(SOURCE_DIR)/*/*.html)
HTML_DST := $(patsubst $(SOURCE_DIR)/%.html,$(BUILD_DIR)/%.html,$(HTML_SRC))

# ----------------------------------------------------------------------------------------------------------------------
.PHONY: html

$(BUILD_DIR)/%.html: $(SOURCE_DIR)/%.html
	@printf '\e[1;32m %-10s\e[m %s > %s\n' 'copying' '$<' '$@'
	@cp -f $< $@

html: $(HTML_DST)

