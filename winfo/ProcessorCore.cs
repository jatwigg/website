using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace winfo
{
    class ProcessorCore
    {
        public ProcessorCore(UInt64 load)
        {
            Load = load;
        }

        public UInt64 Load { get; }
    }
}
