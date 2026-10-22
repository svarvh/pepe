// ==========================================================================
// CAPLEN EXAM PREP - FACULTY SEED DATA & PRE-LOADED ACADEMIC RESOURCES
// Grounded curriculum resources for Prof. Sunita Rao (Senior HOD Sciences)
// ==========================================================================

export const SEED_FACULTY_CLASSES = [
  {
    id: "cls-12-med",
    name: "Class 12 - Section A (Medical / NEET Prep)",
    subject: "Biology & Chemistry",
    board: "CBSE & NEET",
    studentCount: 42,
    academicYear: "2026–2027",
    status: "active"
  },
  {
    id: "cls-12-eng",
    name: "Class 12 - Section B (Non-Medical / JEE)",
    subject: "Chemistry & Physics",
    board: "CBSE & JEE Main",
    studentCount: 38,
    academicYear: "2026–2027",
    status: "active"
  },
  {
    id: "cls-11-sci",
    name: "Class 11 - Section A (Senior Secondary)",
    subject: "Biology & Cell Sciences",
    board: "CBSE",
    studentCount: 45,
    academicYear: "2026–2027",
    status: "active"
  },
  {
    id: "cls-10-fnd",
    name: "Class 10 - Section C (Foundation Sciences)",
    subject: "General Science & Chemistry",
    board: "CBSE Foundations",
    studentCount: 36,
    academicYear: "2026–2027",
    status: "active"
  }
];

export const SEED_FACULTY_RESOURCES = [
  {
    id: "fac-res-01",
    title: "Class 12 Biology: Evolution & Population Genetics Master Notes",
    description: "Complete NCERT Chapter 7 curriculum notes with Darwinian axioms, Industrial Melanism allele shifts, Hardy-Weinberg derivations, and 12 illustrative diagram breakdowns.",
    classGrade: "Class 12",
    board: "CBSE / State Boards",
    subject: "Biology",
    subjectId: "bio_12",
    chapter: "Chapter 7: Evolution",
    topic: "Natural Selection & Population Dynamics",
    resourceType: "Comprehensive Notes",
    status: "published",
    visibility: "public_classes",
    targetClasses: ["Class 12 - Section A (Medical / NEET Prep)"],
    fileName: "Bio12_Evolution_Darwin_NaturalSelection.pdf",
    fileSize: "2.8 MB",
    fileType: "application/pdf",
    pageCount: 18,
    extractedText: `CHAPTER 7: EVOLUTION - FACULTY MASTER NOTES
Prof. Sunita Rao, Senior HOD Sciences

1. DARWINIAN THEORY OF EVOLUTION
Charles Darwin and Alfred Russel Wallace independently proposed natural selection as the mechanism of evolution.
Key observations:
- Natural resources are limited; populations remain stable in size except for seasonal fluctuations.
- Members of a population vary in characteristics, even though superficially they look similar.
- Variations are inheritable.
- Those individuals with characteristics which enable them to survive better in the natural environment leave more progeny. This differential reproduction is known as Natural Selection.

2. INDUSTRIAL MELANISM IN BISTON BETULARIA
In England before industrialization (1850s), white-winged moths were prevalent because white lichens covered tree trunks.
After industrialization (1920s), soot covered the trees. The dark-winged (melanic) moths had higher survival because predators could not easily spot them against dark soot.
Key principle: In a mixed population, individuals better adapted survive and increase in proportion. Evolution is not directed; it is a stochastic process based on chance events in nature and chance mutations.

3. HARDY-WEINBERG EQUILIBRIUM
In a given population, allele frequencies and genotypes remain constant from generation to generation in the absence of evolutionary influences.
Equation: p² + 2pq + q² = 1, where p = frequency of dominant allele, q = frequency of recessive allele.
Five evolutionary forces that disrupt equilibrium:
1. Gene migration or gene flow
2. Genetic drift (Founder Effect & Bottleneck)
3. Mutation
4. Genetic recombination
5. Natural selection`,
    ownerId: "usr_faculty_01",
    ownerName: "Prof. Sunita Rao",
    ownerTitle: "Senior HOD Sciences",
    createdAt: "2026-10-18T10:00:00Z",
    updatedAt: "2026-10-21T14:30:00Z",
    version: 2
  },
  {
    id: "fac-res-02",
    title: "Class 12 Chemistry: Chemical Kinetics Integrated Rate Laws & Arrhenius Numericals",
    description: "Step-by-step calculus derivations for zero and first order rate equations, graphical slope analysis, pseudo-first order hydrolysis, and 10 solved numericals on activation energy.",
    classGrade: "Class 12",
    board: "CBSE",
    subject: "Chemistry",
    subjectId: "chem_12",
    chapter: "Chapter 4: Chemical Kinetics",
    topic: "Integrated Rate Equations & Arrhenius Equation",
    resourceType: "Formula & Derivation Sheet",
    status: "published",
    visibility: "public_classes",
    targetClasses: [
      "Class 12 - Section A (Medical / NEET Prep)",
      "Class 12 - Section B (Non-Medical / JEE)"
    ],
    fileName: "Chem12_Kinetics_RateLaws_Arrhenius.pdf",
    fileSize: "3.4 MB",
    fileType: "application/pdf",
    pageCount: 14,
    extractedText: `CHAPTER 4: CHEMICAL KINETICS - INTEGRATED RATE LAWS
Prof. Sunita Rao, Department of Biological & Chemical Sciences

1. ZERO ORDER REACTIONS
Rate = -d[R]/dt = k[R]⁰ = k
Integrating: [R] = -kt + [R]₀
Plot of [R] vs t gives a straight line with slope = -k and intercept = [R]₀.
Half-life: t₁/₂ = [R]₀ / 2k (directly proportional to initial reactant concentration).

2. FIRST ORDER REACTIONS
Rate = -d[R]/dt = k[R]
Integrating: ln[R] = -kt + ln[R]₀, or k = (2.303 / t) * log₁₀([R]₀ / [R])
Plot of log₁₀[R] vs t yields slope = -k / 2.303.
Half-life: t₁/₂ = 0.693 / k (independent of initial concentration).

3. ARRHENIUS EQUATION AND ACTIVATION ENERGY
k = A * e^(-Ea / RT)
Taking natural logarithm: ln k = ln A - (Ea / RT)
In log₁₀ form: log₁₀(k₂ / k₁) = (Ea / 2.303R) * [(T₂ - T₁) / (T₁ * T₂)]
Where Ea is activation energy in Joules/mole, R = 8.314 J K⁻¹ mol⁻¹, T in Kelvin.`,
    ownerId: "usr_faculty_01",
    ownerName: "Prof. Sunita Rao",
    ownerTitle: "Senior HOD Sciences",
    createdAt: "2026-10-19T09:15:00Z",
    updatedAt: "2026-10-21T16:00:00Z",
    version: 1
  },
  {
    id: "fac-res-03",
    title: "Class 12 Biology: Molecular Basis of Inheritance Replication Fork Handout (Draft)",
    description: "Detailed breakdown of semi-conservative replication, Meselson-Stahl density gradient centrifugation, and Okazaki fragment ligation by DNA ligase.",
    classGrade: "Class 12",
    board: "CBSE / NEET",
    subject: "Biology",
    subjectId: "bio_12",
    chapter: "Chapter 6: Molecular Basis of Inheritance",
    topic: "DNA Replication Machinery",
    resourceType: "Revision Guide",
    status: "draft",
    visibility: "private",
    targetClasses: ["Class 12 - Section A (Medical / NEET Prep)"],
    fileName: "Bio12_Ch6_Replication_Fork_LectureNotes_Draft.pdf",
    fileSize: "1.9 MB",
    fileType: "application/pdf",
    pageCount: 9,
    extractedText: `CHAPTER 6: MOLECULAR BASIS OF INHERITANCE
Prof. Sunita Rao (Lecture Draft)

Key enzymes of DNA replication:
1. Helicase: Unwinds the double helix at the origin of replication.
2. Single-Stranded Binding Proteins (SSBP): Prevent re-annealing of exposed template strands.
3. DNA Topoisomerase / Gyrase: Relieves torsional strain ahead of replication fork.
4. RNA Primase: Synthesizes short 10-12 nucleotide RNA primer.
5. DNA Polymerase III: Synthesizes new complementary DNA in strict 5' -> 3' direction.
Leading strand is continuous; lagging strand is discontinuous, forming Okazaki fragments later joined by DNA Ligase via phosphodiester linkages.`,
    ownerId: "usr_faculty_01",
    ownerName: "Prof. Sunita Rao",
    ownerTitle: "Senior HOD Sciences",
    createdAt: "2026-10-21T11:00:00Z",
    updatedAt: "2026-10-22T08:30:00Z",
    version: 1
  }
];

export const SEED_FACULTY_QUESTIONS = [
  {
    id: "fac-q-01",
    stem: "Which of the following conditions is mandatory for Hardy-Weinberg equilibrium to hold true across generations in a diploid population?",
    type: "mcq",
    subjectId: "bio_12",
    subject: "Biology",
    chapter: "Chapter 7: Evolution",
    topic: "Hardy-Weinberg Principle",
    difficulty: "Medium",
    options: [
      { id: "A", text: "Infinitely large population size with random mating" },
      { id: "B", text: "Continuous directional selection favoring heterozygotes" },
      { id: "C", text: "High rate of forward mutations" },
      { id: "D", text: "Frequent immigration from adjacent demes" }
    ],
    correctOption: "A",
    explanation: "Hardy-Weinberg equilibrium strictly assumes infinite population size (eliminating genetic drift), random mating, no mutation, no gene flow, and no differential reproductive selection.",
    marks: 1,
    source: "Faculty Created",
    pageRef: "Faculty Evolution Notes Pg 4",
    approvalStatus: "approved",
    ownerId: "usr_faculty_01",
    ownerName: "Prof. Sunita Rao"
  },
  {
    id: "fac-q-02",
    stem: "A first order reaction is 50% complete in 20 minutes. What will be the time required for 99.9% completion of this reaction?",
    type: "mcq",
    subjectId: "chem_12",
    subject: "Chemistry",
    chapter: "Chapter 4: Chemical Kinetics",
    topic: "First Order Kinetics",
    difficulty: "Hard",
    options: [
      { id: "A", text: "200 minutes (~10 half-lives)" },
      { id: "B", text: "100 minutes" },
      { id: "C", text: "400 minutes" },
      { id: "D", text: "60 minutes" }
    ],
    correctOption: "A",
    explanation: "t_99.9% = (2.303 / k) * log(100 / 0.1) = (2.303 / k) * 3 = 6.909 / k. Since t_1/2 = 0.693 / k, t_99.9% = 10 * t_1/2 = 10 * 20 min = 200 minutes.",
    marks: 2,
    source: "AI Generated From Faculty Material",
    pageRef: "Faculty Kinetics Notes, Slide 7",
    approvalStatus: "approved",
    ownerId: "usr_faculty_01",
    ownerName: "Prof. Sunita Rao"
  },
  {
    id: "fac-q-03",
    stem: "State the biological significance of Industrial Melanism observed in peppered moths (Biston betularia) in pre- and post-industrial Great Britain.",
    type: "short_answer",
    subjectId: "bio_12",
    subject: "Biology",
    chapter: "Chapter 7: Evolution",
    topic: "Natural Selection",
    difficulty: "Medium",
    options: [],
    correctOption: "Differential predation survival due to cryptic camouflage against lichenized vs soot-darkened tree trunks.",
    explanation: "Demonstrates that natural selection acts on existing phenotypic variations. Light moths had selective advantage before industrialization; dark melanic mutants possessed selective survival advantage when soot deposited on barks.",
    marks: 3,
    source: "Faculty Created",
    pageRef: "Faculty Evolution Notes Pg 2",
    approvalStatus: "approved",
    ownerId: "usr_faculty_01",
    ownerName: "Prof. Sunita Rao"
  },
  {
    id: "fac-q-04",
    stem: "True or False: The rate constant k of an endothermic chemical reaction always increases with an increase in absolute temperature.",
    type: "true_false",
    subjectId: "chem_12",
    subject: "Chemistry",
    chapter: "Chapter 4: Chemical Kinetics",
    topic: "Arrhenius Theory",
    difficulty: "Easy",
    options: [
      { id: "T", text: "True" },
      { id: "F", text: "False" }
    ],
    correctOption: "T",
    explanation: "According to the Arrhenius equation k = A * e^(-Ea/RT), increasing T always increases the fraction of molecules with energy >= Ea, causing rate constant k to increase for BOTH endothermic and exothermic reactions.",
    marks: 1,
    source: "Imported From PDF",
    pageRef: "CBSE Specimen 2024 Pg 3",
    approvalStatus: "approved",
    ownerId: "usr_faculty_01",
    ownerName: "Prof. Sunita Rao"
  },
  {
    id: "fac-q-05",
    stem: "Fill in the blank: The enzyme responsible for relieving the torsional strain and positive supercoiling ahead of the replicating DNA fork is ________.",
    type: "fill_blank",
    subjectId: "bio_12",
    subject: "Biology",
    chapter: "Chapter 6: Molecular Basis of Inheritance",
    topic: "DNA Replication",
    difficulty: "Medium",
    options: [],
    correctOption: "DNA Topoisomerase (or DNA Gyrase)",
    explanation: "DNA Topoisomerase (gyrase in prokaryotes) introduces transient single or double-stranded cuts to relieve torsional supercoiling during unwinding.",
    marks: 1,
    source: "AI Generated",
    pageRef: "AI Curriculum Model",
    approvalStatus: "approved",
    ownerId: "usr_faculty_01",
    ownerName: "Prof. Sunita Rao"
  }
];

export const SEED_FACULTY_PAPERS = [
  {
    id: "fac-paper-01",
    title: "Class 12 Pre-Board Chemistry & Kinetics Diagnostic Examination",
    classGrade: "Class 12",
    board: "CBSE Board Pattern",
    subject: "Chemistry",
    subjectId: "chem_12",
    examType: "Pre-Board Examination",
    durationMinutes: 90,
    maxMarks: 35,
    instructions: [
      "All questions are compulsory.",
      "Section A comprises 5 Multiple Choice Questions of 1 mark each.",
      "Section B comprises 3 Short Answer Questions of 2 marks each.",
      "Section C comprises 2 Long Answer & Numerical Derivations of 5 marks each.",
      "Logarithmic tables are provided upon request."
    ],
    sections: [
      {
        id: "sec_a",
        name: "Section A: Multiple Choice Questions (1 Mark Each)",
        marksPerQuestion: 1,
        instructions: "Choose the single correct response."
      },
      {
        id: "sec_b",
        name: "Section B: Conceptual Reasoning (2 Marks Each)",
        marksPerQuestion: 2,
        instructions: "Answer concisely in 30-40 words."
      },
      {
        id: "sec_c",
        name: "Section C: Long Answer & Derivations (5 Marks Each)",
        marksPerQuestion: 5,
        instructions: "Show complete algebraic steps, formulas, and units."
      }
    ],
    questions: [
      {
        id: "fac-q-02",
        sectionId: "sec_a",
        stem: "A first order reaction is 50% complete in 20 minutes. What will be the time required for 99.9% completion of this reaction?",
        type: "mcq",
        options: [
          { id: "A", text: "200 minutes (~10 half-lives)" },
          { id: "B", text: "100 minutes" },
          { id: "C", text: "400 minutes" },
          { id: "D", text: "60 minutes" }
        ],
        correctOption: "A",
        explanation: "t_99.9% = (2.303 / k) * 3 = 10 * t_1/2 = 200 mins.",
        marks: 1,
        source: "AI Generated From Faculty Material",
        pageRef: "Faculty Kinetics Notes, Slide 7"
      },
      {
        id: "fac-q-04",
        sectionId: "sec_a",
        stem: "True or False: The rate constant k of an endothermic chemical reaction always increases with an increase in absolute temperature.",
        type: "true_false",
        options: [
          { id: "T", text: "True" },
          { id: "F", text: "False" }
        ],
        correctOption: "T",
        explanation: "Rate constant k increases with temperature according to Arrhenius equation regardless of ΔH.",
        marks: 1,
        source: "Imported From PDF",
        pageRef: "CBSE Specimen 2024 Pg 3"
      },
      {
        id: "fac-q-chem-sa1",
        sectionId: "sec_b",
        stem: "Explain why hydrolysis of ethyl acetate in aqueous acidic solution is termed a 'pseudo-first order reaction'. Write its differential rate equation.",
        type: "short_answer",
        options: [],
        correctOption: "Because water is present in large excess, its concentration remains practically constant throughout the reaction.",
        explanation: "Rate = k'[CH3COOC2H5][H2O]. Since [H2O] is in immense excess, k'[H2O] = k (apparent constant). Therefore Rate = k[CH3COOC2H5], exhibiting first order kinetics.",
        marks: 2,
        source: "Faculty Created",
        pageRef: "Faculty Lecture Note 4"
      },
      {
        id: "fac-q-chem-la1",
        sectionId: "sec_c",
        stem: "Derive the integrated rate equation for a first order reaction R -> P. Plot ln[R] versus time t and define the graphical significance of the slope and intercept.",
        type: "long_answer",
        options: [],
        correctOption: "Complete derivation showing -d[R]/dt = k[R], integrating between [R]0 to [R] and 0 to t yielding ln[R] = -kt + ln[R]0.",
        explanation: "Derivation yields ln[R] = -kt + ln[R]0. Plotting ln[R] on y-axis against t on x-axis produces a linear decrease with negative slope = -k and y-intercept = ln[R]0.",
        marks: 5,
        source: "Faculty Created",
        pageRef: "Faculty Kinetics Notes Pg 3"
      }
    ],
    totalMarksCalculated: 9,
    status: "published",
    targetClasses: [
      "Class 12 - Section A (Medical / NEET Prep)",
      "Class 12 - Section B (Non-Medical / JEE)"
    ],
    ownerId: "usr_faculty_01",
    ownerName: "Prof. Sunita Rao",
    createdAt: "2026-10-18T14:00:00Z",
    updatedAt: "2026-10-21T18:00:00Z"
  },
  {
    id: "fac-paper-02",
    title: "Class 12 Biology: Evolution & Natural Selection Mid-Term Specimen (Draft)",
    classGrade: "Class 12",
    board: "CBSE",
    subject: "Biology",
    subjectId: "bio_12",
    examType: "Unit Assessment",
    durationMinutes: 45,
    maxMarks: 20,
    instructions: [
      "All questions are compulsory.",
      "Write concise, clear answers with scientific terminology."
    ],
    sections: [
      {
        id: "sec_a",
        name: "Section A: Multiple Choice Questions",
        marksPerQuestion: 1,
        instructions: "Choose the correct response."
      }
    ],
    questions: [
      {
        id: "fac-q-01",
        sectionId: "sec_a",
        stem: "Which of the following conditions is mandatory for Hardy-Weinberg equilibrium to hold true across generations in a diploid population?",
        type: "mcq",
        options: [
          { id: "A", text: "Infinitely large population size with random mating" },
          { id: "B", text: "Continuous directional selection favoring heterozygotes" },
          { id: "C", text: "High rate of forward mutations" },
          { id: "D", text: "Frequent immigration from adjacent demes" }
        ],
        correctOption: "A",
        explanation: "Hardy-Weinberg equilibrium strictly assumes infinite population size, random mating, and no evolutionary pressure.",
        marks: 1,
        source: "Faculty Created",
        pageRef: "Faculty Evolution Notes Pg 4"
      }
    ],
    totalMarksCalculated: 1,
    status: "draft",
    targetClasses: ["Class 12 - Section A (Medical / NEET Prep)"],
    ownerId: "usr_faculty_01",
    ownerName: "Prof. Sunita Rao",
    createdAt: "2026-10-20T16:00:00Z",
    updatedAt: "2026-10-22T08:00:00Z"
  }
];

export const SEED_FACULTY_TOPICS = [
  {
    id: "fac-top-01",
    title: "Hardy-Weinberg Equilibrium & Allele Dynamics",
    classGrade: "Class 12",
    board: "CBSE / NEET",
    subject: "Biology",
    subjectId: "bio_12",
    chapter: "Chapter 7: Evolution",
    subtopic: "Mathematical Population Genetics",
    priority: "High", // Authoritative faculty designation
    facultyReasoning: "Core high-yield topic: Mandatory in CBSE 12th Board examinations (3-mark numerical or 5-mark case study) and features in 2 NEET questions every year.",
    explanation: "In an ideal population without mutation, gene flow, genetic drift, or natural selection, allele frequencies and genotypes remain constant from generation to generation. The algebraic formula p² + 2pq + q² = 1 describes the diploid genotype distribution.",
    formulas: [
      "p + q = 1 (Allele Frequency Equation)",
      "p² + 2pq + q² = 1 (Genotype Frequency Equation)",
      "q² = Frequency of homozygous recessive genotype (aa)",
      "2pq = Frequency of heterozygous carriers (Aa)"
    ],
    keyPoints: [
      "Always calculate q first by finding the square root of the homozygous recessive phenotype proportion.",
      "Five evolutionary forces disrupt equilibrium: gene flow, genetic drift, mutation, genetic recombination, and natural selection.",
      "Founder effect and bottleneck events represent severe manifestations of genetic drift."
    ],
    attachedResources: [
      {
        id: "fac-res-01",
        title: "Class 12 Biology: Evolution & Population Genetics Master Notes.pdf"
      }
    ],
    practiceQuestions: [
      {
        id: "fac-top-q1",
        stem: "In a stable human population of 10,000 individuals, 400 individuals exhibit cystic fibrosis (autosomal recessive condition, aa). What is the expected number of heterozygous carriers (Aa)?",
        options: [
          { id: "A", text: "3,200 individuals" },
          { id: "B", text: "6,400 individuals" },
          { id: "C", text: "1,600 individuals" },
          { id: "D", text: "800 individuals" }
        ],
        correctOption: "A",
        explanation: "q² = 400 / 10,000 = 0.04 -> q = 0.20. Therefore p = 1 - 0.20 = 0.80. Frequency of carriers 2pq = 2 * 0.80 * 0.20 = 0.32. Number of carriers = 0.32 * 10,000 = 3,200.",
        source: "Faculty Created"
      }
    ],
    status: "published",
    targetClasses: ["Class 12 - Section A (Medical / NEET Prep)"],
    ownerId: "usr_faculty_01",
    ownerName: "Prof. Sunita Rao",
    createdAt: "2026-10-18T12:00:00Z"
  },
  {
    id: "fac-top-02",
    title: "Integrated Rate Equations & Arrhenius Activation Energy",
    classGrade: "Class 12",
    board: "CBSE / JEE",
    subject: "Chemistry",
    subjectId: "chem_12",
    chapter: "Chapter 4: Chemical Kinetics",
    subtopic: "Order of Reaction & Temperature Dependence",
    priority: "High",
    facultyReasoning: "Frequently tested in both CBSE Section D (5 marks) and JEE Main numerical section.",
    explanation: "Zero-order reactions exhibit constant rate independent of reactant concentration, with t1/2 directly proportional to [R]0. First-order kinetics show logarithmic decay with t1/2 = 0.693/k. Arrhenius equation links temperature to rate constant via activation energy Ea.",
    formulas: [
      "Zero Order: [R] = -kt + [R]0; t1/2 = [R]0 / 2k",
      "First Order: k = (2.303 / t) * log10([R]0 / [R]); t1/2 = 0.693 / k",
      "Arrhenius: log10(k2 / k1) = (Ea / 2.303R) * [(T2 - T1) / (T1 * T2)]"
    ],
    keyPoints: [
      "Units of k: (mol L⁻¹)^(1-n) s⁻¹, where n is the overall reaction order.",
      "Activation energy Ea is always positive for elementary steps.",
      "A catalyst lowers activation energy without changing the reaction enthalpy ΔH."
    ],
    attachedResources: [
      {
        id: "fac-res-02",
        title: "Class 12 Chemistry: Chemical Kinetics Integrated Rate Laws & Arrhenius Numericals.pdf"
      }
    ],
    practiceQuestions: [],
    status: "published",
    targetClasses: [
      "Class 12 - Section A (Medical / NEET Prep)",
      "Class 12 - Section B (Non-Medical / JEE)"
    ],
    ownerId: "usr_faculty_01",
    ownerName: "Prof. Sunita Rao",
    createdAt: "2026-10-19T14:30:00Z"
  },
  {
    id: "fac-top-03",
    title: "Galvanic Cells, SHE & Nernst Equation Applications",
    classGrade: "Class 12",
    board: "CBSE",
    subject: "Chemistry",
    subjectId: "chem_12",
    chapter: "Chapter 3: Electrochemistry",
    subtopic: "Cell Potential & Equilibrium Constant",
    priority: "Medium",
    facultyReasoning: "Standard board topic carrying 4-5 marks including cell notation and EMF calculation.",
    explanation: "Electrochemical cells convert chemical energy of spontaneous redox reactions into electrical work. The Standard Hydrogen Electrode (SHE) acts as zero reference.",
    formulas: [
      "E_cell = E°_cell - (0.0591 / n) * log10(Q)",
      "ΔG° = -n * F * E°_cell",
      "E°_cell = (0.0591 / n) * log10(K_c)"
    ],
    keyPoints: [
      "Anode is oxidation (negative terminal in galvanic cells); Cathode is reduction (positive terminal).",
      "Standard hydrogen electrode potential is assigned as 0.00 V at 298 K, 1 bar H2, 1 M H+.",
      "When cell reaches equilibrium, E_cell = 0 and Q = Kc."
    ],
    attachedResources: [],
    practiceQuestions: [],
    status: "published",
    targetClasses: ["Class 12 - Section B (Non-Medical / JEE)"],
    ownerId: "usr_faculty_01",
    ownerName: "Prof. Sunita Rao",
    createdAt: "2026-10-20T10:00:00Z"
  }
];
