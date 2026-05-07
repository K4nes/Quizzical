export default function HomePage({onNavigate}) {
    return (
        <section className="home-page">
            <h1 className="home-page_title">Quizzical</h1>
            <h2 className="home-page_desc">A Simple Quiz App</h2>
            <button className="btn btn-primary" onClick={() => onNavigate('quiz')}>Start Quiz</button>
        </section>
    )
}