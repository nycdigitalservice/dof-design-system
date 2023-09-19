;;; publish.el --- Build NYC documentation site

;; Copyright (C) 2021, 2023 David Wilson <david@systemcrafters.net>
;; Copyright (C) 2023 Michael Mausler, City of New York <mmausler@oti.nyc.gov>

;; Version: 0.0.1
;; Package-Requires: ((emacs "28.2"))
;; Keywords: hypermedia, docs

;; This file is not part of GNU Emacs.

;; This file is based on David Wilson's publish.el, here's his
;; authorship details:

;; Author: David Wilson <david@systemcrafters.nnet>
;; Maintainer: David Wilson <david@systemcrafters.net>
;; URL: https://codeberg.org/SystemCrafters/systemcrafters.net

;; This program is free software; you can redistribute it and/or modify
;; it under the terms of the GNU General Docs License as published by
;; the Free Software Foundation, either version 3 of the License, or
;; (at your option) any later version.
;;
;; This program is distributed in the hope that it will be useful,
;; but WITHOUT ANY WARRANTY; without even the implied warranty of
;; MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
;; GNU General Docs License for more details.
;;
;; You should have received a copy of the GNU General Docs License
;; along with this program.  If not, see <http://www.gnu.org/licenses/>.

;;; Usage:
;; emacs -Q --batch -l ./publish.el --funcall nyc/publish

;;; Code:
;; Initialize package sources
(require 'package)

;; Set the package installation directory so that packages aren't stored in the
;; ~/.emacs.d/elpa path.
(setq pwd (file-name-directory (or load-file-name buffer-file-name)))
(setq package-user-dir (expand-file-name "./.packages" pwd))

(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/"))
(add-to-list 'package-archives '("stable" . "https://stable.melpa.org/packages/"))

(add-to-list 'load-path (expand-file-name "./site-lisp" pwd))

;; Initialize the package system
(package-initialize)
(unless package-archive-contents
  (package-refresh-contents))

;; Install use-package
(unless (package-installed-p 'use-package)
  (package-install 'use-package))
(require 'use-package)

;; Require built-in dependencies
(require 'vc-git)
(require 'ox-publish)
(require 'subr-x)
(require 'cl-lib)

(require 'nyc-publish)
(require 'ob-html)

;; Install other dependencies
(use-package esxml
  :pin "stable"
  :ensure t)

(use-package htmlize
  :ensure t)

(org-babel-do-load-languages 'org-babel-load-languages '((html . t)))

(org-export-get-all-transcoders 'site-html)

(org-export-define-derived-backend 'site-html 'html
  :translate-alist
  '((template . nyc/org-html-template)
    (link . nyc/org-html-link)
    (src-block . nyc/org-html-src-block)
    (special-block . nyc/org-html-special-block)
    (headline . nyc/org-html-headline)
    (section . nyc/org-html-section))
  :options-alist
  '((:video "VIDEO" nil nil)))

(defun org-html-publish-to-html (plist filename pub-dir)
  "Publish an org file to HTML, using the FILENAME as the output directory."
  ;; (let ((article-path (get-article-output-path filename pub-dir)))
  (let ((article-path pub-dir))
    (cl-letf (((symbol-function 'org-export-output-file-name)
               (lambda (extension &optional subtreep pub-dir)
                 ;; The 404 page is a special case, it must be named "404.html"
                 (concat article-path
                         (if
                             (string= (file-name-nondirectory filename) "404.org")
                             "404"
                           (if
                               (string= (file-name-nondirectory filename) "README.org")
                               "index" (file-name-sans-extension (file-name-nondirectory filename))))
                         extension))))
      (org-publish-org-to 'site-html
                          filename
                          (concat "." (or (plist-get plist :html-extension)
                                          "html"))
                          plist
                          article-path))))

(defun nyc/org-confirm-babel-evaluate (lang body)
  (not (string= lang "html")))  ;don't ask for html

(setq org-publish-use-timestamps-flag nil
      org-publish-timestamp-directory (expand-file-name "./.org-cache/" pwd)
      org-export-with-section-numbers nil
      org-export-use-babel t
      org-export-with-smart-quotes t
      org-export-with-sub-superscripts nil
      org-export-with-tags 'not-in-toc
      org-html-htmlize-output-type nil
      org-html-prefer-user-labels t
      org-html-link-home nyc/site-url
      org-html-link-use-abs-url t
      org-html-link-org-files-as-html t
      org-html-html5-fancy t
      org-html-self-link-headlines t
      org-export-with-toc nil
      org-confirm-babel-evaluate #'nyc/org-confirm-babel-evaluate
      make-backup-files nil)

(setq org-publish-project-alist
      (list `("packages"
              :base-directory ,(expand-file-name "../../packages" pwd)
              :base-extension "org"
              :recursive t
              :publishing-directory ,(expand-file-name "../../docs/packages" pwd)
              :publishing-function org-html-publish-to-html
              :with-title nil
              :with-timestamps nil)
            `("guides"
              :base-directory ,(expand-file-name "../../guides" pwd)
              :base-extension "org"
              :recursive t
              :publishing-directory ,(expand-file-name "../../docs/guides" pwd)
              :publishing-function org-html-publish-to-html
              :with-title nil
              :with-timestamps nil)
            `("dofdocs:index"
              :base-directory ,(expand-file-name "../../" pwd)
              :base-extension "org"
              :publishing-directory ,(expand-file-name "../../docs" pwd)
              :publishing-function org-html-publish-to-html
              :with-title nil
              :with-timestamps nil)
            `("dofdocs:assets"
              :base-directory ,(expand-file-name "../../dist" pwd)
              :base-extension "css\\|js\\|png\\|svg\\|jpg\\|gif\\|pdf\\|mp3\\|ogg\\|woff2\\|ttf"
              :publishing-directory ,(expand-file-name "../../docs/assets" pwd)
              :recursive t
              :publishing-function org-publish-attachment)
            `("dofdocs:core-js"
              :base-directory ,(expand-file-name "../../packages/core/dist" pwd)
              :base-extension "css\\|js\\|woff2\\|ttf"
              :publishing-directory ,(expand-file-name "../../docs/assets" pwd)
              :recursive t
              :publishing-function org-publish-attachment)
            ))

(defun nyc/publish ()
  "Publish the entire site."
  (interactive)
  (org-publish-all (string-equal (or (getenv "FORCE")
                                     (getenv "CI"))
                                 "true")))

(provide 'publish)
;;; publish.el ends here
