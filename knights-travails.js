const allPositions = new Map();
const Position = (x_coord, y_coord) => {
  const x = x_coord;
  const y = y_coord;
  let previous = undefined;
  const getPrevious = () => previous;
  const setPrevious = (p) => {
    previous = previous || p;
  };
  const name = () => `${x}, ${y}`;
  let possibleDestinations = [
    [x + 1, y + 2],
    [x + 1, y - 2],
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x - 1, y + 2],
    [x - 1, y - 2],
    [x - 2, y + 1],
    [x - 2, y - 1],
  ];
  const destinations = () => {
    return possibleDestinations
      .filter((pos) => pos[0] >= 0 && pos[1] >= 0 && pos[0] < 8 && pos[1] < 8)
      .map((pos) => Position(pos[0], pos[1]));
  };
  if (allPositions.has(name())) return allPositions.get(name());
  else {
    node = { name, setPrevious, getPrevious, destinations };
    allPositions.set(name(), node);
    return node;
  }
};

const knightTravails = (start, end) => {
  if (start[0] < 0 || end[0] < 0 || start[1] >= 8 || end[1] >= 8) return;
  allPositions.clear();
  const origin = Position(...start);
  const target = Position(...end);

  const queue = [origin];
  while (!queue.includes(target)) {
    const currentPos = queue.shift();
    const destinations = currentPos.destinations();
    destinations.map((destination) => destination.setPrevious(currentPos));
    queue.push(...destinations);
  }
  const path = [target];
  while (!path.includes(origin)) {
    const previous = path[0].getPrevious();
    path.unshift(previous);
  }
  console.log(`The shortest path was ${path.length - 1} moves!`);
  console.log("The moves were:");
  path.forEach((coords) => {
    console.log(coords.name());
  });
};
