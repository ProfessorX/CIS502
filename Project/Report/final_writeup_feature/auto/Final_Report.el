(TeX-add-style-hook "Final_Report"
 (lambda ()
    (LaTeX-add-labels
     "fig:1")
    (TeX-run-style-hooks
     "float"
     "hyperref"
     "amsfonts"
     "amsmath"
     "graphicx"
     "booktabs"
     ""
     "geometry"
     "margin=0.75in"
     "latex2e"
     "art12"
     "article"
     "12pt")))

