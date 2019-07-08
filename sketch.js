function getTanFromDegrees(degrees) {
  return Math.tan((degrees * Math.PI) / 180);
}

function setup() {
  //Constant Variables:
  const wide = window.innerWidth;
  const high = window.innerHeight;
  const multiplier = (high + wide) / 2;
  const anglePlay = 5; //variation in degrees from axes TBD
  const angleOffset = random(5); //offset axes TBD
  const colorVariation = 90;
  const childVariation = 60;
  const limit = 9; // specifies number of parent lines produced
  const perpendicular = true; //true if want perpendicular pattern, false if only horizontal

  //Random Variables
  let rgb1 = floor(random(256));
  let rgb2 = floor(random(256));
  let rgb3 = floor(random(256));
  let rgb1c1 = rgb1 + floor(random(-1 * colorVariation, colorVariation));
  let rgb2c1 = rgb2 + floor(random(-1 * colorVariation, colorVariation));
  let rgb3c1 = rgb3 + floor(random(-1 * colorVariation, colorVariation));
  let rgb1c2 = rgb1c1 + floor(random(-1 * colorVariation, colorVariation));
  let rgb2c2 = rgb2c1 + floor(random(-1 * colorVariation, colorVariation));
  let rgb3c2 = rgb3c1 + floor(random(-1 * colorVariation, colorVariation));
  let rgb21 = floor(random(256));
  let rgb22 = floor(random(256));
  let rgb23 = floor(random(256));
  let rgb21c1 = rgb21 + floor(random(-1 * colorVariation, colorVariation));
  let rgb22c1 = rgb22 + floor(random(-1 * colorVariation, colorVariation));
  let rgb23c1 = rgb23 + floor(random(-1 * colorVariation, colorVariation));
  let rgb21c2 = rgb21c1 + floor(random(-1 * colorVariation, colorVariation));
  let rgb22c2 = rgb22c1 + floor(random(-1 * colorVariation, colorVariation));
  let rgb23c2 = rgb23c1 + floor(random(-1 * colorVariation, colorVariation));
  let textrgb1 = 0;
  let textrgb2 = 0;
  let textrgb3 = 0;
  if (random() < 0.5) {
    textrgb1 = rgb1;
    textrgb2 = rgb2;
    textrgb3 = rgb3;
  } else {
    textrgb1 = rgb21;
    textrgb2 = rgb22;
    textrgb3 = rgb23;
  }

  //create canvas and background
  createCanvas(wide, high);
  background(0);
  fullscreen();

  // generate point for empty space
  const e1 = random(wide * (1 / 4), wide * (9 / 16)) + 260; // x
  const e2 = random(high * (3 / 16), high * (3 / 4)) + 40; // y

  // write text in open space

  /* TITLE */

  //set size
  textSize(60);
  //set color
  stroke(textrgb1, textrgb2, textrgb3);
  fill(textrgb1, textrgb2, textrgb3);
  //Set Font
  textFont("Georgia");
  //Draw Text
  text("Sam Parsons", e1 - 20 * "Sam Parsons".length, e2 - 100); // x shift due to string length, but y shift is arbitrary

  /* SUBTEXT */
  //set size
  textSize(20);
  //set color
  stroke(textrgb1, textrgb2, textrgb3);
  fill(rgb21, rgb22, rgb23);
  //Set Font
  textFont("Georgia");
  textStyle(ITALIC);
  //Draw Text
  text("creativity through code", e1 - 150, e2 - 65); // x shift due to string length, but y shift is arbitrary

  // keeps track of how many lines are drawn
  let index = 0;

  // line creation loop
  while (index < limit) {
    //vertical or horizontal with set degrees play
    let angle = random(anglePlay / 2) + angleOffset;
    let width = 100; //set to anything
    let height = width * getTanFromDegrees(angle);
    //50% chance flip across x-axis
    if (random() < 0.5) {
      height = -1 * height;
    }

    //move up 90 degrees, left or right of y-axis
    if (perpendicular && random() < 0.5) {
      let temp = height;
      height = width;
      if (random() < 0.5) {
        width = temp;
      } else {
        width = temp * -1;
      }
    }
    const slope = height / width;
    let x1 = random(wide);
    let y1 = random(high);

    const offset = y1 - slope * x1;

    // coordinates at right end of plane
    let x2 = wide * 2;
    let y2 = slope * x2 + offset;

    // coordinates at the left of plane
    let x3 = -wide;
    let y3 = slope * x3 + offset;

    // computations to see if lines and spaces interconnect
    const sameX = slope * e1 + offset;
    const sameY = (e2 - offset) / slope;
    const thresh = multiplier * 0.25;

    // if the coordinates of both points are not within a given distance
    // of the empty space coordinates
    if (abs(e1 - x1) < thresh && abs(e2 - y1) < thresh) {
    } else if (abs(e2 - sameX) < thresh) {
    } else if (abs(e1 - sameY) < thresh) {
    } else {
      let colorFlag = random();
      if (colorFlag < 0.5) {
        stroke(rgb1, rgb2, rgb3);
        fill(rgb1, rgb2, rgb3);
      } else {
        stroke(rgb21, rgb22, rgb23);
        fill(rgb21, rgb22, rgb23);
      }
      let strokeTemp = random(multiplier * 0.003, multiplier * 0.012);
      if (slope > 0) {
        quad(
          x3 - strokeTemp,
          y3 + strokeTemp,
          x2 - strokeTemp,
          y2 + strokeTemp,
          x2 + strokeTemp,
          y2 - strokeTemp,
          x3 + strokeTemp,
          y3 - strokeTemp
        );
      } else {
        quad(
          x3 - strokeTemp,
          y3 - strokeTemp,
          x2 - strokeTemp,
          y2 - strokeTemp,
          x2 + strokeTemp,
          y2 + strokeTemp,
          x3 + strokeTemp,
          y3 + strokeTemp
        );
      }

      // generate multiple lines 20% of the time
      const temp = floor(random(10));
      if (temp == 0) {
        x1 += childVariation;
        y1 += childVariation;
        x2 += childVariation;
        y2 += childVariation;
        x3 += childVariation;
        y3 += childVariation;
        if (colorFlag < 0.5) {
          stroke(rgb1c1, rgb2c1, rgb3c1);
          fill(rgb1c1, rgb2c1, rgb3c1);
        } else {
          stroke(rgb21c1, rgb22c1, rgb23c1);
          fill(rgb21c1, rgb22c1, rgb23c1);
        }
        strokeTemp = strokeTemp / 2;
        if (slope > 0) {
          quad(
            x3 - strokeTemp,
            y3 + strokeTemp,
            x2 - strokeTemp,
            y2 + strokeTemp,
            x2 + strokeTemp,
            y2 - strokeTemp,
            x3 + strokeTemp,
            y3 - strokeTemp
          );
        } else {
          quad(
            x3 - strokeTemp,
            y3 - strokeTemp,
            x2 - strokeTemp,
            y2 - strokeTemp,
            x2 + strokeTemp,
            y2 + strokeTemp,
            x3 + strokeTemp,
            y3 + strokeTemp
          );
        }
        index++;
        x1 += childVariation;
        y1 += childVariation;
        x2 += childVariation;
        y2 += childVariation;
        x3 += childVariation;
        y3 += childVariation;
        if (colorFlag < 0.5) {
          stroke(rgb1c2, rgb2c2, rgb3c2);
          fill(rgb1c2, rgb2c2, rgb3c2);
        } else {
          stroke(rgb21c2, rgb22c2, rgb23c2);
          fill(rgb21c2, rgb22c2, rgb23c2);
        }
        strokeTemp = (strokeTemp * 2) / 3;
        if (slope > 0) {
          quad(
            x3 - strokeTemp,
            y3 + strokeTemp,
            x2 - strokeTemp,
            y2 + strokeTemp,
            x2 + strokeTemp,
            y2 - strokeTemp,
            x3 + strokeTemp,
            y3 - strokeTemp
          );
        } else {
          quad(
            x3 - strokeTemp,
            y3 - strokeTemp,
            x2 - strokeTemp,
            y2 - strokeTemp,
            x2 + strokeTemp,
            y2 + strokeTemp,
            x3 + strokeTemp,
            y3 + strokeTemp
          );
        }
      } else if (temp == 1) {
        x1 += childVariation;
        y1 += childVariation;
        x2 += childVariation;
        y2 += childVariation;
        x3 += childVariation;
        y3 += childVariation;
        if (colorFlag < 0.5) {
          stroke(rgb1c1, rgb2c1, rgb3c1);
          fill(rgb1c1, rgb2c1, rgb3c1);
        } else {
          stroke(rgb21c1, rgb22c1, rgb23c1);
          fill(rgb21c1, rgb22c1, rgb23c1);
        }
        strokeTemp = strokeTemp / 2;
        if (slope > 0) {
          quad(
            x3 - strokeTemp,
            y3 + strokeTemp,
            x2 - strokeTemp,
            y2 + strokeTemp,
            x2 + strokeTemp,
            y2 - strokeTemp,
            x3 + strokeTemp,
            y3 - strokeTemp
          );
        } else {
          quad(
            x3 - strokeTemp,
            y3 - strokeTemp,
            x2 - strokeTemp,
            y2 - strokeTemp,
            x2 + strokeTemp,
            y2 + strokeTemp,
            x3 + strokeTemp,
            y3 + strokeTemp
          );
        }
      }
      index++;
    }
  }
}

function draw() {}
