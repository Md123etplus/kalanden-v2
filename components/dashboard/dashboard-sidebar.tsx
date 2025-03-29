"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  GraduationCap,
  BarChart,
  Award,
  Settings,
  Users,
  School,
  FileText,
  Calendar,
  MessageSquare,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DashboardSidebarProps {
  userRole: string | null
}

export function DashboardSidebar({ userRole }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  // Définir les liens en fonction du rôle de l'utilisateur
  const getLinks = () => {
    const commonLinks = [
      {
        title: "Paramètres",
        href: "/dashboard/settings",
        icon: <Settings className="h-5 w-5" />,
      },
      {
        title: "Aide",
        href: "/dashboard/help",
        icon: <HelpCircle className="h-5 w-5" />,
      },
    ]

    if (userRole === "student") {
      return [
        {
          title: "Tableau de bord",
          href: "/dashboard",
          icon: <BarChart className="h-5 w-5" />,
        },
        {
          title: "Mes cours",
          href: "/dashboard/courses",
          icon: <BookOpen className="h-5 w-5" />,
        },
        {
          title: "Mes progrès",
          href: "/dashboard/progress",
          icon: <GraduationCap className="h-5 w-5" />,
        },
        {
          title: "Calendrier",
          href: "/dashboard/calendar",
          icon: <Calendar className="h-5 w-5" />,
        },
        {
          title: "Activités",
          href: "/dashboard/activity",
          icon: <Activity className="h-5 w-5" />,
        },
        {
          title: "Statistiques",
          href: "/dashboard/statistics",
          icon: <BarChart className="h-5 w-5" />,
        },
        {
          title: "Certifications",
          href: "/dashboard/certifications",
          icon: <Award className="h-5 w-5" />,
        },
        ...commonLinks,
      ]
    } else if (userRole === "parent") {
      return [
        {
          title: "Tableau de bord",
          href: "/dashboard",
          icon: <BarChart className="h-5 w-5" />,
        },
        {
          title: "Profils enfants",
          href: "/dashboard/children",
          icon: <Users className="h-5 w-5" />,
        },
        {
          title: "Calendrier",
          href: "/dashboard/calendar",
          icon: <Calendar className="h-5 w-5" />,
        },
        {
          title: "Activités",
          href: "/dashboard/activity",
          icon: <Activity className="h-5 w-5" />,
        },
        {
          title: "Statistiques",
          href: "/dashboard/statistics",
          icon: <BarChart className="h-5 w-5" />,
        },
        {
          title: "Suivi des progrès",
          href: "/dashboard/progress",
          icon: <GraduationCap className="h-5 w-5" />,
        },
        {
          title: "Contrôle parental",
          href: "/dashboard/parental-control",
          icon: <Settings className="h-5 w-5" />,
        },
        ...commonLinks,
      ]
    } else if (userRole === "admin" || userRole === "teacher") {
      return [
        {
          title: "Tableau de bord",
          href: "/dashboard",
          icon: <BarChart className="h-5 w-5" />,
        },
        {
          title: "Gestion des élèves",
          href: "/dashboard/students",
          icon: <Users className="h-5 w-5" />,
        },
        {
          title: "Gestion des cours",
          href: "/dashboard/courses-management",
          icon: <School className="h-5 w-5" />,
        },
        {
          title: "Calendrier",
          href: "/dashboard/calendar",
          icon: <Calendar className="h-5 w-5" />,
        },
        {
          title: "Activités",
          href: "/dashboard/activity",
          icon: <Activity className="h-5 w-5" />,
        },
        {
          title: "Statistiques",
          href: "/dashboard/statistics",
          icon: <BarChart className="h-5 w-5" />,
        },
        {
          title: "Rapports",
          href: "/dashboard/reports",
          icon: <FileText className="h-5 w-5" />,
        },
        {
          title: "Messages",
          href: "/dashboard/messages",
          icon: <MessageSquare className="h-5 w-5" />,
        },
        ...commonLinks,
      ]
    }

    // Par défaut, retourner les liens communs
    return [
      {
        title: "Tableau de bord",
        href: "/dashboard",
        icon: <BarChart className="h-5 w-5" />,
      },
      ...commonLinks,
    ]
  }

  const links = getLinks()

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 relative",
        collapsed ? "w-[70px]" : "w-[250px]",
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-[-12px] top-4 h-6 w-6 rounded-full border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 z-10"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      <div className="p-4 h-[60px] flex items-center border-b border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {userRole === "student"
              ? "Espace Étudiant"
              : userRole === "parent"
                ? "Espace Parent"
                : userRole === "admin" || userRole === "teacher"
                  ? "Espace Administration"
                  : "Tableau de bord"}
          </h2>
        )}
      </div>

      <ScrollArea className="h-[calc(100vh-60px)] py-4">
        <nav className="space-y-1 px-2">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
                collapsed ? "justify-center" : "justify-start",
              )}
            >
              {link.icon}
              {!collapsed && <span className="ml-3">{link.title}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}

