
# MAINTAINER: Gert Petja <gpetja@zephyrhealth.com>

# $@: $<

## prologue
# ----------------------------------------------------------------------------------------------------------------------
#

MAKEFLAGS += --warn-undefined-variables
MAKE  := /usr/bin/make

SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := help
.MAKEFLAGS := -j4
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

BUILD_DIR  := build
SOURCE_DIR := lib

TS_FLAGS   := --sourceMap --target ES5 --module commonjs

BSF_FLAGS  := --standalone mapTools --debug --verbose
BSF_DIR    := $(BUILD_DIR)/yago
BSF_SRC    := $(BUILD_DIR)/yago/index.js
BSF_OUT    := dist/mapTools.js

# include sub Makefiles
# ----------------------------------------------------------------------------------------------------------------------

include make/common.debug.mk
include make/common.help.mk

include make/node.typescript.mk
include make/node.browserify.mk
include make/node.html.mk

# app targets calling other targets in sub Makefile
# ----------------------------------------------------------------------------------------------------------------------
.PHONY: compile clean

clean: ts-clean browser-clean
	@printf '\e[1;32m  %-10s\e[m%s\n' 'done'

compile: ts browser html
	@printf '\e[1;32m  %-10s\e[m%s\n' 'done'
