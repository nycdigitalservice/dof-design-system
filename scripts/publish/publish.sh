#!/bin/bash

/opt/homebrew/bin/emacs -Q --batch -l ./publish.el --funcall nyc/publish
