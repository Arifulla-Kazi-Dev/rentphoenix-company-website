// Company facts shared by the Home and About pages, so they never drift apart.

export interface StoryStep {
  /** Leave undefined until the date is confirmed; the timeline shows a marker instead. */
  when?: string;
  title?: string;
  text: string;
}

/** Drop a photo in /public and set e.g. 'founder.webp' to replace the "AK" monogram everywhere. */
export const FOUNDER_PHOTO: string | null = null;

/** Company milestones only — personal history belongs in the founder section. */
export const STORY_STEPS: StoryStep[] = [
  { when: 'Dec 2025', title: 'Founded RentPhoenix Technologies Private Limited', text: 'to close the coordination gap in rental property management' },
  { when: 'Jan 2026', text: 'Incubated at CIBA Goa' },
  { when: 'Apr 2026', title: 'RentPhoenix OS goes live', text: 'on web and Android' },
  { when: 'Next', text: 'RentPhoenix OS for iPhone, and more client projects' },
];
