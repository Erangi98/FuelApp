const express = require("express");
const { owner } = require("../Model/owner");
const Token = require("../Model/token");
const crypto = require("crypto");

const router = express.Router();
