# Confidence Calibration Analysis

The Veridion engine calculates a calibrated confidence score for each verdict based on detector agreement, message completeness, and evidence density.

## Calibration Curve Summary

| Confidence Bucket | Tested Samples | Mean Claimed Confidence | Actual Empirical Accuracy | Delta |
|---|---|---|---|---|
| 80-84% | 9 | 79.4% | 78% | -1.4% |
| 85-89% | 26 | 88.1% | 92% | 3.9% |
| 90-94% | 43 | 92.7% | 100% | 7.3% |
| 95-99% | 3 | 95% | 100% | 5.0% |

## Engineering Recommendations
1. Maintain high confidence threshold (>= 90%) for messages containing explicit brand spoofing or credential requests.
2. For short messages (< 3 words) without links, assign standard baseline confidence of 90-95%.
