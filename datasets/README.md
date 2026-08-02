# Veridion Benchmark Dataset Inventory & Acquisition Guide

This directory contains the multi-source benchmark dataset used to evaluate and stress-test the Veridion Investigation Engine.

## Dataset Sourcing & Provenance

To maintain complete transparency and scientific rigor, samples in this benchmark are drawn from reputable public research corpora and categorized as either **Public Dataset** or **Curated Test Cases**.

| Dataset Name | Source / Provider | License / Terms | Primary Categories | Dataset Type |
|---|---|---|---|---|
| **UCI SMS Spam Collection** | UCI Machine Learning Repository | Public Research / CC BY 4.0 | SMS Smishing & Legitimate SMS | Public Dataset |
| **Nazario Phishing Corpus** | Dr. Jose Nazario / PhishTank / APWG | Public Research / Open Data | Email Phishing, BEC, Credential Harvesting | Public Dataset |
| **OpenPhish / PhishTank Feed** | OpenPhish & PhishTank | Public Security Feed | Phishing URLs & Typosquatting | Public Dataset |
| **Veridion Curated Test Suite** | Veridion Security Research | MIT / Project License | QR Code OCR, Pig-Butchering, Authority Bias, Edge Cases | Curated Test Cases |

## Automatic Dataset Discovery

The Veridion evaluation pipeline uses dynamic auto-discovery (`scripts/datasetLoader.ts`). Any `.json` file added to `datasets/` (or its subdirectories) with the schema below will automatically be discovered, validated, and included in evaluation runs without modifying any code.

### Required Sample Schema

```json
{
  "id": "sms-uci-001",
  "sourceType": "sms",
  "category": "Smishing / Spam",
  "text": "Free entry in 2 a wkly comp to win FA Cup final tkts...",
  "expectedRisk": "High",
  "expectedIsScam": true,
  "groundTruthLabel": "smishing",
  "explanation": "Unsolicited prize draw entry with premium rate text back number.",
  "datasetName": "UCI SMS Spam Collection",
  "datasetSource": "UCI Machine Learning Repository",
  "datasetType": "Public Dataset",
  "license": "CC BY 4.0"
}
```

## Dataset Fetcher & Ingestion Script

To download or refresh open datasets from public sources (such as the UCI SMS Spam collection or OpenPhish feeds):

```bash
node --experimental-strip-types scripts/fetchDatasets.ts
```

This script fetches raw public research datasets, normalizes them into the Veridion sample schema, and writes them into `datasets/sms/`, `datasets/emails/`, and `datasets/urls/`.
