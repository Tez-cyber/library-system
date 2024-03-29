"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const LibraryErrors_1 = require("../utils/LibraryErrors");
function handleRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            const registeredUser = yield (0, UserService_1.register)(user);
            res.status(201).json({
                message: "User successfully registered",
                user: {
                    _id: registeredUser._id,
                    type: registeredUser.type,
                    firstname: registeredUser.firstname,
                    lastname: registeredUser.lastname,
                    email: registeredUser.email
                }
            });
        }
        catch (err) {
            if (err.message.includes("E11000 duplicate key error collection:")) {
                res.status(409).json({ message: "User with email already exists", err: err.message });
            }
            else {
                res.status(500).json({
                    message: "Unable to register at this time",
                    err: err.message
                });
            }
        }
    });
}
function handleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentials = req.body;
        try {
            const loggedIn = yield (0, UserService_1.login)(credentials);
            res.status(201).json({
                message: "User logged in successfully ",
                user: {
                    _id: loggedIn._id,
                    type: loggedIn.type,
                    firstname: loggedIn.firstname,
                    lastname: loggedIn.lastname,
                    email: loggedIn.email
                }
            });
        }
        catch (err) {
            if (err instanceof LibraryErrors_1.InvalidUsernameOrPassword) {
                res.status(401).json({
                    message: "Unable to login user at this time",
                    err: err.message
                });
            }
            else {
                res.status(500).json({
                    message: "Unable to login user at this time",
                    err: err.message
                });
            }
        }
    });
}
exports.default = { handleRegister, handleLogin };
