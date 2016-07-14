const scatter = () => {
  return [
    {
      name: 'steve',
      x: 4,
      y: 2
    },
    {
      name: 'earl',
      x: 6,
      y: 12
    },
    {
      name: 'jimi',
      x: 8,
      y: 7
    }
  ];
}

const bullet = () => {
  return [
    {
      id: 'USA',
      target: 16,
      actual: 17,
      range: 13
    }
  ];
}

const column = () => {
  return [
    {
      name: 'steve',
      freq1: 12,
      freq2: 10
      // freq3: 14
    },
    {
      name: 'earl',
      freq1: 9,
      freq2: 13
      // freq3: 15
    },
    {
      name: 'jimi',
      freq1: 15,
      freq2: 12
      // freq3: 6
    }
  ];
}

const nut = () => {
  return [
    {
      name: 'gomez',
      population: 74
    },
    {
      name: 'wong po',
      population: 88
    },
    {
      name: 'barret',
      population: 34
    }
  ];
}

const line = () => {
  return [
    {
      date: '2016-03-01',
      usa: 7
      // chn: 4,
      // ger: 9
    },
    {
      date: '2016-04-15',
      usa: 3
      // chn: 11,
      // ger: 8
    },
    {
      date: '2016-05-31',
      usa: 10
      // chn: 9,
      // ger: 7
    }
  ];
}

export { scatter, column, line, bullet, nut };
