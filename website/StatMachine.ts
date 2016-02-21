/**
 * Thing that polls the remote servers.
 * One instance of this and we just ask it for latest data when we want.
 */
class StatMachine {
    private _die: boolean = false;
    private _timer: NodeJS.Timer = null;
    private _servers: IRemoteServerInfo[];

    constructor() {
        // todo: we will read data from some file that is in gitignore ...
        this._servers = [{
            name: 'Local',
            ip: '127.0.0.1',
            data: this.getDummyData(),
            isDown: false
        }];
    }

    /**
     * End it all.
     */
    die() {
        this._die = true;
    }

    /**
     * Get an array of servers (without IP addresses) and latest polled data. 
     */
    readLatest(): IRemoteServerInfo[] {
        // remove the ip address from server info.
        return this._servers.map((remote, index, aray) => {
            return {
                name: remote.name,
                ip: ';)',
                data: remote.data,
                isDown: false
            }
        });;
    }

    /**
     * 
     */
    private query() {
        if (this._timer != null) {
            clearInterval(this._timer)
        }
        if (_die) {
            return;
        }
        for (var s in this._servers) {

        }
        this._timer = setInterval(this.query, 5000);
    }

    private getDummyData(): ISingleDataPart[] {
        return [{
            value: 10,
            color: '#COFFEE',
            highlight: '#0FF1CE',
            label: 'Load'
        },
        {
            value: 10,
            color: '#1CEBA9',
            highlight: '#7ADD1E',
            label: 'Free'
        }];
    }
}

/*
Represents a single remote server AKA whole pie chart.
Don't send this to clients, it has the IP address of remote server.
*/
interface IRemoteServerInfo {
    name: string;
    ip: string;
    isDown: boolean;
    data: ISingleDataPart[];
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