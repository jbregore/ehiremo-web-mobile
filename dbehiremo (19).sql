-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 21, 2022 at 03:48 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbehiremo`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_appointments`
--

CREATE TABLE `tbl_appointments` (
  `id` int(11) NOT NULL,
  `client_id` varchar(100) NOT NULL,
  `freelancer_id` varchar(100) NOT NULL,
  `jobpost_id` int(11) NOT NULL,
  `proj_desc` text NOT NULL,
  `proj_cost` varchar(100) NOT NULL,
  `proj_addr` varchar(200) NOT NULL,
  `start_date` varchar(100) NOT NULL,
  `end_date` varchar(100) NOT NULL,
  `service` text NOT NULL,
  `created_at` varchar(100) NOT NULL,
  `c_status` varchar(100) NOT NULL,
  `f_status` varchar(100) NOT NULL,
  `c_rating` varchar(100) NOT NULL,
  `f_rating` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_appointments`
--

INSERT INTO `tbl_appointments` (`id`, `client_id`, `freelancer_id`, `jobpost_id`, `proj_desc`, `proj_cost`, `proj_addr`, `start_date`, `end_date`, `service`, `created_at`, `c_status`, `f_status`, `c_rating`, `f_rating`) VALUES
(67, 'k325asb325avctrrxeij7iic', 'kwkrfdwu53xvfu3vi8e', 19, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odit numquam error, deleniti quae autem officia. Voluptates modi nisi delectus dignissimos, expedita atque eveniet asperiores minima ipsam ut ipsa at?', '1000', 'Pulilan Bulacan ', '1/15/2022', '1/29/2022', 'Web Developer, UI Designer', '2022-01-15 00:49:05', 'done', 'done', '2.5', '4'),
(69, 'k325asb325avctrrxeij7iic', 'kwkrfdwu53xvfu3vi8e', 53, 'Sample description test', '231', 'Sample Location Test', '01/26/2022', '01/29/2022', 'samp,test', '2022-01-26 19:51:00', '', '', '', ''),
(70, 'k325asb325avctrrxeij7iic', 'kwkrfdwu53xvfu3xvi8e', 54, 'Asdas', '21321', 'Asdsa', '01/26/2022', '01/29/2022', '213', '2022-01-26 19:51:32', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_fbphoto`
--

CREATE TABLE `tbl_fbphoto` (
  `id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `fb_photos` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_fbphoto`
--

INSERT INTO `tbl_fbphoto` (`id`, `appointment_id`, `fb_photos`) VALUES
(79, 67, 'http://192.168.42.241/ehiremo/backend/uploads/feedback_photos/61e1ab0a4b17a7.13709692.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_feedbacks`
--

CREATE TABLE `tbl_feedbacks` (
  `id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `fb_from` varchar(100) NOT NULL,
  `fb_to` varchar(100) NOT NULL,
  `fb_comment` text NOT NULL,
  `fb_star` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_feedbacks`
--

INSERT INTO `tbl_feedbacks` (`id`, `appointment_id`, `fb_from`, `fb_to`, `fb_comment`, `fb_star`) VALUES
(93, 49, 'kwkrfdwu53xvfu3xvi8e', 'ksv879bhg5sd2wtr2sxeij7i01', 'thanks', '3.6'),
(94, 49, 'ksv879bhg5sd2wtr2sxeij7i01', 'kwkrfdwu53xvfu3xvi8e', '3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore', '4.6'),
(95, 50, 'k325asb325avctrrxeij7iic', 'kwkrfdwu53xvfu3vi8e', '2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore', '4'),
(96, 50, 'kwkrfdwu53xvfu3vi8e', 'k325asb325avctrrxeij7iic', 'nice to work with you', '3.8'),
(97, 51, 'ksvlaw8sd2wtr2sxeij7iic', 'kwk2xwu53xvfu3xvi8e', '1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore', '4.6'),
(98, 51, 'kwk2xwu53xvfu3xvi8e', 'ksvlaw8sd2wtr2sxeij7iic', 'thank you sir', '4.6'),
(123, 67, 'k325asb325avctrrxeij7iic', 'kwkrfdwu53xvfu3vi8e', 'goodjob joshua taas slpmo', '2.5'),
(124, 67, 'kwkrfdwu53xvfu3vi8e', 'k325asb325avctrrxeij7iic', 'thanks ms marian', '4');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_jobs`
--

CREATE TABLE `tbl_jobs` (
  `id` int(11) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `job_headline` varchar(50) NOT NULL,
  `job_location` varchar(50) NOT NULL,
  `job_services` varchar(200) NOT NULL,
  `job_age_range` varchar(50) NOT NULL,
  `job_scope` varchar(50) NOT NULL,
  `job_rate_desc` varchar(50) NOT NULL,
  `job_rate` varchar(50) NOT NULL,
  `job_desc` text NOT NULL,
  `job_createdAt` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_jobs`
--

INSERT INTO `tbl_jobs` (`id`, `user_id`, `job_headline`, `job_location`, `job_services`, `job_age_range`, `job_scope`, `job_rate_desc`, `job_rate`, `job_desc`, `job_createdAt`, `status`) VALUES
(13, 'ksvlawe2wtrrxeij7iic', 'Creative Design', 'Pulilan Bulacan', 'Graphic Designer', '18-45 years old', 'Small', 'Fixed Rate', 'Php 1,500', 'Hi! I\'m Mika and I am looking for a Graphic artist. I am looking for my third transaction. Check out my profile to see how good client I am. Don\'t hesitate to message me.', '2021-11-26 17:03:44', ''),
(14, 'ksvlaweg23wtrrxeij7iic', 'Programmer', 'Baliuag Bulacan', 'Programmer,Developer,Analyst', '18-41 years old', 'Medium', 'Fixed Rate', 'Php 10,000', 'Hello guys! I\'m Hello Mickey and I need a programmer. I am looking for my second transaction. Check out my profile for more info. Don\'t hesitate to message me.', '2021-11-26 18:05:44', ''),
(15, 'ksvlawe2wtr2sxeij7iic', 'Delivery Rider', 'Pulilan Bulacan', 'Deliveries', '18-50 years old', 'Small', 'Fixed Rate', 'Php 1,000', 'Hola! I\'m Tom Esguerra and I am looking for a delivery rider that will get my parcel from Pulilan to Manila. I am looking for my third tranasction. Check out my profile for more info. Don\'t hesitate to message me.', '2021-11-26 19:06:44', ''),
(16, 'ksvlaw8sd2wtr2sxeij7iic', 'Massage Therapist', 'Plaridel Bulacan', 'Massage,Home Service', '18-25 years old', 'Small', 'Fixed Rate', 'Php 1,000', 'Hello! I\'m Johny Bakay and I am looking for a massage therapist near my house at Plaridel, Bulacan. I am recently having back ache and I can\'t take it anymore. I need a therapist ASAP. Don\'t hesitate to message me.', '2021-11-26 20:02:44', ''),
(17, 'ksvl235sd2wtr2sxeij7iic', 'Photographer', 'Pulilan Bulacan', 'Photographer', '20-30 years old', 'Small', 'Fixed Rate', 'Php 5,000', 'Hola! I\'m Arvin Santos and I am looking for a photographer in my debut celebration. I am willing to pay a good rate. Check out my profile for more info and see how my previous customers love my work! Don\'t hesitate to message me.', '2021-11-27 17:02:44', ''),
(18, 'ksvlaw325avctrrxeij7iic', 'Headline 1 ', 'Pulilan Bulacan 1', '1 Service, 1 Service', '18-50 years old', 'Small 1', 'Fixed Rate 1', 'Php 10,000 1', '1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odit numquam error, deleniti quae autem officia. Voluptates modi nisi delectus dignissimos, expedita atque eveniet asperiores minima ipsam ut ipsa at?', '2021-11-27 18:02:44', ''),
(19, 'k325asb325avctrrxeij7iic', 'Lets go web dev', 'Pulilan Bulacan ', 'Web Developer, UI Designer', '18-50 years old ', 'Small ', 'Fixed Rate ', 'Php 10,000 ', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odit numquam error, deleniti quae autem officia. Voluptates modi nisi delectus dignissimos, expedita atque eveniet asperiores minima ipsam ut ipsa at?', '2021-11-27 19:02:44', 'occupied'),
(20, 'ksv879bhg5sd2wtr2sxeij7iic', 'Headline 3 ', 'Pulilan Bulacan 3', '3 Service, 3 Service', '18-50 years old 3', 'Small 3', 'Fixed Rate 3', 'Php 10,000 3', '3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odit numquam error, deleniti quae autem officia. Voluptates modi nisi delectus dignissimos, expedita atque eveniet asperiores minima ipsam ut ipsa at?', '2021-11-28 17:09:44', ''),
(21, 'ksvlaw325avctrrxei54saiic', 'Headline 4', 'Pulilan Bulacan 4', '4 Service, 4 Service', '18-50 years old 4', 'Small 4', 'Fixed Rate 4', 'Php 10,000 4', '4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odit numquam error, deleniti quae autem officia. Voluptates modi nisi delectus dignissimos, expedita atque eveniet asperiores minima ipsam ut ipsa at?', '2021-11-28 18:08:44', ''),
(22, 'ksv879bhg5sd2wtr2sxeij7i01', 'Headline 5', 'Pulilan Bulacan 5', '50 Service, 5 Service, 5 Service, 5 Service', '18-50 years old 5', 'Small 5', 'Fixed Rate 5', 'Php 10,000 5', '5 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odit numquam error, deleniti quae autem officia. Voluptates modi nisi delectus dignissimos, expedita atque eveniet asperiores minima ipsam ut ipsa at?', '2021-11-28 19:02:44', ''),
(53, 'k325asb325avctrrxeij7iic', 'Sample headline test', 'Sample Location Test', 'samp,test', '18-20 sample test', 'Large', 'Fixed Rate', 'Sample rate test', 'Sample description test', '2022-01-15 00:42:31', 'occupied'),
(54, 'k325asb325avctrrxeij7iic', 'Asds', 'Asdsa', '213', 'dsa', 'Small', 'Hourly Rate', 'Asdas', 'Asdas', '2022-01-26 19:51:13', 'occupied');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_messages`
--

CREATE TABLE `tbl_messages` (
  `id` int(11) NOT NULL,
  `incoming_msg_id` varchar(100) NOT NULL,
  `outcoming_msg_id` varchar(100) NOT NULL,
  `msg` text NOT NULL,
  `created_at` varchar(100) NOT NULL,
  `msg_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_messages`
--

INSERT INTO `tbl_messages` (`id`, `incoming_msg_id`, `outcoming_msg_id`, `msg`, `created_at`, `msg_status`) VALUES
(128, 'kwkrfdwu53xvfu3vi8e', 'k325asb325avctrrxeij7iic', 'hi joshua', '2022-01-15 00:46:24', 0),
(129, 'k325asb325avctrrxeij7iic', 'kwkrfdwu53xvfu3vi8e', 'hello miss marian', '2022-01-15 00:47:32', 1),
(130, 'kwkrfdwu53xvfu3vi8e', 'k325asb325avctrrxeij7iic', 'work ka tara', '2022-01-15 00:47:54', 0),
(131, 'k325asb325avctrrxeij7iic', 'kwkrfdwu53xvfu3vi8e', 'g lesgow', '2022-01-15 00:48:20', 1),
(132, 'kwkrfdwu53xvfu3vi8e', 'k325asb325avctrrxeij7iic', 'tara set na kita appointment', '2022-01-15 00:48:45', 0),
(133, 'k325asb325avctrrxeij7iic', 'kwkrfdwu53xvfu3vi8e', 'heyyy', '2022-01-15 10:07:11', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notification`
--

CREATE TABLE `tbl_notification` (
  `notif_id` int(11) NOT NULL,
  `notif_text` text NOT NULL,
  `notif_id_from` varchar(100) NOT NULL,
  `notif_id_to` varchar(100) NOT NULL,
  `created_at` varchar(100) NOT NULL,
  `notif_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_notification`
--

INSERT INTO `tbl_notification` (`notif_id`, `notif_text`, `notif_id_from`, `notif_id_to`, `created_at`, `notif_status`) VALUES
(192, 'wants to applied for the job Lets go web dev', 'kwkrfdwu53xvfu3vi8e', 'k325asb325avctrrxeij7iic', '2022-01-15 00:30:17', 0),
(193, 'wants to applied for the job Massage Therapist', 'kwkrfdwu53xvfu3vi8e', 'ksvlaw8sd2wtr2sxeij7iic', '2022-01-15 00:30:20', 0),
(194, 'You set an appointment with this freelancer.', 'kwkrfdwu53xvfu3vi8e', 'k325asb325avctrrxeij7iic', '2022-01-15 00:49:05', 0),
(195, 'Set an appointment with you.', 'k325asb325avctrrxeij7iic', 'kwkrfdwu53xvfu3vi8e', '2022-01-15 00:49:05', 0),
(196, 'wants to mark this appointment done Lets go web dev', 'k325asb325avctrrxeij7iic', 'kwkrfdwu53xvfu3vi8e', '2022-01-15 00:55:39', 0),
(197, 'Appointment Lets go web devhas been finished.', 'kwkrfdwu53xvfu3vi8e', 'k325asb325avctrrxeij7iic', '2022-01-15 00:56:11', 0),
(198, 'Appointment Lets go web devhas been finished.', 'k325asb325avctrrxeij7iic', 'kwkrfdwu53xvfu3vi8e', '2022-01-15 00:56:11', 0),
(199, 'You set an appointment with this freelancer.', 'kwkrfdwu53xvfu3vi8e', 'k325asb325avctrrxeij7iic', '2022-01-15 10:12:08', 0),
(200, 'Set an appointment with you.', 'k325asb325avctrrxeij7iic', 'kwkrfdwu53xvfu3vi8e', '2022-01-15 10:12:08', 0),
(201, 'wants to cancel the appointment Sample headline test', 'k325asb325avctrrxeij7iic', 'kwkrfdwu53xvfu3vi8e', '2022-01-15 10:12:44', 0),
(202, 'wants to cancel the appointment Sample headline test', 'kwkrfdwu53xvfu3vi8e', 'k325asb325avctrrxeij7iic', '2022-01-15 10:13:02', 0),
(203, 'Set an appointment with you.', 'k325asb325avctrrxeij7iic', 'kwkrfdwu53xvfu3vi8e', '2022-01-26 19:51:00', 0),
(204, 'You set an appointment with this freelancer.', 'kwkrfdwu53xvfu3vi8e', 'k325asb325avctrrxeij7iic', '2022-01-26 19:51:00', 0),
(205, 'Set an appointment with you.', 'k325asb325avctrrxeij7iic', 'kwkrfdwu53xvfu3xvi8e', '2022-01-26 19:51:32', 1),
(206, 'You set an appointment with this freelancer.', 'kwkrfdwu53xvfu3xvi8e', 'k325asb325avctrrxeij7iic', '2022-01-26 19:51:32', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_proposals`
--

CREATE TABLE `tbl_proposals` (
  `id` int(11) NOT NULL,
  `job_post_id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `created_at` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_proposals`
--

INSERT INTO `tbl_proposals` (`id`, `job_post_id`, `user_id`, `created_at`) VALUES
(90, 19, 'kwkrfdwu53xvfu3vi8e', '2022-01-15 00:30:17'),
(91, 16, 'kwkrfdwu53xvfu3vi8e', '2022-01-15 00:30:20');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_saved_freelancers`
--

CREATE TABLE `tbl_saved_freelancers` (
  `id` int(11) NOT NULL,
  `client_id` varchar(200) NOT NULL,
  `freelancer_id` varchar(200) NOT NULL,
  `created_at` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_saved_freelancers`
--

INSERT INTO `tbl_saved_freelancers` (`id`, `client_id`, `freelancer_id`, `created_at`) VALUES
(90, 'k325asb325avctrrxeij7iic', 'kwkrfdwu53xvfu3xvi8e', '2022-01-15 00:41:13'),
(91, 'k325asb325avctrrxeij7iic', 'kwk2xwu53xvfu3xvi8e', '2022-01-15 00:41:16');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_saved_jobs`
--

CREATE TABLE `tbl_saved_jobs` (
  `id` int(11) NOT NULL,
  `job_post_id` int(11) NOT NULL,
  `freelancer_id` varchar(100) NOT NULL,
  `created_at` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_saved_jobs`
--

INSERT INTO `tbl_saved_jobs` (`id`, `job_post_id`, `freelancer_id`, `created_at`) VALUES
(44, 22, 'kwkrfdwu53xvfu3vi8e', '2022-01-15 00:30:01'),
(45, 18, 'kwkrfdwu53xvfu3vi8e', '2022-01-15 00:30:09');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `user_id` varchar(50) NOT NULL,
  `role` varchar(30) NOT NULL,
  `name` varchar(70) NOT NULL,
  `fname` varchar(70) NOT NULL,
  `gender` varchar(30) NOT NULL,
  `address` varchar(70) NOT NULL,
  `birthday` varchar(70) NOT NULL,
  `age` int(11) NOT NULL,
  `vkey` varchar(70) NOT NULL,
  `verified` varchar(10) NOT NULL,
  `admin_verified` varchar(10) NOT NULL,
  `front_id` text NOT NULL,
  `back_id` text NOT NULL,
  `whole_id` text NOT NULL,
  `email` varchar(70) NOT NULL,
  `password` varchar(70) NOT NULL,
  `rating` varchar(50) NOT NULL,
  `portfolio` text NOT NULL,
  `self_intro` text NOT NULL,
  `pay_rate` varchar(100) NOT NULL,
  `services_offer` text NOT NULL,
  `profile_photo` text NOT NULL,
  `status` varchar(100) NOT NULL,
  `created_at` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `role`, `name`, `fname`, `gender`, `address`, `birthday`, `age`, `vkey`, `verified`, `admin_verified`, `front_id`, `back_id`, `whole_id`, `email`, `password`, `rating`, `portfolio`, `self_intro`, `pay_rate`, `services_offer`, `profile_photo`, `status`, `created_at`) VALUES
('k325asb325avctrrxeij7iic', 'client', 'Mariane Tubera', 'Mariane', 'Female', 'Bustos Bulacan', '03/25/2000', 21, 'd1e0fe9fa83cb45b34a0534cef9464ea2', '1', '', 'http://localhost/ehiremo/backend/uploads/user_ids/6131968446d229.00279605.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684470104.83519231.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684472438.67571385.png', 'marian@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '4.1287109375', '', '', 'Php 100/hr', '', 'http://192.168.42.241/ehiremo/backend/uploads/user_profile_picture/marian-rivera.jpg', '0', '2021-12-31 14:47:53'),
('ksv879bhg5sd2wtr2sxeij7i01', 'client', 'Willy Walker', 'Willy', 'Male', 'Btech Baliuag Bulacan', '03/25/2000', 21, 'd1e0fe9fa83cbsd3b34a0534cef9464ea2', '1', '', 'http://localhost/ehiremo/backend/uploads/user_ids/6131968446d229.00279605.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684470104.83519231.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684472438.67571385.png', 'willy@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '3.3625', '', '', 'Php 100/hr', '', 'http://192.168.42.241/ehiremo/backend/uploads/user_profile_picture/WillyWonka.jpg\r\n', '0', '2021-12-31 14:31:58'),
('ksv879bhg5sd2wtr2sxeij7iic', 'client', 'Mike Seguerra', 'Mike', 'Male', 'Btech Baliuag Bulacan', '03/25/2000', 21, 'd1e0fe9fa83cbsd3b34a0534cef9464ea2', '1', '', 'http://localhost/ehiremo/backend/uploads/user_ids/6131968446d229.00279605.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684470104.83519231.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684472438.67571385.png', 'mike@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '0', '', '', 'Php 100/hr', '', 'http://192.168.42.241/ehiremo/backend/uploads/user_profile_picture/1560415903_1995817882_14_ent.png', '0', '2021-12-31 14:32:01'),
('ksvl235sd2wtr2sxeij7iic', 'client', 'Arvin Santos', 'Arvin', 'Male', 'Btech Baliuag Bulacan', '03/25/2000', 21, 'd1e0fe9fa83cbsd3b34a0534cef9464ea2', '1', '', 'http://localhost/ehiremo/backend/uploads/user_ids/6131968446d229.00279605.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684470104.83519231.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684472438.67571385.png', 'arvin@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '1.4', '', '', 'Php 100/hr', '', 'http://192.168.42.241/ehiremo/backend/uploads/user_profile_picture/arthur.png', '0', '2021-12-31 14:32:04'),
('ksvlaw325avctrrxei54saiic', 'client', 'Katherine Mutoc', 'Kath', 'Female', 'Bustos Bulacan', '03/25/2000', 21, 'd1e0fe9fa83cb45b34a0534cef9464ea2', '1', '', 'http://localhost/ehiremo/backend/uploads/user_ids/6131968446d229.00279605.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684470104.83519231.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684472438.67571385.png', 'kath@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '0', '', '', 'Php 100/hr', '', 'http://192.168.42.241/ehiremo/backend/uploads/user_profile_picture/kathryn-bernardo-3.jpg', '0', '2021-12-31 14:32:07'),
('ksvlaw325avctrrxeij7iic', 'client', 'Ivana Alawi', 'Ivana', 'Female', 'Bustos Bulacan', '03/25/2000', 21, 'd1e0fe9fa83cb45b34a0534cef9464ea2', '1', '', 'http://localhost/ehiremo/backend/uploads/user_ids/6131968446d229.00279605.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684470104.83519231.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684472438.67571385.png', 'ivana@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '0', '', '', 'Php 100/hr', '', 'http://192.168.42.241/ehiremo/backend/uploads/user_profile_picture/ivana-alawi.jpg', '', '2021-12-31 14:32:10'),
('ksvlaw8sd2wtr2sxeij7iic', 'client', 'Johny Bakay', 'Johny', 'Male', 'Piel Baliuag Bulacan', '03/25/2000', 21, 'd1e0fe9fa83cbsd3b34a0534cef9464ea2', '1', '', 'http://localhost/ehiremo/backend/uploads/user_ids/6131968446d229.00279605.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684470104.83519231.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684472438.67571385.png', 'johny@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '2.3', '', '', 'Php 100/hr', '', 'http://192.168.42.241/ehiremo/backend/uploads/user_profile_picture/johnny-glasses.jpg', '1', '2021-12-31 14:32:13'),
('ksvlawe2wtr2sxeij7iic', 'client', 'Tom Esguerra', 'Tom', 'Male', 'Tangos Baliuag Bulacan', '03/25/2000', 21, 'd1e0fe9fa83cbsd3b34a0534cef9464ea2', '1', '', 'http://localhost/ehiremo/backend/uploads/user_ids/6131968446d229.00279605.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684470104.83519231.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684472438.67571385.png', 'tom@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '0', '', '', 'Php 100/hr', '', 'http://192.168.42.241/ehiremo/backend/uploads/user_profile_picture/thomie.jpg', '', '2021-12-31 14:32:17'),
('ksvlawe2wtrrxeij7iic', 'client', 'Mika San Diego', 'Mika', 'Female', 'Bustos Bulacan', '03/25/2000', 21, 'd1e0fe9fa83cb45b34a0534cef9464ea2', '1', '', 'http://localhost/ehiremo/backend/uploads/user_ids/6131968446d229.00279605.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684470104.83519231.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684472438.67571385.png', 'mika@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '2.25', '', '', 'Php 100/hr', '', 'http://192.168.42.241/ehiremo/backend/uploads/user_profile_picture/istockphoto-807401566-170667a.jpg', '0', '2021-12-31 14:32:21'),
('ksvlaweg23wtrrxeij7iic', 'client', 'Hello Mickey', 'Mickey', 'Female', 'Poblacion Baliuag Bulacan', '03/25/2000', 21, 'd1e0fe9fa836dfsb45b34a0534cef9464ea2', '1', '', 'http://localhost/ehiremo/backend/uploads/user_ids/6131968446d229.00279605.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684470104.83519231.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61319684472438.67571385.png', 'mickey@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '0', '', '', 'Php 100/hr', '', 'http://192.168.42.241/ehiremo/backend/uploads/user_profile_picture/2017-09-09-07-01-02.jpg\r\n', '', '2021-12-31 14:32:24'),
('kwk2xwu53xvfu3xvi8e', 'freelancer', 'Bernadette Evans', 'Bernadette', 'Female', 'Baliuag Bulacan', '01/01/2000', 21, '51342a53ba91ee94530e1c810531a3cd', '1', '1', 'http://localhost/ehiremo/backend/uploads/user_ids/61a4e2182445a5.91681952.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61a4e218247f33.07360867.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61a4e21829b649.13542055.jpg', 'bernadette@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '3.5', '', 'Hello im Bernadette', 'Php 130/hr ', 'Graphic Artist', 'http://192.168.42.241/ehiremo/backend/uploads/user_profile_picture/61a5a0c7d64815.20470671.jpg', '0', '2021-12-31 14:32:27'),
('kwkrfdw1x53xvfu3vi8e', 'freelancer', 'Monkey D. Luffy', 'luffy', 'Male', 'Plaridel Bulacan', '01/02/2001', 20, '51342a53ba91ee94530e1c810531a3cd', '1', '1', 'http://localhost/ehiremo/backend/uploads/user_ids/61a4e2182445a5.91681952.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61a4e218247f33.07360867.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61a4e21829b649.13542055.jpg', 'luffy@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '0', '', 'Hello im the king of pirates', 'Php 1000/hr ', 'Gomu Gomu no, Gear 5th', 'http://192.168.42.241/ehiremo/backend/uploads/user_profile_picture/61a5a3cdb29248.25242584.jpg', '1', '2021-12-31 14:32:30'),
('kwkrfdwu51xvfu3vi8e', 'freelancer', 'Christian Obis', 'Christian', 'Male', 'Baliuag Bulacan', '01/02/2001', 20, '51342a53ba91ee94530e1c810531a3cd', '1', '1', 'http://localhost/ehiremo/backend/uploads/user_ids/61a4e2182445a5.91681952.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61a4e218247f33.07360867.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61a4e21829b649.13542055.jpg', 'obis@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '1.3', '', 'Hello im Christian', 'Php 130/hr ', 'Photographer', 'http://192.168.42.241/ehiremo/backend/uploads/user_profile_picture/61a5a31e95c2d4.72230486.jpg', '0', '2021-12-31 14:32:33'),
('kwkrfdwu53xvfu3vi8e', 'freelancer', 'Joshua NA. Aguiire', 'Joshua', 'Male', 'Plaridel Bulacan', '01/02/2001', 20, '51342a53ba91ee94530e1c810531a3cd', '0', '0', 'http://localhost/ehiremo/backend/uploads/user_ids/61a4e2182445a5.91681952.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61a4e218247f33.07360867.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61a4e21829b649.13542055.jpg', 'juswa@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '3.19375', 'http://192.168.42.241/ehiremo/backend/uploads/portfolios/61deeaae7da857.55736760.pdf', 'hello guys im joshua', 'Php 150/hr ', 'android,web,artist', 'http://192.168.42.241/ehiremo/backend/uploads/user_profile_picture/61e22ca8011780.80905905.jpg', '1', '2021-12-31 14:49:22'),
('kwkrfdwu53xvfu3xvi8e', 'freelancer', 'Ranielle A. Registrado', 'Ranielle', 'Female', 'Plaridel Bulacan', '01/01/2000', 21, '51342a53ba91ee94530e1c810531a3cd', '1', '1', 'http://localhost/ehiremo/backend/uploads/user_ids/61a4e2182445a5.91681952.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61a4e218247f33.07360867.jpg', 'http://localhost/ehiremo/backend/uploads/user_ids/61a4e21829b649.13542055.jpg', 'ranielle@gmail.com', 'ed2b1f468c5f915f3f1cf75d7068baae', '4.815625', 'http://192.168.42.241/ehiremo/backend/uploads/portfolios/61da7a4043cc83.14007386.pdf', 'Hello im Ranielle Marie', 'Php 130/hr ', 'Android Developing, test nga, test123', 'http://192.168.42.241/ehiremo/backend/uploads/user_profile_picture/61a59fd318bde1.18070287.jpg', '1', '2021-12-31 14:49:30');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_ratings`
--

CREATE TABLE `tbl_user_ratings` (
  `id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `rating` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_appointments`
--
ALTER TABLE `tbl_appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_fbphoto`
--
ALTER TABLE `tbl_fbphoto`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_feedbacks`
--
ALTER TABLE `tbl_feedbacks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_jobs`
--
ALTER TABLE `tbl_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_messages`
--
ALTER TABLE `tbl_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  ADD PRIMARY KEY (`notif_id`);

--
-- Indexes for table `tbl_proposals`
--
ALTER TABLE `tbl_proposals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_saved_freelancers`
--
ALTER TABLE `tbl_saved_freelancers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_saved_jobs`
--
ALTER TABLE `tbl_saved_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `tbl_user_ratings`
--
ALTER TABLE `tbl_user_ratings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_appointments`
--
ALTER TABLE `tbl_appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `tbl_fbphoto`
--
ALTER TABLE `tbl_fbphoto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `tbl_feedbacks`
--
ALTER TABLE `tbl_feedbacks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `tbl_jobs`
--
ALTER TABLE `tbl_jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `tbl_messages`
--
ALTER TABLE `tbl_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT for table `tbl_notification`
--
ALTER TABLE `tbl_notification`
  MODIFY `notif_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=207;

--
-- AUTO_INCREMENT for table `tbl_proposals`
--
ALTER TABLE `tbl_proposals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `tbl_saved_freelancers`
--
ALTER TABLE `tbl_saved_freelancers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `tbl_saved_jobs`
--
ALTER TABLE `tbl_saved_jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `tbl_user_ratings`
--
ALTER TABLE `tbl_user_ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
