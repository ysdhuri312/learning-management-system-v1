/** @format */

import { clerkClient, getAuth } from '@clerk/express';
import { v2 as cloudinary } from 'cloudinary';
import Course from '../models/course.model.js';
import Purchase from '../models/purchase.model.js';
import { uploadFromBuffer } from '../utils/imageUploader.js';

// update role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = getAuth(req);

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: 'educator',
      },
    });

    res.json({ success: true, message: 'You can publish a course now' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Add New Course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;

    const imageFile = req.file;
    const educatorId = getAuth(req);

    if (!imageFile || !imageFile.buffer) {
      return res.json({ success: false, message: 'Invalid image file' });
    }

    const parsedCourseData = await JSON.parse(courseData);
    parsedCourseData.educator = educatorId;

    const imageUpload = await uploadFromBuffer(imageFile.buffer);

    console.log('FILE:', imageFile); //codered
    console.log('PATH:', imageFile?.path); //codered
    console.log('BUFFER:', imageFile?.buffer); //codered

    const newCourse = await Course.create({
      ...parsedCourseData,
      courseThumbnail: imageUpload.secure_url,
    });

    res.json({ success: true, message: 'Course Added' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Educator Courses
export const getEducatorCourses = async (req, res) => {
  try {
    const educator = getAuth(req);

    const courses = await Course.find({ educator });

    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Educator Dashboard Data ( Total Earning, Enrolled Students, No. of Courses)
export const educatorDashboardData = async (req, res) => {
  try {
    const educator = getAuth(req);

    const courses = await Course.find({ educator });

    const totalCourses = courses.length;

    const courseIds = courses.map((course) => course._id);

    // Calculate total earnings from purchases
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: 'completed',
    });

    const totalEarnings = purchases.reduce(
      (sum, purchase) => sum + purchase.amount,
      0,
    );

    // Collect unique enrolled student IDs with their course titles
    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        {
          _id: { $in: course.enrolledStudents },
        },
        'name imageUrl',
      );

      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        enrolledStudentsData,
        totalCourses,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Enrolled Students Data with Purchase Data
export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educator = getAuth(req);

    // Fetch all courses created by the educator
    const courses = await Course.find({ educator });

    // Get the list of course IDs
    const courseIds = courses.map((course) => course._id);

    // Fetch purchases with user and course data
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: 'completed',
    })
      .populate('userId', 'name imageUrl')
      .populate('courseId', 'courseTitle');

    // enrolled students data
    const enrolledStudents = purchases.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt,
    }));

    res.json({
      success: true,
      enrolledStudents,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
