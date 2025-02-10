export const ACHIEVEMENTS = {
  // Resource-based achievements
  influence: [
    {
      id: 'rising_star',
      title: 'Rising Star',
      description: 'Reach 1,000 influence',
      check: (state) => state.influence >= 1000,
      reward: { resources: 100 }
    },
    {
      id: 'power_broker',
      title: 'Power Broker',
      description: 'Reach 10,000 influence',
      check: (state) => state.influence >= 10000,
      reward: { resources: 500 }
    },
    {
      id: 'puppet_master',
      title: 'Puppet Master',
      description: 'Reach 50,000 influence',
      check: (state) => state.influence >= 50000,
      reward: { resources: 2000 }
    }
  ],
  supporters: [
    {
      id: 'grassroots',
      title: 'Grassroots Movement',
      description: 'Gain 100 supporters',
      check: (state) => state.supporters >= 100,
      reward: { influence: 200 }
    },
    {
      id: 'mass_movement',
      title: 'Mass Movement',
      description: 'Gain 1,000 supporters',
      check: (state) => state.supporters >= 1000,
      reward: { influence: 1000 }
    }
  ],
  
  // Phase-based achievements
  phases: [
    {
      id: 'local_hero',
      title: 'Local Hero',
      description: 'Complete the Local Politics phase',
      check: (state) => state.phase === 'regionalInfluence',
      reward: { resources: 200 }
    },
    {
      id: 'regional_power',
      title: 'Regional Power',
      description: 'Complete the Regional Influence phase',
      check: (state) => state.phase === 'nationalPresence',
      reward: { resources: 500 }
    },
    {
      id: 'national_figure',
      title: 'National Figure',
      description: 'Complete the National Presence phase',
      check: (state) => state.phase === 'powerConsolidation',
      reward: { resources: 1000 }
    },
    {
      id: 'supreme_leader',
      title: 'Supreme Leader',
      description: 'Achieve Absolute Rule',
      check: (state) => state.phase === 'absoluteRule',
      reward: { resources: 5000 }
    }
  ],
  
  // Action-based achievements
  actions: [
    {
      id: 'orator',
      title: 'Master Orator',
      description: 'Hold 50 speeches',
      check: (state) => state.stats?.speechesHeld >= 50,
      reward: { influence: 500 }
    },
    {
      id: 'rally_master',
      title: 'Rally Master',
      description: 'Organize 20 rallies',
      check: (state) => state.stats?.ralliesOrganized >= 20,
      reward: { supporters: 100 }
    },
    {
      id: 'propagandist',
      title: 'Master Propagandist',
      description: 'Spread propaganda 10 times',
      check: (state) => state.stats?.propagandaSpread >= 10,
      reward: { influence: 1000 }
    }
  ],
  
  // Event-based achievements
  events: [
    {
      id: 'decisive_leader',
      title: 'Decisive Leader',
      description: 'Make 10 event choices',
      check: (state) => state.stats?.eventChoicesMade >= 10,
      reward: { influence: 300 }
    },
    {
      id: 'iron_fist',
      title: 'Iron Fist',
      description: 'Choose the aggressive option 5 times',
      check: (state) => state.stats?.aggressiveChoices >= 5,
      reward: { resources: 300 }
    }
  ]
};