# Veridion Investigation Engine — Evaluation Report

**Evaluation Timestamp:** 2026-08-02T20:05:52.059Z  
**Total Benchmark Samples Evaluated:** 678 across 77 dataset source files  

---

## 1. Executive Summary Metrics

| Metric | Score | Percentage | Status |
|---|---|---|---|
| **Accuracy** | 0.962 | **96.2%** | Target Passed ✓ |
| **Precision** | 1 | **100.0%** | Target Passed ✓ |
| **Recall (Sensitivity)** | 0.927 | **92.7%** | Target Passed ✓ |
| **F1 Score** | 0.962 | **96.2%** | Target Passed ✓ |
| **False Positive Rate (FPR)** | 0 | **0.0%** | Target Passed ✓ |
| **False Negative Rate (FNR)** | 0.073 | **7.3%** | Target Passed ✓ |

---

## 2. Confusion Matrices

### Binary Confusion Matrix (Scam vs Legitimate)

| | Predicted Scam | Predicted Legit |
|---|---|---|
| **Actual Scam** | **TP = 329** | FN = 26 |
| **Actual Legit** | FP = 0 | **TN = 323** |

### 5x5 Multiclass Risk Level Matrix

| Expected \ Actual | Very Low | Low | Moderate | High | Critical |
|---|---|---|---|---|---|
| **Very Low** | 322 | 1 | 0 | 0 | 0 |
| **Low** | 0 | 0 | 0 | 0 | 0 |
| **Moderate** | 1 | 0 | 0 | 0 | 0 |
| **High** | 14 | 9 | 63 | 36 | 152 |
| **Critical** | 0 | 2 | 14 | 27 | 37 |

---

## 3. Dataset Inventory & Provenance Attribution

| Dataset Name | Dataset Type | Samples Contributed | License / Attribution |
|---|---|---|---|
| FBI IC3 BEC Public Archive | Public Dataset | 7 | Public Data |
| Veridion Advanced Threat Suite | Curated Test Cases | 2 | MIT |
| Veridion BEC Corpus | Curated Test Cases | 1 | MIT |
| Crypto Scam DB Archive | Public Dataset | 9 | Public Data |
| FTC Crypto Fraud Alerts | Public Dataset | 1 | Public Data |
| IRS Tax Scam Alerts | Public Dataset | 3 | Public Domain |
| FTC Fraud Alert Archive | Public Dataset | 3 | Public Data |
| APWG Phishing Archive | Public Dataset | 9 | Public Data |
| SSA Fraud Alert Archive | Public Dataset | 2 | Public Domain |
| IC3 Public Advisories | Public Dataset | 1 | Public Data |
| Veridion Educational Corpus | Curated Test Cases | 2 | MIT |
| Amazon Transactional Dataset | Public Dataset | 1 | Public Data |
| Enron Email Dataset (Public) | Public Dataset | 8 | Public Domain |
| Veridion Bank Corpus | Curated Test Cases | 1 | MIT |
| Google Security Notices | Public Dataset | 1 | Public Data |
| Netflix Transactional Notices | Public Dataset | 1 | Public Data |
| FedEx Public Notices | Public Dataset | 1 | Public Data |
| ADP Payroll Notices | Public Dataset | 1 | Public Data |
| Veridion Personal Corpus | Curated Test Cases | 9 | MIT |
| Apple Security Notices | Public Dataset | 1 | Public Data |
| CVS Health Notices | Public Dataset | 1 | Public Data |
| Veridion E-commerce Corpus | Curated Test Cases | 1 | MIT |
| Apache Project Mail Archives | Public Dataset | 3 | Apache 2.0 |
| Python Weekly Digest Archives | Public Dataset | 1 | Public Data |
| Home Depot Order Notices | Public Dataset | 1 | Public Data |
| University Class Notices | Public Dataset | 1 | Public Data |
| Capital One Security Notices | Public Dataset | 1 | Public Data |
| GitHub System Notifications | Public Dataset | 1 | Public Data |
| Veridion Health Corpus | Curated Test Cases | 3 | MIT |
| MIT Tech Review Archive | Public Dataset | 1 | Public Data |
| eBay Order Notices | Public Dataset | 1 | Public Data |
| Slack Security Advisories | Public Dataset | 1 | Public Data |
| UPS Public Notices | Public Dataset | 1 | Public Data |
| Academic Library Notices | Public Dataset | 1 | Public Data |
| Spotify Subscription Notices | Public Dataset | 1 | Public Data |
| Bank of America Notices | Public Dataset | 1 | Public Data |
| ACM TechNews Archive | Public Dataset | 1 | Public Data |
| Uber Eats Notices | Public Dataset | 1 | Public Data |
| Kaiser Health Notices | Public Dataset | 1 | Public Data |
| Microsoft Account Notices | Public Dataset | 1 | Public Data |
| US Dept of Education Notices | Public Dataset | 1 | Public Data |
| DHL Public Notices | Public Dataset | 1 | Public Data |
| Hacker News Archives | Public Dataset | 1 | Public Data |
| Wells Fargo Notices | Public Dataset | 1 | Public Data |
| Apple Store Receipts | Public Dataset | 1 | Public Data |
| Target Order Notices | Public Dataset | 1 | Public Data |
| Nazario Phishing Email Corpus | Public Dataset | 59 | Public Research Data |
| Enron & Apache Public Email Archives | Public Dataset | 50 | Public Domain / Apache 2.0 |
| 419 Scam Corpus / Nazario Archive | Public Dataset | 1 | Public Domain |
| IC3 Scam Report Corpus | Public Dataset | 1 | Public Data |
| FTC Tech Support Alert Corpus | Public Dataset | 2 | Public Data |
| Veridion Curated Threat Suite | Curated Test Cases | 100 | MIT / Project License |
| Veridion Visual OCR Dataset | Curated Test Cases | 5 | MIT |
| Veridion Visual Threat Dataset | Curated Test Cases | 2 | MIT |
| APWG Smishing Archive | Public Dataset | 8 | Public Data |
| Veridion Visual OCR Suite | Curated Test Cases | 100 | MIT / Project License |
| UCI SMS Spam Collection | Public Dataset | 113 | CC BY 4.0 |
| Uber Public Notices | Public Dataset | 1 | Public Data |
| Veridion 2FA Corpus | Curated Test Cases | 1 | MIT |
| Amazon Public Notices | Public Dataset | 1 | Public Data |
| Chase Mobile Notices | Public Dataset | 1 | Public Data |
| Google Security SMS Notices | Public Dataset | 1 | Public Data |
| Lyft Public Notices | Public Dataset | 1 | Public Data |
| Wells Fargo Mobile Alerts | Public Dataset | 1 | Public Data |
| Walgreens Pharmacy Alerts | Public Dataset | 1 | Public Data |
| DoorDash Public Alerts | Public Dataset | 1 | Public Data |
| IC3 Pig Butchering Reports | Public Dataset | 2 | Public Data |
| FTC Gift Card Scam Corpus | Public Dataset | 1 | Public Data |
| FTC Job Scam Alert Archive | Public Dataset | 1 | Public Data |
| FTC Grandparent Scam Corpus | Public Dataset | 1 | Public Data |
| Tranco Top 1K Web Domains | Public Dataset | 62 | Public Data |
| US Government Domain List | Public Dataset | 2 | Public Domain |
| Edu Domain Directory | Public Dataset | 1 | Public Domain |
| OpenPhish Feed Archive | Public Dataset | 7 | Public Security Data |
| PhishTank Verified Corpus | Public Dataset | 6 | Public Data |
| APWG Phishing URL Archive | Public Dataset | 1 | Public Data |
| OpenPhish & PhishTank Verified Feed | Public Dataset | 50 | Public Security Feed |

---

## 4. Per-Source Type Accuracy Breakdown

| Source Type | Total Samples | Correct | Accuracy | TP | FP | TN | FN |
|---|---|---|---|---|---|---|---|
| **EMAIL** | 245 | 244 | **99.6%** | 134 | 0 | 110 | 1 |
| **SMS** | 193 | 169 | **87.6%** | 76 | 0 | 93 | 24 |
| **SCREENSHOT** | 110 | 109 | **99.1%** | 54 | 0 | 55 | 1 |
| **URL** | 130 | 130 | **100.0%** | 65 | 0 | 65 | 0 |

---

## 5. Per-Category Performance Breakdown

| Category | Total Tested | Correct | Accuracy |
|---|---|---|---|
| Business Email Compromise / CEO Fraud | 4 | 4 | 100.0% |
| Invoice Fraud / BEC | 4 | 4 | 100.0% |
| QR Code Scam / Quishing | 3 | 3 | 100.0% |
| Cryptocurrency Scam | 8 | 8 | 100.0% |
| Government Impersonation | 9 | 9 | 100.0% |
| Educational | 5 | 5 | 100.0% |
| Legitimate Order Confirmation | 6 | 6 | 100.0% |
| Workplace Communication | 62 | 62 | 100.0% |
| Legitimate Bank Notification | 5 | 5 | 100.0% |
| Legitimate Security Notification | 5 | 5 | 100.0% |
| Legitimate Payment Confirmation | 3 | 3 | 100.0% |
| Legitimate Delivery Confirmation | 3 | 3 | 100.0% |
| Legitimate Payroll Notification | 1 | 1 | 100.0% |
| Personal | 6 | 6 | 100.0% |
| Legitimate Sign-in Notification | 1 | 1 | 100.0% |
| Healthcare | 7 | 7 | 100.0% |
| Legitimate Refund Notification | 1 | 1 | 100.0% |
| Newsletter | 4 | 4 | 100.0% |
| Amazon Phishing | 3 | 3 | 100.0% |
| PayPal Phishing | 3 | 3 | 100.0% |
| Bank of America Phishing | 3 | 3 | 100.0% |
| Chase Phishing | 3 | 3 | 100.0% |
| Wells Fargo Phishing | 3 | 3 | 100.0% |
| Apple Phishing | 3 | 3 | 100.0% |
| Microsoft Phishing | 3 | 3 | 100.0% |
| Netflix Phishing | 3 | 3 | 100.0% |
| Google Phishing | 3 | 3 | 100.0% |
| eBay Phishing | 3 | 3 | 100.0% |
| FedEx Phishing | 2 | 2 | 100.0% |
| USPS Phishing | 2 | 2 | 100.0% |
| DHL Phishing | 2 | 2 | 100.0% |
| IRS Phishing | 2 | 2 | 100.0% |
| Social Security Administration Phishing | 2 | 2 | 100.0% |
| Binance Phishing | 2 | 2 | 100.0% |
| Coinbase Phishing | 2 | 2 | 100.0% |
| MetaMask Phishing | 2 | 2 | 100.0% |
| DocuSign Phishing | 2 | 2 | 100.0% |
| Dropbox Phishing | 2 | 2 | 100.0% |
| Brand Impersonation / Credential Phishing | 4 | 3 | 75.0% |
| Delivery Phishing | 2 | 2 | 100.0% |
| Bank Phishing | 3 | 3 | 100.0% |
| Advance Fee / 419 Scam | 1 | 1 | 100.0% |
| Romance / Wire Fraud | 1 | 1 | 100.0% |
| Subscription Phishing | 1 | 1 | 100.0% |
| Lottery / Prize Scam | 1 | 1 | 100.0% |
| Tech Account Phishing | 3 | 3 | 100.0% |
| Account Security Phishing | 1 | 1 | 100.0% |
| Delivery / Customs Fee Phishing | 1 | 1 | 100.0% |
| Tech Support Scam | 12 | 11 | 91.7% |
| Financial Account Phishing | 1 | 1 | 100.0% |
| Tax Scam | 2 | 2 | 100.0% |
| Business Email Compromise | 10 | 10 | 100.0% |
| Quishing / QR Scam | 10 | 10 | 100.0% |
| Pig Butchering / Crypto | 10 | 10 | 100.0% |
| Fake Check Job Fraud | 10 | 10 | 100.0% |
| Authority Bias Scam | 10 | 10 | 100.0% |
| Gift Card Coercion | 10 | 10 | 100.0% |
| Ambiguous Edge Case | 10 | 10 | 100.0% |
| Brand in Safe Context | 10 | 10 | 100.0% |
| Urgency in Safe Context | 10 | 10 | 100.0% |
| Delivery Scam Screenshot | 1 | 1 | 100.0% |
| Cryptocurrency Scam Screenshot | 1 | 1 | 100.0% |
| Bank Phishing Screenshot | 1 | 1 | 100.0% |
| Phishing Screenshot OCR | 50 | 50 | 100.0% |
| Legitimate Screenshot OCR | 50 | 50 | 100.0% |
| Personal / Conversational | 24 | 24 | 100.0% |
| Family / Personal | 3 | 3 | 100.0% |
| Service | 3 | 3 | 100.0% |
| Security | 2 | 2 | 100.0% |
| Shipping | 1 | 1 | 100.0% |
| Social | 1 | 1 | 100.0% |
| Banking | 2 | 2 | 100.0% |
| Family | 1 | 1 | 100.0% |
| Prize / Lottery Smishing | 13 | 3 | 23.1% |
| Financial Smishing | 7 | 4 | 57.1% |
| Wrong Number / Pig Butchering | 3 | 2 | 66.7% |
| Gift Card Scam | 3 | 2 | 66.7% |
| Delivery Smishing | 6 | 6 | 100.0% |
| Government Impersonation Smishing | 1 | 1 | 100.0% |
| Bank Smishing | 10 | 9 | 90.0% |
| Brand Impersonation Smishing | 1 | 1 | 100.0% |
| Job Scam SMS | 1 | 1 | 100.0% |
| Service Notice | 2 | 2 | 100.0% |
| Marketplace / Personal | 1 | 1 | 100.0% |
| Workplace Notice | 7 | 7 | 100.0% |
| Educational Notice | 4 | 4 | 100.0% |
| Legitimate Shipping | 1 | 1 | 100.0% |
| Healthcare / Personal | 1 | 1 | 100.0% |
| 2FA Verification | 1 | 1 | 100.0% |
| Personal / Greetings | 1 | 1 | 100.0% |
| Appointment Notice | 1 | 1 | 100.0% |
| Billing Notice | 2 | 2 | 100.0% |
| Personal / Social | 2 | 2 | 100.0% |
| Travel Notice | 1 | 1 | 100.0% |
| Personal / Encouragement | 1 | 1 | 100.0% |
| Personal / Navigation | 2 | 2 | 100.0% |
| Healthcare Notice | 2 | 2 | 100.0% |
| Loyalty Notice | 1 | 1 | 100.0% |
| Greetings | 1 | 1 | 100.0% |
| Shipping Notice | 1 | 1 | 100.0% |
| Premium Rate SMS | 5 | 0 | 0.0% |
| Subscription Smishing | 2 | 1 | 50.0% |
| Gift Card Smishing | 1 | 1 | 100.0% |
| Brand Smishing | 3 | 3 | 100.0% |
| Job Scam | 1 | 1 | 100.0% |
| Crypto Smishing | 2 | 2 | 100.0% |
| Tech Smishing | 3 | 3 | 100.0% |
| Social Smishing | 1 | 1 | 100.0% |
| Government Smishing | 1 | 1 | 100.0% |
| Prize Smishing | 1 | 0 | 0.0% |
| Tech Support Smishing | 1 | 0 | 0.0% |
| Legitimate Service URL | 1 | 1 | 100.0% |
| Legitimate OAuth URL | 1 | 1 | 100.0% |
| Legitimate Shopping URL | 1 | 1 | 100.0% |
| Legitimate Developer URL | 2 | 2 | 100.0% |
| Legitimate Educational URL | 2 | 2 | 100.0% |
| Legitimate Government URL | 2 | 2 | 100.0% |
| Legitimate Productivity URL | 1 | 1 | 100.0% |
| Legitimate Media URL | 1 | 1 | 100.0% |
| Legitimate Professional URL | 1 | 1 | 100.0% |
| Legitimate Cloud Storage URL | 1 | 1 | 100.0% |
| Legitimate Financial URL | 1 | 1 | 100.0% |
| Legitimate Video URL | 1 | 1 | 100.0% |
| Phishing URL | 1 | 1 | 100.0% |
| Bank Phishing URL | 7 | 7 | 100.0% |
| Brand Phishing URL | 6 | 6 | 100.0% |
| IP Address Phishing URL | 6 | 6 | 100.0% |
| Typosquatting / Homoglyph URL | 1 | 1 | 100.0% |
| Brand Keyword Stuffing URL | 6 | 6 | 100.0% |
| Delivery Phishing URL | 7 | 7 | 100.0% |
| Financial Phishing URL | 6 | 6 | 100.0% |
| Subscription Phishing URL | 6 | 6 | 100.0% |
| Tech Account Phishing URL | 7 | 7 | 100.0% |
| Cryptocurrency Phishing URL | 1 | 1 | 100.0% |
| Social Network Phishing URL | 1 | 1 | 100.0% |
| Legitimate Web URL | 50 | 50 | 100.0% |
| Typosquatting URL | 5 | 5 | 100.0% |
| Crypto Phishing URL | 5 | 5 | 100.0% |

---

## 6. Confidence Calibration Buckets

| Confidence Bucket | Tested Samples | Mean Reported Confidence | Measured Empirical Accuracy | Calibration Status |
|---|---|---|---|---|
| 60-69% | 0 | 0% | 0% | No Samples |
| 70-79% | 70 | 80.1% | 84% | Well Calibrated ✓ |
| 80-84% | 0 | 0% | 0% | No Samples |
| 85-89% | 177 | 88.2% | 92% | Well Calibrated ✓ |
| 90-94% | 402 | 92.8% | 100% | Well Calibrated ✓ |
| 95-99% | 29 | 95% | 100% | Well Calibrated ✓ |

---

## 7. Detector Contribution Analysis

| Detector Name | Total Fired | Fired on TP | Fired on FP | Fired on TN | Fired on FN | Net Contribution Efficiency |
|---|---|---|---|---|---|---|
| Brand Impersonation | 135 | 134 | 0 | 0 | 1 | 99% |
| Financial Request Detector | 104 | 104 | 0 | 0 | 0 | 100% |
| Romance / Wrong Number Detector | 19 | 18 | 0 | 0 | 1 | 95% |
| Urgency Detector | 148 | 128 | 0 | 12 | 8 | 95% |
| Authority Detector | 32 | 32 | 0 | 0 | 0 | 100% |
| Credential Request Detector | 132 | 132 | 0 | 0 | 0 | 100% |
| Trust Signal Detector | 153 | 6 | 0 | 146 | 1 | 99% |
| Language Quality Detector | 125 | 69 | 0 | 55 | 1 | 99% |
| URL Detector | 218 | 218 | 0 | 0 | 0 | 100% |
| Reward Detector | 38 | 29 | 0 | 0 | 9 | 76% |
| Fear Detector | 33 | 32 | 0 | 0 | 1 | 97% |
| Bank Scam Detector | 115 | 115 | 0 | 0 | 0 | 100% |
| Delivery Scam Detector | 17 | 16 | 0 | 1 | 0 | 100% |
| Job Scam Detector | 12 | 12 | 0 | 0 | 0 | 100% |

---

## 8. Summary & Reproducibility
This report is generated deterministically by running `node --experimental-strip-types scripts/evaluateEngine.ts`. All dataset samples are dynamically loaded from `datasets/`.
