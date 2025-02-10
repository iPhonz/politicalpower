import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { EVENTS } from '../data/events';
import { ACHIEVEMENTS } from '../data/achievements';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';

const Game = () => {
  const [gameState, setGameState] = useState({
    influence: 0,
    supporters: 0,
    resources: 100,
    phase: 'localPolitics',
    lastTick: Date.now(),
    unlocks: {
      rallies: false,
      propaganda: false,
      militaryContacts: false,
    },
    stats: {
      speechesHeld: 0,
      ralliesOrganized: 0,
      propagandaSpread: 0,
      eventChoicesMade: 0,
      aggressiveChoices: 0
    },
    achievements: [],
    currentEvent: null
  });

  const [showAchievement, setShowAchievement] = useState(null);

  const PHASES = {
    localPolitics: {
      name: 'Local Politics',
      description: 'Build your base of power in local government',
      nextPhase: 'regionalInfluence',
      requirement: { influence: 1000 }
    },
    regionalInfluence: {
      name: 'Regional Influence',
      description: 'Expand your influence across the region',
      nextPhase: 'nationalPresence',
      requirement: { influence: 5000 }
    },
    nationalPresence: {
      name: 'National Presence',
      description: 'Establish yourself as a national figure',
      nextPhase: 'powerConsolidation',
      requirement: { influence: 20000 }
    },
    powerConsolidation: {
      name: 'Power Consolidation',
      description: 'Concentrate power under your control',
      nextPhase: 'absoluteRule',
      requirement: { influence: 100000 }
    },
    absoluteRule: {
      name: 'Absolute Rule',
      description: 'Exercise complete control over the nation',
      nextPhase: null,
      requirement: null
    }
  };

  // Check for random events
  useEffect(() => {
    const eventCheck = setInterval(() => {
      if (!gameState.currentEvent && Math.random() < 0.1) {
        const phaseEvents = EVENTS[gameState.phase];
        if (phaseEvents && phaseEvents.length > 0) {
          const randomEvent = phaseEvents[Math.floor(Math.random() * phaseEvents.length)];
          setGameState(prev => ({
            ...prev,
            currentEvent: randomEvent
          }));
        }
      }
    }, 5000);

    return () => clearInterval(eventCheck);
  }, [gameState.phase, gameState.currentEvent]);

  // Check achievements
  const checkAchievements = (state) => {
    const newAchievements = [];
    
    Object.values(ACHIEVEMENTS).forEach(category => {
      category.forEach(achievement => {
        if (!state.achievements.includes(achievement.id) && achievement.check(state)) {
          newAchievements.push(achievement);
          state.achievements.push(achievement.id);
          
          if (achievement.reward) {
            Object.entries(achievement.reward).forEach(([key, value]) => {
              state[key] += value;
            });
          }
          
          setShowAchievement(achievement);
          setTimeout(() => setShowAchievement(null), 3000);
        }
      });
    });

    return newAchievements;
  };

  // Game tick
  useEffect(() => {
    const gameLoop = setInterval(() => {
      const currentTime = Date.now();
      const delta = (currentTime - gameState.lastTick) / 1000;
      
      setGameState(prev => {
        const baseInfluenceGain = prev.supporters * 0.1 * delta;
        const supporterGain = Math.floor(prev.resources * 0.01 * delta);
        
        const newState = {
          ...prev,
          influence: prev.influence + baseInfluenceGain,
          supporters: prev.supporters + supporterGain,
          lastTick: currentTime
        };

        checkAchievements(newState);
        return newState;
      });
    }, 1000);

    return () => clearInterval(gameLoop);
  }, []);

  // Handle event choice
  const handleEventChoice = (choice, isAggressive) => {
    const effect = choice.effect(gameState);
    
    setGameState(prev => {
      const newState = {
        ...prev,
        ...effect,
        currentEvent: null,
        stats: {
          ...prev.stats,
          eventChoicesMade: prev.stats.eventChoicesMade + 1,
          aggressiveChoices: prev.stats.aggressiveChoices + (isAggressive ? 1 : 0)
        }
      };

      checkAchievements(newState);
      return newState;
    });
  };

  // Game actions
  const actions = {
    holdSpeech: () => {
      if (gameState.resources >= 10) {
        setGameState(prev => {
          const newState = {
            ...prev,
            influence: prev.influence + 25,
            resources: prev.resources - 10,
            stats: {
              ...prev.stats,
              speechesHeld: prev.stats.speechesHeld + 1
            }
          };

          checkAchievements(newState);
          return newState;
        });
      }
    },
    
    organizeRally: () => {
      if (gameState.resources >= 50 && gameState.unlocks.rallies) {
        setGameState(prev => {
          const newState = {
            ...prev,
            influence: prev.influence + 150,
            supporters: prev.supporters + 10,
            resources: prev.resources - 50,
            stats: {
              ...prev.stats,
              ralliesOrganized: prev.stats.ralliesOrganized + 1
            }
          };

          checkAchievements(newState);
          return newState;
        });
      }
    },
    
    spreadPropaganda: () => {
      if (gameState.resources >= 100 && gameState.unlocks.propaganda) {
        setGameState(prev => {
          const newState = {
            ...prev,
            influence: prev.influence + 500,
            supporters: prev.supporters + 50,
            resources: prev.resources - 100,
            stats: {
              ...prev.stats,
              propagandaSpread: prev.stats.propagandaSpread + 1
            }
          };

          checkAchievements(newState);
          return newState;
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#333333] p-4 font-mono">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-4 p-4 bg-white">
          <h1 className="text-2xl font-bold mb-2 text-[#8B0000]">
            {PHASES[gameState.phase].name}
          </h1>
          <p className="text-sm mb-4">
            {PHASES[gameState.phase].description}
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="font-bold">Influence</div>
              <div>{Math.floor(gameState.influence)}</div>
            </div>
            <div className="text-center">
              <div className="font-bold">Supporters</div>
              <div>{Math.floor(gameState.supporters)}</div>
            </div>
            <div className="text-center">
              <div className="font-bold">Resources</div>
              <div>{Math.floor(gameState.resources)}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={actions.holdSpeech}
              className="w-full p-2 bg-[#8B0000] text-white hover:bg-opacity-90 disabled:bg-opacity-50"
              disabled={gameState.resources < 10}
            >
              Hold Speech (10 resources)
            </button>
            
            {gameState.unlocks.rallies && (
              <button
                onClick={actions.organizeRally}
                className="w-full p-2 bg-[#8B0000] text-white hover:bg-opacity-90 disabled:bg-opacity-50"
                disabled={gameState.resources < 50}
              >
                Organize Rally (50 resources)
              </button>
            )}
            
            {gameState.unlocks.propaganda && (
              <button
                onClick={actions.spreadPropaganda}
                className="w-full p-2 bg-[#8B0000] text-white hover:bg-opacity-90 disabled:bg-opacity-50"
                disabled={gameState.resources < 100}
              >
                Spread Propaganda (100 resources)
              </button>
            )}
          </div>

          {/* Stats Section */}
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h2 className="text-lg font-bold mb-2">Statistics</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Speeches Held: {gameState.stats.speechesHeld}</div>
              <div>Rallies Organized: {gameState.stats.ralliesOrganized}</div>
              <div>Propaganda Spread: {gameState.stats.propagandaSpread}</div>
              <div>Event Choices Made: {gameState.stats.eventChoicesMade}</div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mt-4 p-4 bg-[#FFD700] bg-opacity-10 rounded">
            <h2 className="text-lg font-bold mb-2">Recent Achievements</h2>
            <div className="space-y-1">
              {gameState.achievements.slice(-3).map(achievementId => {
                const achievement = Object.values(ACHIEVEMENTS)
                  .flat()
                  .find(a => a.id === achievementId);
                return (
                  <div key={achievementId} className="text-sm">
                    {achievement.title} - {achievement.description}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Event Dialog */}
        {gameState.currentEvent && (
          <AlertDialog open={true}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{gameState.currentEvent.title}</AlertDialogTitle>
                <AlertDialogDescription>
                  {gameState.currentEvent.description}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col space-y-2">
                {gameState.currentEvent.choices.map((choice, index) => (
                  <AlertDialogAction
                    key={index}
                    onClick={() => handleEventChoice(choice, index === 0)}
                    className="w-full"
                  >
                    {choice.text}
                  </AlertDialogAction>
                ))}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {/* Achievement Notification */}
        {showAchievement && (
          <div className="fixed bottom-4 right-4 bg-[#FFD700] p-4 rounded shadow-lg">
            <div className="font-bold">{showAchievement.title}</div>
            <div className="text-sm">{showAchievement.description}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;