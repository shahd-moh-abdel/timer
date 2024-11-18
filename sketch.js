import { fruits } from "./main.js";
const Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies;

let engine;
let world;
const BALL_SIZE = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textAlign(CENTER, CENTER);

  // create engine and world
  engine = Engine.create();
  world = engine.world;

  // create walls
  let walls = [
    Bodies.rectangle(width / 2, height, width, 50, { isStatic: true }), // Bottom wall
    Bodies.rectangle(0, height / 2, 50, height, { isStatic: true }), // Left wall
    Bodies.rectangle(width, height / 2, 50, height, { isStatic: true }), // Right wall
    Bodies.rectangle(width / 2, 0, width, 50, { isStatic: true }), // Top wall
  ];

  // add the walls to the world
  World.add(world, walls);
}

export class Fruit {
  constructor() {
    this.x = Math.random() * width;
    this.y = 0;
    this.ball = Bodies.circle(this.x, this.y, BALL_SIZE / 2, {
      restitution: 0.8,
      friction: 0.5,
      density: 0.1,
      render: {
        fillStyle: "red",
      },
    });
    World.add(world, this.ball);
  }

  update() {
    this.x = this.ball.position.x;
    this.y = this.ball.position.y;
  }

  draw() {
    push();
    fill(255, 0, 0);
    ellipse(this.x, this.y, BALL_SIZE, BALL_SIZE);
    pop();
  }
}

function draw() {
  background(30, 30, 50);

  Engine.update(engine);

  //draw fruits
  for (let fruit of fruits) {
    fruit.draw();
    fruit.update();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// ensure these are attached to the window object for p5.js
window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
