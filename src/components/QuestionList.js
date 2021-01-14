import React, {useState, useEffect } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(r => r.json())
    .then(questionsObj => setQuestions(questionsObj))
  }, [])

  const questionItems = questions.map((question) => {
    return <QuestionItem key={question.id} question={question} onDeleteClick={handleDeleteClickFetch} onAnswerChange={handleAnswer}/>
  })

  function handleDeleteClickFetch(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => {
      const updatedQuestionsList = questions.filter((question) => question.id !== id)
      setQuestions(updatedQuestionsList)
    })
  }

  function handleAnswer(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ correctIndex })
    })
    .then(r => r.json())
    .then((updatedQuestion) => {
      const updatedQuestionsList = questions.filter((question) => (question.id !== id))
      setQuestions(updatedQuestionsList)
    })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
