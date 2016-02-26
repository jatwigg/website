 interface IJsonDataFormat {
    mem: IJsonDataMemSection;
    cpus: IJsonDataCpuSection[];
}

interface IJsonDataCpuSection {
    name: string;
    load: number;
}

interface IJsonDataMemSection {
    totalgig: number;
    usedgig: number;
}