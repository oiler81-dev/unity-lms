const frontDeskCourse = {
  courseId: "front-desk-checkin-v1",
  title: "Front Desk Check-In Assessment",
  type: "quiz",
  typeLabel: "Assessment",
  status: "live",
  version: 1,
  passScore: 90,
  pointsPerQuestion: 5,
  summary: "Required pass threshold is 90% or higher. If a passing score is not achieved, the user must retake the assessment.",
  description: "Validates check-in knowledge, identity verification, insurance verification, payment collection, and escalation workflows.",
  questions: [
    {
      id: "q1",
      prompt: "Why is patient identity verification required at every visit?",
      options: [
        { id: "a", text: "To speed up the check-in process" },
        { id: "b", text: "To comply with insurance requests only" },
        { id: "c", text: "To ensure patient safety, billing accuracy, and compliance" },
        { id: "d", text: "Only for new patients" }
      ],
      correctAnswer: "c",
      explanation: "Identity verification protects patient safety and supports billing accuracy and compliance."
    },
    {
      id: "q2",
      prompt: "Which identifiers must be confirmed before opening a patient chart?",
      options: [
        { id: "a", text: "First name only" },
        { id: "b", text: "Last name and phone number" },
        { id: "c", text: "Full legal name and date of birth" },
        { id: "d", text: "Insurance carrier" }
      ],
      correctAnswer: "c",
      explanation: "Full legal name and date of birth are the correct identifying fields."
    },
    {
      id: "q3",
      prompt: "What should you do if you cannot confidently confirm a patient’s identity?",
      options: [
        { id: "a", text: "Continue the visit" },
        { id: "b", text: "Ask the provider to decide" },
        { id: "c", text: "Stop the check-in and escalate to leadership" },
        { id: "d", text: "Use the last visit’s information" }
      ],
      correctAnswer: "c",
      explanation: "Do not proceed without verified identity. Stop the process and escalate."
    },
    {
      id: "q4",
      prompt: "How often must you identify patient with their ID?",
      options: [
        { id: "a", text: "Initial visit only" },
        { id: "b", text: "Every Visit" },
        { id: "c", text: "Once per year" },
        { id: "d", text: "Only if insurance changes" }
      ],
      correctAnswer: "b",
      explanation: "Identity verification is required at every visit."
    },
    {
      id: "q5",
      prompt: "Why is visual insurance card verification required even if the patient says 'no changes'?",
      options: [
        { id: "a", text: "Patients often forget" },
        { id: "b", text: "It saves time" },
        { id: "c", text: "It is optional but recommended" },
        { id: "d", text: "Insurance plans frequently update behind the scenes" }
      ],
      correctAnswer: "d",
      explanation: "Insurance details can change behind the scenes even when the patient reports no changes."
    },
    {
      id: "q6",
      prompt: "Insurance information only needs to be verified if the patient reports a change.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "b",
      explanation: "Insurance should still be verified even when the patient reports no change."
    },
    {
      id: "q7",
      prompt: "A minor spelling error in the insurance name or member ID can cause a claim denial.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "Exact matching matters and small errors can cause denials."
    },
    {
      id: "q8",
      prompt: "We can see an HMO patient without an authorization.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "b",
      explanation: "Required authorization cannot be skipped."
    },
    {
      id: "q9",
      prompt: "Copays and patient balances should be collected at the time of service.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "Collection at time of service is the expected workflow."
    },
    {
      id: "q10",
      prompt: "Unsigned consents can create legal, billing, and compliance risk.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "Unsigned consents create real legal and operational risk."
    },
    {
      id: "q11",
      prompt: "A patient states they forgot their ID but insists they were seen last month. What should you do?",
      options: [
        { id: "a", text: "Proceed since they are established" },
        { id: "b", text: "Ask clinical staff to verify" },
        { id: "c", text: "Stop and escalate to leadership" },
        { id: "d", text: "Ask another front desk staff member" }
      ],
      correctAnswer: "c",
      explanation: "Established status does not replace required verification."
    },
    {
      id: "q12",
      prompt: "A patient is unsure if their insurance changed but does not have their card. What is the correct action?",
      options: [
        { id: "a", text: "Proceed with the visit" },
        { id: "b", text: "Use the insurance on file" },
        { id: "c", text: "Ask billing to fix it later" },
        { id: "d", text: "Stop and escalate" }
      ],
      correctAnswer: "d",
      explanation: "If insurance cannot be verified, the issue should be escalated."
    },
    {
      id: "q13",
      prompt: "Why is the front desk critical to the revenue cycle?",
      options: [
        { id: "a", text: "Errors at intake cause downstream denials and delays" },
        { id: "b", text: "They collect payments only" },
        { id: "c", text: "They schedule appointments" },
        { id: "d", text: "They handle claims" }
      ],
      correctAnswer: "a",
      explanation: "Front desk intake errors create downstream claim and revenue problems."
    },
    {
      id: "q14",
      prompt: "Why must we validate all patient demographics in the system?",
      options: [
        { id: "a", text: "To save time during check-in" },
        { id: "b", text: "To prevent documentation, treatment, and billing errors" },
        { id: "c", text: "To meet internal preferences" },
        { id: "d", text: "Because the system requires it" }
      ],
      correctAnswer: "b",
      explanation: "Accurate demographics prevent errors across care, documentation, and billing."
    },
    {
      id: "q15",
      prompt: "If a patient becomes upset about providing ID or insurance verification, what is the correct action?",
      options: [
        { id: "a", text: "Bypass verification to avoid conflict" },
        { id: "b", text: "Ask clinical staff to override the requirement" },
        { id: "c", text: "Proceed with the visit to maintain patient satisfaction" },
        { id: "d", text: "Follow the SOP and escalate if verification cannot be completed" }
      ],
      correctAnswer: "d",
      explanation: "Policy still applies even if the patient is upset."
    },
    {
      id: "q16",
      prompt: "Front desk errors can result in denied claims even if clinical care was provided correctly.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "a",
      explanation: "Correct clinical care does not protect against intake and billing denials caused upstream."
    },
    {
      id: "q17",
      prompt: "Collecting copays at time of service is optional if the patient promises to pay later.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "b",
      explanation: "Copay collection is not optional based on a promise to pay later."
    },
    {
      id: "q18",
      prompt: "Why do insurance systems require exact spelling and matching information?",
      options: [
        { id: "a", text: "For convenience" },
        { id: "b", text: "To reduce front desk workload" },
        { id: "c", text: "Because claims are processed through automated exact-match systems" },
        { id: "d", text: "Because payers prefer it" }
      ],
      correctAnswer: "c",
      explanation: "Insurance systems rely on exact matching and automation."
    },
    {
      id: "q19",
      prompt: "When is escalation to leadership required?",
      options: [
        { id: "a", text: "Only when a patient refuses to pay" },
        { id: "b", text: "When a new patient has no identification" },
        { id: "c", text: "Any time identity, insurance, authorization, or payment cannot be verified" },
        { id: "d", text: "All of the above" }
      ],
      correctAnswer: "c",
      explanation: "Escalation applies to any unverified identity, insurance, authorization, or payment issue."
    },
    {
      id: "q20",
      prompt: "If a referral or authorization is missing or expired, the visit may proceed while the issue is resolved later.",
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" }
      ],
      correctAnswer: "b",
      explanation: "Missing or expired referral or authorization cannot be ignored and fixed later."
    }
  ]
};

const courseMap = {
  [frontDeskCourse.courseId]: frontDeskCourse
};

function getCourseDefinition(courseId) {
  return courseMap[courseId] || null;
}

function listCourseDefinitions() {
  return Object.values(courseMap);
}

module.exports = {
  getCourseDefinition,
  listCourseDefinitions
};
