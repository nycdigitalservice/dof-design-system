#!/bin/sh
echo "$@" | emacs --batch -l ./tangle.el -f nyc/tangle-file
