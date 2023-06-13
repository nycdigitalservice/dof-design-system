;;; build.el --- Build script for tangling           -*- lexical-binding: t; -*-

;; Copyright (C) 2023  Michael Mausler

;; Author: Michael Mausler <michaelmausler@Michaels-MacBook-Air.local>
;; Keywords: tools, docs

;; This program is free software; you can redistribute it and/or modify
;; it under the terms of the GNU General Public License as published by
;; the Free Software Foundation, either version 3 of the License, or
;; (at your option) any later version.

;; This program is distributed in the hope that it will be useful,
;; but WITHOUT ANY WARRANTY; without even the implied warranty of
;; MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
;; GNU General Public License for more details.

;; You should have received a copy of the GNU General Public License
;; along with this program.  If not, see <https://www.gnu.org/licenses/>.

;;; Commentary:

;; 

;;; Code:
(setq package-user-dir (expand-file-name "./.emacs-packages"))
(setq package-archives '(("melpa" . "https://melpa.org/packages/")
                         ("elpa" . "https://elpa.gnu.org/packages/")))

(require 'org)
(require 'ob-tangle)
(require 'ox-slimhtml)

(with-current-buffer (find-file-noselect "card.org")
  (org-babel-tangle))

(provide 'build)
;;; build.el ends here
