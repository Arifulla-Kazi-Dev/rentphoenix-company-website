// Company facts shared by the Home and About pages, so they never drift apart.

export interface StoryStep {
  /** Leave undefined until the date is confirmed; the timeline shows a marker instead. */
  when?: string;
  title?: string;
  text: string;
}

/** Drop a photo in /public and set e.g. 'founder.webp' to replace the "AK" monogram everywhere. */
export const FOUNDER_PHOTO: string | null = null;

export const STORY_STEPS: StoryStep[] = [
  { when: '2019–2023', text: 'BE in Electronics & Communication Engineering, Agnel Institute of Technology & Design, Goa' },
  { text: 'Network Engineer at United Telecoms Limited' },
  { title: 'Founded RentPhoenix Technologies Private Limited', text: 'to close the coordination gap in rental property management' },
  { text: 'Incubated at CIBA Goa · Recognised by DPIIT under Startup India' },
  { title: 'RentPhoenix OS goes live', text: 'on web and Android, with WhatsApp rent reminders for real landlords and tenants' },
  { title: 'CO-Founder goes live', text: 'a finance OS for startup founders' },
  { when: 'Next', text: 'RentPhoenix OS for iPhone, and more client projects' },
];
