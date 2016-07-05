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
      val: 7
    },
    {
      date: '2016-03-15',
      val: 5
    },
    {
      date: '2016-03-31',
      val: 10
    }
  ];
}

export { scatter, column, line };