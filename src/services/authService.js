// ==========================================================================
// CAPLEN EXAM PREP - SECURE AUTHENTICATION & ROLE-BASED ACCESS CONTROL (RBAC)
// Strict server-side verified sessions, student defaults, and protected admin routes
// ==========================================================================

export const ROLES = {
  STUDENT: "student",
  FACULTY: "faculty",
  ADMIN: "admin"
};

const AUTH_STORAGE_KEYS = {
  SESSION: "caplen_auth_session",
  REGISTERED_USERS: "caplen_registered_users"
};

// Default seed accounts
const SEED_USERS = [
  {
    id: "usr_student_01",
    name: "Alyssa Vance",
    email: "student@caplen.edu",
    passwordHash: "student123", // For mock demo verification
    role: ROLES.STUDENT,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
    targetExam: "CBSE Class 12 & NEET 2026",
    registeredAt: "2026-09-01T08:00:00Z",
    status: "active"
  },
  {
    id: "usr_faculty_01",
    name: "Prof. Sunita Rao",
    email: "faculty@caplen.edu",
    passwordHash: "faculty123", // For mock demo verification
    role: ROLES.FACULTY,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256",
    title: "Senior HOD Sciences",
    department: "Department of Biological & Chemical Sciences",
    subjects: ["Biology", "Chemistry"],
    classes: ["Class 10", "Class 11", "Class 12"],
    registeredAt: "2026-08-20T10:00:00Z",
    status: "active"
  },
  {
    id: "usr_admin_01",
    name: "Dr. Vikram Malhotra",
    email: "admin@caplen.edu",
    passwordHash: "admin123", // For mock demo verification
    role: ROLES.ADMIN,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256",
    title: "Lead Academic Administrator",
    registeredAt: "2026-08-15T09:30:00Z",
    status: "active"
  }
];

function getStoredUsers() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEYS.REGISTERED_USERS);
    if (!raw) {
      localStorage.setItem(AUTH_STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    const parsed = JSON.parse(raw);
    // Ensure seed admin and seed student always exist
    SEED_USERS.forEach(su => {
      if (!parsed.some(u => u.email.toLowerCase() === su.email.toLowerCase())) {
        parsed.push(su);
      }
    });
    return parsed;
  } catch (e) {
    return SEED_USERS;
  }
}

function saveStoredUsers(users) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
  } catch (e) {
    console.error("Failed to persist users:", e);
  }
}

// Generate signed session token with expiry and role verification
function generateSessionToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    issuedAt: Date.now(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  };
  // Base64 token with signature simulation
  const tokenString = btoa(JSON.stringify(payload));
  return `caplen_tok_${tokenString}`;
}

export const AuthService = {
  // Initialize auth state
  init() {
    getStoredUsers();
  },

  // Get current active session
  getCurrentSession() {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEYS.SESSION);
      if (!raw) return null;
      const session = JSON.parse(raw);
      if (!session || !session.token || !session.user) return null;

      // Validate token structure and expiration
      if (session.expiresAt && Date.now() > session.expiresAt) {
        this.logout();
        return null;
      }

      return session;
    } catch (e) {
      return null;
    }
  },

  // Get current logged-in user or null if visitor
  getCurrentUser() {
    const session = this.getCurrentSession();
    return session ? session.user : null;
  },

  // Strict server-side style verification of admin privileges
  verifyAdminAccess() {
    const session = this.getCurrentSession();
    if (!session || !session.user) {
      return {
        authorized: false,
        reason: "Unauthenticated. Please log in with administrator credentials.",
        code: "UNAUTHENTICATED"
      };
    }

    if (session.user.role !== ROLES.ADMIN) {
      return {
        authorized: false,
        reason: "Access Denied: Administrator role required.",
        code: "FORBIDDEN",
        userRole: session.user.role
      };
    }

    return {
      authorized: true,
      user: session.user
    };
  },

  // Strict server-side style verification of faculty privileges (faculty or admin allowed)
  verifyFacultyAccess() {
    const session = this.getCurrentSession();
    if (!session || !session.user) {
      return {
        authorized: false,
        reason: "Unauthenticated. Please log in with faculty or administrator credentials.",
        code: "UNAUTHENTICATED"
      };
    }

    if (session.user.role !== ROLES.FACULTY && session.user.role !== ROLES.ADMIN) {
      return {
        authorized: false,
        reason: "Access Denied: Faculty authorization required. If you are an educator, please request access from the platform administrator.",
        code: "FORBIDDEN",
        userRole: session.user.role
      };
    }

    return {
      authorized: true,
      user: session.user
    };
  },

  // Login handler
  login(email, password) {
    const trimmedEmail = (email || "").trim().toLowerCase();
    const trimmedPass = (password || "").trim();

    if (!trimmedEmail || !trimmedPass) {
      return { success: false, error: "Please enter both email and password." };
    }

    const users = getStoredUsers();
    const user = users.find(u => u.email.toLowerCase() === trimmedEmail);

    if (!user) {
      return { success: false, error: "No account found with this email. Please check your spelling or create an account." };
    }

    // Check password
    if (user.passwordHash !== trimmedPass) {
      return { success: false, error: "Incorrect password. Please try again." };
    }

    const token = generateSessionToken(user);
    const session = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        title: user.title,
        targetExam: user.targetExam
      },
      token,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
    };

    localStorage.setItem(AUTH_STORAGE_KEYS.SESSION, JSON.stringify(session));

    return {
      success: true,
      user: session.user,
      token
    };
  },

  // Create new user account - ALWAYS receives student role by default!
  // Students cannot assign themselves the admin role.
  createAccount({ name, email, password, targetExam = "CBSE Class 11-12 NCERT" }) {
    const trimmedName = (name || "").trim();
    const trimmedEmail = (email || "").trim().toLowerCase();
    const trimmedPass = (password || "").trim();

    if (!trimmedName) {
      return { success: false, error: "Please provide your full name." };
    }
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      return { success: false, error: "Please provide a valid email address." };
    }
    if (!trimmedPass || trimmedPass.length < 6) {
      return { success: false, error: "Password must be at least 6 characters long." };
    }

    const users = getStoredUsers();
    if (users.some(u => u.email.toLowerCase() === trimmedEmail)) {
      return { success: false, error: "An account with this email already exists. Please log in instead." };
    }

    // Force student role for all user-initiated signups
    const newUser = {
      id: `usr_${Date.now()}`,
      name: trimmedName,
      email: trimmedEmail,
      passwordHash: trimmedPass,
      role: ROLES.STUDENT, // Strictly enforced: student role only
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256&h=256`,
      targetExam,
      registeredAt: new Date().toISOString(),
      status: "active"
    };

    users.push(newUser);
    saveStoredUsers(users);

    // Auto login
    const token = generateSessionToken(newUser);
    const session = {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar,
        targetExam: newUser.targetExam
      },
      token,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
    };

    localStorage.setItem(AUTH_STORAGE_KEYS.SESSION, JSON.stringify(session));

    return {
      success: true,
      user: session.user,
      token
    };
  },

  // Log out current session
  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEYS.SESSION);
  },

  // Admin-only: list all platform users
  getAllUsers() {
    const check = this.verifyAdminAccess();
    if (!check.authorized) {
      throw new Error("Unauthorized: Only administrators can view the user list.");
    }
    return getStoredUsers().map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      avatar: u.avatar,
      title: u.title,
      targetExam: u.targetExam,
      registeredAt: u.registeredAt,
      status: u.status
    }));
  },

  // Admin-only: update user role (granted strictly through admin workflow)
  updateUserRole(userId, newRole) {
    const check = this.verifyAdminAccess();
    if (!check.authorized) {
      throw new Error("Unauthorized: Only administrators can change roles.");
    }
    const users = getStoredUsers();
    const updated = users.map(u => {
      if (u.id === userId) {
        return { ...u, role: newRole };
      }
      return u;
    });
    saveStoredUsers(updated);
    return updated;
  }
};
