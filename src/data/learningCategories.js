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

// Helper to get questions strictly filtered for the selected learning path / class
export function getQuestionsForDrill({ categoryId, subjectId, topicId, subtopic, lengthType, count = 10 }) {
  let pool = [...EXPANDED_QUESTIONS_BANK];

  // 1. Strict Category Scoping (never mix unrelated classes/exams)
  if (categoryId) {
    const cat = getStudentCategoryById(categoryId);
    const validSubjectIds = cat ? cat.subjects.map((s) => s.id) : [];
    const scoped = pool.filter(
      (q) =>
        validSubjectIds.includes(q.subjectId) ||
        q.categoryId === categoryId ||
        q.examId === categoryId
    );
    // If questions exist in this category, enforce category boundary
    if (scoped.length > 0) {
      pool = scoped;
    }
  }

  // 2. Subject Filtering
  if (subjectId) {
    const subjectPool = pool.filter((q) => q.subjectId === subjectId);
    if (subjectPool.length > 0) {
      pool = subjectPool;
    }
  }

  // 3. Topic Filtering
  if (topicId) {
    const topicPool = pool.filter((q) => q.topicId === topicId);
    if (topicPool.length > 0) {
      pool = topicPool;
    }
  }

  // 4. Format / Difficulty Filtering
  if (lengthType === "short") {
    const filtered = pool.filter((q) => q.marks <= 2 || q.type === "mcq" || q.type === "true_false");
    if (filtered.length > 0) pool = filtered;
  } else if (lengthType === "medium") {
    const filtered = pool.filter(
      (q) => q.marks === 3 || q.marks === 4 || q.type === "assertion_reason" || q.type === "numerical"
    );
    if (filtered.length > 0) pool = filtered;
  } else if (lengthType === "long") {
    const filtered = pool.filter(
      (q) => q.marks >= 4 || q.type === "multiple_select" || q.type === "case_based"
    );
    if (filtered.length > 0) pool = filtered;
  }

  return pool.slice(0, count);
}

// ==========================================================================
// DEDICATED EXAM TRACKS & URL ROUTING REGISTRY
// Provides separate clean URLs: /jee, /neet, /class-12, /class-11, /class-10, /class-9, /ugc-net
// ==========================================================================
export const EXAM_TRACKS = [
  {
    id: "jee",
    slug: "/jee",
    aliases: ["/iit", "/iit-jee", "/jee-advanced", "/jee-main"],
    categoryId: "iit",
    name: "IIT-JEE (Main & Advanced)",
    shortName: "IIT / JEE",
    badge: "Engineering",
    tagline: "Rotational Dynamics, Nernst Applications & Advanced Calculus",
    color: "#07865B",
    iconName: "Compass",
    subjectsCount: 3,
    description: "Deep conceptual problem-solving, advanced numericals, rotational mechanics & calculus.",
    defaultRecent: [
      {
        id: "topic-jee-rot",
        title: "Rotational Dynamics & Rigid Bodies",
        subject: "Physics (JEE Advanced)",
        grade: "JEE Advanced",
        iconType: "physics",
        categoryId: "iit",
        subjectId: "jee_phys"
      },
      {
        id: "topic-jee-thermo",
        title: "Thermodynamics & Electrochemistry",
        subject: "Chemistry (Physical)",
        grade: "JEE Main",
        iconType: "chemistry",
        categoryId: "iit",
        subjectId: "jee_chem"
      }
    ]
  },
  {
    id: "neet",
    slug: "/neet",
    aliases: ["/medical", "/neet-ug"],
    categoryId: "neet",
    name: "Medical / NEET (UG)",
    shortName: "Medical / NEET",
    badge: "Medical Entrance",
    tagline: "100% NCERT Biology, Organic Chemistry & Physics",
    color: "#059669",
    iconName: "Stethoscope",
    subjectsCount: 3,
    description: "100% NCERT line-by-line coverage, human physiology, genetics, and organic chemistry.",
    defaultRecent: [
      {
        id: "topic-bio-evolution",
        title: "Evolution & Natural Selection",
        subject: "Biology (NCERT)",
        grade: "NEET 2026",
        iconType: "biology",
        categoryId: "neet",
        subjectId: "bio_12"
      },
      {
        id: "topic-chem-nernst",
        title: "Galvanic Cells & The Nernst Equation",
        subject: "Chemistry (Medical)",
        grade: "Pre-Med",
        iconType: "chemistry",
        categoryId: "neet",
        subjectId: "chem_12"
      }
    ]
  },
  {
    id: "class_12",
    slug: "/class-12",
    aliases: ["/class12", "/class-xii", "/xii", "/cbse-12", "/class11_12"],
    categoryId: "class_12",
    name: "Class 12 (CBSE & Boards)",
    shortName: "Class 12",
    badge: "Senior Secondary",
    tagline: "Complete Class 12 NCERT, Board PYQs & Worked Derivations",
    color: "#047857",
    iconName: "GraduationCap",
    subjectsCount: 4,
    description: "Complete Class 12 board syllabus, derivations, step-by-step marking schemes.",
    defaultRecent: [
      {
        id: "topic-bio-evolution-12",
        title: "Mechanism of Evolution: Natural Selection",
        subject: "Biology (Class 12 NCERT)",
        grade: "Class 12",
        iconType: "biology",
        categoryId: "class_12",
        subjectId: "bio_12"
      },
      {
        id: "topic-phys-photoelectric-12",
        title: "Modern Physics & Dual Nature of Radiation",
        subject: "Physics",
        grade: "Class 12",
        iconType: "physics",
        categoryId: "class_12",
        subjectId: "phys_12"
      }
    ]
  },
  {
    id: "class_11",
    slug: "/class-11",
    aliases: ["/class11", "/class-xi", "/xi", "/cbse-11"],
    categoryId: "class_11",
    name: "Class 11 (NCERT & Boards)",
    shortName: "Class 11",
    badge: "Higher Secondary",
    tagline: "Foundational Mechanics, Chemical Bonding & Cell Structure",
    color: "#059669",
    iconName: "Layers",
    subjectsCount: 4,
    description: "Build an unshakable conceptual base in Class 11 mechanics, chemical bonding, and cell biology.",
    defaultRecent: [
      {
        id: "topic-phys-laws",
        title: "Laws of Motion & Friction Dynamics",
        subject: "Physics (Class 11)",
        grade: "Class 11",
        iconType: "physics",
        categoryId: "class_11",
        subjectId: "phys_11"
      },
      {
        id: "topic-chem-bonding",
        title: "Chemical Bonding & Molecular Geometry",
        subject: "Chemistry",
        grade: "Class 11",
        iconType: "chemistry",
        categoryId: "class_11",
        subjectId: "chem_11"
      }
    ]
  },
  {
    id: "class_10",
    slug: "/class-10",
    aliases: ["/class10", "/class-x", "/x", "/class9_10", "/cbse-10"],
    categoryId: "class_10",
    name: "Class 10 (Board Foundations)",
    shortName: "Class 10",
    badge: "Secondary Board",
    tagline: "CBSE Class 10 Science & Mathematics with Exemplar Solutions",
    color: "#07865B",
    iconName: "BookOpen",
    subjectsCount: 2,
    description: "Strong conceptual foundations, NCERT exemplars, and board preparation.",
    defaultRecent: [
      {
        id: "topic-sci10-light",
        title: "Light: Reflection & Refraction Laws",
        subject: "Science (Class 10)",
        grade: "Class 10",
        iconType: "physics",
        categoryId: "class_10",
        subjectId: "sci_10"
      },
      {
        id: "topic-math10-quad",
        title: "Quadratic Equations & Polynomial Roots",
        subject: "Mathematics",
        grade: "Class 10",
        iconType: "math",
        categoryId: "class_10",
        subjectId: "math_10"
      }
    ]
  },
  {
    id: "class_9",
    slug: "/class-9",
    aliases: ["/class9", "/class-ix", "/ix", "/cbse-9"],
    categoryId: "class_9",
    name: "Class 9 (Foundations)",
    shortName: "Class 9",
    badge: "Secondary Foundation",
    tagline: "Fundamental Science, Motion, Structure of the Atom & Math",
    color: "#10b981",
    iconName: "BookOpen",
    subjectsCount: 2,
    description: "Master foundational concepts in physics, chemistry, and biology to prepare for higher grades.",
    defaultRecent: [
      {
        id: "topic-sci9-motion",
        title: "Motion & Equations of Uniform Acceleration",
        subject: "Science (Class 9)",
        grade: "Class 9",
        iconType: "physics",
        categoryId: "class_9",
        subjectId: "sci_9"
      },
      {
        id: "topic-sci9-atom",
        title: "Structure of the Atom & Chemical Formulas",
        subject: "Science (Class 9)",
        grade: "Class 9",
        iconType: "chemistry",
        categoryId: "class_9",
        subjectId: "chem_9"
      }
    ]
  },
  {
    id: "ugc_net",
    slug: "/ugc-net",
    aliases: ["/net", "/ugc"],
    categoryId: "iit",
    name: "UGC-NET (Paper 1 & Paper 2)",
    shortName: "UGC-NET",
    badge: "Lectureship & JRF",
    tagline: "Teaching Aptitude, Research Methodology & Higher Education",
    color: "#075B43",
    iconName: "Award",
    subjectsCount: 2,
    description: "Teaching aptitude, research methodology, higher education, and subject mastery.",
    defaultRecent: [
      {
        id: "topic-net-research",
        title: "Research Methodology & Aptitude",
        subject: "Paper 1 (General)",
        grade: "UGC-NET",
        iconType: "general",
        categoryId: "iit",
        subjectId: "net_paper1"
      },
      {
        id: "topic-net-teaching",
        title: "Higher Education System & Governance",
        subject: "Paper 1",
        grade: "UGC-NET",
        iconType: "general",
        categoryId: "iit",
        subjectId: "net_paper1"
      }
    ]
  }
];

export function findTrackByPath(pathname) {
  if (!pathname) return null;
  const clean = pathname.toLowerCase().split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  for (const track of EXAM_TRACKS) {
    if (clean === track.slug || clean.startsWith(track.slug + "/")) {
      return track;
    }
    for (const alias of track.aliases) {
      if (clean === alias || clean.startsWith(alias + "/")) {
        return track;
      }
    }
  }
  return null;
}

export function getTrackById(trackId) {
  return EXAM_TRACKS.find(t =>
    t.id === trackId ||
    t.slug === trackId ||
    t.categoryId === trackId ||
    t.aliases?.includes(trackId)
  ) || EXAM_TRACKS[0];
}

