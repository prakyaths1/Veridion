# Veridion Benchmark Report

## Benchmark run summary

- Dataset files discovered: 6
- Total samples evaluated: 70
- Observed benchmark run: 2026-08-02T18:08:49.594Z

## Dataset inventory

| Source | Dataset | File | Samples | Expected |
| --- | --- | --- | --- | --- |
| email | legitimate | legitimate.json | 15 | negative |
| email | phishing | phishing.json | 15 | positive |
| sms | legitimate | legitimate.json | 10 | negative |
| sms | phishing | phishing.json | 10 | positive |
| url | legitimate | legitimate.json | 10 | negative |
| url | phishing | phishing.json | 10 | positive |

## Evaluation metrics

| Metric | Value |
| --- | --- |
| Accuracy | 95.7% |
| Precision | 100.0% |
| Recall | 91.4% |
| F1 Score | 95.5% |
| False Positive Rate | 0.0% |
| False Negative Rate | 8.6% |
| Samples Evaluated | 70 |
| Average Probability Error | 16.4 |
| Average Confidence Error | 3.2 |

## Confusion matrix

| Metric | Value |
| --- | --- |
| True Positives (TP) | 32 |
| False Positives (FP) | 0 |
| True Negatives (TN) | 35 |
| False Negatives (FN) | 3 |

## Per-category accuracy

| Source | Samples | Correct | Accuracy |
| --- | --- | --- | --- |
| email | 30 | 28 | 93.3% |
| sms | 20 | 19 | 95.0% |
| url | 20 | 20 | 100.0% |

## False positives

- No false positives surfaced in the current benchmark run.

## False negatives

- email-phish-011 (email) | expected=phishing | final verdict=Low • 15% scam probability | confidence=75% | signals=Job Scam Detector (10), Trust Signal Detector (5) | trust signals=The message uses professional workplace language ("team update", "agenda", "meeting", "review") without requesting credentials, payments, or urgent action — consistent with routine business communication that poses no threat.
- email-phish-015 (email) | expected=phishing | final verdict=Low • 16% scam probability | confidence=89% | signals=Brand Impersonation (4), Urgency Detector (3) | trust signals=none
- sms-phish-008 (sms) | expected=phishing | final verdict=Very Low • 0% scam probability | confidence=88% | signals= | trust signals=none

## Common failure patterns

| Pattern | Count |
| --- | --- |
| red-flag-heavy | 2 |
| context-mismatch | 1 |

## Suggested improvements

- Job Scam Detector appears in 1 sampled errors and should be reviewed for threshold or confidence calibration.
- Trust Signal Detector appears in 1 sampled errors and should be reviewed for threshold or confidence calibration.
- Brand Impersonation appears in 1 sampled errors and should be reviewed for threshold or confidence calibration.

## Notes

- The benchmark runs on all labeled files available in the public dataset directories and does not invent sample counts.
- If a dataset file is missing, the report records it as unavailable rather than assuming results.
- This framework is meant to be rerun whenever the engine changes so validation stays reproducible for competition review.