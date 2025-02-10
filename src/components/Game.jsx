import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

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
    }
  });

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

  // Game tick - handles passive resource generation
  useEffect(() => {
    const gameLoop = setInterval(() => {
      const currentTime = Date.now();
      const delta = (currentTime - gameState.lastTick) / 1000;
      
      setGameState(prev => {
        const baseInfluenceGain = prev.supporters * 0.1 * delta;
        const supporterGain = Math.floor(prev.resources * 0.01 * delta);
        
        return {
          ...prev,
          influence: prev.influence + baseInfluenceGain,
          supporters: prev.supporters + supporterGain,
          lastTick: currentTime
        };
      });
    }, 1000);

    return () => clearInterval(gameLoop);
  }, []);

  // Game actions
  const actions = {
    holdSpeech: () => {
      if (gameState.resources >= 10) {
        setGameState(prev => ({
          ...prev,
          influence: prev.influence + 25,
          resources: prev.resources - 10
        }));
      }
    },
    
    organizeRally: () => {
      if (gameState.resources >= 50 && gameState.unlocks.rallies) {
        setGameState(prev => ({
          ...prev,
          influence: prev.influence + 150,
          supporters: prev.supporters + 10,
          resources: prev.resources - 50
        }));
      }
    },
    
    spreadPropaganda: () => {
      if (gameState.resources >= 100 && gameState.unlocks.propaganda) {
        setGameState(prev => ({
          ...prev,
          influence: prev.influence + 500,
          supporters: prev.supporters + 50,
          resources: prev.resources - 100
        }));
      }
    }
  };

  // Check for phase progression
  useEffect(() => {
    const currentPhase = PHASES[gameState.phase];
    if (currentPhase.nextPhase && 
        gameState.influence >= currentPhase.requirement.influence) {
      setGameState(prev => ({
        ...prev,
        phase: currentPhase.nextPhase,
        unlocks: {
          ...prev.unlocks,
          rallies: currentPhase.nextPhase === 'regionalInfluence' ? true : prev.unlocks.rallies,
          propaganda: currentPhase.nextPhase === 'nationalPresence' ? true : prev.unlocks.propaganda,
          militaryContacts: currentPhase.nextPhase === 'powerConsolidation' ? true : prev.unlocks.militaryContacts,
        }
      }));
    }
  }, [gameState.influence, gameState.phase]);

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
        </Card>
      </div>
    </div>
  );
};

export default Game;