using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace winfo
{
    class Processor
    {
        public Processor(string name, UInt32 coreCount, UInt16 averageLoad)
        {
            Name = name;
            CoreCount = coreCount;
            AverageLoad = averageLoad;
        }

        public string Name { get; }
        public UInt32 CoreCount { get; }
        public ProcessorCore[] Cores { get; set; }
        public UInt16 AverageLoad { get; }
    }
}
