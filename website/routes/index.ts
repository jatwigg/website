/*
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
    var stuff = [
        {
            name: 'One',
            data: [
                {
                    value: 300,
                    color: "#F7464A",
                    highlight: "#FF5A5E",
                    label: "Red"
                },
                {
                    value: 50,
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "Green"
                },
                {
                    value: 100,
                    color: "#FDB45C",
                    highlight: "#FFC870",
                    label: "Yellow"
                }
            ]
        },
        {
            name: 'Two',
            data: [
                {
                    value: 30,
                    color: "#F7464A",
                    highlight: "#FF5A5E",
                    label: "Red"
                },
                {
                    value: 50,
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "Green"
                },
                {
                    value: 100,
                    color: "#FDB45C",
                    highlight: "#FFC870",
                    label: "Yellow"
                }
            ]
        },
        {
            name: 'Three',
            data: [
                {
                    value: 90,
                    color: "#F7464A",
                    highlight: "#FF5A5E",
                    label: "Red"
                },
                {
                    value: 90,
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "Green"
                },
                {
                    value: 90,
                    color: "#FDB45C",
                    highlight: "#FFC870",
                    label: "Yellow"
                }
            ]
        },
        {
            name: 'Four',
            data: [
                {
                    value: 30,
                    color: "#F7464A",
                    highlight: "#FF5A5E",
                    label: "Red"
                },
                {
                    value: 100,
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "Green"
                },
                {
                    value: 100,
                    color: "#FDB45C",
                    highlight: "#FFC870",
                    label: "Yellow"
                }
            ]
        }
    ];

    res.render('stats', { title: 'Stats', year: new Date().getFullYear(), message: 'Server stats page', statdata: { length: 4, stuff: stuff } });
};
