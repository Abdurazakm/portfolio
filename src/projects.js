// Project facts shared by the portfolio and service pages.
export const projects = [
  {
    slug: "fetan-delivery", title: "Fetan Delivery", category: "FULL-STACK APPLICATION",
    image: "fetan", number: "01", description: "From the kitchen to the campus.",
    summary: "A food delivery platform where AASTU students can order meals and follow delivery updates.",
    tech: ["React", "Node.js", "PostgreSQL", "Prisma"],
    demo: "https://fetandelivery.netlify.app/",
    context: "Campus food ordering brings together students, restaurant operations, and delivery status.",
    userExplanation: "Students can find meals, place orders, and track delivery status. On the operational side, admin dashboards bring order management and service availability into the same application, with SMS notifications for updates.",
    implementation: "React provides the web interface, with Node.js on the backend. PostgreSQL and Prisma support the application’s data layer. The platform includes order management, admin dashboards, service availability, delivery tracking, and SMS notifications.",
    walkthrough: [
      { title: "Campus ordering", description: "Meal ordering for AASTU students, with service availability and order management." },
      { title: "Restaurant operations", description: "Admin dashboards bring the operational side of the delivery platform into the application." },
      { title: "Delivery updates", description: "Order tracking, delivery status, and SMS notifications connect the delivery process." },
    ],
  },
  {
    slug: "voicelocal", title: "VoiceLocal", category: "WEB & MOBILE APPLICATION",
    image: "voicelocal", number: "02", description: "A digital voice for local communities.",
    summary: "A web and mobile application for reporting neighborhood issues, voting on priorities, and following progress.",
    tech: ["React", "Flutter", "Firebase", "Firestore"],
    demo: "https://voice-local.netlify.app/", github: "https://github.com/Abdurazakm/VoiceLocal",
    context: "Residents need a shared place to raise local concerns and see what happens next.",
    userExplanation: "Residents can submit photos or videos of a local issue, vote on community priorities, and follow updates. Moderation and different access levels support the people reviewing reports, while a notification inbox brings updates together.",
    implementation: "React and Flutter provide the web and mobile interfaces. Firebase and real-time Firestore feeds support the connected experience, including photo and video reports, community voting, role-based access, sector moderation, and a notification inbox.",
  },
  {
    slug: "mayaye-eye-clinic", title: "Mayaye Eye Clinic", category: "BUSINESS WEBSITE",
    image: "mayaye", number: "03", description: "A clearer path to eye care.",
    summary: "A website for a Hawassa eye clinic, bringing its services, eyewear, and contact information into one place.",
    tech: ["React", "Responsive UI", "Web Design"], demo: "https://mayayeeyeclinic.com",
    context: "Patients need clear service information and a straightforward way to find and contact a clinic.",
    userExplanation: "Visitors can read about the clinic’s services, browse eyewear, and find visit and contact information. The website gives people a place to learn about the clinic before getting in touch.",
    implementation: "A responsive React interface presents clinic services, eyewear, and visit information. The layout adapts to different screen sizes so the same information can be read on phones and larger screens.",
  },
];
