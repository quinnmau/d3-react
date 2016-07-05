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

const column = () => {
  return [
    {
      name: 'steve',
      freq1: 12,
      freq2: 10,
      freq3: 14
    },
    {
      name: 'earl',
      freq1: 9,
      freq2: 13,
      freq3: 15
    },
    {
      name: 'jimi',
      freq1: 15,
      freq2: 12,
      freq3: 6
    }
  ];
}

const line = () => {
  return [
    {
      date: '2016-03-01',
      usa: 7,
      chn: 4
    },
    {
      date: '2016-03-15',
      usa: 5,
      chn: 11
    },
    {
      date: '2016-03-31',
      usa: 10,
      chn: 9
    }
  ];
}

export { scatter, column, line };
