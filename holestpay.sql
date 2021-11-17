/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 10.4.21-MariaDB : Database - holestpay
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`holestpay` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `holestpay`;

/*Table structure for table `company` */

DROP TABLE IF EXISTS `company`;

CREATE TABLE `company` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `main_user_id` bigint(20) NOT NULL,
  `name` varchar(256) NOT NULL,
  `file` varchar(256) DEFAULT NULL,
  `address` varchar(1024) DEFAULT NULL,
  `reg_no` varchar(128) DEFAULT NULL,
  `tax_no` varchar(128) DEFAULT NULL,
  `country` varchar(256) DEFAULT NULL,
  `suspended` bit(1) DEFAULT NULL,
  `data` mediumtext DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `main_user_ref` (`main_user_id`),
  CONSTRAINT `main_user_ref` FOREIGN KEY (`main_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4;

/*Data for the table `company` */

/*Table structure for table `company_site` */

DROP TABLE IF EXISTS `company_site`;

CREATE TABLE `company_site` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `url` varchar(1024) NOT NULL,
  `urls` varchar(4096) NOT NULL,
  `company_id` bigint(20) DEFAULT NULL,
  `enabled` bit(1) DEFAULT NULL,
  `data` mediumtext DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `company_ref` (`company_id`),
  CONSTRAINT `company_ref` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4;

/*Data for the table `company_site` */

/*Table structure for table `company_site_payment_method` */

DROP TABLE IF EXISTS `company_site_payment_method`;

CREATE TABLE `company_site_payment_method` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `payment_method_id` bigint(20) NOT NULL,
  `company_site_id` bigint(20) DEFAULT NULL,
  `enabled` bit(1) DEFAULT NULL,
  `data` mediumtext DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `paymnet_method_ref` (`payment_method_id`),
  KEY `site_ref` (`company_site_id`),
  CONSTRAINT `paymnet_method_ref` FOREIGN KEY (`payment_method_id`) REFERENCES `hp_payment_method` (`id`) ON DELETE CASCADE,
  CONSTRAINT `site_ref` FOREIGN KEY (`company_site_id`) REFERENCES `company_site` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4;

/*Data for the table `company_site_payment_method` */

/*Table structure for table `company_site_payment_method_locale` */

DROP TABLE IF EXISTS `company_site_payment_method_locale`;

CREATE TABLE `company_site_payment_method_locale` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `company_site_payment_method_id` bigint(20) DEFAULT NULL,
  `languange` varchar(128) NOT NULL,
  `enabled` bit(1) DEFAULT NULL,
  `data` mediumtext DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `csp_ref` (`company_site_payment_method_id`),
  CONSTRAINT `csp_ref` FOREIGN KEY (`company_site_payment_method_id`) REFERENCES `company_site_payment_method` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;

/*Data for the table `company_site_payment_method_locale` */

/*Table structure for table `company_site_subscription` */

DROP TABLE IF EXISTS `company_site_subscription`;

CREATE TABLE `company_site_subscription` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` varchar(64) NOT NULL,
  `company_site_id` bigint(20) DEFAULT NULL,
  `replace_id` bigint(20) DEFAULT NULL,
  `name` varchar(1024) DEFAULT NULL,
  `amount` float NOT NULL DEFAULT 0,
  `first_charge_at` datetime DEFAULT NULL,
  `last_charge_at` datetime DEFAULT NULL,
  `charges` int(11) NOT NULL DEFAULT 0,
  `pause` bit(1) DEFAULT NULL,
  `data` mediumtext DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `company_site_ref` (`company_site_id`),
  KEY `replace_ref` (`replace_id`),
  CONSTRAINT `company_site_ref` FOREIGN KEY (`company_site_id`) REFERENCES `company_site` (`id`) ON DELETE CASCADE,
  CONSTRAINT `replace_ref` FOREIGN KEY (`replace_id`) REFERENCES `company_site_subscription` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `company_site_subscription` */

/*Table structure for table `company_site_transaction` */

DROP TABLE IF EXISTS `company_site_transaction`;

CREATE TABLE `company_site_transaction` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `company_site_id` bigint(20) DEFAULT NULL,
  `company_site_payment_method_id` bigint(20) DEFAULT NULL,
  `company_site_subscription_id` bigint(20) DEFAULT NULL,
  `type` varchar(128) DEFAULT NULL,
  `status` varchar(1024) DEFAULT NULL,
  `data` mediumtext DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `company_site_transaction_c` (`company_site_id`),
  KEY `company_site_transaction_pm` (`company_site_payment_method_id`),
  KEY `subscription_ref` (`company_site_subscription_id`),
  CONSTRAINT `subscription_ref` FOREIGN KEY (`company_site_subscription_id`) REFERENCES `company_site_subscription` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Data for the table `company_site_transaction` */

insert  into `company_site_transaction`(`id`,`company_site_id`,`company_site_payment_method_id`,`company_site_subscription_id`,`type`,`status`,`data`,`deleted`,`updated_at`,`created_at`) values 
(1,1,1,NULL,'VOID','success','{\r\n  \"transaction\": {\r\n    \"txndate_processed\": \"18.4.19. 15.26.56\",\r\n    \"ccbin\": \"535482\",\r\n    \"timezone\": \"Europe/Berlin\",\r\n    \"fail_rc\": \"50005\",\r\n    \"oid\": \"136\",\r\n    \"cccountry\": \"SRB\",\r\n    \"expmonth\": \"01\",\r\n    \"hash_algorithm\": \"SHA256\",\r\n    \"endpointTransactionId\": \"335523\",\r\n    \"currency\": \"941\",\r\n    \"processor_response_code\": \"05\",\r\n    \"chargetotal\": \"63,00\",\r\n    \"terminal_id\": \"SE000053\",\r\n    \"approval_code\": \"N:05:Do not honour\",\r\n    \"expyear\": \"2022\",\r\n    \"response_hash\": \"42463e516aa79c7a2260cdb7b143ed263defb0b92af07a0ffdd27ec31d626539\",\r\n    \"response_code_3dsecure\": \"7\",\r\n    \"tdate\": \"1555594016\",\r\n    \"installments_interest\": \"false\",\r\n    \"bname\": \"Pera Peric\",\r\n    \"ccbrand\": \"MASTERCARD\",\r\n    \"refnumber\": \"084523353012\",\r\n    \"ponumber\": \"#136\",\r\n    \"txntype\": \"sale\",\r\n    \"paymentMethod\": \"M\",\r\n    \"txndatetime\": \"2019:04:18-15:23:53\",\r\n    \"cardnumber\": \"(MASTERCARD) ... 1998\",\r\n    \"ipgTransactionId\": \"84523353012\",\r\n    \"fail_reason\": \"Do not honour\",\r\n    \"status\": \"Odbijeno\"\r\n  },\r\n  \"actions\": [\r\n    {\r\n      \"Caption\": \"REFUND translate\",\r\n      \"Icon\": \"@material-ui/style/icon/user\",\r\n      \"Action\": \"function click(){ alert(\'Initiate REFUND\')}\"\r\n    },\r\n    {\r\n      \"Caption\": \"CAPTURE translate\",\r\n      \"Icon\": \"@material-ui/style/icon/list\",\r\n      \"Action\": \"function (){ alert(\'Initiate CAPTURE\')}\"\r\n    }\r\n  ]\r\n}',NULL,'2021-10-25 16:00:46','2021-10-25 16:00:46'),
(2,1,1,NULL,'pre-authoirize','success','{\r\n  \"transaction\": {\r\n    \"txndate_processed\": \"18.4.19. 15.26.56\",\r\n    \"ccbin\": \"535482\",\r\n    \"timezone\": \"Europe/Berlin\",\r\n    \"fail_rc\": \"50005\",\r\n    \"oid\": \"136\",\r\n    \"cccountry\": \"SRB\",\r\n    \"expmonth\": \"01\",\r\n    \"hash_algorithm\": \"SHA256\",\r\n    \"endpointTransactionId\": \"335523\",\r\n    \"currency\": \"941\",\r\n    \"processor_response_code\": \"05\",\r\n    \"chargetotal\": \"63,00\",\r\n    \"terminal_id\": \"SE000053\",\r\n    \"approval_code\": \"N:05:Do not honour\",\r\n    \"expyear\": \"2022\",\r\n    \"response_hash\": \"42463e516aa79c7a2260cdb7b143ed263defb0b92af07a0ffdd27ec31d626539\",\r\n    \"response_code_3dsecure\": \"7\",\r\n    \"tdate\": \"1555594016\",\r\n    \"installments_interest\": \"false\",\r\n    \"bname\": \"Pera Peric\",\r\n    \"ccbrand\": \"MASTERCARD\",\r\n    \"refnumber\": \"084523353012\",\r\n    \"ponumber\": \"#136\",\r\n    \"txntype\": \"sale\",\r\n    \"paymentMethod\": \"M\",\r\n    \"txndatetime\": \"2019:04:18-15:23:53\",\r\n    \"cardnumber\": \"(MASTERCARD) ... 1998\",\r\n    \"ipgTransactionId\": \"84523353012\",\r\n    \"fail_reason\": \"Do not honour\",\r\n    \"status\": \"Odbijeno\"\r\n  },\r\n  \"actions\": [\r\n    {\r\n      \"Caption\": \"REFUND translate\",\r\n      \"Icon\": \"@material-ui/style/icon/user\",\r\n      \"Action\": \"function click(){ alert(\'Initiate REFUND\')}\"\r\n    },\r\n    {\r\n      \"Caption\": \"CAPTURE translate\",\r\n      \"Icon\": \"@material-ui/style/icon/list\",\r\n      \"Action\": \"function (){ alert(\'Initiate CAPTURE\')}\"\r\n    }\r\n  ]\r\n}',NULL,'2021-10-25 16:03:04','2021-10-25 16:03:04'),
(3,46,2,NULL,'VOID','success','{\r\n  \"transaction\": {\r\n    \"txndate_processed\": \"18.4.19. 15.26.56\",\r\n    \"ccbin\": \"535482\",\r\n    \"timezone\": \"Europe/Berlin\",\r\n    \"fail_rc\": \"50005\",\r\n    \"oid\": \"136\",\r\n    \"cccountry\": \"SRB\",\r\n    \"expmonth\": \"01\",\r\n    \"hash_algorithm\": \"SHA256\",\r\n    \"endpointTransactionId\": \"335523\",\r\n    \"currency\": \"941\",\r\n    \"processor_response_code\": \"05\",\r\n    \"chargetotal\": \"63,00\",\r\n    \"terminal_id\": \"SE000053\",\r\n    \"approval_code\": \"N:05:Do not honour\",\r\n    \"expyear\": \"2022\",\r\n    \"response_hash\": \"42463e516aa79c7a2260cdb7b143ed263defb0b92af07a0ffdd27ec31d626539\",\r\n    \"response_code_3dsecure\": \"7\",\r\n    \"tdate\": \"1555594016\",\r\n    \"installments_interest\": \"false\",\r\n    \"bname\": \"Pera Peric\",\r\n    \"ccbrand\": \"MASTERCARD\",\r\n    \"refnumber\": \"084523353012\",\r\n    \"ponumber\": \"#136\",\r\n    \"txntype\": \"sale\",\r\n    \"paymentMethod\": \"M\",\r\n    \"txndatetime\": \"2019:04:18-15:23:53\",\r\n    \"cardnumber\": \"(MASTERCARD) ... 1998\",\r\n    \"ipgTransactionId\": \"84523353012\",\r\n    \"fail_reason\": \"Do not honour\",\r\n    \"status\": \"Odbijeno\"\r\n  },\r\n  \"actions\": [\r\n    {\r\n      \"Caption\": \"REFUND translate\",\r\n      \"Icon\": \"@material-ui/style/icon/user\",\r\n      \"Action\": \"function (){ alert(\'Initiate REFUND\')}\"\r\n    },\r\n    {\r\n      \"Caption\": \"CAPTURE translate\",\r\n      \"Icon\": \"@material-ui/style/icon/list\",\r\n      \"Action\": \"function (){ alert(\'Initiate CAPTURE\')}\"\r\n    }\r\n  ]\r\n}',NULL,'2021-10-26 22:28:56','2021-10-26 22:28:56');

/*Table structure for table `hp_parameter` */

DROP TABLE IF EXISTS `hp_parameter`;

CREATE TABLE `hp_parameter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `value` varchar(4096) NOT NULL,
  `description` varchar(4096) NOT NULL,
  PRIMARY KEY (`name`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Data for the table `hp_parameter` */

insert  into `hp_parameter`(`id`,`name`,`value`,`description`) values 
(1,'123','',''),
(2,'help_link','https://holest.com/holestpay_documentation.pdf','Just a link that points to documentation'),
(3,'hp_staff','support@holest.com,support1@holest.com,support2@holest.com','Users that see all companies (of all users)'),
(4,'ticket_support','support1@holest.com,support2@holest.com','E-mails of Holest staff that receive ticket notifications');

/*Table structure for table `hp_payment_method` */

DROP TABLE IF EXISTS `hp_payment_method`;

CREATE TABLE `hp_payment_method` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(1024) NOT NULL,
  `data` mediumtext DEFAULT NULL,
  `enabled` int(11) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `hp_payment_method` */

insert  into `hp_payment_method`(`id`,`name`,`data`,`enabled`,`updated_at`,`created_at`) values 
(1,'NestPay','{\n  \"parameters\": [\n    {\n      \"Name\": \"Name\",\n      \"Type\": \"Text\",\n      \"Description\": \"holestpay.payment_method_name_description\",\n      \"Required\": true,\n      \"Default\": \"Plati karticom\",\n      \"Hint\": \"Unesite naziv za metodu placanja\",\n      \"Localizable\": true,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return (value || \'\').trim() }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){ if (!value) return \'holestpay.payment_method_name_required\'; }\"\n    },\n    {\n      \"Name\": \"Description\",\n      \"Type\": \"WYSIWYG\",\n      \"Description\": \"holestpay.payment_method_description_label\",\n      \"Required\": false,\n      \"Default\": \"Platite VISA, Maestro, Mastercard ili AMEX karicama\",\n      \"Hint\": \"holestpay.payment_method_desctription_hint\",\n      \"Localizable\": false,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return (value || \'\').trim() }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){  }\"\n    },\n    {\n      \"Name\": \"Logo\",\n      \"Type\": \"Upload\",\n      \"Description\": \"holestpay.payment_method_logo_label\",\n      \"Required\": false,\n      \"Default\": null,\n      \"Hint\": \"holestpay.payment_method_logo_hint\",\n      \"Localizable\": false,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return (value || \'\').trim() }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){  }\"\n    },\n    {\n      \"Name\": \"MerchantID\",\n      \"Type\": \"Text\",\n      \"Description\": \"holestpay.payment_method_merchnatid_label\",\n      \"Required\": true,\n      \"Default\": \"\",\n      \"Hint\": \"holestpay.payment_method_merchnatid_hint\",\n      \"Localizable\": true,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return (value || \'\').trim() }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){ if (!value) return \'holestpay.payment_method_merchnatid_required\'; }\"\n    },\n    {\n      \"Name\": \"PaymentType\",\n      \"Type\": \"RADIO\",\n      \"Description\": \"holestpay.payment_method_paymenttype_label\",\n      \"Required\": true,\n      \"Options\": [\n        {\n          \"Simple charge\": \"SMS\"\n        },\n        {\n          \"Pre-autorization(rezervation)\": \"DMS\"\n        }\n      ],\n      \"Default\": \"SMS\",\n      \"Hint\": \"holestpay.payment_method_paymenttype_hint\",\n      \"Localizable\": false,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return value }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){ if (value !== \'SMS\' && value !== \'DMS\') return \'holestpay.payment_method_unsupported_payment_type\'; }\"\n    },\n    {\n      \"Name\": \"CancelAbandoned\",\n      \"Type\": \"Checkbox\",\n      \"Description\": \"holestpay.payment_method_cancelabandoned_label\",\n      \"Required\": true,\n      \"Default\": false,\n      \"Hint\": \"holestpay.payment_method_cancelabandoned_hint\",\n      \"Localizable\": true,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return value }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){  }\"\n    },\n    {\n      \"Name\": \"SuccessOrderStatus\",\n      \"Type\": \"Select\",\n      \"Description\": \"holestpay.payment_method_successorderstatus_label\",\n      \"Required\": true,\n      \"Options\": [\n        {\n          \"Complited\": \"complited\"\n        },\n        {\n          \"Processing\": \"processing\"\n        },\n        {\n          \"Preparing\": \"preparing\"\n        }\n      ],\n      \"Default\": \"complited\",\n      \"Hint\": \"holestpay.payment_method_cancelabandoned_hint\",\n      \"Localizable\": false,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return value }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){  }\"\n    }\n  ]\n}',1,'2021-10-18 11:00:27','2021-10-18 11:00:27'),
(2,'IPS Skeniraj','{\n  \"parameters\": [\n    {\n      \"Name\": \"Name\",\n      \"Type\": \"Text\",\n      \"Description\": \"holestpay.payment_method_name_description\",\n      \"Required\": true,\n      \"Default\": \"Plati karticom\",\n      \"Hint\": \"Unesite naziv za metodu placanja\",\n      \"Localizable\": true,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return (value || \'\').trim() }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){ if (!value) return \'holestpay.payment_method_name_required\'; }\"\n    },\n    {\n      \"Name\": \"Description\",\n      \"Type\": \"WYSIWYG\",\n      \"Description\": \"holestpay.payment_method_description_label\",\n      \"Required\": false,\n      \"Default\": \"Platite VISA, Maestro, Mastercard ili AMEX karicama\",\n      \"Hint\": \"holestpay.payment_method_desctription_hint\",\n      \"Localizable\": false,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return (value || \'\').trim() }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){  }\"\n    },\n    {\n      \"Name\": \"Logo\",\n      \"Type\": \"Upload\",\n      \"Description\": \"holestpay.payment_method_logo_label\",\n      \"Required\": false,\n      \"Default\": null,\n      \"Hint\": \"holestpay.payment_method_logo_hint\",\n      \"Localizable\": false,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return (value || \'\').trim() }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){  }\"\n    },\n    {\n      \"Name\": \"BankAccount\",\n      \"Type\": \"Text\",\n      \"Description\": \"holestpay.payment_method_bankaccount_label\",\n      \"Required\": true,\n      \"Default\": \"\",\n      \"Hint\": \"holestpay.payment_method_bankaccount_hint\",\n      \"Localizable\": false,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return (value || \'\').trim() }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){ if (!value) return \'holestpay.payment_method_bankaccount_required\'; }\"\n    },\n    {\n      \"Name\": \"Address\",\n      \"Type\": \"Text\",\n      \"Description\": \"holestpay.payment_method_address_label\",\n      \"Required\": true,\n      \"Default\": \"\",\n      \"Hint\": \"holestpay.payment_method_address_hint\",\n      \"Localizable\": false,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return (value || \'\').trim() }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){ if (!value) return \'holestpay.payment_method_address_required\'; }\"\n    },\n    {\n      \"Name\": \"PNBPrefix\",\n      \"Type\": \"Text\",\n      \"Description\": \"holestpay.payment_method_pnbprefix_label\",\n      \"Required\": true,\n      \"Default\": \"hlst\",\n      \"Hint\": \"holestpay.payment_method_pnbprefix_hint\",\n      \"Localizable\": false,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return (value || \'\').trim() }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){ if (!value) return \'holestpay.payment_method_pnbprefix_required\'; }\"\n    },\n    {\n      \"Name\": \"CancelTimeoutH\",\n      \"Type\": \"Text\",\n      \"Description\": \"holestpay.payment_method_canceltimeouth_label\",\n      \"Required\": true,\n      \"Default\": false,\n      \"Hint\": \"holestpay.payment_method_canceltimeouth_hint\",\n      \"Localizable\": false,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return value }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){ if(isNaN(value)) return \'holestpay.payment_method_invalid_number\' }\"\n    },\n    {\n      \"Name\": \"SuccessOrderStatus\",\n      \"Type\": \"Select\",\n      \"Description\": \"holestpay.payment_method_successorderstatus_label\",\n      \"Required\": true,\n      \"Options\": [\n        {\n          \"Complited\": \"complited\"\n        },\n        {\n          \"Processing\": \"processing\"\n        },\n        {\n          \"Preparing\": \"preparing\"\n        }\n      ],\n      \"Default\": \"complited\",\n      \"Hint\": \"holestpay.payment_method_cancelabandoned_hint\",\n      \"Localizable\": false,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return value }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){  }\"\n    }\n  ]\n}',1,'2021-10-18 11:00:37','2021-10-18 11:00:37'),
(3,'OTP','{\n  \"parameters\": [\n    {\n      \"Name\": \"Name\",\n      \"Type\": \"Text\",\n      \"Description\": \"holestpay.payment_method_name_description\",\n      \"Required\": true,\n      \"Default\": \"Plati karticom\",\n      \"Hint\": \"Unesite naziv za metodu placanja\",\n      \"Localizable\": true,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return (value || \'\').trim() }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){ if (!value) return \'holestpay.payment_method_name_required\'; }\"\n    },\n    {\n      \"Name\": \"Description\",\n      \"Type\": \"WYSIWYG\",\n      \"Description\": \"holestpay.payment_method_description_label\",\n      \"Required\": false,\n      \"Default\": \"Platite VISA, Maestro, Mastercard ili AMEX karicama\",\n      \"Hint\": \"holestpay.payment_method_desctription_hint\",\n      \"Localizable\": false,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return (value || \'\').trim() }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){  }\"\n    },\n    {\n      \"Name\": \"Logo\",\n      \"Type\": \"Upload\",\n      \"Description\": \"holestpay.payment_method_logo_label\",\n      \"Required\": false,\n      \"Default\": null,\n      \"Hint\": \"holestpay.payment_method_logo_hint\",\n      \"Localizable\": false,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return (value || \'\').trim() }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){  }\"\n    },\n    {\n      \"Name\": \"SID\",\n      \"Type\": \"Text\",\n      \"Description\": \"holestpay.payment_method_sid_label\",\n      \"Required\": true,\n      \"Default\": \"\",\n      \"Hint\": \"holestpay.payment_method_sid_hint\",\n      \"Localizable\": false,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return (value || \'\').trim() }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){ if (!value) return \'holestpay.payment_method_sid_required\'; }\"\n    },\n    {\n      \"Name\": \"PaymentType\",\n      \"Type\": \"RADIO\",\n      \"Description\": \"holestpay.payment_method_paymenttype_label\",\n      \"Required\": true,\n      \"Options\": [\n        {\n          \"Simple charge\": \"SMS\"\n        },\n        {\n          \"Pre-autorization(rezervation)\": \"DMS\"\n        }\n      ],\n      \"Default\": \"SMS\",\n      \"Hint\": \"holestpay.payment_method_paymenttype_hint\",\n      \"Localizable\": false,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return value }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){ if (value !== \'SMS\' && value !== \'DMS\') return \'holestpay.payment_method_unsupported_payment_type\'; }\"\n    },\n    {\n      \"Name\": \"CancelAbandoned\",\n      \"Type\": \"Checkbox\",\n      \"Description\": \"holestpay.payment_method_cancelabandoned_label\",\n      \"Required\": true,\n      \"Default\": false,\n      \"Hint\": \"holestpay.payment_method_cancelabandoned_hint\",\n      \"Localizable\": false,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return value }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){  }\"\n    },\n    {\n      \"Name\": \"COFEnabled\",\n      \"Type\": \"Checkbox\",\n      \"Description\": \"holestpay.payment_method_cofenabled_label\",\n      \"Required\": true,\n      \"Default\": false,\n      \"Hint\": \"holestpay.payment_method_cancelabandoned_hint\",\n      \"Localizable\": false,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return value }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){  }\"\n    },\n    {\n      \"Name\": \"SuccessOrderStatus\",\n      \"Type\": \"Select\",\n      \"Description\": \"holestpay.payment_method_successorderstatus_label\",\n      \"Required\": true,\n      \"Options\": [\n        {\n          \"Complited\": \"complited\"\n        },\n        {\n          \"Processing\": \"processing\"\n        },\n        {\n          \"Preparing\": \"preparing\"\n        }\n      ],\n      \"Default\": \"complited\",\n      \"Hint\": \"holestpay.payment_method_cancelabandoned_hint\",\n      \"Localizable\": false,\n      \"AutoFinalize\": \"function(value, filed_definition, current_parameters){ return value }\",\n      \"Validator\": \"function(value, filed_definition, current_parameters){  }\"\n    }\n  ]\n}',1,'2021-10-18 11:00:47','2021-10-18 11:00:47');

/*Table structure for table `hp_translation` */

DROP TABLE IF EXISTS `hp_translation`;

CREATE TABLE `hp_translation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `language` varchar(64) NOT NULL,
  `text` varchar(2048) NOT NULL,
  `translation` varchar(2048) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `hp_translation` */

/*Table structure for table `ticket` */

DROP TABLE IF EXISTS `ticket`;

CREATE TABLE `ticket` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `company_site_id` bigint(20) DEFAULT NULL,
  `company_site_payment_method_id` bigint(20) DEFAULT NULL,
  `alt_email` varchar(1024) DEFAULT NULL,
  `title` varchar(1024) NOT NULL DEFAULT '',
  `closed` tinyint(1) DEFAULT 0,
  `disable` bit(1) DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  KEY `ticket_user` (`user_id`),
  KEY `ticket_site` (`company_site_id`),
  KEY `ticket_method` (`company_site_payment_method_id`),
  KEY `id` (`id`),
  CONSTRAINT `ticket_method` FOREIGN KEY (`company_site_payment_method_id`) REFERENCES `company_site_payment_method` (`id`) ON DELETE SET NULL,
  CONSTRAINT `ticket_site` FOREIGN KEY (`company_site_id`) REFERENCES `company_site` (`id`) ON DELETE SET NULL,
  CONSTRAINT `ticket_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4;

/*Data for the table `ticket` */

/*Table structure for table `ticket_entry` */

DROP TABLE IF EXISTS `ticket_entry`;

CREATE TABLE `ticket_entry` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ticket_id` bigint(20) DEFAULT NULL,
  `writer_id` bigint(20) DEFAULT NULL,
  `content` varchar(4096) NOT NULL DEFAULT '',
  `mail_sent_user` bit(1) DEFAULT NULL,
  `mail_sent_support` bit(1) DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `ticket_ref` (`ticket_id`),
  KEY `writer_ref` (`writer_id`),
  CONSTRAINT `ticket_ref` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id`) ON DELETE CASCADE,
  CONSTRAINT `writer_ref` FOREIGN KEY (`writer_id`) REFERENCES `user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4;

/*Data for the table `ticket_entry` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(256) DEFAULT NULL,
  `password` varchar(1024) DEFAULT NULL,
  `name` varchar(512) DEFAULT '',
  `tel` varchar(128) DEFAULT NULL,
  `data` mediumtext DEFAULT NULL,
  `email_verify` varchar(10) DEFAULT 'false',
  `suspended` bit(1) DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`email`,`password`,`name`,`tel`,`data`,`email_verify`,`suspended`,`deleted`,`updated_at`,`created_at`) values 
(55,'toppythondev13579@gmail.com','$2b$16$L6jU9JeeyE4ZcPR5/j8ihu2d53nn1qkxxJeZRbiAP8f46KwvwXdcq','123123',NULL,NULL,'true',NULL,NULL,'2021-11-15 05:45:09','2021-11-15 05:45:09');

/*Table structure for table `user_auth_token` */

DROP TABLE IF EXISTS `user_auth_token`;

CREATE TABLE `user_auth_token` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `company_site_id` bigint(20) DEFAULT NULL,
  `token` varchar(4096) NOT NULL,
  `restrict_to` varchar(1024) DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_auth_token_user` (`user_id`),
  KEY `site_auth_ref` (`company_site_id`),
  CONSTRAINT `site_auth_ref` FOREIGN KEY (`company_site_id`) REFERENCES `company_site` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_auth_token_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=286 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user_auth_token` */

insert  into `user_auth_token`(`id`,`user_id`,`company_site_id`,`token`,`restrict_to`,`expires_at`,`updated_at`,`created_at`) values 
(282,55,NULL,'WPSafO0YIDaTlYhQgbnWGS2VZSeRzKeS',NULL,NULL,'2021-11-15 06:02:29','2021-11-15 06:02:29'),
(283,55,NULL,'NMypaiQFx44FXOVL8nzpDmukWIsulFG2',NULL,NULL,'2021-11-15 06:03:19','2021-11-15 06:03:19'),
(284,55,NULL,'OwDXcsuGGCxLMVexM8qN16pEoWDZCXEK',NULL,NULL,'2021-11-15 06:09:40','2021-11-15 06:09:40'),
(285,55,NULL,'eSFdo2a5nCkJ6xhxbzIxJMiBxLF15ATe',NULL,NULL,'2021-11-15 06:11:48','2021-11-15 06:11:48');

/*Table structure for table `user_company` */

DROP TABLE IF EXISTS `user_company`;

CREATE TABLE `user_company` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `company_id` bigint(20) NOT NULL,
  `role` varchar(128) NOT NULL,
  `disable` bit(1) DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_company_user` (`user_id`),
  KEY `user_company_company` (`company_id`),
  CONSTRAINT `user_company_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_company_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user_company` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
