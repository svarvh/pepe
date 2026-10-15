// ==========================================================================
// CAPLEN EXAM PREP - INITIAL SEED DATA & RICH CURRICULUM
// High-fidelity exam prep data with realistic subjects, questions, and papers
// ==========================================================================

export const INITIAL_USER = {
  name: "Alyssa",
  fullName: "Alyssa Vance",
  email: "alyssa.vance@prep.caplen.edu",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
  targetExam: "MCAT & Pre-Med STEM 2026",
  examDate: "2026-11-18",
  weeklyGoalQuestions: 100,
  completedThisWeek: 84
};

export const EXAMS_CATALOG = [
  { id: "mcat", name: "MCAT (Medical College Admission Test)", category: "Medical" },
  { id: "sat", name: "Digital SAT (College Board)", category: "Undergraduate" },
  { id: "jee", name: "JEE Advanced (Engineering Entrance)", category: "Engineering" },
  { id: "gre", name: "GRE General Exam (ETS)", category: "Graduate" },
  { id: "usmle", name: "USMLE Step 1 (Medical Licensing)", category: "Medical Licensing" },
  { id: "cbse12", name: "CBSE Class 12 Board Examination", category: "High School" }
];

export const SUBJECTS_CATALOG = [
  {
    id: "phys",
    name: "Physics: Mechanics & Waves",
    examId: "mcat",
    cardNum: "01",
    themeColor: "lavender", // #BDA3FA
    colorHex: "#BDA3FA",
    icon: "layers",
    totalQuestions: 60,
    attempted: 42,
    correct: 31,
    accuracy: 74,
    progress: 54,
    unitsCount: 4,
    units: ["Kinematics & Dynamics", "Work, Energy & Power", "Wave Mechanics & Sound", "Fluid Dynamics"]
  },
  {
    id: "chem",
    name: "Organic Chemistry & Biochemistry",
    examId: "mcat",
    cardNum: "02",
    themeColor: "cream", // #FFE8C2
    colorHex: "#FFE8C2",
    icon: "grid",
    totalQuestions: 45,
    attempted: 38,
    correct: 33,
    accuracy: 87,
    progress: 83,
    unitsCount: 5,
    units: ["Stereochemistry", "Nucleophilic Substitution", "Carbonyl Chemistry", "Amino Acids & Proteins"]
  },
  {
    id: "math",
    name: "Mathematics: Calculus & Limits",
    examId: "sat",
    cardNum: "03",
    themeColor: "lime", // #E7FA4B
    colorHex: "#E7FA4B",
    icon: "cube",
    totalQuestions: 80,
    attempted: 24,
    correct: 16,
    accuracy: 67,
    progress: 21,
    unitsCount: 6,
    units: ["Limits & Continuity", "Derivatives & Applications", "Definite Integrals", "Differential Equations"]
  },
  {
    id: "bio",
    name: "Cellular & Molecular Biology",
    examId: "mcat",
    cardNum: "04",
    themeColor: "white",
    colorHex: "#FFFFFF",
    icon: "dna",
    totalQuestions: 75,
    attempted: 50,
    correct: 42,
    accuracy: 84,
    progress: 67,
    unitsCount: 5,
    units: ["Cell Structure & Organelles", "Cellular Respiration", "DNA Replication & Repair", "Gene Regulation"]
  }
];

export const INITIAL_QUESTIONS = [
  // --- Physics Questions ---
  {
    id: "q-phys-01",
    examId: "mcat",
    subjectId: "phys",
    unit: "Wave Mechanics & Sound",
    topic: "Doppler Effect",
    type: "mcq",
    difficulty: "Medium",
    text: "An ambulance emitting a siren frequency of 800 Hz approaches a stationary pedestrian at 25 m/s. Given that the speed of sound in air is 343 m/s, what frequency is perceived by the pedestrian?",
    options: [
      { id: "A", text: "745 Hz" },
      { id: "B", text: "863 Hz" },
      { id: "C", text: "912 Hz" },
      { id: "D", text: "800 Hz" }
    ],
    correctAnswer: "B",
    explanation: "Using the Doppler effect equation for an approaching source: f' = f * [v / (v - v_s)]. Here f' = 800 * [343 / (343 - 25)] = 800 * (343 / 318) ≈ 800 * 1.0786 ≈ 863 Hz. Because the source approaches the observer, the perceived frequency must be higher than the emitted frequency.",
    marks: 4,
    pyqReference: "MCAT 2023 Physical Sciences Sec. 3"
  },
  {
    id: "q-phys-02",
    examId: "mcat",
    subjectId: "phys",
    unit: "Kinematics & Dynamics",
    topic: "Projectile Motion",
    type: "mcq",
    difficulty: "Easy",
    text: "A projectile is launched from ground level at an angle of 30° above horizontal with an initial velocity of 40 m/s. Assuming g = 9.8 m/s² and negligible air resistance, what is its vertical velocity at the peak of its trajectory?",
    options: [
      { id: "A", text: "0 m/s" },
      { id: "B", text: "20 m/s" },
      { id: "C", text: "34.6 m/s" },
      { id: "D", text: "40 m/s" }
    ],
    correctAnswer: "A",
    explanation: "At the peak of any parabolic projectile trajectory, the vertical component of velocity (v_y) momentarily becomes 0 m/s as it transitions from ascending to descending. The horizontal component remains constant at v_0 * cos(30°).",
    marks: 2,
    pyqReference: "SAT Math II & MCAT Physics Foundational"
  },
  {
    id: "q-phys-03",
    examId: "mcat",
    subjectId: "phys",
    unit: "Fluid Dynamics",
    topic: "Bernoulli's Principle",
    type: "mcq",
    difficulty: "Hard",
    text: "Water flows horizontally through an idealized constriction where the cross-sectional area of the pipe is halved. By what factor does the kinetic energy density of the fluid change across the constriction?",
    options: [
      { id: "A", text: "It remains unchanged" },
      { id: "B", text: "It doubles (factor of 2)" },
      { id: "C", text: "It quadruples (factor of 4)" },
      { id: "D", text: "It is halved (factor of 0.5)" }
    ],
    correctAnswer: "C",
    explanation: "By the continuity equation for incompressible flow, A1*v1 = A2*v2. If A2 = A1 / 2, then v2 = 2*v1. Kinetic energy density is defined as (1/2)*ρ*v². Since velocity doubles, v² increases by a factor of 2² = 4. Hence, the kinetic energy density quadruples.",
    marks: 4,
    pyqReference: "MCAT Biological & Physical Section 2022"
  },
  {
    id: "q-phys-04",
    examId: "mcat",
    subjectId: "phys",
    unit: "Work, Energy & Power",
    topic: "Conservation of Energy",
    type: "true_false",
    difficulty: "Easy",
    text: "In an isolated mechanical system containing only conservative forces (such as gravity and ideal springs), total mechanical energy is always conserved.",
    options: [
      { id: "T", text: "True" },
      { id: "F", text: "False" }
    ],
    correctAnswer: "T",
    explanation: "True. In the absence of non-conservative forces like friction, air resistance, or internal thermal dissipation, the sum of kinetic and potential energy (E_total = K + U) remains constant over time.",
    marks: 2,
    pyqReference: "Foundational Physics Exam Archive"
  },
  {
    id: "q-phys-05",
    examId: "mcat",
    subjectId: "phys",
    unit: "Wave Mechanics & Sound",
    topic: "Resonance in Pipes",
    type: "mcq",
    difficulty: "Medium",
    text: "For a pipe of length L closed at one end and open at the other, what is the wavelength of the fundamental harmonic?",
    options: [
      { id: "A", text: "λ = 2L" },
      { id: "B", text: "λ = 4L" },
      { id: "C", text: "λ = L" },
      { id: "D", text: "λ = L/2" }
    ],
    correctAnswer: "B",
    explanation: "A closed-one-end pipe has a displacement node at the closed end and an antinode at the open end. The distance from node to antinode is a quarter wavelength (L = λ/4), so λ = 4L.",
    marks: 3,
    pyqReference: "MCAT Physical Foundations 2023"
  },

  // --- Chemistry Questions ---
  {
    id: "q-chem-01",
    examId: "mcat",
    subjectId: "chem",
    unit: "Stereochemistry",
    topic: "Chirality & Enantiomers",
    type: "mcq",
    difficulty: "Medium",
    text: "Which of the following molecules possesses a chiral stereocenter and is capable of rotating plane-polarized light?",
    options: [
      { id: "A", text: "2-Chloropropane" },
      { id: "B", text: "2-Chlorobutane" },
      { id: "C", text: "1-Chloropropane" },
      { id: "D", text: "Dichloromethane" }
    ],
    correctAnswer: "B",
    explanation: "In 2-chlorobutane (CH3-C*H(Cl)-CH2-CH3), carbon-2 is bonded to four distinct substituents: a methyl group (-CH3), an ethyl group (-CH2CH3), a chlorine atom (-Cl), and a hydrogen atom (-H). This creates an asymmetric chiral center that exhibits optical activity.",
    marks: 4,
    pyqReference: "MCAT 2024 Biological Foundations"
  },
  {
    id: "q-chem-02",
    examId: "mcat",
    subjectId: "chem",
    unit: "Nucleophilic Substitution",
    topic: "SN1 vs SN2 Mechanisms",
    type: "mcq",
    difficulty: "Hard",
    text: "A reaction of (R)-2-bromooctane with sodium cyanide (NaCN) in dimethyl sulfoxide (DMSO) yields primarily:",
    options: [
      { id: "A", text: "A racemic mixture of (R) and (S)-2-cyanooctane via SN1" },
      { id: "B", text: "(S)-2-cyanooctane with complete Walden inversion via SN2" },
      { id: "C", text: "(R)-2-cyanooctane with retention of configuration" },
      { id: "D", text: "An alkene product exclusively via E1 elimination" }
    ],
    correctAnswer: "B",
    explanation: "Cyanide (CN⁻) is a strong nucleophile, and DMSO is a polar aprotic solvent that favors bimolecular nucleophilic substitution (SN2). Secondary alkyl halides under strong nucleophile / polar aprotic conditions proceed via SN2 backside attack, yielding full stereochemical inversion (Walden inversion) from (R) to (S).",
    marks: 4,
    pyqReference: "JEE Advanced 2023 Chemistry Paper 2"
  },
  {
    id: "q-chem-03",
    examId: "mcat",
    subjectId: "chem",
    unit: "Amino Acids & Proteins",
    topic: "Isoelectric Point (pI)",
    type: "short_answer",
    difficulty: "Medium",
    text: "What is the net electrical charge of the amino acid Alanine (pKa1 = 2.34, pKa2 = 9.69) in a physiological buffer solution at pH = 7.4?",
    options: [],
    correctAnswer: "0",
    explanation: "At pH 7.4, the alpha-carboxyl group (pKa 2.34) is deprotonated into a negatively charged carboxylate (-COO⁻, -1). The alpha-amino group (pKa 9.69) remains protonated as an ammonium ion (-NH3⁺, +1). The net charge is (-1) + (+1) = 0, existing primarily as a zwitterion.",
    marks: 3,
    pyqReference: "MCAT Biochemical Foundations 2023"
  },
  {
    id: "q-chem-04",
    examId: "mcat",
    subjectId: "chem",
    unit: "Carbonyl Chemistry",
    topic: "Aldol Condensation",
    type: "mcq",
    difficulty: "Hard",
    text: "In base-catalyzed aldol condensation of acetaldehyde, what is the initial reactive intermediate formed by hydroxide deprotonation?",
    options: [
      { id: "A", text: "Enolate resonance hybrid" },
      { id: "B", text: "Carbocation at C-1" },
      { id: "C", text: "Oxonium ion" },
      { id: "D", text: "Acyl radical" }
    ],
    correctAnswer: "A",
    explanation: "Hydroxide abstracts an alpha-proton adjacent to the carbonyl group, generating a resonance-stabilized enolate anion (carbanion ↔ enol-oxide).",
    marks: 4,
    pyqReference: "MCAT Chemical Foundations 2024"
  },

  // --- Mathematics Questions ---
  {
    id: "q-math-01",
    examId: "sat",
    subjectId: "math",
    unit: "Derivatives & Applications",
    topic: "L'Hôpital's Rule",
    type: "mcq",
    difficulty: "Medium",
    text: "Evaluate the limit: lim (x → 0) [sin(5x) / (3x)].",
    options: [
      { id: "A", text: "0" },
      { id: "B", text: "1" },
      { id: "C", text: "5/3" },
      { id: "D", text: "Undefined" }
    ],
    correctAnswer: "C",
    explanation: "Direct substitution yields 0/0, an indeterminate form. Applying L'Hôpital's Rule: differentiate the numerator d/dx[sin(5x)] = 5*cos(5x), and differentiate the denominator d/dx[3x] = 3. Taking the limit as x → 0 gives 5*cos(0)/3 = 5(1)/3 = 5/3.",
    marks: 3,
    pyqReference: "SAT Math Advanced / AP Calculus AB"
  },
  {
    id: "q-math-02",
    examId: "sat",
    subjectId: "math",
    unit: "Definite Integrals",
    topic: "Fundamental Theorem of Calculus",
    type: "mcq",
    difficulty: "Hard",
    text: "What is the value of the definite integral ∫ from 0 to π/2 of [cos(x) * e^(sin(x))] dx?",
    options: [
      { id: "A", text: "e - 1" },
      { id: "B", text: "e" },
      { id: "C", text: "1" },
      { id: "D", text: "e + 1" }
    ],
    correctAnswer: "A",
    explanation: "Use substitution: let u = sin(x), then du = cos(x) dx. When x = 0, u = sin(0) = 0. When x = π/2, u = sin(π/2) = 1. The integral transforms into ∫ from 0 to 1 of e^u du = [e^u] from 0 to 1 = e^1 - e^0 = e - 1.",
    marks: 4,
    pyqReference: "JEE Advanced 2022 Mathematics"
  },
  {
    id: "q-math-03",
    examId: "sat",
    subjectId: "math",
    unit: "Limits & Continuity",
    topic: "Continuous Functions",
    type: "true_false",
    difficulty: "Easy",
    text: "If a function f(x) is differentiable at x = a, it must also be continuous at x = a.",
    options: [
      { id: "T", text: "True" },
      { id: "F", text: "False" }
    ],
    correctAnswer: "T",
    explanation: "True. Differentiability implies continuity. Since f'(a) = lim [f(x)-f(a)]/(x-a) exists, lim [f(x)-f(a)] = lim f'(a)*(x-a) = 0, which means lim f(x) = f(a), the definition of continuity.",
    marks: 2,
    pyqReference: "Calculus Foundations Archive"
  },

  // --- Biology Questions ---
  {
    id: "q-bio-01",
    examId: "mcat",
    subjectId: "bio",
    unit: "Cellular Respiration",
    topic: "Electron Transport Chain",
    type: "mcq",
    difficulty: "Medium",
    text: "During aerobic cellular respiration in eukaryotes, what is the terminal electron acceptor in the mitochondrial electron transport chain?",
    options: [
      { id: "A", text: "NAD+" },
      { id: "B", text: "Molecular Oxygen (O2)" },
      { id: "C", text: "Pyruvate" },
      { id: "D", text: "Cytochrome c" }
    ],
    correctAnswer: "B",
    explanation: "Complex IV (Cytochrome c oxidase) transfers electrons to molecular oxygen (O2), which combines with free matrix protons to produce water (H2O). Without O2 as the terminal acceptor, the entire chain backs up and oxidative phosphorylation halts.",
    marks: 3,
    pyqReference: "MCAT Biological Sciences 2023"
  },
  {
    id: "q-bio-02",
    examId: "mcat",
    subjectId: "bio",
    unit: "DNA Replication & Repair",
    topic: "Lagging Strand Synthesis",
    type: "mcq",
    difficulty: "Hard",
    text: "Which enzyme is primarily responsible for sealing the nick in the phosphodiester backbone between adjacent Okazaki fragments on the lagging strand during eukaryotic DNA replication?",
    options: [
      { id: "A", text: "DNA Helicase" },
      { id: "B", text: "Topoisomerase II" },
      { id: "C", text: "DNA Ligase I" },
      { id: "D", text: "DNA Primase" }
    ],
    correctAnswer: "C",
    explanation: "DNA Ligase I catalyzes the formation of a phosphodiester bond between the 3'-hydroxyl of one fragment and the 5'-phosphate of the adjacent fragment, effectively sealing the nicked lagging strand backbone.",
    marks: 4,
    pyqReference: "MCAT Bio/Biochem Foundation 2024"
  }
];

export const PREVIOUS_YEAR_PAPERS = [
  {
    id: "pyp-01",
    title: "MCAT Biological and Biochemical Foundations (Official Solved Paper)",
    exam: "MCAT",
    examId: "mcat",
    board: "AAMC (Association of American Medical Colleges)",
    subject: "Biology & Biochemistry",
    subjectId: "bio",
    year: "2024",
    paperType: "Official Solved Paper",
    pages: 42,
    questionsCount: 59,
    duration: "95 mins",
    solved: true,
    hasAnswerKey: true,
    downloadUrl: "#",
    summary: "Authentic practice exam covering biomolecules, cellular systems, organ systems, and biological research experimental passage questions with step-by-step verified explanations."
  },
  {
    id: "pyp-02",
    title: "Digital SAT Mathematics & Problem Solving — Practice Exam 4",
    exam: "SAT",
    examId: "sat",
    board: "College Board",
    subject: "Mathematics",
    subjectId: "math",
    year: "2024",
    paperType: "Official Model Paper",
    pages: 28,
    questionsCount: 44,
    duration: "70 mins",
    solved: true,
    hasAnswerKey: true,
    downloadUrl: "#",
    summary: "Module 1 and Module 2 adaptive math questions including algebra, advanced math, geometry, trigonometry, and data analysis."
  },
  {
    id: "pyp-03",
    title: "JEE Advanced Physics Paper 1 (With Official Solutions & Hints)",
    exam: "JEE Advanced",
    examId: "jee",
    board: "IIT Madras / Joint Admission Board",
    subject: "Physics",
    subjectId: "phys",
    year: "2024",
    paperType: "Official Question Paper",
    pages: 36,
    questionsCount: 51,
    duration: "180 mins",
    solved: true,
    hasAnswerKey: true,
    downloadUrl: "#",
    summary: "High-level multi-correct, integer-type, and comprehension passage questions testing rotational dynamics, electrostatics, modern physics, and thermodynamics."
  },
  {
    id: "pyp-04",
    title: "MCAT Chemical and Physical Foundations of Biological Systems",
    exam: "MCAT",
    examId: "mcat",
    board: "AAMC",
    subject: "Chemistry & Physics",
    subjectId: "chem",
    year: "2023",
    paperType: "Solved Archive",
    pages: 48,
    questionsCount: 59,
    duration: "95 mins",
    solved: true,
    hasAnswerKey: true,
    downloadUrl: "#",
    summary: "Full practice section on general chemistry, organic synthesis, bio-physics, and fluid physiology."
  },
  {
    id: "pyp-05",
    title: "GRE Quantitative Reasoning Practice Assessment 2",
    exam: "GRE",
    examId: "gre",
    board: "Educational Testing Service (ETS)",
    subject: "Mathematics & Quantitative",
    subjectId: "math",
    year: "2023",
    paperType: "Official Sample",
    pages: 22,
    questionsCount: 40,
    duration: "70 mins",
    solved: true,
    hasAnswerKey: true,
    downloadUrl: "#",
    summary: "Quantitative comparison, numeric entry, and data interpretation questions aligned with the revised shorter GRE format."
  },
  {
    id: "pyp-06",
    title: "CBSE Class 12 All India Senior School Certificate Chemistry Examination",
    exam: "CBSE Class 12",
    examId: "cbse12",
    board: "Central Board of Secondary Education",
    subject: "Chemistry",
    subjectId: "chem",
    year: "2024",
    paperType: "Board Exam Paper",
    pages: 18,
    questionsCount: 35,
    duration: "180 mins",
    solved: true,
    hasAnswerKey: true,
    downloadUrl: "#",
    summary: "Standard curriculum board exam including Solutions, Electrochemistry, Chemical Kinetics, Coordination Compounds, and Organic Biomolecules."
  }
];

export const IMPORTANT_TOPICS = [
  {
    id: "top-01",
    examId: "mcat",
    subjectId: "phys",
    unit: "Wave Mechanics & Sound",
    title: "Doppler Effect & Resonance in Open/Closed Pipes",
    priority: "High",
    testedFrequency: "Tested in 9 of last 10 AAMC exams",
    status: "in_progress",
    overview: "The Doppler effect describes the observed frequency shift when source and detector are in relative motion. Longitudinal sound waves forming standing patterns in air columns are tested in both clinical ultrasound and pulmonary diagnostics.",
    keyConcepts: [
      "Apparent frequency equation: f' = f * [(v ± v_d) / (v ∓ v_s)]",
      "Sign convention: Top signs for motion TOWARD each other; bottom signs for motion AWAY.",
      "Open pipe harmonics: λ = 2L / n (all harmonics n=1,2,3... present)",
      "Closed-one-end pipe harmonics: λ = 4L / n (only odd harmonics n=1,3,5... present)"
    ],
    formulas: [
      "f' = f * (v ± v_D) / (v ∓ v_S)",
      "v = f * λ",
      "β = 10 * log10(I / I_0) [Sound Level in dB]"
    ],
    revisionNotes: "Always assign directions before plugging into the Doppler equation. If distance is closing, perceived frequency MUST be higher than source frequency.",
    sampleQuestionIds: ["q-phys-01", "q-phys-05"]
  },
  {
    id: "top-02",
    examId: "mcat",
    subjectId: "chem",
    unit: "Stereochemistry",
    title: "Chirality, R/S Configuration & Optical Resolution",
    priority: "High",
    testedFrequency: "Tested in 100% of analyzed MCAT test forms",
    status: "revised",
    overview: "Stereochemistry governs drug-receptor interactions. Stereocenters with 4 non-identical substituents produce enantiomers with identical physical properties (except optical rotation) and diastereomers with differing properties.",
    keyConcepts: [
      "Cahn-Ingold-Prelog (CIP) priority rules based on atomic number (Z).",
      "R/S assignment: Priority 1 -> 2 -> 3 with priority 4 oriented into the page (dashed wedge).",
      "Clockwise is R; counter-clockwise is S (reverse if 4 points toward observer).",
      "Meso compounds possess stereocenters but an internal mirror plane, rendering them optically inactive."
    ],
    formulas: [
      "Max stereoisomers = 2^n (where n = number of chiral centers)",
      "[α] = α_observed / (c * l) [Specific rotation]"
    ],
    revisionNotes: "Enantiomers have equal and opposite specific rotations. A 50:50 racemic mixture produces zero net optical rotation.",
    sampleQuestionIds: ["q-chem-01"]
  },
  {
    id: "top-03",
    examId: "mcat",
    subjectId: "chem",
    unit: "Nucleophilic Substitution",
    title: "SN1 vs SN2 Reaction Mechanisms & Kinetics",
    priority: "High",
    testedFrequency: "High yield - 8 recent PYQ appearances",
    status: "in_progress",
    overview: "Comparison of unimolecular (carbocation intermediate) vs bimolecular (concerted backside attack) aliphatic nucleophilic substitutions.",
    keyConcepts: [
      "SN1: Stepwise, carbocation intermediate, 3° > 2° > 1° substrate, weak nucleophile, polar protic solvent, racemization.",
      "SN2: Concerted, no intermediate, 1° > 2° > 3° substrate, strong nucleophile, polar aprotic solvent, complete Walden inversion."
    ],
    formulas: [
      "Rate(SN1) = k [Substrate]",
      "Rate(SN2) = k [Substrate][Nucleophile]"
    ],
    revisionNotes: "Polar aprotic solvents (DMSO, DMF, acetone) enhance SN2 by leaving nucleophiles unencumbered by hydrogen-bonding solvent shells.",
    sampleQuestionIds: ["q-chem-02"]
  },
  {
    id: "top-04",
    examId: "sat",
    subjectId: "math",
    unit: "Derivatives & Applications",
    title: "Limits, Continuity & L'Hôpital's Indeterminate Forms",
    priority: "Medium",
    testedFrequency: "Frequently tested in AP Calc & Digital SAT Advanced",
    status: "not_started",
    overview: "Methods to resolve 0/0 and ∞/∞ indeterminate limits analytically without graphing.",
    keyConcepts: [
      "Differentiate numerator and denominator independently (not quotient rule!).",
      "Verify indeterminate form condition holds prior to each differentiation iteration."
    ],
    formulas: [
      "lim [f(x)/g(x)] = lim [f'(x)/g'(x)] when f,g -> 0 or ±∞"
    ],
    revisionNotes: "Do not apply L'Hôpital if denominator does not evaluate to 0 or ±∞.",
    sampleQuestionIds: ["q-math-01"]
  },
  {
    id: "top-05",
    examId: "mcat",
    subjectId: "bio",
    unit: "Cellular Respiration",
    title: "Oxidative Phosphorylation & Chemiosmotic Coupling",
    priority: "High",
    testedFrequency: "Core biology passage topic every year",
    status: "completed",
    overview: "The flow of electrons through Complex I-IV creates a proton gradient across the inner mitochondrial membrane that drives ATP Synthase.",
    keyConcepts: [
      "NADH enters at Complex I (pumps 4 H+); FADH2 enters at Complex II (does not pump H+).",
      "Coenzyme Q (ubiquinone) and Cytochrome c act as mobile electron shuttles.",
      "Oxygen is reduced to water at Complex IV."
    ],
    formulas: [
      "1 NADH ≈ 2.5 ATP",
      "1 FADH2 ≈ 1.5 ATP"
    ],
    revisionNotes: "Remember that the intermembrane space has a lower pH (higher [H+]) than the mitochondrial matrix.",
    sampleQuestionIds: ["q-bio-01"]
  }
];

export const INITIAL_PRACTICE_SESSIONS = [
  {
    id: "sess-01",
    timestamp: "2026-10-21T14:30:00Z",
    dateFormatted: "21 Oct, 2026",
    title: "Color Theory & Optical Mechanics",
    subjectId: "phys",
    subjectName: "Physics: Mechanics & Waves",
    totalQuestions: 15,
    correctAnswers: 12,
    accuracy: 80,
    timeSpentSeconds: 780,
    topicBreakdown: [
      { topic: "Wave Optics", correct: 5, total: 6 },
      { topic: "Doppler Effect", correct: 4, total: 5 },
      { topic: "Refraction", correct: 3, total: 4 }
    ],
    missedQuestionIds: ["q-phys-03"]
  },
  {
    id: "sess-02",
    timestamp: "2026-10-21T09:15:00Z",
    dateFormatted: "21 Oct, 2026",
    title: "Filtering & Sorting: Organic Mechanisms",
    subjectId: "chem",
    subjectName: "Organic Chemistry & Biochemistry",
    totalQuestions: 20,
    correctAnswers: 17,
    accuracy: 85,
    timeSpentSeconds: 1140,
    topicBreakdown: [
      { topic: "SN1 vs SN2", correct: 8, total: 9 },
      { topic: "Stereochemistry", correct: 9, total: 11 }
    ],
    missedQuestionIds: ["q-chem-02"]
  },
  {
    id: "sess-03",
    timestamp: "2026-10-19T16:00:00Z",
    dateFormatted: "19 Oct, 2026",
    title: "Calculus & Limits Diagnostic Drill",
    subjectId: "math",
    subjectName: "Mathematics: Calculus & Limits",
    totalQuestions: 25,
    correctAnswers: 16,
    accuracy: 64,
    timeSpentSeconds: 1650,
    topicBreakdown: [
      { topic: "L'Hôpital's Rule", correct: 7, total: 10 },
      { topic: "Definite Integrals", correct: 9, total: 15 }
    ],
    missedQuestionIds: ["q-math-02"]
  },
  {
    id: "sess-04",
    timestamp: "2026-10-18T11:20:00Z",
    dateFormatted: "18 Oct, 2026",
    title: "Bioenergetics & Respiration Sprint",
    subjectId: "bio",
    subjectName: "Cellular & Molecular Biology",
    totalQuestions: 24,
    correctAnswers: 23,
    accuracy: 96,
    timeSpentSeconds: 1220,
    topicBreakdown: [
      { topic: "Electron Transport Chain", correct: 12, total: 12 },
      { topic: "Glycolysis & Krebs", correct: 11, total: 12 }
    ],
    missedQuestionIds: []
  }
];

export const UPCOMING_EVENTS = [
  {
    id: "evt-01",
    date: "2026-10-27",
    time: "10:00 - 12:30",
    title: "3D Design Foundations: Test Level 1",
    subject: "3D Spatial Mechanics",
    type: "Timed Mock Exam",
    badgeColor: "lime"
  },
  {
    id: "evt-02",
    date: "2026-10-28",
    time: "14:00 - 15:30",
    title: "Organic Reaction Synthesis Sprint",
    subject: "Organic Chemistry",
    type: "Review Session",
    badgeColor: "cream"
  },
  {
    id: "evt-03",
    date: "2026-10-30",
    time: "09:00 - 11:00",
    title: "Full-Length Diagnostic Mock Test #3",
    subject: "All Subjects",
    type: "Diagnostic Test",
    badgeColor: "lavender"
  }
];
