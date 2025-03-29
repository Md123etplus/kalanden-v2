// import { createClient } from "@supabase/supabase-js"

// // Utiliser les variables d'environnement fournies
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// // Créer le client Supabase
// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// // Types pour TypeScript
// export type User = {
//   id: string
//   email: string
//   full_name: string
//   role: 'student' | 'parent' | 'teacher' | 'admin'
//   avatar_url: string | null
// }

// export type Course = {
//   id: number
//   titre: string
//   description: string
//   version: string
//   userID: string
//   price: number | null
//   status: 'brouillon' | 'publié' | 'archivé'
//   date_creation: string
//   niveau: 'Débutant' | 'Intermédiaire' | 'Avancé'
//   students_count: number
//   rating: number
//   image_url: string | null
//   tags: string[]
// }

// export type Subscription = {
//   id: number
//   nom: string
//   description: string
//   prix: number
//   duree_validite: number
//   type: 'Free' | 'Premium' | 'Famille' | 'Entreprise'
//   features: string[]
//   badge_text: string | null
//   is_popular: boolean
// }

// export type Transaction = {
//   id: number
//   utilisateurID: string
//   abonnementID: number
//   montant: number
//   date: string
//   status: 'success' | 'failed' | 'pending'
//   methode_paiement: string
//   montant_plateforme: number
//   montant_client: number
//   reference: string
// }

// // Fonctions d'authentification
// export async function signUp(email: string, password: string, userData: any = {}) {
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       data: userData,
//     },
//   })
//   return { data, error }
// }

// export async function signIn(email: string, password: string) {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   })
//   return { data, error }
// }

// export async function signOut() {
//   const { error } = await supabase.auth.signOut()
//   return { error }
// }

// // Fonctions pour les utilisateurs
// export async function getUserProfile(userId: string) {
//   const { data, error } = await supabase
//     .from('utilisateurs')
//     .select('*')
//     .eq('id', userId)
//     .single()
  
//   return { data, error }
// }

// export async function updateUserProfile(userId: string, profileData: any) {
//   const { data, error } = await supabase
//     .from('utilisateurs')
//     .update(profileData)
//     .eq('id', userId)
  
//   return { data, error }
// }

// // Fonctions pour les cours
// export async function getCourses(filters = {}) {
//   try {
//     let query = supabase.from("cours").select("*")

//     // Appliquer les filtres
//     Object.entries(filters).forEach(([key, value]) => {
//       if (value) {
//         query = query.eq(key, value)
//       }
//     })

//     const { data, error } = await query
//     return { data, error }
//   } catch (error) {
//     console.error("Erreur lors de la récupération des cours:", error)
//     return { data: [], error: { message: "Erreur de récupération des cours." } }
//   }
// }

// export async function getCourseById(courseId: number) {
//   const { data, error } = await supabase
//     .from('cours')
//     .select(`
//       *,
//       modules(
//         *,
//         chapitres(
//           *,
//           materiels_pedagogiques(*)
//         )
//       )
//     `)
//     .eq('id', courseId)
//     .single()
  
//   return { data, error }
// }

// export async function searchCourses(searchTerm: string) {
//   try {
//     const { data, error } = await supabase
//       .from("cours")
//       .select("*")
//       .or(`titre.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)

//     return { data, error }
//   } catch (error) {
//     console.error("Erreur lors de la recherche de cours:", error)
//     return { data: [], error: { message: "Erreur de recherche." } }
//   }
// }

// // Fonctions pour les abonnements
// export async function getSubscriptions() {
//   try {
//     const { data, error } = await supabase.from("offres").select("*")

//     return { data, error }
//   } catch (error) {
//     console.error("Erreur lors de la récupération des abonnements:", error)
//     return { data: [], error: { message: "Erreur de récupération des abonnements." } }
//   }
// }

// export async function getSubscriptionById(subscriptionId: number) {
//   const { data, error } = await supabase
//     .from('offres')
//     .select('*')
//     .eq('id', subscriptionId)
//     .single()
  
//   return { data, error }
// }

// export async function subscribeToOffer(userId: string, offerId: number, paymentDetails: any) {
//   // 1. Créer un nouvel abonnement
//   const { data: abonnement, error: abonnementError } = await supabase
//     .from('abonnements')
//     .insert({
//       utilisateurID: userId,
//       offreID: offerId,
//       date_debut: new Date().toISOString(),
//       date_fin: null, // À calculer en fonction de la durée de l'offre
//       status: 'active'
//     })
//     .select()
//     .single()
  
//   if (abonnementError) return { error: abonnementError }
  
//   // 2. Créer un paiement
//   const { data: paiement, error: paiementError } = await supabase
//     .from('paiements')
//     .insert({
//       utilisateurID: userId,
//       abonnementID: abonnement.id,
//       montant: paymentDetails.amount,
//       methode_paiement: paymentDetails.method,
//       status: 'success',
//       transaction_id: paymentDetails.transactionId || `tr-${Date.now()}`
//     })
//     .select()
//     .single()
  
//   if (paiementError) return { error: paiementError }
  
//   return { data: { abonnement, paiement }, error: null }
// }

// // Fonctions pour les catégories
// export async function getCategories() {
//   try {
//     const { data, error } = await supabase.from("categories").select("*")

//     return { data, error }
//   } catch (error) {
//     console.error("Erreur lors de la récupération des catégories:", error)
//     return { data: [], error: { message: "Erreur de récupération des catégories." } }
//   }
// }

// // Fonctions pour les transactions
// export async function getTransactions(userId?: string, filters = {}) {
//   try {
//     let query = supabase.from("transactions").select("*")
    
//     if (userId) {
//       query = query.eq('utilisateurID', userId)
//     }
    
//     // Appliquer les filtres
//     Object.entries(filters).forEach(([key, value]) => {
//       if (value) {
//         query = query.eq(key, value)
//       }
//     })
    
//     const { data, error } = await query.order('date', { ascending: false })
//     return { data, error }
//   } catch (error) {
//     console.error("Erreur lors de la récupération des transactions:", error)
//     return { data: [], error: { message: "Erreur de récupération des transactions." } }
//   }
// }

// // Fonctions pour les statistiques
// export async function getRevenueStats(period = 'month') {
//   try {
//     let timeFilter
//     const now = new Date()
    
//     switch (period) {
//       case 'week':
//         const lastWeek = new Date(now)
//         lastWeek.setDate(now.getDate() - 7)
//         timeFilter = `date.gte.${lastWeek.toISOString()}`
//         break
//       case 'month':
//         const lastMonth = new Date(now)
//         lastMonth.setMonth(now.getMonth() - 1)
//         timeFilter = `date.gte.${lastMonth.toISOString()}`
//         break
//       case 'year':
//         const lastYear = new Date(now)
//         lastYear.setFullYear(now.getFullYear() - 1)
//         timeFilter = `date.gte.${lastYear.toISOString()}`
//         break
//       default:
//         timeFilter = ''
//     }
    
//     const { data, error } = await supabase
//       .from('transactions')
//       .select('*')
//       .eq('status', 'success')
//       .gte('date', timeFilter.split('gte.')[1])
    
//     if (error) throw error
    
//     // Calculer les statistiques
//     const totalRevenue = data.reduce((sum, transaction) => sum + transaction.montant, 0)
//     const platformShare = data.reduce((sum, transaction) => sum + transaction.montant_plateforme, 0)
//     const clientsShare = data.reduce((sum, transaction) => sum + transaction.montant_client, 0)
    
//     return { 
//       data: {
//         totalRevenue,
//         platformShare,
//         clientsShare,
//         transactionsCount: data.length
//       }, 
//       error: null 
//     }
//   } catch (error) {
//     console.error("Erreur lors de la récupération des statistiques de revenus:", error)
//     return { data: null, error: { message: "Erreur de récupération des statistiques." } }
//   }
// }

// export async function getUserCourseProgress(userId: string, courseId: number) {
//   try {
//     // Récupérer la relation utilisateur-cours
//     const { data: userCourse, error: userCourseError } = await supabase
//       .from('rel_user_cours')
//       .select('*')
//       .eq('userID', userId)
//       .eq('courseID', courseId)
//       .single()
    
//     if (userCourseError) throw userCourseError
    
//     // Récupérer la progression par module
//     const { data: moduleProgress, error: moduleProgressError } = await supabase
//       .from('rel_user_cours_module')
//       .select(`
//         *,
//         modules:moduleID(titre, ordre)
//       `)
//       .eq('refUser_Cours', userCourse.id)
    
//     if (moduleProgressError) throw moduleProgressError
    
//     return { 
//       data: {
//         overall: userCourse.progress,
//         modules: moduleProgress
//       }, 
//       error: null 
//     }
//   } catch (error) {
//     console.error("Erreur lors de la récupération de la progression:", error)
//     return { data: null, error: { message: "Erreur de récupération de la progression." } }
//   }
// }

// // Fonctions pour les activités
// export async function logActivity(userId: string, type: string, description: string, metadata = {}) {
//   try {
//     const { data, error } = await supabase
//       .from('activites')
//       .insert({
//         utilisateurID: userId,
//         type,
//         description,
//         metadata
//       })
//       .select()
//       .single()
    
//     return { data, error }
//   } catch (error) {
//     console.error("Erreur lors de l'enregistrement de l'activité:", error)
//     return { data: null, error: { message: "Erreur d'enregistrement de l'activité." } }
//   }
// }

// export async function getUserActivities(userId: string, limit = 10) {
//   try {
//     const { data, error } = await supabase
//       .from('activites')
//       .select('*')
//       .eq('utilisateurID', userId)
//       .order('date', { ascending: false })
//       .limit(limit)
    
//     return { data, error }
//   } catch (error) {
//     console.error("Erreur lors de la récupération des activités:", error)
//     return { data: [], error: { message: "Erreur de récupération des activités." } }
//   }
// }

// // Fonctions pour les notifications
// export async function getUserNotifications(userId: string, onlyUnread = false) {
//   try {
//     let query = supabase
//       .from('notifications')
//       .select('*')
//       .eq('utilisateurID', userId)
//       .order('date_creation', { ascending: false })
    
//     if (onlyUnread) {
//       query = query.eq('lue', false)
//     }
    
//     const { data, error } = await query
    
//     return { data, error }
//   } catch (error) {
//     console.error("Erreur lors de la récupération des notifications:", error)
//     return { data: [], error: { message: "Erreur de récupération des notifications." } }
//   }
// }

// export async function markNotificationAsRead(notificationId: number) {
//   try {
//     const { data, error } = await supabase
//       .from('notifications')
//       .update({ lue: true })
//       .eq('id', notificationId)
    
//     return { data, error }
//   } catch (error) {
//     console.error("Erreur lors de la mise à jour de la notification:", error)
//     return { data: null, error: { message: "Erreur de mise à jour de la notification." } }
//   }
// }
import { createClient } from "@supabase/supabase-js"

// Utiliser les variables d'environnement fournies
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://aqfwsgieequeqdcwneff.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxZndzZ2llZXF1ZXFkY3duZWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1OTc0NzksImV4cCI6MjA1ODE3MzQ3OX0.OS5figsWYDiAe5zoutSSPY8HlvGiNeId6i_9RMBibM8"

// Créer le client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function signUp(email: string, password: string, userData: any = {}) {
  console.log("Fonction signUp appelée avec:", { email, userData })

  try {
    // Vérifier si nous sommes en mode développement sans Supabase configuré
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log("Mode développement: Supabase non configuré, simulation d'inscription")

      // Simuler une réponse réussie
      return {
        data: {
          user: {
            id: `user-${Date.now()}`,
            email,
            user_metadata: userData,
          },
        },
        error: null,
      }
    }

    // Appel réel à Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    })

    console.log("Réponse de Supabase:", { data, error })

    return { data, error }
  } catch (error) {
    console.error("Erreur lors de l'appel à supabase.auth.signUp:", error)
    return { data: null, error }
  }
}

