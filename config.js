/*
  Edit this file to update the page.
  Reorder items by moving them in the arrays.
  Set enabled to false to hide an item without deleting it.
*/

window.LINK_HUB_CONFIG = {
  page: {
    title: "Wojciech Lepczyński | Links & Projects",
    description: "Selected DevOps, cloud, automation and ESP32 projects by Wojciech Lepczyński, plus articles, videos and contact links."
  },

  profile: {
    name: "Wojciech Lepczyński",
    initials: "WL",
    eyebrow: "DEVOPS · CLOUD · AUTOMATION",
    bio: "I build practical tools, cloud platforms and small devices that solve real problems.",
    avatar: "https://github.com/lepczynski-cloud.png?size=320"
  },

  socialLinks: [
    {
      label: "Blog",
      url: "https://lepczynski.it/en/",
      icon: "blog",
      enabled: true
    },
    {
      label: "YouTube",
      url: "https://www.youtube.com/@WojciechLepczynski",
      icon: "youtube",
      enabled: true
    },
    {
      label: "GitHub",
      url: "https://github.com/lepczynski-cloud",
      icon: "github",
      enabled: true
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/wojciech-lepczynski/",
      icon: "linkedin",
      enabled: true
    }
  ],

  sections: [
    {
      title: "Start here",
      links: [
        {
          title: "Admin Toolkit",
          description: "Privacy-friendly browser tools for networking, Linux and automation.",
          url: "https://admintoolkit.lepczynski.it/",
          icon: "terminal",
          badge: "WEB TOOL",
          enabled: true
        }
      ]
    },
    {
      title: "Selected projects",
      links: [
        {
          title: "ESP32 PC Control Deck",
          description: "Live PC stats and configurable shortcuts on a tiny touchscreen.",
          url: "https://sp32-pc-control-deck.lepczynski.it/",
          icon: "monitor",
          badge: "ESP32",
          enabled: true
        },
        {
          title: "CrowPanel Rotary Buddy",
          description: "A media dial and animated desk companion built on ESP32-S3.",
          url: "https://crowpanel-rotary-buddy.lepczynski.it/",
          icon: "dial",
          badge: "OPEN SOURCE",
          enabled: true
        },
        {
          title: "ASCII Camera Studio",
          description: "Browser studio for turning a live camera, photos and videos into customizable ASCII art.",
          url: "https://asciicamera.lepczynski.it/",
          icon: "monitor",
          badge: "OPEN SOURCE",
          enabled: true
        },
        {
          title: "More projects on GitHub",
          description: "Browse source code, documentation and the rest of my public projects.",
          url: "https://github.com/lepczynski-cloud?tab=repositories",
          icon: "github",
          compact: true,
          enabled: true
        }
      ]
    },
    {
      title: "Contact",
      links: [
        {
          title: "Work with me",
          description: "Speaking, technical content, product reviews and selected collaborations.",
          url: "https://lepczynski.it/en/work-with-me/",
          icon: "briefcase",
          compact: true,
          enabled: true
        }
      ]
    }
  ],

  footer: "No tracking, no cookies, just useful links."
};
