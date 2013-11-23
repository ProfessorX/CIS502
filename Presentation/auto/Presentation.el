(TeX-add-style-hook "Presentation"
 (lambda ()
    (LaTeX-add-labels
     "equ:Requirements"
     "equ:Classes"
     "equ:Sets"
     "equ:RequirementSetforExperts"
     "equ:TrumoNewSimilarity"
     "fig:Traceability"
     "fig:Overlap"
     "fig:JSMRhino"
     "fig:VSMRhino"
     "fig:H1B"
     "fig:BaseSalary"
     "fig:QuestionandAnswer")
    (TeX-run-style-hooks
     "amsmath"
     ""
     "latex2e"
     "beamer12"
     "beamer"
     "mathserif"
     "hyperref=true"
     "12pt")))

