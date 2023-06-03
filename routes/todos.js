"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/", (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text,
    };
    todos.push(newTodo);
    res.status(201).json({ message: "Added todo", todos: todos });
});
router.post("/todo/:todoId", (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex((todo) => todo.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        return res.status(200).json({ message: "updated todo", todos: todos });
    }
    res.status(404).json({ message: "Could not find the todo." });
});
router.delete("/todo/:todoId", (req, res, next) => {
    todos = todos.filter((todo) => todo.id !== req.params.todoId);
    res.status(404).json({ message: "Deleted todo.", todos: todos });
});
exports.default = router;
