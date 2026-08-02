import type { QuizQuestion } from '../types'

export const quizQuestions: QuizQuestion[] = [
  // ==========================================================================
  // LEVEL 1: INTERNET SAFETY BASICS (BEGINNER)
  // ==========================================================================
  {
    id: 1,
    prompt: 'You receive an email with a high-resolution Amazon logo stating your account is suspended. What is the safest first step?',
    options: ['Click the link to verify your password', 'Open your Amazon app or go to amazon.com directly', 'Reply to the email asking why', 'Forward to a friend'],
    answer: 'Open your Amazon app or go to amazon.com directly',
    explanation: 'Independent navigation to an official app or site prevents link spoofing.',
    category: 'Internet Safety Basics',
    difficulty: 'Beginner',
    levelId: 1
  },
  {
    id: 2,
    prompt: 'In the web address `http://paypal.verify-credentials.info/signin`, what is the root domain?',
    options: ['paypal.com', 'verify-credentials.info', 'paypal.verify-credentials', 'signin.com'],
    answer: 'verify-credentials.info',
    explanation: 'The root domain is the name immediately preceding .info, which is verify-credentials.info (NOT paypal.com).',
    category: 'Internet Safety Basics',
    difficulty: 'Beginner',
    levelId: 1
  },
  {
    id: 3,
    prompt: 'Why is reusing the same password across multiple websites dangerous?',
    options: ['It slows down your computer', 'A data breach on one site allows hackers to unlock your other accounts', 'Password managers don\'t like it', 'Websites block reused passwords'],
    answer: 'A data breach on one site allows hackers to unlock your other accounts',
    explanation: 'Credential stuffing attacks test stolen email/password pairs across thousands of popular services.',
    category: 'Internet Safety Basics',
    difficulty: 'Beginner',
    levelId: 1
  },
  {
    id: 4,
    prompt: 'What makes authenticator apps safer than SMS text messages for 2FA?',
    options: ['Apps work offline', 'Authenticator apps are immune to SIM-swapping and SMS interception', 'Texts cost money', 'Apps look nicer'],
    answer: 'Authenticator apps are immune to SIM-swapping and SMS interception',
    explanation: 'SMS 2FA can be intercepted via carrier SIM swapping, while authenticator apps generate offline time-based codes on your device.',
    category: 'Internet Safety Basics',
    difficulty: 'Beginner',
    levelId: 1
  },
  {
    id: 5,
    prompt: 'Why should you avoid downloading software from sponsored top search engine ads?',
    options: ['Ads are slow', 'Scammers buy search ads pointing to malware installers (malvertising)', 'Ads use too much data', 'Search ads require credit cards'],
    answer: 'Scammers buy search ads pointing to malware installers (malvertising)',
    explanation: 'Malvertising campaigns place malicious links at the top of search engine results for popular software.',
    category: 'Internet Safety Basics',
    difficulty: 'Beginner',
    levelId: 1
  },

  // ==========================================================================
  // LEVEL 2: EMAIL PHISHING DEFENSE (INTERMEDIATE)
  // ==========================================================================
  {
    id: 6,
    prompt: 'An email display name reads "Geek Squad Support", but the email address is `billing@x92-service-host.net`. What does this indicate?',
    options: ['A legitimate third-party vendor', 'Display name spoofing in a phishing email', 'A normal email update', 'An encrypted message'],
    answer: 'Display name spoofing in a phishing email',
    explanation: 'Anyone can customize their display name to say any company name. The domain `x92-service-host.net` reveals the real untrusted sender.',
    category: 'Email Phishing',
    difficulty: 'Intermediate',
    levelId: 2
  },
  {
    id: 7,
    prompt: 'You receive an unexpected email invoice for a $999 Norton Security purchase listing a phone number to call to cancel. What is the scam strategy?',
    options: ['To bill your card', 'To panic you into calling their fake support number so they can attempt remote access or gift card fraud', 'To send you software', 'To confirm your address'],
    answer: 'To panic you into calling their fake support number so they can attempt remote access or gift card fraud',
    explanation: 'Reverse-phishing call-me lures use fake financial panic to get victims on the phone.',
    category: 'Email Phishing',
    difficulty: 'Intermediate',
    levelId: 2
  },
  {
    id: 8,
    prompt: 'An email claims your Netflix subscription will be terminated in 24 hours due to payment failure. How should you verify?',
    options: ['Click the email update link', 'Open the Netflix app directly and check Account Settings', 'Reply with your credit card', 'Forward to Netflix'],
    answer: 'Open the Netflix app directly and check Account Settings',
    explanation: 'Verifying account status inside the official app prevents link spoofing.',
    category: 'Email Phishing',
    difficulty: 'Intermediate',
    levelId: 2
  },
  {
    id: 9,
    prompt: 'Why do phishers send shared Google Drive or OneDrive document notifications?',
    options: ['It is cheap', 'Real cloud share emails bypass spam filters because they originate from real Google/Microsoft servers', 'It opens faster', 'Cloud links cannot be blocked'],
    answer: 'Real cloud share emails bypass spam filters because they originate from real Google/Microsoft servers',
    explanation: 'The initial notification is delivered by real cloud infrastructure, but the document contains a link to a phishing portal.',
    category: 'Email Phishing',
    difficulty: 'Intermediate',
    levelId: 2
  },
  {
    id: 10,
    prompt: 'An email contains an attached file named `Invoice_2026.pdf.exe`. Why is this dangerous?',
    options: ['PDFs are slow', 'It is an executable malware program disguised with a double file extension', 'It uses too much memory', 'It changes your wallpaper'],
    answer: 'It is an executable malware program disguised with a double file extension',
    explanation: 'Windows hides known extensions by default, making `.pdf.exe` look like a safe PDF when it is actually an executable file.',
    category: 'Email Phishing',
    difficulty: 'Intermediate',
    levelId: 2
  },

  // ==========================================================================
  // LEVEL 3: SMS, MESSAGING & QR SCAMS (INTERMEDIATE)
  // ==========================================================================
  {
    id: 11,
    prompt: 'You receive a text: "USPS: Package on hold due to wrong address. Update at bit.ly/3x9821". What is the red flag?',
    options: ['USPS uses texts', 'The link is a shortened URL (bit.ly) instead of the official usps.com domain', 'Texts are short', 'It arrived at night'],
    answer: 'The link is a shortened URL (bit.ly) instead of the official usps.com domain',
    explanation: 'Legitimate postal carriers link to their own official domains, not anonymous link shorteners.',
    category: 'Smishing',
    difficulty: 'Intermediate',
    levelId: 3
  },
  {
    id: 12,
    prompt: 'What is a "Quishing" attack?',
    options: ['A phishing phone call', 'A scam where malicious links are embedded in QR codes on flyers, emails, or stickers', 'A quiet email', 'A virus scan'],
    answer: 'A scam where malicious links are embedded in QR codes on flyers, emails, or stickers',
    explanation: 'Quishing uses QR codes to hide malicious URLs from traditional email text filters and mobile users.',
    category: 'QR Scams',
    difficulty: 'Intermediate',
    levelId: 3
  },
  {
    id: 13,
    prompt: 'You receive a text: "Hi Anna, are we still meeting for lunch? Oh wrong number? You seem nice, what is your name?" What scam pattern is this?',
    options: ['A wrong number', 'A wrong-number conversational hook used in pig-butchering romance/crypto scams', 'A friend prank', 'A survey'],
    answer: 'A wrong-number conversational hook used in pig-butchering romance/crypto scams',
    explanation: 'Scammers use polite wrong-number texts to build rapport before introducing fraudulent crypto investments.',
    category: 'Wrong Number Scams',
    difficulty: 'Intermediate',
    levelId: 3
  },

  // ==========================================================================
  // LEVEL 4: FINANCIAL & BANKING SCAMS (ADVANCED)
  // ==========================================================================
  {
    id: 14,
    prompt: 'A caller claiming to be Chase Fraud Prevention asks for the 6-digit code sent to your phone to "stop a fraudulent $500 transfer". What should you do?',
    options: ['Give the code', 'Hang up immediately — real banks never ask for your 2FA security code', 'Give half the code', 'Ask for their badge number'],
    answer: 'Hang up immediately — real banks never ask for your 2FA security code',
    explanation: 'Scammers trigger password resets or transfers and ask you to read out the 2FA code so they can log into your account.',
    category: 'Bank Scams',
    difficulty: 'Advanced',
    levelId: 4
  },
  {
    id: 15,
    prompt: 'Why do scammers demand payment in gift cards (Apple, Google Play, Steam)?',
    options: ['Gift cards are pretty', 'Gift card codes act like instant untraceable cash with zero chargeback protection', 'Gift cards never expire', 'Stores prefer them'],
    answer: 'Gift card codes act like instant untraceable cash with zero chargeback protection',
    explanation: 'Once gift card PINs are shared, the funds are drained immediately and cannot be reversed by banks.',
    category: 'Gift Card Scams',
    difficulty: 'Advanced',
    levelId: 4
  },
  {
    id: 16,
    prompt: 'You receive a payment notification on Zelle for $300, followed by a message: "I sent you money by mistake, please send it back!" What is the risk?',
    options: ['Zelle is slow', 'The original $300 was sent from a stolen account and will be reversed, leaving you out $300 of your own money', 'No risk', 'Zelle fees'],
    answer: 'The original $300 was sent from a stolen account and will be reversed, leaving you out $300 of your own money',
    explanation: 'Overpayment and accidental transfer scams use stolen funds that banks eventually claw back from your balance.',
    category: 'Financial Scams',
    difficulty: 'Advanced',
    levelId: 4
  },

  // ==========================================================================
  // LEVEL 5: SOCIAL ENGINEERING (ADVANCED)
  // ==========================================================================
  {
    id: 17,
    prompt: 'An email appearing to come from your company CEO asks you to urgently buy 5 gift cards for a client meeting. How should you verify?',
    options: ['Buy the cards', 'Call or speak to the CEO in person via an established secondary channel', 'Reply to the email', 'Post on Slack'],
    answer: 'Call or speak to the CEO in person via an established secondary channel',
    explanation: 'Executive impersonation (BEC) relies on urgency and authority. Out-of-band verbal verification stops the attack.',
    category: 'Business Email Compromise',
    difficulty: 'Advanced',
    levelId: 5
  },
  {
    id: 18,
    prompt: 'A caller claiming to be an IRS agent threatens arrest within 30 minutes unless back taxes are paid via wire transfer. Is this real?',
    options: ['Yes, IRS arrests people', 'No, the IRS contacts taxpayers by US Mail first and never demands immediate wire or gift card payments', 'Yes, if they have your name', 'Maybe'],
    answer: 'No, the IRS contacts taxpayers by US Mail first and never demands immediate wire or gift card payments',
    explanation: 'Real government agencies communicate through official written mail and provide formal administrative appeal processes.',
    category: 'Government Impersonation',
    difficulty: 'Advanced',
    levelId: 5
  },

  // ==========================================================================
  // LEVEL 6: AI-GENERATED & NEXT-GEN SCAMS (ADVANCED)
  // ==========================================================================
  {
    id: 19,
    prompt: 'You receive a frantic call in your daughter\'s exact voice crying that she was in an accident and needs bail money wired. What is the best defense?',
    options: ['Wire money immediately', 'Ask for the secret family safe word and call her primary phone number directly', 'Cry back', 'Call 911'],
    answer: 'Ask for the secret family safe word and call her primary phone number directly',
    explanation: 'AI voice cloning requires only seconds of audio. Pre-agreed family safe words defeat voice cloning scams.',
    category: 'AI-Generated Scams',
    difficulty: 'Advanced',
    levelId: 6
  },
  {
    id: 20,
    prompt: 'What is an "MFA Fatigue" (Prompt Bombing) attack?',
    options: ['Getting tired of typing passwords', 'An attacker repeatedly triggering 2FA push notifications hoping you tap Approve out of frustration', 'A phone battery drain', 'A slow app'],
    answer: 'An attacker repeatedly triggering 2FA push notifications hoping you tap Approve out of frustration',
    explanation: 'Attackers who already have your password send dozens of push notifications at night to wear down your vigilance.',
    category: 'AI-Generated Scams',
    difficulty: 'Advanced',
    levelId: 6
  },

  // ==========================================================================
  // LEVEL 7: ADVANCED THREATS & CRYPTO (ADVANCED)
  // ==========================================================================
  {
    id: 21,
    prompt: 'When is it safe to type your 12-word cryptocurrency recovery seed phrase into a website or web form?',
    options: ['During wallet updates', 'NEVER — seed phrases must only be stored offline and never typed on any website', 'During airdrops', 'For customer support'],
    answer: 'NEVER — seed phrases must only be stored offline and never typed on any website',
    explanation: 'Any website or person asking for a seed phrase is 100% attempting to steal all assets in the wallet.',
    category: 'Cryptocurrency Scams',
    difficulty: 'Advanced',
    levelId: 7
  },
  {
    id: 22,
    prompt: 'What happens during a SIM Swapping attack?',
    options: ['Your phone screen breaks', 'Scammers trick your mobile carrier into transferring your phone number to their SIM card to intercept 2FA texts', 'Your SIM gets dirty', 'Your Wi-Fi disconnects'],
    answer: 'Scammers trick your mobile carrier into transferring your phone number to their SIM card to intercept 2FA texts',
    explanation: 'SIM swapping gives attackers control over your phone number, allowing them to reset passwords via SMS 2FA.',
    category: 'Advanced Threats',
    difficulty: 'Advanced',
    levelId: 7
  }
]
