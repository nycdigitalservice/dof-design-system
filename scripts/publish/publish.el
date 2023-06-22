;;; publish.el --- Build NYC documentation site

;; Copyright (C) 2021, 2023 David Wilson <david@systemcrafters.net>
;; Copyright (C) 2023 Michael Mausler <mmausler@oti.nyc.gov>

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
(setq package-user-dir (expand-file-name "./.packages"))

(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/"))
(add-to-list 'package-archives '("melpa-stable" . "https://stable.melpa.org/packages/"))

(add-to-list 'load-path (file-name-directory (or load-file-name buffer-file-name)))

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

;; (load-file "./ob-html.el")
(require 'ob-html)

;; Install other dependencies
(use-package esxml
  :pin "melpa-stable"
  :ensure t)

(use-package htmlize
  :ensure t)

(org-babel-do-load-languages 'org-babel-load-languages '((html . t)))

(defvar nyc/site-url (if (string-equal (getenv "CI") "true")
                         "https://nycdigitalservice.github.io/dof-ds"
                       "http://localhost:8000")
  "The URL for the site being generated.")


(defun nyc/site-header ()
  (list `(header (@ (class "site-header region flow background-primary"))
                 (div (@ (class "container"))
                      (div (@ (class "site-title"))
                           (img (@ (class "logo")
                                   (width "150")
                                   (src ,(concat "/assets/img/nyc-dof-logo.svg"))
                                   (alt "NYC Department of Finance")))))
                 (div (@ (class "site-masthead"))
                      (div (@ (class "container"))
                           (nav (@ (class "nav"))
                                (a (@ (class "nav-link") (href "/")) "Home") " "
                                ))))))

(defun nyc/site-footer ()
  (list `(footer (@ (class "site-footer"))
                 (div (@ (class "container"))
                      (div (@ (class "row"))
                           (div (@ (class "column"))
                                (p "© 2023 City of New York")))))))

(defun get-article-output-path (org-file pub-dir)
  (let ((article-dir (concat pub-dir
                             (downcase
                              (file-name-as-directory
                               (file-name-sans-extension
                                (file-name-nondirectory org-file)))))))

    (if (string-match "\\/index.org\\|\\/404.org$" org-file)
        pub-dir
      (progn
        (unless (file-directory-p article-dir)
          (make-directory article-dir t))
        article-dir))))


(defun nyc/get-commit-hash ()
  "Get the short hash of the latest commit in the current repository."
  (string-trim-right
   (with-output-to-string
     (with-current-buffer standard-output
       (vc-git-command t nil nil "rev-parse" "--short" "HEAD")))))

(cl-defun nyc/generate-page (title
                             content
                             info
                             &key
                             (publish-date)
                             (head-extra)
                             (pre-content)
                             (exclude-header)
                             (exclude-footer))
  (concat
   "<!-- Generated from " (nyc/get-commit-hash)  " on " (format-time-string "%Y-%m-%d @ %H:%M") " with " org-export-creator-string " -->\n"
   "<!DOCTYPE html>"
   (sxml-to-xml
    `(html (@ (lang "en"))
           (head
            (meta (@ (charset "utf-8")))
            (meta (@ (author "Michael Mausler - NYC")))
            (meta (@ (name "viewport")
                     (content "width=device-width, initial-scale=1, shrink-to-fit=no")))
            (link (@ (rel "icon") (type "image/png") (href "/img/favicon.png")))
            (link (@ (rel "stylesheet") (href ,(concat  "/assets/dof-2023-styles.css"))))
            (link (@ (rel "stylesheet") (href ,(concat  "/assets/dof-2023-docs.css"))))
            (link (@ (rel "stylesheet") (href "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/nord.min.css")))
            (script (@ (src "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js")) "")
            (link (@ (rel "stylesheet") (href "https://unpkg.com/highlightjs-copy/dist/highlightjs-copy.min.css")))
            (script (@ (src "https://unpkg.com/highlightjs-copy/dist/highlightjs-copy.min.js")) "")

            (script (@) "hljs.highlightAll();hljs.addPlugin(new CopyButtonPlugin());")
            ,(when head-extra head-extra)
            (title ,(concat title " - NYC")))
           (body (@ (class "u-reset")) ,@(unless exclude-header
                                           (nyc/site-header))
                 (div (@ (class "container"))
                      (div (@ (class "s region"))
                           (h1 (@ (class "site-post-title"))
                               ,title)
                           ,(when publish-date
                              `(p (@ (class "site-post-meta")) ,publish-date))
                           ,(if-let ((video-id (plist-get info :video)))
                                (nyc/embed-video video-id))
                           ,(when pre-content pre-content)
                           (div (@ (id "content") (class "flow"))
                                ,content)))
                 ,@(unless exclude-footer
                     (nyc/site-footer)))))))

(defun nyc/org-html-template (contents info)
  (nyc/generate-page (org-export-data (plist-get info :title) info)
                     contents
                     info
                     :publish-date (org-export-data (org-export-get-date info "%B %e, %Y") info)))

;; TODO - point to directory for non-index.org links
(defun nyc/org-html-link (link contents info)
  "Removes file extension and changes the path into lowercase file:// links."
  (when (and (string= 'file (org-element-property :type link))
             (string= "org" (file-name-extension (org-element-property :path link))))
    (org-element-put-property link :path
                              (downcase
                               (concat
                                (file-name-directory (org-element-property :path link))
                                "index.org"
                                ))))

  (let ((exported-link (org-export-custom-protocol-maybe link contents 'html info)))
    (cond
     (exported-link exported-link)
     ((equal contents nil)
      (format "<a href=\"%s\">%s</a>"
              (org-element-property :raw-link link)
              (org-element-property :raw-link link)))
     ((string-prefix-p "/" (org-element-property :raw-link link))
      (format "<a href=\"%s\">%s</a>"
              (org-element-property :raw-link link)
              contents))
     (t (org-export-with-backend 'html link contents info)))))

(defun nyc/make-heading-anchor-name (headline-text)
  (thread-last headline-text
               (downcase)
               (replace-regexp-in-string " " "-")
               (replace-regexp-in-string "[^[:alnum:]_-]" "")))

;; TODO - only set achor on level 2
(defun nyc/org-html-headline (headline contents info)
  (let* ((text (org-export-data (org-element-property :title headline) info))
         (level (org-export-get-relative-level headline info))
         ;; (level (min 7 (when level (1+ level))))
         (anchor-name (nyc/make-heading-anchor-name text))
         (attributes (org-element-property :ATTR_HTML headline))
         ;; Wrap level 2s in section tags unless theres a property
         (container (or (org-element-property :HTML_CONTAINER headline) (when (equal level 2) "section")))
         ;; (container (cond ((not (string= "" container)) container)
         ;;                  ((equal level 2) "section")))
         ;; (container (if (not (string= "" container)) container (when (equal level 2) "section")))
         (container-class (and container (or (org-element-property :HTML_CONTAINER_CLASS headline) (when (equal level 2) "region flow")))))
    (when attributes
      (setq attributes
            (format " %s" (org-html--make-attribute-string
                           (org-export-read-attribute 'attr_html `(nil
                                                                   (attr_html ,(split-string attributes))))))))
    (concat
     (when (and container (not (string= "" container)))
       (format "<%s%s>" container (if container-class (format " class=\"%s\"" container-class) "")))
     (format "<h%d%s><a id=\"%s\" class=\"anchor\" href=\"#%s\"><i class=\"i-ri:anchor-line\"></i></a>%s</h%d>%s"
             level
             (or attributes "")
             anchor-name
             anchor-name
             text
             level
             (or contents ""))
     (when (and container (not (string= "" container)))
       (format "</%s>" (cl-subseq container 0 (cl-search " " container)))))))

(defun nyc/org-html-src-block (src-block _contents info)
  (let* ((lang (org-element-property :language src-block))
         (value (org-element-property :value src-block))
	 (code (org-html-format-code src-block info)))
    (format
     (concat "<details>"
             "<summary>Inspect code</summary>"
             "<pre><code class=\"language-%s\">%s</code></pre>"
             "</details>")
     lang
     (string-trim (if (string= lang "html") code value)))))

(defun nyc/org-html-special-block (special-block contents info)
  "Transcode a SPECIAL-BLOCK element from Org to HTML.
CONTENTS holds the contents of the block.  INFO is a plist
holding contextual information."
  (let* ((block-type (org-element-property :type special-block))
         (attributes (org-export-read-attribute :attr_html special-block)))
    (format "<div class=\"%s center\">\n%s\n</div>"
            block-type
            (or contents
                (if (string= block-type "cta")
                    "If you find this guide helpful, please consider supporting System Crafters via the links on the <a href=\"/how-to-help/#support-my-work\">How to Help</a> page!"
                  "")))))

(org-export-get-all-transcoders 'site-html)

(org-export-define-derived-backend 'site-html 'html
  :translate-alist
  '((template . nyc/org-html-template)
    (link . nyc/org-html-link)
    (src-block . nyc/org-html-src-block)
    (special-block . nyc/org-html-special-block)
    (headline . nyc/org-html-headline))
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
                         (if (string= (file-name-nondirectory filename) "404.org") "404" "index")
                         extension))))
      (org-publish-org-to 'site-html
                          filename
                          (concat "." (or (plist-get plist :html-extension)
                                          "html"))
                          plist
                          article-path))))

(defun my-org-confirm-babel-evaluate (lang body)
  (not (string= lang "html")))  ;don't ask for html

(setq org-publish-use-timestamps-flag nil
      org-publish-timestamp-directory "./.org-cache/"
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
      org-confirm-babel-evaluate #'my-org-confirm-babel-evaluate
      make-backup-files nil)

(setq org-publish-project-alist
      (list '("dofdocs:packages"
              :base-directory "../../packages"
              :base-extension "org"
              :recursive t
              :publishing-directory "../../docs/packages"
              :publishing-function org-html-publish-to-html
              :with-title nil
              ;; :exclude "docs\\|scripts\\|src\\|dist\\|node_modules"
              :with-timestamps nil)
            '("dofdocs:index"
              :base-directory "../../"
              :base-extension "org"
              :publishing-directory "../../docs"
              :publishing-function org-html-publish-to-html
              :with-title nil
              :with-timestamps nil)
            '("dofdocs:assets"
              :base-directory "../dist"
              :base-extension "css\\|js\\|png\\|svg\\|jpg\\|gif\\|pdf\\|mp3\\|ogg\\|woff2\\|ttf"
              :publishing-directory "../../docs/assets"
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
