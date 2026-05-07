import he from "he"
import clsx from "clsx";

export default function QuestionCard({
    item,
    qIndex,
    options,
    selectedAnswer,
    onSelect,
    isChecked}) {
    return (
        <div className="quiz-separator">
            <h2 className="quiz-page_questions">{he.decode(item.question)}</h2>

            <div className="quiz-answers">
                {options.map((answer, aIndex) => {
                    const decodedAnswer = he.decode(answer);
                    const correctAnswer = he.decode(item.correct_answer)

                    return (
                        <button
                            key={`${qIndex}-${aIndex}`}
                            type="button"
                            className={clsx(
                                "btn",
                                "btn-answer",
                                !isChecked && selectedAnswer === decodedAnswer && "is-selected",
                                isChecked && decodedAnswer === correctAnswer && "is-correct",
                                isChecked && 
                                    selectedAnswer === decodedAnswer &&
                                    decodedAnswer !== correctAnswer &&
                                    "is-wrong"
                            )}
                            disabled={isChecked}
                            onClick={() => onSelect(qIndex, decodedAnswer)}
                        >
                            {decodedAnswer}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}