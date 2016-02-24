/// <reference path="IJsonDataFormat.ts" />

import express = require('express');

var _die: boolean = false;          // indicates end of life for this
var _timer: NodeJS.Timer = null;    // timer for querying servers
var _servers: IRemoteServerConnection[];  // servers that we will query

// todo: retrieve this from a file in .gitignore
_servers = [{
    ip: '127.0.0.1',
    info: {
        name: 'Local (test1)',
        isDown: false,
        cpu: getDummyData(10, 10),
        mem: getDummyData(78392373, 3131000000)
    }
},
    {
        ip: '127.0.0.1',
        info: {
            name: 'Local (test2)',
            isDown: false,
            cpu: getDummyData(10, 20),
            mem: getDummyData(20, 1000)
        }
    },
    {
        ip: '127.0.0.1',
        info: {
            name: 'Local (test3)',
            isDown: false,
            cpu: getDummyData(1, 21),
            mem: getDummyData(1, 1000)
        }
    },
    {
        ip: '127.0.0.1',
        info: {
            name: 'Local (test4)',
            isDown: true,
            cpu: getDummyData(33, 20),
            mem: getDummyData(20, 33)
        }
    }];

/**
 * Queries the remote servers, saves the data then restarts the timer.
 */
function query() {
    // stop the timer in case query takes longer than interval.
    if (_timer != null) {
        clearInterval(_timer);
    }
    // if this class has been told to stop, exit method.
    if (_die) {
        var r: IJsonDataFormat;
        return;
    }
    // do the querying
    for (var s in _servers) {
            
        //todo: query here
    }
    // reinstate timer
    _timer = setInterval(query, 5000);
}

/**
 * Helper for development. Delete this.
 */
function getDummyData(num1: number, num2: number): ISingleDataPart[] {
    return [{
        value: num1,
        color: '#COFFEE',
        highlight: '#0FF1CE',
        label: 'Load'
    },
        {
            value: num2,
            color: '#1CEBA9',
            highlight: '#7ADD1E',
            label: 'Free'
        }];
}

export function index(req: express.Request, res: express.Response) {

    var data: IRemoteServerInfo[] = _servers.map((remote, index, aray) => remote.info);
    res.render('stats', { title: 'Stats', year: new Date().getFullYear(), message: 'Server stats page', statdata: { length: data.length, servers: data } });
};

export function die() {
    _die = true;
}

/*
Represents a remote server.
*/
interface IRemoteServerConnection {
    ip: string;
    info: IRemoteServerInfo;
}

/*
Information about a remote server.
*/
interface IRemoteServerInfo {
    name: string;
    isDown: boolean;
    cpu: ISingleDataPart[];
    mem: ISingleDataPart[];
}

/*
Represents a single slice of the pie chart.
*/
interface ISingleDataPart {
    value: number;
    color: string;
    highlight: string;
    label: string;
}