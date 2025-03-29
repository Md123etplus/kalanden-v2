import { Check, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function SubscriptionComparison() {
  const features = [
    { name: "Accès aux cours gratuits", free: true, student: true, family: true, enterprise: true },
    { name: "Consultation des ressources publiques", free: true, student: true, family: true, enterprise: true },
    { name: "Zone de vérification", free: true, student: true, family: true, enterprise: true },
    { name: "Accès illimité aux cours payants", free: false, student: true, family: true, enterprise: true },
    { name: "Évaluations et certifications", free: false, student: true, family: true, enterprise: true },
    { name: "Suivi de la progression", free: false, student: true, family: true, enterprise: true },
    { name: "Contenu téléchargeable", free: false, student: true, family: true, enterprise: true },
    { name: "Gestion de plusieurs profils (jusqu'à 3)", free: false, student: false, family: true, enterprise: true },
    { name: "Tableau de bord parental", free: false, student: false, family: true, enterprise: true },
    { name: "Contrôle parental", free: false, student: false, family: true, enterprise: true },
    { name: "Licences en lot", free: false, student: false, family: false, enterprise: true },
    { name: "Tableau de bord administrateur", free: false, student: false, family: false, enterprise: true },
    { name: "Contenu personnalisé", free: false, student: false, family: false, enterprise: true },
    { name: "Support technique dédié", free: false, student: false, family: false, enterprise: true },
    { name: "Rapports d'analyse détaillés", free: false, student: false, family: false, enterprise: true },
  ]

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Fonctionnalités</TableHead>
              <TableHead className="text-center">Accès Gratuit</TableHead>
              <TableHead className="text-center">Premium Étudiant</TableHead>
              <TableHead className="text-center">Pack Famille</TableHead>
              <TableHead className="text-center">Accès Privé</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature.name}>
                <TableCell className="font-medium">{feature.name}</TableCell>
                <TableCell className="text-center">
                  {feature.free ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {feature.student ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {feature.family ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {feature.enterprise ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  )}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-medium">Prix</TableCell>
              <TableCell className="text-center font-bold">0€/mois</TableCell>
              <TableCell className="text-center font-bold">10€/mois</TableCell>
              <TableCell className="text-center font-bold">15€/mois</TableCell>
              <TableCell className="text-center font-bold">Sur mesure</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

