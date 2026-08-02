# Veridion

Veridion is an Explainable AI Digital Safety Coach. The product is designed to help users understand why a message looks risky instead of simply generating a generic alarm.

## Methodology

### Signals analyzed

The investigation engine evaluates a message using a weighted mix of local detectors:

- Brand impersonation
- URL trust or suspiciousness
- Credential or verification requests
- Financial pressure or payment coercion
- Delivery urgency and shipping failure patterns
- Bank-account security wording
- Job scam cues
- Romance / wrong-number social engineering cues
- Urgency language and fear-based framing
- Reward or unexpected benefit bait
- Language quality and trust-signal balance

### How the weighted score works

Each detector contributes a weighted positive or negative signal to the overall score.

- Positive signals increase the estimated scam probability.
- Negative signals reduce it when a message appears routine, professional, or low-pressure.
- Stronger evidence pushes the final risk up faster than a single weak cue.

### What confidence means

Confidence reflects how much support the engine has from the available evidence.

- High confidence means the message contains multiple aligned signals or enough context to make a strong claim.
- Lower confidence is used when the message is short, ambiguous, or conflicts between scam-like and trust-building language.

### Public dataset validation

The project includes a small public-data validation script that evaluates the engine against the bundled datasets under the `datasets/` directory.

Run:

```bash
npm run evaluate:engine
```

The validation output reports:

- accuracy
- precision
- recall
- F1 score
- false positive rate
- average probability error
- average confidence error

### Reproducible benchmark framework

For competition-style validation, run the benchmark pipeline:

```bash
npm run benchmark:engine
```

This command scans all available labeled public datasets, evaluates the engine across every sample, and regenerates a Markdown benchmark report at `benchmarks/engine-benchmark.md`.

## Design intention

The app prioritizes explainability, trust, education, accessibility, and confidence. Instead of simply classifying messages as dangerous, Veridion teaches why a message looks suspicious and how that judgment was reached.
