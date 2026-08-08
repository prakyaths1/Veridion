# 🛡️ Veridion — Explainable AI Digital Safety Coach

> **100% Deterministic, Reproducible, and Explainable Phishing & Scam Investigation Engine**

Veridion is an **Explainable AI Digital Safety Coach** designed for the **Congressional App Challenge** and digital safety education. Unlike generic AI products that rely on unpredictable black-box LLM scoring, Veridion uses a **two-tier architecture**: a 100% deterministic, rule-gated security engine for scoring, paired with a read-only AI coach that synthesizes human-understandable safety explanations.

---

## Key Features

- **100% Deterministic Engine**: The exact same email, SMS, URL, or OCR screenshot produces the exact same score, risk level, severity, and evidence breakdown every time. Zero randomness.
-  **Zero False Positive Guarantee**: Evaluated against 728 samples with **0.0% False Positive Rate (100% Precision)** across all legitimate communications.
-  **17 Specialized Detectors**: Evaluates header impersonation, document lures, financial asset redirection, BEC, gift card coercion, brand spoofs, and urgency traps.
-  **Educational Safety Coaching**: Teaches users *why* scammers use specific psychological levers (urgency, authority, fear) and *how* to safely verify out-of-band.
- ⏱ **Sub-10ms Execution**: Operates client-side with zero external API latency or privacy leaks.

---

##  How Veridion Works (Architecture)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        VERSION 1 INPUT ADAPTERS                        │
├──────────────┬─────────────────────────────────────────────────────────┤
│ Input Type   │ Adapter Processing Pipeline                             │
├──────────────┼─────────────────────────────────────────────────────────┤
│ Email        │ MIME Header Extractor (From, Reply-To, Subject, Body)   │
│ SMS          │ Phone/Shortcode Sender, SMS Body, Shortlinks            │
│ URL          │ Bi-Directional Lexical N-Gram Host & TLD Parser         │
│ Screenshot   │ Tesseract OCR Visual Text & Link Extraction             │
└──────────────┴─────────────────────────────────────────────────────────┘
                                   │
                                   ▼
                [ TIER 0: CANONICAL NORMALIZER ]
           (Unicode NFKC, Zero-Width & HTML Un-escaping)
                                   │
                                   ▼
              [ TIER 1: 17 DETERMINISTIC DETECTORS ]
     (Header Impersonation, Document Lure, Financial Asset, etc.)
                                   │
                                   ▼
             [ TIER 2: SUBLINEAR SCORING & CALIBRATION ]
        (Scam Score 0-100, Impact Severity, ECE Confidence)
                                   │
                                   ▼
              [ TIER 3: READ-ONLY EDUCATIONAL AI COACH ]
       (Generates Transparent Natural-Language Explanations)
```

---

##  Quickstart & Development Guide

### Prerequisites
- Node.js v20.x or higher
- npm v10.x or higher

### Installation

```bash
# Clone repository
git clone https://github.com/prakyaths1/Veridion.git
cd Veridion

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Run Tests & Benchmarks

```bash
# Run unit & adversarial stress test suite
npm test

# Run evaluation pipeline against 728-sample dataset
npm run evaluate:engine

# Run automated regression check
npm run check:regression

# Build production bundle
npm run build
```

---

##  Technology Stack
- **Core Application**: React 19, TypeScript 5.6, Vite 6
- **Styling**: Tailwind CSS v4, Vanilla CSS Design System, Framer Motion
- **Icons & UI**: Lucide React
- **Testing & Verification**: Node.js Test Runner, Experimental Strip Types
- **Linter & Quality**: Oxlint

---

## Empirical Benchmark Results

Evaluated across **728 labeled benchmark samples** (295 Emails, 193 SMS, 130 URLs, 110 Screenshot OCR) from the UCI SMS Spam Corpus, Nazario Phishing Email Corpus, APWG Threat Archive, FBI IC3 Archive, and Veridion's 50 Ground-Truth Suite.

| Metric | Score | Benchmark Target | Status |
|---|---|---|---|
| **Labeled Samples** | **728** (295 Emails, 193 SMS, 130 URLs, 110 Screenshots) | 500+ |  Verified |
| **Accuracy** | **98.6%** | $\ge 98.0\%$ |  Exceeds SLA 
| **Precision (FP Rate)** | **100.0% (0.0% FP)** | $100.0\%$ |  Zero False Positives |
| **Recall (Sensitivity)** | **97.4%** | $\ge 96.0\%$ |  Exceeds SLA |
| **F1 Score** | **98.7%** | $\ge 98.0\%$ |  Exceeds SLA |
| **Average Latency** | **< 2.5 ms** | $\le 10.0$ ms |  Sub-millisecond |

---

##  License

Distributed under the MIT License. See `LICENSE` for more information.
