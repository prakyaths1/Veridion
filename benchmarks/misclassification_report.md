# Veridion Engine — Misclassification & Diagnostic Report

**Evaluation Timestamp:** 2026-08-08T00:19:39.702Z  
**Total Misclassifications:** 10 of 728 samples (1.4%).

### 1. [sms-uci-spam-004] Financial Smishing (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "Had your mobile 11 months or more? U R entitled to Update to the latest colour camera mobile for Free! Call The Mobile Update Co FREE on 08002986030"
- **Expected:** High (IsScam: true)
- **Predicted:** Very Low (Probability: 0%, Confidence: 88%)
- **Detectors Triggered:** None
- **Red Flags:** None
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Financial Smishing"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Financial Smishing.

---
### 2. [sms-phish-011] Wrong Number / Pig Butchering (SMS)
- **Dataset Source:** IC3 Pig Butchering Reports
- **Input Text:** "Sorry to bother you Anna, are we still meeting for lunch at 12? Oh wrong number? So sorry! You seem nice though, what is your name?"
- **Expected:** Moderate (IsScam: true)
- **Predicted:** Low (Probability: 22%, Confidence: 82%)
- **Detectors Triggered:** Romance / Wrong Number Detector
- **Red Flags:** The message uses patterns common in romance or wrong-number scams: unsolicited personal contact, requests for money, claims of being stranded, or terms of endearment combined with financial requests. These scams build emotional trust before requesting money, often claiming emergencies at customs, hospitals, or airports.
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Wrong Number / Pig Butchering"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Wrong Number / Pig Butchering.

---
### 3. [sms-uci-055] Subscription Smishing (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "Thanks for your subscription to Ringtone UK your mobile will be charged £5/month. To cancel reply STOP"
- **Expected:** High (IsScam: true)
- **Predicted:** Very Low (Probability: 0%, Confidence: 88%)
- **Detectors Triggered:** None
- **Red Flags:** None
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Subscription Smishing"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Subscription Smishing.

---
### 4. [sms-uci-056] Prize / Lottery Smishing (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "07732584351 Rodger Burns - MSG = We tried to call you re your reply to our sms for a free nokia mobile + free camcorder. Please call now 08000930705 for delivery"
- **Expected:** High (IsScam: true)
- **Predicted:** Very Low (Probability: 0%, Confidence: 88%)
- **Detectors Triggered:** None
- **Red Flags:** None
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Prize / Lottery Smishing"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Prize / Lottery Smishing.

---
### 5. [sms-uci-058] Premium Rate SMS (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "Your 2004 account balance is 500 bonus points. To claim call 08712400800 now. 150p/min"
- **Expected:** High (IsScam: true)
- **Predicted:** Very Low (Probability: 0%, Confidence: 88%)
- **Detectors Triggered:** None
- **Red Flags:** None
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Premium Rate SMS"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Premium Rate SMS.

---
### 6. [sms-uci-064] Financial Smishing (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "Urgent! Your mobile account has outstanding charges. Call 08718720201 to clear your balance."
- **Expected:** High (IsScam: true)
- **Predicted:** Very Low (Probability: 4%, Confidence: 81%)
- **Detectors Triggered:** Urgency Detector
- **Red Flags:** The message uses mild time-pressure language. This is common in both legitimate and scam communications. On its own, urgency is a weak signal — it becomes more concerning when combined with requests for sensitive information or suspicious links.
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Financial Smishing"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Financial Smishing.

---
### 7. [sms-uci-065] Premium Rate SMS (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "You have 1 new voicemail. Call 09058094597 to listen. Charges £1.50/min."
- **Expected:** High (IsScam: true)
- **Predicted:** Very Low (Probability: 0%, Confidence: 88%)
- **Detectors Triggered:** None
- **Red Flags:** None
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Premium Rate SMS"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Premium Rate SMS.

---
### 8. [sms-uci-066] Premium Rate SMS (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "HOT Chat line! Call 09065171142 now to chat with local singles. 18+ £1.50/min"
- **Expected:** High (IsScam: true)
- **Predicted:** Very Low (Probability: 0%, Confidence: 88%)
- **Detectors Triggered:** None
- **Red Flags:** None
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Premium Rate SMS"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Premium Rate SMS.

---
### 9. [sms-uci-067] Financial Smishing (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "URGENT: Your loan application of £5,000 has been approved. Call 08715203004 to complete deposit."
- **Expected:** High (IsScam: true)
- **Predicted:** Very Low (Probability: 4%, Confidence: 81%)
- **Detectors Triggered:** Urgency Detector
- **Red Flags:** The message uses mild time-pressure language. This is common in both legitimate and scam communications. On its own, urgency is a weak signal — it becomes more concerning when combined with requests for sensitive information or suspicious links.
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Financial Smishing"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Financial Smishing.

---
### 10. [sms-uci-072] Bank Smishing (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "Bank Alert: $450 transfer authorized from your account. If not you, call 080088921 immediately."
- **Expected:** High (IsScam: true)
- **Predicted:** Very Low (Probability: 4%, Confidence: 81%)
- **Detectors Triggered:** Urgency Detector
- **Red Flags:** The message uses mild time-pressure language. This is common in both legitimate and scam communications. On its own, urgency is a weak signal — it becomes more concerning when combined with requests for sensitive information or suspicious links.
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Bank Smishing"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Bank Smishing.

