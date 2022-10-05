import type { Challenge } from '../types.js';

interface Node {
  a?: Node;
  b?: Node;
}

const input: Node = {
  a: {
    a: { a: { a: {}, b: { a: {}, b: { a: { a: {}, b: {} }, b: {} } } }, b: {} },
    b: {
      a: {
        a: {},
        b: { a: {}, b: { a: { a: {}, b: { a: {}, b: {} } }, b: {} } },
      },
      b: { a: {}, b: {} },
    },
  },
  b: {
    a: {},
    b: {
      a: {
        a: {},
        b: {
          a: {},
          b: {
            a: {},
            b: {
              a: {},
              b: {
                a: {},
                b: {
                  a: {},
                  b: {
                    a: {
                      a: {
                        a: {
                          a: {},
                          b: { a: {}, b: { a: { a: {}, b: {} }, b: {} } },
                        },
                        b: {},
                      },
                      b: {
                        a: {
                          a: {},
                          b: {
                            a: {},
                            b: { a: { a: {}, b: { a: {}, b: {} } }, b: {} },
                          },
                        },
                        b: { a: {}, b: {} },
                      },
                    },
                    b: {
                      a: {},
                      b: {
                        a: {
                          a: {},
                          b: {
                            a: {},
                            b: {
                              a: {},
                              b: { a: {}, b: { a: {}, b: { a: {}, b: {} } } },
                            },
                          },
                        },
                        b: { a: {}, b: {} },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      b: { a: {}, b: {} },
    },
  },
};

const challenge: Challenge<[node: Node], number> = {
  title: 'Binary Tree',
  description:
    "Write a function to count the total number of nodes in a binary tree. The tree will be a JavaScript object, which denotes child nodes via 'a' and 'b' fields.",
  example: {
    input: [{ a: {}, b: { a: {}, b: {} } }],
    output: 5,
  },
  assertions: [
    {
      input: [{}],
      output: 1,
    },
    {
      input: [{ a: {} }],
      output: 2,
    },
    {
      input: [{ a: {}, b: { a: {}, b: {} } }],
      output: 5,
    },
    {
      input: [input],
      output: 93,
    },
  ],
};

export default challenge;
