function scoreQuiz(questions, answers, pointsPerQuestion = 5) {
  let earned = 0;
  const results = [];

  for (const question of questions) {
    const selectedAnswer = answers?.[question.id] ?? null;
    const isCorrect = selectedAnswer === question.correctAnswer;
    if (isCorrect) earned += pointsPerQuestion;

    results.push({
      questionId: question.id,
      selectedAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect,
      explanation: question.explanation || ''
    });
  }

  const total = questions.length * pointsPerQuestion;
  const score = Math.round((earned / total) * 100);

  return {
    earned,
    total,
    score,
    passed: score >= 90,
    results,
    incorrect: results.filter((r) => !r.isCorrect)
  };
}

module.exports = { scoreQuiz };
