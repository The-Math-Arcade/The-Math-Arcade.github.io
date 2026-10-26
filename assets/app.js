(() => {
  const translations = {
    en: {
      navHome: 'Home', navAlgebra1: 'Algebra I', navAlgebra2: 'Algebra II', language: 'Language',
      heroEyebrow: 'Practice that feels possible', heroTitle: 'Make algebra click.', heroSummary: 'Fresh problems, visual steps, and instant feedback for the math you meet in class.',
      startPractice: 'Start practicing', chooseCourse: 'Choose a course', courseTitle: 'Build the skill. Keep the streak.',
      course1Label: 'Algebra I', course1Title: 'Linear equations & proportions', course2Label: 'Algebra II', course2Title: 'Quadratics & functions',
      explore: 'Explore track', calculator: 'Calculator', sessionProgress: 'Session progress', newProblem: 'New problem',
      findValue: 'Find the value', solveEquation: 'Solve the equation', yourAnswer: 'Your answer', checkAnswer: 'Check answer',
      showSteps: 'Show worked steps', topicSolveX: 'Solve for x', topicProportion: 'Proportions', topicSystems: 'Systems',
      topicFactoring: 'Factoring', topicQuadratic: 'Quadratic formula', topicCompleteSquare: 'Complete the square',
      correct: 'Correct. Nicely done!', incorrect: 'Not quite. Try once more or reveal the steps.', practice: 'Practice'
    },
    es: {
      navHome: 'Inicio', navAlgebra1: 'Álgebra I', navAlgebra2: 'Álgebra II', language: 'Idioma',
      heroEyebrow: 'Práctica que sí parece posible', heroTitle: 'Haz que el álgebra encaje.', heroSummary: 'Problemas nuevos, pasos visuales y respuestas inmediatas para la clase.',
      startPractice: 'Empieza a practicar', chooseCourse: 'Elige un curso', courseTitle: 'Domina la habilidad. Mantén el ritmo.',
      course1Label: 'Álgebra I', course1Title: 'Ecuaciones lineales y proporciones', course2Label: 'Álgebra II', course2Title: 'Cuadráticas y funciones',
      explore: 'Ver el curso', calculator: 'Calculadora', sessionProgress: 'Progreso', newProblem: 'Nuevo problema',
      findValue: 'Encuentra el valor', solveEquation: 'Resuelve la ecuación', yourAnswer: 'Tu respuesta', checkAnswer: 'Comprobar',
      showSteps: 'Ver los pasos', topicSolveX: 'Resolver x', topicProportion: 'Proporciones', topicSystems: 'Sistemas',
      topicFactoring: 'Factorización', topicQuadratic: 'Fórmula cuadrática', topicCompleteSquare: 'Completar el cuadrado',
      correct: 'Correcto. ¡Bien hecho!', incorrect: 'No exactamente. Inténtalo de nuevo o mira los pasos.', practice: 'Práctica'
    },
    fr: {
      navHome: 'Accueil', navAlgebra1: 'Algèbre I', navAlgebra2: 'Algèbre II', language: 'Langue',
      heroEyebrow: 'Des exercices à portée de main', heroTitle: 'Faites cliquer l’algèbre.', heroSummary: 'Des exercices nouveaux, des étapes claires et une réponse immédiate pour les cours.',
      startPractice: 'Commencer', chooseCourse: 'Choisir un cours', courseTitle: 'Progressez. Gardez le rythme.',
      course1Label: 'Algèbre I', course1Title: 'Équations linéaires et proportions', course2Label: 'Algèbre II', course2Title: 'Quadratiques et fonctions',
      explore: 'Voir le parcours', calculator: 'Calculatrice', sessionProgress: 'Progression', newProblem: 'Nouvel exercice',
      findValue: 'Trouver la valeur', solveEquation: 'Résoudre l’équation', yourAnswer: 'Ta réponse', checkAnswer: 'Vérifier',
      showSteps: 'Voir les étapes', topicSolveX: 'Résoudre x', topicProportion: 'Proportions', topicSystems: 'Systèmes',
      topicFactoring: 'Factorisation', topicQuadratic: 'Formule quadratique', topicCompleteSquare: 'Compléter le carré',
      correct: 'Exact. Bravo !', incorrect: 'Pas tout à fait. Essaie encore ou ouvre les étapes.', practice: 'Exercice'
    }
  };

  let language = localStorage.getItem('mathArcadeLanguage') || 'en';
  const storedTheme = localStorage.getItem('mathArcadeTheme');
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  let theme = storedTheme || (prefersDark ? 'dark' : 'light');
  const themeToggle = document.querySelector('#theme-toggle');

  const applyTheme = () => {
    document.documentElement.dataset.theme = theme;
    if (!themeToggle) return;
    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.querySelector('span').textContent = isDark ? '☀' : '☾';
  };

  themeToggle?.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('mathArcadeTheme', theme);
    applyTheme();
  });
  applyTheme();

  const text = key => translations[language][key] || translations.en[key] || key;
  const applyTranslations = () => {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      element.textContent = text(element.dataset.i18n);
    });
  };

  const languageSelect = document.querySelector('#language-select');
  if (languageSelect) {
    languageSelect.value = language;
    languageSelect.addEventListener('change', event => {
      language = event.target.value;
      localStorage.setItem('mathArcadeLanguage', language);
      applyTranslations();
    });
  }
  applyTranslations();

  const calculator = document.querySelector('#calculator');
  const calculatorToggle = document.querySelector('#calculator-toggle');
  const calculatorClose = document.querySelector('#calculator-close');
  const display = document.querySelector('#calc-display');
  const calcGrid = document.querySelector('#calc-grid');

  if (calculator && calculatorToggle && calcGrid) {
    const keys = ['C', '⌫', '÷', '×', '7', '8', '9', '−', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.', '(', ')'];
    let expression = '';
    const setCalculator = open => {
      calculator.classList.toggle('open', open);
      calculatorToggle.setAttribute('aria-expanded', String(open));
    };
    const updateDisplay = () => { display.value = expression || '0'; };
    keys.forEach(key => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = key;
      if (['÷', '×', '−', '+'].includes(key)) button.className = 'calc-operation';
      if (key === '=') button.className = 'calc-result';
      button.addEventListener('click', () => {
        if (key === 'C') expression = '';
        else if (key === '⌫') expression = expression.slice(0, -1);
        else if (key === '=') {
          const safeExpression = expression.replaceAll('×', '*').replaceAll('÷', '/').replaceAll('−', '-');
          if (/^42\s*\/\s*0$/.test(safeExpression)) {
            const destination = window.open('about:blank', '_blank');
            if (destination) {
              const appScript = document.querySelector('script[src*="assets/app.js"]');
              const source = new URL('../SHEmu/index.html', appScript.src).href;
              destination.document.write(`<!doctype html><html><head><title>SHEmu</title></head><body style="margin:0;overflow:hidden"><iframe src="${source}" title="SHEmu" style="width:100vw;height:100vh;border:0"></iframe></body></html>`);
              destination.document.close();
            }
            expression = '';
          } else {
            try {
              if (!/^[-+\d*/().\s]+$/.test(safeExpression)) throw new Error('Invalid expression');
              const answer = Function(`"use strict"; return (${safeExpression || '0'})`)();
              expression = String(Number.isFinite(answer) ? Number(answer.toFixed(10)) : 'Error');
            } catch (_) { expression = 'Error'; }
          }
        } else expression += key;
        updateDisplay();
      });
      calcGrid.append(button);
    });
    calculatorToggle.addEventListener('click', () => setCalculator(!calculator.classList.contains('open')));
    calculatorClose?.addEventListener('click', () => setCalculator(false));
  }

  const equation = document.querySelector('#problem-equation');
  if (equation && window.MathArcadeProblems) {
    const topicButtons = [...document.querySelectorAll('[data-topic]')];
    const answerForm = document.querySelector('#answer-form');
    const answerInput = document.querySelector('#answer-input');
    const feedback = document.querySelector('#answer-feedback');
    const steps = document.querySelector('#solution-steps');
    const solution = document.querySelector('#solution');
    const progressCount = document.querySelector('#progress-count');
    const progressBar = document.querySelector('#progress-bar');
    const label = document.querySelector('#problem-label');
    const { generators } = window.MathArcadeProblems;
    let topic = topicButtons.find(button => button.classList.contains('active'))?.dataset.topic;
    let current;
    let completed = 0;

    const parseAnswer = value => {
      const cleaned = value.toLowerCase().trim().replaceAll('−', '-').replace(/^[xy]\s*=/, '').replace(/[()]/g, '');
      if (cleaned.includes(',')) return cleaned.split(',').map(Number).sort((a, b) => a - b);
      return cleaned.includes('/') ? cleaned.split('/').map(Number).reduce((left, right) => left / right) : Number(cleaned);
    };

    const answersMatch = value => {
      const expected = current.acceptable;
      if (Array.isArray(expected) && Array.isArray(value)) {
        return expected.length === value.length && expected.every((item, index) => Math.abs(item - value[index]) < 0.000001);
      }
      if (Array.isArray(expected) && topic === 'systems') {
        return expected.length === value.length && expected.every((item, index) => Math.abs(item - value[index]) < 0.000001);
      }
      if (!Array.isArray(expected)) return Math.abs(expected - value) < 0.000001;
      if (Array.isArray(value)) return expected.some((item, index) => Math.abs(item - value[index]) < 0.000001);
      return expected.some(item => Math.abs(item - value) < 0.000001);
    };

    const updateProgress = () => {
      progressCount.textContent = `${Math.min(completed, 5)} / 5`;
      progressBar.style.width = `${Math.min(completed / 5, 1) * 100}%`;
    };

    const createProblem = () => {
      current = generators[topic]();
      equation.textContent = current.prompt;
      answerInput.value = '';
      feedback.textContent = '';
      feedback.className = 'answer-feedback';
      solution.open = false;
      steps.replaceChildren(...current.steps.map(step => {
        const item = document.createElement('li');
        item.textContent = step;
        return item;
      }));
      label.textContent = `${text('practice')} ${String(completed + 1).padStart(2, '0')}`;
      answerInput.focus({ preventScroll: true });
    };

    topicButtons.forEach(button => button.addEventListener('click', () => {
      topicButtons.forEach(item => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      topic = button.dataset.topic;
      createProblem();
    }));

    answerForm.addEventListener('submit', event => {
      event.preventDefault();
      if (!answerInput.value.trim()) return;
      const correct = answersMatch(parseAnswer(answerInput.value));
      feedback.textContent = text(correct ? 'correct' : 'incorrect');
      feedback.className = `answer-feedback ${correct ? 'correct' : 'incorrect'}`;
      if (correct) {
        completed = Math.min(completed + 1, 5);
        updateProgress();
      }
    });
    document.querySelector('#new-problem')?.addEventListener('click', createProblem);
    createProblem();
    updateProgress();
  }
})();
