interface IwinfoFormat {
    success: boolean;
    exception: string;
    processors: IwinfoCpuFormat[];
    memory: IwinfoMemFormat;
}

interface IwinfoCpuFormat {
    Name: string;
    CoreCount: number;
    Cores: IwinfoCpuCoreFormat[];
    AverageLoad: number;
}

interface IwinfoCpuCoreFormat {
    Load: number;
}

interface IwinfoMemFormat {
    totalgig: number;
    usedgig: number;
}