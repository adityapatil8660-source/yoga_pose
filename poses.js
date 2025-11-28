// Yoga Poses Database
const yogaPoses = {
    mountain: {
        name: "Mountain Pose",
        sanskrit: "Tadasana",
        description: "Mountain Pose is the foundation for all standing poses. It involves standing with feet together, weight evenly distributed, and body aligned from head to toe.",
        benefits: [
            "Improves posture and body awareness",
            "Strengthens thighs, knees, and ankles",
            "Firms abdomen and buttocks",
            "Relieves sciatica",
            "Reduces flat feet"
        ],
        instructions: [
            "Stand with feet together, heels slightly apart",
            "Distribute your weight evenly across both feet",
            "Engage your thigh muscles and lift your kneecaps",
            "Draw your shoulder blades back and down",
            "Keep arms at your sides with palms facing forward",
            "Hold for 30 seconds to 1 minute"
        ],
        difficulty: "Beginner",
        category: "Standing"
    },
    tree: {
        name: "Tree Pose",
        sanskrit: "Vrikshasana",
        description: "Tree Pose is a balancing pose that strengthens the legs and core while improving focus and concentration.",
        benefits: [
            "Improves balance and stability",
            "Strengthens thighs, calves, ankles, and spine",
            "Stretches the groin and inner thighs",
            "Improves focus and concentration",
            "Relieves sciatica and reduces flat feet"
        ],
        instructions: [
            "Begin in Mountain Pose",
            "Shift your weight onto your left foot",
            "Bend your right knee and place the sole of your right foot on your inner left thigh",
            "Press your foot into your thigh and your thigh into your foot",
            "Bring your hands to prayer position at your chest or extend them overhead",
            "Hold for 30 seconds to 1 minute, then switch sides"
        ],
        difficulty: "Beginner",
        category: "Standing Balance"
    },
    warrior1: {
        name: "Warrior I",
        sanskrit: "Virabhadrasana I",
        description: "Warrior I is a standing pose that builds strength and stamina. It stretches the chest, lungs, shoulders, and groin while strengthening the legs.",
        benefits: [
            "Strengthens shoulders, arms, and back muscles",
            "Strengthens and stretches thighs and calves",
            "Stretches chest, lungs, and shoulders",
            "Improves focus, balance, and stability",
            "Stimulates abdominal organs"
        ],
        instructions: [
            "From Mountain Pose, step your left foot back 3-4 feet",
            "Turn your left foot out at a 45-degree angle",
            "Bend your right knee to 90 degrees, keeping it over your ankle",
            "Square your hips to the front of the mat",
            "Raise your arms overhead, palms facing each other",
            "Hold for 30 seconds to 1 minute, then switch sides"
        ],
        difficulty: "Beginner",
        category: "Standing"
    },
    warrior2: {
        name: "Warrior II",
        sanskrit: "Virabhadrasana II",
        description: "Warrior II improves strength, stability, and concentration. It opens the hips and chest while building stamina.",
        benefits: [
            "Strengthens and stretches legs and ankles",
            "Stretches groins, chest, and shoulders",
            "Stimulates abdominal organs",
            "Increases stamina",
            "Improves balance and concentration"
        ],
        instructions: [
            "From Mountain Pose, step your feet wide apart",
            "Turn your right foot out 90 degrees and left foot in slightly",
            "Bend your right knee to 90 degrees",
            "Extend your arms out to the sides, parallel to the floor",
            "Gaze over your right fingertips",
            "Hold for 30 seconds to 1 minute, then switch sides"
        ],
        difficulty: "Beginner",
        category: "Standing"
    },
    downwardDog: {
        name: "Downward-Facing Dog",
        sanskrit: "Adho Mukha Svanasana",
        description: "Downward Dog is a foundational yoga pose that energizes and rejuvenates the entire body. It stretches the hamstrings, calves, and spine while building strength in the arms and legs.",
        benefits: [
            "Calms the brain and relieves stress",
            "Energizes the body",
            "Stretches shoulders, hamstrings, calves, and hands",
            "Strengthens arms and legs",
            "Relieves headache, insomnia, and fatigue"
        ],
        instructions: [
            "Start on your hands and knees",
            "Align your wrists under your shoulders and knees under your hips",
            "Tuck your toes and lift your hips up and back",
            "Straighten your legs and press your heels toward the floor",
            "Press firmly through your palms and rotate your arms",
            "Hold for 1-3 minutes"
        ],
        difficulty: "Beginner",
        category: "Inversion"
    },
    plank: {
        name: "Plank Pose",
        sanskrit: "Phalakasana",
        description: "Plank Pose builds strength in the core, arms, wrists, and spine. It's an excellent pose for building overall body strength.",
        benefits: [
            "Strengthens arms, wrists, and spine",
            "Tones the abdominal muscles",
            "Builds endurance and stamina",
            "Improves posture",
            "Prepares the body for more challenging poses"
        ],
        instructions: [
            "Start in Downward Dog",
            "Shift forward until your shoulders are over your wrists",
            "Keep your body in a straight line from head to heels",
            "Engage your core and thighs",
            "Press firmly through your palms",
            "Hold for 30 seconds to 2 minutes"
        ],
        difficulty: "Beginner",
        category: "Arm Balance"
    },
    child: {
        name: "Child's Pose",
        sanskrit: "Balasana",
        description: "Child's Pose is a gentle resting pose that calms the mind and relieves stress and fatigue. It gently stretches the hips, thighs, and ankles.",
        benefits: [
            "Gently stretches hips, thighs, and ankles",
            "Calms the brain and relieves stress",
            "Relieves back and neck pain",
            "Encourages steady, conscious breathing",
            "Promotes feelings of security and calm"
        ],
        instructions: [
            "Kneel on the floor with big toes touching",
            "Sit back on your heels",
            "Separate your knees about hip-width apart",
            "Exhale and lay your torso between your thighs",
            "Extend your arms forward or rest them alongside your body",
            "Hold for 30 seconds to several minutes"
        ],
        difficulty: "Beginner",
        category: "Resting"
    },
    cobra: {
        name: "Cobra Pose",
        sanskrit: "Bhujangasana",
        description: "Cobra Pose is a gentle backbend that strengthens the spine and stretches the chest, lungs, and abdomen.",
        benefits: [
            "Strengthens the spine",
            "Stretches chest, shoulders, and abdomen",
            "Firms the buttocks",
            "Stimulates abdominal organs",
            "Relieves stress and fatigue"
        ],
        instructions: [
            "Lie on your stomach with legs extended",
            "Place your palms on the floor under your shoulders",
            "Press your hips and thighs into the floor",
            "Inhale and straighten your arms to lift your chest",
            "Draw your shoulders back and down",
            "Hold for 15-30 seconds"
        ],
        difficulty: "Beginner",
        category: "Backbend"
    },
    triangle: {
        name: "Triangle Pose",
        sanskrit: "Trikonasana",
        description: "Triangle Pose is a standing pose that stretches and strengthens the entire body while improving physical and mental equilibrium.",
        benefits: [
            "Strengthens legs, knees, and ankles",
            "Stretches hips, groins, hamstrings, and calves",
            "Opens chest and shoulders",
            "Stimulates abdominal organs",
            "Relieves stress and improves digestion"
        ],
        instructions: [
            "Stand with feet wide apart",
            "Turn your right foot out 90 degrees",
            "Extend your arms out to the sides",
            "Reach your right hand toward your right foot",
            "Place your right hand on your shin, ankle, or the floor",
            "Extend your left arm toward the ceiling",
            "Hold for 30 seconds to 1 minute, then switch sides"
        ],
        difficulty: "Beginner",
        category: "Standing"
    },
    bridge: {
        name: "Bridge Pose",
        sanskrit: "Setu Bandha Sarvangasana",
        description: "Bridge Pose is a backbend and inversion that stretches the chest, neck, and spine while strengthening the back and legs.",
        benefits: [
            "Stretches chest, neck, and spine",
            "Strengthens back, buttocks, and hamstrings",
            "Improves circulation",
            "Calms the brain and reduces stress",
            "Stimulates abdominal organs and lungs"
        ],
        instructions: [
            "Lie on your back with knees bent and feet hip-width apart",
            "Place your arms alongside your body, palms down",
            "Press your feet and arms into the floor",
            "Lift your hips toward the ceiling",
            "Interlace your fingers under your back",
            "Hold for 30 seconds to 1 minute"
        ],
        difficulty: "Beginner",
        category: "Backbend"
    },
    unknown: {
        name: "Unknown Pose",
        sanskrit: "---",
        description: "The pose could not be identified with sufficient confidence. Please try uploading a clearer image with the full body visible.",
        benefits: [
            "Try uploading a different image for better results"
        ],
        instructions: [
            "Ensure the full body is visible in the image",
            "Use good lighting",
            "Make sure the pose is clearly defined",
            "Try a front or side view of the pose"
        ],
        difficulty: "---",
        category: "---"
    }
};
