# Veridion Engine — Misclassification & Diagnostic Report

**Evaluation Timestamp:** 2026-08-02T20:05:52.059Z  
**Total Misclassifications:** 26 of 678 samples (3.8%).

### 1. [email-phish-024] Brand Impersonation / Credential Phishing (EMAIL)
- **Dataset Source:** Nazario Phishing Email Corpus
- **Input Text:** "DocuSign: Action Required - Please sign 'Contract_Agreement_2026.pdf'. Verify your identity at https://docusign-sign-document.com/verify to complete signing."
- **Expected:** High (IsScam: true)
- **Predicted:** Very Low (Probability: 0%, Confidence: 88%)
- **Detectors Triggered:** None
- **Red Flags:** None
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Brand Impersonation / Credential Phishing"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Brand Impersonation / Credential Phishing.

---
### 2. [screenshot-phish-002] Tech Support Scam (SCREENSHOT)
- **Dataset Source:** FTC Tech Support Alert Corpus
- **Input Text:** "Screenshot text: SYSTEM ERROR #0x88921! Windows Defender Alert: Your PC is infected with Trojan Spyware. Call Support at 1-800-555-0199 immediately. Do not close this window."
- **Expected:** High (IsScam: true)
- **Predicted:** Low (Probability: 18%, Confidence: 89%)
- **Detectors Triggered:** Urgency Detector, Fear Detector
- **Red Flags:** The message uses mild time-pressure language. This is common in both legitimate and scam communications. On its own, urgency is a weak signal — it becomes more concerning when combined with requests for sensitive information or suspicious links.; The message threatens negative consequences (account suspension, legal action, penalties, arrest) to pressure you into compliance. This is a fear-based social engineering tactic: scammers create a sense of danger to override your critical thinking. Legitimate organizations resolve disputes through formal channels, not threatening text messages or emails.
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Tech Support Scam"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Tech Support Scam.

---
### 3. [sms-uci-spam-001] Prize / Lottery Smishing (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "Free entry in 2 a wkly comp to win FA Cup final tkts 21st May 2005. Text FA to 87121 to receive entry question(std txt rate)T&C's apply 08452810075over18's"
- **Expected:** High (IsScam: true)
- **Predicted:** Low (Probability: 20%, Confidence: 82%)
- **Detectors Triggered:** Reward Detector
- **Red Flags:** The message promises an unexpected reward, prize, or windfall. This exploits the "reciprocity" and "greed" psychological levers — you feel excited about winning and are willing to overlook red flags. Legitimate sweepstakes never ask for fees, personal information, or gift card codes to claim prizes.
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Prize / Lottery Smishing"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Prize / Lottery Smishing.

---
### 4. [sms-uci-spam-003] Prize / Lottery Smishing (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "WINNER!! As a valued network customer you have been selected to receivea £900 prize reward! To claim call 09061701461. Claim code KL341. Valid 12 hours only."
- **Expected:** Critical (IsScam: true)
- **Predicted:** Low (Probability: 20%, Confidence: 82%)
- **Detectors Triggered:** Reward Detector
- **Red Flags:** The message promises an unexpected reward, prize, or windfall. This exploits the "reciprocity" and "greed" psychological levers — you feel excited about winning and are willing to overlook red flags. Legitimate sweepstakes never ask for fees, personal information, or gift card codes to claim prizes.
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Prize / Lottery Smishing"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Prize / Lottery Smishing.

---
### 5. [sms-uci-spam-004] Financial Smishing (SMS)
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
### 6. [sms-uci-spam-005] Prize / Lottery Smishing (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "URGENT! You have won a 1 week FREE membership in our £100,000 Prize Jackpot! Txt the word CLAIM to 81010 T&C www.dbuk.net LBL21P"
- **Expected:** High (IsScam: true)
- **Predicted:** Low (Probability: 24%, Confidence: 89%)
- **Detectors Triggered:** Urgency Detector, Reward Detector
- **Red Flags:** The message uses mild time-pressure language. This is common in both legitimate and scam communications. On its own, urgency is a weak signal — it becomes more concerning when combined with requests for sensitive information or suspicious links.; The message promises an unexpected reward, prize, or windfall. This exploits the "reciprocity" and "greed" psychological levers — you feel excited about winning and are willing to overlook red flags. Legitimate sweepstakes never ask for fees, personal information, or gift card codes to claim prizes.
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Prize / Lottery Smishing"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Prize / Lottery Smishing.

---
### 7. [sms-phish-011] Wrong Number / Pig Butchering (SMS)
- **Dataset Source:** IC3 Pig Butchering Reports
- **Input Text:** "Sorry to bother you Anna, are we still meeting for lunch at 12? Oh wrong number? So sorry! You seem nice though, what is your name?"
- **Expected:** Moderate (IsScam: true)
- **Predicted:** Very Low (Probability: 7%, Confidence: 75%)
- **Detectors Triggered:** Romance / Wrong Number Detector, Trust Signal Detector
- **Red Flags:** The message uses patterns common in romance or wrong-number scams: unsolicited personal contact, requests for money, claims of being stranded, or terms of endearment combined with financial requests. These scams build emotional trust before requesting money, often claiming emergencies at customs, hospitals, or airports.
- **Trust Signals:** The message uses professional workplace language ("team update", "agenda", "meeting", "review") without requesting credentials, payments, or urgent action — consistent with routine business communication that poses no threat.
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Wrong Number / Pig Butchering"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Wrong Number / Pig Butchering.

---
### 8. [sms-phish-015] Gift Card Scam (SMS)
- **Dataset Source:** FTC Grandparent Scam Corpus
- **Input Text:** "Emergency: Grandma is in the hospital and needs 2 Google Play gift cards ($100 each) for treatment deposit. Text me the codes immediately."
- **Expected:** Critical (IsScam: true)
- **Predicted:** Low (Probability: 20%, Confidence: 89%)
- **Detectors Triggered:** Brand Impersonation, Urgency Detector
- **Red Flags:** The message references google with urgent language. Scammers exploit brand trust to create false urgency. However, urgency alone with a brand name is only a moderate signal — some legitimate notifications (shipping deadlines, payment reminders) also use time pressure.; The message uses time-pressure language alongside a request that could be suspicious. Even mild urgency ("today", "immediately") becomes a risk signal when paired with requests for credentials, payments, or account actions.
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Gift Card Scam"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Gift Card Scam.

---
### 9. [sms-uci-052] Prize / Lottery Smishing (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "URGENT! You have won a 1 week FREE membership in our £100,000 Prize Jackpot! Txt CLAIM to 81010"
- **Expected:** High (IsScam: true)
- **Predicted:** Low (Probability: 24%, Confidence: 89%)
- **Detectors Triggered:** Urgency Detector, Reward Detector
- **Red Flags:** The message uses mild time-pressure language. This is common in both legitimate and scam communications. On its own, urgency is a weak signal — it becomes more concerning when combined with requests for sensitive information or suspicious links.; The message promises an unexpected reward, prize, or windfall. This exploits the "reciprocity" and "greed" psychological levers — you feel excited about winning and are willing to overlook red flags. Legitimate sweepstakes never ask for fees, personal information, or gift card codes to claim prizes.
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Prize / Lottery Smishing"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Prize / Lottery Smishing.

---
### 10. [sms-uci-053] Premium Rate SMS (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "XXXMobileMovieClub: To use your credit, click the WAP link in the next txt or call 08701230046"
- **Expected:** High (IsScam: true)
- **Predicted:** Very Low (Probability: 0%, Confidence: 88%)
- **Detectors Triggered:** None
- **Red Flags:** None
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Premium Rate SMS"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Premium Rate SMS.

---
### 11. [sms-uci-054] Premium Rate SMS (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "England v Macedonia - dont miss the goals/team news. Txt ur national team to 87077 eg ENGLAND to 87077 Try:WALES, SCOTLAND 4txt/ú1.20 POBoxbox36650145215b16"
- **Expected:** High (IsScam: true)
- **Predicted:** Very Low (Probability: 7%, Confidence: 82%)
- **Detectors Triggered:** Language Quality Detector
- **Red Flags:** The message contains unusual formatting patterns (excessive capitalization, repeated punctuation, or erratic style) that are statistically more common in scam communications. While poor formatting alone does not confirm a scam, it is a supporting indicator when combined with other red flags.
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Premium Rate SMS"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Premium Rate SMS.

---
### 12. [sms-uci-055] Subscription Smishing (SMS)
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
### 13. [sms-uci-056] Prize / Lottery Smishing (SMS)
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
### 14. [sms-uci-057] Prize / Lottery Smishing (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "Please call our customer service line on 08000930705 to claim your free video camera phone now!"
- **Expected:** High (IsScam: true)
- **Predicted:** Very Low (Probability: 0%, Confidence: 88%)
- **Detectors Triggered:** None
- **Red Flags:** None
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Prize / Lottery Smishing"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Prize / Lottery Smishing.

---
### 15. [sms-uci-058] Premium Rate SMS (SMS)
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
### 16. [sms-uci-059] Prize / Lottery Smishing (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "URGENT! Your Mobile number has been awarded a £2000 prize. Call 09061221061 to claim."
- **Expected:** High (IsScam: true)
- **Predicted:** Low (Probability: 24%, Confidence: 88%)
- **Detectors Triggered:** Urgency Detector, Reward Detector
- **Red Flags:** The message uses mild time-pressure language. This is common in both legitimate and scam communications. On its own, urgency is a weak signal — it becomes more concerning when combined with requests for sensitive information or suspicious links.; The message promises an unexpected reward, prize, or windfall. This exploits the "reciprocity" and "greed" psychological levers — you feel excited about winning and are willing to overlook red flags. Legitimate sweepstakes never ask for fees, personal information, or gift card codes to claim prizes.
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Prize / Lottery Smishing"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Prize / Lottery Smishing.

---
### 17. [sms-uci-060] Prize / Lottery Smishing (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "Congrats! 2 Mobile 3G Phones & £400 cash. Call 09063440451 now. 150p/min"
- **Expected:** High (IsScam: true)
- **Predicted:** Low (Probability: 20%, Confidence: 81%)
- **Detectors Triggered:** Reward Detector
- **Red Flags:** The message promises an unexpected reward, prize, or windfall. This exploits the "reciprocity" and "greed" psychological levers — you feel excited about winning and are willing to overlook red flags. Legitimate sweepstakes never ask for fees, personal information, or gift card codes to claim prizes.
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Prize / Lottery Smishing"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Prize / Lottery Smishing.

---
### 18. [sms-uci-063] Prize / Lottery Smishing (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "Free entry in a £10,000 cash draw! Text WIN to 80082 now to enter. 18+ only."
- **Expected:** High (IsScam: true)
- **Predicted:** Low (Probability: 20%, Confidence: 82%)
- **Detectors Triggered:** Reward Detector
- **Red Flags:** The message promises an unexpected reward, prize, or windfall. This exploits the "reciprocity" and "greed" psychological levers — you feel excited about winning and are willing to overlook red flags. Legitimate sweepstakes never ask for fees, personal information, or gift card codes to claim prizes.
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Prize / Lottery Smishing"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Prize / Lottery Smishing.

---
### 19. [sms-uci-064] Financial Smishing (SMS)
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
### 20. [sms-uci-065] Premium Rate SMS (SMS)
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
### 21. [sms-uci-066] Premium Rate SMS (SMS)
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
### 22. [sms-uci-067] Financial Smishing (SMS)
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
### 23. [sms-uci-068] Prize / Lottery Smishing (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "Congratulations! You have been selected for a £500 shopping voucher. Reply YES to 88010."
- **Expected:** High (IsScam: true)
- **Predicted:** Low (Probability: 20%, Confidence: 81%)
- **Detectors Triggered:** Reward Detector
- **Red Flags:** The message promises an unexpected reward, prize, or windfall. This exploits the "reciprocity" and "greed" psychological levers — you feel excited about winning and are willing to overlook red flags. Legitimate sweepstakes never ask for fees, personal information, or gift card codes to claim prizes.
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Prize / Lottery Smishing"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Prize / Lottery Smishing.

---
### 24. [sms-uci-072] Bank Smishing (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "Bank Alert: $450 transfer authorized from your account. If not you, call 080088921 immediately."
- **Expected:** High (IsScam: true)
- **Predicted:** Very Low (Probability: 4%, Confidence: 81%)
- **Detectors Triggered:** Urgency Detector
- **Red Flags:** The message uses mild time-pressure language. This is common in both legitimate and scam communications. On its own, urgency is a weak signal — it becomes more concerning when combined with requests for sensitive information or suspicious links.
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Bank Smishing"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Bank Smishing.

---
### 25. [sms-uci-095] Prize Smishing (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "WhatsApp Reward: You have won $50,000 cash. Reply with bank account details to receive wire."
- **Expected:** High (IsScam: true)
- **Predicted:** Low (Probability: 20%, Confidence: 82%)
- **Detectors Triggered:** Reward Detector
- **Red Flags:** The message promises an unexpected reward, prize, or windfall. This exploits the "reciprocity" and "greed" psychological levers — you feel excited about winning and are willing to overlook red flags. Legitimate sweepstakes never ask for fees, personal information, or gift card codes to claim prizes.
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Prize Smishing"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Prize Smishing.

---
### 26. [sms-uci-096] Tech Support Smishing (SMS)
- **Dataset Source:** UCI SMS Spam Collection
- **Input Text:** "Microsoft Support: Virus detected on phone. Call 1-800-555-0199 for removal."
- **Expected:** High (IsScam: true)
- **Predicted:** Very Low (Probability: 0%, Confidence: 88%)
- **Detectors Triggered:** None
- **Red Flags:** None
- **Trust Signals:** None
- **Likely Cause of Failure:** Missed detection due to vocabulary edge case in "Tech Support Smishing"
- **Suggested Improvement:** Expand pattern coverage in relevant detector for Tech Support Smishing.

