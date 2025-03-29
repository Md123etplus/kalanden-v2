"use client"

import { useState } from "react"
import { format, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import { MessageSquare, Search, Send } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import Navbar from "@/components/navbar"

// Données statiques pour les conversations
const conversations = [
  {
    id: 1,
    user: {
      id: 101,
      name: "Sophie Martin",
      role: "student",
      avatar: null,
    },
    lastMessage: {
      content: "Bonjour, j'ai une question concernant le devoir de mathématiques.",
      timestamp: "2025-03-24T14:30:00",
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: 2,
    user: {
      id: 102,
      name: "Emma Bernard",
      role: "parent",
      avatar: null,
    },
    lastMessage: {
      content: "Je voudrais discuter des progrès de mon fils en sciences.",
      timestamp: "2025-03-24T10:15:00",
      isRead: false,
    },
    unreadCount: 2,
  },
  {
    id: 3,
    user: {
      id: 103,
      name: "Marc Dupont",
      role: "teacher",
      avatar: null,
    },
    lastMessage: {
      content: "Pouvez-vous valider le programme du cours d'histoire pour le trimestre prochain ?",
      timestamp: "2025-03-23T16:45:00",
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: 4,
    user: {
      id: 104,
      name: "Lucas Dubois",
      role: "student",
      avatar: null,
    },
    lastMessage: {
      content: "J'ai besoin d'aide pour comprendre le chapitre sur les équations différentielles.",
      timestamp: "2025-03-22T09:00:00",
      isRead: false,
    },
    unreadCount: 1,
  },
  {
    id: 5,
    user: {
      id: 105,
      name: "Léa Moreau",
      role: "student",
      avatar: null,
    },
    lastMessage: {
      content: "Merci pour votre aide avec mon projet de littérature !",
      timestamp: "2025-03-21T18:30:00",
      isRead: true,
    },
    unreadCount: 0,
  },
]

// Données statiques pour les messages d'une conversation
const messages = [
  {
    id: 1,
    senderId: 102,
    content:
      "Bonjour, je voudrais discuter des progrès de mon fils en sciences. Il semble avoir des difficultés avec certains concepts.",
    timestamp: "2025-03-24T10:15:00",
  },
  {
    id: 2,
    senderId: "admin-user-id", // ID de l'administrateur connecté
    content:
      "Bonjour Mme Bernard, je serais ravi de discuter des progrès de votre fils. Pouvez-vous me préciser quels concepts lui posent problème ?",
    timestamp: "2025-03-24T10:20:00",
  },
  {
    id: 3,
    senderId: 102,
    content:
      "Il a du mal avec les concepts de physique, notamment les lois de Newton et les principes de conservation d'énergie.",
    timestamp: "2025-03-24T10:25:00",
  },
  {
    id: 4,
    senderId: 102,
    content:
      "Je me demandais s'il serait possible d'organiser des séances de soutien ou de lui recommander des ressources supplémentaires ?",
    timestamp: "2025-03-24T10:26:00",
  },
]

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<number | null>(2) // Conversation avec Emma Bernard sélectionnée par défaut
  const [newMessage, setNewMessage] = useState("")
  const { user } = useAuth()

  // Filtrer les conversations en fonction du terme de recherche
  const filteredConversations = conversations.filter((conversation) =>
    conversation.user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Obtenir la conversation sélectionnée
  const currentConversation = conversations.find((conv) => conv.id === selectedConversation)

  // Fonction pour envoyer un nouveau message
  const sendMessage = () => {
    if (newMessage.trim() === "") return

    // Dans une application réelle, vous enverriez le message à l'API
    console.log("Message envoyé:", newMessage)

    // Réinitialiser le champ de message
    setNewMessage("")
  }

  // Fonction pour obtenir l'initiale du nom d'utilisateur
  const getUserInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-200px)] min-h-[500px]">
          {/* Liste des conversations */}
          <Card className="w-full md:w-1/3 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle>Messages</CardTitle>
              <CardDescription>Gérez vos conversations avec les élèves, parents et enseignants</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Rechercher une conversation..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <ScrollArea className="h-full pr-4">
                {filteredConversations.length > 0 ? (
                  <div className="space-y-2">
                    {filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedConversation === conversation.id
                            ? "bg-blue-50 dark:bg-blue-900/20"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => setSelectedConversation(conversation.id)}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.user.avatar || undefined} alt={conversation.user.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                            {getUserInitial(conversation.user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="font-medium truncate">{conversation.user.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {format(parseISO(conversation.lastMessage.timestamp), "HH:mm", { locale: fr })}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                              {conversation.lastMessage.content}
                            </div>
                            {conversation.unreadCount > 0 && (
                              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-medium">
                                {conversation.unreadCount}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                    <h3 className="mt-4 text-lg font-medium">Aucune conversation trouvée</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Essayez de modifier votre recherche.
                    </p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Conversation sélectionnée */}
          <Card className="w-full md:w-2/3 flex flex-col">
            {selectedConversation && currentConversation ? (
              <>
                <CardHeader className="pb-3 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={currentConversation.user.avatar || undefined}
                        alt={currentConversation.user.name}
                      />
                      <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                        {getUserInitial(currentConversation.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{currentConversation.user.name}</CardTitle>
                      <CardDescription>
                        {currentConversation.user.role === "student" && "Étudiant"}
                        {currentConversation.user.role === "parent" && "Parent"}
                        {currentConversation.user.role === "teacher" && "Enseignant"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden p-0">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      {messages.map((message) => {
                        const isCurrentUser = message.senderId === "admin-user-id"
                        return (
                          <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                            <div
                              className={`max-w-[80%] rounded-lg p-3 ${
                                isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800"
                              }`}
                            >
                              <div className="text-sm">{message.content}</div>
                              <div
                                className={`text-xs mt-1 ${
                                  isCurrentUser ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {format(parseISO(message.timestamp), "HH:mm", { locale: fr })}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Écrivez votre message..."
                      className="min-h-[80px]"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          sendMessage()
                        }
                      }}
                    />
                    <Button className="self-end" onClick={sendMessage}>
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Envoyer</span>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <MessageSquare className="h-16 w-16 text-gray-300 dark:text-gray-600" />
                <h3 className="mt-4 text-xl font-medium">Aucune conversation sélectionnée</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Sélectionnez une conversation pour commencer à discuter.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </main>
  )
}

