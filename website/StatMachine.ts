/**
 * Thing that polls the remote servers.
 * We will new up one instance of this and just ask it for latest data when we want.
 */
class StatMachine {

    private _die: boolean = false;          // indicates end of life for this
    private _timer: NodeJS.Timer = null;    // timer for querying servers
    private _servers: IRemoteServerConnection[];  // servers that we will query

    /**
     * Create an instance.
     */
    constructor() {
        // todo: we will read data from some file that is in gitignore ...
        this._servers = [{
            ip: '127.0.0.1',
            info: {
                name: 'Local (test1)',
                isDown: false,
                cpu: this.getDummyData(10,10),
                mem: this.getDummyData(78392373, 3131000000)
            }
        },
        {
            ip: '127.0.0.1',
            info: {
                name: 'Local (test2)',
                isDown: false,
                cpu: this.getDummyData(10, 20),
                mem: this.getDummyData(20, 1000)
            }
        },
        {
            ip: '127.0.0.1',
            info: {
                name: 'Local (test3)',
                isDown: false,
                cpu: this.getDummyData(1, 21),
                mem: this.getDummyData(1, 1000)
            }
        },
        {
            ip: '127.0.0.1',
            info: {
                name: 'Local (test4)',
                isDown: true,
                cpu: this.getDummyData(33, 20),
                mem: this.getDummyData(20, 33)
            }
        }];
    }

    /**
     * End it all. Don't reuse this object once it's been told to die.
     */
    die() {
        this._die = true;
    }

    /**
     * Get an array of servers nd latest polled data. 
     */
    readLatest(): IRemoteServerInfo[] {
        // remove the ip address from server info.
        return this._servers.map((remote, index, aray) => remote.info);
    }

    /**
     * Queries the remote servers, saves the data then restarts the timer.
     */
    private query() {
        // stop the timer in case query takes longer than interval.
        if (this._timer != null) {
            clearInterval(this._timer);
        }
        // if this class has been told to stop, exit method.
        if (this._die) {
            return;
        }
        // do the querying
        for (var s in this._servers) {
            //todo: query here
        }
        // reinstate timer
        this._timer = setInterval(this.query, 5000);
    }

    /**
     * Helper for development. Delete this.
     */
    private getDummyData(num1: number, num2: number): ISingleDataPart[] {
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

/*
Export the stat machine to be used.
*/
module.exports = StatMachine;