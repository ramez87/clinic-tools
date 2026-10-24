# NIR Clinic Tools

Scoring tools for the neurointerventional clinic. The main page has two tabs with no overlap: Visit scores (default: THI, HIT-6, NRS/ODI, mRS, NIHSS) and Planning tools (follow-up planner, procedure risks, PHASES/ISUIA, AVM grading, Borden/Cognard, Bern, blood thinner restart); the tab is remembered per browser. Static pages; nothing entered is saved or sent.

- Follow-up planner (followup.html): follow-up protocol by disease and pathway (visits, imaging, medicine changes), branch choices, optional start date, copyable plan bullets. Source: Follow-Up Protocols (data version in the page footer). Self-contained
- Procedure risks (risks.html): natural history and treatment risks for aneurysms, AVM/dAVF, venous and CSF, SDH, spine, carotid and ICAD; physician and patient views. Self-contained, also works as an offline file
- Aneurysm: rupture risk (PHASES, ISUIA, lifetime)
- Brain AVM: Spetzler-Martin, Spetzler-Ponce, Lawton-Young supplementary
- Dural AV fistula: Borden and Cognard
- Pulsatile tinnitus and IIH: THI
- Spinal CSF leak: Bern score, HIT-6
- Vertebral augmentation and BVN ablation: back pain 0-10 and ODI
- Stroke, carotid and ICAD: NIHSS, mRS

New scorers share `tools.css` and `scorer.js`. Licensed questionnaires (HIT-6, ODI) show short item labels only; full-wording copies are kept offline for internal use.
