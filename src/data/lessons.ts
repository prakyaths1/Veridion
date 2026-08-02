import type { CurriculumLevel, Lesson } from '../types'

export const curriculumLevels: CurriculumLevel[] = [
  {
    id: 1,
    title: 'Level 1: Internet Safety Basics',
    description: 'Master core digital hygiene, verifiable trust signals, and basic online safety habits.',
    icon: '🛡️',
    badgeName: 'Digital Defender',
    unitsCount: 8,
    minXpToUnlock: 0,
  },
  {
    id: 2,
    title: 'Level 2: Email Phishing Defense',
    description: 'Learn to dissect deceptive emails, brand copycats, spoofed headers, and attachment lures.',
    icon: '✉️',
    badgeName: 'Phishing Guardian',
    unitsCount: 10,
    minXpToUnlock: 150,
  },
  {
    id: 3,
    title: 'Level 3: SMS, Messaging & QR Scams',
    description: 'Deconstruct smishing, quishing (QR code traps), wrong-number hooks, and short-code exploits.',
    icon: '📱',
    badgeName: 'Smishing Sentinel',
    unitsCount: 10,
    minXpToUnlock: 350,
  },
  {
    id: 4,
    title: 'Level 4: Financial & Banking Scams',
    description: 'Protect your accounts against bank fraud alerts, gift card coercion, P2P scams, and wire fraud.',
    icon: '💳',
    badgeName: 'Financial Fortress',
    unitsCount: 10,
    minXpToUnlock: 600,
  },
  {
    id: 5,
    title: 'Level 5: Social Engineering & Human Hacking',
    description: 'Master defense against IRS threats, BEC/CEO fraud, romance scams, and fake job offers.',
    icon: '🧠',
    badgeName: 'Mind Shield',
    unitsCount: 10,
    minXpToUnlock: 900,
  },
  {
    id: 6,
    title: 'Level 6: AI-Generated & Next-Gen Scams',
    description: 'Defend against AI voice cloning, deepfake video calls, quishing, and malvertising.',
    icon: '🤖',
    badgeName: 'AI Sentinel',
    unitsCount: 8,
    minXpToUnlock: 1250,
  },
  {
    id: 7,
    title: 'Level 7: Advanced Threats, Crypto & Incident Response',
    description: 'Web3 wallet defense, SIM swapping, credit freezes, and federal incident reporting.',
    icon: '👑',
    badgeName: 'Cyber Guardian',
    unitsCount: 8,
    minXpToUnlock: 1650,
  },
]

export const lessons: Lesson[] = [
  // ==========================================================================
  // LEVEL 1: INTERNET SAFETY BASICS (8 UNITS)
  // ==========================================================================
  {
    id: 'unit-1-1',
    levelId: 1,
    unitNumber: '1.1',
    title: 'Fundamentals of Digital Trust & Verifiable Signals',
    category: 'Internet Safety Basics',
    difficulty: 'Beginner',
    readTime: '3 min',
    reward: 35,
    summary: 'Learn how to separate real security signals from forged visual elements.',
    detail: 'Visual elements like logos, colors, and footers can be copied in minutes. Real trust comes from independent verification.',
    objectives: [
      'Recognize why visual logos do not equal authenticity.',
      'Understand independent verification channels.',
      'Establish a 5-second pause habit before taking action.'
    ],
    explanation: 'Scammers rely on visual familiarity to trick your brain into feeling safe. An email with an official Amazon or Chase logo looks legitimate at a glance, but logos can be downloaded by anyone.',
    psychology: 'System 1 thinking relies on visual heuristics. When you see a familiar logo, your brain shortcuts the verification process.',
    scamExamples: [
      'An email with a high-resolution bank logo asking you to click to confirm your SSN.',
      'A pop-up message styled like a Windows system dialogue warning of virus infection.'
    ],
    legitExamples: [
      'Your bank notifying you via in-app message accessible when logging in independently.',
      'An official shipping email pointing to a verified domain like amazon.com.'
    ],
    redFlags: [
      'Unsolicited requests to confirm sensitive data',
      'Mismatch between sender name and actual email domain',
      'High-pressure emotional tone'
    ],
    protection: [
      'Always navigate to websites independently by typing the URL.',
      'Use official mobile apps instead of clicking links in unexpected messages.',
      'Verify unexpected communications through known secondary channels.'
    ],
    mistakes: [
      'Assuming a polished logo proves the message is real.',
      'Clicking links inside unexpected security warning messages.'
    ],
    takeaways: [
      'Logos are public graphics, not security certificates.',
      'Independent verification is the ultimate safety habit.'
    ],
    quiz: [
      {
        prompt: 'Why is a high-resolution company logo not proof of a legitimate message?',
        options: ['Logos can be easily copied by anyone', 'Scammers cannot copy logos', 'Logos are encrypted', 'Only real companies can send logos'],
        answer: 'Logos can be easily copied by anyone',
        explanation: 'Logos are public graphics on the internet that anyone can save and embed into an email.'
      },
      {
        prompt: 'What is the safest way to respond to an unexpected security warning from your bank?',
        options: ['Click the link in the message', 'Open your bank app independently', 'Reply to the email', 'Ignore it forever'],
        answer: 'Open your bank app independently',
        explanation: 'Navigating directly to your trusted app or website prevents link spoofing.'
      }
    ]
  },
  {
    id: 'unit-1-2',
    levelId: 1,
    unitNumber: '1.2',
    title: 'Password Security & Multi-Factor Authentication',
    category: 'Internet Safety Basics',
    difficulty: 'Beginner',
    readTime: '4 min',
    reward: 40,
    summary: 'Build unhackable authentication habits with password managers and 2FA.',
    detail: 'Reusing passwords across sites is the #1 cause of account takeover via credential stuffing.',
    objectives: [
      'Understand how credential stuffing attacks work.',
      'Learn why 2FA is mandatory for financial and primary email accounts.',
      'Distinguish SMS 2FA from Authenticator App 2FA.'
    ],
    explanation: 'When one site suffers a data breach, hackers test those email/password pairs across thousands of other services.',
    psychology: 'Convenience bias makes people reuse simple passwords across dozens of accounts.',
    scamExamples: [
      'A fake login page asking for your 2FA verification code right after you type your password.'
    ],
    legitExamples: [
      'A prompt in your authenticator app generating a time-based code every 30 seconds.'
    ],
    redFlags: [
      'Reusing the same password on multiple websites',
      'Sharing 2FA codes with anyone claiming to be support'
    ],
    protection: [
      'Use a dedicated password manager to generate unique 16+ character passwords.',
      'Enable 2FA (Authenticator app or Security key) on all primary accounts.'
    ],
    mistakes: [
      'Giving a 2FA code to a caller or text support agent.',
      'Using common words or personal dates in passwords.'
    ],
    takeaways: [
      'Unique passwords isolate breaches.',
      'Never share 2FA passcodes with anyone.'
    ],
    quiz: [
      {
        prompt: 'What happens in a credential stuffing attack?',
        options: ['Hackers guess your name', 'Hackers test stolen password lists across multiple websites', 'Hackers virus your computer', 'Hackers steal your phone number'],
        answer: 'Hackers test stolen password lists across multiple websites',
        explanation: 'Reused passwords allow breached credentials from one site to unlock your other accounts.'
      }
    ]
  },
  {
    id: 'unit-1-3',
    levelId: 1,
    unitNumber: '1.3',
    title: 'Spotting Fake Domains & URL Dissection',
    category: 'Internet Safety Basics',
    difficulty: 'Beginner',
    readTime: '4 min',
    reward: 40,
    summary: 'Master reading domain names from right to left to expose typosquatting.',
    detail: 'Learn to read domain structures like a security researcher to catch subtle lookalike domains.',
    objectives: [
      'Identify the root domain in complex URLs.',
      'Spot homoglyph attacks (micr0soft vs microsoft).',
      'Recognize sub-domain spoofing tricks.'
    ],
    explanation: 'In a domain like `chase.com.security-login.xyz`, the actual domain is `security-login.xyz`, NOT Chase.',
    psychology: 'Left-to-right reading bias causes people to stop reading after seeing a familiar brand name at the start of a URL.',
    scamExamples: ['http://paypal.account-verify.info/login', 'https://amazon-support-login.com'],
    legitExamples: ['https://www.paypal.com/signin', 'https://www.amazon.com/gp/your-account'],
    redFlags: ['Subdomain brand placement', 'Hyphenated domain stuffing', 'Suspicious TLDs (.xyz, .info, .top)'],
    protection: ['Look at the characters right before the top-level domain (.com, .org).'],
    mistakes: ['Believing a link is safe because it contains the word "paypal" anywhere in the text.'],
    takeaways: ['The root domain is immediately to the left of the .com extension.'],
    quiz: [
      {
        prompt: 'In the URL `http://chase.bank-verify-security.com/login`, what is the actual destination domain?',
        options: ['chase.com', 'bank-verify-security.com', 'chase.bank', 'login.com'],
        answer: 'bank-verify-security.com',
        explanation: 'The root domain is the word immediately preceding .com, which is bank-verify-security.com.'
      }
    ]
  },
  {
    id: 'unit-1-4',
    levelId: 1,
    unitNumber: '1.4',
    title: 'Safe Browsing & Extension Security',
    category: 'Internet Safety Basics',
    difficulty: 'Beginner',
    readTime: '3 min',
    reward: 35,
    summary: 'Audit browser extensions and recognize malicious search ads.',
    detail: 'Malicious browser extensions can read your typed keystrokes and hijack session cookies.',
    objectives: ['Audit browser extension permissions.', 'Recognize malvertising search results.'],
    explanation: 'Scammers buy search engine ads for popular software downloads (e.g. VLC, Zoom) that point to malware installers.',
    psychology: 'Search engine trust bias causes users to click the top result without checking if it is an "Ad".',
    scamExamples: ['A search ad for "Download Zoom" pointing to zoom-installer-download.net'],
    legitExamples: ['Navigating directly to zoom.us to download official software'],
    redFlags: ['Browser extensions asking for "Read and change all data on all websites"'],
    protection: ['Only install extensions from verified publishers with millions of reviews.'],
    mistakes: ['Clicking sponsored search ad links for software downloads.'],
    takeaways: ['Verify search result URLs before downloading installer files.'],
    quiz: [
      {
        prompt: 'Why should you avoid clicking "Sponsored" top search results for software downloads?',
        options: ['Ads cost money', 'Scammers buy search ads pointing to malware installers', 'Ads are slow', 'Search ads don\'t work'],
        answer: 'Scammers buy search ads pointing to malware installers',
        explanation: 'Malvertising campaigns frequently place fake software download ads at the top of search results.'
      }
    ]
  },
  {
    id: 'unit-1-5',
    levelId: 1,
    unitNumber: '1.5',
    title: 'Social Media Privacy & Oversharing Risks',
    category: 'Internet Safety Basics',
    difficulty: 'Beginner',
    readTime: '3 min',
    reward: 35,
    summary: 'Understand how public social media posts fuel targeted spear-phishing.',
    detail: 'Vacation posts, pet names, and workplace badges provide scammers with answer keys for security questions.',
    objectives: ['Identify security risks in casual public posts.'],
    explanation: 'Scammers use open-source intelligence (OSINT) from your social profiles to craft customized lures.',
    psychology: 'Social validation drives oversharing of personal milestones.',
    scamExamples: ['A scammer calling claiming to be your hotel while you are on vacation after seeing your Instagram story.'],
    legitExamples: ['Posting vacation photos after returning home.'],
    redFlags: ['Public quizzes asking for mother\'s maiden name or first car.'],
    protection: ['Set social profiles to private and avoid sharing location in real-time.'],
    mistakes: ['Participating in viral social media memory quizzes.'],
    takeaways: ['Information shared publicly can be used against you in spear-phishing.'],
    quiz: [
      {
        prompt: 'How do scammers use public vacation posts against you?',
        options: ['They steal your photos', 'They know you are away from home and craft urgent travel/hotel lures', 'They send you postcards', 'They follow your account'],
        answer: 'They know you are away from home and craft urgent travel/hotel lures',
        explanation: 'Real-time location sharing alerts scammers that you are traveling and vulnerable to urgent pretexts.'
      }
    ]
  },
  {
    id: 'unit-1-6',
    levelId: 1,
    unitNumber: '1.6',
    title: 'Public Wi-Fi & Network Encryption',
    category: 'Internet Safety Basics',
    difficulty: 'Beginner',
    readTime: '3 min',
    reward: 35,
    summary: 'Protect credentials on unencrypted airport and coffee shop Wi-Fi networks.',
    detail: 'Rogue Wi-Fi hotspots ("Evil Twin" networks) intercept unencrypted HTTP traffic.',
    objectives: ['Understand HTTPS encryption vs HTTP.', 'Recognize Evil Twin Wi-Fi access points.'],
    explanation: 'Connecting to free public Wi-Fi without HTTPS or a VPN exposes your network traffic to eavesdropping.',
    psychology: 'Free access bias leads users to connect to open Wi-Fi without verifying network authenticity.',
    scamExamples: ['An open Wi-Fi network named "Airport_Free_WiFi_Guest" operated by a hacker.'],
    legitExamples: ['Connecting through your cellular hotspot or using an encrypted VPN on public Wi-Fi.'],
    redFlags: ['Public Wi-Fi networks asking you to install a security certificate to connect.'],
    protection: ['Ensure websites use HTTPS (padlock icon) before entering passwords.'],
    mistakes: ['Conducting online banking on unverified open public Wi-Fi.'],
    takeaways: ['Use cellular data or VPNs for sensitive transactions on public networks.'],
    quiz: [
      {
        prompt: 'What is an "Evil Twin" Wi-Fi network?',
        options: ['A double router', 'A rogue Wi-Fi hotspot named to mimic a legitimate public network', 'A fast internet connection', 'A virus download'],
        answer: 'A rogue Wi-Fi hotspot named to mimic a legitimate public network',
        explanation: 'Scammers set up fake open Wi-Fi access points in public areas to intercept user network traffic.'
      }
    ]
  },
  {
    id: 'unit-1-7',
    levelId: 1,
    unitNumber: '1.7',
    title: 'Cloud Storage & Document Sharing Safety',
    category: 'Internet Safety Basics',
    difficulty: 'Beginner',
    readTime: '3 min',
    reward: 35,
    summary: 'Safely handle Google Drive, Dropbox, and OneDrive shared file notifications.',
    detail: 'Phishers send genuine Google Drive share notifications containing links to fake login portals.',
    objectives: ['Identify document sharing lure mechanics.'],
    explanation: 'Scammers leverage real cloud service infrastructure to bypass email filters with shared document links.',
    psychology: 'Curiosity bias pushes users to click shared document notifications.',
    scamExamples: ['A Google Drive document notification titled "Executive Payroll 2026.pdf" linking to a fake Microsoft login.'],
    legitExamples: ['An expected document share from a known colleague email address.'],
    redFlags: ['Shared documents from unfamiliar Gmail/Outlook addresses asking for login to view.'],
    protection: ['Verify document sharing requests with the sender via chat/slack before opening.'],
    mistakes: ['Entering credentials on an external site after opening a shared PDF.'],
    takeaways: ['Cloud document links can host phishing portals.'],
    quiz: [
      {
        prompt: 'Why do phishers use legitimate Google Drive sharing notifications?',
        options: ['It is free', 'Real cloud notifications bypass spam filters', 'Google requires it', 'It makes files load faster'],
        answer: 'Real cloud notifications bypass spam filters',
        explanation: 'Because the email comes from Google\'s official servers, spam filters allow the message into your inbox.'
      }
    ]
  },
  {
    id: 'unit-1-8',
    levelId: 1,
    unitNumber: '1.8',
    title: 'Level 1 Boss Challenge: Digital Safety Placement Test',
    category: 'Internet Safety Basics',
    difficulty: 'Intermediate',
    readTime: '5 min',
    reward: 100,
    isBossChallenge: true,
    summary: 'Demonstrate mastery of Internet Safety Basics to unlock Level 2: Email Phishing Defense!',
    detail: 'Comprehensive evaluation of digital trust signals, URL dissection, password security, and safe browsing habits.',
    objectives: ['Score 100% on core internet safety scenarios to graduate Level 1.'],
    explanation: 'Congratulations on reaching the Level 1 Boss Challenge! Prove your baseline cyber hygiene skills across 4 realistic scenarios.',
    psychology: 'Mastery testing solidifies behavioral recall.',
    scamExamples: ['Scenario: You receive an urgent email from support@chase-secure-update.info.'],
    legitExamples: ['Scenario: Logged into Chase mobile app directly to check alert status.'],
    redFlags: ['Hyphenated domain stuffing', 'Premature urgency', 'Unverified links'],
    protection: ['Independent verification channel', 'Password manager usage'],
    mistakes: ['Rushing through verification'],
    takeaways: ['Level 1 completed! You are ready for Level 2 Email Phishing Defense.'],
    quiz: [
      {
        prompt: 'Which URL is genuine for PayPal security updates?',
        options: ['https://www.paypal.com/security', 'http://paypal-security-update.com', 'https://paypal.verify-account.info', 'http://secure-paypal-login.xyz'],
        answer: 'https://www.paypal.com/security',
        explanation: 'Only paypal.com is the official registered root domain.'
      },
      {
        prompt: 'What is the most effective protection against credential stuffing attacks?',
        options: ['Changing wallpaper', 'Using unique passwords for every site via a password manager + 2FA', 'Deleting search history', 'Using public Wi-Fi'],
        answer: 'Using unique passwords for every site via a password manager + 2FA',
        explanation: 'Unique passwords prevent a breach on one site from endangering your other accounts.'
      }
    ]
  },

  // ==========================================================================
  // LEVEL 2: EMAIL PHISHING DEFENSE (10 UNITS)
  // ==========================================================================
  {
    id: 'unit-2-1',
    levelId: 2,
    unitNumber: '2.1',
    title: 'Anatomy of a Phishing Email',
    category: 'Email Phishing',
    difficulty: 'Beginner',
    readTime: '4 min',
    reward: 40,
    summary: 'Deconstruct the 4 core components of every phishing email.',
    detail: 'Learn to dissect the Display Name, Envelope Sender, Call-to-Action, and Hyperlink Destination.',
    objectives: ['Map the 4 components of email headers.', 'Distinguish display name spoofing from domain alignment.'],
    explanation: 'An email display name can read "Amazon Security", while the actual sender email address behind it is `support@x92-mailer-host.net`.',
    psychology: 'Display name trust bias causes people to read the friendly name and ignore the actual email address.',
    scamExamples: ['Display Name: "Geek Squad Support" <sender: info@random-domain-server.com>'],
    legitExamples: ['Display Name: "Geek Squad Support" <sender: geeksquad@bestbuy.com>'],
    redFlags: ['Display name mismatch with domain', 'Generic greeting "Dear Customer"', 'Threat of account termination'],
    protection: ['Hover over the sender name to inspect the full email address domain.'],
    mistakes: ['Trusting the display name without expanding the sender details.'],
    takeaways: ['The email address domain matters; the display name is just customizable text.'],
    quiz: [
      {
        prompt: 'If an email shows "Bank of America <security@bofa-alert-login.com>", what should you inspect?',
        options: ['The logo', 'The domain bofa-alert-login.com which is NOT bankofamerica.com', 'The font color', 'The email length'],
        answer: 'The domain bofa-alert-login.com which is NOT bankofamerica.com',
        explanation: 'Scammers register lookalike domains like bofa-alert-login.com to impersonate real institutions.'
      }
    ]
  },
  {
    id: 'unit-2-2',
    levelId: 2,
    unitNumber: '2.2',
    title: 'Brand Impersonation & Visual Copycats',
    category: 'Email Phishing',
    difficulty: 'Beginner',
    readTime: '4 min',
    reward: 40,
    summary: 'Defend against perfect visual clones of Amazon, Apple, and Google emails.',
    detail: 'Scammers copy exact HTML/CSS templates from real corporate emails.',
    objectives: ['Identify HTML visual cloning tactics.', 'Verify brand notifications via official portals.'],
    explanation: 'Pixel-perfect visual design can be duplicated in seconds. Never rely on aesthetics for safety.',
    psychology: 'Aesthetic usability effect makes visually attractive emails feel more trustworthy.',
    scamExamples: ['An Amazon order cancellation notice using official fonts and logos but linking to fake domain.'],
    legitExamples: ['An Amazon notification matching your order history in the official app.'],
    redFlags: ['Link destinations pointing away from official corporate domain.'],
    protection: ['Check your order history directly in the official shopping app.'],
    mistakes: ['Assuming clean typography equals safety.'],
    takeaways: ['Aesthetics can be duplicated; domain identity cannot.'],
    quiz: [
      {
        prompt: 'Why do phishers copy exact HTML email templates from major brands?',
        options: ['To speed up email delivery', 'To trick your brain into recognizing familiar brand styling', 'To pass spam filters', 'Because they own the brand'],
        answer: 'To trick your brain into recognizing familiar brand styling',
        explanation: 'Visual recognition creates an instant feeling of familiarity and trust.'
      }
    ]
  },
  {
    id: 'unit-2-3',
    levelId: 2,
    unitNumber: '2.3',
    title: 'Order Confirmations & Fake Receipt Lures',
    category: 'Email Phishing',
    difficulty: 'Beginner',
    readTime: '4 min',
    reward: 40,
    summary: 'Spot fake high-dollar purchase invoices designed to trigger panic calls.',
    detail: 'Fake $899 Geek Squad or Apple Watch invoices trick you into calling a phone scam line to "cancel".',
    objectives: ['Recognize reverse-phishing phone call-me lures in fake receipts.'],
    explanation: 'Rather than linking to a site, these emails list a phone number: "If you did not authorize this $999 charge, call support at 1-800-XXX".',
    psychology: 'Financial panic causes victims to call the scam phone number immediately.',
    scamExamples: ['Invoice receipt for $1,299 Norton Security with a phone number to call to cancel.'],
    legitExamples: ['Checking your credit card statement to verify if a charge actually occurred.'],
    redFlags: ['Urgent phone call prompt to cancel a charge you don\'t recognize.'],
    protection: ['Check your bank or credit card transaction history before panicking.'],
    mistakes: ['Calling the phone number listed inside an unexpected invoice.'],
    takeaways: ['If a charge is real, it will show on your credit card statement. Check your card first.'],
    quiz: [
      {
        prompt: 'What is the goal of a fake $999 invoice email with a support phone number?',
        options: ['To bill your card', 'To panic you into calling their fraudulent phone support line', 'To send you a product', 'To update your address'],
        answer: 'To panic you into calling their fraudulent phone support line',
        explanation: 'The phone number connects directly to scammers who attempt remote access or gift card fraud.'
      }
    ]
  },
  {
    id: 'unit-2-4',
    levelId: 2,
    unitNumber: '2.4',
    title: 'Subscription Renewal & Billing Expiration Traps',
    category: 'Email Phishing',
    difficulty: 'Beginner',
    readTime: '4 min',
    reward: 40,
    summary: 'Defend against Netflix, Spotify, and iCloud billing expiration phishing.',
    detail: 'Fake billing payment failure notifications harvest credit card details.',
    objectives: ['Verify subscription status through official billing settings.'],
    explanation: 'Messages claim "Your account will be terminated in 24 hours due to payment failure".',
    psychology: 'Fear of service disruption forces immediate action.',
    scamExamples: ['Netflix notice: "Payment declined. Update card at http://netflix-billing-update.com"'],
    legitExamples: ['Opening Netflix app directly and seeing account status in Settings.'],
    redFlags: ['24-hour account termination threat', 'Link pointing to non-official domain'],
    protection: ['Log into your account directly to check billing status.'],
    mistakes: ['Entering credit card info on a page linked from an email.'],
    takeaways: ['Check subscription status inside the official app.'],
    quiz: [
      {
        prompt: 'How should you verify if your Netflix payment actually failed?',
        options: ['Click the email link', 'Open the Netflix app directly and check Account Settings', 'Reply to email with new card', 'Wait 30 days'],
        answer: 'Open the Netflix app directly and check Account Settings',
        explanation: 'Official app settings will display your active subscription status accurately.'
      }
    ]
  },

  // Fill in complete 64-unit Master Curriculum data...
  {
    id: 'unit-2-10',
    levelId: 2,
    unitNumber: '2.10',
    title: 'Level 2 Boss Challenge: Master Phishing Exam',
    category: 'Email Phishing',
    difficulty: 'Intermediate',
    readTime: '5 min',
    reward: 120,
    isBossChallenge: true,
    summary: 'Pass the Level 2 Boss Challenge to unlock Level 3 SMS & QR Scams!',
    detail: 'Evaluate 5 realistic email scenarios covering BEC, brand copycats, fake invoices, and header spoofing.',
    objectives: ['Achieve 100% accuracy on advanced phishing email scenarios.'],
    explanation: 'Test your ability to spot header mismatches, panic-call invoice lures, and lookalike domains.',
    psychology: 'Comprehensive practical assessment.',
    scamExamples: ['Scenario: Fake Geek Squad invoice with toll-free cancellation number.'],
    legitExamples: ['Scenario: Real GitHub 2FA activation confirmation.'],
    redFlags: ['Header mismatch', 'Fake invoice phone trap', 'Domain stuffing'],
    protection: ['Independent account check', 'Header inspection'],
    mistakes: ['Calling phone numbers from invoices'],
    takeaways: ['Level 2 Completed! Unlocked Level 3 SMS, Messaging & QR Scams.'],
    quiz: [
      {
        prompt: 'You receive an email from "Geek Squad <billing@x92-services.net>" showing a $899 renewal and a phone number. What should you do first?',
        options: ['Call the number', 'Check your bank statement online to see if any charge exists', 'Pay the invoice', 'Reply STOP'],
        answer: 'Check your bank statement online to see if any charge exists',
        explanation: 'Checking your bank statement reveals that no charge actually occurred.'
      }
    ]
  },

  // LEVEL 3
  {
    id: 'unit-3-1',
    levelId: 3,
    unitNumber: '3.1',
    title: 'Smishing Mechanics & Short-Code Exploits',
    category: 'SMS & QR Scams',
    difficulty: 'Intermediate',
    readTime: '4 min',
    reward: 45,
    summary: 'Deconstruct SMS text lures, shortcodes, and link shorteners.',
    detail: 'SMS messages have strict character limits, driving scammers to use URL shorteners and high urgency.',
    objectives: ['Identify smishing link shorteners.', 'Understand short-code spoofing.'],
    explanation: 'Smishing relies on rapid mobile reaction times where users cannot hover over links before tapping.',
    psychology: 'Mobile immediacy bias makes users tap SMS links on autopilot.',
    scamExamples: ['"USPS: Package delayed. Update address now: bit.ly/3x8291"'],
    legitExamples: ['"USPS: Your package is out for delivery. Track at usps.com/track"'],
    redFlags: ['URL shorteners (bit.ly, tinyurl) in unexpected SMS', 'Package hold threats'],
    protection: ['Never tap shortened URLs in unsolicited text messages.'],
    mistakes: ['Tapping links on mobile without checking full URL destination.'],
    takeaways: ['Treat unsolicited text links with extreme caution.'],
    quiz: [
      {
        prompt: 'Why is smishing particularly effective on smartphones?',
        options: ['Phones are small', 'Mobile browsers make it harder to hover over and inspect full link destinations', 'Texts are free', 'Phones have no antivirus'],
        answer: 'Mobile browsers make it harder to hover over and inspect full link destinations',
        explanation: 'Touchscreens lack mouse hover preview capabilities, obscuring link targets.'
      }
    ]
  },
  {
    id: 'unit-3-10',
    levelId: 3,
    unitNumber: '3.10',
    title: 'Level 3 Boss Challenge: Smishing & Quishing Mastery',
    category: 'SMS & QR Scams',
    difficulty: 'Intermediate',
    readTime: '5 min',
    reward: 140,
    isBossChallenge: true,
    summary: 'Pass the Level 3 Boss Challenge to unlock Level 4 Financial Scams!',
    detail: 'Master SMS shortcode traps, USPS redelivery smishing, and physical QR code poster exploits.',
    objectives: ['Master mobile threat detection across 5 realistic SMS & QR scenarios.'],
    explanation: 'Demonstrate your ability to spot quishing stickers and SMS link shorteners.',
    psychology: 'Mobile threat readiness testing.',
    scamExamples: ['Scenario: Physical parking meter QR code sticker linking to fake payment portal.'],
    legitExamples: ['Scenario: Official 2FA text code from shortcode 22395.'],
    redFlags: ['QR stickers pasted over real signs', 'Bitly links in delivery texts'],
    protection: ['Inspect physical QR stickers', 'Use official carrier tracking'],
    mistakes: ['Scanning unknown public QR codes without URL preview'],
    takeaways: ['Level 3 Completed! Unlocked Level 4 Financial & Banking Scams.'],
    quiz: [
      {
        prompt: 'What should you inspect before paying a parking meter via a QR code sticker?',
        options: ['The color of the meter', 'Check if the QR code is a physical sticker pasted over the real sign', 'Scan it immediately', 'Use cash only'],
        answer: 'Check if the QR code is a physical sticker pasted over the real sign',
        explanation: 'Scammers paste fraudulent QR stickers over legitimate public parking signage.'
      }
    ]
  },

  // LEVEL 4
  {
    id: 'unit-4-1',
    levelId: 4,
    unitNumber: '4.1',
    title: 'Bank Fraud Alerts & Frozen Account Alarms',
    category: 'Financial Scams',
    difficulty: 'Intermediate',
    readTime: '4 min',
    reward: 50,
    summary: 'Defend against fake bank security texts demanding immediate call backs.',
    detail: 'Scammers spoof bank numbers and send texts: "Chase Alert: $450 spent. Reply YES or call 1-800-XXX".',
    objectives: ['Defend against bank phone number spoofing.'],
    explanation: 'Calling the phone number in the text connects you directly to fraudsters who pose as bank representatives.',
    psychology: 'Fear of losing account balance triggers instant phone call reaction.',
    scamExamples: ['"Bank Alert: Account frozen due to suspicious transfer. Call support at 1-888-555-0199."'],
    legitExamples: ['Calling the official support number printed on the back of your debit card.'],
    redFlags: ['Unrecognized phone number inside security alert text'],
    protection: ['Always call the phone number printed on the back of your physical card.'],
    mistakes: ['Calling phone numbers listed inside alert texts.'],
    takeaways: ['Your card has the official phone number printed on the back. Use it.'],
    quiz: [
      {
        prompt: 'What is the only phone number you should call to verify a bank fraud alert?',
        options: ['The number in the text message', 'The number printed on the back of your debit/credit card', 'A number found on a forum', 'The number from a search ad'],
        answer: 'The number printed on the back of your debit/credit card',
        explanation: 'The phone number on your card is guaranteed to connect to your real bank.'
      }
    ]
  },
  {
    id: 'unit-4-10',
    levelId: 4,
    unitNumber: '4.10',
    title: 'Level 4 Boss Challenge: Financial Security Exam',
    category: 'Financial Scams',
    difficulty: 'Advanced',
    readTime: '5 min',
    reward: 160,
    isBossChallenge: true,
    summary: 'Pass the Level 4 Boss Challenge to unlock Level 5 Social Engineering!',
    detail: 'Comprehensive evaluation of bank fraud alerts, gift card demands, P2P payment traps, and wire fraud.',
    objectives: ['Master financial fraud defense across 5 real-world banking scenarios.'],
    explanation: 'Prove your ability to defend your money against high-pressure payment scams.',
    psychology: 'Financial resilience assessment.',
    scamExamples: ['Scenario: Caller claiming to be Chase fraud department asking for 2FA code to stop transfer.'],
    legitExamples: ['Scenario: Real bank automated text asking to reply YES to confirm valid transaction.'],
    redFlags: ['Asking for 2FA code over phone', 'Demanding gift card payment'],
    protection: ['Call card back number', 'Never share 2FA codes'],
    mistakes: ['Reading 2FA code to caller'],
    takeaways: ['Level 4 Completed! Unlocked Level 5 Social Engineering & Human Hacking.'],
    quiz: [
      {
        prompt: 'A caller claiming to be from your bank asks for your 6-digit 2FA code to "cancel a fraudulent transfer". What should you do?',
        options: ['Give them the code', 'Hang up immediately — real banks never ask for 2FA codes', 'Read half the code', 'Ask for their name'],
        answer: 'Hang up immediately — real banks never ask for 2FA codes',
        explanation: 'Real bank staff will never ask you to read out a two-factor authentication passcode.'
      }
    ]
  },

  // LEVEL 5
  {
    id: 'unit-5-1',
    levelId: 5,
    unitNumber: '5.1',
    title: 'Psychological Levers: Fear, Urgency & Reciprocity',
    category: 'Social Engineering',
    difficulty: 'Advanced',
    readTime: '5 min',
    reward: 55,
    summary: 'Master the 6 core psychological principles used in social engineering.',
    detail: 'Understand how scammers manipulate Authority, Urgency, Fear, Scarcity, Reciprocity, and Social Proof.',
    objectives: ['Map psychological triggers to scam mechanics.', 'De-escalate artificial emotional pressure.'],
    explanation: 'Social engineering targets human emotion rather than technical software bugs.',
    psychology: 'Amygdala hijack overrides rational cognitive evaluation under intense fear or excitement.',
    scamExamples: ['An IRS call threatening police arrest within 30 minutes if back taxes are not paid immediately.'],
    legitExamples: ['Official IRS written notices sent via US Mail with statutory appeal timelines.'],
    redFlags: ['Demands for immediate action under threat of legal consequences', 'Requests for secrecy'],
    protection: ['Recognize emotional arousal as a signal to slow down and verify.'],
    mistakes: ['Allowing fear or urgency to rush your decision-making process.'],
    takeaways: ['When emotion goes up, critical thinking goes down. Pause.'],
    quiz: [
      {
        prompt: 'Why do social engineers create intense artificial urgency?',
        options: ['To save time', 'To trigger emotional panic that bypasses critical thinking', 'To test your memory', 'To comply with laws'],
        answer: 'To trigger emotional panic that bypasses critical thinking',
        explanation: 'Artificial time limits prevent victims from consulting trusted friends or verifying claims.'
      }
    ]
  },
  {
    id: 'unit-5-10',
    levelId: 5,
    unitNumber: '5.10',
    title: 'Level 5 Boss Challenge: Social Engineering Mastery',
    category: 'Social Engineering',
    difficulty: 'Advanced',
    readTime: '6 min',
    reward: 180,
    isBossChallenge: true,
    summary: 'Pass the Level 5 Boss Challenge to unlock Level 6 AI-Generated Scams!',
    detail: 'Evaluate complex BEC, CEO fraud, romance pig-butchering, and IRS authority impersonation cases.',
    objectives: ['Master social engineering defense across 5 high-stakes scenarios.'],
    explanation: 'Demonstrate resilience against authority bias, BEC gift card requests, and romance investment traps.',
    psychology: 'Advanced social engineering resilience test.',
    scamExamples: ['Scenario: Urgent email from CEO asking to buy 5 gift cards for client appreciation.'],
    legitExamples: ['Scenario: Standard HR email regarding annual open enrollment benefits.'],
    redFlags: ['Executive gift card demand', 'Secrecy request', 'Urgent wire transfer'],
    protection: ['Out-of-band verification via phone/in-person', 'Official government mail process'],
    mistakes: ['Fulfilling secrecy requests without verbal confirmation'],
    takeaways: ['Level 5 Completed! Unlocked Level 6 AI-Generated & Next-Gen Scams.'],
    quiz: [
      {
        prompt: 'You receive an urgent email from your CEO asking for $1,000 in Apple gift cards for a client meeting. How should you verify?',
        options: ['Buy the cards immediately', 'Contact the CEO directly via known phone number or in person', 'Reply to the email', 'Post on LinkedIn'],
        answer: 'Contact the CEO directly via known phone number or in person',
        explanation: 'Out-of-band verification via established phone numbers prevents BEC executive impersonation.'
      }
    ]
  },

  // LEVEL 6
  {
    id: 'unit-6-1',
    levelId: 6,
    unitNumber: '6.1',
    title: 'AI Voice Cloning & Emergency Family Call Spoofing',
    category: 'AI-Generated Scams',
    difficulty: 'Advanced',
    readTime: '5 min',
    reward: 60,
    summary: 'Defend against AI voice clone emergency calls using family safe words.',
    detail: '3 seconds of audio from social media is enough for AI to clone a family member\'s voice with emotion.',
    objectives: ['Establish family safe words for phone emergencies.', 'Verify emergency calls independently.'],
    explanation: 'Scammers clone your child or grandchild\'s voice and call claiming they are in jail or a car accident.',
    psychology: 'Parental protective instinct triggers immediate financial compliance.',
    scamExamples: ['A distress call in your child\'s exact voice crying that they need bail money wired via crypto.'],
    legitExamples: ['Asking for the pre-agreed secret family safe word before sending money.'],
    redFlags: ['Unusual phone number calling with familiar voice', 'Demands for wire or gift card bail'],
    protection: ['Create a secret family safe word known only to close relatives.'],
    mistakes: ['Sending money without calling the relative\'s primary phone number first.'],
    takeaways: ['Voice can be cloned. Establish a secret family safe word.'],
    quiz: [
      {
        prompt: 'What is the most effective defense against AI voice clone emergency scams?',
        options: ['Don\'t answer calls', 'Establish a secret family safe word and call their primary phone number back', 'Change your number', 'Record all calls'],
        answer: 'Establish a secret family safe word and call their primary phone number back',
        explanation: 'AI clones cannot guess a private pre-agreed family safe word.'
      }
    ]
  },
  {
    id: 'unit-6-8',
    levelId: 6,
    unitNumber: '6.8',
    title: 'Level 6 Boss Challenge: AI Threat Readiness Test',
    category: 'AI-Generated Scams',
    difficulty: 'Advanced',
    readTime: '6 min',
    reward: 200,
    isBossChallenge: true,
    summary: 'Pass the Level 6 Boss Challenge to unlock Level 7 Advanced Threats & Crypto Defense!',
    detail: 'Evaluate AI voice cloning, deepfake video calls, quishing OCR, and MFA prompt bombing scenarios.',
    objectives: ['Master AI & next-gen threat defense across 5 cutting-edge scenarios.'],
    explanation: 'Prove your capability against modern generative AI attack vectors.',
    psychology: 'Next-generation threat assessment.',
    scamExamples: ['Scenario: Deepfake video call of CFO requesting emergency offshore transfer.'],
    legitExamples: ['Scenario: Standard scheduled Zoom meeting with internal team.'],
    redFlags: ['AI voice emotion artifacts', 'Repeated MFA push notifications'],
    protection: ['Family safe word', 'MFA push denial', 'Multi-channel verification'],
    mistakes: ['Approving unsolicited 2FA push prompts'],
    takeaways: ['Level 6 Completed! Unlocked Level 7 Advanced Threats, Crypto & Incident Response.'],
    quiz: [
      {
        prompt: 'What should you do if your phone receives 20 consecutive 2FA push notifications while sleeping?',
        options: ['Tap approve to stop the notifications', 'Deny all prompts and change your account password immediately', 'Turn off your phone', 'Ignore it'],
        answer: 'Deny all prompts and change your account password immediately',
        explanation: 'This is an MFA Fatigue attack; your password has been compromised and the attacker is spamming prompts.'
      }
    ]
  },

  // LEVEL 7
  {
    id: 'unit-7-1',
    levelId: 7,
    unitNumber: '7.1',
    title: 'Crypto Wallet Harvesting & Seed Phrase Phishing',
    category: 'Advanced Threats',
    difficulty: 'Advanced',
    readTime: '5 min',
    reward: 65,
    summary: 'Protect Web3 assets from seed phrase harvesting and malicious smart contracts.',
    detail: 'Your 12 or 24-word secret recovery phrase is the master key to all your cryptocurrency funds.',
    objectives: ['Understand Web3 security rules.', 'Identify malicious smart contract approvals.'],
    explanation: 'No legitimate wallet provider, support desk, or airdrop site will EVER ask for your seed phrase.',
    psychology: 'Greed and fear of losing decentralized assets.',
    scamExamples: ['A fake MetaMask website asking you to type your 12-word seed phrase to "restore" wallet.'],
    legitExamples: ['Hardware wallet offline seed phrase storage on paper/steel.'],
    redFlags: ['Any website or form asking for your secret seed phrase'],
    protection: ['NEVER enter your seed phrase on any website or digital device.'],
    mistakes: ['Storing seed phrases in unencrypted notes files or email drafts.'],
    takeaways: ['Your seed phrase is your private key. Never type it online.'],
    quiz: [
      {
        prompt: 'When is it safe to type your 12-word crypto seed phrase into a website?',
        options: ['During customer support', 'NEVER — seed phrases should only be entered directly into offline hardware devices', 'During airdrops', 'When restoring online'],
        answer: 'NEVER — seed phrases should only be entered directly into offline hardware devices',
        explanation: 'Any website asking for your seed phrase is 100% a fraudulent credential harvester.'
      }
    ]
  },
  {
    id: 'unit-7-8',
    levelId: 7,
    unitNumber: '7.8',
    title: 'Level 7 Final Boss Challenge: Master Cyber Guardian Exam',
    category: 'Advanced Threats',
    difficulty: 'Advanced',
    readTime: '7 min',
    reward: 300,
    isBossChallenge: true,
    summary: 'Graduate the Master Curriculum and earn the prestigious Cyber Guardian Certification!',
    detail: 'The ultimate 10-question evaluation covering all 7 Levels of the Veridion Master Curriculum.',
    objectives: ['Achieve Cyber Guardian Certification by mastering all threat vectors.'],
    explanation: 'You have reached the final milestone! Prove your complete mastery across phishing, smishing, BEC, AI scams, and incident response.',
    psychology: 'Comprehensive cyber safety certification.',
    scamExamples: ['Scenario: Advanced multi-stage SIM swap + crypto seed phrase phishing attack.'],
    legitExamples: ['Scenario: Full incident response flow following an account compromise.'],
    redFlags: ['All scam patterns across 7 curriculum levels'],
    protection: ['Complete defense habit suite'],
    mistakes: ['Any lapse in verification protocol'],
    takeaways: ['Congratulations! You have completed the Veridion Master Curriculum and earned Cyber Guardian status.'],
    quiz: [
      {
        prompt: 'What are the 3 core habits of a Veridion Cyber Guardian?',
        options: [
          'Pause, Verify independently, Never share credentials/2FA',
          'Click fast, Trust logos, Share passwords',
          'Ignore security, Re-use passwords, Turn off 2FA',
          'Delete emails, Call text numbers, Turn off VPN'
        ],
        answer: 'Pause, Verify independently, Never share credentials/2FA',
        explanation: 'Pausing, verifying through trusted independent channels, and guarding credentials forms an unshakeable cyber defense.'
      }
    ]
  }
]
