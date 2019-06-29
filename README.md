# Conway's Game of Life in nodejs

[![CircleCI](https://circleci.com/gh/0x646e78/gameoflife-js/tree/master.svg?style=svg)](https://circleci.com/gh/0x646e78/gameoflife-js/tree/master)
[![Known Vulnerabilities](https://snyk.io/test/github/0x646e78/gameoflife-js/badge.svg?style=plastic)](https://snyk.io/test/github/0x646e78/gameoflife-js) 

## My upcoming Q's.

- Best way to add a new package (local npm install and then save line to packages?)
- Package management, upgrades etc.
- Best ways to run from cli (via babel as a module I assume)

## The Rules of Life

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

## Setup

    npm install

## Testing

    npm run test

    npm run test:watch

