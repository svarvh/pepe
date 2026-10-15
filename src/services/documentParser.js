// ==========================================================================
// CAPLEN EXAM PREP - DOCUMENT & QUESTION IMPORT PARSER
// Client-side parser for Pasted Text, CSV, TXT, PDF, and DOCX imports
// ==========================================================================

export const DocumentParser = {
  /**
   * Parse text using pattern matching to detect Question Stems, Options, Answer Keys & Explanations.
   * @param {string} rawText
   * @returns {{questions: Array, error: string|null, detectedCount: number}}
   */
  parseText(rawText) {
    if (!rawText || !rawText.trim()) {
      return { questions: [], error: "Text content is empty. Please paste or upload question content.", detectedCount: 0 };
    }

    const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const questions = [];

    let currentQuestion = null;
    let optionRegex = /^(\(?([A-D]|[1-4])\)?[\.\:\-\)]\s*|\b([A-D])\b[\.\:\-\)])\s*(.+)$/i;
    let answerRegex = /^(?:Answer|Correct\s*Answer|Ans|Key)[\:\-\s]+([A-D]|[1-4]|True|False)/i;
    let explanationRegex = /^(?:Explanation|Reason|Solution|Hint)[\:\-\s]+(.+)$/i;
    let questionStartRegex = /^(?:Q(?:uestion)?\s*\d+[\.\:\-\)]|\d+[\.\:\-\)])\s*(.+)$/i;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for Question Start
      const qMatch = line.match(questionStartRegex);
      if (qMatch) {
        if (currentQuestion && currentQuestion.text) {
          questions.push(this.finalizeQuestion(currentQuestion, questions.length + 1));
        }
        currentQuestion = {
          text: qMatch[1],
          options: [],
          correctAnswer: "A",
          explanation: "",
          difficulty: "Medium",
          type: "mcq"
        };
        continue;
      }

      // If no question started yet, create one from initial non-empty line
      if (!currentQuestion) {
        currentQuestion = {
          text: line,
          options: [],
          correctAnswer: "A",
          explanation: "",
          difficulty: "Medium",
          type: "mcq"
        };
        continue;
      }

      // Check for Answer key
      const ansMatch = line.match(answerRegex);
      if (ansMatch) {
        const val = ansMatch[1].toUpperCase();
        currentQuestion.correctAnswer = ["1", "A"].includes(val) ? "A" : ["2", "B"].includes(val) ? "B" : ["3", "C"].includes(val) ? "C" : ["4", "D"].includes(val) ? "D" : val;
        continue;
      }

      // Check for Explanation
      const expMatch = line.match(explanationRegex);
      if (expMatch) {
        currentQuestion.explanation = expMatch[1];
        continue;
      }

      // Check for MCQ Option
      const optMatch = line.match(optionRegex);
      if (optMatch) {
        const optLetter = (optMatch[2] || optMatch[3]).toUpperCase();
        const letterMap = { "1": "A", "2": "B", "3": "C", "4": "D" };
        const id = letterMap[optLetter] || optLetter;
        currentQuestion.options.push({
          id,
          text: optMatch[4].trim()
        });
        continue;
      }

      // If it's extra descriptive text for the question
      if (currentQuestion.options.length === 0) {
        currentQuestion.text += " " + line;
      } else {
        // Extra text after options or continuation of explanation
        if (currentQuestion.explanation) {
          currentQuestion.explanation += " " + line;
        }
      }
    }

    if (currentQuestion && currentQuestion.text) {
      questions.push(this.finalizeQuestion(currentQuestion, questions.length + 1));
    }

    if (questions.length === 0) {
      return {
        questions: [],
        error: "Unable to detect questions. Please verify format (e.g. '1. Question text' followed by 'A) Option 1, B) Option 2, Answer: A').",
        detectedCount: 0
      };
    }

    return { questions, error: null, detectedCount: questions.length };
  },

  /**
   * Parse CSV content with comma or tab delimiters.
   */
  parseCSV(csvText) {
    if (!csvText || !csvText.trim()) {
      return { questions: [], error: "CSV file is empty.", detectedCount: 0 };
    }

    const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) {
      return { questions: [], error: "CSV must contain at least a header row and one data row.", detectedCount: 0 };
    }

    const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/['"]/g, ""));
    const questions = [];

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",").map(cell => cell.trim().replace(/^["']|["']$/g, ""));
      if (row.length < 2) continue;

      const qText = row[0] || `Imported Question ${i}`;
      const optA = row[1] || "Option A";
      const optB = row[2] || "Option B";
      const optC = row[3] || "Option C";
      const optD = row[4] || "Option D";
      const answer = (row[5] || "A").toUpperCase();
      const explanation = row[6] || "Standard syllabus explanation.";

      questions.push({
        id: `imp-csv-${Date.now()}-${i}`,
        text: qText,
        type: "mcq",
        difficulty: "Medium",
        options: [
          { id: "A", text: optA },
          { id: "B", text: optB },
          { id: "C", text: optC },
          { id: "D", text: optD }
        ],
        correctAnswer: ["A", "B", "C", "D"].includes(answer) ? answer : "A",
        explanation,
        marks: 4
      });
    }

    return { questions, error: null, detectedCount: questions.length };
  },

  finalizeQuestion(q, index) {
    const defaultOptions = [
      { id: "A", text: "Option A" },
      { id: "B", text: "Option B" },
      { id: "C", text: "Option C" },
      { id: "D", text: "Option D" }
    ];

    return {
      id: `imported-q-${Date.now()}-${index}`,
      text: q.text,
      type: q.options.length > 0 ? "mcq" : "short_answer",
      difficulty: q.difficulty || "Medium",
      options: q.options.length >= 2 ? q.options : defaultOptions,
      correctAnswer: q.correctAnswer || "A",
      explanation: q.explanation || "Extracted from source document.",
      marks: 3
    };
  },

  /**
   * Sample template to assist students with standard format
   */
  getSampleTemplate() {
    return `1. Which organelle is responsible for generating the majority of cellular ATP via oxidative phosphorylation?
A) Nucleolus
B) Mitochondrion
C) Golgi Apparatus
D) Lysosome
Answer: B
Explanation: Mitochondria contain the electron transport chain complexes across their inner cristae membrane, producing ~30-32 ATP per glucose.

2. In an endothermic chemical reaction at constant pressure, what is the sign of ΔH?
A) Positive (ΔH > 0)
B) Negative (ΔH < 0)
C) Exactly zero
D) Indeterminate without temperature
Answer: A
Explanation: Endothermic reactions absorb thermal energy from their surroundings, resulting in positive enthalpy change.`;
  }
};
