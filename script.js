const bodies = [
    "SUN",
    "MERCURY",
    "VENUS",
    "EARTH",
    "MARS",
    "JUPITER",
    "SATURN",
    "URANUS",
    "NEPTUNE"
];

const planetData = {
    SUN: {
        image: "assets/sun.webp",
        gravity: 274.0,
        atmosphereNote: "The Sun has a plasma atmosphere composed primarily of hydrogen and helium. Its photosphere, chromosphere, and corona have different physical conditions."
    },

    MERCURY: {
        image: "assets/mercury.png",
        gravity: 3.70,
        atmosphereNote: "Mercury has an extremely thin exosphere containing oxygen, sodium, hydrogen, helium, and potassium. Its composition varies with location and time."
    },

    VENUS: {
        image: "assets/venus.png",
        gravity: 8.87,
        atmosphere: {
            CarbonDioxide: 96.5,
            Nitrogen: 3.5
        }
    },

    EARTH: {
        image: "assets/earth.png",
        gravity: 9.81,
        atmosphere: {
            Nitrogen: 78.08,
            Oxygen: 20.95,
            Other: 0.97
        }
    },

    MARS: {
        image: "assets/mars.png",
        gravity: 3.71,
        atmosphere: {
            CarbonDioxide: 95.3,
            Nitrogen: 2.7,
            Argon: 1.6,
            Other: 0.4
        }
    },

    JUPITER: {
        image: "assets/jupiter.png",
        gravity: 24.79,
        atmosphere: {
            Hydrogen: 90,
            Helium: 10
        }
    },

    SATURN: {
        image: "assets/saturn.png",
        gravity: 10.44,
        atmosphere: {
            Hydrogen: 96,
            Helium: 3,
            Methane: 0.4,
            Other: 0.6
        }
    },

    URANUS: {
        image: "assets/uranus.png",
        gravity: 8.59,
        atmosphere: {
            Hydrogen: 82.5,
            Helium: 15.2,
            Methane: 2.3
        }
    },

    NEPTUNE: {
        image: "assets/neptune.png",
        gravity: 11.15,
        atmosphere: {
            Hydrogen: 80,
            Helium: 18,
            Methane: 2
        }
    }
};

const colors = [
    "#a9bfdc",
    "#6889b3",
    "#d9e1ee",
    "#9c789e"
]

const planetImage = document.querySelector("#planetImage");
const navigation = document.querySelector("#planetNavigation");
const selectedPlanet = document.querySelector("#selectedPlanet");
const atmosphereButton = document.querySelector("#atmosphereButton");
const atmosphereDialog = document.querySelector("#atmosphereDialog");
const closeAtmosphere = document.querySelector("#closeAtmosphere");
const atmosphereTitle = document.querySelector("#atmosphereTitle");
const atmosphereInfo = document.querySelector("#atmosphereInfo");
const atmospherePie = document.querySelector("#atmospherePie");
const pieReveal = document.querySelector("#pieReveal");
const atmosphereLegend = document.querySelector("#atmosphereLegend");
const gravityButton = document.querySelector("#gravityButton");
const gravityDialog = document.querySelector("#gravityDialog");
const closeGravity = document.querySelector("#closeGravity");
const gravityTitle = document.querySelector("#gravityTitle");
const gravitySimulation = document.querySelector("#gravitySimulation");
const gravityBall = document.querySelector("#gravityBall");
const dropBall = document.querySelector("#dropBall");
const resetBall = document.querySelector("#resetBall");
const gravityInfo = document.querySelector("#gravityInfo");


let currentPlanet = "SUN";

for (const body of bodies) {
    const item = document.createElement("div");
    item.classList.add("planet-item");

    const button = document.createElement("button");
    button.classList.add("planet-button");
    button.setAttribute("aria-label", body);

    const span = document.createElement("span");
    span.classList.add("planet-label");
    span.textContent = body;

    if (body === "SUN") {
        button.classList.add("sun-button", "active");
    }

    item.appendChild(button);
    item.appendChild(span);
    navigation.appendChild(item);
    button.addEventListener("click", function() {
        if (isTransitioning || body === currentPlanet) {
            return;
        }

        selectedPlanet.textContent = body;

        for (const planetButton of planetButtons) {
            planetButton.classList.remove("active");
        }

        button.classList.add("active");

        currentPlanet = body;
        changePlanet(body);

    });
}

let isTransitioning = false;

function changePlanet(body) {
    resetGravityBall();
    isTransitioning = true;
    planetImage.classList.add("fade-out");

    setTimeout(function() {
        planetImage.src= planetData[body].image;
        planetImage.alt = body;

        planetImage.classList.toggle("saturn-image", body === "SATURN");
        planetImage.classList.toggle("sun-image", body === "SUN");

        planetImage.classList.remove("fade-out");
        planetImage.classList.add("fade-in-start");

        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                planetImage.classList.remove("fade-in-start");
            });
        });
        setTimeout(function() {
            isTransitioning = false;
        }, 400);
    }, 400);
}
const counters = [];

atmosphereButton.addEventListener("click", function() {

    const counters = [];

    const currentBody = selectedPlanet.textContent;
    const atmosphere = planetData[currentBody].atmosphere;

    atmosphereTitle.textContent = `${currentBody} — ATMOSPHERE`;

    atmosphereInfo.innerHTML = "";

    if (!atmosphere) {
        pieReveal.style.display = "none";
        atmosphereLegend.style.display = "none";

        atmosphereInfo.textContent = planetData[currentBody].atmosphereNote;
    } else {
        pieReveal.style.display = "block";
        atmosphereLegend.style.display = "flex";

        let gradientParts = [];
        let currentPercentage = 0;

        let colorIndex = 0;
        atmosphereLegend.innerHTML = "";

        for (const [gas, percentage] of Object.entries(atmosphere)) {
            const start = currentPercentage;
            const end = start + percentage;

            gradientParts.push(
                `${colors[colorIndex]} ${start}% ${end}%`
            );

            currentPercentage = end;
            const legendItem = document.createElement("div");
            legendItem.classList.add("legend-item");

            const colorDot = document.createElement("span");
            colorDot.classList.add("legend-dot");
            colorDot.style.backgroundColor = colors[colorIndex];

            const gasName = document.createElement("span");
            gasName.textContent = gas;

            legendItem.appendChild(colorDot);
            legendItem.appendChild(gasName);

            atmosphereLegend.appendChild(legendItem);
            colorIndex++;
        }

        const gradient = `conic-gradient(${gradientParts.join(", ")})`;

        atmospherePie.style.background = gradient;

        for (const [gas, percentage] of Object.entries(atmosphere)) {
            const gasElement = document.createElement("div");
            gasElement.classList.add("gas-row");

            const gasLabel = document.createElement("p");

            const gasName = document.createElement("span");
            gasName.textContent = `${gas}: `;

            const gasValue = document.createElement("span");
            gasValue.textContent = "0.00%"

            counters.push({
                element: gasValue,
                target: percentage
            });

            gasLabel.appendChild(gasName);
            gasLabel.appendChild(gasValue);

            const barBackground = document.createElement("div");
            barBackground.classList.add("bar-background");

            const barFill = document.createElement("div");
            barFill.classList.add("bar-fill");

            barBackground.appendChild(barFill);
            gasElement.appendChild(gasLabel);
            gasElement.appendChild(barBackground);
            atmosphereInfo.appendChild(gasElement);

            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    barFill.style.width = `${percentage}%`;
                });
            });
        }
    }

    const hiddenMask = "conic-gradient(black 0% 0%, transparent 0% 100%)";

    pieReveal.style.mask = hiddenMask;
    pieReveal.style.webkitMask = hiddenMask;

    atmosphereDialog.showModal();
    if (atmosphere) {
        animateRing();
        animateCounters(counters);
    }
});

closeAtmosphere.addEventListener("click", function() {
    atmosphereDialog.close();
});

let gravityAnimationId = null;
let isDragging = false;
let ballHasLanded = false;

gravityButton.addEventListener("click", function() {
    gravityTitle.textContent = `${selectedPlanet.textContent} — GRAVITY`;
    const currentBody = selectedPlanet.textContent;
    gravityInfo.textContent = `Gravitational acceleration: ${planetData[currentBody].gravity} m/s²`;
    gravityDialog.showModal();
});

closeGravity.addEventListener("click", function () {
    gravityDialog.close();
});

dropBall.addEventListener("click", function() {
    if (gravityAnimationId !== null || isDragging || ballHasLanded) {
        return;
    }

    animateGravity();
});

resetBall.addEventListener("click", resetGravityBall);

gravityBall.addEventListener("pointerdown", function(event) {
    if (gravityAnimationId !== null) {
        return;
    }
    isDragging = true;
    ballHasLanded = false;
    gravityBall.setPointerCapture(event.pointerId);
});

gravityBall.addEventListener("pointerup", function() {
    isDragging = false;
});

gravityBall.addEventListener("pointercancel", function() {
    isDragging = false;
});

gravityBall.addEventListener("pointermove", function(event) {
    if (!isDragging) {
        return;
    }

    const rect = gravitySimulation.getBoundingClientRect();

    const mouseY = event.clientY - rect.top;
    const ballRadius = gravityBall.offsetHeight / 2;
    const newPosition = mouseY - ballRadius;
    const groundPosition = gravitySimulation.clientHeight - 15 - 2 - gravityBall.offsetHeight;
    const finalPosition = Math.max(
        10,
        Math.min(newPosition, groundPosition)
    );
    gravityBall.style.top = `${finalPosition}px`;
});

const planetButtons = document.querySelectorAll(".planet-button");

function animateCounters(counters) {
    const duration = 1000;
    let startTime = null;

    function frame(timestamp) {
        if (startTime === null) {
            startTime = timestamp;
        }

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        for (const counter of counters) {
            const currentValue = counter.target * easedProgress;

            counter.element.textContent = 
                `${currentValue.toFixed(2)}%`
        }

        if (progress < 1) {
            requestAnimationFrame(frame);
        }
    }

    requestAnimationFrame(frame);
}

function animateRing() {
    const duration = 1000;
    let startTime = null;

    function frame(timestamp) {
        if (startTime === null) {
            startTime = timestamp;
        }

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const percentage = easedProgress * 100;

        const revealMask = `conic-gradient(
            black 0% ${percentage}%,
            transparent ${percentage}% 100%
        )`;

        pieReveal.style.mask = revealMask
        pieReveal.style.webkitMask = revealMask;

        if (progress < 1) {
            requestAnimationFrame(frame);
        }
    }

    

    requestAnimationFrame(frame);
}

function resetGravityBall () {
    if (gravityAnimationId !== null) {
        cancelAnimationFrame(gravityAnimationId);
        gravityAnimationId = null;
    }
    ballHasLanded = false;
    isDragging = false;
    gravityBall.style.top = "20px";
}

function animateGravity () {
    let startTime = null;
    const currentBody = selectedPlanet.textContent;
    const gravity = planetData[currentBody].gravity;
    const startingPosition = parseFloat(getComputedStyle(gravityBall).top)
    function frame(timestamp) {
        if (startTime === null) {
            startTime = timestamp;
        }

        const elapsed = (timestamp - startTime) / 1000;
        console.log(elapsed);

        
        const distance = ((gravity) * (elapsed ** 2)) / 2;
        const pixelsPerMeter = 30;
        const pixelDistance = distance * pixelsPerMeter;
        const newPosition = startingPosition + pixelDistance;
        const simulationHeight = gravitySimulation.clientHeight;
        const ballHeight = gravityBall.offsetHeight;
        const groundPosition = simulationHeight - 15 - 2 - ballHeight;

        const finalPosition = Math.min(newPosition, groundPosition);

        gravityBall.style.top = `${finalPosition}px`;

        if (newPosition < groundPosition) {
            gravityAnimationId = requestAnimationFrame(frame);
        } 
        else {
            gravityAnimationId = null;
            ballHasLanded = true;
        }

        gravityBall.style.top = `${finalPosition}px`;
        console.log(distance);

    }
    gravityAnimationId = requestAnimationFrame(frame);
}

