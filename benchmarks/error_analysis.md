# Error Analysis & Diagnostic Log

**Total Misclassifications:** 4 of 81 samples.

### 1. [email-phish-011] Invoice Fraud / BEC
- **Input Text:** "Invoice #4821 attached. Please review and wire payment of $12,500 to the updated bank account by end of business today. Account details: Chase routing 021000021."
- **Expected:** High (IsScam: true)
- **Actual Output:** Very Low (Probability: 0%, Confidence: 75%)
- **Red Flags Triggered:** The message actively asks you to provide sensitive credentials (password, PIN, SSN, verification code, or financial details). Legitimate companies already have your account information — they do not need you to "verify" or "confirm" it through unsolicited messages. This is one of the strongest indicators of a phishing attempt., The message uses time-pressure language alongside a request that could be suspicious. Even mild urgency ("today", "immediately") becomes a risk signal when paired with requests for credentials, payments, or account actions.
- **Trust Signals Triggered:** The message uses professional workplace language ("team update", "agenda", "meeting", "review") without requesting credentials, payments, or urgent action — consistent with routine business communication that poses no threat., The message contains standard transactional language ("has shipped", "order confirmed", "tracking info") that is typical of legitimate order and shipping notifications. No suspicious links or credential requests are present.
- **Diagnostic Rationale:** Missed detection due to vocabulary edge case.

### 2. [email-phish-014] Fake Job / Check Fraud
- **Input Text:** "We are hiring remote workers for data entry tasks. Earn $5,000 per week working 2 hours a day. We will send you a cashier check to buy home office equipment. Reply now to start."
- **Expected:** High (IsScam: true)
- **Actual Output:** Low (Probability: 15%, Confidence: 75%)
- **Red Flags Triggered:** The message combines a too-good-to-be-true job offer with a check-sending scheme. This is a classic fake-check fraud: you receive a fraudulent cashier's check, deposit it, and are asked to forward part of the funds. When the check bounces days later, you owe the bank the full amount. These scams target job seekers and students.
- **Trust Signals Triggered:** The message uses professional workplace language ("team update", "agenda", "meeting", "review") without requesting credentials, payments, or urgent action — consistent with routine business communication that poses no threat.
- **Diagnostic Rationale:** Missed detection due to vocabulary edge case.

### 3. [sms-phish-009] Bank Fraud Alert Smishing
- **Input Text:** "Capital One fraud alert: Unauthorized purchase of $342.99 at Best Buy. If this wasn't you, verify now at http://capitalone-fraud-verify.com"
- **Expected:** High (IsScam: true)
- **Actual Output:** Very Low (Probability: 0%, Confidence: 88%)
- **Red Flags Triggered:** None
- **Trust Signals Triggered:** None
- **Diagnostic Rationale:** Missed detection due to vocabulary edge case.

### 4. [email-phish-017] Tech Support Scam
- **Input Text:** "Microsoft Support: Your computer has been infected with a critical virus. Call 1-800-555-0199 immediately or your files will be permanently deleted."
- **Expected:** High (IsScam: true)
- **Actual Output:** Low (Probability: 16%, Confidence: 89%)
- **Red Flags Triggered:** The message references microsoft with urgent language. Scammers exploit brand trust to create false urgency. However, urgency alone with a brand name is only a moderate signal — some legitimate notifications (shipping deadlines, payment reminders) also use time pressure., The message uses mild time-pressure language. This is common in both legitimate and scam communications. On its own, urgency is a weak signal — it becomes more concerning when combined with requests for sensitive information or suspicious links.
- **Trust Signals Triggered:** None
- **Diagnostic Rationale:** Missed detection due to vocabulary edge case.
