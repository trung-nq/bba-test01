const createCharacters = () => {
    const characters = [
        { name: "bob", level: 40, health: 1200 },
        { name: "charlie", level: 100, health: 3600 },
        { name: "dave", level: 20, health: 40 },
        { name: "jack", level: 20, health: 20 }
      ];

      const characterObjects = characters.map(character => {
        return {
            name: character.name.toUpperCase(),
            level: character.level *2,
            health: character.health * 3
        };
      });

      console.log(characterObjects);

      const possibleWinners = characterObjects.filter(character => character.health > 1000);

      console.log(possibleWinners);
    }

createCharacters();

const player = [{name: "bob", score: 1500}, {name: "charlie", score: 3000}, {name: "dave", score: 500}, {name: "jack", score: 200}];
const medals = ["🥇", "🥈", "🥉"];

const printLeaderBoard = () => {
    player.sort((a,b) => b.score - a.score);
    player.forEach((player, index) => {
        let medal = medals[index] || '';
        console.log(`${medal}  ${index + 1}. ${player.name} - ${player.score}`);
    });
}

printLeaderBoard();



