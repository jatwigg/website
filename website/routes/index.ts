﻿/*
 * GET home page.
 */
import express = require('express');

export function index(req: express.Request, res: express.Response) {
    res.render('index', { title: 'Express', year: new Date().getFullYear() });
};

export function about(req: express.Request, res: express.Response) {
    res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page' });
};

export function contact(req: express.Request, res: express.Response) {
    res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
};

export function stats(req: express.Request, res: express.Response) {
    res.render('stats', { title: 'Stats', year: new Date().getFullYear(), message: 'Server stats page', statdata: { length: 4, stuff: ['one', 'two', 'three', 'four'] } });
};
