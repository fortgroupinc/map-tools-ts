
## Help targets
# ----------------------------------------------------------------------------------------------------------------------
.PHONY: help

help:
	@echo ""

help-targets:
	@make -rpn | sed -n -e '/^$/ { n ; /^[^ \/\.]*:/p }' | awk -F: '{print $1}' | sort | column
