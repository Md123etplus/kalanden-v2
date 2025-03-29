// Service pour communiquer avec l'API Gateway et les microservices

// URL de base de l'API Gateway
const API_BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL

// Vérifier si l'API Gateway est disponible
const isApiGatewayAvailable = !!API_BASE_URL

// Fonction générique pour les requêtes API
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  console.log(`Tentative d'appel API à: ${endpoint}`)
  console.log(`API Gateway disponible: ${isApiGatewayAvailable ? "Oui" : "Non"}`)
  console.log(`Mode: ${isApiGatewayAvailable ? "Production avec API réelle" : "Développement avec données statiques"}`)

  // Si l'API Gateway n'est pas disponible, utiliser les données statiques
  if (!isApiGatewayAvailable) {
    return mockFetchAPI(endpoint, options)
  }

  const url = `${API_BASE_URL}${endpoint}`

  // Ajouter les en-têtes par défaut
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  }

  // Ajouter le token d'authentification si disponible
  const session = typeof localStorage !== "undefined" ? localStorage.getItem("supabase.auth.token") : null
  if (session) {
    try {
      const parsedSession = JSON.parse(session)
      const token = parsedSession?.access_token
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du token:", error)
    }
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    // Vérifier si la réponse est OK
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status} ${response.statusText}`)
    }

    // Analyser la réponse JSON
    const data = await response.json()
    return { data, error: null }
  } catch (error) {
    console.error("Erreur lors de la requête API:", error)
    console.error("Erreur détaillée:", error)

    // En cas d'erreur de connexion, basculer vers les données statiques
    if (error instanceof TypeError && error.message.includes("fetch")) {
      console.warn("Connexion à l'API impossible, utilisation des données statiques")
      return mockFetchAPI(endpoint, options)
    }

    return { data: null, error }
  }
}

// Fonction pour simuler une requête API avec des données statiques
async function mockFetchAPI(endpoint: string, options: RequestInit = {}) {
  console.log(`Mode développement: Simulation d'appel API à ${endpoint}`)

  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Extraire le type de ressource et l'ID de l'endpoint
  const parts = endpoint.split("/").filter(Boolean)
  const resourceType = parts[0]
  const resourceId = parts[1]
  const action = parts[2]

  // Simuler différentes réponses en fonction de l'endpoint et de la méthode
  switch (resourceType) {
    case "cours":
      return handleCoursMockResponse(endpoint, resourceId, action, options)
    
    case "abonnements":
      return handleAbonnementsMockResponse(resourceId, action, options)
    
    case "utilisateurs":
      return handleUtilisateursMockResponse(resourceId, action, options)
    
    case "transactions":
      return handleTransactionsMockResponse(resourceId, action, options)
    
    case "statistiques":
      return handleStatistiquesMockResponse(resourceId, action, options)
    
    default:
      return { data: null, error: { message: "Ressource non trouvée" } }
  }
}

// Données statiques pour le mode développement
const staticData = {
  cours: [
    {
      id: 1,
      titre: "Mathématiques fondamentales",
      instructor: "Prof. Marie Dupont",
      level: "Débutant",
      rating: 4.8,
      students: 1245,
      price: 49.99,
      image: "/placeholder.svg?height=200&width=300",
      created_at: "2023-01-15T00:00:00Z",
      description: "Apprenez les bases des mathématiques avec des exercices pratiques et des explications claires.",
    },
    {
      id: 2,
      titre: "Français avancé et littérature",
      instructor: "Dr. Jean Martin",
      level: "Intermédiaire",
      rating: 4.6,
      students: 987,
      price: 59.99,
      image: "/placeholder.svg?height=200&width=300",
      created_at: "2023-02-20T00:00:00Z",
      description: "Perfectionnez votre français et découvrez les grands classiques de la littérature française.",
    },
    {
      id: 3,
      titre: "Préparation aux concours administratifs",
      instructor: "Mme. Sophie Leclerc",
      level: "Avancé",
      rating: 4.9,
      students: 2341,
      price: 79.99,
      image: "/placeholder.svg?height=200&width=300",
      created_at: "2023-03-10T00:00:00Z",
      description:
        "Préparez-vous efficacement aux concours de la fonction publique avec des exercices et des simulations d'examens.",
    },
    {
      id: 4,
      titre: "Sciences physiques pour débutants",
      instructor: "Dr. Thomas Blanc",
      level: "Débutant",
      rating: 4.7,
      students: 856,
      price: 39.99,
      image: "/placeholder.svg?height=200&width=300",
      created_at: "2023-04-05T00:00:00Z",
      description:
        "Découvrez les principes fondamentaux de la physique à travers des expériences simples et des explications accessibles.",
    },
    {
      id: 5,
      titre: "Histoire de l'art contemporain",
      instructor: "Prof. Claire Dubois",
      level: "Intermédiaire",
      rating: 4.5,
      students: 723,
      price: 69.99,
      image: "/placeholder.svg?height=200&width=300",
      created_at: "2023-05-12T00:00:00Z",
      description:
        "Explorez les mouvements artistiques du XXe siècle et comprenez leur impact sur la société contemporaine.",
    },
    {
      id: 6,
      titre: "Programmation avancée en Python",
      instructor: "M. Lucas Petit",
      level: "Avancé",
      rating: 4.9,
      students: 1876,
      price: 89.99,
      image: "/placeholder.svg?height=200&width=300",
      created_at: "2023-06-18T00:00:00Z",
      description: "Maîtrisez les concepts avancés de Python et développez des applications professionnelles.",
    },
  ],
  abonnements: [
    {
      id: 1,
      nom: "Accès Gratuit",
      price: 0,
      features: ["Accès limité aux cours gratuits", "Consultation des ressources publiques", "Zone de vérification"],
      type: "Free",
      badge_text: "Freemium",
      is_popular: false
    },
    {
      id: 2,
      nom: "Premium Étudiant",
      price: 10,
      features: [
        "Accès illimité aux cours payants",
        "Évaluations et certifications",
        "Suivi de la progression",
        "Contenu téléchargeable",
      ],
      type: "Premium",
      badge_text: "Individuel",
      is_popular: true
    },
    {
      id: 3,
      nom: "Pack Famille",
      price: 15,
      features: ["Jusqu'à 3 enfants", "Tableau de bord parental", "Suivi des progrès de l'enfant", "Contrôle parental"],
      type: "Famille",
      badge_text: "Parent-Enfant",
      is_popular: false
    },
    {
      id: 4,
      nom: "Accès Privé",
      price: null,
      features: [
        "Licences en lot",
        "Tableau de bord administrateur",
        "Contenu personnalisé",
        "Support technique dédié",
      ],
      type: "Entreprise",
      badge_text: "Entreprise",
      is_popular: false
    },
  ],
  utilisateurs: [
    {
      id: "user-1",
      email: "user@example.com",
      full_name: "Utilisateur Test",
      role: "student",
      created_at: "2023-01-01T00:00:00Z",
      courses: [1, 3],
    },
  ],
  transactions: [
    {
      id: "#8742",
      user: "Martin Dubois",
      email: "martin.dubois@example.com",
      subscription: "Premium Étudiant",
      amount: "10.00",
      date: "2023-05-15T00:00:00Z",
      status: "success",
      paymentMethod: "Visa ****4242",
      montant_plateforme: "3.00",
      montant_client: "7.00"
    },
    {
      id: "#8741",
      user: "Sophie Martin",
      email: "sophie.martin@example.com",
      subscription: "Pack Famille",
      amount: "15.00",
      date: "2023-05-14T00:00:00Z",
      status: "success",
      paymentMethod: "Mastercard ****5678",
      montant_plateforme: "4.50",
      montant_client: "10.50"
    },
    {
      id: "#8740",
      user: "Lycée Jean Moulin",
      email: "admin@lycee-jeanmoulin.fr",
      subscription: "Accès Privé",
      amount: "750.00",
      date: "2023-05-12T00:00:00Z",
      status: "success",
      paymentMethod: "Virement bancaire",
      montant_plateforme: "225.00",
      montant_client: "525.00"
    },
    {
      id: "#8739",
      user: "Thomas Bernard",
      email: "thomas.bernard@example.com",
      subscription: "Premium Étudiant",
      amount: "10.00",
      date: "2023-05-10T00:00:00Z",
      status: "failed",
      paymentMethod: "Visa ****1234",
      montant_plateforme: "3.00",
      montant_client: "7.00"
    },
  ],
  statistiques: {
    revenus: {
      total: "3340.00",
      plateforme: "1002.00",
      clients: "2338.00",
      croissance: "+12.5%",
      par_abonnement: {
        "Premium Étudiant": {
          count: 78,
          price: "10.00",
          total: "780.00",
          plateforme: "234.00",
          clients: "546.00",
        },
        "Pack Famille": {
          count: 36,
          price: "15.00",
          total: "540.00",
          plateforme: "162.00",
          clients: "378.00",
        },
        "Accès Privé": {
          count: 5,
          price: "Sur mesure",
          total: "2020.00",
          plateforme: "606.00",
          clients: "1414.00",
        },
      },
      tendance_mensuelle: [
        { mois: "Jan", total: "2800.00", plateforme: "840.00", clients: "1960.00" },
        { mois: "Fév", total: "2950.00", plateforme: "885.00", clients: "2065.00" },
        { mois: "Mar", total: "3100.00", plateforme: "930.00", clients: "2170.00" },
        { mois: "Avr", total: "3200.00", plateforme: "960.00", clients: "2240.00" },
        { mois: "Mai", total: "3340.00", plateforme: "1002.00", clients: "2338.00" },
      ],
    },
    utilisateurs: {
      total: 156,
      actifs: 132,
      nouveaux: 24,
      par_role: {
        student: 120,
        parent: 30,
        teacher: 5,
        admin: 1,
      },
    },
    cours: {
      total: 24,
      actifs: 20,
      brouillons: 3,
      archives: 1,
      plus_populaires: [
        {
          id: 3,
          titre: "Préparation aux concours administratifs",
          students: 2341,
          rating: 4.9,
        },
        {
          id: 6,
          titre: "Programmation avancée en Python",
          students: 1876,
          rating: 4.9,
        },
        {
          id: 1,
          titre: "Mathématiques fondamentales",
          students: 1245,
          rating: 4.8,
        },
      ],
    },
  },
}

// Gestionnaires de réponses simulées pour chaque type de ressource
function handleCoursMockResponse(endpoint: string, resourceId: string | undefined, action: string | undefined, options: RequestInit) {
  if (resourceId) {
    if (action === "enroll" && options.method === "POST") {
      return { data: { success: true, message: "Inscription au cours réussie" }, error: null }
    }

    const course = staticData.cours.find((c) => c.id === Number.parseInt(resourceId))
    return course ? { data: course, error: null } : { data: null, error: { message: "Cours non trouvé" } }
  }

  if (endpoint.includes("search")) {
    const query = new URL(`http://example.com${endpoint}`).searchParams.get("q") || ""
    const filteredCourses = staticData.cours.filter(
      (course) =>
        course.titre.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase()),
    )
    return { data: filteredCourses, error: null }
  }

  return { data: staticData.cours, error: null }
}

function handleAbonnementsMockResponse(resourceId: string | undefined, action: string | undefined, options: RequestInit) {
  if (resourceId) {
    if (action === "subscribe" && options.method === "POST") {
      return { data: { success: true, message: "Abonnement réussi" }, error: null }
    }

    const subscription = staticData.abonnements.find((s) => s.id === Number.parseInt(resourceId))
    return subscription
      ? { data: subscription, error: null }
      : { data: null, error: { message: "Abonnement non trouvé" } }
  }

  return { data: staticData.abonnements, error: null }
}

function handleUtilisateursMockResponse(resourceId: string | undefined, action: string | undefined, options: RequestInit) {
  if (resourceId) {
    const user = staticData.utilisateurs.find((u) => u.id === resourceId)

    if (!user) {
      return { data: null, error: { message: "Utilisateur non trouvé" } }
    }

    if (action === "cours") {
      const userCourses = staticData.cours.filter((course) => user.courses.includes(course.id))
      return { data: userCourses, error: null }
    }

    if (options.method === "PUT") {
      return { data: { ...user, ...JSON.parse(options.body as string) }, error: null }
    }

    return { data: user, error: null }
  }

  return { data: staticData.utilisateurs, error: null }
}

function handleTransactionsMockResponse(resourceId: string | undefined, action: string | undefined, options: RequestInit) {
  if (resourceId) {
    const transaction = staticData.transactions.find((t) => t.id === resourceId)
    return transaction
      ? { data: transaction, error: null }
      : { data: null, error: { message: "Transaction non trouvée" } }
  }

  return { data: staticData.transactions, error: null }
}

function handleStatistiquesMockResponse(resourceId: string | undefined, action: string | undefined, options: RequestInit) {
  if (resourceId === "revenus") {
    return { data: staticData.statistiques.revenus, error: null }
  }

  if (resourceId === "utilisateurs") {
    return { data: staticData.statistiques.utilisateurs, error: null }
  }

  if (resourceId === "cours") {
    return { data: staticData.statistiques.cours, error: null }
  }

  return { data: staticData.statistiques, error: null }
}

// Services pour les cours
export const coursService = {
  // Récupérer tous les cours
  getAllCourses: async (filters = {}) => {
    // Construire les paramètres de requête à partir des filtres
    const queryParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value))
      }
    })

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ""
    return fetchAPI(`/cours${queryString}`)
  },

  // Rechercher des cours
  searchCourses: async (searchTerm: string) => {
    return fetchAPI(`/cours/search?q=${encodeURIComponent(searchTerm)}`)
  },

  // Récupérer un cours par son ID
  getCourseById: async (id: string) => {
    return fetchAPI(`/cours/${id}`)
  },

  // S'inscrire à un cours
  enrollCourse: async (courseId: string, userId: string) => {
    return fetchAPI(`/cours/${courseId}/enroll`, {
      method: "POST",
      body: JSON.stringify({ userId }),
    })
  },
}

// Services pour les abonnements
export const subscriptionService = {
  // Récupérer tous les abonnements
  getAllSubscriptions: async () => {
    return fetchAPI("/abonnements")
  },

  // S'abonner à un forfait
  subscribe: async (subscriptionId: string, userId: string, paymentDetails: any) => {
    return fetchAPI(`/abonnements/${subscriptionId}/subscribe`, {
      method: "POST",
      body: JSON.stringify({ userId, paymentDetails }),
    })
  },
}

// Services pour les utilisateurs
export const userService = {
  // Récupérer le profil utilisateur
  getUserProfile: async (userId: string) => {
    return fetchAPI(`/utilisateurs/${userId}`)
  },

  // Mettre à jour le profil utilisateur
  updateUserProfile: async (userId: string, profileData: any) => {
    return fetchAPI(`/utilisateurs/${userId}`, {
      method: "PUT",
      body: JSON.stringify(profileData),
    })
  },

  // Récupérer les cours d'un utilisateur
  getUserCourses: async (userId: string) => {
    return fetchAPI(`/utilisateurs/${userId}/cours`)
  },
}

// Services pour les transactions
export const transactionService = {
  // Récupérer toutes les transactions
  getAllTransactions: async (filters = {}) => {
    // Construire les paramètres de requête à partir des filtres
    const queryParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value))
      }
    })

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ""
    return fetchAPI(`/transactions${queryString}`)
  },

  // Récupérer une transaction par son ID
  getTransactionById: async (id: string) => {
    return fetchAPI(`/transactions/${id}`)
  },
}

// Services pour les statistiques
export const statisticsService = {
  // Récupérer les statistiques de revenus
  getRevenueStats: async (period = 'month') => {
    return fetchAPI(`/statistiques/revenus?period=${period}`)
  },

  // Récupérer les statistiques d'utilisateurs
  getUserStats: async () => {
    return fetchAPI('/statistiques/utilisateurs')
  },

  // Récupérer les statistiques de cours
  getCourseStats: async () => {
    return fetchAPI('/statistiques/cours')
  },
}