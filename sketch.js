let Sun; // Vektor posisi matahari
let Sun_D = 1391400; // Diameter matahari (km)
let theta = 0; // Position controller
let wscale; // Scaling ratio - Canvas Width : Neptune's Orbital diameter
let zoom = 0.5; // skala luas (perbesar/perkecil)
let warp = 1; // skala waktu
let pause = false;

function setup() {
  createCanvas(1600, 800);
  background('black');
  wscale = width / (5540 * 2) * zoom;

  // Matahari
  Sun = new Planet(["Sun", Sun_D / 100, 0, 0, 0, color('orange')]);
  Sun.x = width / 2;
  Sun.y = height / 2;

  // Planet
  Mercury = new Planet(["Mercury", 4880, 69.8, 46, 88, color('grey')]);
  Venus = new Planet(["Venus", 12104, 108.9, 107.5, 225, color('pink')]);
  Earth = new Planet(["Earth", 12742, 152.1, 147.1, 365, color('darkblue')]);
  Mars = new Planet(["Mars", 6780, 249.2, 206.7, 687, color('red')]);
  Jupiter = new Planet(["Jupiter", 139822, 816.6, 740.5, 4333, color('white')]);
  Saturn = new Planet(["Saturn", 116464, 1514.5, 1352.5, 10759, color('gold')]);
  Uranus = new Planet(["Uranus", 50724, 3008, 2742, 30689, color('aqua')]);
  Neptune = new Planet(["Neptune", 49244, 4540, 4460, 60182, color('blue')]);

}

function draw() {
  if (pause) {
    // Tidak ada perintah, animasi akan berhenti dengan cara di klik dan sebaliknya saat klik lagi
  } else {
    background('black');
    Sun.show();

    // Rotasi Planet
    theta = theta + 0.01 * warp;

    Mercury.move(theta);
    Venus.move(theta);
    Earth.move(theta);
    Mars.move(theta);
    Jupiter.move(theta);
    Saturn.move(theta);
    Uranus.move(theta);
    Neptune.move(theta);

  }

}

function mousePressed() {
  if (pause) {
    pause = false
  } else {
    pause = true
  }
}

class Planet {
  constructor(traits) {
    this.name = traits[0]; // Placeholder
    this.D = traits[1] / 2000 * zoom; // Diameter rata-rata planet(km)
    this.rx = traits[2] * wscale; // Aphelion = Titik orbit terjauh dari matahari(Gm)
    this.ry = traits[3] * wscale; // Perihelion = Titik orbit terjauh dari matahari
    this.P = traits[4] / 365 * 2 * PI; // Periode orbit = Relatif terhadap periode bumi
    this.color = traits[5];
    this.x = 0; // Position dalam ruang (x, y)
    this.y = 0;
  }
  update(angle) {
    this.x = Sun.x + this.rx * cos(2 * PI / this.P * angle);
    this.y = Sun.y + this.ry * sin(2 * PI / this.P * angle);
  }
  show() {
    noFill();
    stroke(this.color);  // Warna Orbit
    strokeWeight(2);
    ellipse(Sun.x, Sun.y, 2 * this.rx, 2 * this.ry);  // Gambar orbit
    fill(this.color);  // Planet color
    circle(this.x, this.y, this.D);  // Gambar planet
  }
  move(angle) {
    this.update(angle);
    this.show();
  }
}