// ==========================================================================
// DEDICATED CLASS & EXAM CURRICULUM ADDITIONS
// Grounded academic notes, verified question banks, and video lessons for:
// Class 9, Class 10, Class 11, Class 12, JEE (IIT), and NEET (Medical)
// ==========================================================================

export const CLASS_SPECIFIC_NOTES = {
  // 1. CLASS 9 SCIENCE
  "topic-sci9-cells": {
    topicId: "topic-sci9-cells",
    title: "Cell Organelles & Osmosis Mechanisms",
    chapterTitle: "Chapter 5: Fundamental Unit of Life",
    subjectName: "Science (Class 9 NCERT)",
    courseId: "class_9",
    readingTimeMinutes: 10,
    ncertPageRange: "Pages 57–67",
    summary: "The cell is the basic structural and functional unit of life. Understanding plasma membrane permeability, hypotonic/hypertonic osmosis, and organelles.",
    contentEn: `
### 1. Structural Organization of a Cell
Every cell is bounded by a **plasma membrane** (cell membrane) composed of lipids and proteins. It is **selectively permeable**, regulating molecular movement into and out of the cell.

### 2. Osmosis: Movement of Water Molecules
Osmosis is the spontaneous net movement of water molecules through a selectively permeable membrane along a concentration gradient.
* **Hypotonic Solution (Dilute exterior):** The medium surrounding the cell has a higher water concentration than inside. Water enters the cell, causing it to swell and potentially burst (animal cell) or become turgid (plant cell with rigid cell wall).
* **Isotonic Solution (Equal concentration):** The water concentration is identical inside and outside. No net movement occurs; cell size remains unchanged.
* **Hypertonic Solution (Concentrated exterior):** The medium has a lower water concentration than the cell. Water exits the cell, causing **plasmolysis** (shrinkage of protoplasm away from cell wall).

### 3. Key Organelles & Functions
* **Mitochondria:** The 'powerhouse of the cell'. Possesses its own DNA and ribosomes, generating energy in the form of **ATP** (Adenosine Triphosphate).
* **Endoplasmic Reticulum (ER):** Rough ER (RER) has ribosomes and synthesizes proteins; Smooth ER (SER) synthesizes lipids and detoxifies poisons/drugs.
* **Golgi Apparatus:** Storage, modification, and packaging of biochemical products into vesicles.
* **Lysosomes:** 'Suicide bags' of the cell filled with powerful digestive enzymes capable of breaking down foreign materials and worn-out cell parts.
`,
    contentHi: `
### 1. कोशिका की संरचना और प्लाज्मा झिल्ली
कोशिका जीवन की मूलभूत संरचनात्मक एवं क्रियात्मक इकाई है। कोशिका झिल्ली चयनात्मक पारगम्य (selectively permeable) होती है, जो विशिष्ट पदार्थों के आवागमन को नियंत्रित करती है।

### 2. परासरण (Osmosis) के तीन मुख्य प्रकार
* **अल्पपरासारी विलयन (Hypotonic):** कोशिका में पानी प्रवेश करता है और कोशिका फूल जाती है।
* **समपरासारी विलयन (Isotonic):** जल का कोई शुद्ध प्रवाह नहीं होता; कोशिका का आकार स्थिर रहता है।
* **अतिपरासारी विलयन (Hypertonic):** कोशिका से जल बाहर निकल जाता है, जिससे कोशिका सिकुड़ जाती है (जीवद्रव्यकुंचन / Plasmolysis)।
`,
    diagrams: [
      {
        caption: "Plant Cell vs Animal Cell Ultrastructure & Osmosis Behavior",
        url: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=600"
      }
    ],
    workedExamples: [
      {
        title: "Osmosis in Raisins",
        problem: "Dry raisins are placed in pure water for 4 hours, then transferred to a concentrated salt solution. Explain the physical observations.",
        solution: "In pure water (hypotonic solution), endosmosis occurs and raisins swell. In concentrated salt solution (hypertonic solution), exosmosis occurs and water leaves the swollen raisins, causing them to shrink."
      }
    ],
    shortcuts: ["Mnemonic: Hypertonic shrinks (H-per = Pinched), Hypotonic swells (H-po = Puffed like an O)."]
  },

  // 2. CLASS 9 MATHEMATICS
  "topic-math9-numbers": {
    topicId: "topic-math9-numbers",
    title: "Irrational Numbers & Real Number Line",
    chapterTitle: "Chapter 1: Number Systems",
    subjectName: "Mathematics (Class 9 NCERT)",
    courseId: "class_9",
    readingTimeMinutes: 12,
    ncertPageRange: "Pages 1–28",
    summary: "Real numbers consist of rational and irrational numbers. Decimal expansions, representing √n geometrically, and rationalizing the denominator.",
    contentEn: `
### 1. Real Number Classifications
* **Rational Numbers ($\\\\mathbb{Q}$):** Any number expressible in the form $\\\\frac{p}{q}$ where $p, q \\\\in \\\\mathbb{Z}$ and $q \\\\neq 0$. Decimal expansion is either **terminating** (e.g. $0.375$) or **non-terminating recurring** (e.g. $0.333... = 0.\\\\overline{3}$).
* **Irrational Numbers:** Numbers that cannot be written as $\\\\frac{p}{q}$. Their decimal expansions are **non-terminating and non-recurring** (e.g. $\\\\sqrt{2} \\\\approx 1.414213...$, $\\\\pi \\\\approx 3.141592...$).

### 2. Rationalizing the Denominator
When a radical appears in the denominator, multiply numerator and denominator by the conjugate radical:
$$\\\\frac{1}{\\\\sqrt{a} + \\\\sqrt{b}} \\\\times \\\\frac{\\\\sqrt{a} - \\\\sqrt{b}}{\\\\sqrt{a} - \\\\sqrt{b}} = \\\\frac{\\\\sqrt{a} - \\\\sqrt{b}}{a - b}$$
`,
    contentHi: `
### 1. वास्तविक संख्याएं एवं अपरिमेय संख्याएं
* **परिमेय संख्याएँ:** वे संख्याएँ जिन्हें $\\\\frac{p}{q}$ ($q \\\\neq 0$) के रूप में लिखा जा सकता है। इनका दशमलव प्रसार या तो सांत होता है या अनवसानी आवर्ती।
* **अपरिमेय संख्याएँ:** जिनका दशमलव प्रसार अनवसानी अनावर्ती (non-terminating non-repeating) होता है, जैसे $\\\\sqrt{2}, \\\\sqrt{3}, \\\\pi$।
`,
    workedExamples: [
      {
        title: "Rationalizing 1 / (7 + 3√2)",
        problem: "Rationalize the denominator of 1 / (7 + 3√2).",
        solution: "Multiply by conjugate (7 - 3√2): [1 * (7 - 3√2)] / [(7 + 3√2)(7 - 3√2)] = (7 - 3√2) / (49 - 18) = (7 - 3√2) / 31."
      }
    ],
    shortcuts: ["Rule: Sum or product of a non-zero rational and an irrational is always irrational."]
  },

  // 3. CLASS 10 SCIENCE
  "topic-sci10-transport": {
    topicId: "topic-sci10-transport",
    title: "Transportation & Circulatory System",
    chapterTitle: "Chapter 6: Life Processes",
    subjectName: "Science (Class 10 NCERT)",
    courseId: "class_10",
    readingTimeMinutes: 12,
    ncertPageRange: "Pages 103–112",
    summary: "Human double circulation, four-chambered heart anatomy, blood vessels, and vascular transport in plants via xylem and phloem.",
    contentEn: `
### 1. Human Circulatory System & Double Circulation
The human heart has **four chambers** (2 atria, 2 ventricles) ensuring oxygenated and deoxygenated blood do not mix.
* **Pulmonary Circulation:** Right ventricle pumps deoxygenated blood to the lungs via pulmonary artery; oxygenated blood returns to left atrium via pulmonary veins.
* **Systemic Circulation:** Left ventricle pumps oxygen-rich blood through aorta to tissues; deoxygenated blood returns via vena cava to right atrium.
* Blood passes through the heart **twice** during each cardiac cycle, hence termed **Double Circulation**.

### 2. Transport in Plants
* **Xylem:** Transports water and minerals upwards from roots via suction pressure created by **transpiration pull**.
* **Phloem:** Transports soluble products of photosynthesis (sucrose, amino acids) bidirectionally (**translocation**), utilizing ATP energy.
`,
    contentHi: `
### 1. मानव में दोहरा परिसंचरण (Double Circulation)
मानव हृदय चार कोष्ठों में विभाजित है। ऑक्सीजन युक्त और ऑक्सीजन रहित रक्त अलग रहते हैं। रक्त एक चक्र पूरा करने के लिए हृदय से दो बार गुजरता है, इसलिए इसे 'दोहरा परिसंचरण' कहा जाता है।

### 2. पादपों में परिवहन
* **जाइलम (Xylem):** जड़ों से पत्तियों तक जल और खनिजों का वाष्पोत्सर्जन खिंचाव द्वारा एकदिशीय परिवहन।
* **फ्लोएम (Phloem):** पत्तियों से तैयार भोजन (सुक्रोज) का सभी अंगों में द्विदिशीय स्थानांतरण (Translocation), जिसमें ATP ऊर्जा प्रयुक्त होती है।
`,
    workedExamples: [
      {
        title: "Advantage of 4-Chambered Heart",
        problem: "Why is a four-chambered heart necessary in birds and mammals?",
        solution: "Birds and mammals are warm-blooded (homeothermic) and require high amounts of energy to maintain constant body temperature. Complete separation of oxygenated and deoxygenated blood ensures highly efficient oxygen delivery to tissues."
      }
    ],
    shortcuts: ["Arteries carry Away from heart (thick walls, no valves). Veins carry toward heart (thin walls, have valves)."]
  },

  // 4. CLASS 10 MATHEMATICS
  "topic-math10-roots": {
    topicId: "topic-math10-roots",
    title: "Discriminant & Nature of Roots",
    chapterTitle: "Chapter 4: Quadratic Equations",
    subjectName: "Mathematics (Class 10 NCERT)",
    courseId: "class_10",
    readingTimeMinutes: 10,
    ncertPageRange: "Pages 70–91",
    summary: "Standard quadratic form ax² + bx + c = 0, quadratic formula, and testing nature of roots using the discriminant D = b² - 4ac.",
    contentEn: `
### 1. Standard Form & Quadratic Formula
For $ax^2 + bx + c = 0$ ($a \\\\neq 0$), the roots are given by:
$$x = \\\\frac{-b \\\\pm \\\\sqrt{b^2 - 4ac}}{2a}$$

### 2. Nature of Roots via Discriminant ($D = b^2 - 4ac$)
* **If $D > 0$:** Two distinct real roots.
* **If $D = 0$:** Two equal real roots ($x = -b / 2a$).
* **If $D < 0$:** No real roots (roots are complex/imaginary).
`,
    contentHi: `
### 1. द्विघात समीकरण एवं विविक्तकर (Discriminant)
मानक रूप: $ax^2 + bx + c = 0$ ($a \\\\neq 0$). विविक्तकर $D = b^2 - 4ac$ द्वारा मूलों की प्रकृति तय होती है:
* **$D > 0$:** दो भिन्न वास्तविक मूल।
* **$D = 0$:** दो बराबर वास्तविक मूल ($x = -b / 2a$)।
* **$D < 0$:** कोई वास्तविक मूल नहीं।
`,
    workedExamples: [
      {
        title: "Finding Equal Roots Condition",
        problem: "Find the values of k for which 2x² + kx + 3 = 0 has two equal roots.",
        solution: "For equal roots, D = 0. Here a = 2, b = k, c = 3. D = k² - 4(2)(3) = k² - 24 = 0 => k = ±√24 = ±2√6."
      }
    ],
    shortcuts: ["If a and c have opposite signs (ac < 0), then D = b² - 4ac is ALWAYS positive (guaranteed real roots)."]
  },

  // 5. CLASS 11 PHYSICS
  "topic-phys11-kinematics": {
    topicId: "topic-phys11-kinematics",
    title: "Kinematic Equations & Relative Motion",
    chapterTitle: "Chapter 3: Motion in a Straight Line",
    subjectName: "Physics (Class 11 NCERT)",
    courseId: "class_11",
    readingTimeMinutes: 14,
    ncertPageRange: "Pages 39–58",
    summary: "Derivation of equations of uniformly accelerated motion using calculus and graphs. Relative velocity in 1D and vertical projectile motion.",
    contentEn: `
### 1. Equations of Uniform Acceleration
For constant acceleration $a$:
1. $v = u + at$
2. $s = ut + \\\\frac{1}{2}at^2$
3. $v^2 = u^2 + 2as$
4. Distance in $n^{\\\\text{th}}$ second: $s_n = u + \\\\frac{a}{2}(2n - 1)$

### 2. Relative Velocity in One Dimension
The relative velocity of object $A$ with respect to object $B$ is:
$$v_{AB} = v_A - v_B$$
* When moving in the same direction: $|v_{AB}| = |v_A - v_B|$
* When moving in opposite directions: $|v_{AB}| = v_A + v_B$
`,
    contentHi: `
### 1. एकसमान त्वरित गति के समीकरण
जब त्वरण $a$ नियत हो:
$v = u + at$, $s = ut + \\\\frac{1}{2}at^2$, $v^2 = u^2 + 2as$।
`,
    workedExamples: [
      {
        title: "Overtaking Trains Problem",
        problem: "Two trains 100 m and 150 m long travel in opposite directions at 54 km/h and 36 km/h. Find the time to completely cross each other.",
        solution: "Relative velocity = 54 + 36 = 90 km/h = 25 m/s. Total distance to cross = 100 + 150 = 250 m. Time = distance / v_rel = 250 / 25 = 10 seconds."
      }
    ],
    shortcuts: ["Area under v-t curve represents displacement; slope of v-t curve represents acceleration."]
  },

  // 6. CLASS 11 CHEMISTRY
  "topic-chem11-bonding": {
    topicId: "topic-chem11-bonding",
    title: "VSEPR Theory & Hybridization",
    chapterTitle: "Chapter 4: Chemical Bonding & Molecular Structure",
    subjectName: "Chemistry (Class 11 NCERT)",
    courseId: "class_11",
    readingTimeMinutes: 14,
    ncertPageRange: "Pages 100–128",
    summary: "VSEPR model for geometry prediction, steric number, hybridization types (sp, sp², sp³, sp³d, sp³d²), and dipole moments.",
    contentEn: `
### 1. VSEPR Theory Repulsion Hierarchy
Valence Shell Electron Pair Repulsion dictates that electron pairs around a central atom orient to minimize repulsions:
$$\\\\text{Lone Pair - Lone Pair (lp-lp)} > \\\\text{lp - bp} > \\\\text{bp - bp}$$

### 2. Steric Number & Hybridization Table
* **Steric No. 2:** $sp$ hybridization $\\\\rightarrow$ Linear ($180^\\\\circ$, e.g. $\\\\text{BeCl}_2, \\\\text{CO}_2$)
* **Steric No. 3:** $sp^2$ hybridization $\\\\rightarrow$ Trigonal Planar ($120^\\\\circ$, e.g. $\\\\text{BF}_3$) or Bent (e.g. $\\\\text{SO}_2$)
* **Steric No. 4:** $sp^3$ hybridization $\\\\rightarrow$ Tetrahedral ($109.5^\\\\circ$, $\\\\text{CH}_4$), Trigonal Pyramidal ($107^\\\\circ$, $\\\\text{NH}_3$), Bent ($104.5^\\\\circ$, $\\\\text{H}_2\\\\text{O}$)
`,
    contentHi: `
### 1. VSEPR सिद्धांत एवं संकरण (Hybridization)
इलेक्ट्रॉन युग्मों के बीच प्रतिकर्षण का क्रम: एकाकी-एकाकी (lp-lp) > एकाकी-बंधी (lp-bp) > बंधी-बंधी (bp-bp)।
`,
    workedExamples: [
      {
        title: "Bond Angles in CH4, NH3, and H2O",
        problem: "Explain why the bond angle decreases from CH4 (109.5°) to NH3 (107°) to H2O (104.5°) despite all having sp³ hybridized central atoms.",
        solution: "CH4 has 0 lone pairs. NH3 has 1 lone pair whose greater repulsion compresses H-N-H angle to 107°. H2O has 2 lone pairs exerting intense lp-lp repulsion, compressing the H-O-H angle further to 104.5°."
      }
    ],
    shortcuts: ["Steric number = (Number of sigma bonds) + (Number of lone pairs on central atom)."]
  },

  // 7. IIT-JEE PHYSICS
  "topic-jee-rot": {
    topicId: "topic-jee-rot",
    title: "Pure Rolling & Angular Momentum Conservation",
    chapterTitle: "Chapter: Rotational Dynamics & Rigid Bodies",
    subjectName: "Physics (JEE Advanced)",
    courseId: "jee",
    readingTimeMinutes: 18,
    ncertPageRange: "JEE Advanced Mechanics Unit",
    summary: "Pure rolling conditions v = ωR, friction direction, instantaneous axis of rotation, and conservation of angular momentum about fixed axes.",
    contentEn: `
### 1. Kinematics of Pure Rolling
A rigid body of radius $R$ rolling without slipping on a stationary horizontal surface satisfies:
$$v_{\\\\text{cm}} = \\\\omega R, \\\\quad a_{\\\\text{cm}} = \\\\alpha R$$
At the point of instantaneous contact $P$, the instantaneous velocity is strictly zero: $\\\\vec{v}_P = \\\\vec{v}_{\\\\text{cm}} + \\\\vec{\\\\omega} \\\\times \\\\vec{r} = 0$.

### 2. Total Kinetic Energy in Pure Rolling
$$K_{\\\\text{total}} = K_{\\\\text{trans}} + K_{\\\\text{rot}} = \\\\frac{1}{2} M v_{\\\\text{cm}}^2 + \\\\frac{1}{2} I_{\\\\text{cm}} \\\\omega^2 = \\\\frac{1}{2} M v_{\\\\text{cm}}^2 \\\\left(1 + \\\\frac{k^2}{R^2}\\\\right)$$
where $k$ is the radius of gyration.
`,
    contentHi: `
### 1. शुद्ध लोटनिक गति (Pure Rolling)
जब कोई पिंड बिना फिसले लोटन करता है, तो संपर्क बिंदु का तात्क्षणिक वेग शून्य होता है: $v_{\\\\text{cm}} = \\\\omega R$। कुल गतिज ऊर्जा = स्थानांतरणीय गतिज ऊर्जा + घूर्णन गतिज ऊर्जा।
`,
    workedExamples: [
      {
        title: "Rolling Down an Incline",
        problem: "A solid sphere and a hollow cylinder of equal mass and radius roll down an incline of angle θ without slipping. Which reaches the bottom first?",
        solution: "Acceleration in pure rolling is a = g sin(θ) / [1 + (I_cm / MR²)]. For solid sphere, I_cm/MR² = 2/5 = 0.4, so a_sphere = g sin(θ) / 1.4. For hollow cylinder, I_cm/MR² = 1.0, so a_cyl = g sin(θ) / 2.0. The solid sphere has higher acceleration and arrives first."
      }
    ],
    shortcuts: ["In pure rolling down an incline, static friction does zero work; mechanical energy is conserved."]
  },

  // 8. IIT-JEE CHEMISTRY
  "topic-jee-thermo": {
    topicId: "topic-jee-thermo",
    title: "Chemical Equilibrium & Nernst Applications",
    chapterTitle: "Chapter: Thermodynamics & Electrochemistry",
    subjectName: "Chemistry (JEE Physical)",
    courseId: "jee",
    readingTimeMinutes: 16,
    ncertPageRange: "JEE Physical Chemistry Unit",
    summary: "Gibbs free energy, van 't Hoff isochore, reaction quotient Q, cell EMF, and advanced potentiometric equilibrium.",
    contentEn: `
### 1. Thermodynamic Driving Force
$$\\\\Delta G = \\\\Delta G^\\\\circ + RT \\\\ln Q$$
At equilibrium, $\\\\Delta G = 0$ and $Q = K_{\\\\text{eq}}$, giving:
$$\\\\Delta G^\\\\circ = -RT \\\\ln K_{\\\\text{eq}} = -nFE_{\\\\text{cell}}^\\\\circ$$

### 2. Nernst Equation for Electrochemical Cells
$$E_{\\\\text{cell}} = E_{\\\\text{cell}}^\\\\circ - \\\\frac{2.303 RT}{nF} \\\\log_{10} Q = E_{\\\\text{cell}}^\\\\circ - \\\\frac{0.0591}{n} \\\\log_{10} Q \\\\quad (\\\\text{at } 298\\\\text{ K})$$
`,
    contentHi: `
### 1. रासायनिक साम्य एवं नेर्न्स्ट समीकरण
गिब्स मुक्त ऊर्जा एवं मानक सेल विभव का संबंध: $\\\\Delta G^\\\\circ = -nFE_{\\\\text{cell}}^\\\\circ$। $298\\\\text{ K}$ पर नेर्न्स्ट समीकरण: $E = E^\\\\circ - \\\\frac{0.0591}{n} \\\\log Q$।
`,
    workedExamples: [
      {
        title: "Equilibrium Constant from Standard EMF",
        problem: "Calculate K_eq at 298 K for a cell with E° = +0.2955 V and n = 2.",
        solution: "E° = (0.0591 / n) * log(K_eq) => 0.2955 = (0.0591 / 2) * log(K_eq) => log(K_eq) = 10 => K_eq = 10^10."
      }
    ],
    shortcuts: ["At equilibrium, E_cell = 0, but E°_cell is constant and generally non-zero."]
  },

  // 9. IIT-JEE MATHEMATICS
  "topic-jee-leibnitz": {
    topicId: "topic-jee-leibnitz",
    title: "Leibnitz Rule & Reduction Formulas",
    chapterTitle: "Chapter: Definite Integrals & Advanced Calculus",
    subjectName: "Mathematics (JEE Advanced)",
    courseId: "jee",
    readingTimeMinutes: 15,
    ncertPageRange: "JEE Advanced Integral Calculus",
    summary: "Differentiation under the integral sign using Newton-Leibnitz theorem, Wallis integration formulas, and periodic function symmetry.",
    contentEn: `
### 1. Newton-Leibnitz Differentiation Rule
If $I(x) = \\\\int_{\\\\psi(x)}^{\\\\phi(x)} f(t) dt$, then:
$$\\\\frac{dI}{dx} = f(\\\\phi(x)) \\\\cdot \\\\phi'(x) - f(\\\\psi(x)) \\\\cdot \\\\psi'(x)$$

### 2. Wallis Formula for Definite Integrals
$$\\\\int_0^{\\\\pi/2} \\\\sin^n x \\\\, dx = \\\\int_0^{\\\\pi/2} \\\\cos^n x \\\\, dx = \\\\frac{(n-1)(n-3)...}{(n)(n-2)...} \\\\times C$$
where $C = \\\\frac{\\\\pi}{2}$ if $n$ is even, and $C = 1$ if $n$ is odd.
`,
    contentHi: `
### 1. न्यूटन-लीबनिज समाकलन अवकलन नियम
यदि समाकलन की सीमाएँ $x$ के फलन हों, तो सीमा में मान रखकर ऊपरी और निचली सीमा के अवकलज से गुणा किया जाता है।
`,
    workedExamples: [
      {
        title: "Applying Leibnitz Rule to Evaluate Limit",
        problem: "Evaluate limit as x -> 0 of [∫_0^(x²) cos(t²) dt] / [x * sin(x)].",
        solution: "Form is 0/0. Apply L'Hôpital's rule. Numerator derivative by Leibnitz = cos((x²)²) * 2x = 2x cos(x⁴). Denominator derivative = sin(x) + x cos(x). Divide by x: 2 cos(x⁴) / [(sin x / x) + cos x]. As x -> 0, this evaluates to 2 / (1 + 1) = 1."
      }
    ],
    shortcuts: ["Whenever a limit has an integral with variable limits, apply Leibnitz theorem + L'Hôpital immediately."]
  }
};

export const CLASS_SPECIFIC_VIDEOS = {
  "topic-sci9-cells": {
    topicId: "topic-sci9-cells",
    videoUrl: "https://www.youtube.com/embed/URUJD5NEXC8",
    durationMinutes: 14,
    title: "Cell Structure & Osmosis Mechanisms Explained",
    instructor: "Dr. Sunita Rao, HOD Sciences",
    chapters: [
      { time: "00:00", label: "Plasma membrane structure" },
      { time: "03:45", label: "Hypotonic vs hypertonic osmosis" },
      { time: "08:20", label: "Mitochondria & ATP synthesis" },
      { time: "11:50", label: "Summary & NCERT question tips" }
    ]
  },
  "topic-sci10-transport": {
    topicId: "topic-sci10-transport",
    videoUrl: "https://www.youtube.com/embed/k9Zz8bX_2-c",
    durationMinutes: 16,
    title: "Human Double Circulation & Heart Working",
    instructor: "Dr. Sunita Rao",
    chapters: [
      { time: "00:00", label: "Anatomy of the 4 chambers" },
      { time: "04:30", label: "Pulmonary vs systemic circuit" },
      { time: "09:15", label: "Valves & cardiac cycle" },
      { time: "13:30", label: "Xylem & phloem translocation" }
    ]
  },
  "topic-phys11-kinematics": {
    topicId: "topic-phys11-kinematics",
    videoUrl: "https://www.youtube.com/embed/ZM8ECpBQD0A",
    durationMinutes: 18,
    title: "Calculus Derivation of Motion Equations & Graphs",
    instructor: "Er. Amit Verma",
    chapters: [
      { time: "00:00", label: "Instantaneous vs average velocity" },
      { time: "05:10", label: "v-t graph area & displacement" },
      { time: "10:30", label: "Relative motion in 1D" },
      { time: "15:00", label: "Vertical projectile shortcuts" }
    ]
  },
  "topic-jee-rot": {
    topicId: "topic-jee-rot",
    videoUrl: "https://www.youtube.com/embed/CHQ4aV2g_Q0",
    durationMinutes: 24,
    title: "Pure Rolling Dynamics & Angular Momentum in JEE Adv",
    instructor: "Er. Amit Verma",
    chapters: [
      { time: "00:00", label: "Instantaneous axis of rotation" },
      { time: "06:15", label: "Friction direction in rolling" },
      { time: "14:00", label: "Conservation about non-fixed axes" },
      { time: "19:30", label: "Previous year JEE Adv problems" }
    ]
  }
};

export const CLASS_SPECIFIC_QUESTIONS = [
  // Class 9 Science Questions
  {
    id: "q-sci9-01",
    examId: "class_9",
    categoryId: "class_9",
    subjectId: "sci_9",
    chapterId: "sci9-ch5",
    topicId: "topic-sci9-cells",
    topic: "Osmosis",
    type: "mcq",
    difficulty: "Easy",
    estTimeSeconds: 45,
    marks: 1,
    negativeMarks: 0,
    source: "CBSE Class 9 NCERT",
    text: "When a plant cell is placed in a hypertonic solution, which of the following phenomena occurs?",
    options: [
      { id: "A", text: "Endosmosis and swelling of the cell" },
      { id: "B", text: "Plasmolysis and shrinkage of the protoplast" },
      { id: "C", text: "Cell membrane bursts due to osmotic pressure" },
      { id: "D", text: "No movement of water occurs" }
    ],
    correctAnswer: "B",
    explanation: "In a hypertonic solution, the external water concentration is lower than that inside the cell. Water moves out by exosmosis, causing the protoplast to shrink away from the cell wall (plasmolysis).",
    ncertRef: "NCERT Class 9 Science, Chapter 5, Page 61"
  },
  {
    id: "q-sci9-02",
    examId: "class_9",
    categoryId: "class_9",
    subjectId: "sci_9",
    chapterId: "sci9-ch5",
    topicId: "topic-sci9-cells",
    topic: "Cell Organelles",
    type: "mcq",
    difficulty: "Medium",
    estTimeSeconds: 50,
    marks: 1,
    negativeMarks: 0,
    source: "CBSE Class 9 NCERT Exemplar",
    text: "Which cell organelle contains its own genetic material (DNA) and ribosomes, enabling it to synthesize some of its own proteins?",
    options: [
      { id: "A", text: "Golgi apparatus" },
      { id: "B", text: "Lysosome" },
      { id: "C", text: "Mitochondria" },
      { id: "D", text: "Vacuole" }
    ],
    correctAnswer: "C",
    explanation: "Mitochondria and plastids are semi-autonomous organelles possessing their own circular DNA and 70S ribosomes.",
    ncertRef: "NCERT Class 9 Science, Chapter 5, Page 65"
  },

  // Class 9 Math Questions
  {
    id: "q-math9-01",
    examId: "class_9",
    categoryId: "class_9",
    subjectId: "math_9",
    chapterId: "math9-ch1",
    topicId: "topic-math9-numbers",
    topic: "Number Systems",
    type: "mcq",
    difficulty: "Easy",
    estTimeSeconds: 50,
    marks: 1,
    negativeMarks: 0,
    source: "CBSE Class 9 Mathematics",
    text: "Which of the following is an irrational number?",
    options: [
      { id: "A", text: "√225" },
      { id: "B", text: "0.3796" },
      { id: "C", text: "7.478478..." },
      { id: "D", text: "1.101001000100001..." }
    ],
    correctAnswer: "D",
    explanation: "Option D has a non-terminating and non-recurring decimal expansion, which is the defining property of irrational numbers. Option A is √225 = 15 (rational).",
    ncertRef: "NCERT Class 9 Mathematics, Chapter 1, Page 12"
  },

  // Class 10 Science Questions
  {
    id: "q-sci10-01",
    examId: "class_10",
    categoryId: "class_10",
    subjectId: "sci_10",
    chapterId: "sci10-ch6",
    topicId: "topic-sci10-transport",
    topic: "Double Circulation",
    type: "mcq",
    difficulty: "Medium",
    estTimeSeconds: 60,
    marks: 1,
    negativeMarks: 0,
    source: "CBSE Class 10 Board 2024",
    text: "Which blood vessel carries oxygen-rich blood from the lungs directly into the left atrium of the human heart?",
    options: [
      { id: "A", text: "Pulmonary artery" },
      { id: "B", text: "Pulmonary vein" },
      { id: "C", text: "Vena cava" },
      { id: "D", text: "Aorta" }
    ],
    correctAnswer: "B",
    explanation: "The pulmonary vein is unique because it is the only vein carrying oxygenated blood, transporting it from the alveoli of the lungs into the left atrium.",
    ncertRef: "NCERT Class 10 Science, Chapter 6, Page 106"
  },
  {
    id: "q-sci10-02",
    examId: "class_10",
    categoryId: "class_10",
    subjectId: "sci_10",
    chapterId: "sci10-ch6",
    topicId: "topic-sci10-transport",
    topic: "Plant Transport",
    type: "assertion_reason",
    difficulty: "Medium",
    estTimeSeconds: 60,
    marks: 2,
    negativeMarks: 0,
    source: "CBSE Class 10 Board Standard",
    text: "Assertion (A): Transpiration helps in the upward absorption and translocation of water and dissolved minerals in plants.\nReason (R): Transpiration generates a continuous suction pull in the xylem vessels.",
    options: [
      { id: "A", text: "Both (A) and (R) are true, and (R) is the correct explanation of (A)" },
      { id: "B", text: "Both (A) and (R) are true, but (R) is NOT the correct explanation of (A)" },
      { id: "C", text: "(A) is true, but (R) is false" },
      { id: "D", text: "(A) is false, but (R) is true" }
    ],
    correctAnswer: "A",
    explanation: "Evaporation of water molecules from stomata cells creates a suction pull (transpiration pull) that pulls water from xylem cells of roots to leaves.",
    ncertRef: "NCERT Class 10 Science, Chapter 6, Page 108"
  },

  // Class 10 Math Questions
  {
    id: "q-math10-01",
    examId: "class_10",
    categoryId: "class_10",
    subjectId: "math_10",
    chapterId: "math10-ch4",
    topicId: "topic-math10-roots",
    topic: "Quadratic Equations",
    type: "mcq",
    difficulty: "Medium",
    estTimeSeconds: 60,
    marks: 1,
    negativeMarks: 0,
    source: "CBSE Class 10 Board 2023",
    text: "If the quadratic equation 2x² - kx + k = 0 has two equal real roots, what are the possible values of k?",
    options: [
      { id: "A", text: "k = 0 only" },
      { id: "B", text: "k = 8 only" },
      { id: "C", text: "k = 0 or k = 8" },
      { id: "D", text: "k = 4" }
    ],
    correctAnswer: "C",
    explanation: "For equal real roots, D = b² - 4ac = 0. Here a = 2, b = -k, c = k. So (-k)² - 4(2)(k) = 0 => k² - 8k = 0 => k(k - 8) = 0. Hence k = 0 or k = 8.",
    ncertRef: "NCERT Class 10 Mathematics, Chapter 4, Page 90"
  },

  // Class 11 Physics Questions
  {
    id: "q-phys11-01",
    examId: "class_11",
    categoryId: "class_11",
    subjectId: "phys_11",
    chapterId: "phys11-ch3",
    topicId: "topic-phys11-kinematics",
    topic: "Kinematics",
    type: "numerical",
    difficulty: "Medium",
    estTimeSeconds: 80,
    marks: 3,
    negativeMarks: 1,
    source: "CBSE Class 11 Physics & NEET",
    text: "A particle starts from rest and moves with uniform acceleration of 4 m/s². What is the distance travelled by the particle in the 3rd second of its motion?",
    options: [
      { id: "A", text: "10 m" },
      { id: "B", text: "18 m" },
      { id: "C", text: "12 m" },
      { id: "D", text: "14 m" }
    ],
    correctAnswer: "A",
    explanation: "Using distance in nth second formula: s_n = u + (a/2)(2n - 1). Here u = 0, a = 4, n = 3. s_3 = 0 + (4/2)(2(3) - 1) = 2 * 5 = 10 meters.",
    ncertRef: "NCERT Class 11 Physics, Chapter 3, Page 47"
  },

  // IIT-JEE Physics Questions
  {
    id: "q-jee-phys-01",
    examId: "jee",
    categoryId: "iit",
    subjectId: "jee_phys",
    chapterId: "jee-phys-rot",
    topicId: "topic-jee-rot",
    topic: "Rotational Dynamics",
    type: "mcq",
    difficulty: "Hard",
    estTimeSeconds: 120,
    marks: 4,
    negativeMarks: 1,
    source: "IIT-JEE Advanced",
    text: "A solid uniform cylinder of mass M and radius R rolls without slipping down an incline of angle θ. The magnitude of the frictional force acting on the cylinder is:",
    options: [
      { id: "A", text: "(1/3) Mg sin θ" },
      { id: "B", text: "(2/3) Mg sin θ" },
      { id: "C", text: "(1/2) Mg sin θ" },
      { id: "D", text: "Mg sin θ" }
    ],
    correctAnswer: "A",
    explanation: "For a solid cylinder rolling down an incline: a_cm = g sin θ / (1 + I_cm / MR²) = g sin θ / (1 + 1/2) = (2/3) g sin θ. Newton's second law along the incline: Mg sin θ - f = M a_cm = M (2/3 g sin θ) = (2/3) Mg sin θ. Thus f = Mg sin θ - (2/3) Mg sin θ = (1/3) Mg sin θ.",
    ncertRef: "JEE Advanced Physics Mechanics Volume I"
  },

  // IIT-JEE Chemistry Questions
  {
    id: "q-jee-chem-01",
    examId: "jee",
    categoryId: "iit",
    subjectId: "jee_chem",
    chapterId: "jee-chem-thermo",
    topicId: "topic-jee-thermo",
    topic: "Chemical Equilibrium",
    type: "mcq",
    difficulty: "Hard",
    estTimeSeconds: 100,
    marks: 4,
    negativeMarks: 1,
    source: "IIT-JEE Main / Advanced",
    text: "For a reversible galvanic cell reaction with standard cell potential E°_cell = +1.10 V at 298 K involving transfer of 2 electrons, the equilibrium constant K_eq is of the order of:",
    options: [
      { id: "A", text: "10^37" },
      { id: "B", text: "10^10" },
      { id: "C", text: "10^18" },
      { id: "D", text: "10^-37" }
    ],
    correctAnswer: "A",
    explanation: "log10(K_eq) = (n * E°_cell) / 0.0591 = (2 * 1.10) / 0.0591 = 2.20 / 0.0591 ≈ 37.22. Thus K_eq ≈ 10^37.22.",
    ncertRef: "JEE Physical Chemistry, Electrochemistry Chapter"
  },

  // IIT-JEE Mathematics Questions
  {
    id: "q-jee-math-01",
    examId: "jee",
    categoryId: "iit",
    subjectId: "jee_math",
    chapterId: "jee-math-calc",
    topicId: "topic-jee-leibnitz",
    topic: "Definite Integrals",
    type: "mcq",
    difficulty: "Hard",
    estTimeSeconds: 120,
    marks: 4,
    negativeMarks: 1,
    source: "IIT-JEE Advanced",
    text: "Let f(x) = ∫_0^x (t² - 3t + 2) dt for x ∈ ℝ. The points of local extrema for f(x) are:",
    options: [
      { id: "A", text: "Local maximum at x = 1, Local minimum at x = 2" },
      { id: "B", text: "Local minimum at x = 1, Local maximum at x = 2" },
      { id: "C", text: "Local minimum at x = 0" },
      { id: "D", text: "No local extrema exist" }
    ],
    correctAnswer: "A",
    explanation: "By the Fundamental Theorem of Calculus (Leibnitz rule), f'(x) = x² - 3x + 2 = (x - 1)(x - 2). Critical points are x = 1 and x = 2. f''(x) = 2x - 3. At x = 1: f''(1) = -1 < 0 (Local Maximum). At x = 2: f''(2) = +1 > 0 (Local Minimum).",
    ncertRef: "JEE Advanced Integral Calculus"
  }
];
