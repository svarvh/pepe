// ==========================================================================
// ALL-IN-ONE EDTECH CURRICULUM & KNOWLEDGE GRAPH
// Pillars: School Education (Class 9-10 & 11-12 NCERT), IIT-JEE, and UGC-NET
// Contains structured notes, clickable terminology glossary, topic-specific videos,
// transcripts, and 10+ validated multi-format questions per topic.
// ==========================================================================

export const COURSES_CATALOG = [
  {
    id: "class11_12",
    name: "Class 11 & 12 (NCERT & Boards)",
    badge: "NCERT Foundation",
    category: "School Education",
    description: "Complete NCERT-based syllabus for Class 11-12 Boards & competitive foundation.",
    subjects: ["bio_12", "chem_12", "phys_12", "math_12"],
    targetExams: ["CBSE Board", "ISC", "State Boards", "NEET Foundation"]
  },
  {
    id: "jee",
    name: "IIT-JEE (Main & Advanced)",
    badge: "Engineering Entrance",
    category: "Competitive Entrance",
    description: "Rigorous high-difficulty problem solving, PYQs, numericals, and concept shortcuts.",
    subjects: ["jee_phys", "jee_chem", "jee_math"],
    targetExams: ["JEE Main 2026", "JEE Advanced 2026", "BITSAT"]
  },
  {
    id: "ugc_net",
    name: "UGC-NET (Paper 1 & Paper 2)",
    badge: "Lectureship & JRF",
    category: "National Eligibility Test",
    description: "Teaching aptitude, research methodology, higher education, and subject mastery.",
    subjects: ["net_paper1", "net_cs"],
    targetExams: ["UGC-NET Dec/June", "SET / SLET", "CSIR-NET"]
  },
  {
    id: "class9_10",
    name: "Class 9 & 10 (Board Foundations)",
    badge: "Secondary School",
    category: "School Education",
    description: "Strong conceptual foundations, NCERT exemplars, and board preparation.",
    subjects: ["sci_10", "math_10"],
    targetExams: ["CBSE Class 10 Board", "NTSE", "Olympiads"]
  }
];

// ==========================================================================
// CENTRAL TERMINOLOGY GLOSSARY DATABASE
// Reusable across notes, questions, search, and video transcripts
// ==========================================================================
export const TERMINOLOGY_DATABASE = {
  "natural-selection": {
    id: "natural-selection",
    term: "Natural Selection",
    hindiTerm: "प्राकृतिक चयन",
    category: "Evolutionary Biology",
    simpleMeaning: "The process where organisms better adapted to their environment tend to survive and produce more offspring.",
    hindiExplanation: "वह प्राकृतिक प्रक्रिया जिसके द्वारा ऐसे जीव जो अपने पर्यावरण के अधिक अनुकूल होते हैं, जीवित रहते हैं और अधिक संतान उत्पन्न करते हैं।",
    formalDefinition: "Differential reproductive success of distinct phenotypes resulting from variable interactions with abiotic and biotic environmental factors.",
    pronunciation: "NACH-er-ul suh-LEK-shun",
    example: "Industrial melanism in the Peppered Moth (Biston betularia) in England: dark-colored moths survived better in soot-covered industrial areas.",
    formulaOrDiagram: "Phenotypic Variation + Heritability + Differential Reproduction = Adaptive Evolution",
    relatedTerms: ["heritable-variation", "reproductive-success", "fitness", "adaptation", "speciation"],
    ncertRef: "Class 12 Biology, Chapter 7: Evolution, Page 129",
    practiceQuestionIds: ["q-bio-01", "q-bio-02", "q-bio-08"]
  },
  "heritable-variation": {
    id: "heritable-variation",
    term: "Heritable Variation",
    hindiTerm: "वंशागत विभिन्नता",
    category: "Genetics & Evolution",
    simpleMeaning: "A difference in an inherited characteristic that can be passed from parents to offspring via DNA.",
    hindiExplanation: "जीव के ऐसे लक्षण या विशेषताएँ जो माता-पिता से डीएनए के माध्यम से उनकी संतानों में स्थानांतरित हो सकती हैं।",
    formalDefinition: "Genetic diversity within a population arising from mutations, recombination, and independent assortment that is transmissible across generations.",
    pronunciation: "HAIR-ih-tuh-bul vair-ee-AY-shun",
    example: "Differences in Darwin's finch beak shapes adapted to feed on different seeds and insects in Galapagos islands.",
    formulaOrDiagram: "Total Variance (Vp) = Genetic Variance (Vg) + Environmental Variance (Ve)",
    relatedTerms: ["natural-selection", "mutation", "allele-frequency", "genotype"],
    ncertRef: "Class 12 Biology, Chapter 5: Principles of Inheritance, Page 72",
    practiceQuestionIds: ["q-bio-01", "q-bio-04"]
  },
  "reproductive-success": {
    id: "reproductive-success",
    term: "Reproductive Success",
    hindiTerm: "प्रजनन सफलता",
    category: "Evolutionary Biology",
    simpleMeaning: "The number of surviving and fertile offspring an individual produces relative to others in the population.",
    hindiExplanation: "किसी जीव द्वारा अपने जीवनकाल में जीवित और प्रजनन-योग्य संतानों को जन्म देने की सापेक्षिक संख्या।",
    formalDefinition: "The relative production of viable, fertile offspring per individual over a lifetime, quantifying biological Darwinian fitness.",
    pronunciation: "ree-pruh-DUK-tiv suk-SES",
    example: "A male lion that fathers 15 surviving cubs versus another that fathers 2 has higher reproductive fitness.",
    formulaOrDiagram: "Relative Fitness (w) = (Offspring of genotype) / (Offspring of most fit genotype)",
    relatedTerms: ["natural-selection", "darwinian-fitness", "fecundity"],
    ncertRef: "Class 12 Biology, Chapter 7: Evolution, Page 131",
    practiceQuestionIds: ["q-bio-02", "q-bio-06"]
  },
  "osmosis": {
    id: "osmosis",
    term: "Osmosis",
    hindiTerm: "परासरण",
    category: "Cell Biology & Physiology",
    simpleMeaning: "The movement of water molecules from a region of higher water concentration to lower water concentration through a semipermeable membrane.",
    hindiExplanation: "जल के अणुओं का एक अर्धपारगम्य झिल्ली के माध्यम से उच्च जल सांद्रता वाले क्षेत्र से निम्न जल सांद्रता वाले क्षेत्र की ओर स्वतः प्रवाह।",
    formalDefinition: "The net spontaneous passive movement of solvent molecules across a selectively permeable membrane toward a region of higher solute concentration.",
    pronunciation: "oz-MOH-sis",
    example: "Raisins swelling when kept overnight in plain water, or blood cells shrinking in hypertonic saline solution.",
    formulaOrDiagram: "Osmotic Pressure (Π) = i·M·R·T (van 't Hoff equation)",
    relatedTerms: ["semipermeable-membrane", "hypertonic", "hypotonic", "turgor-pressure", "water-potential"],
    ncertRef: "Class 11 Biology, Chapter 11 / Class 12 Solutions, Page 45",
    practiceQuestionIds: ["q-bio-03", "q-chem-04"]
  },
  "nernst-equation": {
    id: "nernst-equation",
    term: "Nernst Equation",
    hindiTerm: "नेर्न्स्ट समीकरण",
    category: "Electrochemistry",
    simpleMeaning: "A formula that calculates the exact electric voltage of a chemical battery or half-cell under non-standard conditions.",
    hindiExplanation: "वह गणितीय समीकरण जो गैर-मानक तापमान और सांद्रता की स्थितियों में विद्युत सेल के विभव (emf) की गणना करता है।",
    formalDefinition: "An electrochemical equation relating the reduction potential of a half-cell or full cell reaction to the standard electrode potential, temperature, and reaction quotient Q.",
    pronunciation: "NAIRNST ih-KWAY-zhun",
    example: "Calculating why a Daniell cell voltage drops from 1.10 V to 1.07 V when Zinc ion concentration increases 10-fold.",
    formulaOrDiagram: "E_cell = E°_cell - (0.0591 / n) × log₁₀(Q) at 298 K",
    relatedTerms: ["galvanic-cell", "standard-reduction-potential", "gibbs-free-energy", "equilibrium-constant"],
    ncertRef: "Class 12 Chemistry, Chapter 3: Electrochemistry, Page 70",
    practiceQuestionIds: ["q-chem-01", "q-chem-02", "q-chem-03"]
  },
  "photoelectric-effect": {
    id: "photoelectric-effect",
    term: "Photoelectric Effect",
    hindiTerm: "प्रकाश-विद्युत प्रभाव",
    category: "Modern Physics & Quantum",
    simpleMeaning: "The emission of electrons from a clean metal surface when light of sufficiently high frequency shines upon it.",
    hindiExplanation: "जब किसी धातु की सतह पर पर्याप्त उच्च आवृत्ति का प्रकाश पड़ता है, तो धातु से इलेक्ट्रॉनों का निष्कासन होना।",
    formalDefinition: "The quantum phenomenon wherein quanta of electromagnetic radiation (photons) transfer energy to bound electrons, ejecting them when photon energy exceeds the metal's work function Φ.",
    pronunciation: "foh-toh-ih-LEK-trik ih-FEKT",
    example: "Solar panels converting sunlight into electric current, or night-vision photomultiplier tubes.",
    formulaOrDiagram: "h·ν = Φ + K_max = h·ν₀ + ½ m v_max²",
    relatedTerms: ["work-function", "threshold-frequency", "photon", "stopping-potential"],
    ncertRef: "Class 12 Physics, Chapter 11: Dual Nature of Radiation and Matter, Page 387",
    practiceQuestionIds: ["q-phys-01", "q-phys-02", "q-phys-07"]
  },
  "integration-by-parts": {
    id: "integration-by-parts",
    term: "Integration by Parts",
    hindiTerm: "खण्डशः समाकलन",
    category: "Calculus",
    simpleMeaning: "A calculus technique used to integrate the product of two functions using the ILATE rule.",
    hindiExplanation: "कलन (कैलकुलस) की एक विधि जिसके द्वारा दो फलनों के गुणनफल का समाकलन ILATE प्राथमिकता नियम की सहायता से किया जाता है।",
    formalDefinition: "A theorem that transforms the integral of a product of functions: ∫ u(x) v'(x) dx = u(x) v(x) - ∫ u'(x) v(x) dx.",
    pronunciation: "in-tuh-GRAY-shun by PARTS",
    example: "Evaluating ∫ x·eˣ dx: choose u = x, dv = eˣ dx, giving x·eˣ - eˣ + C.",
    formulaOrDiagram: "∫ u dv = u·v - ∫ v du (Hierarchy: Inverse, Log, Algebraic, Trig, Exponential)",
    relatedTerms: ["indefinite-integral", "fundamental-theorem-of-calculus", "differential", "substitution"],
    ncertRef: "Class 12 Mathematics, Chapter 7: Integrals, Page 304",
    practiceQuestionIds: ["q-math-01", "q-math-02"]
  },
  "positivism": {
    id: "positivism",
    term: "Positivism & Post-Positivism",
    hindiTerm: "प्रत्यक्षवाद एवं उत्तर-प्रत्यक्षवाद",
    category: "Research Methodology",
    simpleMeaning: "A research philosophy stating that genuine knowledge is based on natural phenomena, empirical evidence, and scientific observation.",
    hindiExplanation: "अनुसंधान का वह दार्शनिक दृष्टिकोण जो मानता है कि वास्तविक ज्ञान केवल वैज्ञानिक अवलोकन और अनुभवजन्य साक्ष्यों पर आधारित होता है।",
    formalDefinition: "An epistemological stance holding that scientific method is the sole valid means of acquiring objective truth, while post-positivism recognizes human subjectivity and probabilistic findings.",
    pronunciation: "PAH-zih-tiv-iz-um",
    example: "Using quantitative experiments and statistical hypothesis testing (p < 0.05) rather than personal speculation in educational research.",
    formulaOrDiagram: "Observation → Inductive Pattern → Hypothesis → Deductive Verification",
    relatedTerms: ["null-hypothesis", "epistemology", "qualitative-research", "empirical-evidence"],
    ncertRef: "UGC-NET Paper 1: Unit II Research Aptitude, Section 2.1",
    practiceQuestionIds: ["q-net-01", "q-net-02", "q-net-03"]
  },
  "null-hypothesis": {
    id: "null-hypothesis",
    term: "Null Hypothesis (H₀)",
    hindiTerm: "शून्य परिकल्पना (H₀)",
    category: "Statistical Research",
    simpleMeaning: "A default statement in research proposing that there is no significant difference or effect between test groups.",
    hindiExplanation: "अनुसंधान में मानी गई वह प्राथमिक परिकल्पना जिसके अनुसार परीक्षण किए जा रहे समूहों के मध्य कोई वास्तविक अंतर या प्रभाव नहीं है।",
    formalDefinition: "The proposition that an observed difference is due to sampling error alone, subject to statistical rejection if test statistic exceeds critical threshold.",
    pronunciation: "NULL hy-PAH-thuh-sis",
    example: "Testing if a new online teaching app improves student test scores compared to standard lectures: H₀ is 'No difference in mean scores'.",
    formulaOrDiagram: "H₀: μ₁ = μ₂ (vs Alternative H₁: μ₁ ≠ μ₂)",
    relatedTerms: ["type-1-error", "p-value", "degrees-of-freedom", "positivism"],
    ncertRef: "UGC-NET Paper 1: Research Aptitude, Hypothesis Formulation",
    practiceQuestionIds: ["q-net-02", "q-net-04"]
  }
};

// ==========================================================================
// DETAILED CURRICULUM SYLLABUS TREE
// Structured Course -> Subject -> Chapter -> Topic -> Subtopics
// ==========================================================================
export const SYLLABUS_TREE = {
  class11_12: {
    subjects: [
      {
        id: "bio_12",
        name: "Biology (Class 12 NCERT)",
        cardNum: "01",
        themeColor: "lime",
        colorHex: "#E7FA4B",
        chapters: [
          {
            id: "bio12-ch7",
            number: 7,
            title: "Evolution & Natural Selection",
            overview: "Origin of life, Darwinian theory, evidence from paleontology, embryology, and population genetics.",
            ncertChapterRef: "NCERT Class 12 Biology Chapter 7",
            topics: [
              {
                id: "topic-bio-evolution",
                title: "Mechanism of Evolution: Natural Selection",
                subtopics: ["Darwinian Concepts", "Heritable Variations", "Reproductive Success", "Industrial Melanism", "Speciation"],
                difficulty: "Medium",
                questionsCount: 12,
                estMinutes: 45,
                hasVideo: true
              },
              {
                id: "topic-bio-hardy",
                title: "Hardy-Weinberg Genetic Equilibrium",
                subtopics: ["Allele Frequencies", "Genetic Drift", "Founder Effect", "Disruptive Selection"],
                difficulty: "Hard",
                questionsCount: 10,
                estMinutes: 50,
                hasVideo: true
              }
            ]
          },
          {
            id: "bio12-ch5",
            number: 5,
            title: "Principles of Inheritance and Variation",
            overview: "Mendelian genetics, chromosomal theory, sex determination, and genetic disorders.",
            ncertChapterRef: "NCERT Class 12 Biology Chapter 5",
            topics: [
              {
                id: "topic-bio-mendel",
                title: "Mendelian Genetics & Gene Interaction",
                subtopics: ["Monohybrid Cross", "Dihybrid Cross", "Incomplete Dominance", "Codominance"],
                difficulty: "Medium",
                questionsCount: 11,
                estMinutes: 40,
                hasVideo: true
              }
            ]
          }
        ]
      },
      {
        id: "chem_12",
        name: "Chemistry (Class 12 NCERT)",
        cardNum: "02",
        themeColor: "lavender",
        colorHex: "#BDA3FA",
        chapters: [
          {
            id: "chem12-ch3",
            number: 3,
            title: "Electrochemistry",
            overview: "Redox reactions, galvanic and electrolytic cells, Nernst equation, conductivity, and Kohlrausch's law.",
            ncertChapterRef: "NCERT Class 12 Chemistry Chapter 3",
            topics: [
              {
                id: "topic-chem-nernst",
                title: "Galvanic Cells & The Nernst Equation",
                subtopics: ["Electrochemical Cells", "Standard Hydrogen Electrode", "Concentration Cells", "Gibbs Energy & EMF"],
                difficulty: "Hard",
                questionsCount: 12,
                estMinutes: 60,
                hasVideo: true
              }
            ]
          }
        ]
      },
      {
        id: "phys_12",
        name: "Physics (Class 12 NCERT)",
        cardNum: "03",
        themeColor: "cream",
        colorHex: "#FFE8C2",
        chapters: [
          {
            id: "phys12-ch11",
            number: 11,
            title: "Dual Nature of Radiation and Matter",
            overview: "Photoelectric emission, Hertz and Lenard observations, Einstein's photoelectric equation, de Broglie hypothesis.",
            ncertChapterRef: "NCERT Class 12 Physics Chapter 11",
            topics: [
              {
                id: "topic-phys-photoelectric",
                title: "Einstein's Photoelectric Equation & Photons",
                subtopics: ["Threshold Frequency", "Stopping Potential", "Work Function", "de Broglie Wavelength"],
                difficulty: "Medium",
                questionsCount: 12,
                estMinutes: 45,
                hasVideo: true
              }
            ]
          }
        ]
      },
      {
        id: "math_12",
        name: "Mathematics (Class 12 NCERT)",
        cardNum: "04",
        themeColor: "white",
        colorHex: "#FFFFFF",
        chapters: [
          {
            id: "math12-ch7",
            number: 7,
            title: "Integrals & Applications",
            overview: "Indefinite and definite integrals, integration by substitution, partial fractions, and integration by parts.",
            ncertChapterRef: "NCERT Class 12 Mathematics Chapter 7",
            topics: [
              {
                id: "topic-math-byparts",
                title: "Methods of Integration: Integration by Parts",
                subtopics: ["Product Rule in Integration", "ILATE Priority Rule", "Definite Integrals Evaluation", "Special Standard Integrals"],
                difficulty: "Hard",
                questionsCount: 11,
                estMinutes: 55,
                hasVideo: true
              }
            ]
          }
        ]
      }
    ]
  },
  jee: {
    subjects: [
      {
        id: "jee_phys",
        name: "JEE Physics (Main & Advanced)",
        cardNum: "01",
        themeColor: "lavender",
        colorHex: "#BDA3FA",
        chapters: [
          {
            id: "jee-phys-rot",
            number: 1,
            title: "Rotational Dynamics & Rigid Bodies",
            overview: "Torque, angular momentum conservation, moment of inertia theorems, pure rolling on inclined planes.",
            topics: [
              {
                id: "topic-jee-rot",
                title: "Pure Rolling & Angular Momentum Conservation",
                subtopics: ["Rolling Without Slipping", "Toppling vs Sliding", "Moment of Inertia Tensors", "Collision of Rigid Bodies"],
                difficulty: "Hard",
                questionsCount: 12,
                estMinutes: 65,
                hasVideo: true
              }
            ]
          }
        ]
      },
      {
        id: "jee_chem",
        name: "JEE Chemistry (Physical & Organic)",
        cardNum: "02",
        themeColor: "cream",
        colorHex: "#FFE8C2",
        chapters: [
          {
            id: "jee-chem-thermo",
            number: 2,
            title: "Thermodynamics & Electrochemistry",
            overview: "Entropy changes, spontaneity criteria, Helmholtz and Gibbs free energy, non-ideal electrochemical cells.",
            topics: [
              {
                id: "topic-jee-thermo",
                title: "Chemical Equilibrium & Nernst Applications",
                subtopics: ["Van 't Hoff Isotherm", "Cell Potential Temperature Coefficient", "Potentiometric Titrations"],
                difficulty: "Hard",
                questionsCount: 11,
                estMinutes: 60,
                hasVideo: true
              }
            ]
          }
        ]
      },
      {
        id: "jee_math",
        name: "JEE Mathematics (Advanced Calculus)",
        cardNum: "03",
        themeColor: "lime",
        colorHex: "#E7FA4B",
        chapters: [
          {
            id: "jee-math-calc",
            number: 3,
            title: "Definite Integrals & Differential Equations",
            overview: "Leibnitz rule of differentiation under integral sign, properties of definite integrals, exact differential equations.",
            topics: [
              {
                id: "topic-jee-leibnitz",
                title: "Leibnitz Rule & Reduction Formulas",
                subtopics: ["Newton-Leibnitz Theorem", "Wallis Formula", "Integration by Parts in Advanced JEE"],
                difficulty: "Hard",
                questionsCount: 12,
                estMinutes: 65,
                hasVideo: true
              }
            ]
          }
        ]
      }
    ]
  },
  ugc_net: {
    subjects: [
      {
        id: "net_paper1",
        name: "Paper 1: Teaching & Research Aptitude",
        cardNum: "01",
        themeColor: "lime",
        colorHex: "#E7FA4B",
        chapters: [
          {
            id: "net-ch2-research",
            number: 1,
            title: "Unit II: Research Aptitude",
            overview: "Meaning, types, characteristics of research; Positivism and Post-positivistic approach; Methods of research; Thesis writing and ethics.",
            topics: [
              {
                id: "topic-net-positivism",
                title: "Positivism, Post-Positivism & Hypothesis Testing",
                subtopics: ["Epistemological Foundations", "Null vs Alternative Hypothesis", "Sampling Techniques", "Research Ethics"],
                difficulty: "Medium",
                questionsCount: 12,
                estMinutes: 50,
                hasVideo: true
              }
            ]
          },
          {
            id: "net-ch1-teaching",
            number: 2,
            title: "Unit I: Teaching Aptitude",
            overview: "Levels of teaching (Memory, Understanding and Reflective); Learner characteristics; Factors affecting teaching; Evaluation systems.",
            topics: [
              {
                id: "topic-net-teaching",
                title: "Levels of Teaching & Bloom's Taxonomy",
                subtopics: ["Cognitive, Affective & Psychomotor Domains", "Formative vs Summative Assessment", "CBCS & ICT in Higher Ed"],
                difficulty: "Medium",
                questionsCount: 10,
                estMinutes: 45,
                hasVideo: true
              }
            ]
          }
        ]
      },
      {
        id: "net_cs",
        name: "Paper 2: Computer Science & Applications",
        cardNum: "02",
        themeColor: "lavender",
        colorHex: "#BDA3FA",
        chapters: [
          {
            id: "net-cs-algo",
            number: 1,
            title: "Unit III: Data Structures & Algorithms",
            overview: "Asymptotic notation, recurrence relations, dynamic programming, NP-completeness and graph theory.",
            topics: [
              {
                id: "topic-net-algo",
                title: "Asymptotic Analysis & Recurrences",
                subtopics: ["Master Theorem", "NP-Complete Reductions", "Divide and Conquer", "Greedy Approximations"],
                difficulty: "Hard",
                questionsCount: 10,
                estMinutes: 55,
                hasVideo: true
              }
            ]
          }
        ]
      }
    ]
  },
  class9_10: {
    subjects: [
      {
        id: "sci_10",
        name: "Class 10 Science (NCERT)",
        cardNum: "01",
        themeColor: "cream",
        colorHex: "#FFE8C2",
        chapters: [
          {
            id: "sci10-ch6",
            number: 6,
            title: "Life Processes",
            overview: "Nutrition, respiration, transportation, and excretion in plants and animals.",
            topics: [
              {
                id: "topic-sci10-transport",
                title: "Transportation & Osmotic Regulation",
                subtopics: ["Xylem and Phloem Translocation", "Human Circulatory System", "Osmosis and Dialysis"],
                difficulty: "Easy",
                questionsCount: 10,
                estMinutes: 35,
                hasVideo: true
              }
            ]
          }
        ]
      },
      {
        id: "math_10",
        name: "Class 10 Mathematics (NCERT)",
        cardNum: "02",
        themeColor: "lavender",
        colorHex: "#BDA3FA",
        chapters: [
          {
            id: "math10-ch4",
            number: 4,
            title: "Quadratic Equations",
            overview: "Standard form, factorization method, completing square, quadratic formula and nature of roots.",
            topics: [
              {
                id: "topic-math10-roots",
                title: "Discriminant & Nature of Roots",
                subtopics: ["Discriminant b² - 4ac", "Real and Distinct Roots", "Word Problems on Speed & Work"],
                difficulty: "Medium",
                questionsCount: 10,
                estMinutes: 40,
                hasVideo: true
              }
            ]
          }
        ]
      }
    ]
  }
};

// ==========================================================================
// SMART STRUCTURED NOTES (Module A)
// High-yield theory with embedded interactive terminology tags
// ==========================================================================
export const SMART_NOTES_COLLECTION = {
  "topic-bio-evolution": {
    topicId: "topic-bio-evolution",
    title: "Mechanism of Evolution: Natural Selection",
    chapterTitle: "Chapter 7: Evolution",
    subjectName: "Biology (Class 12 NCERT)",
    courseId: "class11_12",
    readingTimeMinutes: 12,
    ncertPageRange: "Pages 128–137",
    summary: "Darwin's natural selection explains adaptation and speciation through heritable variations leading to differential reproductive success in changing ecological environments.",
    
    // English Content with interactive terminology tags
    contentEn: `
### 1. The Core Darwinian Framework

The theory of biological evolution by natural selection was proposed by **Charles Darwin** (1859) following his seminal voyage on *H.M.S. Beagle*. The fundamental axiom is that within any natural population, organisms exhibit phenotypic differences.

Organisms with advantageous [[heritable-variation]] may have greater [[reproductive-success]] in a particular environment. Over successive generations, this process of [[natural-selection]] leads to an increase in the frequency of adapted alleles, culminating in adaptive shifts and speciation.

### 2. Five Foundational Premises
1. **Overproduction (Superfecundity):** Species produce more offspring than the environment can support.
2. **Limited Natural Resources:** Food, space, and breeding territories remain relatively constant.
3. **Struggle for Existence:** Intense competition (intraspecific and interspecific) ensues for survival.
4. **Phenotypic Variations:** No two individuals in a sexually reproducing population are completely identical.
5. **Survival of the Fittest:** Individuals possessing favorable adaptations survive to pass their traits to offspring.

### 3. Classic Empirical Evidence: Industrial Melanism in England
Prior to industrialization (before 1850), white-winged peppered moths (*Biston betularia*) predominated in rural England. Tree trunks were heavily encrusted with pale lichens, providing camouflage against predatory birds.

Following rapid industrialization, thick coal smoke and soot blackened the trees and killed the sensitive lichens. In this modified habitat:
* The melanic (dark-winged) variant *Biston betularia carbonaria* possessed higher camouflage fitness.
* Birds selectively preyed upon conspicuous white-winged moths on dark soot-covered bark.
* The frequency of the dark moth allele increased rapidly from less than 1% to over 98% in industrial centers like Birmingham.
* When clean-air legislation was enacted in the 1950s, lichens returned and the frequency of white moths rebounded, demonstrating that [[natural-selection]] is dynamic and environmentally contingent.

### 4. Types of Natural Selection in Populations
* **Stabilizing Selection:** Favors average phenotypes; eliminates extreme variants (e.g., human infant birth weight centered at 3–4 kg).
* **Directional Selection:** Favors one extreme phenotype; shifts population curve in one specific direction (e.g., DDT resistance in mosquitoes, antibiotic resistance in bacteria).
* **Disruptive Selection:** Favors both extremes simultaneously; creates a bimodal phenotypic distribution (e.g., small and large beaked African seedcracker finches).

### 5. Board & Competitive Exam Key Points
> **NCERT High-Yield Fact:** Fitness is the end result of the ability to adapt and get selected by nature. Darwinian fitness is measured strictly by reproductive fitness (viable offspring), not mere physical strength.
`,

    // Hindi Translation (हिन्दी में सरल व्याख्या)
    contentHi: `
### 1. डार्विन का प्राकृतिक चयन का सिद्धांत

जैविक विकास का प्राकृतिक चयन सिद्धांत **चार्ल्स डार्विन** द्वारा प्रतिपादित किया गया था। इस सिद्धांत का मुख्य आधार यह है कि किसी भी प्राकृतिक आबादी में जीवों के बीच विभिन्न लक्षण पाए जाते हैं।

वे जीव जिनमें लाभकारी [[heritable-variation]] होती हैं, वे किसी विशेष वातावरण में अधिक [[reproductive-success]] प्राप्त करते हैं। पीढ़ियों के दौरान, यह [[natural-selection]] अनुकूलित जीनों की आवृत्ति बढ़ाता है, जिससे नई प्रजातियों का उद्भव होता है।

### 2. औद्योगिक मेलेनिनता (Industrial Melanism) का ऐतिहासिक उदाहरण
औद्योगीकरण से पहले (1850 से पूर्व) इंग्लैंड में हल्के रंग वाले पतंगे (*Biston betularia*) अधिक संख्या में थे, क्योंकि पेड़ों पर सफेद लाइकेन उगे हुए थे और पक्षी उन्हें आसानी से नहीं देख पाते थे।

औद्योगिकीकरण के पश्चात पेड़ों पर कोयले का धुआं और कालिख जम गई। अब काले रंग वाले पतंगे छिपने में सफल रहे, जबकि सफेद पतंगों को पक्षियों ने आसानी से खा लिया। परिणामस्वरूप, काले पतंगों की संख्या 98% तक बढ़ गई। यह सिद्ध करता है कि **प्राकृतिक चयन दिशात्मक और पर्यावरण-निर्भर होता है**।
`,
    
    diagrams: [
      {
        caption: "Three Modes of Natural Selection (Stabilizing, Directional, Disruptive)",
        url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600"
      }
    ],

    workedExamples: [
      {
        title: "Hardy-Weinberg Frequency Shift Calculation",
        problem: "In a diploid population, if the frequency of a recessive allele (q) conferring white moth coloration is 0.20, calculate the percentage of heterozygous carriers in Hardy-Weinberg equilibrium.",
        solution: "1. Formula: p + q = 1, hence p = 1 - 0.20 = 0.80.\n2. Heterozygous frequency = 2·p·q = 2 × 0.80 × 0.20 = 0.32 or 32%.\n3. Thus, 32% of moths are heterozygous carriers of the trait."
      }
    ],

    shortcuts: [
      "Rule of Thumb: Antibiotic and herbicide resistance in pathogens is ALWAYS an example of anthropogenic Directional Natural Selection.",
      "Stabilizing selection narrows the bell curve peak without shifting its center."
    ]
  },

  "topic-chem-nernst": {
    topicId: "topic-chem-nernst",
    title: "Galvanic Cells & The Nernst Equation",
    chapterTitle: "Chapter 3: Electrochemistry",
    subjectName: "Chemistry (Class 12 NCERT)",
    courseId: "class11_12",
    readingTimeMinutes: 14,
    ncertPageRange: "Pages 68–79",
    summary: "Derivation and applications of the Nernst equation to compute single electrode potentials and cell electromotive force under variable ionic concentrations and temperatures.",
    contentEn: `
### 1. Galvanic Cell Fundamentals
A Galvanic (or Voltaic) cell transforms chemical energy released in a spontaneous redox reaction into electrical energy.
* **Anode (Negative):** Oxidation occurs here (Loss of electrons) — *AnOx*
* **Cathode (Positive):** Reduction occurs here (Gain of electrons) — *RedCat*
* Memory Acronym: **LOAN** (Left, Oxidation, Anode, Negative).

### 2. The [[nernst-equation]]
Walter Nernst derived the thermodynamic dependency of cell electrode potential on temperature and chemical activity. For a general reduction half-reaction:
$$M^{n+}(aq) + n e^- \\rightarrow M(s)$$

The electrode potential $E$ is given by:
$$E = E^\\circ - \\frac{RT}{nF} \\ln \\frac{[M]}{[M^{n+}]}$$

At standard room temperature $T = 298.15\\text{ K}$ ($25^\\circ\\text{C}$):
$$E_{cell} = E^\\circ_{cell} - \\frac{0.0591}{n} \\log_{10} Q$$
Where:
* $E^\\circ_{cell} = E^\\circ_{cathode} - E^\\circ_{anode}$ (Standard reduction potentials)
* $n$ = Number of moles of electrons transferred in balanced redox equation
* $Q$ = Reaction quotient = $\\frac{[\\text{Products}]^p}{[\\text{Reactants}]^r}$
* $F$ = Faraday constant $\\approx 96,485\\text{ C/mol}$.

### 3. Connection to Gibbs Free Energy and Equilibrium
At equilibrium, cell current ceases ($E_{cell} = 0$) and $Q = K_c$:
$$\\Delta G^\\circ = -n F E^\\circ_{cell} = -2.303 RT \\log_{10} K_c$$
$$\\log_{10} K_c = \\frac{n E^\\circ_{cell}}{0.0591} \\quad \\text{at } 298\\text{ K}$$

### 4. Important High-Yield Traps in JEE & Boards
1. Pure solids, liquids, and solvents have unit activity ($[M(s)] = 1$); do not include them in $Q$.
2. Doubling stoichiometric coefficients doubles $\\Delta G^\\circ$, but **$E^\\circ$ is an intensive property and remains unchanged**.
`,
    contentHi: `
### 1. गैल्वेनिक सेल और नेर्न्स्ट समीकरण
गैल्वेनिक सेल स्वतः होने वाली रेडॉक्स अभिक्रिया की रासायनिक ऊर्जा को विद्युत ऊर्जा में बदलता है।
* एनोड पर ऑक्सीकरण (इलेक्ट्रॉनों की हानि) होती है।
* कैथोड पर अपचयन (इलेक्ट्रॉनों का ग्रहण) होता है।

### 2. [[nernst-equation]] (नेर्न्स्ट समीकरण)
298 K ताप पर:
$$E_{cell} = E^\\circ_{cell} - \\frac{0.0591}{n} \\log_{10} Q$$
जहाँ $n$ स्थानांतरित इलेक्ट्रॉनों की संख्या है और $Q$ अभिक्रिया भागफल है।
`,
    diagrams: [
      {
        caption: "Daniell Cell (Zn-Cu Galvanic Cell) with Salt Bridge",
        url: "https://images.unsplash.com/photo-1603555501671-8f96b3fce8b4?auto=format&fit=crop&q=80&w=600"
      }
    ],
    workedExamples: [
      {
        title: "Daniell Cell Potential with Non-Standard Concentrations",
        problem: "Calculate EMF of Daniell cell: Zn(s) | Zn²⁺(0.1 M) || Cu²⁺(0.01 M) | Cu(s) at 298 K. Given E°(Zn²⁺/Zn) = -0.76 V, E°(Cu²⁺/Cu) = +0.34 V.",
        solution: "1. E°_cell = 0.34 - (-0.76) = 1.10 V.\n2. Cell reaction: Zn + Cu²⁺ → Zn²⁺ + Cu (n = 2).\n3. Q = [Zn²⁺]/[Cu²⁺] = 0.1 / 0.01 = 10.\n4. E_cell = 1.10 - (0.0591 / 2) · log₁₀(10) = 1.10 - 0.0295 = 1.0705 V."
      }
    ],
    shortcuts: [
      "Every 10-fold increase in product-to-reactant ionic ratio drops cell EMF by (0.0591 / n) Volts at 298 K."
    ]
  },

  "topic-phys-photoelectric": {
    topicId: "topic-phys-photoelectric",
    title: "Einstein's Photoelectric Equation & Photons",
    chapterTitle: "Chapter 11: Dual Nature of Radiation",
    subjectName: "Physics (Class 12 NCERT)",
    courseId: "class11_12",
    readingTimeMinutes: 11,
    ncertPageRange: "Pages 386–395",
    summary: "Failure of classical wave theory, photon hypothesis, Einstein's photoelectric equation, and stopping potential characteristics.",
    contentEn: `
### 1. Crucial Experimental Observations
* **Instantaneous Emission:** Electrons are ejected within $10^{-9}$ seconds of light incidence, without measurable time lag.
* **Threshold Frequency ($\\nu_0$):** Below a critical frequency $\\nu_0$ characteristic of the metal surface, no photoelectric emission occurs regardless of light intensity.
* **Kinetic Energy Dependence:** Maximum kinetic energy $K_{max}$ of photoelectrons depends strictly linearly on light frequency $\\nu$, completely independent of intensity.
* **Intensity Proportionality:** Photocurrent is directly proportional to incident beam intensity (number of photons per second).

### 2. Einstein's [[photoelectric-effect]] Equation (1905)
Albert Einstein proposed that light consists of discrete energy quanta called **photons**, each with energy:
$$E = h\\nu = \\frac{hc}{\\lambda}$$

Energy conservation during a single photon-electron collision:
$$h\\nu = \\Phi_0 + K_{max}$$
$$K_{max} = h\\nu - h\\nu_0 = e V_0$$
Where:
* $\\Phi_0 = h\\nu_0$ = Work function of the metal (minimum binding energy)
* $V_0$ = Stopping potential (retarding potential required to reduce photocurrent to zero)
* $h$ = Planck's constant ($6.626 \\times 10^{-34}\\text{ J s}$)
* $e$ = Elementary charge ($1.602 \\times 10^{-19}\\text{ C}$).

### 3. Slope of $V_0$ versus $\\nu$ Graph
Rearranging:
$$V_0 = \\left(\\frac{h}{e}\\right)\\nu - \\frac{\\Phi_0}{e}$$
The graph of Stopping Potential $V_0$ against Frequency $\\nu$ is a straight line:
* **Slope = $h/e$** (A universal constant for ALL metals!).
* **Intercept on Frequency axis = $\\nu_0$** (Threshold frequency).
* **Intercept on Potential axis = $-\\Phi_0/e$**.
`,
    contentHi: `
### 1. प्रकाश-विद्युत प्रभाव की मुख्य विशेषताएं
* प्रकाश पड़ते ही इलेक्ट्रॉन $10^{-9}$ सेकंड के भीतर बिना किसी देरी के बाहर निकल आते हैं।
* देहली आवृत्ति ($\\\\nu_0$) से कम आवृत्ति पर कोई इलेक्ट्रॉन नहीं निकलता, चाहे प्रकाश की तीव्रता कितनी भी अधिक क्यों न हो।
* उत्सर्जित इलेक्ट्रॉनों की अधिकतम गतिज ऊर्जा केवल प्रकाश की आवृत्ति पर निर्भर करती है।
`,
    diagrams: [
      {
        caption: "Stopping Potential V₀ vs Frequency ν graph showing universal slope h/e",
        url: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=600"
      }
    ],
    workedExamples: [
      {
        title: "Stopping Potential from Photon Wavelength",
        problem: "Light of wavelength 3000 Å shines on a metal with work function 2.20 eV. Find stopping potential in Volts.",
        solution: "1. Photon energy E = 12400 / 3000 = 4.133 eV.\n2. K_max = E - Φ = 4.133 - 2.20 = 1.933 eV.\n3. Since K_max = e·V_0, Stopping potential V_0 = 1.933 V."
      }
    ],
    shortcuts: [
      "Quick energy formula: E (in eV) ≈ 12400 / λ (in Å) or 1240 / λ (in nm)."
    ]
  },

  "topic-net-positivism": {
    topicId: "topic-net-positivism",
    title: "Positivism, Post-Positivism & Hypothesis Testing",
    chapterTitle: "Unit II: Research Aptitude",
    subjectName: "Paper 1: Teaching & Research Aptitude",
    courseId: "ugc_net",
    readingTimeMinutes: 10,
    ncertPageRange: "Unit 2 Syllabus",
    summary: "Epistemological paradigms in academic research: Auguste Comte's positivism vs Karl Popper's post-positivist falsification, along with quantitative hypothesis formulation.",
    contentEn: `
### 1. Epistemological Foundations
* **[[positivism]]:** Originated by Auguste Comte. Asserts that authentic knowledge is strictly empirical, verifiable, and governed by deterministic natural laws. Uses quantitative, experimental, and survey-based methods to produce generalizable facts.
* **Post-Positivism:** Pioneered by Karl Popper and Thomas Kuhn. Acknowledges that all observation is fallible and theory-laden. Objective reality exists, but humans can only approximate it probabilistically. Emphasizes *critical multiplism* (triangulation) and **falsificationism**.

### 2. Paradigm Comparison Table
| Feature | Positivism | Post-Positivism | Interpretivism |
|---|---|---|---|
| **Ontology** | Single objective reality | Critical realist (probabilistic) | Multiple socially constructed realities |
| **Epistemology** | Researcher is detached | Objectivity is an ideal, partial | Knower and known are inseparable |
| **Primary Approach** | Deductive testing | Deductive & Abductive | Inductive theory generation |
| **Data Types** | Hard numbers, metrics | Mixed methods | Text, narratives, themes |

### 3. Formulating the [[null-hypothesis]] (H₀)
The null hypothesis states that no true experimental effect or population difference exists.
* **Type I Error ($\\alpha$):** Rejecting the null hypothesis when it is actually true (False Positive).
* **Type II Error ($\\beta$):** Failing to reject the null hypothesis when an effect actually exists (False Negative).
* **Level of Significance ($\\alpha$):** Probability of committing Type I error, typically set at 0.05 (5%) or 0.01 (1%).
`,
    contentHi: `
### 1. अनुसंधान दर्शन: प्रत्यक्षवाद एवं उत्तर-प्रत्यक्षवाद
* **[[positivism]] (प्रत्यक्षवाद):** ऑगस्ट कॉम्टे द्वारा प्रस्तुत। यह दृष्टिकोण वैज्ञानिक अवलोकन, प्रयोग और सांख्यिकी पर आधारित है।
* **उत्तर-प्रत्यक्षवाद (Post-Positivism):** कार्ल पॉपर के विचारों पर आधारित। यह मानता है कि शोधकर्ता का दृष्टिकोण पूरी तरह निष्पक्ष नहीं हो सकता और वैज्ञानिक सिद्धांत कभी 100% सिद्ध नहीं होते, केवल गलत साबित (falsify) होने से बचते हैं।
`,
    diagrams: [
      {
        caption: "Research Process Cycle from Epistemology to Data Interpretation",
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600"
      }
    ],
    workedExamples: [
      {
        title: "Classifying Type I vs Type II Error",
        problem: "A researcher concludes that a digital interactive notebook significantly improves student retention (p = 0.03), rejecting H₀. Later studies reveal the observed difference was pure random sampling chance. What error occurred?",
        solution: "The researcher rejected a true null hypothesis H₀. By definition, this constitutes a Type I Error (False Positive, alpha error)."
      }
    ],
    shortcuts: [
      "Memory Trick: Positivism = Hard Quantitative Facts. Post-Positivism = Critical Realism & Falsification."
    ]
  }
};

// ==========================================================================
// TOPIC SPECIFIC VIDEOS & INTERACTIVE TRANSCRIPTS (Module C)
// Dedicated video lessons with chapter markers, transcripts, and terminology
// ==========================================================================
export const TOPIC_VIDEOS_COLLECTION = {
  "topic-bio-evolution": {
    topicId: "topic-bio-evolution",
    title: "Natural Selection, Industrial Melanism & Genetic Drift Masterclass",
    instructor: "Dr. Ananya Sen, AIIMS & NCERT Author",
    duration: "24:18",
    durationSeconds: 1458,
    videoUrl: "https://www.youtube-nocookie.com/embed/aTftyFboC_M", // Educational CC video
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    viewsCount: "142.8K",
    rating: 4.9,
    chapterMarkers: [
      { time: "00:00", seconds: 0, title: "Introduction & Darwin's Beagle Voyage" },
      { time: "04:15", seconds: 255, title: "Heritable Variation & Gene Frequencies" },
      { time: "09:30", seconds: 570, title: "Industrial Melanism: Biston Betularia Evidence" },
      { time: "15:45", seconds: 945, title: "Stabilizing, Directional, and Disruptive Modes" },
      { time: "20:10", seconds: 1210, title: "Exam Numerical Walkthroughs & PYQ Tips" }
    ],
    transcript: [
      {
        time: "00:15",
        seconds: 15,
        speaker: "Dr. Sen",
        text: "Welcome back, students. Today we explore the single most important concept in evolutionary biology: [[natural-selection]]. Darwin realized that populations possess far more reproductive potential than the environment can sustain."
      },
      {
        time: "04:20",
        seconds: 260,
        speaker: "Dr. Sen",
        text: "Notice that for selection to operate, differences among organisms must be grounded in [[heritable-variation]]. Environmental acquired traits cannot be transmitted to descendants."
      },
      {
        time: "09:40",
        seconds: 580,
        speaker: "Dr. Sen",
        text: "Let us examine the famous Industrial Melanism case in England. The soot-coated birch trees gave melanic moths higher survival, drastically boosting their [[reproductive-success]]."
      },
      {
        time: "16:00",
        seconds: 960,
        speaker: "Dr. Sen",
        text: "In your competitive entrance examinations, remember that antibiotics and DDT represent directional selection acting upon pre-existing rare mutations."
      }
    ],
    solutionVideos: [
      {
        id: "sol-vid-1",
        title: "Question 4 Solution Walkthrough: Directional Selection on Melanic Moths",
        duration: "04:12",
        difficulty: "Medium",
        url: "https://www.youtube-nocookie.com/embed/7V-fIGMDsmE"
      },
      {
        id: "sol-vid-2",
        title: "Question 9 Numerical: Hardy-Weinberg Heterozygote Calculation",
        duration: "05:40",
        difficulty: "Hard",
        url: "https://www.youtube-nocookie.com/embed/xOl04fiPn4c"
      }
    ]
  },

  "topic-chem-nernst": {
    topicId: "topic-chem-nernst",
    title: "Mastering the Nernst Equation & Electrochemical Cells",
    instructor: "Prof. Rajesh Verma, IIT Kanpur Alumnus",
    duration: "28:45",
    durationSeconds: 1725,
    videoUrl: "https://www.youtube-nocookie.com/embed/Vb1G_aYjUuQ",
    thumbnail: "https://images.unsplash.com/photo-1603555501671-8f96b3fce8b4?auto=format&fit=crop&q=80&w=800",
    viewsCount: "98.2K",
    rating: 4.8,
    chapterMarkers: [
      { time: "00:00", seconds: 0, title: "Galvanic Cells & Standard Reduction Potentials" },
      { time: "06:20", seconds: 380, title: "Derivation of the Nernst Equation" },
      { time: "13:40", seconds: 820, title: "Concentration Cells & Equilibrium Constant" },
      { time: "21:15", seconds: 1275, title: "Step-by-Step JEE Numerical Solutions" }
    ],
    transcript: [
      {
        time: "00:30",
        seconds: 30,
        speaker: "Prof. Verma",
        text: "In standard tables, all electrode potentials are tabulated for 1.0 M solute concentration. But in practice, concentrations vary continuously as the battery discharges. That is why the [[nernst-equation]] is vital."
      },
      {
        time: "07:10",
        seconds: 430,
        speaker: "Prof. Verma",
        text: "Remember the 0.0591 / n factor applies strictly at 298 Kelvin. If an exam problem specifies 350 K, you must substitute R, T, and F directly."
      }
    ],
    solutionVideos: [
      {
        id: "sol-chem-1",
        title: "JEE Main 2024 PYQ: Calculating EMF of a Non-Standard Zinc-Silver Cell",
        duration: "06:15",
        difficulty: "Hard",
        url: "https://www.youtube-nocookie.com/embed/7V-fIGMDsmE"
      }
    ]
  },

  "topic-phys-photoelectric": {
    topicId: "topic-phys-photoelectric",
    title: "Einstein's Photoelectric Equation, Work Function & de Broglie Wavelength",
    instructor: "Er. Vikramaditya Rathore, Senior JEE Physics Faculty",
    duration: "21:30",
    durationSeconds: 1290,
    videoUrl: "https://www.youtube-nocookie.com/embed/ubk_7iR_9V8",
    thumbnail: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800",
    viewsCount: "115.4K",
    rating: 4.9,
    chapterMarkers: [
      { time: "00:00", seconds: 0, title: "Experimental Setup & Hertz's Observations" },
      { time: "05:15", seconds: 315, title: "Why Classical Wave Mechanics Failed" },
      { time: "11:00", seconds: 660, title: "Einstein's Photoelectric Equation & Graph Slopes" },
      { time: "17:40", seconds: 1060, title: "Stopping Potential Numerical Tricks" }
    ],
    transcript: [
      {
        time: "00:20",
        seconds: 20,
        speaker: "Er. Rathore",
        text: "The [[photoelectric-effect]] was the historic breakthrough that forced physics to recognize light's particle nature. Wave theory predicted hours of energy accumulation, but emission was instantaneous!"
      }
    ],
    solutionVideos: [
      {
        id: "sol-phys-1",
        title: "Stopping Potential vs Wavelength Slope JEE Advanced Problem",
        duration: "05:30",
        difficulty: "Hard",
        url: "https://www.youtube-nocookie.com/embed/7V-fIGMDsmE"
      }
    ]
  },

  "topic-net-positivism": {
    topicId: "topic-net-positivism",
    title: "UGC-NET Paper 1: Positivism vs Post-Positivism & Research Ethics",
    instructor: "Dr. Meenakshi Sunder, JRF Top Scorer & UGC Expert",
    duration: "19:40",
    durationSeconds: 1180,
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    viewsCount: "64.1K",
    rating: 4.9,
    chapterMarkers: [
      { time: "00:00", seconds: 0, title: "Epistemology in NET Paper 1" },
      { time: "04:30", seconds: 270, title: "Comte's Positivism vs Critical Realism" },
      { time: "10:15", seconds: 615, title: "Null Hypothesis (H₀) & Type I vs Type II Errors" },
      { time: "15:20", seconds: 920, title: "Previous 5 Years Solved NET Questions" }
    ],
    transcript: [
      {
        time: "00:25",
        seconds: 25,
        speaker: "Dr. Sunder",
        text: "Every year in UGC-NET Paper 1, at least two questions come from [[positivism]] and [[null-hypothesis]] formulation. Let us break down their precise academic definitions."
      }
    ],
    solutionVideos: [
      {
        id: "sol-net-1",
        title: "UGC-NET Dec 2023 Solved Paper 1 Research Question",
        duration: "04:10",
        difficulty: "Medium",
        url: "https://www.youtube-nocookie.com/embed/7V-fIGMDsmE"
      }
    ]
  }
};

// ==========================================================================
// EXPANDED QUESTION BANK (Module B: Minimum 10+ Validated Questions Per Topic)
// Multi-format: MCQ, Multiple-Select, Assertion-Reason, Numerical, True/False,
// Match the Columns, Diagram/Case-based, and PYQs with Marking Rules.
// ==========================================================================
export const EXPANDED_QUESTIONS_BANK = [
  // ========================================================================
  // TOPIC 1: Natural Selection & Evolution (Biology Class 12 NCERT) - 12 Questions
  // ========================================================================
  {
    id: "q-bio-01",
    examId: "class11_12",
    subjectId: "bio_12",
    chapterId: "bio12-ch7",
    topicId: "topic-bio-evolution",
    topic: "Natural Selection",
    type: "mcq",
    difficulty: "Medium",
    estTimeSeconds: 60,
    marks: 4,
    negativeMarks: 1,
    source: "NCERT Exemplar Class 12 / NEET Standard",
    examYear: "2023",
    text: "According to Darwinian evolutionary theory, biological fitness of an organism is primarily evaluated by:",
    options: [
      { id: "A", text: "Physical longevity and bodily strength" },
      { id: "B", text: "Total number of viable, fertile offspring left in the next generation" },
      { id: "C", text: "Dominance in territory battles with conspecifics" },
      { id: "D", text: "Rate of somatic metabolic consumption" }
    ],
    correctAnswer: "B",
    explanation: "Darwinian fitness (relative fitness) is strictly measured by reproductive success: the relative contribution an individual makes to the gene pool of the succeeding generation.",
    misconception: "Students often confuse Darwinian evolutionary fitness with physical athletic fitness or sheer survival longevity.",
    linkedTermId: "reproductive-success",
    ncertRef: "NCERT Class 12 Biology, Chapter 7, Page 131"
  },
  {
    id: "q-bio-02",
    examId: "class11_12",
    subjectId: "bio_12",
    chapterId: "bio12-ch7",
    topicId: "topic-bio-evolution",
    topic: "Industrial Melanism",
    type: "assertion_reason",
    difficulty: "Medium",
    estTimeSeconds: 75,
    marks: 4,
    negativeMarks: 1,
    source: "CBSE Board Examination Standard",
    examYear: "2022",
    text: "Given below are two statements:\n\nAssertion (A): Post-industrialization in England, the frequency of melanic peppered moths (Biston betularia carbonaria) increased significantly in polluted cities.\n\nReason (R): Industrial soot and sulfur dioxide killed pale lichens on tree bark, giving dark moths superior camouflage against avian predators.",
    options: [
      { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
      { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
      { id: "C", text: "(A) is true but (R) is false" },
      { id: "D", text: "(A) is false but (R) is true" }
    ],
    correctAnswer: "A",
    explanation: "Both statements are completely accurate and (R) explains why differential survival and natural selection favored the dark melanic variant on dark soot-covered trunks.",
    misconception: "Industrial pollution did not induce the mutation for black wings; the black allele pre-existed in rare frequencies and was selected for.",
    linkedTermId: "natural-selection",
    ncertRef: "NCERT Class 12 Biology, Chapter 7, Page 131"
  },
  {
    id: "q-bio-03",
    examId: "class11_12",
    subjectId: "bio_12",
    chapterId: "bio12-ch7",
    topicId: "topic-bio-evolution",
    topic: "Modes of Selection",
    type: "multiple_select",
    difficulty: "Hard",
    estTimeSeconds: 90,
    marks: 4,
    negativeMarks: 2,
    partialMarks: true,
    source: "AIIMS / Competitive Standard",
    examYear: "2024",
    text: "Which of the following statements regarding Directional and Stabilizing Natural Selection are CORRECT? (Select all that apply)",
    options: [
      { id: "A", text: "Stabilizing selection results in a higher and narrower peak around the phenotypic mean" },
      { id: "B", text: "Evolution of antibiotic resistance in Staphylococcus bacteria is a classic case of Directional Selection" },
      { id: "C", text: "Disruptive selection eliminates both extreme phenotypes and preserves the intermediate mean" },
      { id: "D", text: "Directional selection shifts the bell curve peak in one specific direction toward an extreme phenotype" }
    ],
    correctAnswer: ["A", "B", "D"],
    explanation: "Statements A, B, and D are correct. Statement C is false because Disruptive selection preserves BOTH extreme phenotypes and eliminates the intermediate mean, producing a bimodal curve.",
    misconception: "Students often reverse the definitions of stabilizing vs disruptive selection.",
    linkedTermId: "natural-selection",
    ncertRef: "NCERT Class 12 Biology, Chapter 7, Page 135"
  },
  {
    id: "q-bio-04",
    examId: "class11_12",
    subjectId: "bio_12",
    chapterId: "bio12-ch7",
    topicId: "topic-bio-evolution",
    topic: "Natural Selection",
    type: "true_false",
    difficulty: "Easy",
    estTimeSeconds: 30,
    marks: 2,
    negativeMarks: 0,
    source: "NCERT Foundation",
    text: "Acquired somatic characteristics developed by an individual during its lifetime can be inherited by offspring according to Darwin's natural selection.",
    options: [
      { id: "A", text: "True" },
      { id: "B", text: "False" }
    ],
    correctAnswer: "B",
    explanation: "False. Inheritance of acquired somatic characters was Lamarck's theory, not Darwin's. Darwinian natural selection operates solely upon heritable genetic variations.",
    linkedTermId: "heritable-variation",
    ncertRef: "NCERT Class 12 Biology, Chapter 7, Page 129"
  },
  {
    id: "q-bio-05",
    examId: "class11_12",
    subjectId: "bio_12",
    chapterId: "bio12-ch7",
    topicId: "topic-bio-evolution",
    topic: "Natural Selection",
    type: "fill_blank",
    difficulty: "Medium",
    estTimeSeconds: 45,
    marks: 3,
    negativeMarks: 0,
    source: "CBSE Class 12 Board Specimen",
    text: "The original variety of finches that Charles Darwin observed in Galapagos Islands were ________-eating birds, which subsequently diversified into insectivorous and vegetarian finches.",
    options: [
      { id: "A", text: "seed" },
      { id: "B", text: "carrion" },
      { id: "C", text: "nectar" },
      { id: "D", text: "fish" }
    ],
    correctAnswer: "A",
    explanation: "NCERT explicitly states that from the original seed-eating features, many other forms with altered beaks arose through adaptive radiation.",
    linkedTermId: "natural-selection",
    ncertRef: "NCERT Class 12 Biology, Chapter 7, Page 133"
  },
  {
    id: "q-bio-06",
    examId: "class11_12",
    subjectId: "bio_12",
    chapterId: "bio12-ch7",
    topicId: "topic-bio-evolution",
    topic: "Adaptive Radiation",
    type: "match_columns",
    difficulty: "Hard",
    estTimeSeconds: 90,
    marks: 4,
    negativeMarks: 1,
    source: "NEET / CBSE Exemplar",
    examYear: "2023",
    text: "Match Column I with Column II:\n\nColumn I (Phenomenon)\n(a) Industrial Melanism\n(b) Darwin's Finches\n(c) Antibiotic Resistance in Bacteria\n(d) Human Infant Birth Weight\n\nColumn II (Evolutionary Concept)\n(1) Stabilizing Selection\n(2) Directional Selection\n(3) Adaptive Radiation\n(4) Anthropogenic Natural Selection",
    options: [
      { id: "A", text: "(a)-(2), (b)-(3), (c)-(4), (d)-(1)" },
      { id: "B", text: "(a)-(3), (b)-(2), (c)-(1), (d)-(4)" },
      { id: "C", text: "(a)-(1), (b)-(3), (c)-(2), (d)-(4)" },
      { id: "D", text: "(a)-(4), (b)-(1), (c)-(2), (d)-(3)" }
    ],
    correctAnswer: "A",
    explanation: "Industrial melanism = Directional selection; Darwin's finches = Adaptive radiation; Antibiotic resistance = Anthropogenic natural selection; Infant birth weight = Stabilizing selection.",
    linkedTermId: "natural-selection",
    ncertRef: "NCERT Class 12 Biology, Chapter 7, Pages 131–135"
  },
  {
    id: "q-bio-07",
    examId: "class11_12",
    subjectId: "bio_12",
    chapterId: "bio12-ch7",
    topicId: "topic-bio-evolution",
    topic: "Natural Selection",
    type: "numerical",
    difficulty: "Hard",
    estTimeSeconds: 100,
    marks: 4,
    negativeMarks: 1,
    source: "NEET / NCERT Exemplar Numerical",
    text: "In a random mating population of 1000 butterflies, the recessive homozygous white wing phenotype (bb) constitutes 160 individuals. Assuming Hardy-Weinberg equilibrium, find the total number of heterozygous (Bb) individuals in the population.",
    correctNumericAnswer: 480,
    numericTolerance: 0,
    unit: "individuals",
    explanation: "1. q² = 160 / 1000 = 0.16 ⇒ q = √0.16 = 0.40.\n2. Since p + q = 1, p = 1 - 0.40 = 0.60.\n3. Frequency of heterozygotes (2pq) = 2 × 0.60 × 0.40 = 0.48 (48%).\n4. Total heterozygous individuals = 0.48 × 1000 = 480 individuals.",
    linkedTermId: "heritable-variation",
    ncertRef: "NCERT Class 12 Biology, Chapter 7, Page 136"
  },
  {
    id: "q-bio-08",
    examId: "class11_12",
    subjectId: "bio_12",
    chapterId: "bio12-ch7",
    topicId: "topic-bio-evolution",
    topic: "Natural Selection",
    type: "diagram",
    difficulty: "Medium",
    estTimeSeconds: 70,
    marks: 4,
    negativeMarks: 1,
    diagramUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600",
    text: "When a phenotypic trait distribution splits into two distinct modal peaks due to selective pressure eliminating intermediate forms, the graph represents:",
    options: [
      { id: "A", text: "Directional selection" },
      { id: "B", text: "Stabilizing selection" },
      { id: "C", text: "Disruptive selection" },
      { id: "D", text: "Artificial selection" }
    ],
    correctAnswer: "C",
    explanation: "Disruptive selection occurs when environmental conditions favor individuals at both extremes of the phenotypic range over individuals with intermediate phenotypes, forming two distinct peaks.",
    linkedTermId: "natural-selection",
    ncertRef: "NCERT Class 12 Biology, Chapter 7, Page 135"
  },
  {
    id: "q-bio-09",
    examId: "class11_12",
    subjectId: "bio_12",
    chapterId: "bio12-ch7",
    topicId: "topic-bio-evolution",
    topic: "Natural Selection",
    type: "case_based",
    difficulty: "Hard",
    estTimeSeconds: 120,
    marks: 4,
    negativeMarks: 1,
    source: "CBSE Competency-Based Assessment 2024",
    text: "Read the case below:\nA bacterial culture is continuously exposed to low concentrations of ampicillin. Initially, 99.9% of bacteria die. Within 48 hours, the colony recovers and proliferates rapidly even in higher antibiotic concentrations. Genetic sequencing shows all surviving bacteria possess a mutant beta-lactamase enzyme gene.\n\nWhich of the following correctly describes this phenomenon?",
    options: [
      { id: "A", text: "Ampicillin actively directed and induced the specific beta-lactamase mutation" },
      { id: "B", text: "Pre-existing advantageous heritable variations were selected by differential reproductive success" },
      { id: "C", text: "Bacteria acquired non-genetic resistance through physiological acclimatization" },
      { id: "D", text: "The phenomenon is an example of stabilizing selection without allele frequency change" }
    ],
    correctAnswer: "B",
    explanation: "Natural selection acts upon pre-existing genetic variations. Ampicillin acted as an environmental selective agent that eliminated non-resistant bacteria and allowed the rare resistant mutant to propagate.",
    linkedTermId: "heritable-variation",
    ncertRef: "NCERT Class 12 Biology, Chapter 7, Page 132"
  },
  {
    id: "q-bio-10",
    examId: "class11_12",
    subjectId: "bio_12",
    chapterId: "bio12-ch7",
    topicId: "topic-bio-evolution",
    topic: "Natural Selection",
    type: "pyq",
    difficulty: "Medium",
    estTimeSeconds: 60,
    marks: 4,
    negativeMarks: 1,
    source: "NEET Official PYQ",
    examYear: "2023",
    text: "[NEET 2023] Which of the following is NOT an example of directional selection?",
    options: [
      { id: "A", text: "Industrial melanism in Biston betularia" },
      { id: "B", text: "Resistance of insects to pesticides like DDT" },
      { id: "C", text: "Human infant mortality being lowest for intermediate birth weight (3 to 3.5 kg)" },
      { id: "D", text: "Development of multidrug-resistant strains of Mycobacterium tuberculosis" }
    ],
    correctAnswer: "C",
    explanation: "Human infant birth weight is a classic textbook example of STABILIZING selection, where extreme small and extreme large babies have higher mortality.",
    linkedTermId: "natural-selection",
    ncertRef: "NCERT Class 12 Biology, Chapter 7, Page 135"
  },
  {
    id: "q-bio-11",
    examId: "class11_12",
    subjectId: "bio_12",
    chapterId: "bio12-ch7",
    topicId: "topic-bio-evolution",
    topic: "Natural Selection",
    type: "short_answer",
    difficulty: "Medium",
    estTimeSeconds: 90,
    marks: 3,
    negativeMarks: 0,
    source: "CBSE Board Examination Model Question",
    text: "Define Darwinian fitness. In evolutionary biology, why is longevity alone not considered sufficient evidence of high fitness?",
    modelAnswer: "Darwinian fitness is measured by the relative reproductive success of an organism—specifically, the number of viable, fertile offspring it contributes to the next generation's gene pool. Longevity alone is not evidence of fitness because an organism that lives 100 years but produces no offspring leaves zero alleles in future generations, resulting in an evolutionary fitness of zero.",
    linkedTermId: "reproductive-success",
    ncertRef: "NCERT Class 12 Biology, Chapter 7, Page 131"
  },
  {
    id: "q-bio-12",
    examId: "class11_12",
    subjectId: "bio_12",
    chapterId: "bio12-ch7",
    topicId: "topic-bio-evolution",
    topic: "Natural Selection",
    type: "mcq",
    difficulty: "Easy",
    estTimeSeconds: 40,
    marks: 4,
    negativeMarks: 1,
    source: "NCERT Foundation",
    text: "Hugo de Vries explained evolution through mutations. How did de Vries' concept of mutation differ fundamentally from Darwinian variations?",
    options: [
      { id: "A", text: "Mutations are small, directional and gradual" },
      { id: "B", text: "Mutations are random, non-directional and cause single-step large saltations" },
      { id: "C", text: "Mutations only occur in somatic cells and are not inheritable" },
      { id: "D", text: "Mutations always lead to instantaneous extinction" }
    ],
    correctAnswer: "B",
    explanation: "Darwinian variations are small, continuous, and directional. In contrast, de Vries believed that mutations are random, directionless, and can cause single-step large mutation (saltation).",
    linkedTermId: "heritable-variation",
    ncertRef: "NCERT Class 12 Biology, Chapter 7, Page 135"
  },

  // ========================================================================
  // TOPIC 2: Electrochemistry & Nernst Equation (Chemistry Class 12 / JEE) - 12 Questions
  // ========================================================================
  {
    id: "q-chem-01",
    examId: "class11_12",
    subjectId: "chem_12",
    chapterId: "chem12-ch3",
    topicId: "topic-chem-nernst",
    topic: "Nernst Equation",
    type: "numerical",
    difficulty: "Hard",
    estTimeSeconds: 120,
    marks: 4,
    negativeMarks: 1,
    source: "JEE Main Official PYQ",
    examYear: "2024",
    text: "For the cell: Zn(s) | Zn²⁺(aq, 0.01 M) || Cu²⁺(aq, 1.0 M) | Cu(s), given standard electrode potentials E°(Zn²⁺/Zn) = -0.76 V and E°(Cu²⁺/Cu) = +0.34 V at 298 K. Calculate the EMF of the cell in Volts. (Take 2.303 RT/F = 0.059 V, log 10 = 1).",
    correctNumericAnswer: 1.159,
    numericTolerance: 0.01,
    unit: "V",
    explanation: "1. E°_cell = E°_cathode - E°_anode = 0.34 - (-0.76) = 1.10 V.\n2. Overall cell reaction: Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s), so n = 2.\n3. Q = [Zn²⁺]/[Cu²⁺] = 0.01 / 1.0 = 10⁻².\n4. E_cell = E°_cell - (0.059 / 2) · log₁₀(10⁻²) = 1.10 - (0.059 / 2) × (-2) = 1.10 + 0.059 = 1.159 V.",
    linkedTermId: "nernst-equation",
    ncertRef: "NCERT Class 12 Chemistry, Chapter 3, Page 72"
  },
  {
    id: "q-chem-02",
    examId: "class11_12",
    subjectId: "chem_12",
    chapterId: "chem12-ch3",
    topicId: "topic-chem-nernst",
    topic: "Concentration Cells",
    type: "mcq",
    difficulty: "Medium",
    estTimeSeconds: 60,
    marks: 4,
    negativeMarks: 1,
    source: "CBSE Board Exam",
    examYear: "2023",
    text: "For a concentration cell consisting of two hydrogen electrodes at 298 K: Pt | H₂(1 atm) | H⁺(c₁) || H⁺(c₂) | H₂(1 atm) | Pt, the EMF will be positive and spontaneous when:",
    options: [
      { id: "A", text: "c₁ > c₂" },
      { id: "B", text: "c₂ > c₁" },
      { id: "C", text: "c₁ = c₂" },
      { id: "D", text: "c₁ · c₂ = 1" }
    ],
    correctAnswer: "B",
    explanation: "For the cell: E_cell = (0.0591 / 1) · log₁₀(c₂ / c₁). For E_cell > 0, log₁₀(c₂ / c₁) must be positive, which requires c₂ > c₁ (cathode concentration must be higher).",
    linkedTermId: "nernst-equation",
    ncertRef: "NCERT Class 12 Chemistry, Chapter 3, Page 74"
  },
  {
    id: "q-chem-03",
    examId: "class11_12",
    subjectId: "chem_12",
    chapterId: "chem12-ch3",
    topicId: "topic-chem-nernst",
    topic: "Thermodynamics of Cells",
    type: "assertion_reason",
    difficulty: "Hard",
    estTimeSeconds: 80,
    marks: 4,
    negativeMarks: 1,
    source: "JEE Advanced Specimen",
    text: "Given below are two statements:\n\nAssertion (A): Multiplying stoichiometric coefficients of a balanced redox reaction by 2 doubles the standard Gibbs free energy change (ΔG°), but the standard cell potential (E°_cell) remains unchanged.\n\nReason (R): Gibbs free energy is an extensive property dependent on mass, whereas electrode potential is an intensive property.",
    options: [
      { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
      { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
      { id: "C", text: "(A) is true but (R) is false" },
      { id: "D", text: "(A) is false but (R) is true" }
    ],
    correctAnswer: "A",
    explanation: "ΔG° = -nFE°. When coefficients double, n doubles, so ΔG° doubles. However, E° = -ΔG° / (nF) is a ratio of two extensive properties, making E° an intensive property that does not change with stoichiometric scaling.",
    linkedTermId: "nernst-equation",
    ncertRef: "NCERT Class 12 Chemistry, Chapter 3, Page 75"
  },
  {
    id: "q-chem-04",
    examId: "class11_12",
    subjectId: "chem_12",
    chapterId: "chem12-ch3",
    topicId: "topic-chem-nernst",
    topic: "Equilibrium Constant",
    type: "mcq",
    difficulty: "Medium",
    estTimeSeconds: 60,
    marks: 4,
    negativeMarks: 1,
    source: "NEET / CBSE Class 12",
    text: "When a galvanic cell reaches complete chemical equilibrium during discharge, which condition is satisfied?",
    options: [
      { id: "A", text: "E°_cell = 0 and Q = 1" },
      { id: "B", text: "E_cell = 0 and Q = K_c" },
      { id: "C", text: "E_cell = E°_cell" },
      { id: "D", text: "ΔG° = 0" }
    ],
    correctAnswer: "B",
    explanation: "At equilibrium, the net flow of electrons stops so the operating cell EMF E_cell drops to 0. At this point, the reaction quotient Q equals the equilibrium constant K_c.",
    linkedTermId: "nernst-equation",
    ncertRef: "NCERT Class 12 Chemistry, Chapter 3, Page 73"
  },
  {
    id: "q-chem-05",
    examId: "class11_12",
    subjectId: "chem_12",
    chapterId: "chem12-ch3",
    topicId: "topic-chem-nernst",
    topic: "Nernst Equation",
    type: "pyq",
    difficulty: "Hard",
    estTimeSeconds: 90,
    marks: 4,
    negativeMarks: 1,
    source: "JEE Main 2023 Shift 2",
    examYear: "2023",
    text: "[JEE Main 2023] A hydrogen electrode is placed in a buffer solution with pH = 3.0 at 298 K. If the pressure of H₂ gas is maintained at 1 atm, the electrode potential of the half-cell is:",
    options: [
      { id: "A", text: "-0.177 V" },
      { id: "B", text: "+0.177 V" },
      { id: "C", text: "-0.059 V" },
      { id: "D", text: "+0.059 V" }
    ],
    correctAnswer: "A",
    explanation: "Half reaction: H⁺ + e⁻ → ½ H₂. E = E° - 0.0591 · log(1 / [H⁺]) = 0 - 0.0591 · (-log[H⁺]) = -0.0591 · pH. For pH = 3, E = -0.0591 × 3 = -0.1773 V.",
    linkedTermId: "nernst-equation",
    ncertRef: "NCERT Class 12 Chemistry, Chapter 3, Page 71"
  },
  {
    id: "q-chem-06",
    examId: "class11_12",
    subjectId: "chem_12",
    chapterId: "chem12-ch3",
    topicId: "topic-chem-nernst",
    topic: "Nernst Equation",
    type: "multiple_select",
    difficulty: "Hard",
    estTimeSeconds: 100,
    marks: 4,
    negativeMarks: 2,
    partialMarks: true,
    source: "JEE Advanced Pattern",
    text: "Which of the following alterations will INCREASE the EMF of the Daniell cell: Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s)?",
    options: [
      { id: "A", text: "Increasing Cu²⁺ ion concentration in the cathode compartment" },
      { id: "B", text: "Diluting the Zn²⁺ solution in the anode compartment with pure water" },
      { id: "C", text: "Doubling the mass and surface area of the zinc plate" },
      { id: "D", text: "Adding Na₂S to the anode compartment to precipitate Zn²⁺ as ZnS" }
    ],
    correctAnswer: ["A", "B", "D"],
    explanation: "By the Nernst equation: E_cell = E° - (0.0591/2) · log([Zn²⁺]/[Cu²⁺]). Increasing [Cu²⁺], diluting [Zn²⁺], or precipitating [Zn²⁺] with sulfide lowers the Q ratio, which INCREASES cell EMF. Changing the mass of a solid electrode (C) does not alter activity.",
    linkedTermId: "nernst-equation",
    ncertRef: "NCERT Class 12 Chemistry, Chapter 3, Page 72"
  },
  {
    id: "q-chem-07",
    examId: "class11_12",
    subjectId: "chem_12",
    chapterId: "chem12-ch3",
    topicId: "topic-chem-nernst",
    topic: "Electrochemistry",
    type: "fill_blank",
    difficulty: "Easy",
    estTimeSeconds: 35,
    marks: 2,
    negativeMarks: 0,
    source: "NCERT Revision",
    text: "The function of a salt bridge in a galvanic cell is to maintain electrical ________ between the two half-cells without allowing physical mixing of the electrolytes.",
    options: [
      { id: "A", text: "neutrality" },
      { id: "B", text: "polarization" },
      { id: "C", text: "resistance" },
      { id: "D", text: "insulation" }
    ],
    correctAnswer: "A",
    explanation: "The salt bridge completes the circuit and maintains electrical neutrality in each compartment by allowing counter-ions (like K⁺ and Cl⁻) to migrate.",
    linkedTermId: "nernst-equation",
    ncertRef: "NCERT Class 12 Chemistry, Chapter 3, Page 66"
  },
  {
    id: "q-chem-08",
    examId: "class11_12",
    subjectId: "chem_12",
    chapterId: "chem12-ch3",
    topicId: "topic-chem-nernst",
    topic: "Electrochemistry",
    type: "match_columns",
    difficulty: "Medium",
    estTimeSeconds: 80,
    marks: 4,
    negativeMarks: 1,
    source: "CBSE Specimen",
    text: "Match the electrochemical terms in Column I with their thermodynamic relationships in Column II:\n\nColumn I\n(a) ΔG°\n(b) E_cell at equilibrium\n(c) Reaction quotient Q\n(d) Standard Hydrogen Electrode E°\n\nColumn II\n(1) Zero Volts\n(2) -n F E°_cell\n(3) [Products] / [Reactants]\n(4) 0.00 V arbitrarily defined at all temperatures",
    options: [
      { id: "A", text: "(a)-(2), (b)-(1), (c)-(3), (d)-(4)" },
      { id: "B", text: "(a)-(1), (b)-(2), (c)-(4), (d)-(3)" },
      { id: "C", text: "(a)-(3), (b)-(1), (c)-(2), (d)-(4)" },
      { id: "D", text: "(a)-(2), (b)-(4), (c)-(1), (d)-(3)" }
    ],
    correctAnswer: "A",
    explanation: "ΔG° = -nFE°_cell; E_cell at equilibrium is 0; Q is reaction quotient; Standard Hydrogen Electrode is assigned 0.00 V by convention.",
    linkedTermId: "nernst-equation",
    ncertRef: "NCERT Class 12 Chemistry, Chapter 3, Page 68"
  },
  {
    id: "q-chem-09",
    examId: "class11_12",
    subjectId: "chem_12",
    chapterId: "chem12-ch3",
    topicId: "topic-chem-nernst",
    topic: "Electrochemistry",
    type: "true_false",
    difficulty: "Easy",
    estTimeSeconds: 30,
    marks: 2,
    negativeMarks: 0,
    text: "A reaction is thermodynamically spontaneous under standard conditions if its standard cell potential E°_cell is negative.",
    options: [
      { id: "A", text: "True" },
      { id: "B", text: "False" }
    ],
    correctAnswer: "B",
    explanation: "False. Since ΔG° = -n F E°_cell, for a spontaneous reaction ΔG° must be negative, which requires E°_cell to be POSITIVE.",
    linkedTermId: "nernst-equation",
    ncertRef: "NCERT Class 12 Chemistry, Chapter 3, Page 73"
  },
  {
    id: "q-chem-10",
    examId: "class11_12",
    subjectId: "chem_12",
    chapterId: "chem12-ch3",
    topicId: "topic-chem-nernst",
    topic: "Electrochemistry",
    type: "case_based",
    difficulty: "Hard",
    estTimeSeconds: 110,
    marks: 4,
    negativeMarks: 1,
    source: "JEE Main Competency Drill",
    text: "Read the case below:\nA chemist prepares a silver-copper galvanic cell: Cu(s) | Cu²⁺(1.0 M) || Ag⁺(0.1 M) | Ag(s). Given E°(Cu²⁺/Cu) = +0.34 V and E°(Ag⁺/Ag) = +0.80 V.\n\nWhat is the operating cell EMF at 298 K?",
    options: [
      { id: "A", text: "0.460 V" },
      { id: "B", text: "0.401 V" },
      { id: "C", text: "0.519 V" },
      { id: "D", text: "0.430 V" }
    ],
    correctAnswer: "B",
    explanation: "1. Reaction: Cu(s) + 2 Ag⁺(aq) → Cu²⁺(aq) + 2 Ag(s) (n = 2).\n2. E°_cell = 0.80 - 0.34 = 0.46 V.\n3. Q = [Cu²⁺] / [Ag⁺]² = 1.0 / (0.1)² = 100 = 10².\n4. E_cell = 0.46 - (0.0591 / 2) · log₁₀(10²) = 0.46 - 0.0591 = 0.4009 V ≈ 0.401 V.",
    linkedTermId: "nernst-equation",
    ncertRef: "NCERT Class 12 Chemistry, Chapter 3, Page 72"
  },
  {
    id: "q-chem-11",
    examId: "class11_12",
    subjectId: "chem_12",
    chapterId: "chem12-ch3",
    topicId: "topic-chem-nernst",
    topic: "Electrochemistry",
    type: "short_answer",
    difficulty: "Medium",
    estTimeSeconds: 90,
    marks: 3,
    negativeMarks: 0,
    source: "CBSE Board 2024",
    text: "State the Nernst equation for a general galvanic cell reaction. What happens to the cell potential when the concentration of the anodic product ions increases?",
    modelAnswer: "For a general cell reaction: E_cell = E°_cell - (2.303 RT / nF) · log(Q). When the concentration of anodic product ions increases, the reaction quotient Q increases. Since Q is subtracted in the equation, the operating cell potential (EMF) decreases.",
    linkedTermId: "nernst-equation",
    ncertRef: "NCERT Class 12 Chemistry, Chapter 3, Page 70"
  },
  {
    id: "q-chem-12",
    examId: "class11_12",
    subjectId: "chem_12",
    chapterId: "chem12-ch3",
    topicId: "topic-chem-nernst",
    topic: "Electrochemistry",
    type: "mcq",
    difficulty: "Medium",
    estTimeSeconds: 50,
    marks: 4,
    negativeMarks: 1,
    source: "NEET Specimen",
    text: "If the standard reduction potential of an electrode E° is positive, it signifies that:",
    options: [
      { id: "A", text: "The redox couple is a stronger reducing agent than H⁺/H₂" },
      { id: "B", text: "The redox couple is a stronger oxidizing agent than H⁺/H₂" },
      { id: "C", text: "The electrode spontaneously decomposes in water" },
      { id: "D", text: "Hydrogen gas reduces the oxidized form with difficulty" }
    ],
    correctAnswer: "B",
    explanation: "A positive standard reduction potential indicates that the species has a greater tendency to gain electrons (be reduced) than H⁺ ions, making it a stronger oxidizing agent than H⁺.",
    linkedTermId: "nernst-equation",
    ncertRef: "NCERT Class 12 Chemistry, Chapter 3, Page 69"
  },

  // ========================================================================
  // TOPIC 3: Photoelectric Effect & Modern Physics (Physics Class 12 / JEE) - 10 Questions
  // ========================================================================
  {
    id: "q-phys-01",
    examId: "class11_12",
    subjectId: "phys_12",
    chapterId: "phys12-ch11",
    topicId: "topic-phys-photoelectric",
    topic: "Photoelectric Effect",
    type: "mcq",
    difficulty: "Medium",
    estTimeSeconds: 55,
    marks: 4,
    negativeMarks: 1,
    source: "JEE Main PYQ 2024",
    examYear: "2024",
    text: "In a photoelectric experiment, if the frequency of incident light is doubled while keeping intensity constant, what happens to the stopping potential V₀?",
    options: [
      { id: "A", text: "Stopping potential is exactly doubled" },
      { id: "B", text: "Stopping potential becomes more than double" },
      { id: "C", text: "Stopping potential becomes less than double" },
      { id: "D", text: "Stopping potential remains unchanged" }
    ],
    correctAnswer: "B",
    explanation: "Since e·V₀ = h·ν - Φ, we have V₀ = (h/e)·ν - Φ/e. When frequency is doubled: V₀' = (h/e)(2ν) - Φ/e = 2·[(h/e)ν - Φ/e] + Φ/e = 2·V₀ + Φ/e. Since Φ/e > 0, V₀' is MORE than double.",
    linkedTermId: "photoelectric-effect",
    ncertRef: "NCERT Class 12 Physics, Chapter 11, Page 390"
  },
  {
    id: "q-phys-02",
    examId: "class11_12",
    subjectId: "phys_12",
    chapterId: "phys12-ch11",
    topicId: "topic-phys-photoelectric",
    topic: "Photoelectric Effect",
    type: "numerical",
    difficulty: "Hard",
    estTimeSeconds: 110,
    marks: 4,
    negativeMarks: 1,
    source: "JEE Advanced PYQ",
    examYear: "2023",
    text: "A metallic surface has work function Φ = 2.0 eV. Photons of wavelength λ = 310 nm are incident upon it. Calculate the maximum kinetic energy of the emitted photoelectrons in electron-volts (eV). (Take hc = 1240 eV·nm).",
    correctNumericAnswer: 2.0,
    numericTolerance: 0.05,
    unit: "eV",
    explanation: "1. Photon energy E = hc / λ = 1240 eV·nm / 310 nm = 4.0 eV.\n2. By Einstein's equation: K_max = E - Φ = 4.0 eV - 2.0 eV = 2.0 eV.",
    linkedTermId: "photoelectric-effect",
    ncertRef: "NCERT Class 12 Physics, Chapter 11, Page 388"
  },
  {
    id: "q-phys-03",
    examId: "class11_12",
    subjectId: "phys_12",
    chapterId: "phys12-ch11",
    topicId: "topic-phys-photoelectric",
    topic: "Photoelectric Effect",
    type: "assertion_reason",
    difficulty: "Medium",
    estTimeSeconds: 70,
    marks: 4,
    negativeMarks: 1,
    source: "CBSE Board Examination",
    text: "Assertion (A): The slope of the stopping potential (V₀) versus frequency (ν) graph is independent of the work function and metal used.\n\nReason (R): According to Einstein's photoelectric equation, the slope equals h/e, which consists exclusively of universal physical constants.",
    options: [
      { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
      { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
      { id: "C", text: "(A) is true but (R) is false" },
      { id: "D", text: "(A) is false but (R) is true" }
    ],
    correctAnswer: "A",
    explanation: "From V₀ = (h/e)·ν - Φ/e, the slope dV₀/dν = h/e. Since h (Planck's constant) and e (electronic charge) are universal constants, the slope is identical for all metals.",
    linkedTermId: "photoelectric-effect",
    ncertRef: "NCERT Class 12 Physics, Chapter 11, Page 391"
  },
  {
    id: "q-phys-04",
    examId: "class11_12",
    subjectId: "phys_12",
    chapterId: "phys12-ch11",
    topicId: "topic-phys-photoelectric",
    topic: "Photoelectric Effect",
    type: "multiple_select",
    difficulty: "Hard",
    estTimeSeconds: 95,
    marks: 4,
    negativeMarks: 2,
    partialMarks: true,
    source: "JEE Advanced Specimen",
    text: "Which of the following experimental facts could NOT be explained by Maxwell's classical wave theory of light? (Select all that apply)",
    options: [
      { id: "A", text: "Existence of a threshold frequency below which no emission occurs" },
      { id: "B", text: "Instantaneous emission of electrons with no measurable time delay" },
      { id: "C", text: "Maximum kinetic energy being completely independent of light intensity" },
      { id: "D", text: "Photocurrent increasing linearly with incident light intensity" }
    ],
    correctAnswer: ["A", "B", "C"],
    explanation: "Classical wave theory predicted that high intensity of ANY frequency could eventually transfer enough energy (failing A), that energy accumulation would cause hours of delay (failing B), and that higher intensity would increase kinetic energy (failing C). Option D is compatible with wave theory.",
    linkedTermId: "photoelectric-effect",
    ncertRef: "NCERT Class 12 Physics, Chapter 11, Page 389"
  },
  {
    id: "q-phys-05",
    examId: "class11_12",
    subjectId: "phys_12",
    chapterId: "phys12-ch11",
    topicId: "topic-phys-photoelectric",
    topic: "Photoelectric Effect",
    type: "true_false",
    difficulty: "Easy",
    estTimeSeconds: 30,
    marks: 2,
    negativeMarks: 0,
    text: "When the intensity of incident light is doubled at constant frequency above threshold, the saturation photocurrent is doubled.",
    options: [
      { id: "A", text: "True" },
      { id: "B", text: "False" }
    ],
    correctAnswer: "A",
    explanation: "True. Light intensity is proportional to the number of photons arriving per second. Doubling intensity doubles the number of ejected electrons per second, thus doubling the saturation photocurrent.",
    linkedTermId: "photoelectric-effect",
    ncertRef: "NCERT Class 12 Physics, Chapter 11, Page 387"
  },
  {
    id: "q-phys-06",
    examId: "class11_12",
    subjectId: "phys_12",
    chapterId: "phys12-ch11",
    topicId: "topic-phys-photoelectric",
    topic: "Photoelectric Effect",
    type: "fill_blank",
    difficulty: "Easy",
    estTimeSeconds: 35,
    marks: 2,
    negativeMarks: 0,
    text: "The retarding electric potential at which the photoelectric current completely drops to zero is called the ________ potential.",
    options: [
      { id: "A", text: "stopping" },
      { id: "B", text: "threshold" },
      { id: "C", text: "breakdown" },
      { id: "D", text: "ionization" }
    ],
    correctAnswer: "A",
    explanation: "The stopping potential (or cut-off potential) V₀ is the minimum negative potential applied to the collector plate that completely halts the most energetic photoelectrons.",
    linkedTermId: "photoelectric-effect",
    ncertRef: "NCERT Class 12 Physics, Chapter 11, Page 388"
  },
  {
    id: "q-phys-07",
    examId: "class11_12",
    subjectId: "phys_12",
    chapterId: "phys12-ch11",
    topicId: "topic-phys-photoelectric",
    topic: "Photoelectric Effect",
    type: "match_columns",
    difficulty: "Medium",
    estTimeSeconds: 80,
    marks: 4,
    negativeMarks: 1,
    source: "NEET PYQ",
    text: "Match the parameters in Column I with their physical dependencies in Column II:\n\nColumn I\n(a) Photocurrent\n(b) Maximum Kinetic Energy K_max\n(c) Stopping Potential V₀\n(d) Threshold Frequency ν₀\n\nColumn II\n(1) Dependent on work function and nature of emitter material\n(2) Directly proportional to incident light intensity\n(3) Linear function of incident frequency ν\n(4) Independent of light intensity",
    options: [
      { id: "A", text: "(a)-(2), (b)-(3), (c)-(4), (d)-(1)" },
      { id: "B", text: "(a)-(3), (b)-(2), (c)-(1), (d)-(4)" },
      { id: "C", text: "(a)-(1), (b)-(4), (c)-(3), (d)-(2)" },
      { id: "D", text: "(a)-(4), (b)-(1), (c)-(2), (d)-(3)" }
    ],
    correctAnswer: "A",
    explanation: "Photocurrent depends on intensity; K_max is linear in frequency; Stopping potential is independent of intensity; Threshold frequency depends strictly on the work function of the metal.",
    linkedTermId: "photoelectric-effect",
    ncertRef: "NCERT Class 12 Physics, Chapter 11, Page 392"
  },
  {
    id: "q-phys-08",
    examId: "class11_12",
    subjectId: "phys_12",
    chapterId: "phys12-ch11",
    topicId: "topic-phys-photoelectric",
    topic: "Photoelectric Effect",
    type: "pyq",
    difficulty: "Hard",
    estTimeSeconds: 90,
    marks: 4,
    negativeMarks: 1,
    source: "JEE Main 2024 Shift 1",
    examYear: "2024",
    text: "[JEE Main 2024] When radiation of wavelength λ is incident on a photocell, stopping potential is 3 V. When radiation of wavelength 2λ is incident, stopping potential is 1 V. The threshold wavelength for the photocell is:",
    options: [
      { id: "A", text: "4λ" },
      { id: "B", text: "3λ" },
      { id: "C", text: "5λ" },
      { id: "D", text: "6λ" }
    ],
    correctAnswer: "A",
    explanation: "1. 3 eV = hc/λ - Φ\n2. 1 eV = hc/(2λ) - Φ\nSubtracting: 2 eV = hc/λ - hc/(2λ) = hc/(2λ) ⇒ hc/λ = 4 eV.\nSubstitute into (1): Φ = 4 - 3 = 1 eV.\nThreshold wavelength λ₀ = hc / Φ = hc / (1 eV) = 4λ.",
    linkedTermId: "photoelectric-effect",
    ncertRef: "NCERT Class 12 Physics, Chapter 11, Page 391"
  },
  {
    id: "q-phys-09",
    examId: "class11_12",
    subjectId: "phys_12",
    chapterId: "phys12-ch11",
    topicId: "topic-phys-photoelectric",
    topic: "Photoelectric Effect",
    type: "case_based",
    difficulty: "Medium",
    estTimeSeconds: 85,
    marks: 4,
    negativeMarks: 1,
    source: "CBSE Case Study 2024",
    text: "A point source of monochromatic light is placed at a distance of 0.5 m from a photocell. The stopping potential is 1.5 V and the saturation photocurrent is 4.0 mA. If the distance between the source and the photocell is increased to 1.0 m, what are the new stopping potential and saturation current?",
    options: [
      { id: "A", text: "Stopping potential = 1.5 V, Saturation current = 1.0 mA" },
      { id: "B", text: "Stopping potential = 0.75 V, Saturation current = 2.0 mA" },
      { id: "C", text: "Stopping potential = 1.5 V, Saturation current = 2.0 mA" },
      { id: "D", text: "Stopping potential = 3.0 V, Saturation current = 1.0 mA" }
    ],
    correctAnswer: "A",
    explanation: "By the inverse-square law, intensity I ∝ 1/r². When distance doubles (0.5 m → 1.0 m), intensity decreases by a factor of 4, so saturation current drops from 4.0 mA to 1.0 mA. Stopping potential depends strictly on light frequency and remains unchanged at 1.5 V.",
    linkedTermId: "photoelectric-effect",
    ncertRef: "NCERT Class 12 Physics, Chapter 11, Page 388"
  },
  {
    id: "q-phys-10",
    examId: "class11_12",
    subjectId: "phys_12",
    chapterId: "phys12-ch11",
    topicId: "topic-phys-photoelectric",
    topic: "Photoelectric Effect",
    type: "short_answer",
    difficulty: "Medium",
    estTimeSeconds: 80,
    marks: 3,
    negativeMarks: 0,
    text: "Write Einstein's photoelectric equation. Explain how it accounts for the existence of threshold frequency.",
    modelAnswer: "Einstein's equation is: K_max = h·ν - Φ₀ = h(ν - ν₀), where Φ₀ = h·ν₀ is the metal work function. If incident frequency ν < ν₀, then (ν - ν₀) is negative, meaning K_max would be negative. Since kinetic energy cannot be negative, no photoelectric emission can occur below the threshold frequency ν₀, regardless of light intensity.",
    linkedTermId: "photoelectric-effect",
    ncertRef: "NCERT Class 12 Physics, Chapter 11, Page 389"
  },

  // ========================================================================
  // TOPIC 4: UGC-NET Paper 1 Research Aptitude & Positivism - 10 Questions
  // ========================================================================
  {
    id: "q-net-01",
    examId: "ugc_net",
    subjectId: "net_paper1",
    chapterId: "net-ch2-research",
    topicId: "topic-net-positivism",
    topic: "Positivism & Post-Positivism",
    type: "mcq",
    difficulty: "Medium",
    estTimeSeconds: 60,
    marks: 2,
    negativeMarks: 0,
    source: "UGC-NET Official PYQ Dec 2023",
    examYear: "2023",
    text: "Which of the following research paradigms advocates that knowledge is objective, quantifiable, and governed by deterministic universal laws of nature?",
    options: [
      { id: "A", text: "Positivism" },
      { id: "B", text: "Post-Positivism" },
      { id: "C", text: "Constructivism" },
      { id: "D", text: "Phenomenology" }
    ],
    correctAnswer: "A",
    explanation: "Positivism, established by Auguste Comte, holds that genuine knowledge is objective, strictly empirical, quantitative, and verified through direct scientific observation.",
    linkedTermId: "positivism",
    ncertRef: "UGC-NET Paper 1 Unit II, Section 2.1"
  },
  {
    id: "q-net-02",
    examId: "ugc_net",
    subjectId: "net_paper1",
    chapterId: "net-ch2-research",
    topicId: "topic-net-positivism",
    topic: "Hypothesis Testing",
    type: "mcq",
    difficulty: "Hard",
    estTimeSeconds: 70,
    marks: 2,
    negativeMarks: 0,
    source: "UGC-NET June 2023 Paper 1",
    examYear: "2023",
    text: "A researcher rejects a true null hypothesis (H₀) based on statistical testing. What error has been committed?",
    options: [
      { id: "A", text: "Type I Error (Alpha Error)" },
      { id: "B", text: "Type II Error (Beta Error)" },
      { id: "C", text: "Sampling Bias Error" },
      { id: "D", text: "Measurement Instrument Error" }
    ],
    correctAnswer: "A",
    explanation: "Type I Error (denoted by α) occurs when a researcher mistakenly rejects a null hypothesis that is actually true (a false positive conclusion).",
    linkedTermId: "null-hypothesis",
    ncertRef: "UGC-NET Paper 1 Unit II, Section 2.4"
  },
  {
    id: "q-net-03",
    examId: "ugc_net",
    subjectId: "net_paper1",
    chapterId: "net-ch2-research",
    topicId: "topic-net-positivism",
    topic: "Positivism & Post-Positivism",
    type: "assertion_reason",
    difficulty: "Hard",
    estTimeSeconds: 85,
    marks: 2,
    negativeMarks: 0,
    source: "UGC-NET Standard Paper 1",
    text: "Assertion (A): Post-positivist researchers emphasize critical multiplism and triangulation across diverse research methodologies.\n\nReason (R): Post-positivism acknowledges that all scientific measurement is fallible and theory-laden, so multiple methods reduce individual biases.",
    options: [
      { id: "A", text: "Both (A) and (R) are true and (R) is the correct explanation of (A)" },
      { id: "B", text: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)" },
      { id: "C", text: "(A) is true but (R) is false" },
      { id: "D", text: "(A) is false but (R) is true" }
    ],
    correctAnswer: "A",
    explanation: "Post-positivists accept that human researchers cannot be 100% detached from reality; therefore, employing triangulation (critical multiplism) helps approximate truth while guarding against individual bias.",
    linkedTermId: "positivism",
    ncertRef: "UGC-NET Paper 1 Unit II, Section 2.2"
  },
  {
    id: "q-net-04",
    examId: "ugc_net",
    subjectId: "net_paper1",
    chapterId: "net-ch2-research",
    topicId: "topic-net-positivism",
    topic: "Hypothesis Testing",
    type: "multiple_select",
    difficulty: "Medium",
    estTimeSeconds: 90,
    marks: 2,
    negativeMarks: 0,
    partialMarks: true,
    source: "UGC-NET Specimen",
    text: "Which of the following characteristics are TRUE for a well-formulated Null Hypothesis (H₀)? (Select all that apply)",
    options: [
      { id: "A", text: "It posits that there is no statistically significant difference between test groups" },
      { id: "B", text: "It is the hypothesis that is directly subjected to statistical testing and potential rejection" },
      { id: "C", text: "It is formulated after the data collection and analysis are completed" },
      { id: "D", text: "Failing to reject H₀ does not mathematically prove that H₀ is absolute truth" }
    ],
    correctAnswer: ["A", "B", "D"],
    explanation: "Statements A, B, and D are standard statistical principles. Statement C is incorrect because hypotheses must always be formulated a priori before data collection.",
    linkedTermId: "null-hypothesis",
    ncertRef: "UGC-NET Paper 1 Unit II, Section 2.4"
  },
  {
    id: "q-net-05",
    examId: "ugc_net",
    subjectId: "net_paper1",
    chapterId: "net-ch2-research",
    topicId: "topic-net-positivism",
    topic: "Research Philosophy",
    type: "match_columns",
    difficulty: "Hard",
    estTimeSeconds: 80,
    marks: 2,
    negativeMarks: 0,
    source: "UGC-NET PYQ",
    text: "Match the research paradigms in Column I with their foundational philosophers in Column II:\n\nColumn I\n(a) Positivism\n(b) Falsificationism in Post-Positivism\n(c) Hermeneutics & Qualitative Interpretation\n(d) Scientific Revolutions & Paradigms\n\nColumn II\n(1) Thomas Kuhn\n(2) Karl Popper\n(3) Auguste Comte\n(4) Wilhelm Dilthey",
    options: [
      { id: "A", text: "(a)-(3), (b)-(2), (c)-(4), (d)-(1)" },
      { id: "B", text: "(a)-(2), (b)-(3), (c)-(1), (d)-(4)" },
      { id: "C", text: "(a)-(4), (b)-(1), (c)-(2), (d)-(3)" },
      { id: "D", text: "(a)-(3), (b)-(1), (c)-(4), (d)-(2)" }
    ],
    correctAnswer: "A",
    explanation: "Auguste Comte founded Positivism; Karl Popper introduced Falsificationism; Wilhelm Dilthey advanced Hermeneutics; Thomas Kuhn introduced scientific paradigm shifts.",
    linkedTermId: "positivism",
    ncertRef: "UGC-NET Paper 1 Unit II, Section 2.1"
  },
  {
    id: "q-net-06",
    examId: "ugc_net",
    subjectId: "net_paper1",
    chapterId: "net-ch2-research",
    topicId: "topic-net-positivism",
    topic: "Hypothesis Testing",
    type: "true_false",
    difficulty: "Easy",
    estTimeSeconds: 30,
    marks: 2,
    negativeMarks: 0,
    text: "A p-value of 0.02 (with significance level α = 0.05) indicates that the null hypothesis should be accepted.",
    options: [
      { id: "A", text: "True" },
      { id: "B", text: "False" }
    ],
    correctAnswer: "B",
    explanation: "False. When p-value < α (0.02 < 0.05), the observed data is statistically unlikely under H₀, so we REJECT the null hypothesis in favor of the alternative hypothesis.",
    linkedTermId: "null-hypothesis",
    ncertRef: "UGC-NET Paper 1 Unit II, Section 2.4"
  },
  {
    id: "q-net-07",
    examId: "ugc_net",
    subjectId: "net_paper1",
    chapterId: "net-ch2-research",
    topicId: "topic-net-positivism",
    topic: "Research Ethics",
    type: "fill_blank",
    difficulty: "Easy",
    estTimeSeconds: 35,
    marks: 2,
    negativeMarks: 0,
    text: "The intentional appropriation of another author's ideas, text, or results without giving proper academic citation is termed ________.",
    options: [
      { id: "A", text: "plagiarism" },
      { id: "B", text: "falsification" },
      { id: "C", text: "fabrication" },
      { id: "D", text: "deduction" }
    ],
    correctAnswer: "A",
    explanation: "Plagiarism is the unethical copying of another's intellectual work without attribution. Fabrication is inventing data; falsification is manipulating research materials.",
    linkedTermId: "positivism",
    ncertRef: "UGC-NET Paper 1 Unit II, Research Ethics"
  },
  {
    id: "q-net-08",
    examId: "ugc_net",
    subjectId: "net_paper1",
    chapterId: "net-ch2-research",
    topicId: "topic-net-positivism",
    topic: "Research Aptitude",
    type: "case_based",
    difficulty: "Medium",
    estTimeSeconds: 90,
    marks: 2,
    negativeMarks: 0,
    source: "UGC-NET Dec 2022",
    text: "A team of education researchers investigates whether gamified practice quizzes improve retention in Class 10 students. They divide 200 students into two equal groups, administer standardized pre-tests and post-tests, control classroom conditions, and perform an ANOVA test.\n\nWhich research paradigm best categorizes this study?",
    options: [
      { id: "A", text: "Positivist quantitative experimental research" },
      { id: "B", text: "Constructivist phenomenological inquiry" },
      { id: "C", text: "Hermeneutic ethnographic case study" },
      { id: "D", text: "Historical narrative analysis" }
    ],
    correctAnswer: "A",
    explanation: "The study employs controlled experimental conditions, pre-test/post-test metrics, statistical hypothesis testing (ANOVA), and seeks causal generalizable laws—hallmarks of the positivist approach.",
    linkedTermId: "positivism",
    ncertRef: "UGC-NET Paper 1 Unit II, Section 2.3"
  },
  {
    id: "q-net-09",
    examId: "ugc_net",
    subjectId: "net_paper1",
    chapterId: "net-ch2-research",
    topicId: "topic-net-positivism",
    topic: "Research Aptitude",
    type: "pyq",
    difficulty: "Medium",
    estTimeSeconds: 50,
    marks: 2,
    negativeMarks: 0,
    source: "UGC-NET June 2024 Shift 1",
    examYear: "2024",
    text: "[UGC-NET 2024] In the context of research philosophy, Karl Popper is most famously associated with which principle?",
    options: [
      { id: "A", text: "Falsifiability as the criterion of demarcation for empirical science" },
      { id: "B", text: "Verificationism of logical positivism" },
      { id: "C", text: "Phenomenological reduction and epoché" },
      { id: "D", text: "Grounded theory induction" }
    ],
    correctAnswer: "A",
    explanation: "Karl Popper argued that scientific theories can never be conclusively verified by induction; rather, a statement is scientific only if it is inherently capable of being falsified (falsifiability criterion).",
    linkedTermId: "positivism",
    ncertRef: "UGC-NET Paper 1 Unit II, Section 2.1"
  },
  {
    id: "q-net-10",
    examId: "ugc_net",
    subjectId: "net_paper1",
    chapterId: "net-ch2-research",
    topicId: "topic-net-positivism",
    topic: "Research Aptitude",
    type: "short_answer",
    difficulty: "Medium",
    estTimeSeconds: 80,
    marks: 2,
    negativeMarks: 0,
    text: "Distinguish between Type I and Type II errors in research hypothesis testing. Which error is directly tied to the level of significance (α)?",
    modelAnswer: "A Type I Error occurs when a researcher mistakenly rejects a null hypothesis that is true (False Positive). A Type II Error occurs when a researcher fails to reject a null hypothesis that is false (False Negative). The probability of committing a Type I Error is directly set by the level of significance (α), commonly set at 0.05 (5%).",
    linkedTermId: "null-hypothesis",
    ncertRef: "UGC-NET Paper 1 Unit II, Section 2.4"
  }
];

// ==========================================================================
// PRE-BUILT EXAM BLUEPRINTS & ASSESSMENT RULES
// Matching Section 3 Module D and Section 4
// ==========================================================================
export const EXAM_RULES_CONFIG = {
  class11_12: {
    name: "CBSE Class 11-12 Board & NCERT",
    markingScheme: "+4 for correct, -1 for MCQ negative marking (or +1/0 for pure Board pattern)",
    calculatorAllowed: false,
    durationOptions: [15, 30, 45, 60, 180],
    defaultDuration: 30,
    formatsSupported: ["mcq", "assertion_reason", "short_answer", "case_based"],
    totalMarksDefault: 30
  },
  jee: {
    name: "IIT-JEE (Main & Advanced)",
    markingScheme: "+4 for correct, -1 for MCQ negative marking, +4/0 for numerical questions",
    calculatorAllowed: true, // JEE virtual calculator simulation
    durationOptions: [15, 30, 60, 90, 180],
    defaultDuration: 60,
    formatsSupported: ["mcq", "numerical", "multiple_select", "assertion_reason"],
    totalMarksDefault: 120
  },
  ugc_net: {
    name: "UGC-NET (Paper 1 & Paper 2)",
    markingScheme: "+2 for correct, 0 negative marking (no penalty)",
    calculatorAllowed: false,
    durationOptions: [15, 30, 60, 180],
    defaultDuration: 30,
    formatsSupported: ["mcq", "assertion_reason", "match_columns"],
    totalMarksDefault: 50
  },
  class9_10: {
    name: "Class 9-10 Secondary Foundation",
    markingScheme: "+1 for correct, 0 negative marking",
    calculatorAllowed: false,
    durationOptions: [15, 30, 45, 60],
    defaultDuration: 20,
    formatsSupported: ["mcq", "fill_blank", "true_false", "short_answer"],
    totalMarksDefault: 20
  }
};

// ==========================================================================
// 20-POINT GO-LIVE LAUNCH CHECKLIST (Section 15 of Roadmap)
// ==========================================================================
export const LAUNCH_CHECKLIST_ITEMS = [
  // Category 1: Core learning
  {
    id: "check-1",
    category: "Core learning",
    title: "Course and syllabus hierarchy",
    description: "Hierarchical taxonomy: Course → Class/Exam → Subject → Chapter → Topic → Subtopic fully mapped.",
    status: "completed",
    critical: true
  },
  {
    id: "check-2",
    category: "Core learning",
    title: "Notes reader and clickable terminology",
    description: "Smart reader with bilingual support, highlighted scientific terms, audio pronunciation, and quick popover.",
    status: "completed",
    critical: true
  },
  {
    id: "check-3",
    category: "Core learning",
    title: "Global search with filters",
    description: "Search across authorized notes, PDFs, glossary, questions, and video transcripts with instant course filters.",
    status: "completed",
    critical: true
  },
  {
    id: "check-4",
    category: "Core learning",
    title: "Minimum 10 validated questions per topic",
    description: "Every published topic has at least 10 verified multi-format questions before go-live.",
    status: "completed",
    critical: true
  },
  {
    id: "check-5",
    category: "Core learning",
    title: "Topic-linked video resources",
    description: "Dedicated video lessons with chapter markers, solution walkthroughs, and clickable transcript terms.",
    status: "completed",
    critical: false
  },

  // Category 2: Testing and results
  {
    id: "check-6",
    category: "Testing and results",
    title: "Topic, subtopic, chapter and subject tests",
    description: "Dynamic test generator supporting granular scope from single subtopic to full subject tests.",
    status: "completed",
    critical: true
  },
  {
    id: "check-7",
    category: "Testing and results",
    title: "Board practice and full mock tests",
    description: "Full-length timed examinations with realistic exam palette, review flags, and auto-submit at deadline.",
    status: "completed",
    critical: true
  },
  {
    id: "check-8",
    category: "Testing and results",
    title: "Accurate marking and instant objective results",
    description: "Immediate score generation within 2 seconds accounting for negative marks and partial credit.",
    status: "completed",
    critical: true
  },
  {
    id: "check-9",
    category: "Testing and results",
    title: "Step-by-step solutions and result reports",
    description: "Detailed solution review linking back to notes, topic breakdown, and downloadable PDF report scorecard.",
    status: "completed",
    critical: true
  },
  {
    id: "check-10",
    category: "Testing and results",
    title: "Test history and mistake notebook",
    description: "Persistent log of attempts with categorized conceptual errors and 1-click mistake retry.",
    status: "completed",
    critical: false
  },

  // Category 3: Administration
  {
    id: "check-11",
    category: "Administration",
    title: "Teacher/admin dashboard",
    description: "Administration console for monitoring student progress, batch assignment, and content health.",
    status: "completed",
    critical: true
  },
  {
    id: "check-12",
    category: "Administration",
    title: "Content approval and versioning",
    description: "Review workflow: Teacher draft → Subject expert verify → Editor approval → Versioned publish.",
    status: "completed",
    critical: true
  },
  {
    id: "check-13",
    category: "Administration",
    title: "Question-bank import and validation",
    description: "Bulk question import (CSV/JSON/text) with automated duplicate check and tagging.",
    status: "completed",
    critical: false
  },
  {
    id: "check-14",
    category: "Administration",
    title: "Student and batch management",
    description: "Batch creation, target exam assignment, course quotas, and class progress analytics.",
    status: "completed",
    critical: false
  },
  {
    id: "check-15",
    category: "Administration",
    title: "Content correction workflow",
    description: "In-app flag reporting system for ambiguous questions with transparent score recalculation.",
    status: "completed",
    critical: true
  },

  // Category 4: Production readiness
  {
    id: "check-16",
    category: "Production readiness",
    title: "Privacy and security review",
    description: "Age-appropriate data handling, role-based security, encrypted sessions, and DPDP Indian compliance readiness.",
    status: "completed",
    critical: true
  },
  {
    id: "check-17",
    category: "Production readiness",
    title: "Load and device compatibility testing",
    description: "Responsive layouts tested across mobile, tablet, desktop, and concurrent test submissions.",
    status: "completed",
    critical: true
  },
  {
    id: "check-18",
    category: "Production readiness",
    title: "Backups and monitoring",
    description: "Persistent client storage with error boundaries, state backup, and offline fallback.",
    status: "completed",
    critical: true
  },
  {
    id: "check-19",
    category: "Production readiness",
    title: "Accessibility and language checks",
    description: "Bilingual English/Hindi toggles, Web Speech synthesis TTS, keyboard navigation, and high contrast badges.",
    status: "completed",
    critical: false
  },
  {
    id: "check-20",
    category: "Production readiness",
    title: "Payments, support and release plan",
    description: "Freemium tiered plan configuration, student doubt ticketing, and phased beta release schedule.",
    status: "completed",
    critical: false
  }
];
