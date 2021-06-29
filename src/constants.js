// todo: possibly use an api for all heroes
// todo: at least move to another file
const SUPER_HERO_OPTIONS = [
  {
    id: 'iron-man',
    headline: 'Iron Man',
    cssVariables: [
      {
        propertyName: "--colors-primary",
        value: "#aa0505",
        inputType: "color"
      },
      {
        propertyName: "--colors-secondary",
        value: "#fbca03",
        inputType: "color"
      },
    ]
  },
  {
    id: 'captain-america',
    headline: 'Captain America',
    cssVariables: [
      {
        propertyName: "--colors-primary",
        value: "#0000ff",
        inputType: "color"
      },
      {
        propertyName: "--colors-secondary",
        value: "#870000",
        inputType: "color"
      },
    ]
  }
]

export {
  SUPER_HERO_OPTIONS
}