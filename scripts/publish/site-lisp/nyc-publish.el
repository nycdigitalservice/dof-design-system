;;; nyc-publish.el --- Org publishing functions      -*- lexical-binding: t; -*-

;; Copyright (C) 2023  Michael Mausler

;; Author: Michael Mausler <michaelmausler@Michaels-MacBook-Air.local>
;; Keywords: lisp

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
(defvar nyc/site-url (if (string-equal (getenv "CI") "true")
                         "https://nycdigitalservice.github.io/dof-design-system"
                       "http://localhost:8000")
  "The URL for the site being generated.")

(defun nyc/site-header ()
  (list `(header (@ (class "background-primary"))
                 (nav (@ (class "p-2 flex"))
                      (a (@ (href "/") (class "mr-auto flex"))
                         (img (@ (class "logo")
                                 (height "50")
                                 (src ,(concat nyc/site-url "/assets/img/nyc-dof-logo.svg"))
                                 (alt "NYC Department of Finance"))))
                      (button (@ (is "toggle-button")
                                 (id "main-menu-control")
                                 (class "font-bold p-2")
                                 (aria-controls "main-menu")
                                 (aria-expanded "false"))
                              (i (@ (class "i-ri:menu-line mr-2")) "")
                              "Menu")))))

(defun nyc/link-list (list)
  (let ((result ()) (reversed ()))
    (dolist (el list reversed)
      (setq reversed (cons `(a (@ (class "p-2") (href ,(concat nyc/site-url (car el)))) ,(cdr el)) reversed)))
    (dolist (el reversed result)
      (setq result (cons el result)))))

(setq main-nav (list '("/" . "Home")
                     '("/packages/" . "Packages")
                     '("/packages/components/" . "Components")))

(setq package-nav (list '("/packages/reset/" . "Reset")
                        '("/packages/variables/" . "Variables")
                        '("/packages/global/" . "Global")
                        '("/packages/composition/" . "Composition")))

(setq component-nav (list '("/packages/components/accordion/" . "Accordion")
                          '("/packages/components/alert/" . "Alert")
                          '("/packages/components/button/" . "Button")
                          '("/packages/components/card/" . "Card")
                          '("/packages/components/tooltip/" . "Tooltip")))

(setq guide-nav (list '("/guides/navigation-page.html" . "Building a Navigation Page")
                      '("/guides/icons.html" . "Using Icons")))

(defun nyc/main-menu-nav (title links)
  (let ((link-list (nyc/link-list links)))
    (list `(nav (@ (class "flex flex-col"))
                (span (@ (class "p-2 border-b-2 border-current border-solid")) ,title)
                ,@link-list))))

(defun nyc/main-menu ()
  (list `(aside (@ (id "main-menu")
                   (class "background-primary-lightest")                   
                   (aria-labelledby "main-menu-control")
                   (hidden ""))
                (div (@ (class "container grid p-4"))
                     ,@(nyc/main-menu-nav "Packages" package-nav)
                     ,@(nyc/main-menu-nav "Components" component-nav)
                     ,@(nyc/main-menu-nav "Guides" guide-nav)))))

;; FIX list here
(defun nyc/site-footer ()
  (list '(footer (@ (class "site-footer"))
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
            (link (@ (rel "stylesheet") (href ,(concat nyc/site-url "/assets/dof-2023-styles.css"))))
            (link (@ (rel "stylesheet") (href "https://unpkg.com/highlightjs-copy/dist/highlightjs-copy.min.css")))
            (link (@ (rel "stylesheet") (href ,(concat nyc/site-url "/assets/dof-2023-docs.css"))))
            ;;(link (@ (rel "stylesheet") (href "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/nord.min.css")))


            ,(when head-extra head-extra)
            (title ,(concat title " - NYC")))
           (body (@ (class "u-reset"))
                 ,@(unless exclude-header
                     (nyc/site-header))
                 ,@(nyc/main-menu)
                 (main (@ (class "container"))
                       (div (@ (class "region flow"))
                            (h1 (@ (class "site-post-title"))
                                ,title)
                            ,(when pre-content pre-content)
                            (div (@ (id "content") (class "flow"))
                                 ,content)))
                 ,@(unless exclude-footer
                     (nyc/site-footer))
                 (script (@ (src "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js")) "")

                 (script (@ (src ,(concat nyc/site-url "/assets/main.js"))) "")
                 (script (@ (src "https://unpkg.com/highlightjs-copy@1.0.3/dist/highlightjs-copy.min.js")) "")

                 (script (@) "try{hljs.highlightAll();hljs.addPlugin(new CopyButtonPlugin());} catch(e) {}"))))))

(defun nyc/org-html-template (contents info)
  (nyc/generate-page (org-export-data (plist-get info :title) info)
                     contents
                     info
                     :publish-date (org-export-data (org-export-get-date info "%B %e, %Y") info)))

;; TODO - point to directory for non-index.org links
(defun nyc/org-html-link (link contents info)
  "Removes file extension and changes the path into lowercase file:// links."
  (let* ((path (org-element-property :path link))
         (dir (file-name-directory path))
         (filename (file-name-nondirectory path)))
    (when (and (string= 'file (org-element-property :type link))
               (string= "org" (file-name-extension path)))
      ;;(message filename)
      (org-element-put-property link :path
                                (downcase
                                 (concat
                                  (if dir dir "./")
                                  (if (string= "README.org" filename) "index.org" filename)
                                  )))))

  (let ((exported-link (org-export-custom-protocol-maybe link contents 'html info))
        (raw-link (org-element-property :raw-link link)))
    ;;(message raw-link)
    (cond
     (exported-link exported-link)
     ((equal contents nil)
      (format "<a href=\"%s\">%s</a>"
              raw-link
              raw-link))
     ((string-prefix-p "/" raw-link)
      (format "<a href=\"%s\">%s</a>"
              raw-link
              contents))
     (t (org-export-with-backend 'html link contents info)))))

(defun nyc/make-heading-anchor-name (headline-text)
  (thread-last headline-text
               (downcase)
               (replace-regexp-in-string " " "-")
               (replace-regexp-in-string "[^[:alnum:]_-]" "")))

(defun nyc/org-html--format-toc-headline (headline info)
  (let* ((text (org-export-data (org-element-property :title headline) info))
         (anchor-name (nyc/make-heading-anchor-name text)))
    (format "<a href=\"#%s\">%s</a>" anchor-name text)))

(advice-add 'org-html--format-toc-headline :override #'nyc/org-html--format-toc-headline)

;; TODO - only set achor on level 2
(defun nyc/org-html-headline (headline contents info)
  (let* ((text (org-export-data (org-element-property :title headline) info))
         (level (org-export-get-relative-level headline info))
         (level (min 7 (when level (1+ level))))
         (anchor-name (nyc/make-heading-anchor-name text))
         (attributes (org-element-property :ATTR_HTML headline))
         ;; Wrap level 2s in section tags unless theres a property
         (container
          (or (org-element-property :HTML_CONTAINER headline)
              (when (equal level 2) "section")))
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
     (concat "<nyc-accordion class='code-view'>"
             "<h3>Inspect code</h3>"
             "<div>"
             "<pre><code class=\"language-%s\">%s</code></pre>"
             "</div>"
             "</nyc-accordion>")
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

(defun nyc/org-html-section (section contents info)
  (let* ((blah "t"))
    (format "%s" contents)))


(provide 'nyc-publish)
;;; nyc-publish.el ends here
