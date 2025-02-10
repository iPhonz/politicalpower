export const EVENTS = {
  localPolitics: [
    {
      id: 'local_protest',
      title: 'Local Protest',
      description: 'A protest has broken out against local policies.',
      choices: [
        {
          text: 'Suppress the protest',
          effect: (state) => ({
            influence: state.influence - 50,
            supporters: state.supporters - 10,
            resources: state.resources + 20
          })
        },
        {
          text: 'Address their concerns',
          effect: (state) => ({
            influence: state.influence + 100,
            supporters: state.supporters + 20,
            resources: state.resources - 30
          })
        }
      ]
    },
    {
      id: 'corrupt_official',
      title: 'Corrupt Official',
      description: 'You discover evidence of corruption in the local government.',
      choices: [
        {
          text: 'Blackmail them',
          effect: (state) => ({
            influence: state.influence + 200,
            resources: state.resources + 50
          })
        },
        {
          text: 'Expose them publicly',
          effect: (state) => ({
            influence: state.influence + 300,
            supporters: state.supporters + 30,
            resources: state.resources - 20
          })
        }
      ]
    }
  ],
  regionalInfluence: [
    {
      id: 'media_coverage',
      title: 'Media Coverage',
      description: 'A regional newspaper wants to do a feature story on you.',
      choices: [
        {
          text: 'Control the narrative',
          effect: (state) => ({
            influence: state.influence + 500,
            resources: state.resources - 100
          })
        },
        {
          text: 'Give an honest interview',
          effect: (state) => ({
            influence: state.influence + 300,
            supporters: state.supporters + 50
          })
        }
      ]
    }
  ],
  nationalPresence: [
    {
      id: 'party_split',
      title: 'Party Split',
      description: 'Your party is divided on a crucial issue.',
      choices: [
        {
          text: 'Force party unity',
          effect: (state) => ({
            influence: state.influence + 1000,
            supporters: state.supporters - 100,
            resources: state.resources - 200
          })
        },
        {
          text: 'Allow internal debate',
          effect: (state) => ({
            influence: state.influence - 500,
            supporters: state.supporters + 200
          })
        }
      ]
    }
  ],
  powerConsolidation: [
    {
      id: 'military_coup',
      title: 'Military Coup Attempt',
      description: 'A faction of the military is planning to seize power.',
      choices: [
        {
          text: 'Preemptively arrest the plotters',
          effect: (state) => ({
            influence: state.influence + 2000,
            supporters: state.supporters - 200,
            resources: state.resources - 500
          })
        },
        {
          text: 'Negotiate with the faction',
          effect: (state) => ({
            influence: state.influence - 1000,
            resources: state.resources - 1000
          })
        }
      ]
    }
  ]
};