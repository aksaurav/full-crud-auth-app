import Mission from "../Models/missionModel.js";

// Handle Launch new MISSION
export const handleLaunchMission = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return (
        res.status(400),
        json({ message: `All the fields are required for this mission` })
      );
    }

    // create new mission
    const mission = await Mission.create({
      title,
      description,
      author: req.user._id,
    });

    // Response
    res
      .status(201)
      .json({ message: `Your new mission has began. Best of Luck!`, mission });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to start the mission`, error: error.message });
  }
};

// See the Mission
export const handleGetMissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const mission = await Mission.findById(id);

    if (!mission) {
      return res
        .status(401)
        .json({ message: `Failed to get the mission. Try again!` });
    }

    // Mission has been found
    res.status(200).json(mission);
  } catch (error) {
    res.status(500).json({ message: `Failed to get the mission. ` });
  }
};

// Update the mission
export const handleUpdateMission = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedMission = await Mission.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true },
    );

    if (!updatedMission) {
      return res.status(404).json({ message: `Mission not found` });
    }

    res.status(200).json({ message: `Mission updated `, updatedMission });
  } catch (error) {
    res.status(500).json({
      message: `Failed to update the mission, Try again!`,
      error: error.message,
    });
  }
};

// Abort the mission
export const handleDeleteMission = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMission = await Mission.findByIdAndDelete(id);

    if (!deleteMission) {
      return res.status(404).json({ message: `Mission not found` });
    }

    res.status(200).json({ message: `Mission abort successfully` });
  } catch (error) {
    res.status(500).json({ message: `Error while aborting the mission` });
  }
};

export const handleGetMission = async (req, res) => {
  try {
    const missions = await Mission.find({ author: req.user.id })
      .populate("author", "username, lastName")
      .sort("-createdAt");
    res.status(200).json(missions);
  } catch (error) {
    console.error("Error fetching missions:", error.message);
    res
      .status(500)
      .json({ message: "Server Error: Could not retrieve mission data" });
  }
};
