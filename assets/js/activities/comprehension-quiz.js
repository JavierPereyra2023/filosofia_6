/**
 * Comprehension Quiz Component
 * Handles interpretative questions with feedback
 */

class ComprehensionQuiz {
  constructor(containerId, questions) {
    this.container = document.getElementById(containerId);
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.answers = [];

    if (this.container) {
      this.init();
    }
  }

  init() {
    this.render();
  }

  render() {
    const question = this.questions[this.currentQuestionIndex];
    const questionNumber = this.currentQuestionIndex + 1;
    const totalQuestions = this.questions.length;

    this.container.innerHTML = `
      <div class="activity-container">
        <div class="activity-header">
          <h3 class="activity-title">Cuestionario de Comprensión</h3>
          <p class="activity-progress">Pregunta ${questionNumber} de ${totalQuestions}</p>
        </div>

        ${question.text ? `
          <div class="philosophy-text">
            <p>${question.text}</p>
          </div>
        ` : ''}

        <div class="question-container">
          <p class="question-prompt">${question.question}</p>

          <div class="quiz-options" id="quiz-options-${this.currentQuestionIndex}">
            ${question.options.map((option, index) => `
              <button
                class="quiz-option"
                data-index="${index}"
                data-correct="${option.correct || false}"
              >
                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                <span class="option-text">${option.text}</span>
              </button>
            `).join('')}
          </div>

          <div class="feedback" id="feedback-${this.currentQuestionIndex}" hidden>
            <p class="feedback-text"></p>
          </div>

          <div class="quiz-actions" id="quiz-actions-${this.currentQuestionIndex}" hidden>
            ${questionNumber < totalQuestions
              ? '<button class="btn btn-primary" id="next-question">Siguiente pregunta →</button>'
              : '<button class="btn btn-primary" id="finish-quiz">Ver resultados</button>'
            }
          </div>
        </div>

        <div class="progress-indicator">
          ${this.questions.map((_, idx) => `
            <span class="progress-dot ${idx === this.currentQuestionIndex ? 'active' : ''} ${idx < this.currentQuestionIndex ? 'completed' : ''}"></span>
          `).join('')}
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    const optionsContainer = document.getElementById(`quiz-options-${this.currentQuestionIndex}`);
    const options = optionsContainer.querySelectorAll('.quiz-option');
    const question = this.questions[this.currentQuestionIndex];

    options.forEach((option, index) => {
      option.addEventListener('click', () => {
        this.handleAnswer(option, index, question);
      });
    });

    const nextButton = document.getElementById('next-question');
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        this.nextQuestion();
      });
    }

    const finishButton = document.getElementById('finish-quiz');
    if (finishButton) {
      finishButton.addEventListener('click', () => {
        this.showResults();
      });
    }
  }

  handleAnswer(optionElement, optionIndex, question) {
    const options = document.querySelectorAll('.quiz-option');
    const feedbackContainer = document.getElementById(`feedback-${this.currentQuestionIndex}`);
    const feedbackText = feedbackContainer.querySelector('.feedback-text');
    const actionsContainer = document.getElementById(`quiz-actions-${this.currentQuestionIndex}`);

    // Disable all options
    options.forEach(opt => opt.disabled = true);

    const selectedOption = question.options[optionIndex];
    const isCorrect = selectedOption.correct === true;

    // Store answer
    this.answers.push({
      questionIndex: this.currentQuestionIndex,
      selectedIndex: optionIndex,
      correct: isCorrect
    });

    // Mark correct and incorrect
    if (isCorrect) {
      optionElement.classList.add('correct');
      feedbackContainer.classList.add('success');
      feedbackText.textContent = selectedOption.feedback || '¡Correcto! ' + (selectedOption.explanation || '');
    } else {
      optionElement.classList.add('incorrect');
      feedbackContainer.classList.add('error');

      // Highlight the correct answer
      options.forEach((opt, idx) => {
        if (question.options[idx].correct) {
          opt.classList.add('correct');
        }
      });

      feedbackText.textContent = selectedOption.feedback || 'Incorrecto. ' + (selectedOption.explanation || '');
    }

    // Show feedback and next button
    feedbackContainer.hidden = false;
    actionsContainer.hidden = false;
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.render();
    }
  }

  showResults() {
    const correctAnswers = this.answers.filter(a => a.correct).length;
    const totalQuestions = this.questions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    let message = '';
    let emoji = '';

    if (percentage === 100) {
      message = '¡Excelente! Has demostrado una comprensión profunda del tema.';
      emoji = '🎉';
    } else if (percentage >= 70) {
      message = '¡Muy bien! Has comprendido los conceptos principales.';
      emoji = '👏';
    } else if (percentage >= 50) {
      message = 'Buen intento. Considera revisar el contenido nuevamente.';
      emoji = '📚';
    } else {
      message = 'Te recomendamos repasar el contenido antes de continuar.';
      emoji = '💪';
    }

    this.container.innerHTML = `
      <div class="activity-container">
        <div class="quiz-results">
          <h3 class="activity-title">Resultados del Cuestionario ${emoji}</h3>

          <div class="results-summary">
            <div class="result-stat">
              <span class="stat-number">${correctAnswers}</span>
              <span class="stat-label">Respuestas correctas</span>
            </div>
            <div class="result-stat">
              <span class="stat-number">${totalQuestions}</span>
              <span class="stat-label">Total de preguntas</span>
            </div>
            <div class="result-stat">
              <span class="stat-number">${percentage}%</span>
              <span class="stat-label">Puntuación</span>
            </div>
          </div>

          <p class="results-message">${message}</p>

          <button class="btn btn-outline" id="restart-quiz">Reintentar cuestionario</button>
        </div>
      </div>
    `;

    // Add restart functionality
    const restartButton = document.getElementById('restart-quiz');
    if (restartButton) {
      restartButton.addEventListener('click', () => {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.render();
      });
    }
  }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ComprehensionQuiz;
}
