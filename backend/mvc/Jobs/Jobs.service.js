const db = require("../../_helpers/db");

module.exports = {
  getJobListingService,
  postJobListingService,
  getJobListingByIdService,
  updateJobListingService,
  deleteJobListingService,
  getJobListingByUserIdService,
};

async function getJobListingService(req, res) {
  try {
    const jobListings = await db.JobListing.findAll();
    res.status(200).send(jobListings);
  } catch (error) {
    res.status(500).json("Error retrieving job listings");
  }
}

async function postJobListingService(req, res) {
  const {
    jobTitle,
    jobType,
    description,
    requirements,
    salary,
    location,
    postDate,
    expiryDate,
    contactNo,
    userId,
  } = req.body;
  try {
    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const newJobListing = await db.JobListing.create({
      jobTitle,
      jobType,
      description,
      requirements,
      salary,
      location,
      postDate,
      expiryDate,
      contactNo,
      userId,
    });
    res.status(200).json("Job listing posted successfully");
  } catch (error) {
    res.status(500).json("Error creating job listing");
  }
}

async function getJobListingByIdService(req, res) {
  const { id } = req.params;
  try {
    const jobListing = await db.JobListing.findByPk(id);
    if (!jobListing) {
      return res.status(404).json("Job listing not found");
    }
    res.status(200).send(jobListing);
  } catch (error) {
    res.status(500).json("Error retrieving job listing");
  }
}

async function updateJobListingService(req, res) {
  const { id } = req.params;
  const {
    jobTitle,
    jobType,
    description,
    requirements,
    salary,
    location,
    postDate,
    expiryDate,
    contactNo,
  } = req.body;
  try {
    const jobListing = await db.JobListing.findByPk(id);
    if (!jobListing) {
      return res.status(404).json("Job listing not found");
    }

    await jobListing.update({
      jobTitle,
      jobType,
      description,
      requirements,
      salary,
      location,
      postDate,
      expiryDate,
      contactNo,
    });
    res.status(200).json("Job listing updated successfully");
  } catch (error) {
    res.status(500).json("Error updating job listing");
  }
}

async function deleteJobListingService(req, res) {
  const { id } = req.params;
  try {
    const jobListing = await db.JobListing.findByPk(id);
    if (!jobListing) {
      return res.status(404).json("Job listing not found");
    }

    await jobListing.destroy();
    res.status(200).json("Job listing deleted successfully");
  } catch (error) {
    res.status(500).json("Error deleting job listing");
  }
}

async function getJobListingByUserIdService(req, res) {
  const { userId } = req.params;
  try {
    const jobListings = await db.JobListing.findAll({ where: { userId } });
    res.status(200).send(jobListings);
  } catch (error) {
    res.status(500).json("Error retrieving job listings for user");
  }
}
