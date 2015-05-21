
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
TS_FLAGS      := --sourceMap --target ES5 --module commonjs --noEmitOnError

# ----------------------------------------------------------------------------------------------------------------------

include make/common.debug.mk
include make/common.help.mk
include make/node.typescript.mk
