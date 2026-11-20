import { Clock3, MapPin, Phone } from "lucide-react";

/* Text copied unchanged from the previous contact page. hrefs only make lines clickable. */
export const contactItems = [
  {
    title: "Address",
    icon: MapPin,
    lines: [
      { text: "Level 30, The Leadenhall Building, 122" },
      { text: "Leadenhall St, London EC3V 4AB" },
    ],
  },
  {
    title: "Contact",
    icon: Phone,
    lines: [
      { text: "Mobile: (+44) – 7454 – 675398", href: "tel:+447454675398" },
      { text: "Mail: hello@whispersofwisdom.co.uk", href: "mailto:hello@whispersofwisdom.co.uk" },
    ],
  },
  {
    title: "Hour of Operation",
    icon: Clock3,
    lines: [{ text: "Monday – Friday: 09:00 – 17:00" }],
  },
];
