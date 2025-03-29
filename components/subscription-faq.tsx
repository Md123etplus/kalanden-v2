import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function SubscriptionFAQ() {
  const faqs = [
    {
      question: "Comment choisir l'abonnement qui me convient ?",
      answer:
        "Tout dépend de vos besoins. Si vous êtes un étudiant individuel, le Premium Étudiant est idéal. Pour les familles avec enfants, le Pack Famille offre un meilleur rapport qualité-prix. Les écoles et entreprises devraient considérer l'Accès Privé pour des fonctionnalités personnalisées.",
    },
    {
      question: "Puis-je changer d'abonnement à tout moment ?",
      answer:
        "Oui, vous pouvez passer à un abonnement supérieur à tout moment. Pour passer à un abonnement inférieur, le changement prendra effet à la fin de votre période de facturation en cours.",
    },
    {
      question: "Y a-t-il un engagement de durée ?",
      answer:
        "Non, tous nos abonnements sont sans engagement. Vous pouvez annuler à tout moment et votre abonnement restera actif jusqu'à la fin de la période payée.",
    },
    {
      question: "Comment fonctionne le Pack Famille ?",
      answer:
        "Le Pack Famille permet de créer jusqu'à 3 profils enfants liés à votre compte principal. Vous pourrez suivre leurs progrès via un tableau de bord parental et définir des contrôles d'accès adaptés à chaque enfant.",
    },
    {
      question: "Que comprend l'Accès Privé pour les entreprises et écoles ?",
      answer:
        "L'Accès Privé inclut des licences en lot pour tous vos apprenants, un tableau de bord administrateur pour suivre les progrès, la possibilité de personnaliser le contenu selon vos besoins spécifiques, et un support technique dédié.",
    },
    {
      question: "Les certifications sont-elles reconnues ?",
      answer:
        "Oui, nos certifications sont reconnues par de nombreux établissements et entreprises. Elles attestent des compétences acquises et peuvent être partagées sur votre CV ou profil LinkedIn.",
    },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Questions fréquentes</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

