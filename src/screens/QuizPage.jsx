import { useState, useEffect } from "react"
import he from "he"
// import quizData from "../../data.json"
import QuestionCard from "../components/QuestionCard.jsx";

export default function QuizPage() {
    // const [data, setData] = useState(quizData)
    const [questions, setQuestions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState({});
    const [isChecked, setIsChecked] = useState(false);

    const allAnswered = questions.length > 0 && Object.keys(selectedAnswer).length === questions.length;
    const correctCount = questions.reduce((count, item, qIndex) => {
        const userAnswer = selectedAnswer[qIndex];
        const correctAnswer = he.decode(item.correct_answer);

        return userAnswer === correctAnswer ? count + 1 : count;
    }, 0);

    

    async function fetchQuiz() {
        try {
            const amount = 5
            const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&type=multiple`)
            const data = await res.json()

            // For DUMMY DATA
            // const data = { results: quizData };

            const shuffled = data.results.map((item) => {
                const options = [...item.incorrect_answers, item.correct_answer];
                options.sort(() => Math.random() - 0.5);

                return {
                    ...item,
                    options,
                };
            });

            setQuestions(shuffled);
            setSelectedAnswer({});
            setIsChecked(false);

        } catch (error) {
            console.error("Failed to fetch quiz:", error)
        }
    }

    function handleCheckAnswers() {
        setIsChecked(true);
    }

    function handlePlayAgain() {
        fetchQuiz();
    }

    function handleSelect(qIndex, answer) {
        setSelectedAnswer((prev) => ({
            ...prev,
            [qIndex]: answer,
        }))
    }

    useEffect(() => {
        fetchQuiz();
    }, []);

    return (
        <section className="quiz-page">
            {questions.map((item, qIndex) => (
                <QuestionCard
                    key={qIndex}
                    item={item}
                    qIndex={qIndex}
                    options={item.options}
                    selectedAnswer={selectedAnswer[qIndex]}
                    onSelect={handleSelect}
                    isChecked={isChecked}
                />
            ))}
            <div className="check-answers">
                {isChecked && (
                    <p className="check-answers_score">You scored {correctCount}/{questions.length} correct answers</p>
                )}
                
                <button
                    className="btn btn-primary check-answers_btn"
                    onClick={isChecked ? handlePlayAgain : handleCheckAnswers}
                    disabled={!allAnswered && !isChecked}
                >{ isChecked ? "Play Again" : "Check Answers"}</button>
            </div>
            
        </section>
    )
}