// ==========================================================================
// CENTRAL LEARNING CATEGORIES & DRILL-DOWN SYLLABUS MAPPING
// Direct implementation of the student user flow diagram:
// Categories: IIT | Medical (NEET) | Class - XII | Class - XI | Class - 10 | Class - 9
// ==========================================================================

import { SYLLABUS_TREE, SMART_NOTES_COLLECTION, TOPIC_VIDEOS_COLLECTION, EXPANDED_QUESTIONS_BANK } from "./edtechCurriculum";

export const STUDENT_CATEGORIES = [
  {
    id: "iit",
    name: "IIT / JEE",
    badge: "Engineering Entrance",
    tagline: "JEE Main & Advanced Problem Solving",
    color: "#10b981",
    iconName: "Compass",
    description: "Deep conceptual problem-solving, advanced numericals, rotational mechanics & calculus.",
    subjects: [
      {
        id: "jee_phys",
        name: "Physics (JEE Advanced)",
        chapters: [
          {
            id: "jee-phys-rot",
            title: "Rotational Dynamics & Rigid Bodies",
            topics: [
              {
                id: "topic-jee-rot",
                title: "Pure Rolling & Angular Momentum Conservation",
                subtopics: ["Rolling Without Slipping", "Toppling vs Sliding", "Moment of Inertia Tensors", "Rigid Body Collisions"],
                difficulty: "Hard",
                hasVideo: true,
                estMinutes: 65
              }
            ]
          }
        ]
      },
      {
        id: "jee_chem",
        name: "Chemistry (Physical & Organic)",
        chapters: [
          {
            id: "jee-chem-thermo",
            title: "Thermodynamics & Electrochemistry",
            topics: [
              {
                id: "topic-jee-thermo",
                title: "Chemical Equilibrium & Nernst Applications",
                subtopics: ["Van 't Hoff Isotherm", "Cell Potential Temperature Coefficient", "Potentiometric Titrations"],
                difficulty: "Hard",
                hasVideo: true,
                estMinutes: 60
              }
            ]
          }
        ]
      },
      {
        id: "jee_math",
        name: "Mathematics (Advanced Calculus)",
        chapters: [
          {
            id: "jee-math-calc",
            title: "Definite Integrals & Differential Equations",
            topics: [
              {
                id: "topic-jee-leibnitz",
                title: "Leibnitz Rule & Reduction Formulas",
                subtopics: ["Newton-Leibnitz Theorem", "Wallis Formula", "Integration by Parts in Advanced JEE"],
                difficulty: "Hard",
                hasVideo: true,
                estMinutes: 65
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "neet",
    name: "Medical / NEET",
    badge: "Medical Entrance",
    tagline: "NCERT-Based Biology, Chemistry & Physics",
    color: "#059669",
    iconName: "Stethoscope",
    description: "100% NCERT line-by-line coverage, human physiology, genetics, and organic chemistry.",
    subjects: [
      {
        id: "bio_12",
        name: "Biology (Class 12 NCERT)",
        chapters: [
          {
            id: "bio12-ch7",
            title: "Evolution & Natural Selection",
            topics: [
              {
                id: "topic-bio-evolution",
                title: "Mechanism of Evolution: Natural Selection",
                subtopics: ["Darwinian Concepts", "Heritable Variations", "Reproductive Success", "Industrial Melanism", "Speciation"],
                difficulty: "Medium",
                hasVideo: true,
                estMinutes: 45
              },
              {
                id: "topic-bio-hardy",
                title: "Hardy-Weinberg Genetic Equilibrium",
                subtopics: ["Allele Frequencies", "Genetic Drift", "Founder Effect", "Disruptive Selection"],
                difficulty: "Hard",
                hasVideo: true,
                estMinutes: 50
              }
            ]
          },
          {
            id: "bio12-ch5",
            title: "Principles of Inheritance and Variation",
            topics: [
              {
                id: "topic-bio-mendel",
                title: "Mendelian Genetics & Gene Interaction",
                subtopics: ["Monohybrid Cross", "Dihybrid Cross", "Incomplete Dominance", "Codominance"],
                difficulty: "Medium",
                hasVideo: true,
                estMinutes: 40
              }
            ]
          }
        ]
      },
      {
        id: "chem_12",
        name: "Chemistry (Medical Foundation)",
        chapters: [
          {
            id: "chem12-ch3",
            title: "Electrochemistry & Equilibrium",
            topics: [
              {
                id: "topic-chem-nernst",
                title: "Galvanic Cells & The Nernst Equation",
                subtopics: ["Electrochemical Cells", "Standard Hydrogen Electrode", "Gibbs Energy & EMF"],
                difficulty: "Hard",
                hasVideo: true,
                estMinutes: 60
              }
            ]
          }
        ]
      },
      {
        id: "phys_12",
        name: "Physics (Medical Track)",
        chapters: [
          {
            id: "phys12-ch11",
            title: "Modern Physics & Dual Nature",
            topics: [
              {
                id: "topic-phys-photoelectric",
                title: "Einstein's Photoelectric Equation & Photons",
                subtopics: ["Threshold Frequency", "Stopping Potential", "Work Function", "de Broglie Wavelength"],
                difficulty: "Medium",
                hasVideo: true,
                estMinutes: 45
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "class_12",
    name: "Class - XII",
    badge: "Senior Secondary",
    tagline: "CBSE & State Board Standard",
    color: "#047857",
    iconName: "GraduationCap",
    description: "Complete Class 12 board syllabus, derivations, step-by-step marking schemes.",
    subjects: [
      {
        id: "bio_12",
        name: "Biology (Class 12 NCERT)",
        chapters: [
          {
            id: "bio12-ch7",
            title: "Chapter 7: Evolution & Natural Selection",
            topics: [
              {
                id: "topic-bio-evolution",
                title: "Mechanism of Evolution: Natural Selection",
                subtopics: ["Darwinian Concepts", "Heritable Variations", "Reproductive Success", "Industrial Melanism", "Speciation"],
                difficulty: "Medium",
                hasVideo: true,
                estMinutes: 45
              },
              {
                id: "topic-bio-hardy",
                title: "Hardy-Weinberg Genetic Equilibrium",
                subtopics: ["Allele Frequencies", "Genetic Drift", "Founder Effect", "Disruptive Selection"],
                difficulty: "Hard",
                hasVideo: true,
                estMinutes: 50
              }
            ]
          },
          {
            id: "bio12-ch5",
            title: "Chapter 5: Principles of Inheritance",
            topics: [
              {
                id: "topic-bio-mendel",
                title: "Mendelian Genetics & Crosses",
                subtopics: ["Monohybrid Cross", "Dihybrid Cross", "Incomplete Dominance", "Codominance"],
                difficulty: "Medium",
                hasVideo: true,
                estMinutes: 40
              }
            ]
          }
        ]
      },
      {
        id: "chem_12",
        name: "Chemistry (Class 12 NCERT)",
        chapters: [
          {
            id: "chem12-ch3",
            title: "Chapter 3: Electrochemistry",
            topics: [
              {
                id: "topic-chem-nernst",
                title: "Galvanic Cells & The Nernst Equation",
                subtopics: ["Electrochemical Cells", "Standard Hydrogen Electrode", "Concentration Cells", "EMF Calculations"],
                difficulty: "Hard",
                hasVideo: true,
                estMinutes: 60
              }
            ]
          }
        ]
      },
      {
        id: "phys_12",
        name: "Physics (Class 12 NCERT)",
        chapters: [
          {
            id: "phys12-ch11",
            title: "Chapter 11: Dual Nature of Radiation & Matter",
            topics: [
              {
                id: "topic-phys-photoelectric",
                title: "Einstein's Photoelectric Equation & Photons",
                subtopics: ["Threshold Frequency", "Stopping Potential", "Work Function", "de Broglie Wavelength"],
                difficulty: "Medium",
                hasVideo: true,
                estMinutes: 45
              }
            ]
          }
        ]
      },
      {
        id: "math_12",
        name: "Mathematics (Class 12 NCERT)",
        chapters: [
          {
            id: "math12-ch7",
            title: "Chapter 7: Integrals & Applications",
            topics: [
              {
                id: "topic-math-byparts",
                title: "Methods of Integration: Integration by Parts",
                subtopics: ["Product Rule in Integration", "ILATE Rule", "Definite Integrals Evaluation"],
                difficulty: "Hard",
                hasVideo: true,
                estMinutes: 55
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "class_11",
    name: "Class - XI",
    badge: "Higher Secondary",
    tagline: "Core Conceptual Foundations",
    color: "#10b981",
    iconName: "BookOpen",
    description: "Master foundational concepts: Kinematics, Cell Biology, Chemical Bonding & Trigonometry.",
    subjects: [
      {
        id: "phys_11",
        name: "Physics (Class 11 NCERT)",
        chapters: [
          {
            id: "phys11-ch3",
            title: "Motion in a Straight Line & Vectors",
            topics: [
              {
                id: "topic-phys11-kinematics",
                title: "Kinematic Equations & Relative Motion",
                subtopics: ["Uniform Acceleration", "v-t Graphs", "Relative Velocity in 1D", "Free Fall under Gravity"],
                difficulty: "Medium",
                hasVideo: true,
                estMinutes: 45
              }
            ]
          }
        ]
      },
      {
        id: "chem_11",
        name: "Chemistry (Class 11 NCERT)",
        chapters: [
          {
            id: "chem11-ch4",
            title: "Chemical Bonding & Molecular Structure",
            topics: [
              {
                id: "topic-chem11-bonding",
                title: "VSEPR Theory & Hybridization",
                subtopics: ["Valence Bond Theory", "sp, sp², sp³ Hybridization", "Dipole Moments", "Molecular Geometry"],
                difficulty: "Hard",
                hasVideo: true,
                estMinutes: 50
              }
            ]
          }
        ]
      },
      {
        id: "bio_11",
        name: "Biology (Class 11 NCERT)",
        chapters: [
          {
            id: "bio11-ch8",
            title: "Cell: The Unit of Life",
            topics: [
              {
                id: "topic-bio11-cell",
                title: "Prokaryotic vs Eukaryotic Cell Ultrastructure",
                subtopics: ["Cell Membrane Fluid Mosaic Model", "Endomembrane System", "Mitochondria & Chloroplasts"],
                difficulty: "Easy",
                hasVideo: true,
                estMinutes: 40
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "class_10",
    name: "Class - 10",
    badge: "Secondary Board",
    tagline: "Class 10 Board Excellence",
    color: "#059669",
    iconName: "Award",
    description: "Score 95%+ in CBSE Class 10 Science and Mathematics with NCERT exemplars.",
    subjects: [
      {
        id: "sci_10",
        name: "Science (Class 10 NCERT)",
        chapters: [
          {
            id: "sci10-ch6",
            title: "Chapter 6: Life Processes",
            topics: [
              {
                id: "topic-sci10-transport",
                title: "Transportation & Osmotic Regulation",
                subtopics: ["Xylem and Phloem Translocation", "Human Circulatory System", "Osmosis and Dialysis"],
                difficulty: "Easy",
                hasVideo: true,
                estMinutes: 35
              }
            ]
          }
        ]
      },
      {
        id: "math_10",
        name: "Mathematics (Class 10 NCERT)",
        chapters: [
          {
            id: "math10-ch4",
            title: "Chapter 4: Quadratic Equations",
            topics: [
              {
                id: "topic-math10-roots",
                title: "Discriminant & Nature of Roots",
                subtopics: ["Discriminant b² - 4ac", "Real & Distinct Roots", "Word Problems on Speed & Work"],
                difficulty: "Medium",
                hasVideo: true,
                estMinutes: 40
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "class_9",
    name: "Class - 9",
    badge: "Secondary Foundation",
    tagline: "High School Bridge",
    color: "#047857",
    iconName: "Layers",
    description: "Build strong scientific and mathematical reasoning for senior secondary success.",
    subjects: [
      {
        id: "sci_9",
        name: "Science (Class 9 NCERT)",
        chapters: [
          {
            id: "sci9-ch5",
            title: "Chapter 5: Fundamental Unit of Life",
            topics: [
              {
                id: "topic-sci9-cells",
                title: "Cell Organelles & Osmosis Mechanisms",
                subtopics: ["Nucleus & Chromosomes", "Hypotonic vs Hypertonic Solutions", "Endoplasmic Reticulum"],
                difficulty: "Easy",
                hasVideo: true,
                estMinutes: 30
              }
            ]
          }
        ]
      },
      {
        id: "math_9",
        name: "Mathematics (Class 9 NCERT)",
        chapters: [
          {
            id: "math9-ch1",
            title: "Chapter 1: Number Systems",
            topics: [
              {
                id: "topic-math9-numbers",
                title: "Irrational Numbers & Real Number Line",
                subtopics: ["Rationalization of Denominators", "Laws of Exponents for Real Numbers", "Decimal Expansions"],
                difficulty: "Easy",
                hasVideo: true,
                estMinutes: 35
              }
            ]
          }
        ]
      }
    ]
  }
];

// Helper to get category by ID
export function getStudentCategoryById(catId) {
  return STUDENT_CATEGORIES.find(c => c.id === catId) || STUDENT_CATEGORIES[0];
}

// Helper to get all subjects for a category
export function getSubjectsForCategory(catId) {
  const cat = getStudentCategoryById(catId);
  return cat ? cat.subjects : [];
}

// Helper to get notes for a topic
export function getTopicNotes(topicId) {
  return SMART_NOTES_COLLECTION[topicId] || null;
}

// Helper to get video data for a topic
export function getTopicVideo(topicId) {
  return TOPIC_VIDEOS_COLLECTION[topicId] || null;
}

// Helper to get questions for topic, difficulty, or length
export function getQuestionsForDrill({ categoryId, subjectId, topicId, subtopic, lengthType, count = 10 }) {
  let pool = [...EXPANDED_QUESTIONS_BANK];

  if (subjectId) {
    pool = pool.filter(q => q.subjectId === subjectId);
  }

  if (topicId) {
    pool = pool.filter(q => q.topicId === topicId);
  }

  // Filter or map by question length / difficulty
  // Short = quick MCQs, 1-2 marks
  // Medium = Assertion-reason, numericals, 2-3 marks
  // Long = Comprehensive, derivations, 4-5 marks
  if (lengthType === "short") {
    pool = pool.filter(q => q.marks <= 2 || q.type === "mcq");
  } else if (lengthType === "medium") {
    pool = pool.filter(q => q.marks === 3 || q.marks === 4 || q.type === "assertion_reason" || q.type === "numerical");
  } else if (lengthType === "long") {
    pool = pool.filter(q => q.marks >= 4 || q.type === "multiple_select" || q.type === "case_based");
  }

  // If pool has fewer than requested, fallback to wider pool
  if (pool.length === 0) {
    pool = [...EXPANDED_QUESTIONS_BANK];
    if (subjectId) pool = pool.filter(q => q.subjectId === subjectId);
    if (pool.length === 0) pool = [...EXPANDED_QUESTIONS_BANK];
  }

  return pool.slice(0, count);
}
