const quiz = {
  quizId: 'front-desk-checkin-v1',
  title: 'UNITY MSK Front Desk Check-In Assessment',
  passScore: 90,
  pointsPerQuestion: 5,
  questionCount: 20,
  description: 'Front desk check-in assessment for Unity MSK staff.',
  questions: [
    {
      id: 'q1',
      prompt: 'Why is patient identity verification required at every visit?',
      options: [
        { id: 'a', text: 'To speed up the check-in process' },
        { id: 'b', text: 'To comply with insurance requests only' },
        { id: 'c', text: 'To ensure patient safety, billing accuracy, and compliance' },
        { id: 'd', text: 'Only for new patients' }
      ],
      correctAnswer: 'c',
      explanation: 'Identity verification protects the patient and reduces compliance, treatment, and billing errors.'
    },
    {
      id: 'q2',
      prompt: 'Which identifiers must be confirmed before opening a patient chart?',
      options: [
        { id: 'a', text: 'First name only' },
        { id: 'b', text: 'Last name and phone number' },
        { id: 'c', text: 'Full legal name and date of birth' },
        { id: 'd', text: 'Insurance carrier' }
      ],
      correctAnswer: 'c',
      explanation: 'Full legal name and date of birth are the required core identifiers here.'
    },
    {
      id: 'q3',
      prompt: 'What should you do if you cannot confidently confirm a patient’s identity?',
      options: [
        { id: 'a', text: 'Continue the visit' },
        { id: 'b', text: 'Ask the provider to decide' },
        { id: 'c', text: 'Stop the check-in and escalate to leadership' },
        { id: 'd', text: 'Use the last visit’s information' }
      ],
      correctAnswer: 'c',
      explanation: 'Do not proceed if identity cannot be verified. Stop and escalate.'
    },
    {
      id: 'q4',
      prompt: 'How often must you identify patient with their ID?',
      options: [
        { id: 'a', text: 'Initial visit only' },
        { id: 'b', text: 'Every Visit' },
        { id: 'c', text: 'Once per year' },
        { id: 'd', text: 'Only if insurance changes' }
      ],
      correctAnswer: 'b',
      explanation: 'ID verification is required every visit.'
    },
    {
      id: 'q5',
      prompt: 'Why is visual insurance card verification required even if the patient says “no changes”?',
      options: [
        { id: 'a', text: 'Patients often forget' },
        { id: 'b', text: 'It saves time' },
        { id: 'c', text: 'It is optional but recommended' },
        { id: 'd', text: 'Insurance plans frequently update behind the scenes' }
      ],
      correctAnswer: 'd',
      explanation: 'Coverage, group numbers, and eligibility can change even when the patient believes nothing changed.'
    },
    {
      id: 'q6',
      prompt: 'Insurance information only needs to be verified if the patient reports a change.',
      options: [
        { id: 'a', text: 'True' },
        { id: 'b', text: 'False' }
      ],
      correctAnswer: 'b',
      explanation: 'Insurance must still be verified even when the patient reports no change.'
    },
    {
      id: 'q7',
      prompt: 'A minor spelling error in the insurance name or member ID can cause a claim denial.',
      options: [
        { id: 'a', text: 'True' },
        { id: 'b', text: 'False' }
      ],
      correctAnswer: 'a',
      explanation: 'Even a small mismatch can break claim matching.'
    },
    {
      id: 'q8',
      prompt: 'We can see an HMO patient without an authorization.',
      options: [
        { id: 'a', text: 'True' },
        { id: 'b', text: 'False' }
      ],
      correctAnswer: 'b',
      explanation: 'If required authorization is missing, the visit should not proceed normally.'
    },
    {
      id: 'q9',
      prompt: 'Copays and patient balances should be collected at the time of service.',
      options: [
        { id: 'a', text: 'True' },
        { id: 'b', text: 'False' }
      ],
      correctAnswer: 'a',
      explanation: 'Point-of-service collection is the expected workflow.'
    },
    {
      id: 'q10',
      prompt: 'Unsigned consents can create legal, billing, and compliance risk.',
      options: [
        { id: 'a', text: 'True' },
        { id: 'b', text: 'False' }
      ],
      correctAnswer: 'a',
      explanation: 'Unsigned consent creates real legal, documentation, and billing exposure.'
    },
    {
      id: 'q11',
      prompt: 'A patient states they forgot their ID but insists they were seen last month. What should you do?',
      options: [
        { id: 'a', text: 'Proceed since they are established' },
        { id: 'b', text: 'Ask clinical staff to verify' },
        { id: 'c', text: 'Stop and escalate to leadership' },
        { id: 'd', text: 'Ask another front desk staff member' }
      ],
      correctAnswer: 'c',
      explanation: 'Prior visits do not replace today’s required verification.'
    },
    {
      id: 'q12',
      prompt: 'A patient is unsure if their insurance changed but does not have their card. What is the correct action?',
      options: [
        { id: 'a', text: 'Proceed with the visit' },
        { id: 'b', text: 'Use the insurance on file' },
        { id: 'c', text: 'Ask billing to fix it later' },
        { id: 'd', text: 'Stop and escalate' }
      ],
      correctAnswer: 'd',
      explanation: 'If insurance cannot be confidently verified, stop and escalate.'
    },
    {
      id: 'q13',
      prompt: 'Why is the front desk critical to the revenue cycle?',
      options: [
        { id: 'a', text: 'Errors at intake cause downstream denials and delays' },
        { id: 'b', text: 'They collect payments only' },
        { id: 'c', text: 'They schedule appointments' },
        { id: 'd', text: 'They handle claims' }
      ],
      correctAnswer: 'a',
      explanation: 'Bad intake data turns into denials, delays, and rework later.'
    },
    {
      id: 'q14',
      prompt: 'Why must we validate all patient demographics in the system?',
      options: [
        { id: 'a', text: 'To save time during check-in' },
        { id: 'b', text: 'To prevent documentation, treatment, and billing errors' },
        { id: 'c', text: 'To meet internal preferences' },
        { id: 'd', text: 'Because the system requires it' }
      ],
      correctAnswer: 'b',
      explanation: 'Demographic validation reduces downstream documentation and billing issues.'
    },
    {
      id: 'q15',
      prompt: 'If a patient becomes upset about providing ID or insurance verification, what is the correct action?',
      options: [
        { id: 'a', text: 'Bypass verification to avoid conflict' },
        { id: 'b', text: 'Ask clinical staff to override the requirement' },
        { id: 'c', text: 'Proceed with the visit to maintain patient satisfaction' },
        { id: 'd', text: 'Follow the SOP and escalate if verification cannot be completed' }
      ],
      correctAnswer: 'd',
      explanation: 'Follow the SOP. Do not waive required verification because the patient is upset.'
    },
    {
      id: 'q16',
      prompt: 'Front desk errors can result in denied claims even if clinical care was provided correctly.',
      options: [
        { id: 'a', text: 'True' },
        { id: 'b', text: 'False' }
      ],
      correctAnswer: 'a',
      explanation: 'Correct care can still be denied if the intake and insurance data are wrong.'
    },
    {
      id: 'q17',
      prompt: 'Collecting copays at time of service is optional if the patient promises to pay later.',
      options: [
        { id: 'a', text: 'True' },
        { id: 'b', text: 'False' }
      ],
      correctAnswer: 'b',
      explanation: 'A promise to pay later does not replace the collection expectation.'
    },
    {
      id: 'q18',
      prompt: 'Why do insurance systems require exact spelling and matching information?',
      options: [
        { id: 'a', text: 'For convenience' },
        { id: 'b', text: 'To reduce front desk workload' },
        { id: 'c', text: 'Because claims are processed through automated exact-match systems' },
        { id: 'd', text: 'Because payers prefer it' }
      ],
      correctAnswer: 'c',
      explanation: 'Claims processing often depends on exact matching across payer systems.'
    },
    {
      id: 'q19',
      prompt: 'When is escalation to leadership required?',
      options: [
        { id: 'a', text: 'Only when a patient refuses to pay' },
        { id: 'b', text: 'When a new patient has no identification' },
        { id: 'c', text: 'Any time identity, insurance, authorization, or payment cannot be verified' },
        { id: 'd', text: 'All of the above' }
      ],
      correctAnswer: 'c',
      explanation: 'Escalation is required any time core verification requirements cannot be completed.'
    },
    {
      id: 'q20',
      prompt: 'If a referral or authorization is missing or expired, the visit may proceed while the issue is resolved later.',
      options: [
        { id: 'a', text: 'True' },
        { id: 'b', text: 'False' }
      ],
      correctAnswer: 'b',
      explanation: 'Missing or expired referral/authorization should be addressed before normal progression of the visit.'
    }
  ]
};

function sanitizedQuiz() {
  return {
    quizId: quiz.quizId,
    title: quiz.title,
    passScore: quiz.passScore,
    pointsPerQuestion: quiz.pointsPerQuestion,
    questionCount: quiz.questionCount,
    description: quiz.description,
    questions: quiz.questions.map(({ correctAnswer, explanation, ...q }) => q)
  };
}

module.exports = { quiz, sanitizedQuiz };
