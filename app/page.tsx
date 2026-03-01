import { LaunchLanding } from "./components/launch-landing"

export const metadata = {
  title: "TICKETLESS",
  description:
    "Privacy-first iOS parking assistant with street-cleaning and tow-window alerts.",
  openGraph: {
    title: "TICKETLESS",
    description:
      "Privacy-first iOS parking assistant with street-cleaning and tow-window alerts.",
  },
}

export default function Page() {
  return <LaunchLanding />
}
