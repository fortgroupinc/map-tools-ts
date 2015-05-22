# $@: $<

## prologue
# ----------------------------------------------------------------------------------------------------------------------
#

MAKEFLAGS += --warn-undefined-variables
MAKE  := /usr/bin/make

SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := help
.SUFFIXES:


## Always use GNU Make
# ----------------------------------------------------------------------------------------------------------------------
#
MAKE_VERSION := $(shell $(MAKE) --version)
ifneq ($(firstword $(MAKE_VERSION)),GNU)
$(error Use GNU Make)
endif

# ----------------------------------------------------------------------------------------------------------------------

CWD  := $(realpath $(dir $(lastword $(MAKEFILE_LIST))))
NODE ?= node
NPM  ?= npm

# Project specific vars
# ----------------------------------------------------------------------------------------------------------------------

BUILD_DIR     := build
SOURCE_DIR    := lib

# typescript
TS_FLAGS      := --sourceMap --target ES5

# include sub Makefiles
# ----------------------------------------------------------------------------------------------------------------------

include make/common.debug.mk
include make/common.help.mk

include make/node.typescript.mk
include make/node.browserify.mk
include make/node.html.mk

# app targets
# ----------------------------------------------------------------------------------------------------------------------
.PHONY: compile clean

clean: ts-clean browser-clean
	@printf '\e[1;32m  %-10s\e[m%s\n' 'done'

compile: SOURCE_DIR = lib
compile: TS_FLAGS   = '--sourceMap --target ES5 --module commonjs'
compile: BSF_FLAGS  = '--standalone mapTools --debug'
compile: BSF_DIR    = $(BUILD_DIR)/
compile: BSF_SRC    = $(BUILD_DIR)/index.js
compile:
	@$(MAKE) ts TS_FLAGS=$(TS_FLAGS) BUILD_DIR=$(BUILD_DIR) SOURCE_DIR=$(SOURCE_DIR)
	@$(MAKE) browser BSF_FLAGS=$(BSF_FLAGS) BSF_DIR=$(BSF_DIR) BSF_OUT=$(BSF_OUT) BSF_SRC=$(BSF_SRC)
	@$(MAKE) html SOURCE_DIR=$(SOURCE_DIR)
	@printf '\e[1;32m  %-10s\e[m%s\n' 'done'
