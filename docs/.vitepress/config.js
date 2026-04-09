export default {
  title: "Flutter Clean Architecture",
  description: "Panduan belajar Clean Architecture di Flutter untuk pemula hingga intermediate.",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Mulai Belajar', link: '/01-introduction' }
    ],
    sidebar: [
      {
        text: 'Dasar-Dasar',
        items: [
          { text: '01. Pendahuluan', link: '/01-introduction' },
          { text: '02. Masalah Tanpa Arsitektur', link: '/02-problems' },
          { text: '03. Mengapa Clean Architecture?', link: '/03-why-clean-architecture' },
          { text: '04. Konsep Inti', link: '/04-core-concepts' },
          { text: '05. Ikhtisar Implementasi', link: '/05-implementation-overview' },
        ]
      },
      {
        text: 'Detail Layer',
        items: [
          { text: '06. Presentation Layer', link: '/06-presentation-layer' },
          { text: '07. Domain Layer', link: '/07-domain-layer' },
          { text: '08. Data Layer', link: '/08-data-layer' },
          { text: '09. Dependency Injection', link: '/09-dependency-injection' },
          { text: '10. Contoh Proyek', link: '/10-example-project' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
}
