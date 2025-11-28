// DOM Elements
const uploadZone = document.getElementById('uploadZone');
const uploadButton = document.getElementById('uploadButton');
const imageInput = document.getElementById('imageInput');
const analysisSection = document.getElementById('analysisSection');
const uploadedImage = document.getElementById('uploadedImage');
const poseCanvas = document.getElementById('poseCanvas');
const loadingOverlay = document.getElementById('loadingOverlay');

// Result elements
const poseName = document.getElementById('poseName');
const poseSanskrit = document.getElementById('poseSanskrit');
const poseDescription = document.getElementById('poseDescription');
const benefitsList = document.getElementById('benefitsList');
const instructionsList = document.getElementById('instructionsList');
const poseDifficulty = document.getElementById('poseDifficulty');
const poseCategory = document.getElementById('poseCategory');
const confidenceValue = document.getElementById('confidenceValue');

// MediaPipe Pose instance
let pose;
let canvasCtx;

// Initialize MediaPipe Pose
function initializePose() {
    pose = new Pose({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }
    });

    pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    pose.onResults(onPoseResults);
}

// Upload zone event listeners
uploadZone.addEventListener('click', () => imageInput.click());
uploadButton.addEventListener('click', (e) => {
    e.stopPropagation();
    imageInput.click();
});

imageInput.addEventListener('change', handleImageUpload);

// Drag and drop handlers
uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
});

uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('drag-over');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
        handleImageFile(files[0]);
    }
});

// Handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        handleImageFile(file);
    }
}

function handleImageFile(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
        uploadedImage.src = e.target.result;
        uploadedImage.onload = () => {
            // Show analysis section
            analysisSection.classList.add('active');
            analysisSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Show loading state
            loadingOverlay.classList.add('active');

            // Setup canvas
            setupCanvas();

            // Process image with MediaPipe
            processPoseDetection();
        };
    };

    reader.readAsDataURL(file);
}

// Setup canvas to match image size
function setupCanvas() {
    const imgRect = uploadedImage.getBoundingClientRect();
    poseCanvas.width = uploadedImage.naturalWidth;
    poseCanvas.height = uploadedImage.naturalHeight;
    canvasCtx = poseCanvas.getContext('2d');
}

// Process pose detection
async function processPoseDetection() {
    if (!pose) {
        initializePose();
    }

    await pose.send({ image: uploadedImage });
}

// Handle pose detection results
function onPoseResults(results) {
    // Clear canvas
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, poseCanvas.width, poseCanvas.height);

    if (results.poseLandmarks) {
        // Draw pose landmarks
        drawPoseLandmarks(results.poseLandmarks);

        // Classify pose
        const detectedPose = classifyPose(results.poseLandmarks);

        // Display results
        displayPoseInformation(detectedPose);
    } else {
        // No pose detected
        displayPoseInformation({
            poseKey: 'unknown',
            confidence: 0
        });
    }

    canvasCtx.restore();

    // Hide loading overlay
    loadingOverlay.classList.remove('active');
}

// Draw pose landmarks and connections
function drawPoseLandmarks(landmarks) {
    const connections = [
        [11, 12], [11, 13], [13, 15], [12, 14], [14, 16], // Arms
        [11, 23], [12, 24], [23, 24], // Torso
        [23, 25], [25, 27], [27, 29], [29, 31], // Left leg
        [24, 26], [26, 28], [28, 30], [30, 32], // Right leg
        [0, 1], [1, 2], [2, 3], [3, 7], // Face
        [0, 4], [4, 5], [5, 6], [6, 8]  // Face
    ];

    // Draw connections
    canvasCtx.strokeStyle = '#8b5cf6';
    canvasCtx.lineWidth = 4;

    connections.forEach(([start, end]) => {
        const startPoint = landmarks[start];
        const endPoint = landmarks[end];

        if (startPoint && endPoint) {
            canvasCtx.beginPath();
            canvasCtx.moveTo(startPoint.x * poseCanvas.width, startPoint.y * poseCanvas.height);
            canvasCtx.lineTo(endPoint.x * poseCanvas.width, endPoint.y * poseCanvas.height);
            canvasCtx.stroke();
        }
    });

    // Draw landmarks
    landmarks.forEach((landmark, index) => {
        if (index > 10) { // Skip face landmarks for cleaner visualization
            canvasCtx.beginPath();
            canvasCtx.arc(
                landmark.x * poseCanvas.width,
                landmark.y * poseCanvas.height,
                6,
                0,
                2 * Math.PI
            );
            canvasCtx.fillStyle = '#a78bfa';
            canvasCtx.fill();
            canvasCtx.strokeStyle = '#ffffff';
            canvasCtx.lineWidth = 2;
            canvasCtx.stroke();
        }
    });
}

// Classify yoga pose based on landmarks
function classifyPose(landmarks) {
    const poses = [];

    // Calculate various body angles and positions
    const leftElbowAngle = calculateAngle(landmarks[11], landmarks[13], landmarks[15]);
    const rightElbowAngle = calculateAngle(landmarks[12], landmarks[14], landmarks[16]);
    const leftKneeAngle = calculateAngle(landmarks[23], landmarks[25], landmarks[27]);
    const rightKneeAngle = calculateAngle(landmarks[24], landmarks[26], landmarks[28]);
    const leftHipAngle = calculateAngle(landmarks[11], landmarks[23], landmarks[25]);
    const rightHipAngle = calculateAngle(landmarks[12], landmarks[24], landmarks[26]);

    // Get vertical positions
    const leftAnkleY = landmarks[27].y;
    const rightAnkleY = landmarks[28].y;
    const leftKneeY = landmarks[25].y;
    const rightKneeY = landmarks[26].y;
    const hipY = (landmarks[23].y + landmarks[24].y) / 2;
    const shoulderY = (landmarks[11].y + landmarks[12].y) / 2;
    const leftWristY = landmarks[15].y;
    const rightWristY = landmarks[16].y;

    // Horizontal positions
    const leftAnkleX = landmarks[27].x;
    const rightAnkleX = landmarks[28].x;
    const hipX = (landmarks[23].x + landmarks[24].x) / 2;

    // Check for Tree Pose - one leg bent, other straight, arms up
    if (Math.abs(leftKneeAngle - rightKneeAngle) > 60) {
        const bentKnee = leftKneeAngle < rightKneeAngle ? leftKneeAngle : rightKneeAngle;
        const straightKnee = leftKneeAngle > rightKneeAngle ? leftKneeAngle : rightKneeAngle;

        if (bentKnee < 100 && straightKnee > 160 && leftWristY < shoulderY && rightWristY < shoulderY) {
            poses.push({ poseKey: 'tree', confidence: 0.85 });
        }
    }

    // Check for Warrior I - front knee bent, back leg straight, arms up
    if ((leftKneeAngle < 110 && rightKneeAngle > 150) || (rightKneeAngle < 110 && leftKneeAngle > 150)) {
        if (leftWristY < shoulderY && rightWristY < shoulderY) {
            poses.push({ poseKey: 'warrior1', confidence: 0.80 });
        }
    }

    // Check for Warrior II - similar to Warrior I but arms extended sideways
    if ((leftKneeAngle < 110 && rightKneeAngle > 150) || (rightKneeAngle < 110 && leftKneeAngle > 150)) {
        if (Math.abs(leftWristY - shoulderY) < 0.1 && Math.abs(rightWristY - shoulderY) < 0.1) {
            poses.push({ poseKey: 'warrior2', confidence: 0.82 });
        }
    }

    // Check for Downward Dog - hips higher than shoulders, hands and feet on ground
    if (hipY < shoulderY - 0.1 && leftWristY > shoulderY && rightWristY > shoulderY) {
        poses.push({ poseKey: 'downwardDog', confidence: 0.78 });
    }

    // Check for Plank - body in straight line, arms extended
    if (Math.abs(shoulderY - hipY) < 0.15 && leftElbowAngle > 160 && rightElbowAngle > 160) {
        if (hipY < leftAnkleY - 0.2 && hipY < rightAnkleY - 0.2) {
            poses.push({ poseKey: 'plank', confidence: 0.75 });
        }
    }

    // Check for Mountain Pose - standing straight, arms at sides or raised
    if (leftKneeAngle > 160 && rightKneeAngle > 160 && Math.abs(leftAnkleX - rightAnkleX) < 0.2) {
        if (Math.abs(hipX - ((leftAnkleX + rightAnkleX) / 2)) < 0.1) {
            poses.push({ poseKey: 'mountain', confidence: 0.70 });
        }
    }

    // Check for Child's Pose - knees bent, torso low, hips back
    if (hipY > shoulderY && leftKneeAngle < 90 && rightKneeAngle < 90) {
        poses.push({ poseKey: 'child', confidence: 0.72 });
    }

    // Check for Cobra - lying down, arms pushing up chest
    if (hipY > shoulderY - 0.1 && leftElbowAngle > 120 && rightElbowAngle > 120) {
        if (leftAnkleY > hipY) {
            poses.push({ poseKey: 'cobra', confidence: 0.68 });
        }
    }

    // Check for Triangle - standing, one arm up, one arm down
    if ((leftWristY < shoulderY - 0.2 && rightWristY > hipY) || (rightWristY < shoulderY - 0.2 && leftWristY > hipY)) {
        if (leftKneeAngle > 160 && rightKneeAngle > 160) {
            poses.push({ poseKey: 'triangle', confidence: 0.73 });
        }
    }

    // Check for Bridge - lying on back, hips elevated
    if (hipY < shoulderY && hipY < leftKneeY && hipY < rightKneeY) {
        if (leftKneeAngle > 80 && leftKneeAngle < 120) {
            poses.push({ poseKey: 'bridge', confidence: 0.70 });
        }
    }

    // Return best match or unknown
    if (poses.length > 0) {
        poses.sort((a, b) => b.confidence - a.confidence);
        return poses[0];
    }

    return { poseKey: 'unknown', confidence: 0 };
}

// Calculate angle between three points
function calculateAngle(point1, point2, point3) {
    const radians = Math.atan2(point3.y - point2.y, point3.x - point2.x) -
        Math.atan2(point1.y - point2.y, point1.x - point2.x);
    let angle = Math.abs(radians * 180.0 / Math.PI);

    if (angle > 180.0) {
        angle = 360.0 - angle;
    }

    return angle;
}

// Display pose information
function displayPoseInformation(detectedPose) {
    const poseData = yogaPoses[detectedPose.poseKey];

    // Update pose name and sanskrit
    poseName.textContent = poseData.name;
    poseSanskrit.textContent = poseData.sanskrit;

    // Update confidence
    const confidencePercent = Math.round(detectedPose.confidence * 100);
    confidenceValue.textContent = `${confidencePercent}%`;

    // Update description
    poseDescription.textContent = poseData.description;

    // Update benefits
    benefitsList.innerHTML = '';
    poseData.benefits.forEach(benefit => {
        const li = document.createElement('li');
        li.textContent = benefit;
        benefitsList.appendChild(li);
    });

    // Update instructions
    instructionsList.innerHTML = '';
    poseData.instructions.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction;
        instructionsList.appendChild(li);
    });

    // Update metadata
    poseDifficulty.textContent = poseData.difficulty;
    poseCategory.textContent = poseData.category;
}

// Initialize pose detection on page load
initializePose();
