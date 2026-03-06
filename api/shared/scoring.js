function scoreCourse(course, answers) {
  const results = [];
  let earned = 0;

  for (const q of course.questions) {
    const selected = answers[q.id] ?? null;
    const isCorrect = selected === q.correctAnswer;

    if (isCorrect) {
      earned += course.pointsPerQuestion;
    }

    results.push({
      questionId: q.id,
      selectedAnswer: selected,
      correctAnswer: q.correctAnswer,
      isCorrect,
      explanation: q.explanation || ""
    });
  }

  const totalPoints = course.questions.length * course.pointsPerQuestion;
  const score = Math.round((earned / totalPoints) * 100);
  const passed = score >= course.passScore;

  return {
    score,
    passed,
    earned,
    totalPoints,
    results,
    incorrect: results.filter((r) => !r.isCorrect)
  };
}

module.exports = { scoreCourse };
